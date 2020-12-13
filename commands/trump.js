const Discord = require('discord.js');

module.exports = {
	name: 'trump',
	aliases: [],
	description: "Allows you to make a fake tweet as trump",
  usage: '<text>',
	devOnly: false,
	guildOnly: false,
	cooldown: 3,
	run(client, message, args) {


        let msg = args.join('%20')

        if(!msg) return message.channel.send('Send an msg').then(m => m.delete({timeout: 7000}))

        let api = `https://api.no-api-key.com/api/v2/trump?message=${msg}`

        const TrumpSay = new Discord.MessageEmbed()
        .setImage(api)
        .setColor('RANDOM')

        message.channel.send(TrumpSay)
}
};