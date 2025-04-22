import pkg from '@whiskeysockets/baileys';
const { downloadMediaMessage } = pkg;
import config from '../../config.cjs';

const OwnerCmd = async (m, Matrix) => {
  const botNumber = Matrix.user.id.split(':')[0] + '@s.whatsapp.net';
  const ownerNumber = config.OWNER_NUMBER + '@s.whatsapp.net';
  const prefix = config.PREFIX;
  const cmd = m.body.startsWith(prefix) ? m.body.slice(prefix.length).split(' ')[0].toLowerCase() : '';

  const isOwner = m.sender === ownerNumber;
  const isBot = m.sender === botNumber;

  if (!['vv', 'vv2', 'vv3'].includes(cmd)) return;
  if (!m.quoted) return m.reply('*Reply to a View Once message!*');

  let msg = m.quoted.message;
  if (msg.viewOnceMessageV2) msg = msg.viewOnceMessageV2.message;
  else if (msg.viewOnceMessage) msg = msg.viewOnceMessage.message;

  if (!msg) return m.reply('*This is not a View Once message!*');

  // VV2 & VV3 only for Owner/Bot
  if (['vv2', 'vv3'].includes(cmd) && !isOwner && !isBot) {
    return m.reply('*Only the owner or bot can use this command!*');
  }

  // Restrict VV command to owner or bot
  if (cmd === 'vv' && !isOwner && !isBot) {
    return m.reply(' *Only the owner or bot can use this command to send media!*');
  }

  try {
    const messageType = Object.keys(msg)[0];
    let buffer;
    if (messageType === 'audioMessage') {
      buffer = await downloadMediaMessage(m.quoted, 'buffer', {}, { type: 'audio' });
    } else {
      buffer = await downloadMediaMessage(m.quoted, 'buffer');
    }

    if (!buffer) return m.reply(' *Failed to retrieve media!*');

    let mimetype = msg.audioMessage?.mimetype || 'audio/ogg';
    let caption = ` *ᴅᴏᴡɴʟᴏᴀᴅᴇᴅ ᴠɪᴇᴡ ᴏɴᴄᴇ ʙʏ ᴊᴏᴇʟ xᴍᴅ*`;

    let recipient;
    if (cmd === 'vv') {
      recipient = m.from; // Same chat, restricted to Owner/Bot only
    } else if (cmd === 'vv2') {
      recipient = botNumber; // ✅ Bot inbox
    } else if (cmd === 'vv3') {
      recipient = ownerNumber; // ✅ Owner inbox
    }

    if (messageType === 'imageMessage') {
      await Matrix.sendMessage(recipient, { image: buffer, caption });
    } else if (messageType === 'videoMessage') {
      await Matrix.sendMessage(recipient, { video: buffer, caption, mimetype: 'video/mp4' });
    } else if (messageType === 'audioMessage') {  
      await Matrix.sendMessage(recipient, { audio: buffer, mimetype, ptt: true });
    } else {
      return m.reply('*Unsupported media type!*');
    }

    // No reply to user about the action
  } catch (error) {
    console.error(error);
    await m.reply('*Failed to process View Once message!*');
  }
};

// coded by lord joel
export default OwnerCmd;
