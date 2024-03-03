const { SlashCommandBuilder } = require('discord.js');

const oath = "Türküm, doğruyum, çalışkanım. \n Yasam; küçüklerimi korumak, büyüklerimi saymak,yurdumu, milletimi özümden çok sevmektir.  \n Ülküm; yükselmek, ileri gitmektir.  \n Varlığım Türk varlığına armağan olsun."

module.exports = {
	data: new SlashCommandBuilder()
		.setName('oath')
		.setDescription('It prints the Turkish Student Oath!'),
	async execute(interaction) {
		await interaction.reply(oath);
	},
};