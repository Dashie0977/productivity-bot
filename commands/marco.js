const { SlashCommandBuilder } = require('discord.js');
const fs = require('fs');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('marco')
        .setDescription('Marco polo command')
        .addStringOption(option => 
            option.setName('message')
            .setDescription('say marco!')
            .setRequired(true)),
            async execute(interaction) {
                let usageData = {};
                try {
                usageData = JSON.parse(fs.readFileSync('./db/polo.json', 'utf8'));
                } catch (err) {
                usageData = {};
                }

                const userId = interaction.user.id;
                let count = usageData[userId] || 0;
                count++;
                usageData[userId] = count;

                const marco =  interaction.options.getString('message');
                if (count % 5 === 0) {
                    if (marco.toLowerCase() === "marco") {
                        await interaction.reply(`Aren't we done with this yet! 😩`);
                    } else {
                        await interaction.reply(`I don't know who that is 🤔`)
                    }
                } else {
                    if (marco.toLowerCase()==="marco") {
                        await interaction.reply(`Polo!`)
                    } else {
                        await interaction.reply(`I don't know who that is 🤔`)
                    }
                    
                }
                fs.writeFileSync('./db/polo.json', JSON.stringify(usageData, null, 2));
                }


}