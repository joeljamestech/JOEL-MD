const fs = require('fs-extra');
const { Sequelize } = require('sequelize');
if (fs.existsSync('set.env'))
    require('dotenv').config({ path: __dirname + '/set.env' });
const path = require("path");
const databasePath = path.join(__dirname, './database.db');
const DATABASE_URL = process.env.DATABASE_URL === undefined
    ? databasePath
    : process.env.DATABASE_URL;
module.exports = { session: process.env.SESSION_ID || 'eyJub2lzZUtleSI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoieU9QYlp1Y1JNeWxKR25vOFBqT0xXQ21YQ2oyTlMzNHNqWTVxN29pL09Xbz0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiUWROYXhTbUxuczB2TnRDUkRSa25vUldtTHhrUWNxb2JJaS9SYWxEYjFoaz0ifX0sInBhaXJpbmdFcGhlbWVyYWxLZXlQYWlyIjp7InByaXZhdGUiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJhQzd3dXF2Qmw1T3BPOHgrZUszb1VZRWRUcUpGV3l1STBTLzF5eDZoalZRPSJ9LCJwdWJsaWMiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiI4WUxIV0RseGJUVzduTTNJTXNBRWdYZ1daQXdJb0Ezc0UxZ2ExRlBHOEJ3PSJ9fSwic2lnbmVkSWRlbnRpdHlLZXkiOnsicHJpdmF0ZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IlVENzRsVFh4SERxak9XclhEVDhIRW8rM2hKeXJQdHJ2cHZmOTduUTVtMG89In0sInB1YmxpYyI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6Ik9BRXVFV0lZRmp0VlNkd2lPZHJNY2dOZytOaWRRc2NadmhBMVNFSzgrR0k9In19LCJzaWduZWRQcmVLZXkiOnsia2V5UGFpciI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiS0dtb1Nqbi91V2J6M3pxMFJuc1dtV291b1FOcHBWNEhFWVE5M0ZhQWtXZz0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiNHNOeDZndnRmVnF3cS9RV3FoZlR4bzJSVnNxc0VSZkhiWHJUU3hzM3IzOD0ifX0sInNpZ25hdHVyZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IituTmxaelZ4eUFXU3Y5OTE1T3kycVhqVGdrSk5QSEhwRjl0ak42VVF4UmlMOFRJMDNwbXRFTHRzNWZhTy9rdERhVkRuMW9SQ2VscFd2Z1VnK0dxTUNBPT0ifSwia2V5SWQiOjF9LCJyZWdpc3RyYXRpb25JZCI6MTI5LCJhZHZTZWNyZXRLZXkiOiJHaVV1dmxKV2xHdVY2clJNcEF4ajFpKzBURk1ROGI5UitQUjNsUXA5RzNrPSIsInByb2Nlc3NlZEhpc3RvcnlNZXNzYWdlcyI6W10sIm5leHRQcmVLZXlJZCI6MzEsImZpcnN0VW51cGxvYWRlZFByZUtleUlkIjozMSwiYWNjb3VudFN5bmNDb3VudGVyIjowLCJhY2NvdW50U2V0dGluZ3MiOnsidW5hcmNoaXZlQ2hhdHMiOmZhbHNlfSwiZGV2aWNlSWQiOiIwYU92dldTd1RFcWdjT3FoNDBpS2ZBIiwicGhvbmVJZCI6IjliOGFiMjI1LWFlMzEtNGNmZS1iMzg1LTY2ZDIwNzBiMzBmNCIsImlkZW50aXR5SWQiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJjay9SNFIvNVhxTUdRV3RIUHZzQU9LcUVrcjg9In0sInJlZ2lzdGVyZWQiOnRydWUsImJhY2t1cFRva2VuIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiVEtTOFJ3U3Irc2hrTzBhaGpKRUZnTXE4bXBnPSJ9LCJyZWdpc3RyYXRpb24iOnt9LCJwYWlyaW5nQ29kZSI6IjJHSjM2OUZLIiwibWUiOnsiaWQiOiIyNTU3MTg2NTU1MTg6MTNAcy53aGF0c2FwcC5uZXQifSwiYWNjb3VudCI6eyJkZXRhaWxzIjoiQ0ovV2tORUVFUDNIMzdZR0dBY2dBQ2dBIiwiYWNjb3VudFNpZ25hdHVyZUtleSI6IjlKdnF1djYvUkJKRDBNYW0xcThySDdMb2U4SkNNdi9NUjJkRXl0QXRpaG89IiwiYWNjb3VudFNpZ25hdHVyZSI6InFOUTBOTm9FTjg1d3pzR3I2QTBFYk5FUEZiRkNaZDk2RkE5Slp3Yjd4SU00VjB6V1pHMEcvaCszczdNUVZ4ZXBzWjdheHB2SG5CYW1BNjZMUTY0bkJRPT0iLCJkZXZpY2VTaWduYXR1cmUiOiJkSUI1VVJERk85ZkpheGFKREE3RWtCL2F6Smp3RWFTeEk3elJmZDdLR2pON0ZmYWYzcmROYW5RdUVLOWQvNjVvWEdjRkV2L3RsNXNZNGs0WGNsanJBUT09In0sInNpZ25hbElkZW50aXRpZXMiOlt7ImlkZW50aWZpZXIiOnsibmFtZSI6IjI1NTcxODY1NTUxODoxM0BzLndoYXRzYXBwLm5ldCIsImRldmljZUlkIjowfSwiaWRlbnRpZmllcktleSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IkJmU2I2cnIrdjBRU1E5REdwdGF2S3greTZIdkNRakwvekVkblJNclFMWW9hIn19XSwicGxhdGZvcm0iOiJhbmRyb2lkIiwibGFzdEFjY291bnRTeW5jVGltZXN0YW1wIjoxNzI1NDI0NjUwLCJteUFwcFN0YXRlS2V5SWQiOiJBQUFBQU5SUSJ9',
    PREFIXE: process.env.PREFIX || ".",
    OWNER_NAME: process.env.OWNER_NAME || "joel Tech",
    NUMERO_OWNER : process.env.NUMERO_OWNER || "255714595078",              
    AUTO_READ_STATUS: process.env.AUTO_READ_STATUS || "non",
    AUTO_DOWNLOAD_STATUS: process.env.AUTO_DOWNLOAD_STATUS || 'non',
    BOT : process.env.BOT_NAME || 'BEST CODER MD',
    URL : process.env.BOT_MENU_LINKS || 'https://telegra.ph/file/e062adedf0ab8f57c87d8.jpg,https://telegra.ph/file/e38ac27939b2f3b858e1a.jpg',
    MODE: process.env.PUBLIC_MODE || "no",
    PM_PERMIT: process.env.PM_PERMIT || 'no',
    HEROKU_APP_NAME : process.env.HEROKU_APP_NAME,
    HEROKU_APY_KEY : process.env.HEROKU_APY_KEY ,
    WARN_COUNT : process.env.WARN_COUNT || '3' ,
    ETAT : process.env.PRESENCE || '',
    CHATBOT : process.env.PM_CHATBOT || 'no',
    DP : process.env.STARTING_BOT_MESSAGE || "yes",
    ADM : process.env.ANTI_DELETE_MESSAGE || 'yes',
    DATABASE_URL,
    DATABASE: DATABASE_URL === databasePath
        ? "postgres://db_7xp9_user:6hwmTN7rGPNsjlBEHyX49CXwrG7cDeYi@dpg-cj7ldu5jeehc73b2p7g0-a.oregon-postgres.render.com/db_7xp9" : "postgres://db_7xp9_user:6hwmTN7rGPNsjlBEHyX49CXwrG7cDeYi@dpg-cj7ldu5jeehc73b2p7g0-a.oregon-postgres.render.com/db_7xp9",
    /* new Sequelize({
     dialect: 'sqlite',
     storage: DATABASE_URL,
     logging: false,
})
: new Sequelize(DATABASE_URL, {
     dialect: 'postgres',
     ssl: true,
     protocol: 'postgres',
     dialectOptions: {
         native: true,
         ssl: { require: true, rejectUnauthorized: false },
     },
     logging: false,
}),*/
};
let fichier = require.resolve(__filename);
fs.watchFile(fichier, () => {
    fs.unwatchFile(fichier);
    console.log(`mise à jour ${__filename}`);
    delete require.cache[fichier];
    require(fichier);
});
