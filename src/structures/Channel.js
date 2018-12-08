'use strict';

const Constants = require('../util/Constants');
const Endpoints = Constants.Endpoints;

/**
 * Represents a channel on Discord
 */
class Channel {
    constructor(client, data) {

        /**
         * @name Channel#client
         * @type {Client}
         * @readonly
         */
        Object.defineProperty(this, 'client', { value: client });

        /**
         * The ID of the channel
         * @type {string}
         */
        this.id = data.id;

        /**
         * The type of the channel
         * @type {string}
         */
        this.type = Constants.ChannelTypes[data.type];
    }

    /**
     * Deletes a channel
     * @returns {Promise<Channel>}
     * @example
     * Channel.delete()
     *   .then(console.log);
     *   .catch(console.error);
     */
    delete() {
        return this.client.rest.request('delete', Endpoints.CHANNEL(this.id), {
            auth: true
        }).then(() => {
            return this;
        });
    }

    /**
     * @returns {string}
     */
    toString() {
        return `<#${this.id}>`;
    }
}

module.exports = Channel;