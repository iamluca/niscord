'use strict';

const Constants = require('../util/Constants');
const DiscordAPIError = require('./DiscordAPIError');
const fetch = require('node-fetch');
const https = require('https');
if (https.Agent) var agent = new https.Agent({
    keepAlive: true
});

class RequestManager {
    constructor(client) {
        this.client = client;
        this.tokenPrefix = 'Bot';
    }

    getAuth() {
        const token = this.client.token;
        if (token) return `${this.tokenPrefix} ${token}`;
        else return token;
    }

    async request(method, url, options = {}) {
        this.method = method;
        this.url = url;
        this.options = options;
        const methods = ['get', 'post', 'delete', 'patch', 'put'];
        const requestUrl = Constants.Http.API + Constants.Http.VERSION;
        var headers = {};
        if (!methods.includes(this.method)) throw new Error('Invalid method.');
        if (this.options.auth !== false) headers.Authorization = this.getAuth();
        if (this.options.reason) headers['User-Agent'] = Constants.UserAgent;

        try {
            return fetch(requestUrl, {
                method: this.method,
                headers,
                agent,
                body: this.options.data
            });
        } catch (err) {
            switch (error.response.status) {
                case 400:
                    this._client.emit('error', new DiscordRestError('Bad Request.', 400));
                    break;

                case 401:
                    this._client.emit('error', new DiscordRestError('Client Unauthorized.', 401));
                    break;

                case 403:
                    this._client.emit('error', new DiscordRestError('Client Forbidden.', 403));
                    break;

                case 404:
                    this._client.emit('error', new DiscordRestError('Not Found.', 404));
                    break;

                case 405:
                    this._client.emit('error', new DiscordRestError('Method not allowed.', 405));
                    break;

                case 429:
                    this._client.emit('error', new DiscordRestError('Rate limit warning.', 429));
                    break;

                case 502:
                    this._client.emit('error', new DiscordRestError('Gateway unavailable.', 502))
                    break;

                default:
                    this._client.emit('debug', error.reason);
                    break;
            };
        }
    }
}

module.exports = RequestManager;