'use strict';

const Guild = require('../structures/Guild');
const Message = require('../structures/Message');
const User = require('../structures/User');

class Util {
  constructor() {
    throw new Error(`${this.constructor.name} class may not be invoked.`);
  }

  /**
   * 
   * @param {User} user The user to identify
   * @returns {?User}
   */
  static resolveUser(user) {
    if (user instanceof User) return user;
    if (typeof user === 'string') return this.client.users.get(user) || null;
    if (user instanceof GuildMember) return user.user;
    if (user instanceof Message) return user.author;
    if (user instanceof Guild) return user.owner;
    return null;
  }

  /**
   * Resolves a User to a user ID.
   * @param {User} user The user to identify
   * @returns {string}
   */
  static resolveUserID(user) {
    if (user instanceof User || user instanceof GuildMember) return user.id;
    if (typeof user === 'string') return user || null;
    if (user instanceof Message) return user.author.id;
    if (user instanceof Guild) return user.ownerID;
    return null;
  }

  /**
   * 
   * @param {Object} obj
   * @param {string} sep 
   * @param {string} eq 
   * @param {string} name 
   */
  static stringify(obj, sep, eq, name) {
    function stringifyPrimitive(v) {
      switch (typeof v) {
        case 'string':
          return v;
        case 'boolean':
          return v ? 'true' : 'false';
        case 'number':
          return isFinite(v) ? v : '';
        default:
          return '';
      }
    };

    sep = sep || '&';
    eq = eq || '=';
    if (obj === null) obj = undefined;
    if (typeof obj === 'object') {
      return Object.keys(obj).map(function (k) {
        var ks = encodeURIComponent(stringifyPrimitive(k)) + eq;
        if (Array.isArray(obj[k])) {
          return obj[k].map(function (v) {
            return ks + encodeURIComponent(stringifyPrimitive(v));
          }).join(sep);
        } else {
          return ks + encodeURIComponent(stringifyPrimitive(obj[k]));
        }
      }).filter(Boolean).join(sep);
    }
    if (!name) return '';
    return encodeURIComponent(stringifyPrimitive(name)) + eq + encodeURIComponent(stringifyPrimitive(obj));
  }
}

module.exports = Util;
