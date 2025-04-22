import { proto } from '@whiskeysockets/baileys';
import config from '../../config.cjs'; // Make sure the config file is correct

const invite = async (m, sock) => {
  const prefix = config.PREFIX;

  const cmd = m.body.startsWith(prefix)
    ? m.body.slice(prefix.length).split(' ')[0].toLowerCase()
    : '';

  if (cmd === 'invite') {
    // Add your invite link below
    const inviteLink = 'https://chat.whatsapp.com/yourGroupInviteLink'; // Replace with your group or bot invite link
    
    // You can customize the message you want to send along with the invite link
    const inviteMessage = `Hello *${m.pushName}*,\n\nHere is the invite link to join the group:\n*${inviteLink}*\n\nWe'd love to have you join! 😊`;

    // Send the invite message with the link
    await sock.sendMessage(m.from, {
      text: inviteMessage,
    }, { quoted: m });

    // React with a thumbs-up or any other emoji to acknowledge the command
    await m.React('👍');
  }
};

export default invite;

/*
import { proto } from '@whiskeysockets/baileys';
import config from '../../config.cjs'; // Ensure the config file is correctly imported

const add = async (m, sock) => {
  const prefix = config.PREFIX;

  const cmd = m.body.startsWith(prefix)
    ? m.body.slice(prefix.length).split(' ')[0].toLowerCase()
    : '';

  if (cmd === 'add') {
    // Check if the user provided a phone number
    const args = m.body.split(' '); // split the message into arguments
    if (args.length === 2) {
      const phoneNumber = args[1];

      // Check if the phone number is valid
      if (/^\d{12}$/.test(phoneNumber)) { // Ensure the phone number has 12 digits
        const addMessage = `Hello *${m.pushName}*,\n\nI will add this number to the group: *${phoneNumber}*.\nPlease note, the user must click the invite link to join the group.\n\nHere is the invite link: *https://chat.whatsapp.com/yourGroupInviteLink*\n\nFeel free to share it with the user!`;

        // Send the invite link message
        await sock.sendMessage(m.from, {
          text: addMessage,
        }, { quoted: m });

        // React with a thumbs-up emoji to acknowledge the action
        await m.React('👍');
      } else {
        // If the phone number is invalid
        await sock.sendMessage(m.from, {
          text: `Invalid phone number format. Please provide a valid phone number with 12 digits (e.g., 255714595078).`,
        }, { quoted: m });

        await m.React('❌'); // React with a cross to indicate failure
      }
    } else if (m.quoted && m.quoted.sender) {
      // If the user replies to a message from another user, use their phone number
      const userNumber = m.quoted.sender.split('@')[0]; // Extract the number from the sender's JID
      const addMessage = `Hello *${m.pushName}*,\n\nI will add this user: *${userNumber}* to the group.\nPlease note, the user must click the invite link to join the group.\n\nHere is the invite link: *https://chat.whatsapp.com/yourGroupInviteLink*\n\nFeel free to share it with the user!`;

      // Send the invite link message
      await sock.sendMessage(m.from, {
        text: addMessage,
      }, { quoted: m });

      // React with a thumbs-up emoji to acknowledge the action
      await m.React('👍');
    } else {
      // If no phone number is provided
      await sock.sendMessage(m.from, {
        text: `Please provide a phone number like this: *${prefix}add 255714595078* or reply to a user's message to add them.`,
      }, { quoted: m });

      await m.React('❌'); // React with a cross to indicate failure
    }
  }
};

export default add;
*/
