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
    USER: (userID) => `/users/${userID}`,
    USER_CHANNELS: (userID) => `/users/${userID}/channels`,
    USER_CONNECTIONS: (userID) => `/users/${userID}/connections`,
    USER_CONNECTION_PLATFORM: (userID, platform, id) => `/users/${userID}/connections/${platform}/${id}`,
    USER_GUILD: (userID, guildID) => `/users/${userID}/guilds/${guildID}`,
    USER_GUILDS: (userID) => `/users/${userID}/guilds`,
    USER_MFA_CODES: (userID) => `/users/${userID}/mfa/codes`,
    USER_MFA_TOTP_DISABLE: (userID) => `/users/${userID}/mfa/totp/disable`,
    USER_MFA_TOTP_ENABLE: (userID) => `/users/${userID}/mfa/totp/enable`,
    USER_NOTE: (userID, targetID) => `/users/${userID}/note/${targetID}`,
    USER_PROFILE: (userID) => `/users/${userID}/profile`,
    USER_RELATIONSHIP: (userID, relID) => `/users/${userID}/relationships/${relID}`,
    USER_SETTINGS: (userID) => `/users/${userID}/settings`,
    USERS: '/users',

    // Guild
    GUILD: (guildID) => `/guilds/${guildID}`,
    GUILD_AUDIT_LOGS: (guildID) => `/guilds/${guildID}/audit-logs`,
    GUILD_BAN: (guildID, memberID) => `/guilds/${guildID}/bans/${memberID}`,
    GUILD_BANS: (guildID) => `/guilds/${guildID}/bans`,
    GUILD_CHANNELS: (guildID) => `/guilds/${guildID}/channels`,
    GUILD_EMBED: (guildID) => `/guilds/${guildID}/embed`,
    GUILD_EMOJI: (guildID, emojiID) => `/guilds/${guildID}/emojis/${emojiID}`,
    GUILD_EMOJIS: (guildID) => `/guilds/${guildID}/emojis`,
    GUILD_INTEGRATION: (guildID, inteID) => `/guilds/${guildID}/integrations/${inteID}`,
    GUILD_INTEGRATION_SYNC: (guildID, inteID) => `/guilds/${guildID}/integrations/${inteID}/sync`,
    GUILD_INTEGRATIONS: (guildID) => `/guilds/${guildID}/integrations`,
    GUILD_INVITES: (guildID) => `/guilds/${guildID}/invites`,
    GUILD_MEMBER: (guildID, memberID) => `/guilds/${guildID}/members/${memberID}`,
    GUILD_MEMBER_NICK: (guildID, memberID) => `/guilds/${guildID}/members/${memberID}/nick`,
    GUILD_MEMBER_ROLE: (guildID, memberID, roleID) => `/guilds/${guildID}/members/${memberID}/roles/${roleID}`,
    GUILD_MEMBERS: (guildID) => `/guilds/${guildID}/members`,
    GUILD_MESSAGES_SEARCH: (guildID) => `/guilds/${guildID}/messages/search`,
    GUILD_PRUNE: (guildID) => `/guilds/${guildID}/prune`,
    GUILD_ROLE: (guildID, roleID) => `/guilds/${guildID}/roles/${roleID}`,
    GUILD_ROLES: (guildID) => `/guilds/${guildID}/roles`,
    GUILD_VOICE_REGIONS: (guildID) => `/guilds/${guildID}/regions`,
    GUILD_WEBHOOKS: (guildID) => `/guilds/${guildID}/webhooks`,
    GUILDS: '/guilds',

    // Channel
    CHANNEL: (channelID) => `/channels/${channelID}`,
    CHANNEL_BULK_DELETE: (channelID) => `/channels/${channelID}/messages/bulk-delete`,
    CHANNEL_CALL_RING: (channelID) => `/channels/${channelID}/call/ring`,
    CHANNEL_INVITES: (channelID) => `/channels/${channelID}/invites`,
    CHANNEL_MESSAGE_REACTION: (channelID, messageID, reaction) => `/channels/${channelID}/messages/${messageID}/reactions/${reaction}`,
    CHANNEL_MESSAGE_REACTION_USER: (channelID, messageID, reaction, userID) => `/channels/${channelID}/messages/${messageID}/reactions/${reaction}/${userID}`,
    CHANNEL_MESSAGE_REACTIONS: (channelID, messageID) => `/channels/${channelID}/messages/${messageID}/reactions`,
    CHANNEL_MESSAGE: (channelID, messageID) => `/channels/${channelID}/messages/${messageID}`,
    CHANNEL_MESSAGES: (channelID) => `/channels/${channelID}/messages`,
    CHANNEL_MESSAGES_SEARCH: (channelID) => `/channels/${channelID}/messages/search`,
    CHANNEL_PERMISSION: (channelID, overID) => `/channels/${channelID}/permissions/${overID}`,
    CHANNEL_PERMISSIONS: (channelID) => `/channels/${channelID}/permissions`,
    CHANNEL_PIN: (channelID, messageID) => `/channels/${channelID}/pins/${messageID}`,
    CHANNEL_PINS: (channelID) => `/channels/${channelID}/pins`,
    CHANNEL_RECIPIENT: (groupID, userID) => `/channels/${groupID}/recipients/${userID}`,
    CHANNEL_TYPING: (channelID) => `/channels/${channelID}/typing`,
    CHANNEL_WEBHOOKS: (channelID) => `/channels/${channelID}/webhooks`,
    CHANNELS: '/channels'
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

exports.ChannelTypes = {
    TEXT: 0,
    DM: 1,
    VOICE: 2,
    GROUP: 3,
    CATEGORY: 4,
};