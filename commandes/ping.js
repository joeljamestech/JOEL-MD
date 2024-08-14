"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const { zokou } = require("../framework/zokou");
zokou({ nomCom: "ping", reaction: "😌", nomFichier: __filename }, async (dest, zk, commandeOptions) => {
    console.log("Commande saisie !!!s");
    let z = '𝐣𝐨𝐞𝐥 𝐦𝐝  \n\n ' + "𝐫𝐞𝐬𝐩𝐨𝐧𝐬𝐞 𝐬𝐩𝐞𝐞𝐝 𝐢𝐬";
    let d = ' 𝐚𝐛𝐨𝐮𝐭 𝟏𝟎𝟖𝟎.𝟗𝟏 𝐦/𝐬';
    let varmess = z + d;
    var img = 'https://telegra.ph/file/e8311b969d1cb5ce67da8.jpg';
    await zk.sendMessage(dest, { image: { url: img }, caption: varmess });
    //console.log("montest")
});
console.log("mon test");
/*module.exports.commande = () => {
  var nomCom = ["test","t"]
  var reaction="☺️"
  return { nomCom, execute,reaction }
};

async function  execute  (origineMessage,zok) {
  console.log("Commande saisie !!!s")
   let z ='Salut je m\'appelle *Zokou* \n\n '+'je suis un bot Whatsapp Multi-appareil '
      let d =' developpé par *Djalega++*'
      let varmess=z+d
      var img='https://telegra.ph/file/626e7105422c8908f723d.jpg'
await  zok.sendMessage(origineMessage,  { image:{url:img},caption:varmess});
}  */ 
