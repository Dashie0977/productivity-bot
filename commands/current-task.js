const { SlashCommandBuilder, ActionRowBuilder, StringSelectMenuBuilder, ButtonBuilder, ButtonStyle, InteractionType } = require('discord.js');
const fs = require('fs');
const path = './db/tasks.json';

function loadTasks() {
    try {
        return JSON.parse(fs.readFileSync(path));
    } catch {
        return {};
    }
}

function saveTasks(tasks) {
    fs.writeFileSync(path, JSON.stringify(tasks, null, 2));
}

module.exports = {
    data: new SlashCommandBuilder()
        .setName('currenttask')
        .setDescription('Create or view your current task'),

    async execute(interaction) {
        const userId = interaction.user.id;
        const tasks = loadTasks();

        if (tasks[userId]) {
            const task = tasks[userId];
            await interaction.reply({
                content: `📌 **Your current task:**\n> ${task.description}\n🟡 **Progress:** ${task.progress}`,
                components: [
                    new ActionRowBuilder().addComponents(
                        new ButtonBuilder()
                            .setCustomId(`replace_${userId}`)
                            .setLabel('Replace Task')
                            .setStyle(ButtonStyle.Danger)
                    )
                ],
                
            });
        } else {
            await interaction.reply({
                content: '📝 What is your task?',
                
            });

            const msg = await interaction.fetchReply();
            const filter = (m) => m.author.id === userId;
            const collected = await interaction.channel.awaitMessages({ filter, max: 1, time: 15000 });

            if (!collected.size) {
                return interaction.followUp({ content: '⏰ You took too long. Try again.', ephemeral: true });
            }

            const taskDesc = collected.first().content;

            const progressMenu = new ActionRowBuilder().addComponents(
                new StringSelectMenuBuilder()
                    .setCustomId(`progress_${userId}_${encodeURIComponent(taskDesc)}`)
                    .setPlaceholder('Choose progress...')
                    .addOptions([
                        { label: 'Just started', value: 'Just started' },
                        { label: 'Halfway', value: 'Halfway' },
                        { label: 'Finished', value: 'Finished' }
                    ])
            );

            await interaction.followUp({
                content: '✅ Got it! Now choose your progress:',
                components: [progressMenu],
                
            });
        }
    }
};
