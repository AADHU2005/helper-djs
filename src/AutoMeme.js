const { Client, MessageEmbed } = require('discord.js')
const got = require('got')

/**
 * @param {Client} client
 */

module.exports = class AutoMeme {
    constructor(options = {}) {

        if (!options.guild) throw new ReferenceError("GUILD_ID_UNAVAILABLE")
        if (typeof options.guild !== "string") throw new TypeError("options.guild must be a String.")
        this.guild = options.guild

        if (!options.channel) throw new ReferenceError("CHANNEL_ID_UNAVALIABLE")
        if (typeof options.channel !== "string") throw new TypeError("options.channel must be a String.")
        this.channel = options.channel

        if (!options.interval) this.interval = 120000
        if (typeof options.interval !== "number") throw new TypeError("options.interval must be a Number.")
        if (options.interval < 30000) throw new RangeError("options.interval must to above 30000.")
        if (options.interval > 300000) throw new RangeError("option.interval must be below 300000.")
        this.interval = options.interval
    }

    async start(client) {
        if (!client) throw new ReferenceError("CLIENT_UNAVALIABLE")

        const guildID = this.guild;
        const channelID = this.channel;
        const interval = this.interval;

        const guild = client.guilds.cache.get(guildID)
        if (!guild) throw new ReferenceError("GUILD_INVAILD")

        const channel = guild.channels.cache.get(channelID)
        if (!channel) throw new ReferenceError("CHANNEL_INVAILD")

        const sub = ['meme','me_irl', 'memes', 'dankmeme', 'dankmemes', 'ComedyCemetery', 'terriblefacebookmemes', 'funny']
        const random = Math.floor(Math.random() * sub.length)

        setInterval(async() => {
            await got(`https://www.reddit.com/r/${sub[random]}/random/.json`)
			.then((response) => {

                if (!response) return;

                const [list] = JSON.parse(response.body);
                const [post] = list.data.children;

				if (post.data.over_18 === true) return;

                const permalink = post.data.permalink;
				const url = `https://reddit.com${permalink}`
                const vote = post.data.ups;
				const image = post.data.url;
				const title = post.data.title;

                const embed = new MessageEmbed()
                .setColor("AQUA")
                .setImage(image)
                .setTitle(`${title}`)
                .setURL(`${url}`)
                .setFooter({ text: `👍 ${vote} upvotes`})

                channel.send({ embeds: [embed] })
            })
        }, interval);
    }
}