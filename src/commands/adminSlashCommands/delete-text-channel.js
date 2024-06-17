const { SlashCommandBuilder, PermissionFlagsBits, ChannelType } = require('discord.js');

/**
 * A slash command that can be only used by administrators to delete a text channel.
 * @returns Deletes the inputted text channel and returns a message that indicates the deletion.
 * @author sbafsari
 * @version 1.0
 */
module.exports = {
    data: new SlashCommandBuilder()
        .setName('delete-text-channel')
        .setDescription('Deletes the inputted text channel!')
        .addChannelOption(option => 
            option.setName('channel')
                .setDescription('The text channel to delete')
                .addChannelTypes(ChannelType.GuildText)
                .setRequired(true)
        )
        .setDefaultMemberPermissions(PermissionFlagsBits.Administrator), // Sets the default permissions to administrator
    async execute(interaction){
        const channel = interaction.options.getChannel('channel');

        if (!channel) return await interaction.reply({content: 'The channel must be a text channel!', ephemeral: true});

        await channel.delete();
        await interaction.reply({content: `The channel ${channel.name} has been deleted!`, ephemeral: true});
    }
};