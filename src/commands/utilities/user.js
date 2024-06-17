const { SlashCommandBuilder } = require('@discordjs/builders');

/**
 * A slash command for providing information about the user.
 * @returns A sentence that includes the user's tag and the date they joined the server.
 * @author sbafsari
 * @version 1.0
 */

module.exports = {
    data: new SlashCommandBuilder()
        .setName('user')
        .setDescription('Provides information about the user!'),
    async execute(interaction){
        if (interaction.user.bot) {
            return interaction.reply("Bots are not allowed to run this command!");
        }
        else if (interaction.user  == null){
            return interaction.reply("The user is not defined!");
        } 
        await interaction.reply(`This command was run by ${interaction.user.tag}, who joined at ${interaction.member.joinedAt}!`);
    },
};