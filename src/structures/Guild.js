'use strict';

const Collection = require('../util/Collection');
const Constants = require('../util/Constants');
const Endpoints = Constants.Endpoints;
const TextChannel = require('./TextChannel');
const User = require('../structures/User');
const Util = require('../util/Util');

/**
 * Represents a guild on Discord
 */
class Guild {
    constructor(client, data) {

        /**
         * @name Guild#client
         * @type {Client}
         * @readonly
         */
        Object.defineProperty(this, 'client', { value: client });

        /**
         * A collection of members that are currently in this guild
         * @type {Collection}
         */
        this.members = new Collection();

        /**
         * A collection of channels that are currently in this guild
         * @type {Collection}
         */
        this.channels = new Collection();

        /**
         * A collection of roles that are currently in this guild
         * @type {Collection}
         */
        this.roles = new Collection();

        for (var channel of data.channels) {
            if (channel.type === 0) {
                this.client.channels.set(channel.id, new TextChannel(this.client, channel));

                channel.guild = this;
                this.channels.set(channel.id, new TextChannel(this.client, channel));
            }
            /**
            if (channel.type === 2) {
                this.client.channels.set(channel.id, new VoiceChannel(this.client, channel));

                channel.guild = this;
                this.channels.set(channel.id, new VoiceChannel(this.client, channel));
            }

            if (channel.type === 4) {
                this.client.channels.set(channel.id, new CategoryChannel(this.client, channel));

                channel.guild = this;
                this.channels.set(channel.id, new CategoryChannel(this.client, channel));
            }
            */
        }

        for (let member of data.members) {
            this.client.users.set(member.user.id, new User(this.client, member.user));

            member.guild = this;
            this.members.set(member.user.id, new GuildMember(this.client, member));
        }

        if (data) this.setup(data);
    }

    setup(data) {

        /**
         * The name of the guild
         * @type {string}
         */
        this.name = data.name;

        /**
         * The ID of the guild
         * @type {string}
         */
        this.id = data.id;

        /**
         * The icon of the guild
         * @type {?string}
         */
        this.icon = data.icon;

        /**
         * The splash of the guild
         * @type {?string}
         */
        this.splash = data.splash;

        /**
         * The region of the guild
         * @type {string}
         */
        this.region = data.region;

        /**
         * The member count of the guild
         * @type {number}
         */
        this.memberCount = data.member_count || this.memberCount;

        /**
         * Whether or not, the guild is large (more than 250 members)
         */
        this.large = Boolean('large' in data ? data.large : this.large);

        /**
         * The features of the guild
         * @type {Object[]}
         */
        this.features = data.features;

        /**
         * The ID of the application that created the guild, if any
         * @type {?string}
         */
        this.applicationID = data.application_id;

        /**
         * The time in seconds before a user is counted as "away from keyboard"
         * @type {?number}
         */
        this.afkTimeout = data.afk_timeout;

        /**
         * The voice channel ID where AFK members are moved
         * @type {?string}
         */
        this.afkChannelID = data.afk_channel_id;

        /**
         * The systen channel ID of the guild
         * @type {?string}
         */
        this.systemChannelID = data.system_channel_id;

        /**
         * Whether or not, embedded images are enabled on this guild
         * @type {boolean}
         */
        this.embedEnabled = data.embed_enabled;

        /**
         * The verification level of the guild
         * @type {number}
         */
        this.verificationLevel = data.verification_level;

        this.available = !data.unavailable;
    }

    /**
     * Bans a user from the guild
     * @param {User} user The user to ban
     * @param {Object|string|number} [options] Options for the ban
     * @param {number} [options.days=0] Number of days' messages to be deleted
     * @param {string} [options.reason] The reason for the ban
     * @returns {GuildMember|User|string}
     * @example
     * // Bans a user from the guild using ID
     * Guild.ban('User ID')
     *   .then((user) => console.log(`Banned: ${user.id}`))
     *   .catch(console.error);
     * @example
     * // Bans a user from the guild using the user object with days and reason.
     * Guild.ban(user, { days: 7, reason: 'Test' })
     *   .then((user) => console.log(`Banned: ${user.id}`))
     *   .catch(console.error);
     */
    ban(user, options = {}) {
        const id = Util.resolveUserID(user);
        const url = `${Endpoints.GUILD_BANS(this.id)}/${id}?${Util.stringify(options)}`;
        if (!id) throw new Error('Couldn\'t resolve the user ID.');
        if (typeof options === 'number') {
            options = { reason: null, 'delete-message-days': options };
        } else if (typeof options === 'string') {
            options = { reason: options, 'delete-message-days': 0 };
        }
        if (options.days) options['delete-message-days'] = options.days;
        return this.client.rest.request('put', url, {
            auth: true
        }).then(() => {
            const resolvedUser = Util.resolveUser(id);
            const resolvedMember = this.members.get(user.id);
            if (resolvedUser && resolvedMember) {
                return resolvedUser || resolvedMember;
            } else if (resolvedUser) {
                return resolvedUser;
            } else if (resolvedMember) {
                return resolvedMember;
            }
            return id;
        });
    }
}

module.exports = Guild;