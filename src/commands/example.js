const { SlashCommandBuilder } = require("discord.js");

module.exports = {
    data: new SlashCommandBuilder()
        .setName('example')
        .setDescription('This is just an example. Delete this.'),
    async execute(interaction) {
        await interaction.reply({ content: 'This command is just an example. Delete this.', ephemeral: true });
    }
}