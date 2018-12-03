const EventEmitter = require('events').EventEmitter;

/**
 * @class
 * @extends {EventEmitter}
 */
class Client extends EventEmitter {

    /**
     * @constructor
     * @param {ClientOptions} [options] Options for the client
     */
    constructor(options = {}) {

        /**
         * @type {ClientOptions}
         */
        this.options = options;

        /**
         * @type {?string}
         */
        this.token = null;
    }
}

module.exports = Client;