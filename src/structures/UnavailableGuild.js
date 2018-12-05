class UnavailableGuild {
    constructor(client, data) {
        Object.defineProperty(this, 'client', { value: client });

        /**
         * @type {boolean}
         */
        this.available = !data.unavailable;

        /**
         * @type {String}
         */
        this.id = data.id;
    }
}

module.exports = UnavailableGuild;