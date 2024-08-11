
const fs = require('fs-extra');

const { zokou } = require(__dirname + "/../framework/zokou");

const { format } = require(__dirname + "/../framework/mesfonctions");

const os = require("os");

const moment = require("moment-timezone");

const s = require(__dirname + "/../set");



zokou({ nomCom: "new", categorie: "Menu" }, async (dest, zk, commandeOptions) => {

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

┏❏ 𝙹𝙾𝙴𝙻 𝙼𝙳 𝚆𝙰 𝙱𝙾𝚃 ❐
┃ ⿻Mode: ${mode}
┃ ⿻User : ${s.OWNER_NAME}
┃ ⿻Library : Baileys
️┃ ⿻Prefix : ${s.PREFIXE}
️┃ ⿻Date : ${date}
┃ ⿻Time : ${temps}
┃ ⿻Tools : ${cm.length}
┃ ⿻Ram : ${format(os.totalmem() - os.freemem())}/${format(os.totalmem())}
┃ ⿻theme : 𝚓𝚘𝚎𝚕_𝚒𝚝🕷️
┗❏\n\n`;
