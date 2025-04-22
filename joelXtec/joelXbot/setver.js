import dotenv from 'dotenv';

import fs from 'fs';

import path from 'path';

import config from '../../config.cjs';

// Load .env variables

dotenv.config();

const allVarCommand = async (m, Matrix) => {

    const text = m.message?.conversation || m.message?.extendedTextMessage?.text || null; // Extract text

    const prefix = config.PREFIX;

    // Ignore group and broadcast messages

    if (m.key.remoteJid.endsWith('@g.us') || m.key.remoteJid === 'status@broadcast') {

        console.log('Group or broadcast message ignored.');

        return;

    }

    // Check if the command is `allvar`

    if (text === `${prefix}allvar`) {

        if (m.sender !== config.OWNER_NUMBER + '@s.whatsapp.net') {

            await Matrix.sendMessage(m.from, { text: 'σωηєя ¢σммαη∂' }, { quoted: m });
            
    await m.React('⏳');
            return;

        }

        try {

            // Path to the .env file

            const envFilePath = path.resolve(process.cwd(), '.env');

            // Check if .env file exists

            if (!fs.existsSync(envFilePath)) {

                await Matrix.sendMessage(

                    m.from,

                    { text: '❌ .env file not found. Make sure it exists in the project root.' },

                    { quoted: m }

                );

                return;

            }

            // Read and parse the .env file

            const envContent = fs.readFileSync(envFilePath, 'utf-8');

            const envVariables = envContent

                .split('\n') // Split by lines

                .filter(line => line.trim() && !line.startsWith('#')) // Exclude comments and empty lines

                .map(line => {

                    const [key, ...valueParts] = line.split('=');

                    const value = valueParts.join('=').trim(); // Handle cases with '=' in the value

                    return `🔑 ${key.trim()}: ${value}`;

                })

                .join('\n');

            // Send the variables to the owner

            const message = `🔐 **Environment Variables**\n\n${envVariables}`;
            
            await Matrix.sendMessage(m.from, { text: message }, { quoted: m });
            await m.React('✅'); 

        } catch (err) {

            console.error('Error reading .env file:', err.message);

            await Matrix.sendMessage(

                m.from,

                { text: '❌ Failed to read environment variables. Check server logs for more details.' },

                { quoted: m }

            );

        }

    }

};

export default allVarCommand;
