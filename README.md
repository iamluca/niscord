# Niscord
**N**ode + D**iscord** = Niscord
<div align="center">
  <p>
    <a href="https://discord.gg/XrRhXNT"><img src="https://discordapp.com/api/guilds/469539054371864606/embed.png" alt="Discord" /></a>
  </p>
  <p>
    <a href="https://nodei.co/npm/niscord/"><img src="https://nodei.co/npm/niscord.png?downloads=true&stars=true" alt="npmInstallInfo" /></a>
  </p>
</div>

## About
Niscord is a powerful, easy-to-use JavaScript library for Discord API.
 * Powerful
 * Object-oriented
 * Easy-to-use
 * Performant
 * Simple

## Installation
*Node.js 8.0.0 or newer is required.*
**Stable**: `npm i niscord` [Not supported]
**Master**: `npm i niscord/niscord`
**Dev**: `npm i niscord/niscord#dev` [Not supported]

## Example usage
```js
const Niscord = require('niscord');
const client = new Niscord.Client();

client.on('ready', () => {
  console.log('Bot has started.');
});

client.start('Client token');
```

## Links
* [Website](https://niscord.js.org)
* [Documentation](https://niscord.js.org)
* [Discord](https://discord.gg/XrRhXNT)
* [NPM](https://npmjs.com/package/niscord)
* [GitHub](https://github.com/niscord/niscord)
