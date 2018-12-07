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
        if (token) {
            return `${this.tokenPrefix} ${token}`;
        }
        this.client.emit('error', new Error('Invalid client token.'));
    }

    async request(method, url, options = {}) {
        const methods = ['get', 'post', 'delete', 'patch', 'put'];
        const apiUrl = Constants.Http.API + Constants.Http.VERSION;
        const requestUrl = apiUrl + url;
        const headers = {};
        if (!methods.includes(method)) this.client.emit('error', new Error('Invalid HTTP method.'));
        if (options.auth !== false) headers.Authorization = this.getAuth();
        if (options.reason) headers['User-Agent'] = Constants.UserAgent;

        try {
            return fetch(requestUrl, {
                method: method,
                headers: headers,
                agent,
                body: options.data
            });
        } catch (err) {
            switch (err.response.status) {
                case 400:
                    this._client.emit('error', new DiscordAPIError('Bad Request.', 400));
                    break;

                case 401:
                    this._client.emit('error', new DiscordAPIError('Client Unauthorized.', 401));
                    break;

                case 403:
                    this._client.emit('error', new DiscordAPIError('Client Forbidden.', 403));
                    break;

                case 404:
                    this._client.emit('error', new DiscordAPIError('Not Found.', 404));
                    break;

                case 405:
                    this._client.emit('error', new DiscordAPIError('Method not allowed.', 405));
                    break;

                case 429:
                    this._client.emit('error', new DiscordAPIError('Rate limit warning.', 429));
                    break;

                case 502:
                    this._client.emit('error', new DiscordAPIError('Gateway unavailable.', 502));
                    break;

                default:
                    this._client.emit('debug', err.reason);
                    break;
            }
        }
    }
}

module.exports = RequestManager;