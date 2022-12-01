const { SlashCommandBuilder, PermissionFlagsBits, EmbedBuilder } = require('discord.js');

module.exports = {
    developer: true,
    data: new SlashCommandBuilder()
    .setName("get")
    .setDescription("GET")
    .setDefaultMemberPermissions(PermissionFlagsBits.Administrator),
    async execute(interaction, client) {
		
        return interaction.reply({content: 'OK', ephemeral: true});
    }
}