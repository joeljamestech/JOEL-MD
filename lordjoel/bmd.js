'use strict';

Object.defineProperty(exports, "__esModule", {
  'value': true
});
const {
  zokou
} = require("../framework/zokou");
zokou({
  'nomCom': "bmd",
  'category': 'general', 
  'reaction': '🍾',
  'nomFichier': __filename
}, async (_0x969b1f, _0x2501c9, _0x849359) => {
  const _0x52fa52 = await fetch("https://github.com/jokathanjoka/BEST-CODER-MD/tree/main");
  const _0x34824f = await _0x52fa52.json();
  if (_0x34824f) {
    const _0x129946 = {
      'stars': _0x34824f.stargazers_count,
      'forks': _0x34824f.forks_count,
      'lastUpdate': _0x34824f.updated_at,
      'owner': _0x34824f.owner.login
    };
    const _0x359c05 = new Date(_0x34824f.created_at).toLocaleDateString("en-GB");
    const _0x321f6c = "  *❒BEST CODER MULTI-DEVICE RANK❒⁠⁠⁠⁠* \n\n best coder md is a great WhatsApp bot created by the *joel tech* that has been given " + _0x129946.stars + " 🌟 stars as a sign of loving it and a total of " + _0x129946.forks " users have deployed it by now....🤩\n__________________________________\n ◔͜͡◔Made on Earth by joel tech◔";
    await _0x2501c9.sendMessage(_0x969b1f, {
      'image': {
        'url': "https://telegra.ph/file/fe8a25fb17af3926e6048.jpg"
      },
      'caption': _0x321f6c
    });
  } else {
    console.log("Could not fetch data");
  }
});
