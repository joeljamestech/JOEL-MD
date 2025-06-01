import { serialize } from '../../lib/Serializer.js';
import config from '../../config.cjs';

const antilinkSettings = {}; // Store settings { groupId: { antilink: true/false, antilink2: true/false, warnings: { userId: count } } }

export const handleAntilink = async (m, sock, logger, isBotAdmins, isAdmins, isCreator) => {
    const PREFIX = /^[\\/!#.]/;
    const isCOMMAND = (body) => PREFIX.test(body);
    const prefixMatch = isCOMMAND(m.body) ? m.body.match(PREFIX) : null;
    const prefix = prefixMatch ? prefixMatch[0] : '/';
    const cmd = m.body.startsWith(prefix) ? m.body.slice(prefix.length).split(' ')[0].toLowerCase() : '';

    if (!antilinkSettings[m.from]) {
        antilinkSettings[m.from] = { antilink: false, antilink2: false, warnings: {} };
    }

    if (cmd === 'antilink' || cmd === 'antilink2') {
        if (!m.isGroup) return await sock.sendMessage(m.from, { text: 'This command can only be used in groups.' }, { quoted: m });
        if (!isBotAdmins) return await sock.sendMessage(m.from, { text: 'The bot needs to be an admin to manage the antilink feature.' }, { quoted: m });

        if (!isAdmins) return await sock.sendMessage(m.from, { text: 'Only admins can modify antilink settings.' }, { quoted: m });

        const args = m.body.slice(prefix.length + cmd.length).trim().split(/\s+/);
        const action = args[0] ? args[0].toLowerCase() : '';

        if (cmd === 'xantilink') {
            if (action === 'on') {
                antilinkSettings[m.from].antilink = true;
                return await sock.sendMessage(m.from, { text: '✅ *Antilink (Delete Only) enabled!*' }, { quoted: m });
            } 
            if (action === 'off') {
                antilinkSettings[m.from].antilink = false;
                return await sock.sendMessage(m.from, { text: '❌ *Antilink (Delete Only) disabled!*' }, { quoted: m });
            }
        }

        if (cmd === 'xntilink2') {
            if (action === 'on') {
                antilinkSettings[m.from].antilink2 = true;
                return await sock.sendMessage(m.from, { text: '✅ *Antilink2 (Warnings & Remove) enabled!*' }, { quoted: m });
            } 
            if (action === 'off') {
                antilinkSettings[m.from].antilink2 = false;
                return await sock.sendMessage(m.from, { text: '❌ *Antilink2 (Warnings & Remove) disabled!*' }, { quoted: m });
            }
        }

        return await sock.sendMessage(m.from, {
            text: `📌 *Usage:*\n- ${prefix}antilink on | off\n- ${prefix}antilink2 on | off`
        }, { quoted: m });
    }

    if ((antilinkSettings[m.from].antilink || antilinkSettings[m.from].antilink2) && m.body.match(/https?:\/\/[^\s]+/)) {
        if (!isBotAdmins) return;

        let gclink = `https://chat.whatsapp.com/${await sock.groupInviteCode(m.from)}`;
        let isLinkThisGc = new RegExp(gclink, 'i');
        let isgclink = isLinkThisGc.test(m.body);

        if (isgclink) return await sock.sendMessage(m.from, { text: `The link you shared is for this group, so you won't be removed.` });

        if (isAdmins || isCreator) return await sock.sendMessage(m.from, { text: `Admins and the owner are allowed to share links.` });

        await sock.sendMessage(m.from, { delete: m.key });

        if (antilinkSettings[m.from].antilink2) {
            if (!antilinkSettings[m.from].warnings[m.sender]) {
                antilinkSettings[m.from].warnings[m.sender] = 0;
            }
            antilinkSettings[m.from].warnings[m.sender] += 1;

            const userWarnings = antilinkSettings[m.from].warnings[m.sender];
            const maxWarnings = config.ANTILINK_WARNINGS || 5;

            if (userWarnings >= maxWarnings) {
                await sock.groupParticipantsUpdate(m.from, [m.sender], 'remove');
                delete antilinkSettings[m.from].warnings[m.sender];
                return await sock.sendMessage(m.from, { text: `🚫 *@${m.sender.split('@')[0]} removed for exceeding ${maxWarnings} warnings!*`, mentions: [m.sender] });
            } else {
                return await sock.sendMessage(m.from, {
                    text: `⚠️ *Warning ${userWarnings}/${maxWarnings}:*\n@${m.sender.split('@')[0]} *Links are not allowed!*`,
                    mentions: [m.sender],
                }, { quoted: m });
            }
        }
    }
};
