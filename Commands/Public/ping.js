const { ChatInputCommandInteraction, SlashCommandBuilder } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
      .setName("ping")
      .setDescription("Ping"),
  /**
     *
     * @param {ChatInputCommandInteraction} interaction
     */
  execute(interaction, client) {
    interaction.reply({ content: `🏓 PONG! \`${client.ws.ping}ms\`` });
  }
};
