'use strict';

const Channel = require('./Channel');
const Constants = require('../util/Constants');
const Endpoints = Constants.Endpoints;
const Util = require('../util/Util');

/**
 * Represents a guild channel
 * @extends Channel
 */
class GuildChannel extends Channel {
    constructor(guild, data) {
        super(guild, data);

        /**
         * @name GuildChannel#guild
         * @type {Guild}
         * @readyonly
         */
        Object.defineProperty(this, 'guild', { value: data.guild });

        /**
         * The name of the guild channel
         * @type {string}
         */
        this.name = data.name;

        /**
         * The position of the guild channel
         * @type {number}
         */
        this.position = data.position;

        /**
         * The ID of the parent of the guild channel
         * @type {string}
         */
        this.parentID = data.parentID;
    }

    /**
     * @type {?CategoryChannel}
     * @readonly
     */
    get parent() {
        return this.guild.channels.get(this.parentID) || null;
    }

    /**
     * Edits the guild channel
     * @param {Object} data The new data for the channel
     * @param {string} [reason] The reason for editing the guild channel
     * @returns {Promise<GuildChannel>}
     * @example
     * GuildChannel.edit({ name: 'niscord' })
     *   .then(console.log)
     *   .catch(console.error);
     */
    edit(data, reason) {
        const _data = {};
        _data.name = (data.name || this.name).trim();
        _data.topic = typeof data.topic === 'undefined' ? this.topic : data.topic;
        _data.nsfw = typeof data.nsfw === 'undefined' ? this.nsfw : data.nsfw;
        _data.position = data.position || this.position;
        _data.bitrate = data.bitrate || (this.bitrate ? this.bitrate * 1000 : undefined);
        _data.user_limit = typeof data.userLimit !== 'undefined' ? data.userLimit : this.userLimit;
        _data.parent_id = data.parent;
        _data.permission_overwrites = data.permissionOverwrites;
        return this.client.rest.request('patch', Endpoints.CHANNEL(this.id), {
            auth: true,
            data: _data,
            reason: reason
        }).then(() => {
            return this;
        });
    }

    /**
     * Sets a new name for the guild channel
     * @param {string} name The new name for the guild channel
     * @param {string} [reason] The reason for editing the guild channel
     * @returns {Promise<GuildChannel>}
     * @example
     * GuildChannel.setName('niscord')
     *   .then(console.log)
     *   .catch(console.error);
     */
    setName(name, reason) {
        return this.edit({ name }, reason);
    }

    /**
     * Sets a new parent for the guild channel
     * @param {CategoryChannel|string} parent The new parent for the guild channel
     * @param {string} [reason] The reason for editing parent of the guild channel
     * @returns {Promise<GuildChannel>}
     * @example
     * GuildChannel.setParent('1234567890')
     *   .then(console.log)
     *   .catch(console.error);
     */
    setParent(parent, reason) {
        parent = Util.resolveChannelID(parent);
        return this.edit({ parent }, reason);
    }

    /**
     * Sets a new topic for the guild channel
     * @param {string} topic The new topic for the guild channel
     * @param {*} [reason] The reason for editing the topic of the guild channel
     * @returns {Promise<GuildChannel>}
     * @example
     * GuildChannel.setTopic('Niscord')
     *   .then(console.log)
     *   .catch(console.error);
     */
    setTopic(topic, reason) {
        return this.edit({ topic }, reason);
    }

    /**
     * Deletes the guild channel
     * @param {string} [reason] The reason for deleting the guild channel
     * @returns {Promise<GuildChannel>}
     * @example
     * GuildChannel.delete()
     *   .then(console.log)
     *   .catch(console.error);
     */
    delete(reason) {
        return this.client.rest.request('delete', Endpoints.CHANNEL(this), {
            auth: true,
            reason: reason || null
        }).then(() => {
            return this;
        });
    }

    toString() {
        return `<#${this.id}>`;
    }
}

module.exports = GuildChannel;