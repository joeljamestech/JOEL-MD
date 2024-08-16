const util = require('util');

const fs = require('fs-extra');

const { zokou } = require(__dirname + "/../framework/zokou");

const { format } = require(__dirname + "/../framework/mesfonctions");

const os = require("os");

const moment = require("moment-timezone");

const s = require(__dirname + "/../set");



zokou({ nomCom: "n", categorie: "Menu" }, async (dest, zk, commandeOptions) => {

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

╭━━━━┈⊷
┃๏╭───────────
┃๏│▸ 𝗢𝘄𝗻𝗲𝗿 : ${s.OWNER_NAME}
┃๏│▸ 𝗣𝗿𝗲𝗳𝗶𝘅 : [ ${s.PREFIXE} ] 
┃๏│▸ 𝗠𝗼𝗱𝗲 : *${mode}*
┃๏│▸ 𝗥𝗮𝗺  : 𝟲𝟴/𝟭𝟯𝟮 𝗚𝗕
┃๏│▸ 𝗗𝗮𝘁𝗲  : *${date}* 
┃๏│▸ 𝗥𝗮𝗺 : 𝟲𝟴/𝟭𝟯𝟮 𝗚𝗕
┃๏│▸ 𝗣𝗹𝗮𝘁𝗳𝗼𝗿𝗺 : 𝗖𝗵𝗿𝗼𝗺𝗲 𝗟𝗶𝗻𝘂𝘅
┃๏│▸ 𝗖𝗿𝗲𝗮𝘁𝗼𝗿 : joel_it
┃๏└───────────···▸
╰──────────────┈⊷\n${readmore}`;

    

let menuMsg = `
┏━━━━━━━━━┓
┣joel cmds
┗━━━━━━━━━┛\n


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


︎┏━━━━━━━━━━━━━━┓
️┣❏joel md 2025
┣❏happy new year 
┗┳━━━━━━━━━━━━┳┛
┏┻━━━━━━━━━━━━┻┓
┃powered by joel tech
┗━━━━━━━━━━━━━━┛\n


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
