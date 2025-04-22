import config from '../../config.cjs';
import process from 'process';

const RestartCmd = async (m, Matrix) => {
  const botNumber = await Matrix.decodeJid(Matrix.user.id);  // Bot's number
  const ownerNumber = config.OWNER_NUMBER + '@s.whatsapp.net'; // Owner's number from the config
  const prefix = config.PREFIX; // Command prefix
  const cmd = m.body.startsWith(prefix) ? m.body.slice(prefix.length).split(' ')[0].toLowerCase() : ''; // Extract command
  const isOwner = m.sender === ownerNumber; // Check if the sender is the owner
  const isBot = m.sender === botNumber; // Check if the sender is the bot itself

  // Cool font (Unicode styled) for the message
  const coolFontMessage = "𝗝𝗢𝗘𝗟 𝗫𝗠𝗗 𝗜𝗦 𝗥𝗘𝗦𝗧𝗔𝗥𝗧𝗜𝗡𝗚";

  if (cmd === 'restart') {
    if (!(isOwner || isBot)) return m.reply('❌ *Only the owner or the bot itself can use this command!*'); // Restrict command usage to owner or bot itself

    try {
      m.reply(`🔄 *${coolFontMessage}*`);
      // Exit the current process, the bot will be restarted by PM2 or another process manager
      process.exit(1); 
    } catch (e) {
      console.error("Error in restart command:", e);
      m.reply('❌ *Failed to restart the bot!*');
    }
  }
};
// joel codes
export default RestartCmd;
