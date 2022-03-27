const { WebhookClient, MessageEmbed } = require("discord.js")
const process = require('process');

module.exports = class ErrorHandler {
    constructor(options = {}) {

        this.webhook = (options.webhook? new WebhookClient({ url: options.webhook }) : false)
        if (!this.webhook) throw new Error('WEBHOOK_URL_INVALID');

        const channel = this.webhook

        process.on('uncaughtException', function(err) {
            console.log("Uncaught Exception: " + err);
            channel.send({ embeds: [embed(err)] });
        })

        process.on('rejectionHandled', function(err) {
            console.log('Rejection Handled: ' + err.stack);
            channel.send({ embeds: [embed(err)] });
        })

        process.on('unhandledRejection', function(err) {
            console.log('Unrejection Handled: ' + err.stack);
            channel.send({ embeds: [embed(err)] });
        })

        process.on('warning', (warning) => {
            console.warn(warning.name);
            console.warn(warning.message);
            console.warn(warning.stack);
            
            channel.send({ embeds: [embed(warning.stack)] });
        })
        
    }
}

function embed(error) {
    const errorEmbed = new MessageEmbed()
    .setColor('#f54b4b')
    .setTimestamp()
    .setDescription("\`\`\`js\n" + error + "\`\`\`")

    return errorEmbed
}
