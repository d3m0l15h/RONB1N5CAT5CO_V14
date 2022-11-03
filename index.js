require('dotenv').config();
////////////////////////////////
const Token = process.env.Token;
const Database = process.env.Database;
////////////////////////////////
const { Client, Collection, GatewayIntentBits, Partials } = require('discord.js');
const { Guilds, GuildMembers, GuildMessages } = GatewayIntentBits;
const { User, Message, GuildMember, ThreadMember} = Partials;

const client = new Client({ 
    intents: [Guilds, GuildMembers, GuildMessages],
    partials: [User, Message, GuildMember, ThreadMember] 
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
