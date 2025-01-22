import config from '../../config.cjs';

const ping = async (m, sock) => {
  const prefix = config.PREFIX;
const cmd = m.body.startsWith(prefix) ? m.body.slice(prefix.length).split(' ')[0].toLowerCase() : '';
const text = m.body.slice(prefix.length + cmd.length).trim();

  if (cmd === "repo") {
    const start = new Date().getTime();
    await m.React('❐');
    const end = new Date().getTime();
    const responseTime = (end - start) / 1000;

    const text = `┏❐ᴡᴀ ʙᴏᴛ ʀᴇᴘᴏ ɪɴғᴏ❑
┃❐ʙᴏᴛ ɴᴀᴍᴇ:ᴊᴏᴇʟ ᴍᴅ
┃❐ʙᴏᴛ ᴏᴡɴᴇʀ:ᴊᴏᴇʟᴊᴀᴍᴇsᴛᴇᴄʜ
┗❑
┏❐ʀᴇᴘᴏ ᴜʀʟ
┃❑https://github.com/joeljamestech/JOEL-MD
┃❑ᴄᴏᴅᴇᴅ ʙʏ ᴊᴏᴇʟᴊᴀᴍᴇs
┗❑
┏❏ᴡᴀ ᴄʜᴀɴɴᴇʟ
┃❑https://whatsapp.com/channel/0029Vak2PevK0IBh2pKJPp2K
┗❑
*ᴘᴏᴡᴇʀᴇᴅ ʙʏ ᴊᴏᴇʟ ᴋᴀɴɢ'ᴏᴍᴀ*`;
    sock.sendMessage(m.from, { text }, { quoted: m });
  }
}

export default ping;
