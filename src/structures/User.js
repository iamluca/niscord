'use strict';

/**
 * Represents a user on Discord
 */
class User {
    constructor(client, data) {

        /**
         * @name User#client
         * @type {Client}
         * @readonly
         */
        Object.defineProperty(this, 'client', {
            value: client
        });

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

    get tag() {
        return this.tag = `${this.username}#${this.discriminator}`;
    }

    /**
     * @returns {string}
     */
    toString() {
        return `<@${this.id}>`;
    }
}

module.exports = User;
