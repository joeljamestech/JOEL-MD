import axios from "axios";
import { createRequire } from "module";

// Import config.cjs using createRequire
const require = createRequire(import.meta.url);
const config = require("../../config.cjs");

const whatsappApkSearchCommand = async (m, gss) => {
  const prefix = config.PREFIX;
  const cmd = m.body.startsWith(prefix) ? m.body.slice(prefix.length).split(" ")[0].toLowerCase() : "";
  const validCommands = ["playstore", "sapk"];

  if (validCommands.includes(cmd)) {
    // Extract the search query from the command (e.g., "!whatsappapk <search_query>")
    const searchQuery = m.body.slice(prefix.length + cmd.length).trim();

    if (!searchQuery) {
      await gss.sendMessage(
        m.from,
        { text: "Please provide a search query after the command." },
        { quoted: m }
      );
      return;
    }

    const apiUrl = `https://www.dark-yasiya-api.site/search/apk?text=${encodeURIComponent(searchQuery)}`;

    try {
      // Fetch data from API
      const response = await axios.get(apiUrl);
      const apiData = response.data;

      if (apiData.status && apiData.result.data.length > 0) {
        let message = `*Search Results for WhatsApp APKs:* ${searchQuery}\n\n`;

        // Loop through the results and format them
        apiData.result.data.forEach((item, index) => {
          message += `*${index + 1}. ${item.name}*\n`;
          message += `📱 *Package ID:* ${item.id}\n`;
          message += `🔗 *Download Link:* https://play.google.com/store/apps/details?id=${item.id}\n\n`;
        });

        // Send the search results message
        await gss.sendMessage(m.from, { text: message.trim() }, { quoted: m });
      } else {
        await gss.sendMessage(
          m.from,
          { text: "No APK results found for your search query." },
          { quoted: m }
        );
      }
    } catch (error) {
      console.error("WhatsApp APK Search Command Error:", error);
      await gss.sendMessage(
        m.from,
        { text: "An error occurred while processing the WhatsApp APK search command. Please try again later." },
        { quoted: m }
      );
    }
  }
};

export default whatsappApkSearchCommand;

// stop copping my codes mother fucker
  
