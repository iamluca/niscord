'use strict';

class Util {
  constructor() {
    throw new Error(`${this.constructor.name} class may not be invoked.`);
  }
}

module.exports = Util;
