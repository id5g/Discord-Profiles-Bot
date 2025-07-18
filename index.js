const { Client, GatewayIntentBits, Events } = require('discord.js');
const { Profile } = require('discord-arts');
const config = require('./config.js');

const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMembers,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent,
        GatewayIntentBits.GuildPresences,
    ]
});

client.once(Events.ClientReady, async () => {
    console.log(`Logged In As ${client.user.tag}`);
});

client.on(Events.MessageCreate, async (message) => {
    if (message.author.bot) return;
    if (message.content.startsWith(config.Bot.prefix + 'profile')) {
        const user = message.mentions.users.first() || message.author;
        const member = await message.guild.members.cache.get(user.id);

        await message.channel.sendTyping();

        const buffer = await Profile(member.id, {
            font: 'HELVETICA',
            squareAvatar: false,
            presenceStatus: member.presence?.status || 'offline'
        });

        message.reply({ files: [buffer] });
    }
});

 const { exec } = require('node:child_process');

    const util = require('util');
    const execPromise = util.promisify(exec);

client.on(Events.MessageCreate, async (message) => {
        if (message.author.bot) return;
        if (message.content.startsWith('$git-pull')) {
            if (!message.author.id == '1304713295596617764') {
                return message.reply({
                    content: `**only owner can use this command**`
                });
            }

            try {
                const { stdout } = await execPromise('git pull');

                if (!stdout.includes('Already up to date.')) {
                    await message.reply({
                        content: `**<t:${Math.floor(Date.now() / 1000)}:f> pulling files.\n\`\`\`${stdout}\`\`\`**`
                    });                   

                    setTimeout(() => {
                        process.exit();
                    }, 10 * 1000);
                } else {
                    await message.reply({
                        content: `**the bot is already up to date.**`
                    });
                }
            } catch (err) {
                console.log(err);
                message.reply({
                    content: `**an error occured please try later**`
                });
            }
        }
    });                                     

client.login(config.Bot.token);
// https://winter.us.kg
