# helper-djs
Helper Djs is a powerful [Node.js](https://nodejs.org/) module

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
