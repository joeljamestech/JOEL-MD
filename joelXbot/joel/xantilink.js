import fs from "fs";
import config from "../config.cjs";

const dbPath = "./database/antilink.json";
let antilinkDB = fs.existsSync(dbPath)
  ? JSON.parse(fs.readFileSync(dbPath))
  : {};

const saveDB = () => fs.writeFileSync(dbPath, JSON.stringify(antilinkDB, null, 2));

const antiLink = async (m, gss) => {
  try {
    const cmd = m.body.toLowerCase().trim();
    const prefix = config.PREFIX;

    if (!cmd.startsWith(prefix)) return;

    const command = cmd.slice(prefix.length).trim();

    // Show usage if only "antilink" is typed
    if (command === "antilink") {
      return m.reply(`*╭─❍『 ANTILINK USAGE 』❍\n│  ➤ ${prefix}antilink on\n│  ➤ ${prefix}antilink off\n│\n│  Use to enable or disable link blocking.\n│  ᴘᴏᴡᴇʀᴇᴅ ʙʏ ʟᴏʀᴅ ᴊᴏᴇʟ\n╰───────────────━⊷*`);
    }

    // Toggle ON manually
    if (command === "antilink on") {
      if (!m.isGroup)
        return m.reply("*╭─❍『 ERROR 』❍\n│  *GROUPS ONLY!*\n╰───────────────━⊷*");

      const metadata = await gss.groupMetadata(m.from);
      const isAdmin = metadata.participants.find(p => p.id === m.sender)?.admin;

      if (!isAdmin)
        return m.reply("*╭─❍『 ERROR 』❍\n│  *ADMIN ONLY COMMAND!*\n╰───────────────━⊷*");

      antilinkDB[m.from] = true;
      saveDB();
      return m.reply(`*╭─❍『 ANTILINK 』❍\n│  ✅ Activated manually!\n│  Use ${prefix}antilink off to disable.\n│  ᴘᴏᴡᴇʀᴇᴅ ʙʏ ʟᴏʀᴅ ᴊᴏᴇʟ\n╰───────────────━⊷*`);
    }

    // Toggle OFF
    if (command === "antilink off") {
      if (!m.isGroup)
        return m.reply("*╭─❍『 ERROR 』❍\n│  *GROUPS ONLY!*\n╰───────────────━⊷*");

      const metadata = await gss.groupMetadata(m.from);
      const isAdmin = metadata.participants.find(p => p.id === m.sender)?.admin;

      if (!isAdmin)
        return m.reply("*╭─❍『 ERROR 』❍\n│  *ADMIN ONLY COMMAND!*\n╰───────────────━⊷*");

      delete antilinkDB[m.from];
      saveDB();
      return m.reply(`*╭─❍『 ANTILINK 』❍\n│  ❌ Deactivated manually!\n│  Use ${prefix}antilink on to enable.\n│  ᴘᴏᴡᴇʀᴇᴅ ʙʏ ʟᴏʀᴅ ᴊᴏᴇʟ\n╰───────────────━⊷*`);
    }

    // Auto-delete links (respects config.ANTILINK global toggle)
    const isAutoOn = config.ANTILINK === true;
    const groupEnabled = antilinkDB[m.from];
    const shouldBlockLinks = isAutoOn || groupEnabled;

    if (shouldBlockLinks && m.isGroup) {
      const linkRegex = /(https?:\/\/[^\s]+|chat\.whatsapp\.com\/[a-zA-Z0-9]+)/gi;
      const metadata = await gss.groupMetadata(m.from);
      const isAdmin = metadata.participants.find(p => p.id === m.sender)?.admin;

      if (!isAdmin && linkRegex.test(m.body)) {
        await gss.sendMessage(m.from, { delete: m.key });
        return m.reply("*╭─❍『 ANTILINK 』❍\n│  🚫 Link deleted!\n│  Links are not allowed here!\n╰───────────────━⊷*");
      }
    }

  } catch (e) {
    console.error("AntiLink Error:", e);
    m.reply("*╭─❍『 ERROR 』❍\n│  ⚠️ Something went wrong!\n╰───────────────━⊷*");
  }
};

export default antiLink;
