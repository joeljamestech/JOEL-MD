const util = require('util');

const fs = require('fs-extra');

const { zokou } = require(__dirname + "/../framework/zokou");

const { format } = require(__dirname + "/../framework/mesfonctions");

const os = require("os");

const moment = require("moment-timezone");

const s = require(__dirname + "/../set");



zokou({ nomCom: "menu", categorie: "Menu" }, async (dest, zk, commandeOptions) => {

    let { ms, repondre ,prefixe,nomAuteurMessage,mybotpic} = commandeOptions;

    let { cm } = require(__dirname + "/../framework//zokou");

    var coms = {};

    var mode = "public";

    

    if ((s.MODE).toLocaleLowerCase() != "yes") {

        mode = "private";

    }





    



    cm.map(async (com, index) => {

        if (!coms[com.categorie])

            coms[com.categorie] = [];

        coms[com.categorie].push(com.nomCom);

    });



    moment.tz.setDefault(s.TZ);



// Créer une date et une heure en GMT

const temps = moment().format('HH:mm:ss');

const date = moment().format('DD/MM/YYYY');



  let infoMsg =  `

┏🕷️   𝙅𝙊𝙀𝙇 𝙈𝘿 𝙇𝘼𝙏𝙀𝙎𝙏 𝙑𝙄𝙎𝙄𝙊𝙉
┃ 🕷️𝙢𝙤𝙙𝙚  : ${mode}
┃ 🕷️𝙤𝙬𝙣𝙚𝙧 : ${s.OWNER_NAME}
┃ 🕷️𝙡𝙞𝙗𝙧𝙖𝙧𝙮 : bailways
️┃ 🕷️𝙥𝙧𝙚𝙛𝙞𝙭  : ${s.PREFIXE}
️┃ 🕷️𝙙𝙖𝙩𝙚   : ${date}
┃ 🕷️𝙩𝙞𝙢𝙚   : ${temps}
┃ 🕷️𝙥𝙡𝙪𝙜𝙞𝙣 : 900
┃ 🕷️𝙧𝙖𝙢   : 26.11GB/120.9 GB
┃ 🕷️𝙩𝙝𝙚𝙢𝙚 : joel tech
┗🕷️\n\n`;


    

let menuMsg = `
┏━━━━━━━━━━━━━━┓
┣𝙟𝙤𝙚𝙡 𝙢𝙙 𝙘𝙤𝙢𝙢𝙖𝙣𝙙𝙨
┗━━━━━━━━━━━━━━┛\n


`;



    for (const cat in coms) {

        menuMsg += `┏❏ *${cat}*`;

        for (const cmd of coms[cat]) {

            menuMsg += `
┃ ⎔ ${cmd}`;

        }

        menuMsg += `
┗❏\n`

    }



    menuMsg += `


︎┏━━━━━━━━━━━━━━━━━━━━━┓
️┣❏𝙟𝙤𝙚𝙡 𝙢𝙙 𝙡𝙖𝙩𝙚𝙨𝙩 𝙫𝙞𝙨𝙞𝙤𝙣
┣❏𝙥𝙤𝙬𝙚𝙧𝙚𝙙 𝙗𝙮 𝙟𝙤𝙚𝙡 𝙠𝙖𝙣𝙜'𝙤𝙢𝙖
┗━━━━━━━━━━━━━━━━━━━━━┛
┏━━━━━━━━━━━━━━━━━━━━━┓
┃𝙩𝙝𝙖𝙣𝙠𝙨 𝙛𝙤𝙧 𝙘𝙝𝙤𝙤𝙨𝙞𝙣𝙜 𝙟𝙤𝙚𝙡 𝙢𝙙
┗━━━━━━━━━━━━━━━━━━━━━┛\n


`;



   var lien = mybotpic();



   if (lien.match(/\.(mp4|gif)$/i)) {

    try {

        zk.sendMessage(dest, { video: { url: lien }, caption:infoMsg + menuMsg, footer: "Je suis *TKM-BOT*, déveloper Cod3uchiha" , gifPlayback : true }, { quoted: ms });

    }

    catch (e) {

        console.log("🥵🥵 Menu error " + e);

        repondre("🥵🥵 Menu error " + e);

    }

} 

// Vérification pour .jpeg ou .png

else if (lien.match(/\.(jpeg|png|jpg)$/i)) {

    try {

        zk.sendMessage(dest, { image: { url: lien }, caption:infoMsg + menuMsg, footer: "Je suis *TKM-bot*, déveloper cod3uchiha" }, { quoted: ms });

    }

    catch (e) {

        console.log("🥵🥵 Menu error " + e);

        repondre("🥵🥵 Menu error " + e);

    }

} 

else {

    

    repondre(infoMsg + menuMsg);

    

}



});
