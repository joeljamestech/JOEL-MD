const fs = require('fs-extra');
const { Sequelize } = require('sequelize');
if (fs.existsSync('set.env'))
    require('dotenv').config({ path: __dirname + '/set.env' });
const path = require("path");
const databasePath = path.join(__dirname, './database.db');
const DATABASE_URL = process.env.DATABASE_URL === undefined
    ? databasePath
    : process.env.DATABASE_URL;
module.exports = { session: process.env.SESSION_ID || 'eyJub2lzZUtleSI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoia0VSRlppS0pzam1icE1ZUEZKbmtUZmF6U3pOS0hkQjE1TDZYK1FTVGhGND0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiZlp6V212VmxGZkhPT3AraEtTYUJqZUJRUG84Uno5amZvVUFDUmNnZThpZz0ifX0sInBhaXJpbmdFcGhlbWVyYWxLZXlQYWlyIjp7InByaXZhdGUiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJrTnZsQjQrZHl0bGhOOVI0RHpnMk9MZXoxRHlLSEdhZ1hkYW80aFozUW1RPSJ9LCJwdWJsaWMiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiIzMG1FcllrZDdaeWl3TlF0SG41M0ZUdGxhOXZTbUgyNUwxQzQ4RWRiWXdzPSJ9fSwic2lnbmVkSWRlbnRpdHlLZXkiOnsicHJpdmF0ZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IlVGU3ZCendSK2t4MzEzRjJaMUs4UzhRa1NZMklhb0pRWnEyS1htUldWWFE9In0sInB1YmxpYyI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6InZPMzExTDZqRGdoNkk3UnU2S25ZYnFtWEdLejlRbTdxajJlUDFCQmxBam89In19LCJzaWduZWRQcmVLZXkiOnsia2V5UGFpciI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiNk9sRUx0OUFYcDlhODJwWE5NRTJWTnZISXBHZlpScnZvVGRORyt3VFowMD0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoicHpiTVg4d1BVcWswZGxPbnhHVUhTWUZmRWNaTTFLNEFJMENPQjQ4bHBDYz0ifX0sInNpZ25hdHVyZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IlF5Y2lXNmJuTEd6aVViT1FnRlhVT1RFWS9aaG9sSVB5SExoZDB1U2g3bkNiclJHS0l2ZmVUaVZQa1JhQ0x6eWtQbmV1eHYxZjg5bDdRN3k5MmVBSWdBPT0ifSwia2V5SWQiOjF9LCJyZWdpc3RyYXRpb25JZCI6MTIwLCJhZHZTZWNyZXRLZXkiOiJ1Q0xzdGRxUHRxTFVXUzhiMVB1MmRkRjZVaHJRYVQ2c3V4bzZ5N0JZM1dnPSIsInByb2Nlc3NlZEhpc3RvcnlNZXNzYWdlcyI6W10sIm5leHRQcmVLZXlJZCI6MzEsImZpcnN0VW51cGxvYWRlZFByZUtleUlkIjozMSwiYWNjb3VudFN5bmNDb3VudGVyIjowLCJhY2NvdW50U2V0dGluZ3MiOnsidW5hcmNoaXZlQ2hhdHMiOmZhbHNlfSwiZGV2aWNlSWQiOiI5RGZJaUtpd1NEU1hCcnp3MWFIUGR3IiwicGhvbmVJZCI6IjE3ODMyMGVlLWNiZWMtNDY0Ny05ZTk1LWVhMGJlOWJmZDg5MyIsImlkZW50aXR5SWQiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJGTEw3U2tqTXRpczVHRlpzcGlyUmw2bjNYOFk9In0sInJlZ2lzdGVyZWQiOnRydWUsImJhY2t1cFRva2VuIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiS1ZTV0xiME9pcnN6amcvTzFIdHNsMVY4K2t3PSJ9LCJyZWdpc3RyYXRpb24iOnt9LCJwYWlyaW5nQ29kZSI6IkpNTEdIM0ZMIiwibWUiOnsiaWQiOiIyNTU3ODExNDQ1Mzk6NDJAcy53aGF0c2FwcC5uZXQifSwiYWNjb3VudCI6eyJkZXRhaWxzIjoiQ1BPdnAvNEdFTlNhOHJVR0dBSWdBQ2dBIiwiYWNjb3VudFNpZ25hdHVyZUtleSI6InVWdjkwVUdGYWZZREZ0dEdhY2tQeitueDFGQkhGYmx1K2ZRVjh1bGpjWDQ9IiwiYWNjb3VudFNpZ25hdHVyZSI6ImxKMEc4cUJ5N1N4UGNKbXlrZTd0bzAwRUViMFo1WElzbWZyb1paSlUzbTF5cU4yVnZ4MUZZMUFWaFBvMENzUk5aQ05tWFVqN3NBQjlod0t3YkxjQUJRPT0iLCJkZXZpY2VTaWduYXR1cmUiOiJSaHUwandncWZiZndhSmd2ZEhpNTFWZmtCU0JWb1UyOFdyejRWWjJPTUwvd2xZTzVoeU5FNEN5L1JKSU5hdU1lR043RThWQmp2MW8xMm9OY1REYWJpUT09In0sInNpZ25hbElkZW50aXRpZXMiOlt7ImlkZW50aWZpZXIiOnsibmFtZSI6IjI1NTc4MTE0NDUzOTo0MkBzLndoYXRzYXBwLm5ldCIsImRldmljZUlkIjowfSwiaWRlbnRpZmllcktleSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IkJibGIvZEZCaFduMkF4YmJSbW5KRDgvcDhkUlFSeFc1YnZuMEZmTHBZM0YrIn19XSwicGxhdGZvcm0iOiJhbmRyb2lkIiwibGFzdEFjY291bnRTeW5jVGltZXN0YW1wIjoxNzIzNjMyOTkyfQ==',
    PREFIXE: process.env.PREFIX || "~",
    OWNER_NAME: process.env.OWNER_NAME || "joel_it",
    NUMERO_OWNER : process.env.NUMERO_OWNER || "255714595078",              
    AUTO_READ_STATUS: process.env.AUTO_READ_STATUS || "yes",
    AUTO_DOWNLOAD_STATUS: process.env.AUTO_DOWNLOAD_STATUS || 'no',
    BOT : process.env.BOT_NAME || 'joel bot',
    URL : process.env.BOT_MENU_LINKS || '',
    MODE: process.env.PUBLIC_MODE || "no",
    PM_PERMIT: process.env.PM_PERMIT || 'no',
    HEROKU_APP_NAME : process.env.HEROKU_APP_NAME,
    HEROKU_APY_KEY : process.env.HEROKU_APY_KEY ,
    WARN_COUNT : process.env.WARN_COUNT || '3' ,
    ETAT : process.env.PRESENCE || '',
    //GPT : process.env.OPENAI_API_KEY || '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',
    DP : process.env.STARTING_BOT_MESSAGE || "yes",
    ADM : process.env.ANTI_DELETE_MESSAGE || 'yes',
    DATABASE_URL,
    DATABASE: DATABASE_URL === databasePath
        ? "postgres://db_7xp9_user:6hwmTN7rGPNsjlBEHyX49CXwrG7cDeYi@dpg-cj7ldu5jeehc73b2p7g0-a.oregon-postgres.render.com/db_7xp9" : "postgres://db_7xp9_user:6hwmTN7rGPNsjlBEHyX49CXwrG7cDeYi@dpg-cj7ldu5jeehc73b2p7g0-a.oregon-postgres.render.com/db_7xp9",
   DB: process.env.DB || 'postgres://neoverse:pomrleUMXwlmlpIcW2oFJmMX0CXzaFkf@dpg-combonun7f5s73d7uoog-a.oregon-postgres.render.com/neoverse_wz98',
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
