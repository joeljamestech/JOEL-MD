const util = require('util');
const fs = require('fs-extra');
const { zokou } = require(__dirname + "/../framework/zokou");
const { format } = require(__dirname + "/../framework/mesfonctions");
const os = require("os");
const moment = require("moment-timezone");
const s = require(__dirname + "/../set");
const more = String.fromCharCode(8206)
const readmore = more.repeat(4001)

zokou({ nomCom: "help", categorie: "General" }, async (dest, zk, commandeOptions) => {
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

    moment.tz.setDefault('Etc/GMT'
// Créer une date et une heure en GMT
const temps = moment().format('HH:mm:ss');
const date = moment().format('DD/MM/YYYY');

  let infoMsg =  `
╭━━━━┈⎔𝙹𝙾𝙴𝙻 𝙼𝙳 𝚆𝙰 𝙱𝙾𝚃
┃⎔𝚘𝚠𝚗𝚎𝚛 : ${s.OWNER_NAME}
┃⎔𝚙𝚛𝚎𝚏𝚒𝚡 : [ ${s.PREFIXE} ] 
┃⎔𝚖𝚘𝚍𝚎 : *${mode}*
┃⎔𝚝𝚘𝚘𝚕𝚜  : 𝟸𝟶𝟶+𝚏𝚎𝚊𝚝𝚞𝚛𝚎𝚜
┃⎔𝚍𝚊𝚝𝚎  : *${date}* 
┃⎔𝚛𝚊𝚖 : 𝟸𝟷/𝟼𝟷 𝙶𝙱
┃⎔𝚙𝚕𝚊𝚝𝚒𝚏𝚘𝚛𝚖 : 𝚌𝚑𝚛𝚘𝚖𝚎 𝚕𝚒𝚗𝚞𝚡
┃⎔𝚝𝚑𝚎𝚖𝚎 : 𝚓𝚘𝚎𝚕_𝚒𝚝
┃
╰──────────────┈⊷\n${readmore}`;

    let menuMsg = `𝚓𝚘𝚎𝚕 𝚖𝚍 𝚌𝚖𝚍𝚜
`;
    for (const cat in coms) {
        menuMsg += `
╭──⎔ *${cat}* `;
        for (const cmd of coms[cat]) {
            menuMsg += `          
┃⎔  ${cmd}`    
        } 
        menuMsg +=`
┌┤
│╰────────┈⎔`
    }
  
    menuMsg += `
> 𝚓𝚘𝚎𝚕 𝚖𝚍 𝚟𝟹 𝚋𝚢 𝚓𝚘𝚎𝚕_𝚒𝚝\n
`;

   var lien = mybotpic();

   if (lien.match(/\.(mp4|gif)$/i)) {
    try {
        zk.sendMessage(dest, { video: { url: lien }, caption:infoMsg + menuMsg, footer: "Je suis *Beltahmd*, déveloper Beltah Tech" , gifPlayback : true }, { quoted: ms });
    }
    catch (e) {
        console.log("🥵🥵 Menu erreur " + e);
        repondre("🥵🥵 Menu erreur " + e);
    }
} 
// Vérification pour .jpeg ou .png
else if (lien.match(/\.(jpeg|png|jpg)$/i)) {
    try {
        zk.sendMessage(dest, { image: { url: lien }, caption:infoMsg + menuMsg, footer: "Je suis *Beltahmd*, déveloper Beltah Tech" }, { quoted: ms });
    }
    catch (e) {
        console.log("🥵🥵 Menu erreur " + e);
        repondre("🥵🥵 Menu erreur " + e);
    }
} 
else {
    
    repondre(infoMsg + menuMsg);
    
}

});
