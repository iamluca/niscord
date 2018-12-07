'use strict';

class GuildMember {
    constructor(client, data) {

        /**
         * Client
         * @name GuildMember#client
         * @type {Client}
         * @readonly
         */
        Object.defineProperty(this, 'client', { value: client });

        Object.defineProperty(this, 'guild', {
            get() {
                return data.guild || this.client.guilds.get(data.guild_id);
            }
        });

        /**
         * Whether or not, the member is deafened
         * @type {boolean}
         */
        this.deaf = Boolean(data.deaf);

        /**
         * Whether or not, the member is mute
         * @type {boolean}
         */
        this.mute = Boolean(data.mute);

        /**
         * Whether or not, the member is self-deafened
         * @type {boolean}
         */
        this.selfDeaf = Boolean(data.self_deaf);

        /**
         * Whether or not, the member is self-muted
         */
        this.selfMute = Boolean(data.self_mute);

        /**
         * The nickname of the member, if any
         * @type {?string}
         */
        this.nickname = data.nick || null;

        this.user = data.user;
        this.roles = data.roles;
    }
}

module.exports = GuildMember;