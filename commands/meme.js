const Discord = require('discord.js');
const { meme } = require("memejs")

module.exports = {
	name: 'meme',
	aliases: [],
	description: "Sends a meme image from r/wholesomememes",
	devOnly: false,
	guildOnly: false,
	cooldown: 3,
	run(client, message, args) {

meme('wholesomememes', function(err, data) { 
if (err) return message.reply(err)
const embed = new Discord.MessageEmbed()
.setColor("RANDOM")
.setImage(data.url)
message.channel.send(embed)
})
}
};