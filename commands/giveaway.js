const Discord = require('discord.js');

module.exports = {
	name: 'giveaway',
	aliases: ["🎉"],
	description: "Starts a  x minutes giveaway",
  usage: '<price> <minutes>',
	devOnly: false,
	guildOnly: false,
	cooldown: 3,
	run(client, message, args) {

let price = args.join(" ");
if (!price) return message.channel.send("You need to send a price!");

let time = args[args.length - 1];
if (!time) return message.channel.send("You need to send a time in seconds!");

const embed = new Discord.MessageEmbed()
.setTitle("🎉 Giveaway 🎉")
.setDescription("React with 🎉 to join!")
.addField("Price", price)
.setColor('RANDOM')


message.channel.send(embed).then(msg => { 

msg.react("🎉")

const filter = (reaction, user) => reaction.emoji.name == '🎉' && user.id !== client.user.id;

const collector = msg.createReactionCollector(filter, {time: time * 60000});

var array = []

collector.on("collect", r => {
array.push(r.users.cache.last().id);
})

collector.on("end", () => {

const winner = array[Math.floor(Math.random() * array.length)]

message.channel.send(`Congrats!  <@${winner}> you are the winner!`, { disableMentions: 'none' })

})

})
}
};