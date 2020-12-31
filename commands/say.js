const Discord = require('discord.js');

module.exports = {
	name: 'say',
	aliases: [],
	description: "Says text",
	usage: '<text>',
	devOnly: false,
	guildOnly: false,
	cooldown: 3,
	run(client, message, args) {

let text = args.join(" ");
  
if(!text) return message.channel.send(`Input text`);

message.channel.send(args.join(" "));
  message.delete();  
}
};