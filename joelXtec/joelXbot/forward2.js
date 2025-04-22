import config from '../../config.cjs';

const OwnerCmd = async (m, Matrix) => {
  const botNumber = await Matrix.decodeJid(Matrix.user.id);
  const ownerNumber = config.OWNER_NUMBER + '@s.whatsapp.net';
  const prefix = config.PREFIX;
  const cmd = m.body.startsWith(prefix) ? m.body.slice(prefix.length).split(' ')[0].toLowerCase() : '';
  const text = m.body.slice(prefix.length + cmd.length).trim();
  const isOwner = m.sender === ownerNumber;
  const isBot = m.sender === botNumber;
  const isAllowed = isOwner || isBot; // 🔥 Owner & Bot dono use kar sakte hain

  // 📢 Broadcast Message to All Groups (Owner & Bot)
  if (cmd === 'forward') {
    if (!isAllowed) return m.reply('❌ *You are not authorized to use this command!*');
    if (!text) return m.reply('📢 *Please provide a message to broadcast.*');

    try {
      const groups = Object.keys(await Matrix.groupFetchAllParticipating());
      for (const groupId of groups) {
        await Matrix.sendMessage(groupId, { text }, { quoted: null }); // 🔥 Quoted hata diya
      }
      m.reply('✅ *Broadcast sent to all groups!*');
    } catch (error) {
      console.error(error);
      m.reply('❌ *Failed to send broadcast!*');
    }
  }

  // 🤖 Get JID of the current chat (Owner & Bot)
  if (cmd === 'getall') {
    if (!isAllowed) return m.reply('❌ *You are not authorized to use this command!*');
    m.reply(`📌 *Chat JID:* ${m.from}`);
  }
};

// lord joel projects 
export default OwnerCmd;
