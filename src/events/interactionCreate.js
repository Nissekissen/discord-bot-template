const { InteractionType } = require('discord.js')
const fs = require('fs')

module.exports = {
    name: 'interactionCreate',
    async execute(interaction) {
        if (interaction.type === InteractionType.ApplicationCommand) {
            // Commands
            const command = interaction.client.commands.get(interaction.commandName);
            if (!command) return;
            try {
                await command.execute(interaction);
                console.log(`${interaction.member.user.username} ran the command ${command.data.name}`)
            } catch (error) {
                await interaction.reply({content: 'There was an error while executing this command!', ephemeral: true});
                console.log(error);
            }
        } else if (interaction.type === InteractionType.MessageComponent) {
            // Buttons and select menus
            const buttonFiles = fs.readdirSync('./src/buttons').filter(file => file.endsWith('js'))
            for (const file of buttonFiles) {
                const buttonData = require(`../buttons/${file}`)
                if (interaction.customId.startsWith(buttonData.builder.data.custom_id)) {
                    console.log(`${interaction.member.user.username} used the message component ${buttonData.builder.data.custom_id}.`)
                    return await buttonData.execute(interaction);
                }
            }
        }
    }
}