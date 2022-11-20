const { SlashCommandBuilder, ChatInputCommandInteraction} = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
    .setName("music")
    .setDescription("Music là âm nhạc")
    .addSubcommand(subcommand => subcommand
        .setName("play")
        .setDescription("Play single song or playlist")
        .addStringOption(options => options
            .setName("query")
            .setDescription("Song name or URL")
            .setRequired(true)
            )
        )
    .addSubcommand(subcommand => subcommand
        .setName("settings")
        .setDescription("Music player settings")
        .addStringOption(options => options
            .setName("options")
            .setDescription("Choose your setting")
            .setRequired(true)
            .addChoices(
                {name: "⏸️ Pause", value: "pause"},
                {name: "▶️ Resume", value: "resume"},
                {name: "⏭️ Skip", value: "skip"},
                {name: "⏮️ Previous", value: "previous"},
                {name: "⏹️ Stop", value: "stop"},
                {name: "🔀 Shuffle", value: "shuffle"},
                {name: "♾️ Autoplay", value: "autoplay"},
                {name: "🔁 Repeat", value: "repeat"},
                {name: "📃 Queue", value: "queue"},
                )
            )
        ),
}