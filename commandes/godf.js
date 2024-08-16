const { zokou } = require("../framework/zokou");
const { default: axios } = require('axios');
const { translate } = require('@vitalets/google-translate-api');

const BASE_URL = 'https://bible-api.com';

zokou({
  nomCom: 'bible',
  desc: 'Fetch a Bible chapter and translate it',
  Categorie: 'Religion',
  reaction: '📖',
  fromMe: 'true',
}, 
async (dest, zk, commandeOptions) => {
  const { ms, arg, repondre } = commandeOptions;

  try {
    // Extract the chapter number or name from the command text.
    let chapterInput = arg.join(' ').trim();

    if (!chapterInput) {
      return repondre(`Please specify the chapter number or name. Example: -bible john 3:16`);
    }

    // Encode the chapterInput to handle special characters
    chapterInput = encodeURIComponent(chapterInput);

    // Make an API request to fetch the chapter information.
    let chapterRes = await axios.get(`${BASE_URL}/${chapterInput}`);

    if (!chapterRes.data) {
      return repondre(`Error fetching chapter data. Please specify the chapter number or name. Example: -bible john 3:16`);
    }

    let chapterData = chapterRes.data;

    // Translate the chapter to English, Swahili, and KJV
    let translatedChapterEnglish = await translate(chapterData.text, { to: 'en', autoCorrect: true });
    let translatedChapterSwahili = await translate(chapterData.text, { to: 'sw', autoCorrect: true });

    // Fetch the King James Version (KJV) translation
    let kjvRes = await axios.get(`${BASE_URL}/${chapterInput}?translation=kjv`);
    let kjvText = kjvRes.data.text;

    // Formatting the content in a decorative box
    let bibleChapter = `
┏━━━━━━━━[𝐁𝐔𝐆𝐀𝐓𝐓𝐈 𝐇𝐎𝐋𝐘 𝐁𝐈𝐁𝐋𝐄]━━━━━━━━━━━━━
┃ 📖 *𝐓𝐡𝐞 𝐇𝐨𝐥𝐲 𝐁𝐢𝐛𝐥𝐞*                 
┣━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
┃ 📜 *𝐂𝐡𝐚𝐩𝐭𝐞𝐫 ${chapterData.reference}*         
┃ 𝐓𝐲𝐩𝐞: ${chapterData.translation_name}        
┃ 𝐍𝐮𝐦𝐛𝐞𝐫 𝐨𝐟 𝐕𝐞𝐫𝐬𝐞𝐬: ${chapterData.verses.length}   
┣━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
┃ 🔮 *𝐂𝐡𝐚𝐩𝐭𝐞𝐫 𝐂𝐨𝐧𝐭𝐞𝐧𝐭 (𝐄𝐧𝐠𝐥𝐢𝐬𝐡):*         
┃ ${translatedChapterEnglish.text}        
┣━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
┃ 🔮 *𝐂𝐡𝐚𝐩𝐭𝐞𝐫 𝐂𝐨𝐧𝐭𝐞𝐧𝐭 (𝐒𝐰𝐚𝐡𝐢𝐥𝐢):*         
┃ ${translatedChapterSwahili.text}        
┣━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
┃ 🔮 *𝐂𝐡𝐚𝐩𝐭𝐞𝐫 𝐂𝐨𝐧𝐭𝐞𝐧𝐭(𝐊𝐢𝐧𝐠 𝐉𝐚𝐦𝐞𝐬 𝐕𝐞𝐫𝐬𝐢𝐨𝐧):*
┃ ${kjvText}        
┗━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━`;

    await repondre(bibleChapter);
  } catch (error) {
    console.error(error);
    await repondre(`Error: ${error.message}`);
  }
});

export default bibleChapterHandler;
