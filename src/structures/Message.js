'use strict';

const Endpoints = require('../util/Constants').Endpoints;

/**
 * Represents a message on Discord
 */
class Message {
    constructor(client, data) {

        /**
         * @name Message#client
         * @type {Client}
         * @readonly
         */
        Object.defineProperty(this, 'client', {
            value: client
        });

        Object.defineProperty(this, 'data', {
            value: data
        });

        /**
         * The type of the channel, the message was sent in.
         * @type {DMChannel|GroupDMChannel|TextChannel}
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
        return this.channel.guild ? this.channel.guild : this.client.guilds.get(this.data.guild_id) || null;
    }

    get member() {
        return this.guild ? this.guild.members.get(this.data.author.id) : null;
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
     * Sends a message in message's channel, tagging author
     * @param {string} content
     * @returns {Promise<Message>}
     * @example
     * Message.reply('Niscord')
     *   .then(console.log)
     *   .catch(console.error);
     */
    reply(content) {
        const finalProd = [`<@${this.author.id}>`, content].join(', ');
        return this.channel.send(`${finalProd}`);
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
