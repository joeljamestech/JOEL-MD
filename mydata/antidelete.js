let deletedMessages = new Map(); // A map to store deleted messages using message id as the key
let isAntiDeleteEnabled = false; // Flag to enable/disable anti-delete feature

const deletedMessagesChatId = '255781144539@s.whatsapp.net'; // The chat ID to send deleted messages to

// Function to listen for deleted messages (only if anti-delete is enabled)
export const handleDeletedMessages = (sock, message) => {
  if (!isAntiDeleteEnabled) {
    // If anti-delete is not enabled, return immediately
    return;
  }

  // When a message is deleted, we check if it was already stored
  if (!deletedMessages.has(message.id)) {
    // Store the deleted message details in the map
    deletedMessages.set(message.id, {
      from: message.from, // The sender of the deleted message
      content: message.body, // The content of the message (text)
      timestamp: message.timestamp, // Timestamp of when the message was sent
    });

    // Optionally, you can log the message that was deleted for debugging
    console.log(`Message deleted from ${message.from}: ${message.body}`);

    // Send the deleted message to the designated chat
    sendDeletedMessageToChat(sock, message);
  } else {
    console.log('Message was already deleted or ignored.');
  }
};

// Function to send deleted message to a chat
const sendDeletedMessageToChat = async (sock, message) => {
  const deletedMessage = deletedMessages.get(message.id);
  
  if (deletedMessage) {
    // Send a message with deleted content to the predefined chat
    await sock.sendMessage(deletedMessagesChatId, {
      text: `❌ **Message Deleted**\nFrom: ${deletedMessage.from}\nMessage: ${deletedMessage.content}\nTime: ${new Date(deletedMessage.timestamp * 1000).toLocaleString()}`,
    });
  } else {
    console.error('Error: Message content not found.');
  }
};

// Handle when the bot receives the revoke message event
export const onMessageRevoke = (sock, message) => {
  // Check if the message was deleted and handle it
  if (message && message.id) {
    handleDeletedMessages(sock, message);
  }
};

// Command to enable the anti-delete feature
export const enableAntiDelete = () => {
  isAntiDeleteEnabled = true;
  console.log("Anti-delete is now enabled.");
};

// Command to disable the anti-delete feature
export const disableAntiDelete = () => {
  isAntiDeleteEnabled = false;
  console.log("Anti-delete is now disabled.");
};

// Export the function to be used in the main bot
export default {
  onMessageRevoke,
  enableAntiDelete,
  disableAntiDelete,
};
