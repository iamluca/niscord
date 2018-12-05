const Collection = require('../util/Collection');
const Constants = require('../util/Constants');
const Request = require('../rest/Request');
const WebSocketConnection = require('../websocket/WebsocketConnection');

/**
 * @class
 * @extends {WebSocketConnection}
 */
class Client extends WebSocketConnection {

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
        this.rest = new Request(this);

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
     * 
     * @param {string} token Discord client token
     */
    start(token = this.token) {
        if (!token || typeof token !== 'string') throw new Error(Constants.Errors.INVALID_TOKEN);
        this.token = token;
        this.connect();
    }

    /**
     * @param {string} script
     * @private
     */
    _eval(script) {
        return eval(script);
    }
}

module.exports = Client;