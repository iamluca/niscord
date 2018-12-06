'use strict';

const fs = require('fs');
const path = require('path');

class Database {

    /**
     * @param {string} [name] Name of the database
     * @param {DatabaseOptions} [options] Options for the database
     */
    constructor(name, options = {}) {

        /**
         * Name of the database
         * @type {string}
         */
        this.name = name;

        /**
         * Options for the database
         * @type {DatabaseOptions}
         */
        this.options = options;

        var dbName;
        if (this.name) {
            if (this.name.includes('.json')) {
                this.name = this.name.split('.json')[0];
            } else if (!this.name.includes('.json')) {
                dbName = `${this.name}.json`;
            }
        } else {
            dbName = 'niscord.json';
        }
        if (!fs.existsSync(path.resolve(dbName))) fs.writeFileSync(path.resolve(dbName), '{ }');

        this.path = path.resolve(dbName);
        this.database = require(this.path);
    }

    /**
     * Adds a number to a value.
     * @param {string} key
     * @param {number} data
     */
    add(key, data) {
        if (typeof data !== 'number' || data === undefined) throw new Error('Data must be a number.');
        let fetched = this._clone(this.database[key] + data);
        this.database[key] = this._clone(fetched);
        this.save();
    }

    /**
     * Deletes a specified key and its value.
     * @param {string} key
     */
    delete(key) {
        if (!this.database[key]) return undefined;
        delete this.database[key];
        this.save();
    }

    /**
     * Deletes all the keys.
     * @returns {Promise<Database>}
     */
    deleteAll() {
        for (let key in this.database) {
            this.delete(key);
            this.save();
        }
        return Promise.resolve(this.database);
    }

    /**
     * Edits a specified key's value.
     * @param {string} key
     * @param {string|boolean|object|number} value
     */
    edit(key, value) {
        this.database[key] = this._clone(value);
        this.save();
    }

    /**
     * Gets a specified key with its value.
     * @param {string} key
     * @returns {Promise<DatabaseKey>}
     */
    get(key) {
        if (!this.database[key]) return undefined;
        return Promise.resolve(this._clone(this.database[key]));
    }

    /**
     * Gets all keys.
     * Returns an object.
     * @returns {Promise<Database>}
     */
    getAll() {
        if (!this.database) return undefined;
        return Promise.resolve(this._clone(this.database));
    }

    /**
     * Indicates whether a key with the specified key exists or not.
     * Returns a boolean.
     * @param {string|Array} key
     * @param {string} [method='string']
     * @returns {boolean}
     */
    has(key) {
        if (this.database.hasOwnProperty(key)) {
            return true;
        } else if (!this.database.hasOwnProperty(key)) {
            return false;
        }
    }

    /**
     * Sets a key with specified value.
     * @param {string} key
     * @param {string|number|boolean|object} value
     */
    set(key, value) {
        this.database[key] = this._clone(value);
        this.save();
    }

    /**
     * @param {string} key
     * @param {string} data
     * @returns {boolean}
     */
    startsWith(key, data) {
        if (data === undefined) return undefined;
        return this.database[key].startsWith(data);
    }

    /**
     * Subtracts a number from a value.
     * @param {string} key
     * @param {number} data
     */
    subtract(key, data) {
        if (typeof data !== 'number') throw new Error('Data must be a number.');
        let fetched = this._clone(this.database[key] - data);
        this.database[key] = this._clone(fetched);
        this.save();
    }

    /**
     * Saves the database, synchronously.
     * @param {string} path
     */
    save(path) {
        if (!path) path = this.path;
        fs.writeFileSync(path, JSON.stringify(this.database));
    }

    /**
     * @param {object} data
     * @private
     */
    _clone(data) {
        if (data === undefined) return undefined;
        return JSON.parse(JSON.stringify(data));
    }
}

module.exports = Database;