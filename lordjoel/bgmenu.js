const util = require('util');
const fs = require('fs-extra');
const { zokou } = require(__dirname + "/../framework/zokou");
const { format, styletext } = require(__dirname + "/../framework/mesfonctions");
//const {police}=require(__dirname+"/../framework/mesfonctions")
const os = require("os");
const moment = require("moment-timezone");
const s = require(__dirname + "/../set");
zokou({ nomCom: "bugmenu", categorie: "Menu" }, async (dest, zk, commandeOptions) => {
    let { ms, repondre } = commandeOptions;
    let { cm } = require(__dirname + "/../framework//zokou");
    var coms = {};
    var mode = "public";
    if (s.MODE_PUBLIC != "oui") {
        mode = "private";
    }
    var emoji = { "Général": "", "Logo": "", "hentai": "", "weeb": "", "Recherche": "", "conversion": "", "groupe": "","Téléchargement":"" };
    cm.map(async (com, index) => { if (!coms[com.categorie])
        coms[com.categorie] = []; coms[com.categorie].push(com.nomCom); });
    const temps = moment(moment()).format("HH:MM:SS");
    moment.tz.setDefault('asia/karachi ').locale("id");
    const date = moment.tz("asia/karachi").format("DD/MM/YYYY");
    console.log("date" + date);
    console.log("temps " + temps);
    let menuMsg = "≡ 𝙹𝙾𝙴𝙻 𝙱𝚄𝙶 𝙼𝙴𝙽𝚄\n\n";
    /*menuMsg+=`
    
    
    
    Owner : ${s.NOM_OWNER} \n       || Commandes : ${cm.length} \n        || Date : ${date}\n || Heure : ${temps} \n || Mémoire : ${format(os.totalmem()-os.freemem())}/${format(os.totalmem())}\n || Plateforme : ${os.platform()}\n || Developpeur : Djalega++ \n\n ╰────────────────`;
    
    
    
    
      
    ╚═════ ▓▓ ࿇ ▓▓ ═════╝*/
    /* menuMsg+=`
   ╔════ ▓▓ ࿇ ▓▓ ════╗
   
   ||
   ||     Préfixe : ${s.prefixe}
   ||      Owner : ${s.NOM_OWNER}
   ||      Commandes : ${cm.length}
   ||      Date : ${date}
   ||      Heure : ${temps}
   ||      Mémoire : ${format(os.totalmem()-os.freemem())}/${format(os.totalmem())}                   {Plateforme : ${os.platform()}
   ||  Développeurs : Djalega++||Luffy
   ||
   ╚════ ▓▓ ࿇ ▓▓ ════╝`;*/
    menuMsg += `
┏━━━━━━━━━━━━━━━━━━𖥚
┃۞docubug
┃۞loccrash
┃۞amountbug <amount>
┃۞pmbug <number>
┃۞delaybug <number>
┃۞trollybug <number>
┃۞docubug <number>
┃۞unlimitedbug <number>
┃۞bombug <number>
┃۞lagbug <number>
┃۞gcbug <grouplink>
┃۞delaygcbug <grouplink>
┃۞trollygcbug <grouplink>
┃۞laggcbug <grouplink>
┃۞bomgcbug <grouplink>
┃۞unlimitedgcbug <grplink>
┃۞docugcbug <grouplink>
┗━━━━━━━━━━━━━━━━━━━━𖥚
*𝚙𝚘𝚠𝚎𝚛𝚎𝚍 𝚋𝚢 𝚓𝚘𝚎𝚕 𝚔𝚊𝚗𝚐'𝚘𝚖𝚊*\n\n`;
    for (const cat in coms) {
        if (!emoji[cat]) {
            emoji[cat] = "";
        }
        menuMsg += ``;
        for (const cmd of coms[cat]) {
            menuMsg += "";
        }
    }
    var link = "https://files.catbox.moe/zvbprr.jpg";
    try {
        zk.sendMessage(dest, { image: { url: link }, caption: menuMsg, footer: "©TKM INC" }, { quoted: ms });
    }
    catch (e) {
        console.log("🥵🥵 Menu erreur " + e);
        repondre("🥵🥵 Menu erreur " + e);
    }
});
/*


module.exports.commande =()=>
  {
    var nomCom=["menu","m","fonctions"];
    var reaction="🐞"
    var categorie="général"


    return {nomCom,reaction,categorie,execute}
  
  // };*

  

 //var g=[];






  

  

  




var tt=[]

 async  function execute(dest,zok,commandeOptions?)
  {

    var link = "https://wallpapercave.com/uwp/uwp3860299.jpeg"
    // var listCom =listeCommande()
    let msg= "  ╩═══ * Ƶ𝓞ｋØ𝓊 * ╩═══\n\n"


//const listeCommande= async ()=> {
  var tab=[];var tabCmd=[];
    const tabCat= {};
  const readDir = util.promisify(fs.readdir);
  const readFile = util.promisify(fs.readFile);
  //console.log("ch " + __dirname + '../')
  var chemin= './commandes/'
  var nomFichier = await readDir(__dirname)
//console.log("installation des plugins ... ")
  nomFichier.forEach((fichier) => {
    if (fichier.endsWith(".js")) {
      //console.log(fichier+" installé ✅")
      // var { commande } = require(/**/ //'../'+chemin.replace(/./, '')+*/__dirname+'/'+fichier.split('.js')[0])
//  var infoCom = commande()
//  if(!infoCom.categorie) infoCom.categorie="général"
// tabCat[infoCom.categorie].push(infoCom.nomCom[0])
//  tabCmd[infoCom.nomCom[0]]
/*  for(a of infoCom.categorie)
     {
       if(!msg.includes(a))
       {
       msg+=a+"\n"
       msg+=infoCom.nomCom[0]+"\n"
       }else{msg+=infoCom.nomCom[0]+"\n"}
       
     }*/
//msg+=infoCom.categorie+infoCom.nomCom[0]
//msg+=`🪰 ${infoCom.nomCom[0]} `+"\n"
// tu = infoCom.nomCom[1]
/*  for(var b=0;b<=infoCom.nomCom[0].length;b++)
     {
       msg+=infoCom.nomCom[b]
     }*/
/** ************************** */
// for (var a of infoCom.nomCom[0])      {
// console.log("aaaa "+a +" "+typeof a)
//  tu.push(a)
// msg+=a.normalize()+"\n"
// msg+=infoCom.nomCom[0]
// msg+=infoCom.nomCom[0]
// msg+=infoCom.nomCom[0]
//   tu[a]=infoCom.nomCom[0]
//  tt.push(infoCom.nomCom[a])
//tabCmd[a] = infoCom.execute
// reaction[a]=infoCom.reaction
// }
/** ********************************************* */
//    }
//console.log("installation de plugins terminé 👍🏿")
// return tab
// })
// console.log("fichier "+typeof nomFichier)
//var txt="";
/* for(var ctg in tabCat)
   {
     txt+=ctg;
     txt+=tabCat.nomCom
   }*/
//}
//var coms={}
/* tabCmd.map
   (async (cmds)=>
     {
       if(!coms[cmds.categerie])
 coms[cmds.categorie]="général"
 coms[cmds.categorie].push(cmds)
       
     }
   
   
   
)*/
/* for(let a=0;a<=listeCommande.length;a++)
   {
     msg +=tt[a]
   }*/
/*
   for(const categorie in tabCat)
      {
        msg+="*"+categorie+"*"+"\n"
      
    for(const comm of tabCat[categorie])
      {
        msg+=+'\n'+comm
      }}

    await zok.sendMessage(dest,{image :{url:link},caption:msg+txt});

    */
//   
// }
