const Discord = require('discord.js');

module.exports = {
	name: 'ping',
	aliases: [],
	description: "Sends information of the bot response",
	devOnly: false,
	guildOnly: false,
	cooldown: 3,
	run(client, message, args) {
		message.channel.send("Loading...")
    .then((msg) => {
    let embed = new Discord.MessageEmbed()
		.setColor('RANDOM')
		.setTitle(":ping_pong: Pong!")
    .setDescription("**" + (Date.now() - msg.createdTimestamp) + " ms**")
				msg.edit(embed)
			});
}
};