'use strict';

class UnavailableGuild {
    constructor(client, data) {

        /**
         * @name UnavailableGuild#client
         * @type {Client}
         * @readonly
         */
        Object.defineProperty(this, 'client', {
            value: client
        });

        /**
         * Whether or not, the guild is available
         * @type {boolean}
         */
        this.available = !!data.unavailable;

        /**
         * The ID of the guild
         * @type {String}
         */
        this.id = data.id;
    }
}

module.exports = UnavailableGuild;