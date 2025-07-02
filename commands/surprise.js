const { SlashCommandBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('surprise')
        .setDescription('Surprises the user with different messages'),
    async execute(interaction) {

        const messages = [
            '🎉 You’re awesome!',
            '🌟 Keep shining!',
            '🔥 Time to conquer your day!',
            '🚀 Success is closer than you think!',
            '😎 You’re doing better than you know.'
        ];

        const randomIndex = Math.floor(Math.random() * messages.length);
        const randomMessage = messages[randomIndex];

    await interaction.reply(randomMessage);
    },
};