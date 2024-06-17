const { SlashCommandBuilder } = require('@discordjs/builders');

/**
 * A slash command for providing information about the server.
 * @returns A sentence that includes the server's name, creation date, and the number of members.
 * @author sbafsari
 * @version 1.0
 */

module.exports = {
    data: new SlashCommandBuilder()
        .setName('server')
        .setDescription('Provides information about the server!'),
    async execute(interaction){
        await interaction.reply(`This is the ${interaction.guild.name} server! It was created on ${interaction.guild.createdAt}! Right now, it 
            has ${interaction.guild.memberCount} members!`);
    },
};