'use strict';

const axios = require('axios');
const Constants = require('../util/Constants');
const DiscordAPIError = require('./DiscordAPIError');
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
        if (!token) this.client.emit('error', new Error('Invalid client token.'));
        return `${this.tokenPrefix} ${token}`;
    }

    async request(method, path, options = {}) {
        const methods = ['get', 'post', 'delete', 'patch', 'put'];
        const url = Constants.Http.API + Constants.Http.VERSION + path;
        const data = options.data;
        const headers = {};
        if (!methods.includes(method)) this.client.emit('error', new Error('Invalid HTTP method.'));
        if (options.auth !== false) headers.Authorization = this.getAuth();
        if (options.reason) headers['User-Agent'] = Constants.UserAgent;

        try {
            return await axios({
                method,
                url,
                data,
                headers,
                agent
            });
        } catch (err) {
            switch (err.response.status) {
                case 400:
                    this.client.emit('error', new DiscordAPIError('Bad Request.', 400));
                    break;

                case 401:
                    this.client.emit('error', new DiscordAPIError('Client Unauthorized.', 401));
                    break;

                case 403:
                    this.client.emit('error', new DiscordAPIError('Client Forbidden.', 403));
                    break;

                case 404:
                    this.client.emit('error', new DiscordAPIError('Not Found.', 404));
                    break;

                case 405:
                    this.client.emit('error', new DiscordAPIError('Method not allowed.', 405));
                    break;

                case 429:
                    this.client.emit('error', new DiscordAPIError('Rate limit warning.', 429));
                    break;

                case 502:
                    this.client.emit('error', new DiscordAPIError('Gateway unavailable.', 502));
                    break;

                default:
                    this.client.emit('debug', err.reason);
                    break;
            }
        }
    }
}

module.exports = RequestManager;