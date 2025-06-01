import fs from 'fs';
import path from 'path';
import config from '../../config.cjs';

const validCmds = [
  'bocil', 'gheayub', 'kayes', 'notnotvid',
  'panrika', 'santuy', 'tiktokgirl', 'ukihty'
];

const tiktovideoCmd = async (m, sock) => {
  const prefix = config.PREFIX;
  const cmd = m.body.startsWith(prefix)
    ? m.body.slice(prefix.length).split(' ')[0].toLowerCase()
    : '';

  if (!validCmds.includes(cmd)) return;

  const filePath = path.resolve(`../../joel-xmd-medias/tiktokvideo/${cmd}.json`);
  let videoList;

  try {
    const rawData = fs.readFileSync(filePath, 'utf8');
    const parsedData = JSON.parse(rawData);

    videoList = parsedData
      .filter(item => item && typeof item.url === 'string')
      .map(item => item.url);

    if (!videoList.length) throw new Error(`Empty or invalid JSON for ${cmd}`);
  } catch (error) {
    console.error(`Failed to load ${cmd} videos:`, error);
    await sock.sendMessage(m.from, { text: `⚠️ Failed to load ${cmd} videos!` }, { quoted: m });
    return;
  }

  const selectedVideo = videoList[Math.floor(Math.random() * videoList.length)];
  const caption = 'ᴘᴏᴡᴇʀᴇᴅ ʙʏ ʟᴏʀᴅ ᴊᴏᴇʟ';

  const messagePayload = {
    video: { url: selectedVideo },
    caption: caption,
    contextInfo: {
      isForwarded: true,
      forwardingScore: 999,
      forwardedNewsletterMessageInfo: {
        newsletterJid: '120363317462952356@newsletter',
        newsletterName: "ᴊᴏᴇʟ xᴅ ʙᴏᴛ",
        serverMessageId: -1,
      },
      externalAdReply: {
        title: "ᴊᴏᴇʟ xᴅ ʙᴏᴛ",
        body: "ᴘᴏᴡᴇʀᴇᴅ ʙʏ ʟᴏʀᴅ ᴊᴏᴇʟ",
        thumbnailUrl:
          'https://raw.githubusercontent.com/joeljamestech2/JOEL-XMD/refs/heads/main/mydata/media/joelXbot.jpg',
        sourceUrl: 'https://whatsapp.com/channel/0029Vak2PevK0IBh2pKJPp2K',
        mediaType: 1,
        renderLargerThumbnail: false,
      },
    },
  };

  await sock.sendMessage(m.from, messagePayload, { quoted: m });
};

export default tiktovideoCmd;
