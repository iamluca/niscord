'use strict';

const DB = require('depo').Database;

class Database extends DB {

    /**
     * @constructor
     * @param {string} [name] Name of the database
     * @param {DatabaseOptions} [options] Options for the database
     */
    constructor(name = 'niscord', options) {
        super(name, options);

        /**
         * @type {string}
         */
        this.name = name;

        /**
         * @type {DatabaseOptions}
         */
        this.options = options;
    }
}

module.exports = Database;