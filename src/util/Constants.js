const Package = exports.Package = require('../../package.json');
const browser = exports.browser = typeof window !== 'undefined';

exports.Errors = {
    INVALID_TOKEN: 'Invalid token.'
};

exports.Http = {
    API: 'https://discordapp.com/api/v',
    VERSION: 7
};

exports.UserAgent = browser ? null : `DiscordBot (${Package.homepage.split('#')[0]}, ${Package.version}) Node.js/${process.version}`;

exports.Endpoints = {
    // User
    USER: (userID) => `users/${userID}`,
    USER_CHANNELS: (userID) => `users/${userID}/channels`,
    USER_GUILD: (guildID) => `users/@me/guilds/${guildID}`,
    USERS: `users`,

    // Channel
    CHANNELS: (channelID) => `channels/${channelID}`,
    CHANNEL_INVITES: (channelID) => `channels/${channelID}/invites`,
    CHANNEL_MESSAGE: (channelID, messageID) => `channels/${channelID}/messages/${messageID}`,
    CHANNEL_MESSAGES: (channelID) => `channels/${channelID}/messages`,
    CHANNEL_BULK_DELETE: (channelID) => `channels/${channelID}/messages/bulk-delete`,
    CHANNEL_PIN_MESSAGES: (channelID, messageID) => `channels/${channelID}/pins/${messageID}`,
    CHANNEL_PINNED_MESSAGES: (channelID) => `channels/${channelID}/pins`,
    CHANNEL_WEBHOOKS: (channelID) => `channels/${channelID}/webhooks`,

    // Guild
    GUILDS: (guildID) => `guilds/${guildID}`,
    GUILD_BAN: (guildID, userID) => `guilds/${guildID}/bans/${userID}`,
    GUILD_BANS: (guildID) => `guilds/${guildID}/bans`,
    GUILD_CHANNELS: (guildID) => `guilds/${guildID}/channels`,
    GUILD_INVITES: (guildID) => `guilds/${guildID}/invites`,
    GUILD_MEMBER: (guildID, userID) => `guilds/${guildID}/members/${userID}`,
    GUILD_MEMBERS: (guildID) => `guilds/${guildID}/members`,
    GUILD_REGIONS: (guildID) => `guilds/${guildID}/regions`,
    GUILD_PRUNE: (guildID) => `guilds/${guildID}/prune`,
    GUILD_ROLE: (guildID, roleID) => `guilds/${guildID}/roles/${roleID}`,
    GUILD_MEMBER_ROLE: (guildID, userID, roleID) => `guilds/${guildID}/members/${userID}/roles/${roleID}`
};

exports.WebSocket = {
    OPCODES: {
        DISPATCH: 0,
        HEARTBEAT: 1,
        IDENTIFY: 2,
        STATUS_UPDATE: 3,
        VOICE_STATE_UPDATE: 4,
        VOICE_GUILD_PING: 5,
        RESUME: 6,
        RECONNECT: 7,
        REQUEST_GUILD_MEMBERS: 8,
        INVALID_SESSION: 9,
        HELLO: 10,
        HEARTBEAT_ACK: 11,
    },

    GATEWAY: {
        URL: 'wss://gateway.discord.gg/',
        VERSION: 6,
        ENCODING: 'json'
    }
};