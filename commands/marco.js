const { SlashCommandBuilder } = require('discord.js');
const fs = require('fs');
const db = require('../db/database');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('marco')
        .setDescription('Marco polo command')
        .addStringOption(option => 
            option.setName('message')
            .setDescription('say marco!')
            .setRequired(true)),
            async execute(interaction) {
                const userId = interaction.user.id;
                
                let record = await db.Usage.findOne({ where: { userId } });

                if (!record) {
                record = await db.Usage.create({ userId, count: 1 });
                } else {
                record.count += 1;
                await record.save();
                }

                const marco =  interaction.options.getString('message');
                if (record.count % 5 === 0) {
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
                //fs.writeFileSync('./db/polo.json', JSON.stringify(usageData, null, 2));
                }


}