'use strict';

module.exports = {

    // Structures
    Channel: require('./structures/Channel'),
    Client: require('./structures/Client'),
    ClientUser: require('./structures/ClientUser'),
    Guild: require('./structures/Guild'),
    GuildMember: require('./structures/GuildMember'),
    Message: require('./structures/Message'),
    TextChannel: require('./structures/TextChannel'),
    UnavailableGuild: require('./structures/UnavailableGuild'),
    User: require('./structures/User'),

    // Util
    Collection: require('./util/Collection'),
    Constants: require('./util/Constants'),
    Database: require('./util/Database'),
    Util: require('./util/Util'),
    version: require('../package.json').version
};
