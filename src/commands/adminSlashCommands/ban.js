const { SlashCommandBuilder, PermissionFlagsBits } = require('discord.js');

/**
 * A slash command for admins to ban a user.
 * @returns A message that indicates the user has been banned.
 * @author sbafsari
 * @version 1.0
 */
module.exports = {
    data: new SlashCommandBuilder()
         .setName('ban')
         .setDescription('Bans the inputted user!')
         .addUserOption(option => 
            option.setName('user')
                .setDescription('The user to ban')
                .setRequired(true)
         )
         .addStringOption(option => 
            option.setName('reason')
                .setDescription('The reason of the ban')
                .setRequired(false)
         )
         .setDefaultMemberPermissions(PermissionFlagsBits.BanMembers),
    async execute(interaction){
        const user = interaction.options.getUser('user');
        const reason = interaction.options.getString('reason') || 'No reason provided';

        if (!user) return await interaction.reply({content: 'The user must be provided!', ephemeral: true});

        await interaction.guild.members.ban(user, {reason: reason});

        // If someone is banned, everyone in the server should know about it
        await interaction.reply({content: `The user ${user.tag} has been banned!`, ephemeral: false});
    },
};