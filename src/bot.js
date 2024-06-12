/**
 * @fileoverview Bot's main file that contain the main function to start the bot
 * and the event listeners and command handlers for the bot. 
 * -----------------------------------------------------------------------------------
 * As the developer team, we thank the following sources for their help:
 * - Discord.js documentation
 * -----------------------------------------------------------------------------------
 * @requires config.json
 * @requires discord.js
 * @requires fs
 * @requires path
 * @author sbafsari
 */

// Importing required modules
const {Client, Events, GatewayIntentBits, Collection} = require('discord.js');
const {token} = require('../config.json');
const fs = require('fs');
const path = require('path');

// Creating a new client
const client =  new Client({intents: [GatewayIntentBits.Guilds]});

// A collection to store command files
client.commands = new Collection();

// Reading the command files
const foldersPath = path.join(__dirname, 'commands');
const commandFolders = fs.readdirSync(foldersPath);

// Looping through the command files and loading them to the collection
for (const folder of commandFolders){
    const commandsPath = path.join(foldersPath, folder);
    const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));
    
    for (const file of commandFiles){
        const filePath = path.join(commandsPath,file);
        const command = require(filePath);

        // Adding a new command item if it has data and executable properties
        if ('data' in command && 'execute' in command){

            // If the command is not already in the collection, add it
            if (!(client.commands.has(command.data))){
                client.commands.set(command.data.name, command);
            } else {
                console.log(`The command ${command.data.name} is already in the collection!`);
            }
        } else {
            console.log(`The command ${file} does not have either data or execute properties!`);
        }
    }
}

// When the client is ready and everything is loaded, print a message to the console.
client.once(Events.ClientReady, readyClient => {
    console.log(`The bot is logged in as ${readyClient.user.tag}!`);
})



// Executing the commands and receiving the interactions
client.on(Events.InteractionCreate, async (interaction) => {

    // If the interaction is not a slash command, return null
    if (!interaction.isChatInputCommand()) return;

    // Getting the command name and the command
    const command = interaction.client.commands.get(interaction.commandName);

    // If the command is not found, return null
    if (!command) {
        console.log(`The command ${interaction.commandName} is not found!`);
        return;
    }

    // Executing the command
    try {
        await command.execute(interaction);
    } catch (error) {
        console.error(error);
        if (interaction.deferred || interaction.replied) {
            await interaction.followUp({content: 'There was an error while executing the command!', ephemeral: true});
        } else {
            await interaction.reply({content: 'There was an error while executing the command!', ephemeral: true});
        }
    }

});

// Starting the bot
client.login(token);