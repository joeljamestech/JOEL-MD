/*
import fs from 'fs';
import path from 'path';
import config from '../../config.cjs';

const ppcoupleCmd = async (m, sock) => {
  const prefix = config.PREFIX;
  const cmd = m.body.startsWith(prefix)
    ? m.body.slice(prefix.length).split(' ')[0].toLowerCase()
    : '';

  if (cmd !== 'ppcouple') return;

  const filePath = path.resolve('../../joel-xmd-medias/joel-xmd-randompics/ppcauple.json');

  let data;
  try {
    const raw = fs.readFileSync(filePath, 'utf8');
    data = JSON.parse(raw);
  } catch (err) {
    console.error('Failed to read ppcouple JSON:', err);
    await sock.sendMessage(m.from, { text: '⚠️ Failed to load couple images.' }, { quoted: m });
    return;
  }

  const random = data[Math.floor(Math.random() * data.length)];
  const caption = 'ᴘᴏᴡᴇʀᴇᴅ ʙʏ ʟᴏʀᴅ ᴊᴏᴇʟ';

  try {
    await sock.sendMessage(m.from, {
      image: { url: random.male },
      caption: `for 👦 Male`,
      contextInfo: {
        externalAdReply: {
          title: "ᴊᴏᴇʟ xᴅ ʙᴏᴛ",
          body: caption,
          thumbnailUrl: 'https://raw.githubusercontent.com/joeljamestech2/JOEL-XMD/refs/heads/main/mydata/media/joelXbot.jpg',
          sourceUrl: 'https://whatsapp.com/channel/0029Vak2PevK0IBh2pKJPp2K',
          mediaType: 1,
          renderLargerThumbnail: false
        }
      }
    }, { quoted: m });

    await sock.sendMessage(m.from, {
      image: { url: random.female },
      caption: `for 👧 Female`,
      contextInfo: {
        externalAdReply: {
          title: "ᴊᴏᴇʟ xᴅ ʙᴏᴛ",
          body: caption,
          thumbnailUrl: 'https://raw.githubusercontent.com/joeljamestech2/JOEL-XMD/refs/heads/main/mydata/media/joelXbot.jpg',
          sourceUrl: 'https://whatsapp.com/channel/0029Vak2PevK0IBh2pKJPp2K',
          mediaType: 1,
          renderLargerThumbnail: false
        }
      }
    }, { quoted: m });

  } catch (err) {
    console.error('Failed to send images:', err);
  }
};

export default ppcoupleCmd;
*/
import config from "../../config.cjs";
import { fetchCoupleDP } from "../../framework/cpp.js";

const couplePP = async (m, gss) => {
  const prefix = config.PREFIX;
  const body = m.body.startsWith(prefix) ? m.body.slice(prefix.length) : "";
  const command = body.trim().split(" ")[0].toLowerCase();
  const validCmds = ["ppcauple", "cauplepp", "cpp"];
  if (!validCmds.includes(command)) return;

  try {
    if (typeof m.React === "function") await m.React("❤️");

    const { male, female } = await fetchCoupleDP();
    const joelThumbnail = `https://raw.githubusercontent.com/joeljamestech2/JOEL-XMD/refs/heads/main/mydata/media/thumbnail.jpg`;

    const contextTemplate = {
      isForwarded: true,
      forwardingScore: 1000,
      forwardedNewsletterMessageInfo: {
        newsletterJid: '120363317462952356@newsletter',
        newsletterName: "ᴊᴏᴇʟ xᴍᴅ ʙᴏᴛ",
        serverMessageId: 143
      },
      externalAdReply: {
        title: "JOEL XMD COUPLE DP",
        body: "POWERED BY LORD JOEL",
        mediaType: 1,
        thumbnailUrl: joelThumbnail,
        sourceUrl: "https://github.com/joeljamestech2",
        renderLargerThumbnail: false
      }
    };

    await gss.sendMessage(m.from, {
      image: { url: male },
      caption: "```🧑 For Male```",
      contextInfo: contextTemplate,
    }, { quoted: m });

    await gss.sendMessage(m.from, {
      image: { url: female },
      caption: "```👩 For Female```",
      contextInfo: contextTemplate,
    }, { quoted: m });

    if (typeof m.React === "function") await m.React("✅");

  } catch (err) {
    console.error("Couple PP command error:", err);
    if (typeof m.React === "function") await m.React("❌");
    await m.reply("```Failed to fetch couple DP. Please try again later.```");
  }
};

export default couplePP;
