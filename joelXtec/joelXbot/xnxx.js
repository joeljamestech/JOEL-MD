import axios from "axios";
import config from "../../config.cjs";

const play1Cmd = async (m, gss) => {
  const prefix = config.PREFIX;
  const cmd = m.body.startsWith(prefix) ? m.body.slice(prefix.length).split(" ")[0].toLowerCase() : "";
  const args = m.body.slice(prefix.length + cmd.length).trim();

  if (cmd === "xnx") {
    const query = args || "Alan Walker - Faded"; // Default song if none provided

    try {
      m.reply("🔍 Processing your video...");

      const apiUrl = `https://apis.davidcyriltech.my.id/hentai`;
      const { data } = await axios.get(apiUrl, { timeout: 20000 });

      if (!data || !data.vidurl) {
        return m.reply("❌ Failed to fetch video. Please try again later.");
      }

      const videoUrl = data.video_1;
      const title = data.title || query;
      const thumbnail = data.thumb || 'https://raw.githubusercontent.com/joeljamestech2/JOEL-XMD/refs/heads/main/mydata/media/joelXbot.jpg';

      const messagePayload = {
        video: { url: videoUrl },
        mimetype: "video/mp4",
        thumbnail,
        caption: `*${title}*\n\n_ᴊᴏᴇʟ xmᴅ ᴘᴏᴡᴇʀᴇᴅ ʙʏ ʟᴏʀᴅ ᴊᴏᴇʟ_`,
        contextInfo: {
          isForwarded: true,
          forwardingScore: 999,
          forwardedNewsletterMessageInfo: {
            newsletterJid: '120363317462952356@newsletter',
            newsletterName: "ᴊᴏᴇʟ xmᴅ ʙᴏᴛ",
            serverMessageId: 144,
          },
          externalAdReply: {
            title: "ᴊᴏᴇʟ xmᴅ ʙᴏᴛ",
            body: "Powered by Lord Joel 🌟",
            thumbnailUrl: thumbnail,
            sourceUrl: 'https://whatsapp.com/channel/0029Vak2PevK0IBh2pKJPp2K',
            mediaType: 1,
            renderLargerThumbnail: false,
          },
        },
      };

      await gss.sendMessage(m.from, messagePayload, { quoted: m });
      m.reply("```✅ Video sent. Keep using Joel XMD Bot!```");

    } catch (error) {
      console.error("play1 error:", error.message);
      m.reply("❌ An error occurred. Please try again later.\n\n" + error.message);
    }
  }
};

export default play1Cmd;
