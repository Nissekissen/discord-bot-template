const { Client, Collection } = require("discord.js");

const { token } = require('../config.json')

const client = new Client({
    intents: [],
    presence: {
        status: 'online'
    }
});

client.commands = new Collection();

const loadCommands = () => {
	const commandFiles = fs.readdirSync('./src/commands').filter(file => file.endsWith('.js'));
	for (const file of commandFiles) {
		const command = require(`./commands/${file}`);
		client.commands.set(command.data.name, command);
	}
}

const loadEvents = () => {
	const eventFiles = fs.readdirSync('./src/events').filter(file => file.endsWith('js'))

	for (const file of eventFiles) {
		const event = require(`./events/${file}`)
		if (event.once) {
			client.once(event.name, (...args) => event.execute(...args))
		} else {
			client.on(event.name, (...args) => event.execute(...args))
		}
	}
}

loadCommands();
loadEvents();
client.login(token);