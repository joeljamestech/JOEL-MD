import config from "../../config.cjs";
import axios from "axios";

const surahCmd = async (m, gss) => {
  const prefix = config.PREFIX;
  const cmd = m.body.startsWith(prefix)
    ? m.body.slice(prefix.length).split(" ")[0].toLowerCase()
    : "";
  const query = m.body.slice(prefix.length + cmd.length).trim(); // Extract query

  if (cmd === "surahaudio" || cmd === "surahurdu") {
    if (!query || isNaN(query) || query < 1 || query > 114) {
      return gss.sendMessage(
        m.from,
        { text: "⚠️ براہ کرم 1 سے 114 کے درمیان کوئی نمبر درج کریں۔\nمثال: `!surahaudio 1` یا `!surahurdu 1`" },
        { quoted: m }
      );
    }
  }

  // ✅ --- SURAH AUDIO COMMAND --- ✅
  if (cmd === "surahaudio") {
    await m.React("⏳");
    try {
      const response = await axios.get(`https://api.nexoracle.com/islamic/quran-surah?q=${query}/ur`);
      const data = response.data?.result;
      if (!data || !data.surah_details) throw new Error("Invalid API response");

      const { title_en, title_ar, verses, place, type } = data.surah_details;
      const audioUrl = data.audio_ar;
      const caption = `📖 *${title_en}* (${title_ar})\n🕌 *Place:* ${place}\n📜 *Type:* ${type}\n🔢 *Verses:* ${verses}\n\n🚀 *ᴘᴏᴡᴇʀᴇᴅ ʙʏ ʟᴏʀᴅ ᴊᴏᴇʟ*`;

      await gss.sendMessage(m.from, {
        audio: { url: audioUrl },
        mimetype: "audio/mp4",
        caption: caption,
        contextInfo: {
          isForwarded: true,
          forwardingScore: 999,
          forwardedNewsletterMessageInfo: {
            newsletterJid: "120363317462952356@newsletter",
            newsletterName: "ᴊᴏᴇʟ xᴍᴅ ʙᴏᴛ",
            serverMessageId: -1,
          },
          externalAdReply: {
            title: "ᴊᴏᴇʟ xᴍᴅ ʙᴏᴛ",
            body: "Listen to Surah Audio",
            thumbnailUrl: "https://avatars.githubusercontent.com/u/162905644?v=4",
            sourceUrl: "https://whatsapp.com/channel/0029Vak2PevK0IBh2pKJPp2K",
            mediaType: 1,
            renderLargerThumbnail: true,
          },
        },
      }, { quoted: m });
      await m.React("✅");
    } catch (error) {
      console.error(error);
      await m.React("❌");
      gss.sendMessage(m.from, { text: "⚠️ معاف کیجیے، آڈیو حاصل کرنے میں مسئلہ ہوا۔ دوبارہ کوشش کریں۔" }, { quoted: m });
    }
  }

  // ✅ --- SURAH URDU MEANING COMMAND --- ✅
  if (cmd === "surahurdu") {
    await m.React("⏳");
    try {
      const response = await axios.get(`https://api.nexoracle.com/islamic/quran-surah?q=${query}/ur`);
      const data = response.data?.result;
      if (!data || !data.surah_details || !data.data?.chapter) throw new Error("Invalid API response");

      const { title_en, title_ar, verses } = data.surah_details;
      const chapterText = data.data.chapter.map(v => `📖 *آیت ${v.verse}:* ${v.text}`).join("\n\n");
      const messageText = `📖 *${title_en}* (${title_ar})\n🔢 *Verses:* ${verses}\n\n${chapterText}\n\n🚀 *ᴘᴏᴡᴇʀᴇᴅ ʙʏ ʟᴏʀᴅ ᴊᴏᴇʟ*`;

      await gss.sendMessage(m.from, {
        text: messageText,
        contextInfo: {
          isForwarded: true,
          forwardingScore: 999,
          forwardedNewsletterMessageInfo: {
            newsletterJid: "120363317462952356@newsletter",
            newsletterName: "ᴊᴏᴇʟ xᴍᴅ ʙᴏᴛ",
            serverMessageId: -1,
          },
          externalAdReply: {
            title: "ᴊᴏᴇʟ xᴍᴅ ʙᴏᴛ",
            body: "Read Surah with Urdu Translation",
            thumbnailUrl: "https://avatars.githubusercontent.com/u/162905644?v=4",
            sourceUrl: "https://whatsapp.com/channel/0029Vak2PevK0IBh2pKJPp2K",
            mediaType: 1,
            renderLargerThumbnail: true,
          },
        },
      }, { quoted: m });
      await m.React("✅");
    } catch (error) {
      console.error(error);
      await m.React("❌");
      gss.sendMessage(m.from, { text: "⚠️ معاف کیجیے، اردو ترجمہ حاصل کرنے میں مسئلہ ہوا۔ دوبارہ کوشش کریں۔" }, { quoted: m });
    }
  }

  // ✅ --- ASMA UL HUSNA COMMAND --- ✅
  if (cmd === "asmaulhusna") {
    await m.React("⏳");
    try {
      const response = await axios.get("https://api.nexoracle.com/islamic/asma-ul-husna");
      const data = response.data?.result;

      if (!data || !data.name) throw new Error("Invalid API response");

      const messageText = `💫 *Asma Ul Husna* 💫\n\n✨ *Allah's Name:* ${data.name}\n\n🚀 *ᴘᴏᴡᴇʀᴇᴅ ʙʏ ʟᴏʀᴅ ᴊᴏᴇʟ*`;

      await gss.sendMessage(m.from, {
        text: messageText,
        contextInfo: {
          isForwarded: true,
          forwardingScore: 999,
          forwardedNewsletterMessageInfo: {
            newsletterJid: "120363317462952356@newsletter",
            newsletterName: "ᴊᴏᴇʟ xᴍᴅ ʙᴏᴛ",
            serverMessageId: -1,
          },
          externalAdReply: {
            title: "ᴊᴏᴇʟ xᴍᴅ ʙᴏᴛ",
            body: "Get Random Asma Ul Husna",
            thumbnailUrl: "https://avatars.githubusercontent.com/u/162905644?v=4",
            sourceUrl: "https://whatsapp.com/channel/0029Vak2PevK0IBh2pKJPp2K",
            mediaType: 1,
            renderLargerThumbnail: true,
          },
        },
      }, { quoted: m });
      await m.React("✅");
    } catch (error) {
      console.error(error);
      await m.React("❌");
      gss.sendMessage(m.from, { text: "⚠️ معاف کیجیے، نام حاصل کرنے میں مسئلہ ہوا۔ دوبارہ کوشش کریں۔" }, { quoted: m });
    }
  }
  
  // ✅ --- PROPHET NAME COMMAND --- ✅
  if (cmd === "prophetname") {
    await m.React("⏳");
    try {
      const response = await axios.get("https://api.nexoracle.com/islamic/prophet-names");
      const data = response.data?.result;

      if (!data || !data.name) throw new Error("Invalid API response");

      const messageText = `🌟 *Prophet's Name* 🌟\n\n📜 *Name:* ${data.name}\n\n🚀 *ᴘᴏᴡᴇʀᴇᴅ ʙʏ ʟᴏʀᴅ ᴊᴏᴇʟ*`;

    await gss.sendMessage(m.from, {
      text: messageText,
      contextInfo: {
        isForwarded: true,
        forwardingScore: 999,
        forwardedNewsletterMessageInfo: {
          newsletterJid: "120363317462952356@newsletter",
          newsletterName: "ᴊᴏᴇʟ xᴍᴅ ʙᴏᴛ",
          serverMessageId: -1,
        },
        externalAdReply: {
          title: "ᴊᴏᴇʟ xᴍᴅ sᴜʀᴀʜ ᴍᴇɴᴜ",
          body: "Get Surah Details",
          thumbnailUrl: "https://avatars.githubusercontent.com/u/162905644?v=4",
          sourceUrl: "https://whatsapp.com/channel/0029Vak2PevK0IBh2pKJPp2K",
          mediaType: 1,
          renderLargerThumbnail: true,
        },
      },
    }, { quoted: m });

    await m.React("✅");
  } catch (error) {
    console.error(error);
    await m.React("❌");
    gss.sendMessage(m.from, { text: "⚠️ معاف کیجیے، سورہ تفصیل حاصل کرنے میں مسئلہ ہوا۔ دوبارہ کوشش کریں۔" }, { quoted: m });
  }
}
};

export default surahCmd;
