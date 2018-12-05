'use strict';
const Constants = require('../util/Constants');
const Endpoints = require('../util/Constants').Endpoints;
const User = require('./User');

/**
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
        return this.client.rest.request('patch', Endpoints.USER('@me'), {
            auth: true,
            data: data
        }).then(() => {
            return this;
        });
    }

    /**
     * 
     * @param {Object} [options] Options for the presence
     * @returns {void}
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