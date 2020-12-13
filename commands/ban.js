const Discord = require('discord.js');

module.exports = {
	name: 'ban',
	aliases: ['ban'],
	description: "Ban someone in the current server",
	usage: '<@User/ID> [reason]',
	cooldown: 3,
	guildOnly: true,
	devOnly: false,
	async run(client, message, args) {
		if (!message.guild.me.hasPermission('BAN_MEMBERS')) return message.channel.send('I do not have the ban members permission in this server!');
		if (!message.member.hasPermission('BAN_MEMBERS')) return message.channel.send(`${message.author.username}, I can't let you do that.`)
		if (!args.length) return message.channel.send("You need to give a user to ban!");
		let reason = args.slice(1).join(' ');
		let toBan;
			toBan = message.guild.member(client.getUserFromMention(args[0]));
		if (!toBan) toBan = message.guild.members.cache.get(args[0]);
		if (!toBan) return message.channel.send(`I can't find that user.`);
		if (toBan.hasPermission('BAN_MEMBERS')) return message.channel.send("You can't ban " + toBan.user.tag + " because they seem to have the ban members permission.")
		toBan.send(`You have been banned from **${message.guild.name}** by **${Discord.escapeMarkdown(message.author.tag)}** because of "${reason}"`).catch((e) => {});
		await message.guild.members.ban(toBan.id, { reason: `Banned by ${message.author.tag} | Reason: ${reason}` })
			.then((user) => {
				message.channel.send(`Success! **${Discord.escapeMarkdown(user.tag)}** was banned for "${reason || "[No Reason Given]"}"`)
			})

	},
};