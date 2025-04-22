import axios from 'axios';
import config from '../../config.cjs';
global.nex_key = 'https://api.nexoracle.com';
global.nex_api = 'free_key@maher_apis';

const sleep = ms => new Promise(resolve => setTimeout(resolve, ms));

const imageCommand = async (m, sock) => {
  const prefix = config.PREFIX;
  const cmd = m.body.startsWith(prefix) ? m.body.slice(prefix.length).split(' ')[0].toLowerCase() : '';
  let query = m.body.slice(prefix.length + cmd.length).trim();

  const validCommands = ['image', 'img', 'gimage'];

  if (validCommands.includes(cmd)) {
    if (!query && !(m.quoted && m.quoted.text)) {
      return sock.sendMessage(m.from, { text: `Please provide some text, Example usage: ${prefix + cmd} black cats` });
    }

    if (!query && m.quoted && m.quoted.text) {
      query = m.quoted.text;
    }

    try {
      await sock.sendMessage(m.from, { text: '*Please wait*' });

      const endpoint = `${global.nex_key}/search/google-image?apikey=${global.nex_api}&q=${encodeURIComponent(query)}`;
      const response = await axios.get(endpoint);

      if (response.status === 200 && response.data.result && response.data.result.length > 0) {
        const images = response.data.result.slice(0, 5); // Limit to 5 images

        for (let i = 0; i < images.length; i++) {
          await sleep(500);
          await sock.sendMessage(m.from, { image: { url: images[i] }, caption: '' }, { quoted: m });
        }
        await m.React("✅");
      } else {
        throw new Error('No images found');
      }
    } catch (error) {
      console.error("Error fetching images:", error);
      await sock.sendMessage(m.from, { text: `*Oops! Something went wrong while generating images. Please try again later.*\n\nError: ${error}` });
    }
  }
};

export default imageCommand;
