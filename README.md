<div id="info" align="center">
  <p>
    <a href="https://niscord.js.org"><img src="https://niscord.js.org/assets/banner.png" width="546" alt="banner" /></a>
  </p>
  <p>
    <a href="https://discord.gg/hga9SeN"><img src="https://discordapp.com/api/guilds/469539054371864606/embed.png" alt="Discord" /></a>
    <a href="https://www.npmjs.com/package/niscord"><img src="https://img.shields.io/npm/v/niscord.svg?maxAge=3600" alt="npmVersion" /></a>
    <a href="https://www.npmjs.com/package/niscord"><img src="https://img.shields.io/npm/dt/niscord.svg?maxAge=3600" alt="npmDownloads" /></a>
  </p>
  <p>
    <a href="https://nodei.co/npm/niscord/"><img src="https://nodei.co/npm/niscord.png?downloads=true&stars=true" alt="npmInstall" /></a>
  </p>
</div>

## About
[Niscord](https://niscord.js.org) is a powerful [JavaScript](https://nodejs.org) library for [Discord API](https://discordapp.com/developers/docs).

 * Powerful
 * Object-oriented
 * Easy-to-use
 * Performant

## Installation
*Node.js 4.0.0 or newer is required.*

*Voice isn't supported yet.*

**Stable**: `npm i niscord`

**Master**: `npm i niscord/niscord`

**Dev**: `Not published`

## Example usage
```js
const Niscord = require('niscord');
const client = new Niscord.Client();

client.on('ready', () => {
  console.log(`Logged in as ${client.user.username}#${client.user.discriminator}.`);
});

client.login('Client token');
```

## Links
* [Website](https://niscord.js.org)
* [Documentation](https://niscord.js.org)
* [Discord](https://discord.gg/hga9SeN)
* [GitHub](https://github.com/niscord/niscord)
* [NPM](https://npmjs.com/package/niscord)
