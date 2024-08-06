const { zokou } = require("../framework/zokou");
const moment = require("moment-timezone");
const { default: axios } = require('axios');
//const conf = require('../set');


zokou({ nomCom: 'p',
    desc: 'To check ping',
    Categorie: 'General',
    reaction: '🕷️', 
    fromMe: 'true', 

       
  },
  async (dest, zk, commandeOptions) => {
    const { ms, arg, repondre } = commandeOptions;
    const { start} = new Date().getTime()
    return repondre('*joel response speed is*\n ```' + 𝟗𝟗𝟗𝟗 + '``` *mm/s*') 
    const { end } = new Date().getTime()
    await zok.sendMessage('*Pong!*\n ```' + (end - start) + '``` *ms*')
  }
)
