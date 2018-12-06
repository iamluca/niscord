'use strict';
const Collection = require('../util/Collection');
const Constants = require('../util/Constants');
const RequestManager = require('../rest/RequestManager');
const WebSocketManager = require('../websocket/WebSocketManager');

/**
 * @extends {WebSocketManager}
 */
class Client extends WebSocketManager {

    /**
     * @constructor
     * @param {ClientOptions} [options] Options for the client
     */
    constructor(options = {}) {
        super(options);

        /**
         * Options for the client
         * @type {ClientOptions}
         */
        this.options = options;

        /**
         * Discord client token
         * @type {?string}
         */
        this.token = null;

        /**
         * @type {}
         */
        this.rest = new RequestManager(this);

        /**
         * Collection of users, this client is currently handling.
         * @type {Collection}
         */
        this.users = new Collection();

        /**
         * Collection of guilds, this client is currently handling.
         * @type {Collection}
         */
        this.guilds = new Collection();

        /**
         * Collection of channels, this client is currently handling.
         * @type {Collection}
         */
        this.channels = new Collection();
    }

    /**
     * Logs in with the client, forms a connection with the websocket.
     * @param {string} token Discord client token
     */
    login(token = this.token) {
        if (!token || typeof token !== 'string') throw new Error(Constants.Errors.INVALID_TOKEN);
        this.token = token;
        this.connect();
    }

    /**
     * Evaluates JavaScript code.
     * @param {string} script
     * @returns {*}
     * @private
     */
    _eval(script) {
        return eval(script);
    }
}

module.exports = Client;