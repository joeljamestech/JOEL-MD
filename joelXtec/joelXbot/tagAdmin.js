/*
import config from '../../config.cjs';

const tagAdmins = async (m, gss) => {
  try {
    const botNumber = await gss.decodeJid(gss.user.id);
    const prefix = config.PREFIX;
    const cmd = m.body.startsWith(prefix) ? m.body.slice(prefix.length).split(' ')[0].toLowerCase() : '';
    const text = m.body.slice(prefix.length + cmd.length).trim();

    // Only allow 'tagadmin' command
    if (cmd !== 'tagadmin') return;

    if (!m.isGroup) return m.reply("*ʝσєℓ χ∂ ν тняєє ѕαуѕ ιт ιѕ α gяσυρ ¢σммαη∂*");

    const groupMetadata = await gss.groupMetadata(m.from);
    const participants = groupMetadata.participants;
    const botAdmin = participants.find(p => p.id === botNumber)?.admin;

    if (!botAdmin) return m.reply("*ʝσєℓ χ∂ ν тняєє мυѕт вє α∂мιη тσ υѕє тнιѕ ¢σммαη∂*");

    // Extract the message to be sent
    let message = `乂 *Attention Admins* 乂\n\n*Message:* ${text || 'no message'}\n\n`;

    // Filter participants to get admins only
    const admins = participants.filter(p => p.admin);

    if (admins.length === 0) {
      return m.reply("*There are no admins to tag.*");
    }

    // Construct the message with mentions for admins
    for (let participant of admins) {
      message += `🗣️@${participant.id.split('@')[0]}\n`;
    }

    // Send the message mentioning admins
    await gss.sendMessage(m.from, { text: message, mentions: admins.map(a => a.id) }, { quoted: m });
  } catch (error) {
    console.error('Error:', error);
    await m.reply('An error occurred while processing the command. Please try again later.');
  }
};
//lord joel codes
export default tagAdmins;
*/

import config from '../../config.cjs';

const tagAdmins = async (m, gss) => {
  try {
    const botNumber = await gss.decodeJid(gss.user.id);
    const prefix = config.PREFIX;
    const cmd = m.body.startsWith(prefix) ? m.body.slice(prefix.length).split(' ')[0].toLowerCase() : '';
    const text = m.body.slice(prefix.length + cmd.length).trim();

    // Only allow 'tagadmin' command
    if (cmd !== 'tagadmin') return;

    if (!m.isGroup) return m.reply("*ʝσєℓ χ∂ ν тняєє ѕαуѕ ιт ιѕ α gяσυρ ¢σммαη∂*");

    const groupMetadata = await gss.groupMetadata(m.from);
    const participants = groupMetadata.participants;

    // Extract the message to be sent
    let message = `乂 *Attention Admins* 乂\n\n*Message:* ${text || 'no message'}\n\n`;

    // Filter participants to get admins only
    const admins = participants.filter(p => p.admin);

    if (admins.length === 0) {
      return m.reply("*There are no admins to tag.*");
    }

    // Construct the message with mentions for admins
    for (let participant of admins) {
      message += `🗣️@${participant.id.split('@')[0]}\n`;
    }

    // Send the message mentioning admins
    await gss.sendMessage(m.from, { text: message, mentions: admins.map(a => a.id) }, { quoted: m });
  } catch (error) {
    console.error('Error:', error);
    await m.reply('An error occurred while processing the command. Please try again later.');
  }
};

// Export the function
export default tagAdmins;
