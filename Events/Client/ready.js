const { Client } = require('discord.js');
const { loadCommands } = require('../../Structures/Handlers/CommandHandler');
module.exports = {
  name: 'ready',
  once: true,
  /**
     * @param {Client} client
     */
  execute(client) {
    console.log('The client is ready!');
    client.user.setActivity('SOUL', { type: 'LISTENING' });
    loadCommands(client)

  }
};
