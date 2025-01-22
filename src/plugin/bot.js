import config from '../../config.cjs';

const ping = async (m, sock) => {
  const prefix = config.PREFIX;
const cmd = m.body.startsWith(prefix) ? m.body.slice(prefix.length).split(' ')[0].toLowerCase() : '';
const text = m.body.slice(prefix.length + cmd.length).trim();

  if (cmd === "bot") {
    const start = new Date().getTime();
    await m.React('😃');
    const end = new Date().getTime();
    const responseTime = (end - start) / 1000;

    const text = `┏❐*ᴡʜᴀᴛsᴀᴘᴘ ʙᴏᴛ*❏
┃❐ʙᴏᴛ ɴᴀᴍᴇ:ᴊᴏᴇʟ ᴍᴅ
┃❐ʙᴏᴛ ᴘʀᴇғɪx:sɪɴɢʟᴇ{•}
┃❐ʙᴏᴛ sᴛᴀᴛᴜs:ʙᴏᴛ ɪs ᴏɴʟɪɴᴇ
┃❐ʙᴏᴛ ᴏᴡɴᴇʀ:ʟᴏʀᴅ ᴊᴏᴇʟ
┗❑
┏┃❐ᴡᴀ ᴄʜᴀɴɴᴇʟ❐
┃https://whatsapp.com/channel/0029Vak2PevK0IBh2pKJPp2K
┗❏`;
    sock.sendMessage(m.from, { text }, { quoted: m });
  }
}

export default ping;
