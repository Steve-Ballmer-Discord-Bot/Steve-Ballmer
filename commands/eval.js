const Discord = require('discord.js')
const beautify = require("beautify") 

module.exports = {
	name: 'eval',
	aliases: ['eval'],
	description: "Get a list of commands",
	usage: '<commandName>',
	devOnly: true,
	guildOnly: false,
	cooldown: 3,
  run: (client, message, args) => { 
        let toEval = args.join(" ") 
        if(!toEval) {
            let embed = new Discord.MessageEmbed()
            .setDescription("You need to evaluate something!")
            .setColor(3447003)
            message.channel.send(embed)
            .then(m => m.delete(1000))
        }
        try { 
        let evaluated = eval(toEval) 
       
        let beautify = require("beautify") 
        let embed = new Discord.MessageEmbed() 
        .setColor(3447003)
        .setTimestamp() 
        .setFooter(client.user.username, client.user.displayAvatarURL)
        .setTitle("Evaluations")
        .addField("Code:", "```js\n"+beautify(args.join(" "), { format: "js" })+"```")
        .addField("Evaluated:", "```js\n"+evaluated+"```") 
        message.channel.send(embed)
    } catch(err) { 
        let beautify = require("beautify")
       let embed2 = new Discord.MessageEmbed()
       .setTimestamp()
       .setFooter(client.user.username, client.user.displayAvatarURL)
       .addField("Error:", "```js\n"+err+"```")
       .setColor(3447003)
       message.channel.send(embed2) 
    }
}
};