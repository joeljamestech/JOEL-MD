const fs = require('fs-extra');
const { Sequelize } = require('sequelize');
if (fs.existsSync('set.env'))
    require('dotenv').config({ path: __dirname + '/set.env' });
const path = require("path");
const databasePath = path.join(__dirname, './database.db');
const DATABASE_URL = process.env.DATABASE_URL === undefined
    ? databasePath
    : process.env.DATABASE_URL;
module.exports = { session: process.env.SESSION_ID || 'eyJub2lzZUtleSI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoicUN6aFlPL2RWTlJVWWpPSkRJai8vcmo5WVFQVDNsWFkrNWVzOC9vR3dFcz0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiV2lzNk5zR2ZaS21ldmRKdnNmaHc3ZnduUEVucTFTN2M3aUkrYkJmREdqVT0ifX0sInBhaXJpbmdFcGhlbWVyYWxLZXlQYWlyIjp7InByaXZhdGUiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJrS1ZXK1Z4SWJZbytYeHd2MWJDajB1aXp6dmcwR2JCaERZRVdkeEZFNW5zPSJ9LCJwdWJsaWMiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJBN0VBMFYyMm5EZmJGZWk1bmR6T3VtelJCVlR4bU5zSFJtOTNnTHVJbUVZPSJ9fSwic2lnbmVkSWRlbnRpdHlLZXkiOnsicHJpdmF0ZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6Im9DSm1DZFBVNHdTTVFqeUZxWDlYVTdwa2lkM01sTnFWb1RXejM5TmgrMnc9In0sInB1YmxpYyI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IktwblA5QkpTUGh6WU4rS2w5RndsN0w0SkN5Lytad0FQMCtCOENob0Noa0U9In19LCJzaWduZWRQcmVLZXkiOnsia2V5UGFpciI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiQUhBdlRVbzdNWkQyRTNOMEhBRGlNcEhrSXhMaFBYbElQbW9RaEN5dDdXMD0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiYVk3cTZaV3BmTGFCQU1MMWJteFkyYWN3cnBJUW9rUHlIUGxjOGpVa01Tcz0ifX0sInNpZ25hdHVyZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IllRY3ZJblYyb09icUgzcFh2Lzl1MlJIQlRKcjk2S1Y3SW5WeVNnVGo5eGtiTHdTMGtMdGVRODZaeDVKcHlOSlkrMURnNnVXZk8yYWYvY3BKRGZCL2l3PT0ifSwia2V5SWQiOjF9LCJyZWdpc3RyYXRpb25JZCI6MTkzLCJhZHZTZWNyZXRLZXkiOiJ4SjlYemEvTVRGbUhHcmV6L1ZRMzRZUU9STWs2RXFQbXkyY2R2NHpqSnhzPSIsInByb2Nlc3NlZEhpc3RvcnlNZXNzYWdlcyI6W10sIm5leHRQcmVLZXlJZCI6MzEsImZpcnN0VW51cGxvYWRlZFByZUtleUlkIjozMSwiYWNjb3VudFN5bmNDb3VudGVyIjowLCJhY2NvdW50U2V0dGluZ3MiOnsidW5hcmNoaXZlQ2hhdHMiOmZhbHNlfSwiZGV2aWNlSWQiOiJTekt0WFNXRFRQR2x4U3BFWDhEeEJnIiwicGhvbmVJZCI6ImFjNWIzOTE4LWJmOTktNGYzOS1iMTc2LTZmNzk2ZjljOGMwYSIsImlkZW50aXR5SWQiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJYYXRuRmNSUkJvcXY1VjJmb3J0d3BRb0kzVjg9In0sInJlZ2lzdGVyZWQiOnRydWUsImJhY2t1cFRva2VuIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiclBkU3htQ1dQck95Q1VvRkZsaUFQUFlpRFd3PSJ9LCJyZWdpc3RyYXRpb24iOnt9LCJwYWlyaW5nQ29kZSI6IlJIQkhEUzRaIiwibWUiOnsiaWQiOiIyNTQxMTQzNTQ0MTY6NEBzLndoYXRzYXBwLm5ldCIsIm5hbWUiOiJMYS4uLi4uLiJ9LCJhY2NvdW50Ijp7ImRldGFpbHMiOiJDS0hBbk5BQkVQSGk5N1lHR0FNZ0FDZ0EiLCJhY2NvdW50U2lnbmF0dXJlS2V5IjoibjJ1VGlocWxxOGpMRjFaZlprMEYvaGxjeW5RMGZQMUZFb0pXLzhqbVZuRT0iLCJhY2NvdW50U2lnbmF0dXJlIjoiZWdEN2xoTDYvSkIvWXhGcVpqcW5kTnIrUHhDcTBEeG5HQ29rU3J3WTJWUTlFMHVtY1BxWGc2QTEwSU1WeDV1Z05PRFZleVBmMkdYVStqTGZhbnRGQlE9PSIsImRldmljZVNpZ25hdHVyZSI6InlxRHMrMDlGRTRYRzk0MUtkczJGVXdYNEkzWHZEaFh4SnBnQmg3VE4zWGx5eFhEL3N0MkgyLzBxN2dkOHdYN1NpeVlOZmVWa29yNGE2LzBuT0xISWhBPT0ifSwic2lnbmFsSWRlbnRpdGllcyI6W3siaWRlbnRpZmllciI6eyJuYW1lIjoiMjU0MTE0MzU0NDE2OjRAcy53aGF0c2FwcC5uZXQiLCJkZXZpY2VJZCI6MH0sImlkZW50aWZpZXJLZXkiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJCWjlyazRvYXBhdkl5eGRXWDJaTkJmNFpYTXAwTkh6OVJSS0NWdi9JNWxaeCJ9fV0sInBsYXRmb3JtIjoic21iYSIsImxhc3RBY2NvdW50U3luY1RpbWVzdGFtcCI6MTcyNTgyMTMxMCwibXlBcHBTdGF0ZUtleUlkIjoiQUFBQUFFamcifQ==',
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
