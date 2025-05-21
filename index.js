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

        const buffer = await Profile(member.id, {
            font: 'HELVETICA',
            squareAvatar: false,
            presenceStatus: member.presence?.status || 'offline'
        });

        message.reply({ files: [buffer] });
    }
});

client.login(config.Bot.token);