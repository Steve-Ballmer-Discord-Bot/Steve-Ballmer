const Discord = require('discord.js')
const ms = require("ms");

module.exports = {
	name: 'slowmode',
	aliases: [],
	guildOnly: true,
	devOnly: false,
	cooldown: 2,
	description: 'Sets the slowmode',
	usage: '<>',
	async run(client, message, args) {
        if(!message.member.hasPermission("MANAGE_CHANNELS")){
            return message.channel.send("You don't have permissions to use this command")
        }
        let channel = message.mentions.channels.first() || message.channel
        let time = args.join(' ');
        if (args[0] == 'off') {
            channel.setRateLimitPerUser(0)
            return message.channel.send("Slowmode deactivated")
        }
        if(!time) return message.channel.send('Input a valid naumber')
        let convert = ms(time)
        let toSecond = Math.floor(convert / 1000); ("Format not valid")
  await channel.setRateLimitPerUser(toSecond);
  return message.channel.send("Slowmode is now activated!");
}
}