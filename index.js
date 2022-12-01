require('dotenv').config();
////////////////////////////////
const Token = process.env.Token;
const Database = process.env.Database;
////////////////////////////////
const { Client, Collection, GatewayIntentBits, Partials } = require('discord.js');
const { DisTube } = require('distube');
const { SoundCloudPlugin } = require('@distube/soundcloud');
const { SpotifyPlugin } = require('@distube/spotify');
const { YtDlpPlugin } = require('@distube/yt-dlp');
////////////////////////////////
const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMembers,
        GatewayIntentBits.GuildInvites,
        GatewayIntentBits.GuildBans,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.GuildMessageReactions,
        GatewayIntentBits.GuildEmojisAndStickers,
        GatewayIntentBits.GuildMessageTyping,
        GatewayIntentBits.GuildWebhooks,
        GatewayIntentBits.GuildVoiceStates
    ],
    partials: [
        Partials.Channel,
        Partials.GuildMember,
        Partials.GuildScheduledEvent,
        Partials.Message,
        Partials.Reaction,
        Partials.ThreadMember,
        Partials.User
    ]
});
////////////////////////////////
client.commands = new Collection();
client.events = new Collection();
client.subCommands = new Collection();
client.subCommandGroups = new Collection();
client.buttons = new Collection();
client.distube = new DisTube(client, {
    emitNewSongOnly: true,
    emitAddSongWhenCreatingQueue: false,
    searchSongs: 5,
    leaveOnEmpty: true,
    leaveOnFinish: false,
    leaveOnStop: false,
    nsfw: true,
    plugins: [
        new SpotifyPlugin({ emitEventsAfterFetching: true }),
        new SoundCloudPlugin(),
        new YtDlpPlugin()
    ]
});
module.exports = client;
////////////////////////////////
const { loadEvents } = require('./Structures/Handlers/EventHandler');
loadEvents(client);
const { loadButton } = require('./Structures/Handlers/ButtonHandler');
loadButton(client);
////////////////////////////////
const { connect } = require('mongoose');
connect(Database, {
}).then(() => console.log('Connected to the database.'));

client.login(Token);
