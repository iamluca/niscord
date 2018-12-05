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

exports.Events = {
    RATE_LIMIT: 'rateLimit',
    READY: 'ready',
    RESUMED: 'resumed',
    GUILD_CREATE: 'guildCreate',
    GUILD_DELETE: 'guildDelete',
    GUILD_UPDATE: 'guildUpdate',
    GUILD_UNAVAILABLE: 'guildUnavailable',
    GUILD_AVAILABLE: 'guildAvailable',
    GUILD_MEMBER_ADD: 'guildMemberAdd',
    GUILD_MEMBER_REMOVE: 'guildMemberRemove',
    GUILD_MEMBER_UPDATE: 'guildMemberUpdate',
    GUILD_MEMBER_AVAILABLE: 'guildMemberAvailable',
    GUILD_MEMBER_SPEAKING: 'guildMemberSpeaking',
    GUILD_MEMBERS_CHUNK: 'guildMembersChunk',
    GUILD_INTEGRATIONS_UPDATE: 'guildIntegrationsUpdate',
    GUILD_ROLE_CREATE: 'roleCreate',
    GUILD_ROLE_DELETE: 'roleDelete',
    GUILD_ROLE_UPDATE: 'roleUpdate',
    GUILD_EMOJI_CREATE: 'emojiCreate',
    GUILD_EMOJI_DELETE: 'emojiDelete',
    GUILD_EMOJI_UPDATE: 'emojiUpdate',
    GUILD_BAN_ADD: 'guildBanAdd',
    GUILD_BAN_REMOVE: 'guildBanRemove',
    CHANNEL_CREATE: 'channelCreate',
    CHANNEL_DELETE: 'channelDelete',
    CHANNEL_UPDATE: 'channelUpdate',
    CHANNEL_PINS_UPDATE: 'channelPinsUpdate',
    MESSAGE_CREATE: 'message',
    MESSAGE_DELETE: 'messageDelete',
    MESSAGE_UPDATE: 'messageUpdate',
    MESSAGE_BULK_DELETE: 'messageDeleteBulk',
    MESSAGE_REACTION_ADD: 'messageReactionAdd',
    MESSAGE_REACTION_REMOVE: 'messageReactionRemove',
    MESSAGE_REACTION_REMOVE_ALL: 'messageReactionRemoveAll',
    USER_UPDATE: 'userUpdate',
    USER_NOTE_UPDATE: 'userNoteUpdate',
    USER_SETTINGS_UPDATE: 'clientUserSettingsUpdate',
    PRESENCE_UPDATE: 'presenceUpdate',
    VOICE_STATE_UPDATE: 'voiceStateUpdate',
    VOICE_BROADCAST_SUBSCRIBE: 'subscribe',
    VOICE_BROADCAST_UNSUBSCRIBE: 'unsubscribe',
    TYPING_START: 'typingStart',
    TYPING_STOP: 'typingStop',
    WEBHOOKS_UPDATE: 'webhookUpdate',
    DISCONNECT: 'disconnect',
    RECONNECTING: 'reconnecting',
    ERROR: 'error',
    WARN: 'warn',
    DEBUG: 'debug',
    SHARD_READY: 'shardReady',
    INVALIDATED: 'invalidated',
    RAW: 'raw',
};