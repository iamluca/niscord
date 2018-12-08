'use strict';

const axios = require('axios');
const Constants = require('../util/Constants');
const DiscordAPIError = require('./DiscordAPIError');

class RequestManager {
    constructor(client) {
        this.client = client;
    }

    async request(method, path, options = {}) {
        const methods = ['get', 'post', 'delete', 'patch', 'put'];
        if (!methods.includes(method)) this.client.emit('error', new Error('Invalid HTTP method.'));
        const headers = {
            Authorization: `Bot ${this.client.token}`
        };
        try {
            return await axios({
                method: method,
                url: Constants.Http.API + Constants.Http.VERSION + path,
                data: options.data,
                headers: options.auth ? headers : headers
            });
        } catch (error) {
            switch (error.response.status) {
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
                    this.client.emit('debug', error.message);
                    break;
            }
        }
    }
}

module.exports = RequestManager;