import fs from 'fs';
import path from 'path';
import config from '../../config.cjs';

const nsfwCmd = async (m, sock) => {
  const prefix = config.PREFIX;
  const cmd = m.body.startsWith(prefix)
    ? m.body.slice(prefix.length).split(' ')[0].toLowerCase()
    : '';

  const validCmds = [
    'blowjob', 'cuckold', 'eba', 'foot', 'milf', 'pussy', 'yuri', 'zettai'
  ];

  // Ignore invalid commands silently
  if (!validCmds.includes(cmd)) return;

  // Skip if not group
  if (!m.isGroup) return;

  const allowedPath = path.resolve('../../mydata/nsfw/allowedgc.json');
  const filePath = path.resolve(`../../joel-xmd-medias/nsfw/${cmd}.json`);

  let allowedGroups;
  try {
    const rawAllowed = fs.readFileSync(allowedPath, 'utf-8');
    allowedGroups = JSON.parse(rawAllowed);
  } catch (err) {
    console.error("Error reading allowed groups file:", err);
    return;
  }

  if (!allowedGroups.includes(m.from)) {
    await sock.sendMessage(m.from, {
      text: `⚠️ This feature is not enabled in this group.\n contact owner to enable`
    }, { quoted: m });
    return;
  }

  let imageData;
  try {
    const rawData = fs.readFileSync(filePath, 'utf-8');
    imageData = JSON.parse(rawData);
  } catch (err) {
    console.error(`Error reading NSFW file for ${cmd}:`, err);
    await sock.sendMessage(m.from, { text: `⚠️ Failed to load NSFW images.` }, { quoted: m });
    return;
  }

  const images = imageData
    .filter(item => typeof item.url === 'string')
    .map(item => item.url);

  if (!images.length) return;

  const selectedImage = images[Math.floor(Math.random() * images.length)];
  const caption = 'ᴘᴏᴡᴇʀᴇᴅ ʙʏ ʟᴏʀᴅ ᴊᴏᴇʟ';

  await sock.sendMessage(m.from, {
    image: { url: selectedImage },
    caption,
    contextInfo: {
      externalAdReply: {
        title: "ᴊᴏᴇʟ xᴅ ʙᴏᴛ",
        body: caption,
        thumbnailUrl: 'https://raw.githubusercontent.com/joeljamestech2/JOEL-XMD/refs/heads/main/mydata/media/joelXbot.jpg',
        sourceUrl: 'https://whatsapp.com/channel/0029Vak2PevK0IBh2pKJPp2K',
        mediaType: 1,
        renderLargerThumbnail: false,
      }
    }
  }, { quoted: m });
};

export default nsfwCmd;
