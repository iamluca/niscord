'use strict';

const Endpoints = require('../util/Constants').Endpoints;

class Message {
    constructor(client, data) {

        /**
         * @type {Client}
         * @readonly
         */
        Object.defineProperty(this, 'client', {
            value: client
        });

        if (data) this._setup(data);
    }

    _setup(data) {

        /**
         * The channel, this message was sent in.
         * @type {TextChannel|DMChannel|GroupDMChannel}
         */
        this.channel = this.client.channels.get(data.channel_id);

        /**
         * The ID of the message
         * @type {string}
         */
        this.id = data.id;

        /**
         * The type of the message
         * @type {string}
         */
        this.type = data.type;

        /**
         * the author of the message (returns User)
         * @type {User}
         */
        this.author = this.client.users.get(data.author.id);

        /**
         * The content of the message
         * @type {string}
         */
        this.content = data.content;

        /**
         * Whether or not, the message was Text-To-Speech
         * @type {boolean}
         */
        this.tts = data.tts;

        /**
         * The nonce of the message
         * @type {string}
         */
        this.nonce = data.nonce;

        /**
         * The mentions of the message
         */
        this.mentions = data.mentions;

        /**
         * The ID of the webhook, if any
         * @type {string}
         */
        this.webhookID = data.webhook_id || null;
    }

    get guild() {
        return this.channel.guild || null;
    }

    get member() {
        return this.guild ? this.guild.members.get(this.author.id) || null : null;
    }

    /**
     * Edits the content of this message
     * @param {string} [content=''] 
     * @param {Object} [options]
     * @returns {Promise<Message>}
     * @example
     * Message.edit('New content.')
     *   .then((msg) => console.log(msg.content))
     *   .catch(console.error);
     */
    edit(content, options = {}) {
        if (!options && typeof content === 'object' && !(content instanceof Array)) {
            options = content;
            content = '';
        } else if (!options) {
            options = {};
        }
        if (!options) options = {};
        return this.client.rest.request('patch', Endpoints.CHANNEL_MESSAGE(this.channel.id, this.id), {
            auth: true,
            data: {
                content: content,
                embed: options.embed
            }
        }).then(() => {
            return this;
        });
    }

    /**
     * Deletes the message
     * @param {number} [timeout=0] Waiting time to delete the message
     * @returns {Promise<Message>}
     * @example
     * Message.delete()
     *   .then((msg) => console.log(`Deleted: ${msg.id}`));
     *   .catch(console.error);
     */
    delete(timeout = 0) {
        if (timeout <= 0) {
            return this.client.rest.request('delete', Endpoints.CHANNEL_MESSAGE(this.channel.id, this.id), {
                auth: true
            }).then(() => {
                return this;
            });
        } else {
            return new Promise((resolve) => {
                setTimeout(() => {
                    resolve(this.delete());
                }, timeout);
            });
        }
    }

    /**
     * Pins a message to the channel
     * @returns {Promise<Message>}
     */
    pin() {
        return this.client.rest.request('put', Endpoints.CHANNEL_PIN(this.channel, this.id), {
            auth: true
        }).then(() => {
            return this;
        });
    }

    /** Unpins a message from a channel
     * @returns {Promise<Message>}
     */
    unpin() {
        return this.client.rest.request('delete', Endpoints.CHANNEL_PIN(this.channel, this.id), {
            auth: true
        }).then(() => {
            return this;
        });
    }

    /**
     * @returns {string}
     */
    toString() {
        return this.content;
    }
}

module.exports = Message;