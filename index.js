/*  
────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────  
─██████──────────██████████████──████████████████────████████████────────────────────────────██████──██████████████──██████████████──██████─────────  
─██░░██──────────██░░░░░░░░░░██──██░░░░░░░░░░░░██────██░░░░░░░░████──────────────────────────██░░██──██░░░░░░░░░░██──██░░░░░░░░░░██──██░░██─────────  
─██░░██──────────██░░██████░░██──██░░████████░░██────██░░████░░░░██──────────────────────────██░░██──██░░██████░░██──██░░██████████──██░░██─────────  
─██░░██──────────██░░██──██░░██──██░░██────██░░██────██░░██──██░░██──────────────────────────██░░██──██░░██──██░░██──██░░██──────────██░░██─────────  
─██░░██──────────██░░██──██░░██──██░░████████░░██────██░░██──██░░██──██████████████──────────██░░██──██░░██──██░░██──██░░██████████──██░░██─────────  
─██░░██──────────██░░██──██░░██──██░░░░░░░░░░░░██────██░░██──██░░██──██░░░░░░░░░░██──────────██░░██──██░░██──██░░██──██░░░░░░░░░░██──██░░██─────────  
─██░░██──────────██░░██──██░░██──██░░██████░░████────██░░██──██░░██──██████████████──██████──██░░██──██░░██──██░░██──██░░██████████──██░░██─────────  
─██░░██──────────██░░██──██░░██──██░░██──██░░██──────██░░██──██░░██──────────────────██░░██──██░░██──██░░██──██░░██──██░░██──────────██░░██─────────  
─██░░██████████──██░░██████░░██──██░░██──██░░██████──██░░████░░░░██──────────────────██░░██████░░██──██░░██████░░██──██░░██████████──██░░██████████─  
─██░░░░░░░░░░██──██░░░░░░░░░░██──██░░██──██░░░░░░██──██░░░░░░░░████──────────────────██░░░░░░░░░░██──██░░░░░░░░░░██──██░░░░░░░░░░██──██░░░░░░░░░░██─  
─██████████████──██████████████──██████──██████████──████████████────────────────────██████████████──██████████████──██████████████──██████████████─  
───────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────  
made by lord joel  
contact owner +2557114595078  
*/  
  
import dotenv from 'dotenv';  
dotenv.config();  
  
import {  
  makeWASocket,  
  Browsers,  
  fetchLatestBaileysVersion,  
  DisconnectReason,  
  useMultiFileAuthState,  
  getContentType  
} from '@whiskeysockets/baileys';  
  
import { Handler, Callupdate, GroupUpdate } from './joeljames/joelXtec/joel.js';  
import express from 'express';  
import pino from 'pino';  
import fs from 'fs';  
import { File } from 'megajs';  
import NodeCache from 'node-cache';  
import path from 'path';  
import chalk from 'chalk';  
import moment from 'moment-timezone';  
import axios from 'axios';  
import config from './config.cjs';  
import pkg from './lib/autoreact.cjs';  
import pm2 from 'pm2';  
import bodyParser from 'body-parser';  
  
const { emojis, doReact } = pkg;  
const prefix = process.env.PREFIX || config.PREFIX;  
const app = express();  
const orange = chalk.bold.hex("#FFA500");  
const lime = chalk.bold.hex("#32CD32");  
let useQR = false;  
let initialConnection = true;  
const PORT = process.env.PORT || 3000;  
  
const MAIN_LOGGER = pino({  
  timestamp: () => `,"time":"${new Date().toJSON()}"`  
});  
const logger = MAIN_LOGGER.child({});  
logger.level = "trace";  
  
const msgRetryCounterCache = new NodeCache();  
  
const __filename = decodeURIComponent(new URL(import.meta.url).pathname);  
const __dirname = path.dirname(__filename);  
  
const sessionDir = path.join(__dirname, 'session');  
const credsPath = path.join(sessionDir, 'creds.json');  
  
if (!fs.existsSync(sessionDir)) {  
  fs.mkdirSync(sessionDir, { recursive: true });  
}  
  
async function downloadSessionData() {  
  console.log("Debugging SESSION_ID:", config.SESSION_ID);  
  
  if (!config.SESSION_ID) {    
    console.error('Please add your session to SESSION_ID env !!');    
    return false;    
  }    
  
  const sessdata = config.SESSION_ID.split("JOEL-XMD~")[1];    
  
  if (!sessdata || !sessdata.includes("#")) {    
    console.error('Invalid SESSION_ID format! It must contain both file ID and decryption key.');    
    return false;    
  }    
  
  const [fileID, decryptKey] = sessdata.split("#");    
  
  try {    
    console.log("Downloading Session...");    
    const file = File.fromURL(`https://mega.nz/file/${fileID}#${decryptKey}`);    
  
    const data = await new Promise((resolve, reject) => {    
      file.download((err, data) => {    
        if (err) reject(err);    
        else resolve(data);    
      });    
    });    
  
    await fs.promises.writeFile(credsPath, data);    
    console.log("Session Successfully Loaded !!");    
    return true;    
  } catch (error) {    
    console.error('Failed to download session data:', error);    
    return false;    
  }  
}  
  
async function getStartingMessageData() {  
  try {  
    const response = await axios.get('https://joel-xmd-starting-message-apis.vercel.app/');  
    return response.data;  
  } catch (error) {  
    console.error('Error fetching starting message data:', error);  
    return null;  
  }  
}  
  
async function start() {  
  try {  
    const { state, saveCreds } = await useMultiFileAuthState(sessionDir);  
    const { version, isLatest } = await fetchLatestBaileysVersion();  
    console.log(`joel md using WA v${version.join('.')}, isLatest: ${isLatest}`);  
  
    const Matrix = makeWASocket({    
      version,    
      logger: pino({ level: 'silent' }),    
      printQRInTerminal: useQR,    
      browser: ["ʝσєℓ χ∂", "safari", "3.3"],    
      auth: state,    
      getMessage: async (key) => {    
        return { conversation: "" };    
      }    
    });    
  
    Matrix.ev.on('connection.update', async (update) => {    
      const { connection, lastDisconnect } = update;    
      if (connection === 'close') {    
        if (lastDisconnect.error?.output?.statusCode !== DisconnectReason.loggedOut) {    
          start();    
        }    
      } else if (connection === 'open') {    
        if (initialConnection) {    
          console.log(chalk.green("✔️  ᴊᴏᴇʟ-xᴍᴅ ɪs ɴᴏᴡ ᴏɴʟɪɴᴇ ᴀɴᴅ ᴘᴏᴡᴇʀᴇᴅ ᴜᴘ"));    
  
          const startingMessageData = await getStartingMessageData();    
  
          if (startingMessageData) {    
            const { title, bot_name, creator, thumbnail, image, channel_link, channel_jid, caption } = startingMessageData;    
  
            const messagePayload = {    
              image: { url: image },    
              caption: caption || title,    
              contextInfo: {    
                isForwarded: true,    
                forwardingScore: 999,    
                forwardedNewsletterMessageInfo: {    
                  newsletterJid: channel_jid,    
                  newsletterName: bot_name,    
                  serverMessageId: -1,    
                },    
                externalAdReply: {    
                  title: bot_name,    
                  body: "ᴘᴏᴡᴇʀᴇᴅ ʙʏ ʟᴏʀᴅ ᴊᴏᴇʟ",    
                  thumbnailUrl: thumbnail,    
                  sourceUrl: channel_link,    
                  mediaType: 1,    
                  renderLargerThumbnail: false,    
                },    
              },    
            };    
  
            await Matrix.sendMessage(Matrix.user.id, messagePayload);    
          }    
  
          initialConnection = false;    
        } else {    
          console.log(chalk.blue("♻️ Connection reestablished after restart."));    
        }    
      }    
    });    
  
    Matrix.ev.on('creds.update', saveCreds);    
    Matrix.ev.on("messages.upsert", async chatUpdate => {    
      await Handler(chatUpdate, Matrix, logger);    
  
      try {    
        const mek = chatUpdate.messages[0];    
        if (!mek.key.fromMe && config.AUTO_REACT && mek.message) {    
          const randomEmoji = emojis[Math.floor(Math.random() * emojis.length)];    
          await doReact(randomEmoji, mek, Matrix);    
        }    
  
        if (mek && mek.key.remoteJid === 'status@broadcast' && config.AUTO_STATUS_REACT === "true") {    
          const jawadlike = await Matrix.decodeJid(Matrix.user.id);    
          const emojiList = ['❤️', '💸', '😇', '🍂', '💥', '💯', '🔥', '💫', '💎', '💗'];    
          const randomEmoji = emojiList[Math.floor(Math.random() * emojiList.length)];    
  
          await Matrix.sendMessage(mek.key.remoteJid, {    
            react: {    
              text: randomEmoji,    
              key: mek.key,    
            }    
          }, { statusJidList: [mek.key.participant, jawadlike] });    
  
          console.log(`Auto-reacted to a status with: ${randomEmoji}`);    
        }    
      } catch (err) {    
        console.error('Error during message processing or auto-reaction:', err.stack);    
      }    
    });    
  
    Matrix.ev.on("call", async (json) => await Callupdate(json, Matrix));    
    Matrix.ev.on("group-participants.update", async (messag) => await GroupUpdate(Matrix, messag));    
  
    Matrix.public = config.MODE === "public";    
  } catch (error) {    
    console.error('Critical Error:', error);    
    process.exit(1);    
  }  
}  
  
async function init() {  
  if (fs.existsSync(credsPath)) {  
    console.log("🔒 Session file found, proceeding without QR code.");  
    await start();  
  } else {  
    const sessionDownloaded = await downloadSessionData();  
    if (sessionDownloaded) {  
      console.log("🔒 Session downloaded, starting bot.");  
      await start();  
    } else {  
      console.log("No session found or downloaded, QR code will be printed for authentication.");  
      useQR = true;  
      await start();  
    }  
  }  
}  
  
init();  
  
// EXPRESS SETUP  
const htmlDir = path.join(__dirname, 'mydata', 'joeljames');  
  
app.use(bodyParser.json());  
app.use(bodyParser.urlencoded({ extended: true }));  
  
app.get('/', (req, res) => {  
  res.sendFile(path.join(htmlDir, 'index.html'));  
});  
  
app.get('/inf', (req, res) => {  
  res.sendFile(path.join(htmlDir, 'info.html'));  
});  
  
app.get('/s', (req, res) => {  
  res.sendFile(path.join(htmlDir, 'support.html'));  
});  
  
app.get('/uses', (req, res) => {  
  res.sendFile(path.join(htmlDir, 'uses.html'));  
});  
  
// Dashboard page for PM2 bot management  
app.get('/dashboard', (req, res) => {  
  res.sendFile(path.join(htmlDir, 'dashboard.html'));  
});  
  
// API to get PM2 process list  
app.get('/api/list', (req, res) => {  
  pm2.connect(err => {  
    if (err) return res.status(500).json({ error: err.message });  
    pm2.list((err, list) => {  
      pm2.disconnect();  
      if (err) return res.status(500).json({ error: err.message });  
      res.json(list);  
    });  
  });  
});  
  
// API to restart a single bot by name  
app.post('/api/restart/:name', (req, res) => {  
  const name = req.params.name;  
  pm2.connect(err => {  
    if (err) return res.status(500).json({ error: err.message });  
    pm2.restart(name, (err) => {  
      pm2.disconnect();  
      if (err) return res.status(500).json({ error: err.message });  
      res.json({ success: true, message: `Restarted ${name}` });  
    });  
  });  
});  
  
// API to stop all bots  
app.post('/api/stopall', (req, res) => {  
  pm2.connect(err => {  
    if (err) return res.status(500).json({ error: err.message });  
    pm2.stop('all', (err) => {  
      pm2.disconnect();  
      if (err) return res.status(500).json({ error: err.message });  
      res.json({ success: true, message: 'Stopped all bots' });  
    });  
  });  
});  
  
// API to restart all bots  
app.post('/api/restartall', (req, res) => {  
  pm2.connect(err => {  
    if (err) return res.status(500).json({ error: err.message });  
    pm2.restart('all', (err) => {  
      pm2.disconnect();  
      if (err) return res.status(500).json({ error: err.message });  
      res.json({ success: true, message: 'Restarted all bots' });  
    });  
  });  
});  
  
// 404 fallback  
app.use((req, res) => {  
  res.status(404).sendFile(path.join(htmlDir, '404.html'));  
});  
  
app.listen(PORT, () => {  
  console.log(`Server is running on port ${PORT}`);  
});
