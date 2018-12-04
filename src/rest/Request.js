const Constants = require('../util/Constants');
const fetch = require('node-fetch');

class Request {
    constructor(rest, method, url, auth, data) {
        this.rest = rest;
        this.method = method;
        this.url = url;
        this.auth = auth;
        this.data = data;
    }

    request() {
        const methods = ['get', 'post', 'delete', 'patch', 'put'];
        const url = Constants.Http.API + Constants.Http.VERSION;
        if (!methods.includes(this.method)) throw new Error('Invalid method.');
    }
}

module.exports = Request;