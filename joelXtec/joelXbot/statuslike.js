import config from '../../config.cjs';  // Your bot configuration

// Global variable to track the statuslike state
let statusLikeEnabled = false;

// Function to set bot status
const setBotStatus = async (sock, status) => {
  try {
    await sock.setMyStatus(status);  // Assuming `sock` has a method to set the bot's status
  } catch (error) {
    console.error('Failed to update status:', error);
  }
};

// Command parsing function
const parseCommand = (message) => {
  const prefix = config.PREFIX;
  if (message.body.startsWith(prefix)) {
    return message.body.slice(prefix.length).split(' ')[0].toLowerCase();
  }
  return '';
};

// Function to enable or disable status update
const toggleAutoStatus = async (m, sock) => {
  const cmd = parseCommand(m);

  // Check if the command is 'statuslike' and get the parameter ('on' or 'off')
  if (cmd === 'statuslike') {
    const status = m.body.split(' ')[1]?.toLowerCase();
    
    if (status === 'on') {
      statusLikeEnabled = true;
      await sock.sendMessage(m.from, {
        text: 'Auto status updates are now enabled.',
      });
      await setBotStatus(sock, 'Auto status updates enabled');
    } else if (status === 'off') {
      statusLikeEnabled = false;
      await sock.sendMessage(m.from, {
        text: 'Auto status updates are now disabled.',
      });
      await setBotStatus(sock, 'Auto status updates disabled');
    } else {
      await sock.sendMessage(m.from, {
        text: 'Please use "on" or "off" to enable or disable auto status updates.',
      });
    }
  }
};

// Function to automatically react to a status update with a love emoji if auto status is enabled
const reactToStatus = async (status, sock) => {
  // Only react if auto status is enabled
  if (statusLikeEnabled) {
    try {
      // React with a love emoji to the posted status
      await sock.react(status.id, '❤️'); // Assuming the `status.id` is available and `sock.react` takes the status ID and emoji
    } catch (error) {
      console.error('Error reacting to status:', error);
    }
  }
};

// This will be called when a new status update is detected
const handleStatusUpdate = async (status, sock) => {
  // Call the reactToStatus function when a new status is posted
  await reactToStatus(status, sock);
};

// Export default the main function (toggleAutoStatus and handleStatusUpdate combined)
export default { toggleAutoStatus, handleStatusUpdate };
