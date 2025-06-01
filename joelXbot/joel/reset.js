import config from '../../config.cjs';
import process from 'process';

const reset = async (m, sock) => {
  const prefix = config.PREFIX;
  const cmd = m.body.startsWith(prefix)
    ? m.body.slice(prefix.length).split(' ')[0].toLowerCase()
    : '';

  const validCommands = ['reset', 'restart', 'res'];

  if (validCommands.includes(cmd)) {
    await m.React('♻️'); // Optional: show restart reaction

    await sock.sendMessage(
      m.from,
      {
        text: '*♻️ Restarting bot... Please wait.*',
        contextInfo: {
          externalAdReply: {
            title: 'ᴊᴏᴇʟ xᴍᴅ ʙᴏᴛ ᴠ¹⁰',
            body: 'ʙᴏᴛ ʀᴇsᴛᴀʀᴛ ᴄᴏᴍᴍᴀɴᴅ ᴇxᴇᴄᴜᴛᴇᴅ',
            thumbnailUrl: 'https://avatars.githubusercontent.com/u/162905644?v=4',
            sourceUrl: 'https://whatsapp.com/channel/0029Vak2PevK0IBh2pKJPp2K',
            mediaType: 1,
          },
        },
      },
      { quoted: m }
    );

    // Restart after delay
    setTimeout(() => {
      process.exit(1); // Exit for auto-restart
    }, 2000);
  }
};

export default reset;
