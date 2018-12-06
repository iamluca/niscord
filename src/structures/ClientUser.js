'use strict';

const Constants = require('../util/Constants');
const Endpoints = require('../util/Constants').Endpoints;
const User = require('./User');

/**
 * Represents a client user on Discord
 * @class
 * @extends {User}
 */
class ClientUser extends User {
    constructor(client, data) {
        super(client, data);
        Object.defineProperty(this, 'client', {
            value: client
        });
        Object.defineProperty(this, 'since', {
            value: null,
            writable: true
        });
        Object.defineProperty(this, 'game', {
            value: null,
            writable: true
        });
        Object.defineProperty(this, 'status', {
            value: 'online',
            writable: true
        });
        Object.defineProperty(this, 'afk', {
            value: false,
            writable: true
        });
    }

    edit(data) {
        const _data = {};
        _data.username = data.username || this.client.user;
        if (!this.client.user.bot) {
            _data.email = data.email || this.client.user.email;
            _data.password = data.password;
            if (data.new_password) _data.new_password = data.newPassword;
        }
        return this.client.rest.request('patch', Endpoints.USER('@me'), {
            auth: true,
            data: _data
        }).then(() => {
            return this;
        });
    }

    /**
     * Sets the username of the client user
     * @param {string} username The new username of the user
     * @param {string} [password] Password for the user (only for user account)
     * @returns {Promise<ClientUser>}
     * @example
     * // Sets the username of the client user
     * Client.user.setUsername('niscord');
     *   .then((user) => console.log(`Edited: ${user.username}`));
     *   .catch(console.error);
     */
    setUsername(username, password) {
        return this.edit({ username, password });
    }

    /**
     *
     * @param {Object} [options] Options for the presence
     * @returns {*}
     */
    setPresence(options = {}) {
        const status = ['online', 'idle', 'dnd', 'offline'];
        if (!status.includes(options.status) && options.status) return this.client.emit('error', new Error('Unknown status.'));
        this.since = options.since || null;
        this.game = options.game || null;
        this.afk = options.afk || false;
        this.client.send({
            op: Constants.WebSocket.OPCODES.STATUS_UPDATE,
            d: {
                since: this.since,
                game: this.game,
                status: this.status,
                afk: this.afk
            }
        });
    }
}

module.exports = ClientUser;