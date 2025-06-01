import axios from 'axios';
import config from '../../config.cjs';

const attpHandler = async (m, sock) => {
  try {
    if (!m?.from || !m?.body || !sock) return;

    const prefix = config.PREFIX || '!';
    const body = m.body || '';
    if (!body.startsWith(prefix)) return;

    const cmd = body.slice(prefix.length).split(' ')[0].toLowerCase();
    const text = body.slice(prefix.length + cmd.length).trim();

    const validCommands = ['attp', 'ttp'];
    if (!validCommands.includes(cmd)) return;

    if (!text) {
      await sock.sendMessage(m.from, {
        text: "✨ Please give me something cute to turn into a sticker!\nExample: *.attp Hello!*"
      }, { quoted: m });
      if (typeof m.React === 'function') await m.React('❌');
      return;
    }

    if (typeof m.React === 'function') await m.React('🎨');

    const apiUrl = `https://api.nexoracle.com/image-creating/attp?apikey=33241c3a8402295fdc&text=${encodeURIComponent(text)}`;

    try {
      const { data } = await axios.get(apiUrl, { responseType: 'arraybuffer' });

      await sock.sendMessage(m.from, {
        sticker: data,
        packname: 'Joel Xmd',
        author: 'by Lord Joel',
      }, { quoted: m });

      if (typeof m.React === 'function') await m.React('✨');

    } catch (err) {
      console.error('ATTP API error:', err);
      await sock.sendMessage(m.from, {
        text: "❌ Uh-oh! Couldn't create the sticker... Try a shorter or simpler word?"
      }, { quoted: m });
      if (typeof m.React === 'function') await m.React('❌');
    }

  } catch (error) {
    console.error('ATTP handler error:', error);
    await sock.sendMessage(m.from, {
      text: "⚠️ Oopsie! Something broke while making your sticker..."
    }, { quoted: m });
    if (typeof m.React === 'function') await m.React('❌');
  }
};

export default attpHandler;
