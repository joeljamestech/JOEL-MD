import pkg, { prepareWAMessageMedia } from '@whiskeysockets/baileys';
const { generateWAMessageFromContent, proto } = pkg;
import axios from 'axios';

const searchRepo = async (m, Matrix) => {
  const prefixMatch = m.body.match(/^[\\/!#.]/);
  const prefix = prefixMatch ? prefixMatch[0] : '/';
  const cmd = m.body.startsWith(prefix) ? m.body.slice(prefix.length).split(' ')[0].toLowerCase() : '';

  const validCommands = ['repo1', 'sc1', 'script'];

  if (validCommands.includes(cmd)) {
    const repoUrl = 'https://api.github.com/repos/Demon-Slayer2/DEMONS-SLAYER-XMD';
    await handleRepoCommand(m, Matrix, repoUrl);
  }
};

const handleRepoCommand = async (m, Matrix, repoUrl) => {
  try {
    const response = await axios.get(repoUrl);
    const repoData = response.data;

    const messageText = `*_𝙳𝙴𝙼𝙾𝙽 𝚂𝙻𝙰𝚈𝙴𝚁 𝚁𝙴𝙿𝙾 𝙸𝙽𝙵𝙾_*\n
╭━━〔 *𝚁𝚎𝚙𝚘 𝙸𝚗𝚏𝚘* 〕━━┈⊷
┃◈╭─────────────·๏
┃◈┃ *ɴᴀᴍᴇ:* ${repoData.name}
┃◈┃ *sᴛᴀʀᴅ:* ${repoData.stargazers_count}
┃◈┃ *ғᴏʀᴋs:* ${repoData.forks_count}
┃◈┃ *ᴄʀᴇᴀᴛᴇʀ ᴀᴛ:* ${new Date(repoData.created_at).toLocaleDateString()}
┃◈┃ *ʟᴀsᴛ ᴜᴘᴅᴀᴛᴇғ:* ${new Date(repoData.updated_at).toLocaleDateString()}
┃◈┃ *ᴏᴡɴᴇʀ:* *_ᴄʀᴇᴡ sʟᴀʏᴇʀ_*
┃◈└───────────┈⊷
╰──────────────`;

    const buttons = [
      {
        name: 'cta_url',
        buttonParamsJson: JSON.stringify({
          display_text: 'ᴄʜᴀᴛ ᴅᴇᴠ',
          url: 'https://wa.me/+254790375710?text='
        })
      },
      {
        name: 'quick_reply',
        buttonParamsJson: JSON.stringify({
          display_text: "ᴛᴏ ᴍᴇɴᴜ",
          id: ".menu"
        })
      },
      {
        name: 'quick_reply',
        buttonParamsJson: JSON.stringify({
          display_text: "sᴘᴇᴇᴅ",
          id: ".ping"
        })
      },
      {
        name: 'cta_url',
        buttonParamsJson: JSON.stringify({
          display_text: 'ʀᴇᴘᴏ',
          url: 'https://github.com/Demon-Slayer2/DEMONS-SLAYER-XMD/'
        })
      },
      {
        name: 'cta_url',
        buttonParamsJson: JSON.stringify({
          display_text: 'ғᴏʟʟᴏᴡ',
          url: 'https://whatsapp.com/channel/0029Vajvy2kEwEjwAKP4SI0x'
        })
      },
      {
        name: 'quick_reply',
        buttonParamsJson: JSON.stringify({
          display_text: "ᴀᴛᴛᴘ",
          id: ".attp"
        })
      },
      {
        name: 'quick_reply',
        buttonParamsJson: JSON.stringify({
          display_text: "ᴀᴛᴛᴘ2",
          id: ".attp2"
        })
      },
      {
        name: 'quick_reply',
        buttonParamsJson: JSON.stringify({
          display_text: "ᴀᴛᴛᴘ3",
          id: ".attp3"
        })
      },
      {
        name: 'quick_reply',
        buttonParamsJson: JSON.stringify({
          display_text: "ᴇʙɪɴᴀʀʏ",
          id: ".ebinary"
        })
      },
      {
        name: 'quick_reply',
        buttonParamsJson: JSON.stringify({
          display_text: "ᴅʙɪɴᴀʀʏ",
          id: ".dbinary"
        })
      },
      {
        name: 'quick_reply',
        buttonParamsJson: JSON.stringify({
          display_text: "ᴇᴍᴏᴊɪᴍɪx",
          id: ".emojimix"
        })
      },
      {
        name: 'quick_reply',
        buttonParamsJson: JSON.stringify({
          display_text: "ᴍᴘ3",
          id: ".mp3"
        })
      },
      {
        name: 'quick_reply',
        buttonParamsJson: JSON.stringify({
          display_text: "ᴀɪ",
          id: ".ai"
        })
      },
      {
        name: 'quick_reply',
        buttonParamsJson: JSON.stringify({
          display_text: "ʙᴜɢ",
          id: ".bug"
        })
      },
      {
        name: 'quick_reply',
        buttonParamsJson: JSON.stringify({
          display_text: "ɢᴘᴛ",
          id: ".gpt"
        })
      },
      {
        name: 'quick_reply',
        buttonParamsJson: JSON.stringify({
          display_text: "ᴅᴀʟʟᴇ",
          id: ".dalle"
        })
      },
      {
        name: 'quick_reply',
        buttonParamsJson: JSON.stringify({
          display_text: "ʀᴇᴍɪɴɪ",
          id: ".remini"
        })
      },
      {
        name: 'quick_reply',
        buttonParamsJson: JSON.stringify({
          display_text: "ɢᴇᴍɪɴɪ",
          id: ".gemini"
        })
      },
      {
        name: 'quick_reply',
        buttonParamsJson: JSON.stringify({
          display_text: "ᴄᴀʟᴄᴜʟᴀᴛᴏʀ",
          id: ".calculator"
        })
      },
      {
        name: 'quick_reply',
        buttonParamsJson: JSON.stringify({
          display_text: "ᴛᴇᴍᴘᴍᴀɪʟ",
          id: ".tempmail"
        })
      },
      {
        name: 'quick_reply',
        buttonParamsJson: JSON.stringify({
          display_text: "ᴄʜᴇᴄᴋᴍᴀɪʟ",
          id: ".checkmail"
        })
      },
      {
        name: 'quick_reply',
        buttonParamsJson: JSON.stringify({
          display_text: "ᴛʀᴀɴsʟᴀᴛᴇ",
          id: ".trt"
        })
      },
      {
        name: 'quick_reply',
        buttonParamsJson: JSON.stringify({
          display_text: "ᴛᴛs",
          id: ".tts"
        })
      },
      {
        name: 'quick_reply',
        buttonParamsJson: JSON.stringify({
          display_text: "ʟɪɴᴋɢʀᴏᴜᴘ",
          id: ".linkgroup"
        })
      },
      {
        name: 'quick_reply',
        buttonParamsJson: JSON.stringify({
          display_text: "sᴇᴛᴘᴘɢᴄ",
          id: ".setppgc"
        })
      },
      {
        name: 'quick_reply',
        buttonParamsJson: JSON.stringify({
          display_text: "sᴇᴛɴᴀᴍᴇ",
          id: ".setname"
        })
      },
      {
        name: 'quick_reply',
        buttonParamsJson: JSON.stringify({
          display_text: "sᴇᴛᴅᴇsᴄ",
          id: ".setdesc"
        })
      },
      {
        name: 'quick_reply',
        buttonParamsJson: JSON.stringify({
          display_text: "ɢʀᴏᴜᴘ",
          id: ".group"
        })
      },
      {
        name: 'quick_reply',
        buttonParamsJson: JSON.stringify({
          display_text: "ɢᴄsᴇᴛᴛɪɴɢ",
          id: ".gcsetting"
        })
      },
      {
        name: 'quick_reply',
        buttonParamsJson: JSON.stringify({
          display_text: "ᴡᴇʟᴄᴏᴍᴇ",
          id: ".welcome"
        })
      },
      {
        name: 'quick_reply',
        buttonParamsJson: JSON.stringify({
          display_text: "ᴀᴅᴅ",
          id: ".add"
        })
      },
      {
        name: 'quick_reply',
        buttonParamsJson: JSON.stringify({
          display_text: "ᴋɪᴄᴋ",
          id: ".kick"
        })
      },
      {
        name: 'quick_reply',
        buttonParamsJson: JSON.stringify({
          display_text: "ʜɪᴅᴇᴛᴀɢ",
          id: ".hidetag"
        })
      },
      {
        name: 'quick_reply',
        buttonParamsJson: JSON.stringify({
          display_text: "ᴛᴀɢᴀʟʟ",
          id: ".tagall"
        })
      },
      {
        name: 'quick_reply',
        buttonParamsJson: JSON.stringify({
          display_text: "ᴀɴᴛɪʟɪɴᴋ",
          id: ".antilink"
        })
      },
      {
        name: 'quick_reply',
        buttonParamsJson: JSON.stringify({
          display_text: "ᴀɴᴛɪᴛᴏxɪᴄ",
          id: ".antitoxic"
        })
      },
      {
        name: 'quick_reply',
        buttonParamsJson: JSON.stringify({
          display_text: "ᴘʀᴏᴍᴏᴛᴇ",
          id: ".promote"
        })
      },
      {
        name: 'quick_reply',
        buttonParamsJson: JSON.stringify({
          display_text: "ᴅᴇᴍᴏᴛᴇ",
          id: ".demote"
        })
      },
      {
        name: 'quick_reply',
        buttonParamsJson: JSON.stringify({
          display_text: "ɢᴇᴛʙɪᴏ",
          id: ".getbio"
        })
      },
      {
        name: 'quick_reply',
        buttonParamsJson: JSON.stringify({
          display_text: "ᴀᴘᴋ",
          id: ".apk"
        })
      },
      {
        name: 'quick_reply',
        buttonParamsJson: JSON.stringify({
          display_text: "ғᴀᴄᴇʙᴏᴏᴋ",
          id: ".facebook"
        })
      },
      {
        name: 'quick_reply',
        buttonParamsJson: JSON.stringify({
          display_text: "ᴍᴇᴅɪᴀғɪʀᴇ",
          id: ".mediafire"
        })
      },
      {
        name: 'quick_reply',
        buttonParamsJson: JSON.stringify({
          display_text: "ᴘɪɴᴛᴇʀᴇsᴛᴅʟ",
          id: ".pinterestdl"
        })
      },
      {
        name: 'quick_reply',
        buttonParamsJson: JSON.stringify({
          display_text: "ɢɪᴛᴄʟᴏɴᴇ",
          id: ".gitclone"
        })
      },
      {
        name: 'quick_reply',
        buttonParamsJson: JSON.stringify({
          display_text: "ɢᴅʀɪᴠᴇ",
          id: ".gdrive"
        })
      },
      {
        name: 'quick_reply',
        buttonParamsJson: JSON.stringify({
          display_text: "ɪɴsᴛᴀ",
          id: ".insta"
        })
      },
      {
        name: 'quick_reply',
        buttonParamsJson: JSON.stringify({
          display_text: "ʏᴛᴍᴘ3",
          id: ".ytmp3"
        })
      },
      {
        name: 'quick_reply',
        buttonParamsJson: JSON.stringify({
          display_text: "ʏᴛᴍᴘ4",
          id: ".ytmp4"
        })
      },
      {
        name: 'quick_reply',
        buttonParamsJson: JSON.stringify({
          display_text: "ᴘʟᴀʏ",
          id: ".play"
        })
      },
      {
        name: 'quick_reply',
        buttonParamsJson: JSON.stringify({
          display_text: "sᴏɴɢ",
          id: ".song"
        })
      },
      {
        name: 'quick_reply',
        buttonParamsJson: JSON.stringify({
          display_text: "ᴠɪᴅᴇᴏ",
          id: ".video"
        })
      },
      {
        name: 'quick_reply',
        buttonParamsJson: JSON.stringify({
          display_text: "ʏᴛᴍᴘ3ᴅᴏᴄ",
          id: ".ytmp3doc"
        })
      },
      {
        name: 'quick_reply',
        buttonParamsJson: JSON.stringify({
          display_text: "ʏᴛᴍᴘ4ᴅᴏᴄ",
          id: ".ytmp4doc"
        })
      },
      {
        name: 'quick_reply',
        buttonParamsJson: JSON.stringify({
          display_text: "ᴛɪᴋᴛᴏᴋ",
          id: ".tiktok"
        })
      },
      {
        name: 'quick_reply',
        buttonParamsJson: JSON.stringify({
          display_text: "ʏᴛs",
          id: ".yts"
        })
      },
      {
        name: 'quick_reply',
        buttonParamsJson: JSON.stringify({
          display_text: "ɪᴍᴅʙ",
          id: ".imdb"
        })
      },
      {
        name: 'quick_reply',
        buttonParamsJson: JSON.stringify({
          display_text: "ɢᴏᴏɢʟᴇ",
          id: ".google"
        })
      },
      {
        name: 'quick_reply',
        buttonParamsJson: JSON.stringify({
          display_text: "ɢɪᴍᴀɢᴇ",
          id: ".gimage"
        })
      },
      {
        name: 'quick_reply',
        buttonParamsJson: JSON.stringify({
          display_text: "ᴘɪɴᴛᴇʀᴇsᴛ",
          id: ".pinterest"
        })
      },
      {
        name: 'quick_reply',
        buttonParamsJson: JSON.stringify({
          display_text: "ᴡᴀʟʟᴘᴀᴘᴇʀ",
          id: ".wallpaper"
        })
      },
      {
        name: 'quick_reply',
        buttonParamsJson: JSON.stringify({
          display_text: "ᴡɪᴋɪᴍᴇᴅɪᴀ",
          id: ".wikimedia"
        })
      },
      {
        name: 'quick_reply',
        buttonParamsJson: JSON.stringify({
          display_text: "ʏᴛsᴇᴀʀᴄʜ",
          id: ".ytsearch"
        })
      },
      {
        name: 'quick_reply',
        buttonParamsJson: JSON.stringify({
          display_text: "ʟɪsᴛ",
          id: ".list"
        })
      }
    ];

    const repoMessage = generateWAMessageFromContent(m.from, {
      viewOnceMessage: {
        message: {
          messageContextInfo: {
            deviceListMetadata: {},
            deviceListMetadataVersion: 2
          },
          interactiveMessage: proto.Message.InteractiveMessage.create({
            body: proto.Message.InteractiveMessage.Body.create({
              text: messageText
            }),
            footer: proto.Message.InteractiveMessage.Footer.create({
              text: '*ᴅᴇᴍᴏɴ sʟᴀʏᴇʀ*'
            }),
            header: proto.Message.InteractiveMessage.Header.create({
              ...(await prepareWAMessageMedia({
                image: {
                  url: 'https://files.catbox.moe/13kbx5.jpg'
                }
              }, { upload: Matrix.waUploadToServer })),
              title: '',
              gifPlayback: true,
              subtitle: '',
              hasMediaAttachment: false
            }),
            nativeFlowMessage: proto.Message.InteractiveMessage.NativeFlowMessage.create({
              buttons: buttons
            }),
            contextInfo: {
              mentionedJid: [m.sender],
              forwardingScore: 9999,
              isForwarded: true
            }
          })
        }
      }
    }, {});

    await Matrix.relayMessage(repoMessage.key.remoteJid, repoMessage.message, {
      messageId: repoMessage.key.id
    });
    await m.React('✅');
  } catch (error) {
    console.error('Error processing repo request:', error);
    m.reply('Error processing repo request.');
    await m.React('❌');
  }
};

export default searchRepo;
