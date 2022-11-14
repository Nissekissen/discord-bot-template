const { ButtonBuilder, ButtonStyle } = require("discord.js");

module.exports = {
    builder: new ButtonBuilder()
        .setLabel('Example button')
        .setStyle(ButtonStyle.Primary)
        .setDisabled(false),
    async execute(interaction) {
        await interaction.reply({ content: 'This button is just an example. Delete this.', ephemeral: true })
    }
}