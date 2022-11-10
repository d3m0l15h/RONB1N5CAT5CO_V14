const { SlashCommandBuilder, PermissionFlagsBits, ChatInputCommandInteraction, EmbedBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
    .setName('clear')
    .setDescription('Delete a specified number of messages from a channel or a target.')
    .setDefaultMemberPermissions(PermissionFlagsBits.ManageMessages)
    .addNumberOption(options => options
        .setName('amount')
        .setDescription('Number of messages to delete')
        .setRequired(false))
    .addUserOption(options => options
        .setName('target')
        .setDescription('Select a target to clear their messages.')
        .setRequired(false)),
    /**
     * 
     * @param {ChatInputCommandInteraction} interaction
     */
    async execute(interaction) {
        const { channel, options } = interaction;
        
        const Amount = options.getNumber('amount');
        const Target = options.getUser('target');

        const Messages = await channel.messages.fetch();

        const Response = new EmbedBuilder().setColor("DarkVividPink");

        if(Target) {
            let i = 0;
            const filtered = [];
            Messages.filter(m => {
                if(m.author.id === Target.id && Amount > i) {
                    filtered.push(m);
                    i++;
                }
            });

            await channel.bulkDelete(filtered, true).then(messages => {
                Response.setDescription(`🧹 Cleared ${messages.size} from ${Target}.`)
                interaction.reply({embeds: [Response], ephemeral: true })
            });
        }
        else {
            await channel.bulkDelete(Amount, true).then(messages => {
                Response.setDescription(`🧹 Cleared ${messages.size} from \`${channel.name}\`.`);
                interaction.reply({embeds: [Response], ephemeral: true })
            });
        }
    }
}