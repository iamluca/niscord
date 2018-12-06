'use strict';

const Endpoints = require('../util/Constants').Endpoints;

class Message {
    constructor(client, data, channel) {

        /**
         * The channel, this message was sent in.
         * @type {TextChannel|DMChannel|GroupDMChannel}
         */
        this.channel = channel;

        if (data) this._setup(data);

        /**
         * @type {Client}
         * @readonly
         */
        Object.defineProperty(this, 'client', {
            value: client
        });
    }

    _setup(data) {

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
         * @returns {User}
         */
        this.author = this.client.users.add(data.author, !data.webhook_id);

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
     * edit('New content.')
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

    pin() {
        return this.client.rest.request('put', Endpoints.CHANNEL_PIN(this.channel, this.id), {
            auth: true
        }).then(() => {
            return this;
        });
    }

    unpin() {
        return this.client.rest.request('delete', Endpoints.CHANNEL_PIN(this.channel, this.id), {
            auth: true
        }).then(() => {
            return this;
        });
    }
}

module.exports = Message;