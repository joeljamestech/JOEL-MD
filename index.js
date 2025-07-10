import dotenv from 'dotenv';
dotenv.config();

import {
  makeWASocket,
  fetchLatestBaileysVersion,
  DisconnectReason,
  useMultiFileAuthState,
} from '@whiskeysockets/baileys';

import fs from 'fs';
import path from 'path';
import express from 'express';
import pino from 'pino';
import chalk from 'chalk';
import axios from 'axios';
import { File } from 'megajs';
import config from './config.cjs';
import { Handler, Callupdate, GroupUpdate } from './joeljames/joelXtec/joel.js';
import autoreact from './lib/autoreact.cjs';

const { emojis, doReact } = autoreact;
const app = express();
const PORT = process.env.PORT || 3000;
const htmlDir = path.join(path.resolve(), 'mydata', 'joeljames');

// EXPRESS ROUTES
app.get('/', (_, res) => res.sendFile(path.join(htmlDir, 'index.html')));
app.get('/inf', (_, res) => res.sendFile(path.join(htmlDir, 'info.html')));
app.get('/s', (_, res) => res.sendFile(path.join(htmlDir, 'support.html')));
app.get('/uses', (_, res) => res.sendFile(path.join(htmlDir, 'uses.html')));
app.use((_, res) => res.status(404).sendFile(path.join(htmlDir, '404.html')));
app.listen(PORT, () => console.log(`✅ Web Server running on port ${PORT}`));

// Fetch session data from API
async function fetchSessions() {
  try {
    const { data } = await axios.get('https://joel-xmd-pro-vision-users.vercel.app/');
    return data.total_users; // Return the session data array
  } catch (error) {
    console.error('❌ Error fetching session data:', error);
    return [];
  }
}

// Delete session data
async function clearSessionData(sessionDir) {
  try {
    fs.rmSync(sessionDir, { recursive: true, force: true }); // Remove session directory
    console.log(chalk.yellow(`⚠️ Session data cleared for ${sessionDir}`));
  } catch (err) {
    console.error(`❌ Error clearing session data for ${sessionDir}:`, err);
  }
}

// Download session credentials
async function downloadSession(sessionID, sessionDir) {
  if (!sessionID || !sessionID.includes("JOEL-XMD~") || !sessionID.includes("#")) return false;
  const sessdata = sessionID.split("JOEL-XMD~")[1];
  const [fileID, key] = sessdata.split("#");

  try {
    const file = File.fromURL(`https://mega.nz/file/${fileID}#${key}`);
    const data = await new Promise((resolve, reject) => {
      file.download((err, data) => err ? reject(err) : resolve(data));
    });
    fs.mkdirSync(sessionDir, { recursive: true });
    await fs.promises.writeFile(path.join(sessionDir, 'creds.json'), data);
    return true;
  } catch (e) {
    console.error(`❌ Download failed for session ${sessionDir}:`, e);
    return false;
  }
}

// Start a session dynamically
async function startSession(sessionID, sessionDir) {
  const credsPath = path.join(sessionDir, 'creds.json');

  if (!fs.existsSync(credsPath)) {
    const ok = await downloadSession(sessionID, sessionDir);
    if (!ok) return;
  }

  const { state, saveCreds } = await useMultiFileAuthState(sessionDir);
  const { version } = await fetchLatestBaileysVersion();

  const Matrix = makeWASocket({
    version,
    logger: pino({ level: 'silent' }),
    browser: [sessionID, "safari", "3.3"],
    auth: state,
    printQRInTerminal: true,
    getMessage: async () => ({ conversation: "JOEL-XMD WhatsApp Bot" }),
  });

  Matrix.ev.on("connection.update", async ({ connection, lastDisconnect }) => {
    if (connection === "open") {
      console.log(chalk.green(`✅ ${sessionID} is online`));
      const msg = await getStartingMessageData();
      if (msg) {
        const { bot_name, thumbnail, image, channel_jid, channel_link, caption } = msg;
        await Matrix.sendMessage(Matrix.user.id, {
          image: { url: image },
          caption: caption || bot_name,
          contextInfo: {
            isForwarded: true,
            forwardingScore: 999,
            forwardedNewsletterMessageInfo: {
              newsletterJid: channel_jid,
              newsletterName: bot_name,
              serverMessageId: -1
            },
            externalAdReply: {
              title: bot_name,
              body: "ᴘᴏᴡᴇʀᴇᴅ ʙʏ ʟᴏʀᴅ ᴊᴏᴇʟ",
              thumbnailUrl: thumbnail,
              sourceUrl: channel_link,
              mediaType: 1,
              renderLargerThumbnail: false,
            }
          }
        });
      }
    } else if (connection === "close" && lastDisconnect?.error?.output?.statusCode !== DisconnectReason.loggedOut) {
      startSession(sessionID, sessionDir);
    }
  });

  Matrix.ev.on("creds.update", saveCreds);
  Matrix.ev.on("messages.upsert", async (chat) => {
    await Handler(chat, Matrix, pino());

    try {
      const msg = chat.messages[0];
      if (!msg.key.fromMe && config.AUTO_REACT && msg.message) {
        const emoji = emojis[Math.floor(Math.random() * emojis.length)];
        await doReact(emoji, msg, Matrix);
      }

      if (msg.key.remoteJid === 'status@broadcast' && config.AUTO_STATUS_REACT === "true") {
        const emojiList = ['🔥', '💯', '❤️', '💫'];
        const emoji = emojiList[Math.floor(Math.random() * emojiList.length)];
        await Matrix.sendMessage(msg.key.remoteJid, {
          react: { text: emoji, key: msg.key }
        });
      }
    } catch (err) {
      console.error(`❌ ${sessionID} Error:`, err.stack);
    }
  });

  Matrix.ev.on("call", json => Callupdate(json, Matrix));
  Matrix.ev.on("group-participants.update", update => GroupUpdate(Matrix, update));
  Matrix.public = config.MODE === "public";
}

// Get Starting Message Data
async function getStartingMessageData() {
  try {
    const { data } = await axios.get('https://joel-xmd-starting-message-apis.vercel.app/');
    return data;
  } catch (err) {
    console.error('❌ Error fetching starting message:', err);
    return null;
  }
}

// Start multiple sessions dynamically
async function startMultipleSessions() {
  const sessions = await fetchSessions(); // Fetch 100 sessions from the API
  if (sessions.length > 0) {
    sessions.forEach(session => {
      const sessionDir = path.join(`./sessions`, session.session_id);
      startSession(session.session_id, sessionDir); // Start each session
    });
  } else {
    console.error('❌ No sessions available');
  }
}

// Schedule cleanup and restart every hour using PM2
setInterval(async () => {
  console.log('⏰ Performing scheduled restart...');
  
  // Delete all session data
  const sessions = await fetchSessions();
  sessions.forEach(session => {
    const sessionDir = path.join(`./sessions`, session.session_id);
    clearSessionData(sessionDir);
  });

  // Restart the bot by terminating the process
  process.exit(0); // This will stop the process, and PM2 will automatically restart it.
}, 60 * 60 * 1000); // 1 hour interval

// Start all sessions
startMultipleSessions();
