require('dotenv').config();
////////////////////////////////
const Token = process.env.Token;
const Database = process.env.Database;
////////////////////////////////
const { Client, Collection, GatewayIntentBits, Partials } = require('discord.js');

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
////////////////////////////////
const { loadEvents } = require('./Structures/Handlers/EventHandler');
loadEvents(client);
////////////////////////////////
const { connect } = require('mongoose');
connect(Database, {   
}).then(() => console.log('Connected to the database.'));

client.login(Token);
