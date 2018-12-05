const Constants = require('../util/Constants');
const EventEmitter = require('events').EventEmitter;
const Message = require('../structures/Message');
const UnavailableGuild = require('../structures/UnavailableGuild');
const WebSocket = require('ws');

class WebSocketConnection extends EventEmitter {
    constructor() {
        super();
        this.socket = new WebSocket(`${Constants.WebSocket.GATEWAY.URL}/?v=${Constants.WebSocket.GATEWAY.VERSION}&encoding=${Constants.WebSocket.GATEWAY.ENCODING}`);
        this._state = null;
    }

    connect() {
        return this.emitMessage();
    }

    emitEvent(packet) {
        this.seq = packet.s;
        switch (packet.t) {
            case 'READY':
                for (var guild of packet.d.guilds) {
                    this.guilds.set(guild.id, new UnavailableGuild(this, guild));
                }
                this.guildLength = packet.d.guilds.length;
                break;
            case 'MESSAGE_CREATE':
                if (this._state) return;
                packet.d = new Message(this, packet.d);
                this.emit(Constants.Events.MESSAGE_CREATE, packet.d);
                break;
        }
    }

    emitMessage() {
        this.socket.addEventListener(Constants.Events.MESSAGE_CREATE, (event) => {
            const packet = JSON.parse(event.data);
            switch (packet.op) {
                case Constants.WebSocket.OPCODES.DISPATCH:
                    this.emitEvent(packet);
                    break;
                case Constants.WebSocket.OPCODES.HELLO:
                    this.heartbeat(packet.d.heartbeat_interval);
                    break;
            }
        });
    }

    heartbeat(interval) {
        setInterval(() => {
            this.send({
                op: Constants.WebSocket.OPCODES.HEARTBEAT,
                d: null
            });
        }, interval);
        this.send({
            op: Constants.WebSocket.OPCODES.IDENTIFY,
            d: {
                token: this.token,
                properties: {
                    $os: process.platform,
                    $browser: 'Niscord',
                    $os: 'Niscord' // eslint-disable-line no-dupe-keys
                }
            }
        });
    }

    send(data) {
        return this.socket.send(typeof data === 'object' ? JSON.stringify(data) : data);
    }
}

module.exports = WebSocketConnection;