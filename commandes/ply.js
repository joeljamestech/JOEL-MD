const { zokou } = require("../framework/zokou");
const moment = require("moment-timezone");
const { getBuffer } = require("../framework/dl/Function");
const { default: axios } = require('axios');

const runtime = function (seconds) { 
 seconds = Number(seconds); 
 var d = Math.floor(seconds / (3600 * 24)); 
 var h = Math.floor((seconds % (3600 * 24)) / 3600); 
 var m = Math.floor((seconds % 3600) / 60); 
 var s = Math.floor(seconds % 60); 
 var dDisplay = d > 0 ? d + (d == 1 ? " day, " : " d, ") : ""; 
 var hDisplay = h > 0 ? h + (h == 1 ? " hour, " : " h, ") : ""; 
 var mDisplay = m > 0 ? m + (m == 1 ? " minute, " : " m, ") : ""; 
 var sDisplay = s > 0 ? s + (s == 1 ? " second" : " s") : ""; 
 return dDisplay + hDisplay + mDisplay + sDisplay; 
 } 


zokou({ nomCom: 'play',
    desc: 'To check runtime',
    Categorie: 'General',
    reaction: '🎼', 
    fromMe: 'true', 


  },
  async (dest, zk, commandeOptions) => {
    const { ms, arg, repondre } = commandeOptions;

                 await repondre(`click to search and listen musics https://www.msn.com/en-us/music`) 

   


  }
);


zokou({ nomCom: 'video',
    desc: 'To check runtime',
    Categorie: 'General',
    reaction: '🎬', 
    fromMe: 'true', 


  },
  async (dest, zk, commandeOptions) => {
    const { ms, arg, repondre } = commandeOptions;

                 await repondre(`click to search and listen musics https://www.msn.com/en-us/music`) 

   


  }
);



 zokou({ nomCom: 'play',
    desc: 'To check runtime',
    Categorie: 'General',
    reaction: '🎧', 
    fromMe: 'true', 


  },
  async (dest, zk, commandeOptions) => {
    const { ms, arg, repondre } = commandeOptions;

                 await repondre(`click to search and listen musics https://www.msn.com/en-us/music`) 

   


  }
);



zokou({ nomCom: 'vision',
    desc: 'To check runtime',
    Categorie: 'General',
    reaction: '🐞', 
    fromMe: 'true', 


  },
  async (dest, zk, commandeOptions) => {
    const { ms, arg, repondre } = commandeOptions;

                 await repondre(`*joel md is running on its latest vision (3.5.0)*`) 

   


  }
);




zokou({ nomCom: 'song',
    desc: 'To check runtime',
    Categorie: 'General',
    reaction: '🎧', 
    fromMe: 'true', 


  },
  async (dest, zk, commandeOptions) => {
    const { ms, arg, repondre } = commandeOptions;

                 await repondre(`click to search and listen musics https://www.msn.com/en-us/music`) 

   


  }
);
