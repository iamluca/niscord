'use strict';

class DiscordAPIError extends Error {
    constructor(message, code, stack) {
        super(message);
        this.name = `DiscordAPIError[${code}]`;
        this.code = code;
        if (stack) {
            this.stack = stack.replace(/\w*?Error/, `${this.name}: ${this.message}`);
        };
    }
};

module.exports = DiscordAPIError;