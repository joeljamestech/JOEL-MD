import moment from "moment-timezone";
import config from "../../config.cjs";

const joelcmd = async (m, sock) => {
  const prefix = config.PREFIX || "!";
  const cmd = m.body.startsWith(prefix) ? m.body.slice(prefix.length).split(" ")[0].toLowerCase() : "";
  if (cmd !== "status") return;

  const timezone = config.TIMEZONE || "Africa/Dar_es_Salaam";
  const deployDate = moment.tz(config.DEPLOY_DATE, "YYYY-MM-DD", timezone).startOf("day");
  if (!deployDate.isValid()) return;

  const now = moment().tz(timezone);
  const daysPassed = now.clone().startOf("day").diff(deployDate, "days");
  const formattedTime = now.format("dddd, MMMM Do YYYY [at] hh:mm A");
  const deployDateText = deployDate.format("MMMM Do YYYY");

  const thumbnail = "https://raw.githubusercontent.com/jokathanjoka/joel-v1/refs/heads/main/media/chrono.webp";

  const replyText = `\`\`\`BOT STATUS

DEPLOYED SINCE: ${deployDateText}
DAYS ACTIVE   : ${daysPassed} day(s)
CURRENT TIME  : ${formattedTime}\`\`\``;

  await sock.sendMessage(
    m.key.remoteJid,
    {
      text: replyText,
      contextInfo: {
        externalAdReply: {
          title: "JOEL XMD",
          body: "POWERED BY LORD JOEL",
          thumbnailUrl: thumbnail,
          sourceUrl: "https://github.com/joeljamestech2",
          mediaType: 1,
          renderLargerThumbnail: false,
        },
      },
    },
    { quoted: m }
  );

  // Milestone logic
  let messageToSend = null;
  if (daysPassed === 30) {
    messageToSend = `\`\`\`Hello Lord Joel,\nIt has been a month since deployment and the bot is working perfectly.\n\nDeployed Since: ${deployDateText}\`\`\``;
  } else if (daysPassed === 60) {
    messageToSend = `\`\`\`Hello Lord Joel,\nTwo months have passed since deployment. I’m still functioning flawlessly.\n\nDeployed Since: ${deployDateText}\`\`\``;
  }

  if (messageToSend) {
    await sock.sendMessage(
      `${config.SUDO_NUMBER}@s.whatsapp.net`,
      {
        text: messageToSend,
        contextInfo: {
          externalAdReply: {
            title: "JOEL XMD",
            body: "POWERED BY LORD JOEL",
            thumbnailUrl: thumbnail,
            sourceUrl: "https://github.com/joeljamestech2",
            mediaType: 1,
            renderLargerThumbnail: false,
          },
        },
      },
      { quoted: m }
    );
  }
};

export default joelcmd;
