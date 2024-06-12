const { SlashCommandBuilder } = require('discord.js');

/**
 * A slash command for deleting messages.
 * @returns A message that indicates the number of messages deleted.
 * @param {number} number - The number of messages to delete.
 * @author sbafsari
 */

module.exports = {
	data: new SlashCommandBuilder()
		.setName('delete')
		.setDescription('Deletes given number of messages!')
        .addIntegerOption(option => 
            option.setName('number')
                .setDescription('The number of messages to delete')
                .setRequired(true)
                .setMinValue(1)
        ),
	async execute(interaction) {
		const number = interaction.options.getInteger('number');
        if (number < 1){
            return interaction.reply("The number of messages to delete must be greater than 0!");
        }
        await interaction.channel.bulkDelete(number).then(() => {
            interaction.reply(`Successfully deleted ${number} messages!`);
        });
	},
};