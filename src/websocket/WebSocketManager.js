'use strict';

const Constants = require('../util/Constants');
const ClientUser = require('../structures/ClientUser');
const EventEmitter = require('events').EventEmitter;
const Events = Constants.Events;
const Guild = require('../structures/Guild');
const GuildMember = require('../structures/GuildMember');
const Message = require('../structures/Message');
const TextChannel = require('../structures/TextChannel');
const UnavailableGuild = require('../structures/UnavailableGuild');
const User = require('../structures/User');
const WebSocket = require('ws');

class WebSocketManager extends EventEmitter {
    constructor() {
        super();
        this.ws = new WebSocket(`${Constants.WebSocket.GATEWAY.URL}/?v=${Constants.WebSocket.GATEWAY.VERSION}&encoding=${Constants.WebSocket.GATEWAY.ENCODING}`);
        this.state = null;
        this.session_id = null;
        this.readyAt = null;
    }

    connect() {
        return this.onMessage();
    }

    onMessage() {
        this.ws.addEventListener(Events.MESSAGE_CREATE, (event) => {
            const packet = JSON.parse(event.data);
            switch (packet.op) {
                case Constants.WebSocket.OPCODES.DISPATCH:
                    this.onEvent(packet);
                    break;
                case Constants.WebSocket.OPCODES.HELLO:
                    this.heartbeat(packet.d.heartbeat_interval);
                    break;
                case Constants.WebSocket.OPCODES.RECONNECT:
                    this.onClose();
                    break;
            }
        });
    }

    onEvent(packet) {
        this.seq = packet.s;
        switch (packet.t) {
            case 'READY':
                this.user = new ClientUser(this, packet.d.user);
                this.readyAt = new Date();
                for (var guild of packet.d.guilds) {
                    this.guilds.set(guild.id, new UnavailableGuild(this, guild));
                }
                this.guildLength = packet.d.guilds.length;
                this.session_id = packet.d.session_id;
                break;

            case 'GUILD_CREATE':
                /* eslint-disable no-case-declarations */
                const resolvedGuild = new Guild(this, packet.d);
                this.guilds.set(resolvedGuild.id, resolvedGuild);
                this.guildLength = this.guildLength - 1;
                if (this.guildLength === 0) {
                    this.state = Events.READY;
                    this.emit(Events.READY);
                }
                this.emit(Events.GUILD_CREATE, resolvedGuild);
                break;
            
            case 'GUILD_DELETE':
                this.emit(Events.GUILD_DELETE, packet.d);
                break;

            case 'MESSAGE_CREATE':
                if (!this.state) return;
                packet.d = new Message(this, packet.d);
                if (!this.users.has(packet.d.author.id)) this.users.set(packet.d.user.id, new User(this.client, packet.d));
                this.emit(Events.MESSAGE_CREATE, packet.d);
                break;

            case 'MESSAGE_DELETE':
                if (!this.state) return;
                this.emit(Events.MESSAGE_DELETE, packet.d);
                break;

            case 'GUILD_MEMBER_ADD':
                if (!this.state) return;
                const member = new GuildMember(this, packet.d);
                member.guild.members.set(packet.d.user.id, member);
                this.emit(Events.GUILD_MEMBER_ADD, member);
                break;

            case 'GUILD_MEMBER_REMOVE':
                if (!this.state) return;
                const currentGuild = this.guilds.get(packet.d.guild_id);
                const resolvedMember = currentGuild.members.get(packet.d.user.id);
                currentGuild.members.delete(packet.d.user.id);
                this.emit(Events.GUILD_MEMBER_REMOVE, resolvedMember);
                break;

            case 'CHANNEL_CREATE':
                if (!this.state) return;
                if (packet.d.type === 0) {
                    this.channels.set(packet.d.id, new TextChannel(this, packet.d));
                }
                this.emit(Events.CHANNEL_CREATE, packet.d);
                break;
            
            case 'CHANNEL_DELETE':
                if (!this.state) return;
                this.emit(Events.CHANNEL_DELETE, packet.d);
                break;
        }
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

    onClose() {
        this.ws.on('close', (event) => {
            this.emit(Events.DEBUG, `[${event}]Client disconnected from gateway... Attempting resume.`);
            if (event) {
                try {
                    this.connect();
                    this.emit('debug', 'Sent a gateway resume.');
                    return this.send({
                        op: Constants.WebSocket.OPCODES.RESUME,
                        d: {
                            token: this.token,
                            session_id: this.session_id,
                            seq: this.seq
                        }
                    });
                } catch (err) {
                    this.ws.close(1000);
                    this.emit('debug', 'Failed to resume connection... Stopped resuming the connection.');
                    process.exit(1);
                }
            }
        });
    }

    send(data) {
        return this.ws.send(typeof data === 'object' ? JSON.stringify(data) : data);
    }
}

module.exports = WebSocketManager;