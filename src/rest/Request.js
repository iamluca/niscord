'use strict';

const Constants = require('../util/Constants');
const fetch = require('node-fetch');
const https = require('https');
if (https.Agent) var agent = new https.Agent({
    keepAlive: true
});

class Request {
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
        var body;
        if (!methods.includes(this.method)) throw new Error('Invalid method.');
        if (this.options.auth !== false) headers.Authorization = this.getAuth();
        if (this.options.reason) headers['User-Agent'] = Constants.UserAgent;
        if (this.options.data != null) {
            body = JSON.stringify(this.data);
            headers['Content-Type'] = 'application/json';
        }

        return fetch(requestUrl, {
            method: this.method,
            headers,
            agent,
            body,
        });
    }
}

module.exports = Request;