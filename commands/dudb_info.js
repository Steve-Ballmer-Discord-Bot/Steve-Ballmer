const Discord = require('discord.js');
const dudb = require("dudb.js");

module.exports = {
	name: 'dudb_info',
	aliases: [],
	description: "Sends info from dudb",
  usage: '<user>',
	devOnly: false,
	guildOnly: false,
	cooldown: 3,
	run(client, message, args) {
let user = args.join(" ");
  
if(!user) return message.channel.send(`Mention the user to check`);

dudb.check(user).then(result => message.chanell.send(embed));
}
};