'use strict';
const Endpoints = require('../util/Constants').Endpoints;

class Message {
    constructor(client, data, channel) {
        this.channel = channel;
        if (data) this._setup(data);
        Object.defineProperty(this, 'client', {
            value: client
        });
    }

    _setup(data) {

        /**
         * @type {string}
         */
        this.id = data.id;

        /**
         * @type {string}
         */
        this.type = data.type;

        /**
         * @type {User}
         */
        this.author = this.client.users.add(data.author, !data.webhook_id);

        /**
         * @type {string}
         */
        this.content = data.content;

        /**
         * @type {boolean}
         */
        this.tts = data.tts;

        /**
         * @type {string}
         */
        this.nonce = data.nonce;
    }

    get guild() {
        return this.channel.guild || null;
    }

    get member() {
        return this.guild ? this.guild.members.get(this.author.id) || null : null;
    }

    /**
     * 
     * @param {string} [content=''] 
     * @param {object} [options]
     * @returns {Promise<Message>}
     */
    edit(content, options = {}) {
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
}

module.exports = Message;