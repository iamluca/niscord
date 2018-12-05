const Constants = require('../util/Constants');

class ClientUser {
    constructor(client, data) {
        this.data = data;
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