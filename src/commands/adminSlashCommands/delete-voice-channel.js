const { SlashCommandBuilder, PermissionFlagsBits, ChannelType} = require('discord.js');

/**
 * A slash command that can be only used by administrators to delete a voice channel.
 * @returns Deletes the inputted voice channel and returns a message that indicates the deletion.
 * @author sbafsari
 * @version 1.0
 */
module.exports = {
    data: new SlashCommandBuilder()
        .setName('delete-voice-channel')
        .setDescription('Deletes the inputted voice channel!')
        .addChannelOption(option => 
            option.setName('channel')
                .setDescription('The voice channel to delete')
                .addChannelTypes(ChannelType.GuildVoice)
                .setRequired(true)
        )
        .setDefaultMemberPermissions(PermissionFlagsBits.ManageChannels), // Sets the default permissions to administrator
    async execute(interaction){
        const channel = interaction.options.getChannel('channel');

        if (!channel) return await interaction.reply({content: 'The channel must be a voice channel!', ephemeral: true});

        await channel.delete();
        await interaction.reply({content: `The channel ${channel.name} has been deleted!`, ephemeral: true});
    }
};