import config from '../../config.cjs';
import fetch from 'node-fetch';
import axios from 'axios';

const chatbotCommand = async (m, Matrix) => {
    const text = m.message?.conversation || m.message?.extendedTextMessage?.text || null;
    const senderId = m.key.remoteJid;
    const senderName = m.pushName || `User ${senderId}`;
    const ownerNumber = `${config.OWNER_NUMBER}@s.whatsapp.net`;

    const isChatbotEnabled = config.VOICE_CHAT_BOT ?? true;
    const chatbotMode = config.CHAT_BOT_MODE ?? 'public';
    const privateUsers = new Set(config.PRIVATE_USERS || []);

    if (!isChatbotEnabled || senderId === ownerNumber || senderId.endsWith('@g.us') || senderId === 'status@broadcast' || senderId.includes('@newsletter')) return;
    if (chatbotMode === 'private' && !privateUsers.has(senderId)) return;
    if (!text) return;

    try {
        const userMessage = text;
        const response = await fetch(`https://api.paxsenix.biz.id/ai/gemini-realtime?text=${encodeURIComponent(userMessage)}&session_id=ZXlKaklqb2lZMTg0T0RKall6TTNNek13TVdFNE1qazNJaXdpY2lJNkluSmZNbU01TUdGa05ETmtNVFF3WmpNNU5pSXNJbU5vSWpvaWNtTmZZVE16TURWaE1qTmpNR1ExTnpObFl5Sjk`);
        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);

        const responseData = await response.json();
        const joelReply = responseData.message || 'Oops! I couldn’t quite catch that 😅. Can you try again?';

        // TTS Voice Note
        const ttsUrl = `https://api.nexoracle.com/tts/text-to-speech?apikey=33241c3a8402295fdc&lang=en-US&text=${encodeURIComponent(joelReply)}`;

        try {
            const { data } = await axios.get(ttsUrl);
            if (!data?.status || !data?.result) {
                await Matrix.sendMessage(senderId, {
                    text: "🥺 Aw no! I couldn't turn that into a voice note... Try again?"
                }, { quoted: m });
                return;
            }

            await Matrix.sendMessage(senderId, {
                audio: { url: data.result },
                mimetype: 'audio/mpeg',
                ptt: true
            }, { quoted: m });

        } catch (ttsErr) {
            console.error('TTS API error:', ttsErr);
            await Matrix.sendMessage(senderId, {
                text: "⚠️ Uh-oh! Something went wrong with the magic spell... Try again later?"
            }, { quoted: m });
        }

    } catch (err) {
        console.error('Chatbot error:', err);
        await Matrix.sendMessage(senderId, {
            text: '❌ Oh no, something went wrong. Please try again later! 💔'
        }, { quoted: m });
    }
};

export default chatbotCommand;
