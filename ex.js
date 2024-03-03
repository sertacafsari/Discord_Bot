// const { Client, GatewayIntentBits } = require('discord.js');
// const { joinVoiceChannel, createAudioPlayer, createAudioResource, getVoiceConnection } = require('@discordjs/voice');
// const ytdl = require('ytdl-core');
// const search = require('youtube-search');
// const { google } = require('googleapis');

// const bot = new Client({ intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.GuildVoiceStates] });

// const youtube = google.youtube({
//     version: 'v3',
//     auth: 'YOUR_YOUTUBE_API_KEY'
// });

// bot.once('ready', () => {
//     console.log('Bot is online!');
// });

// bot.on('messageCreate', async message => {
//     if (!message.guild) return;
//     if (message.author.bot) return;
    
//     if (message.content.startsWith('!play')) {
//         const args = message.content.split(' ').slice(1);
//         const query = args.join(' ');
//         if (!query) return message.reply('Please provide a song name or link.');

//         const channel = message.member.voice.channel;
//         if (!channel) return message.reply('You need to be in a voice channel to play music!');

//         const permissions = channel.permissionsFor(message.client.user);
//         if (!permissions.has('CONNECT') || !permissions.has('SPEAK')) {
//             return message.reply('I need permission to join and speak in your voice channel!');
//         }

//         let songInfo = null;
//         if (ytdl.validateURL(query)) {
//             const songInfo = await ytdl.getInfo(query);
//         } else {
//             const res = await youtube.search.list({
//                 part: 'snippet',
//                 type: 'video',
//                 q: query,
//                 maxResults: 1,
//             });
//             if (!res.data.items[0]) return message.reply('No results found.');
//             const videoId = res.data.items[0].id.videoId;
//             songInfo = await ytdl.getInfo(`https://www.youtube.com/watch?v=${videoId}`);
//         }

//         const stream = ytdl.downloadFromInfo(songInfo, { filter: 'audioonly' });
//         const resource = createAudioResource(stream);

//         const player = createAudioPlayer();
//         player.play(resource);

//         const connection = joinVoiceChannel({
//             channelId: channel.id,
//             guildId: channel.guild.id,
//             adapterCreator: channel.guild.voiceAdapterCreator,
//         });

//         connection.subscribe(player);

//         player.on('stateChange', (oldState, newState) => {
//             if (newState.status === 'idle') {
//                 connection.disconnect();
//             }
//         });

//         message.reply(`Now playing: **${songInfo.videoDetails.title}**`);
//     }

//     if (message.content === '!leave') {
//         const connection = getVoiceConnection(message.guild.id);
//         if (connection) {
//             connection.destroy();
//             message.reply('I have left the voice channel!');
//         }
//     }
// });

// bot.login('YOUR_BOT_TOKEN');
