'use strict';

/**
 * Represents a user on Discord
 * @class
 */
class User {
    constructor(client, data) {
        Object.defineProperty(this, 'client', {
            value: client
        });
        if (data) return this._setup(data);
    }

    _setup(data) {

        /**
         * The ID of the user
         * @type {string}
         */
        this.id = data.id;

        /**
         * The username of the user
         * @type {string}
         */
        this.username = data.username;

        /**
         * The discriminator of the user
         * @type {string}
         */
        this.discriminator = data.discriminator;

        /**
         * The avatar's ID of the user
         * @type {string}
         */
        this.avatar = data.avatar;

        /**
         * Whether or not, the user is a bot
         * @type {boolean}
         */
        this.bot = Boolean(data.bot);
    }

    /**
     * @returns {string}
     */
    toString() {
        return `<@${this.id}>`;
    }
}

module.exports = User;