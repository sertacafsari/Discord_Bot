//Imports
const { Client, Events, GatewayIntentBits, Collection } = require('discord.js');
const fs = require('node:fs');
const path = require('node:path');
require('dotenv').config();

//The bot token
const botToken = process.env.DISCORD_TOKEN;

if (botToken == null){
    console.error("The bot does not have any token");
}

//Creating a new client
const client = new Client({intents: [GatewayIntentBits.Guilds]});

client.once(Events.ClientReady, readyClient => {
    console.log(`Client is ready! Logged in as ${readyClient.user.tag}`)
});

client.commands =  new Collection();

client.login(botToken);
