const { SlashCommandBuilder } = require('discord.js');
const fs = require('fs');
const marcoPath = './db/tasks.json';

module.exports = {
    data: new SlashCommandBuilder()
        .setName('marco')
        .setDescription('Marco polo command')
        .addStringOption(option => 
            option.setName('message')
            .setDescription('say marco!')
            .setRequired(true)),
            async execute(interaction) {
                
                const userId = interaction.user.userId;

                function loadPolo() {
                    try {
                        return JSON.parse(fs.readFileSync(marcoPath));
                    } catch {
                        return {};
                    }
                }

                const marco =  interaction.options.getString('message');
                if (marco == "Marco" || marco == "marco") {
                    await interaction.reply(`Polo!`);
                } else {
                    await interaction.reply(`I don't know who that is 🤔`)
                }
            }
}