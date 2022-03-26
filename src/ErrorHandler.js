const { WebhookClient, MessageEmbed } = require("discord.js")
const process = require('process');

module.exports = class ErrorHandler {
    constructor(option = {}) {

        this.webhook = (options.webhook? new WebhookClient(options.webhook) : false)
        if (!this.webhook) throw new Error('WEBHOOK_URL_INVALID');

    }

    async errorlogger() {

        const channel = this.webhook

        process.on('uncaughtException', function(err) {
            console.log("Uncaught Exception" + err);
            channel.send({ embed: [embed(err)] });
        })

        process.on('rejectionHandled', function(err) {
            console.log('Rejection Handled: ' + err.stack);
            channel.send({ embed: [embed(err)] });
        })

        process.on('unhandledRejection', function(err) {
            console.log('Unrejection Handled: ' + err.stack);
            channel.send({ embed: [embed(err)] });
        })

        process.on('warning', (warning) => {
            console.warn(warning.name);
            console.warn(warning.message);
            console.warn(warning.stack);
            
            channel.send({ embed: [embed(warning.stack)] });
        })
    }
}

function embed(error) {
    const errorEmbed = new MessageEmbed()
    .setColor('#f54b4b')
    .setTimestamp()
    .setDescription("\`\`\`js\n" + short(error, 4085) + "\`\`\`")

    return errorEmbed
}

function short(string, limit) {
    if(string.length <= limit){
      return string;
    }
    return string.slice(0,limit) + '...';
}