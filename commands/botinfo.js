const Discord = require('discord.js');

module.exports = {
	name: 'botinfo',
	aliases: ["bot-info", "info"],
	description: "Shows the bot info",
	usage: '<>',
	devOnly: false,
	guildOnly: false,
	cooldown: 3,
	run(client, message, args) {
const embed = new Discord.MessageEmbed()
.addField("Bot owner", process.env.Owner)
.addField("Developers", process.env.Developers)
.addField("Servers", ` ${client.guilds.cache.size}`)
.addField("Users", ` ${client.users.cache.size}`)
.addField("Ram", ` ${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)} MB`)
message.channel.send(embed)
}
};