const { SlashCommandBuilder, PermissionFlagsBits } = require('discord.js');

/**
 * A slash command for admins to kick a user.
 * @returns A message that indicates the user has been kicked.
 */
module.exports = {
    data: new SlashCommandBuilder()
         .setName('kick')
         .setDescription('Kick the inputted user!')
         .addUserOption(option => 
            option.setName('user')
                .setDescription('The user to kick')
                .setRequired(true)
         )
         .addStringOption(option => 
            option.setName('reason')
                .setDescription('The reason of the kick')
                .setRequired(false)
         )
         .setDefaultMemberPermissions(PermissionFlagsBits.KickMembers),
    async execute(interaction){
        const user = interaction.options.getUser('user');
        const reason = interaction.options.getString('reason') || 'No reason provided';

        if (!user) return await interaction.reply({content: 'The user must be provided!', ephemeral: true});

        await interaction.guild.members.kick(user, {reason: reason});

        // If someone is kicked, everyone in the server should know about it
        await interaction.reply({content: `The user ${user.tag} has been kicked!`, ephemeral: false});
    },
};