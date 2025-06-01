import config from '../../config.cjs';

const bingHandler = async (m, sock) => {
  const prefix = config.PREFIX;
  const cmd = m.body.startsWith(prefix) ? m.body.slice(prefix.length).split(" ")[0].toLowerCase() : "";
  const args = m.body.trim().split(/\s+/).slice(1);
  const prompt = args.join(" ");

  const validCommands = ["bing", "bng", "texttoimg"];
  if (!validCommands.includes(cmd)) return;

  if (!prompt) {
    return sock.sendMessage(m.key.remoteJid, {
      text: `Please provide a prompt.\nExample: *${prefix}${cmd} a futuristic city at night*`,
    }, { quoted: m });
  }

  try {
    const imageurl = `https://iamtkm.vercel.app/ai/text2img?prompt=${encodeURIComponent(prompt)}`;
    const title = prompt.length > 50 ? prompt.slice(0, 50) + "..." : prompt;

    await sock.sendMessage(m.key.remoteJid, {
      image: { url: imageurl },
      caption: `ᴘᴏᴡᴇʀᴇᴅ ʙʏ ʟᴏʀᴅ ᴊᴏᴇʟ`,
      contextInfo: {
        externalAdReply: {
          title: title,
          body: "ᴘʟᴀʏɪɴɢ ᴠɪᴀ ᴊᴏᴇʟ xmᴅ ʙᴏᴛ",
          thumbnailUrl: imageurl,
          sourceUrl: 'https://whatsapp.com/channel/0029Vak2PevK0IBh2pKJPp2K',
          mediaType: 1,
          renderLargerThumbnail: false
        }
      }
    }, { quoted: m });

  } catch (err) {
    console.error("Bing Image Error:", err.message);
    sock.sendMessage(m.key.remoteJid, {
      text: "Failed to generate image. Please try again later.",
    }, { quoted: m });
  }
};

export default bingHandler;
