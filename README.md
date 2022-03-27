# helper-djs
Helper Djs is a powerful [Node.js](https://nodejs.org/) module

<div align="center">
  <p>
    <a href="https://discord.gg/zyRX8nNt7b"><img src="https://img.shields.io/discord/867769297467473950?color=5865F2&logo=discord&logoColor=white" alt="Discord server" /></a>
    <a href="https://www.npmjs.com/package/helper-djs"><img src="https://img.shields.io/npm/v/helper-djs.svg?maxAge=3600" alt="npm version" /></a>
    <a href="https://www.npmjs.com/package/helper-djs"><img src="https://img.shields.io/npm/dt/helper-djs.svg?maxAge=3600" alt="npm downloads" /></a>
  </p>
</div>

## Features
- Error Handler

## Installation

```sh-session
npm install helper-djs
```

## Bot Setup

```js
const { Client } = require("discord.js")
const client = new Client({
  intents: 32767, //All the intents
})

const { ErrorHandler } = require('helper-djs')

new ErrorHandler({ webhook: "webhook url" })

client.login('Secret Token')
```

If you need any help then feel free to join the <img src='https://cdn.icon-icons.com/icons2/2108/PNG/512/discord_icon_130958.png' width='14'> [Support Server](https://discord.gg/zyRX8nNt7b)
