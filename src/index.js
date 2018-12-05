'use strict';

module.exports = {

    // Structures
    Client: require('./structures/Client'),
    ClientUser: require('./structures/ClientUser'),
    Message: require('./structures/Message'),
    UnavailableGuild: require('./structures/UnavailableGuild'),

    // Util
    Collection: require('./util/Collection'),
    Constants: require('./util/Constants'),
    Database: require('./util/Database'),
    version: require('../package.json').version
};