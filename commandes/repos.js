"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const { zokou } = require("../framework/zokou");

zokou({ nomCom: "repo", catégorie:"Général", reaction: "✨", nomFichier: __filename }, async (dest, zk, commandeOptions) => {
  const githubRepo = 'https://api.github.com/repos/joeljamestech/JOEL-MD';
  const img = 'https://telegra.ph/file/d65e03cbad4fb1fe35228.jpg';

  try {
    const response = await fetch(githubRepo);
    const data = await response.json();

    if (data) {
      const repoInfo = {
        stars: data.stargazers_count,
        forks: data.forks_count,
        lastUpdate: data.updated_at,
        owner: data.owner.login,
      };

      const releaseDate = new Date(data.created_at).toLocaleDateString('en-GB');
      const lastUpdateDate = new Date(data.updated_at).toLocaleDateString('en-GB');

      const gitdata = `HELLOW WHATSAAP USER WELCOME ᴊᴏᴇʟ ᴍᴅ SCRIPT 
this is* *joel-md.*\n GET SESSION ID *BY*, *PAIRING CODE*  https://joelsession1-4a8c04ad2935.herokuapp.com/pair/

🕷️ *REPOSITORY:* ${data.html_url}
🕷️ *STARS:* ${repoInfo.stars}
🕷️ *FORKS:* ${repoInfo.forks}
🕷️ *RELEASE DATE:* ${releaseDate}
🕷️ *UPDATE ON:* ${repoInfo.lastUpdate}
🕷️ *OWNER:* *joel tech*
__________________________________
            𝕡𝕠𝕨𝕖𝕣𝕖𝕕 𝕓𝕪 𝕛𝕠𝕖𝕝 𝕜𝕒𝕟𝕘'𝕠𝕞𝕒`;

      await zk.sendMessage(dest, { image: { url: img }, caption: gitdata });
    } else {
      console.log("Could not fetch data");
    }
  } catch (error) {
    console.log("Error fetching data:", error);
  }
});
