import config from '../../config.cjs';

const kickAll = async (m, gss) => {
  try {
    const botNumber = await gss.decodeJid(gss.user.id);
    const prefix = config.PREFIX;
    const cmd = m.body.startsWith(prefix) ? m.body.slice(prefix.length).split(' ')[0].toLowerCase() : '';

    if (cmd !== 'kickall') return; // Only proceed if the command is 'kickall'
    if (!m.isGroup) return m.reply("* тнιѕ ¢σммαη∂ ¢αη σηℓу вє υѕє∂ ιη gяσυρѕ*");

    const groupMetadata = await gss.groupMetadata(m.from);
    const participants = groupMetadata.participants;
    const botAdmin = participants.find(p => p.id === botNumber)?.admin;
    const senderAdmin = participants.find(p => p.id === m.sender)?.admin;

    if (!botAdmin) return m.reply("*вσт мυѕт вє αη α∂мιη тσ υѕє тнιѕ ¢σммαη∂*");
    if (!senderAdmin) return m.reply("*уσυ мυѕт вє αη α∂мιη тσ υѕє тнιѕ ¢σммαη∂*");

    // Collect all non-admin members to remove
    const users = participants
      .filter(p => !p.admin) // Exclude admins
      .map(p => p.id);

    if (users.length === 0) {
      return m.reply("*ησ υѕєяѕ тσ кι¢к*");
    }

    await gss.groupParticipantsUpdate(m.from, users, 'remove')
      .then(() => {
        const kickedNames = users.map(user => `@${user.split("@")[0]}`);
        m.reply(`*υѕєяѕ ${kickedNames.join(', ')} кι¢кє∂ ѕυ¢¢єѕѕƒυℓℓу ƒяσм тнє gяσυρ ${groupMetadata.subject}*`);
        
        // Send the custom kick message
        gss.sendMessage(m.from, { text: `Bhosdewale ${kickedNames.join(', ')} ko remove kr dia `, mentions: users });
      })
      .catch(() => m.reply('Failed to kick user(s) from the group.'));
  } catch (error) {
    console.error('Error:', error);
    m.reply('An error occurred while processing the command.');
  }
};

export default kickAll;
