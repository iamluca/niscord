'use strict';

const Constants = require('../util/Constants');
const Endpoints = Constants.Endpoints;

/**
 * Represents a channel on Discord
 * @class
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
         * The type of the channel
         * @type {string}
         */
        this.type = Constants.ChannelTypes[data.type] ? Constants.ChannelTypes[data.type].toLowerCase() : 'unknown';

        if (data) this._setup(data);
    }

    _setup(data) {

        /**
         * The ID of the channel
         * @type {string}
         */
        this.id = data.id
    }

    /**
     * Deletes a channel
     * @returns {Promise<Channel>}
     * @example
     * Channel.delete()
     *   .then((channel) => console.log(`Deleted: ${channel.id}`));
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