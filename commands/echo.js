const { SlashCommandBuilder, subtext } = require('discord.js');
const db = require('../db/database');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('echo')
        .setDescription('echoes the user')
        .addStringOption(option => 
            option.setName('message')
            .setDescription('The message to echo')
            .setRequired(true)),
            async execute(interaction) {
                const userId = interaction.user.id;
                const commandName = interaction.commandName;
                let record = await db.Usage.findOne({ where: { userId, commandName } });

                if (!record) {
                    record = await db.Usage.create({ userId, count: 1, commandName});
                } else {
                    record.count += 1;
                await record.save();
                }
                const message = interaction.options.getString('message');
                await interaction.reply(`<@${interaction.user.id}> says: "${message}"
${subtext(`${interaction.user.username} has used this command ${record.count} times.`)} `);
            }
}