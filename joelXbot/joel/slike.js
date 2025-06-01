import config from '../../config.cjs';

const autostatuslikeCmd = (Matrix) => {
    Matrix.ev.on('messages.upsert', async (chatUpdate) => {
        try {
            const mek = chatUpdate.messages[0];

            if (
                mek.key.remoteJid === 'status@broadcast' &&
                config.AUTO_STATUS_REACT === "true"
            ) {
                const jawadlike = await Matrix.decodeJid(Matrix.user.id);
                const emojiList = ['❤️', '💸', '😇', '🍂', '💥'];
                const randomEmoji = emojiList[Math.floor(Math.random() * emojiList.length)];

                await Matrix.readMessages([mek.key]);

                await Matrix.sendMessage(
                    mek.key.remoteJid,
                    {
                        react: {
                            text: randomEmoji,
                            key: mek.key
                        }
                    },
                    {
                        statusJidList: [mek.key.participant, jawadlike]
                    }
                );
            }
        } catch (err) {
            console.error("Auto status react error:", err);
        }
    });
};

export default autostatuslikeCmd;
