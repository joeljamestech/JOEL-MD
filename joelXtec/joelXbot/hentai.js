import config from "../../config.cjs";

const antibotDB = new Set(); // Temporary in-memory storage for tracking groups where Anti-Bot is enabled

const antiBot = async (m, gss) => {
  try {
    const cmd = m.body?.toLowerCase().trim();

    if (!cmd) return; // Exit if the message body is empty

    // **Enable Anti-Bot**
    if (cmd === "antibot on") {
      if (!m.isGroup) return m.reply("*THIS COMMAND CAN ONLY BE USED IN GROUPS!*");
      
      const groupMetadata = await gss.groupMetadata(m.from);
      const participants = groupMetadata.participants;
      const senderAdmin = participants.some(p => p.id === m.sender && p.admin);

      if (!senderAdmin) {
        return m.reply("*🚫 YOU MUST BE AN ADMIN TO ENABLE ANTIBOT!*");
      }

      antibotDB.add(m.from);
      return m.reply("*✅ Anti-Bot is now ACTIVATED for this group.*\n\n*Regards, Bruce Bera.*");
    }

    // **Disable Anti-Bot**
    if (cmd === "antibot off") {
      if (!m.isGroup) return m.reply("*📛 THIS COMMAND CAN ONLY BE USED IN GROUPS!*");

      const groupMetadata = await gss.groupMetadata(m.from);
      const participants = groupMetadata.participants;
      const senderAdmin = participants.some(p => p.id === m.sender && p.admin);

      if (!senderAdmin) {
        return m.reply("*🚫 YOU MUST BE AN ADMIN TO DISABLE ANTIBOT!*");
      }

      antibotDB.delete(m.from);
      return m.reply("*❌ Anti-Bot is now DISABLED for this group.*");
    }

    // **Detect and Delete All Bot Messages**
    if (antibotDB.has(m.from)) {
      // A simple bot detection based on 'bot' in the username, or you can add more checks.
      const isBot = m.sender === 'bot' || m.body.includes('bot'); // Example check, you can enhance this

      // If the message sender is detected as a bot
      if (isBot) {
        await gss.sendMessage(m.from, { delete: m.key });
        return m.reply("*🚫 Bots are not allowed in this group!*");
      }
    }

  } catch (error) {
    console.error("Error in Anti-Bot:", error);
    m.reply("*⚠️ An error occurred while processing Anti-Bot.");
  }
};

export default antiBot;
