/*

import config from '../../config.cjs';

const autotypingCommand = async (m, Matrix) => {
  const botNumber = await Matrix.decodeJid(Matrix.user.id);
  const isCreator = [botNumber, config.OWNER_NUMBER + '@s.whatsapp.net'].includes(m.sender);
  const prefix = config.PREFIX;
const cmd = m.body.startsWith(prefix) ? m.body.slice(prefix.length).split(' ')[0].toLowerCase() : '';
const text = m.body.slice(prefix.length + cmd.length).trim();

  if (cmd === 'chatbot') {
    if (!isCreator) return m.reply("*ᴏᴡɴᴇʀ ᴄᴏᴍᴍᴀɴᴅ ᴍᴀᴅᴀғᴀᴋᴇʀ*");
    let responseMessage;

    if (text === 'on') {
      config.CHAT_BOT = true;
      responseMessage = "chatbot has been enabled.";
    } else if (text === 'off') {
      config.CHAT_BOT = false;
      responseMessage = "chatbot has been disabled.";
    } else {
      responseMessage = "Usage:\n- `chatbot on`: Enable Auto-chatbot\n- `chatbot  off`: Disable Auto-chat bot";
    }

    try {
      await Matrix.sendMessage(m.from, { text: responseMessage }, { quoted: m });
    } catch (error) {
      console.error("Error processing your request:", error);
      await Matrix.sendMessage(m.from, { text: 'Error processing your request.' }, { quoted: m });
    }
  }
};

export default autotypingCommand;
*/


import config from '../../config.cjs';

const autotypingCommand = async (m, Matrix) => {
  const botNumber = await Matrix.decodeJid(Matrix.user.id);
  const isCreator = [botNumber, config.OWNER_NUMBER + '@s.whatsapp.net'].includes(m.sender);
  const prefix = config.PREFIX;
  const cmd = m.body.startsWith(prefix) ? m.body.slice(prefix.length).split(' ')[0].toLowerCase() : '';
  const text = m.body.slice(prefix.length + cmd.length).trim();

  // List of all commands that should toggle the chatbot state
  const validCommands = ['chatbot', 'lydea', 'lydia', 'answer', 'automreply'];

  // Check if the command is in the list of valid commands
  if (validCommands.includes(cmd)) {
    if (!isCreator) return m.reply("*ᴏᴡɴᴇʀ ᴄᴏᴍᴍᴀɴᴅ ᴍᴀᴅᴀғᴀᴋᴇʀ*");

    let responseMessage;

    // Toggle chatbot state based on the passed argument ('on' or 'off')
    if (text === 'on') {
      config.CHAT_BOT = true;
      responseMessage = `${cmd.charAt(0).toUpperCase() + cmd.slice(1)}: Chatbot has been enabled.`;
    } else if (text === 'off') {
      config.CHAT_BOT = false;
      responseMessage = `${cmd.charAt(0).toUpperCase() + cmd.slice(1)}: Chatbot has been disabled.`;
    } else {
      responseMessage = "Usage:\n- `command on`: Enable Chatbot\n- `command off`: Disable Chatbot";
    }

    try {
      await Matrix.sendMessage(m.from, { text: responseMessage }, { quoted: m });
    } catch (error) {
      console.error("Error processing your request:", error);
      await Matrix.sendMessage(m.from, { text: 'Error processing your request.' }, { quoted: m });
    }
  }
};

export default autotypingCommand;


/*

1. chatbot on
2. chatbot off
3. lydea
4. lydia
5. bot
6. automreply on
7. automreply off

                               */
