import axios from 'axios';
import config from '../../config.cjs';

const ttsHandler = async (m, sock) => {
  try {
    if (!m?.from || !m?.body || !sock) return;

    const prefix = config.PREFIX || '!';
    const body = m.body || '';
    if (!body.startsWith(prefix)) return;

    const cmd = body.slice(prefix.length).split(' ')[0].toLowerCase();
    const text = body.slice(prefix.length + cmd.length).trim();

    const validCommands = ['tts', 'say', 'speak', 'talk'];
    if (!validCommands.includes(cmd)) return;

    if (!text) {
      await sock.sendMessage(m.from, {
        text: "✨ Oopsie~ You forgot to tell me what to say! Try something like:\n\n*!tts I love you Joel bot!*"
      }, { quoted: m });
      if (typeof m.React === 'function') await m.React('❌');
      return;
    }

    if (typeof m.React === 'function') await m.React('🎀');

    const apiUrl = `https://api.nexoracle.com/tts/text-to-speech?apikey=33241c3a8402295fdc&lang=en-US&text=${encodeURIComponent(text)}`;

    try {
      const { data } = await axios.get(apiUrl);

      if (!data?.status || !data?.result) {
        await sock.sendMessage(m.from, {
          text: "🥺 Aw no! I couldn't turn that into a voice note... Try again?"
        }, { quoted: m });
        if (typeof m.React === 'function') await m.React('❌');
        return;
      }

      await sock.sendMessage(m.from, {
        audio: { url: data.result },
        mimetype: 'audio/mpeg',
        ptt: true,
      }, { quoted: m });

      if (typeof m.React === 'function') await m.React('💖');

    } catch (err) {
      console.error('TTS API error:', err);
      await sock.sendMessage(m.from, {
        text: "⚠️ Uh-oh! Something went wrong with the magic spell... Try again later?"
      }, { quoted: m });
      if (typeof m.React === 'function') await m.React('❌');
    }

  } catch (error) {
    console.error('TTS handler error:', error);
    await sock.sendMessage(m.from, {
      text: "❌ Oh no! I tripped over the code wires... Please report this to my creator!"
    }, { quoted: m });
    if (typeof m.React === 'function') await m.React('❌');
  }
};
// lord joel 
export default ttsHandler;
