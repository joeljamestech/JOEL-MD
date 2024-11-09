import config from '../../config.cjs';

const ping = async (m, sock) => {
  const prefix = config.PREFIX;
const cmd = m.body.startsWith(prefix) ? m.body.slice(prefix.length).split(' ')[0].toLowerCase() : '';
const text = m.body.slice(prefix.length + cmd.length).trim();

  if (cmd === "repo") {
    const start = new Date().getTime();
    await m.React('📌');
    const end = new Date().getTime();
    const responseTime = (end - start) / 1000;

    const text = `┏━❐
┃ 𝙹𝙾𝚎𝚕 𝚖𝚍 𝚋𝚘𝚝
┃ 𝚟𝚒𝚜𝚒𝚘𝚗 (𝟼) 
┗━━━━━
   ┃
  ┏
  ┃https://github.com/joeljamestech/JOEL-MD
  ┃𝚖𝚊𝚍𝚎 𝚋𝚢 𝙹𝙾𝚎𝚕 𝚝𝚎𝚌𝚑
  ┗━━━━━━━━━
┃https://whatsapp.com/channel/0029Vade9VgD38CPEnxfYF0M
┗━━━━━━━━━━━━━━━━❑`;
    sock.sendMessage(m.from, { text }, { quoted: m });
  }
}

export default ping;
