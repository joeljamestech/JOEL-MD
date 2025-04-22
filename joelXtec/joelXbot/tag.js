
import config from '../../config.cjs';

const tagAll = async (m, gss) => {
  try {
    // Ensure the function is async
    const botNumber = await gss.decodeJid(gss.user.id);
    const prefix = config.PREFIX;
const cmd = m.body.startsWith(prefix) ? m.body.slice(prefix.length).split(' ')[0].toLowerCase() : '';
const text = m.body.slice(prefix.length + cmd.length).trim();
    
    // Check for the valid command
    const validCommands = ['tagall'];
    if (!validCommands.includes(cmd)) return;


    const groupMetadata = await gss.groupMetadata(m.from);
    const participants = groupMetadata.participants;
    const botAdmin = participants.find(p => p.id === botNumber)?.admin;
    const senderAdmin = participants.find(p => p.id === m.sender)?.admin;
    
        if (!m.isGroup) return m.reply("*ιт ιѕ α gяσυρ ¢σммαη∂*");

    if (!botAdmin) return m.reply("*ʝσєℓ χm∂ bot мυѕт вє α∂мιη тσ υѕє тнιѕ ¢σммαη∂*");
    if (!senderAdmin) return m.reply("*уσυ αяє ησт α∂мιη вιт¢н*");
    // Extract the message to be sent
    let message = `乂 *Attention Everyone* 乂\n\n*Message:* ${m.body.slice(prefix.length + cmd.length).trim() || 'no message'}\n\n`;
        


    for (let participant of participants) {
      message += `❏@${participant.id.split('@')[0]}\n`;
    }

    await gss.sendMessage(m.from, { text: message, mentions: participants.map(a => a.id) }, { quoted: m });
  } catch (error) {
    console.error('Error:', error);
    await m.reply('*🔐this is group command*');
  }
};

export default tagAll;
