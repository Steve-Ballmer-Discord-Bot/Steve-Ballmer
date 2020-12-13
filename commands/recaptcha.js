const Discord = require('discord.js');

module.exports = {
	name: 'recaptcha',
	aliases: [],
	description: "Make a fake google recaptcha v2 not a bot",
  usage: '<text>',
	devOnly: false,
	guildOnly: false,
	cooldown: 3,
	run(client, message, args) {


        let msg = args.join('%20')

        if(!msg) return message.channel.send('Send an msg').then(m => m.delete({timeout: 7000}))

        let api = `https://api.no-api-key.com/api/v2/recaptcha?text=${msg}`

        const TrumpSay = new Discord.MessageEmbed()
        .setImage(api)
        .setColor('RANDOM')

        message.channel.send(TrumpSay)
}
};