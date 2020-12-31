const Discord = require('discord.js');

module.exports = {
    name: 'screenshot',
    aliases: [],
    description: "Takes a screenshot of a website",
    usage: '<url>',
    devOnly: false,
    guildOnly: false,
    cooldown: 3,
    run(client, message, args) {

let url = args.join(" ");
  
if(!url) return message.channel.send(`Input a url`);

let embed = new Discord.MessageEmbed()
.setColor('RANDOM')
.setTitle("Screenshot of " + url)
.setImage("https://screenshot.totallyusefulapi.ml/api?url=" + url)

message.channel.send(embed)
}
};