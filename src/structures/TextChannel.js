'use strict';

const Constants = require('../util/Constants');
const Endpoints = Constants.Endpoints;
const GuildChannel = require('./GuildChannel');
const Message = require('./Message');

/**
 * Represents a text channel on Discord
 * @extends {GuildChannel}
 */
class TextChannel extends GuildChannel {
    constructor(client, data) {
        super(client, data);
        Object.defineProperty(this, 'client', { value: client });

        /**
         * The topic of the text channel
         * @type {?string}
         */
        this.topic = data.topic;

        /**
         * Whether or not, the text channel is NSFW
         * @type {boolean}
         */
        this.nsfw = Boolean(data.nsfw);

        /**
         * The ID of the message which was last sent in the text channel, if any
         * @type {string}
         */
        this.lastMessageID = data.last_message_id;

        /**
         * The timestamp when the a message was pinned, if any
         * @type {?number}
         */
        this.lastPinTimestamp = data.last_pin_timestamp ? new Date(data.last_pin_timestamp).getTime() : null;
    }

    /**
     * Sends a message in the text channel
     * @param {string|Object} content The content of the message
     * @param {Object} options Options for the message
     * @returns {Promise<Message>}
     */
    sendMessage(content, options) {
        if (typeof content === 'object' && !options) {
            options = content;
            content = null;
        } else if (!options) {
            options = {};
        }

        return this.client.rest.request('post', Endpoints.CHANNEL_MESSAGES(this.id), {
            auth: true,
            data: {
                content: content,
                embed: options.embed
            }
        }).then((response) => {
            return new Message(this.client, response.data);
        });
    }

    /**
     * Sends a message to the text channel
     * @param {String|Object} content The content of the message
     * @param {Object} options Options for the message.
     * @returns {Promise<Message>}
     */
    send(content, options) {
        return this.sendMessage(content, options);
    }
}

module.exports = TextChannel;