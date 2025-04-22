import axios from 'axios';
import config from '../../config.cjs';

const quranImage = async (m, gss) => {
  const prefix = config.PREFIX;
  const cmd = m.body.startsWith(prefix) ? m.body.slice(prefix.length).split(' ')[0].toLowerCase() : '';
  const validCommands = ['quraimage', 'qimg', 'qimg'];

  if (validCommands.includes(cmd)) {
    const joelUrl = `https://bk9.fun/Islam/din`;
await m.React('⏳'); // React with a loading icon
    await gss.sendMessage(
      m.from,
      {
        image: { url: joelUrl },
        caption: `*ᴘᴏᴡᴇʀᴇᴅ ʙʏ ʟᴏʀᴅ  ᴊᴏᴇʟ*`,
      },
      { quoted: m }
    );
  }
};

export default quranImage;
