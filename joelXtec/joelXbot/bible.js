import config from '../../config.cjs';
import fetch from 'node-fetch';

const bibleCommand = async (m, Matrix) => {
  const prefix = config.PREFIX;
  const cmd = m.body.startsWith(prefix) ? m.body.slice(prefix.length).split(' ')[0].toLowerCase() : '';
  const text = m.body.slice(prefix.length + cmd.length).trim();

  if (cmd === 'bible') {
    try {
      // Check if the book name was provided
      if (!text) {
        return m.reply('⚠️ Please specify the book, chapter, and verse. Example: *bible john 3:16*');
      }

      // Set the reference for the API call
      const reference = encodeURIComponent(text);

      // Fetch Bible data from the API
      const response = await fetch(`https://bible-api.com/${reference}`);
      const data = await response.json();

      // Check if the data is valid
      if (!data || !data.reference) {
        return m.reply('⚠️ Invalid reference. Example: *bible john 3:16*.');
      }

      // Extract Bible verse information
      const verses = data.verses ? data.verses.length : 1;
      const contentText = data.text;
      const language = data.translation_name;

      // Create the response message
      const message = `*ᴊᴏᴇʟ xᴍᴅ ʙɪʙʟᴇ ᴍᴇɴᴜ*\n\n🔹 *We are reading:* ${data.reference}\n🔹 *Number of verses:* ${verses}\n\n *Now Read:*\n${contentText}\n\n*Translation:* ${language}\n\n*ᴘᴏᴡᴇʀᴇᴅ ʙʏ ᴊᴏᴇʟ xᴍᴅ ʙᴏᴛ*`;

      // Send the response message
      await Matrix.sendMessage(m.from, { text: message }, { quoted: m });

    } catch (error) {
      console.error("Error occurred:", error);
      m.reply('An error occurred while fetching the Bible verse. Please try again later.');
    }
  }
};

export default bibleCommand;
