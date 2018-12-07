const Constants = require('../util/Constants');
const ClientUser = require('../structures/ClientUser');
const EventEmitter = require('events').EventEmitter;
const Guild = require('../structures/Guild');
const GuildMember = require('../structures/GuildMember');
const Message = require('../structures/Message');
const UnavailableGuild = require('../structures/UnavailableGuild');
const User = require('../structures/User');
const WebSocket = require('ws');

class WebSocketManager extends EventEmitter {
    constructor() {
        super();
        this.socket = new WebSocket(`${Constants.WebSocket.GATEWAY.URL}/?v=${Constants.WebSocket.GATEWAY.VERSION}&encoding=${Constants.WebSocket.GATEWAY.ENCODING}`);
        this._state = null;
    }

    connect() {
        return this.onMessage();
    }

    onMessage() {
        this.socket.addEventListener(Constants.Events.MESSAGE_CREATE, (event) => {
            const packet = JSON.parse(event.data);
            switch (packet.op) {
                case Constants.WebSocket.OPCODES.DISPATCH:
                    this.onEvent(packet);
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
                    $os: 'Niscord' // eslint-disable-line
                }
            }
        });
    }

    onEvent(packet) {
        this.seq = packet.s;
        switch (packet.t) {
            case 'READY':
                this.user = new ClientUser(this, packet.d.user);
                for (let guild of packet.d.guilds) {
                    this.guilds.set(guild.id, new UnavailableGuild(this, guild));
                }
                this.guildLength = packet.d.guilds.length;
                break;
            case 'MESSAGE_CREATE':
                if (this._state) return;
                packet.d = new Message(this, packet.d);
                if (!this.users.has(packet.d.author.id)) this.users.set(packet.d.user.id, new User(this.client, packet.d));
                this.emit(Constants.Events.MESSAGE_CREATE, packet.d);
                break;
            case 'GUILD_CREATE':
                let guild = new Guild(this, packet.d);
                this.guilds.set(guild.id, guild);
                this.guildLength = this.guildLength - 1;
                if (this.guildLength === 0) {
                    this._state = Constants.Events.READY;
                    this.emit(Constants.Events.READY);
                }
                this.emit(Constants.Events.GUILD_CREATE, guild);
                break;
            case 'GUILD_MEMBER_ADD':
                if (!this._state) return;
                const member = new GuildMember(this, packet.d);
                member.guild.members.set(packet.d.user.id, member);
                this.emit(Constants.Events.GUILD_MEMBER_ADD, member);
                break;
            case 'GUILD_MEMBER_REMOVE':
                if (!this._state) return;
                const currentGuild = this.guilds.get(packet.d.guild_id);
                const resolvedMember = currentGuild.members.get(packet.d.user.id);
                currentGuild.members.delete(packet.d.user.id);
                this.emit(Constants.Events.GUILD_MEMBER_REMOVE, resolvedMember);
                break;
        }
    }

    send(data) {
        return this.socket.send(typeof data === 'object' ? JSON.stringify(data) : data);
    }
}

module.exports = WebSocketManager;