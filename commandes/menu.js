const util = require('util');

const fs = require('fs-extra');

const { zokou } = require(__dirname + "/../framework/zokou");

const { format } = require(__dirname + "/../framework/mesfonctions");

const os = require("os");

const moment = require("moment-timezone");

const s = require(__dirname + "/../set");



zokou({ nomCom: "m", categorie: "Menu" }, async (dest, zk, commandeOptions) => {

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

> ━━⎔𝙹𝙾𝙴𝙻 𝙼𝙳 𝚅 𝟹━━
> ⎔ hellow : ${ms.pushName}
> ⎔Mode: ${mode}
> ⎔User : ${s.OWNER_NAME}
> ⎔Library : Baileys
 > ⎔Prefix : ${s.PREFIXE}
 > ⎔Date : ${date}
> ⎔Time : ${temps}
> ⎔Tools : ${cm.length}
> ⎔Ram : ${format(os.totalmem() - os.freemem())}/${format(os.totalmem())}
> ⎔Host : heroku 
> ⎔theme: joel_it
> ━━━𝙱𝚈 𝙹𝙾𝙴𝙻 𝚃𝙴𝙲𝙷━━ \n\n`;


let menuMsg = `
  > ⎔𝚓𝚘𝚎𝚕𝚖𝚍  𝚌𝚖𝚍𝚜
`;



    for (const cat in coms) {

        menuMsg += `━━━━⚼ ${cat}`;

        for (const cmd of coms[cat]) {

            menuMsg += `
> ⎔ ${cmd}`;

        }

        menuMsg += `
━━━━━━━━━━━━━━┛\n`

    }

    menuMsg += `
︎
️    🄹🄾🄴🄻 🄼🄳 🄱🄾🅃
  🄱🅈 🄹🄾🄴🄻 🄹🄰🄼🄴🅂
🅇🅇🅇🅇🅇🅇🅇🅇🅇🅇🅇🅇🅇🅇🅇

> ━━━━━━━━━━━━━━┓
> ⎔𝚔𝚎𝚎𝚙 𝚞𝚜𝚒𝚗𝚐 𝚓𝚘𝚎𝚕 𝚖𝚍.
> ━━━━━━━━━━━━━━┛\n


`;



   var lien = mybotpic();



   if (lien.match(/\.(mp4|gif)$/i)) {

    try {

        zk.sendMessage(dest, { video: { url: lien }, caption:infoMsg + menuMsg, footer: "Je suis *𝑩𝑼𝑮𝑨𝑻𝑻𝑰*, déveloper 𝑴𝒂𝒓𝒊𝒔𝒆𝒍" , gifPlayback : true }, { quoted: ms });

    }

    catch (e) {

        console.log("🥵🥵 Menu error " + e);

        repondre("🥵🥵 Menu error " + e);

    }

} 

// Vérification pour .jpeg ou .png

else if (lien.match(/\.(jpeg|png|jpg)$/i)) {

    try {

        zk.sendMessage(dest, { image: { url: lien }, caption:infoMsg + menuMsg, footer: "Je suis *𝑩𝑼𝑮𝑨𝑻𝑻𝑰*, déveloper cod3uchiha" }, { quoted: ms });

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
          
