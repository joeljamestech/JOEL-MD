// ʝσєℓ  χм∂ вσт ∂єνєℓσρє∂ ву ʝσєℓ тє¢н

import axios from "axios";

import config from "../../config.cjs";

const shortenUrl = async (m, sock) => {

  const prefix = config.PREFIX;

  const cmd = m.body.startsWith(prefix) ? m.body.slice(prefix.length).split(" ")[0].toLowerCase() : "";

  const validCommands = ["shortenurl", "urlshortener", "shorten"];

  if (validCommands.includes(cmd)) {

    const url = m.body.split(" ")[1];

    if (!url) {

      return await sock.sendMessage(

        m.from,

        { text: "ρℓєαѕє ρяσνι∂є α υяℓ тσ ѕнσятєη. єχαмρℓє:!shortenurl https://github.com/joeljamestech/JOEL-XMD*" },

        { quoted: m }

      );

    }

    const apiUrl = `https://bk9.fun/tools/shorten?url=${encodeURIComponent(url)}`;

    try {

      await m.React("⏳"); // React with a loading icon

      const response = await axios.get(apiUrl);

      const data = response.data;

      if (data.status === true && data.BK9) {

        const originalUrl = data.BK9.origin;

        const shortenedUrl = data.BK9.url;

        const responseText = `*ᴊᴏᴇʟ xᴍᴅ sʜᴏʀᴛᴇɴ ᴜʀʟ*\n\n*ᴏʀɪɢɪɴᴀʟ ᴜʀʟ*: *${originalUrl}*\n*sʜᴏʀᴛᴇɴᴇᴅ ᴜʀʟ:* *${shortenedUrl}\n\n _ᴛᴀᴘ ᴀɴᴅ ʜᴏʟᴅ ᴏɴ ᴛʜᴇ sʜᴏʀᴛᴇɴᴇᴅ ᴜʀʟ ᴛᴏ ᴄᴏᴘʏ ɪᴛ_\n\n*ᴘᴏᴡᴇʀᴇᴅ ʙʏ ᴊᴏᴇʟ ᴊᴀᴍᴇsᴛᴇᴄʜ*`;

        await sock.sendMessage(

          m.from,

          {

            text: responseText,

            contextInfo: {

              isForwarded: false,

              forwardedNewsletterMessageInfo: {

                newsletterJid: "120363317462952356@newsletter",

                newsletterName: "ᴊᴏᴇʟ xᴍᴅ ʙᴏᴛ",

                serverMessageId: -1,

              },

              forwardingScore: 999, // Score to indicate it has been forwarded

              externalAdReply: {

                title: "ᴊᴏᴇʟ xᴍᴅ ᴠ⁷ ʙᴏᴛ",

                body: "υяℓ ѕнσятєηєя ѕєяνι¢e",

                thumbnailUrl: "", // Add thumbnail URL if required

                sourceUrl: "https://whatsapp.com/channel/0029Vak2PevK0IBh2pKJPp2K", // Source URL

                mediaType: 1,

                renderLargerThumbnail: false,

              },

            },

          },

          { quoted: m }

        );

      } else {

        throw new Error("Invalid response from the API");

      }

    } catch (error) {

      console.error("Error:", error); // Log the full error for debugging

      await sock.sendMessage(

        m.from,

        {

          text: `*ᴇʀʀᴏʀ sʜᴏʀᴛᴇɴɪɴɢ ᴜʀʟ: ${error.message}*`,

          contextInfo: {

            externalAdReply: {

              title: "ᴊᴏᴇʟ xᴅ ᴠ⁷ ʙᴏᴛ",

              body: "ѕнσят υяℓ ѕєяνι¢єѕ",

              sourceUrl: "https://whatsapp.com/channel/0029Vak2PevK0IBh2pKJPp2K",

              mediaType: 1,

            },

          },

        },

        { quoted: m }

      );

    }

  }

};

export default shortenUrl;

// ιƒ уσυ яєαℓ α ∂єνєℓσρєя  υѕє уσυя ¢σ∂єѕ  ∂σηт ¢σρу мιηє