const express = require('express');
const path = require('path');
const http = require('http');
const app = express();
const server = http.createServer(app);

app.use(express.static(path.join(__dirname, 'www')));

const PORT = process.env.PORT || 3000;
server.listen(PORT, null, function() {
	console.log('Listening on port ' + PORT);
});

const env = require('dotenv')
const fs = require('fs');
const ms = require("ms");
const Discord = require('discord.js');
const client = new Discord.Client({
	disableMentions: 'all',
});

client.commands = new Discord.Collection();
cooldowns = new Discord.Collection();

const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
	const command = require(`./commands/${file}`);	client.commands.set(command.name, command);
};

token = process.env.Token;
if (!token) throw new Error('There must be a token inside the .env file! Make sure that you have created a .env file and defined the token variable with the correct bot token!')
client.prefix = process.env.Prefix;
if (!client.prefix) throw new Error('Prefix must be defined in the .env file')
client.devs = [process.env.Owner_ID];
colors = {
	red: '#da0000',
};
client.getUserFromMention = (mention) => {
	if (!mention) return;
	if (mention.startsWith('<@') && mention.endsWith('>')) {
			mention = mention.slice(2, -1);
			if (mention.startsWith('!')) {
					mention = mention.slice(1);
			};
			return client.users.cache.get(mention);
	};	
};

process.on('unhandledRejection', err => console.error(err));
client.on('error', err => console.error(err));

client.on('ready', async () => {
	console.log(`Logged in as ${client.user.tag}`);
});

client.on('message', async(message) => {
	if (message.author.bot) return;
	if (!message.content.startsWith(client.prefix)) return;
	
	const args = message.content.slice(client.prefix.length).split(/ +/);
	const commandName = args.shift().toLowerCase();
	const command = client.commands.get(commandName) || client.commands.find(cmd => cmd.aliases && cmd.aliases.includes(commandName));

	if (!command) return;

	if (!cooldowns.has(command.name)) {
		cooldowns.set(command.name, new Discord.Collection());
	};

	const now = Date.now();
	const timestamps = cooldowns.get(command.name);
	const cooldownAmount = (command.cooldown || 0) * 1000;

	if (timestamps.has(message.author.id)) {
		const expirationTime = timestamps.get(message.author.id) + cooldownAmount;

		if (now < expirationTime) {
			const timeLeft = (expirationTime - now) / 1000;
			embed = new Discord.MessageEmbed()
			.setDescription(`You need to wait another **${timeLeft.toFixed(1)}** seconds before using the **${command.name}** command again!`)
			.setColor(colors.red)
			return message.channel.send(embed);
		};		
	}; 

	timestamps.set(message.author.id, now);
	setTimeout(() => timestamps.delete(message.author.id), cooldownAmount)

	if (command.devOnly && (!client.devs.includes(message.author.id))) {
		return message.channel.send(`Heck, you're not a bot dev! ${message.author}`);
	};

	if (command.guildOnly && (message.channel.type == 'dm')) {
		return message.channel.send(`This command doesn't work inside DMs!`);
	};

	try {
		command.run(client, message, args);
	} catch (error) {
		message.channel.send(`There was an error whilst executing that command: \`${error}\``)
	}
});

client.login(token);