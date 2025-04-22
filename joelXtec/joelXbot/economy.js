
import config from '../../config.cjs'; // Import config to get PREFIX

const economyData = {}; // In-memory storage for economy data (userId -> balance)
const lastClaimedDaily = {}; // To track last claim time for daily rewards
const bankData = {}; // In-memory storage for bank data (userId -> bankBalance)

const checkUserAccount = (userId) => {
  if (!economyData[userId]) {
    economyData[userId] = { balance: 0 };
  }
  if (!bankData[userId]) {
    bankData[userId] = { balance: 0 };
  }
};

// Utility to send messages
const sendReply = (m, message) => {
  m.reply(message);
};

// Command to check balance
const checkBalance = (m) => {
  const userId = m.sender;
  checkUserAccount(userId); // Ensure the user has an account
  sendReply(m, `╔════◇\n║ *YOEL XMD ECONOMY*\n║ *your balance is*\n║ *$${economyData[userId].balance}*\n║ *Enjoy🥳*\n╚════════════╝`);
};

// Command to earn money (e.g., daily reward, work)
const earnMoney = (m, amount) => {
  const userId = m.sender;
  checkUserAccount(userId); // Ensure the user has an account

  if (amount <= 0) {
    return sendReply(m, "Please provide a valid positive amount.");
  }

  economyData[userId].balance += amount;
  sendReply(m, `╔════◇\n║ *YOEL XMD ECONOMY*\n║ *you earned*\n║ *$${amount}*: \n║ *new balance*\n║ *$${economyData[userId].balance}*\n╚════════════╝`);
};

// Command to spend money
const spendMoney = (m, amount) => {
  const userId = m.sender;
  checkUserAccount(userId); // Ensure the user has an account

  if (economyData[userId].balance < amount) {
    return sendReply(m, `You do not have enough money. Your balance is $${economyData[userId].balance}.`);
  }

  if (amount <= 0) {
    return sendReply(m, "Please provide a valid positive amount to spend.");
  }

  economyData[userId].balance -= amount;
  sendReply(m, `You spent $${amount}. Your new balance is $${economyData[userId].balance}.`);
};

// Command to deposit money into bank
const depositMoney = (m, amount) => {
  const userId = m.sender;
  checkUserAccount(userId); // Ensure the user has an account

  if (amount <= 0 || economyData[userId].balance < amount) {
    return sendReply(m, "You don't have enough balance to deposit this amount.");
  }

  economyData[userId].balance -= amount;
  bankData[userId].balance += amount;
  sendReply(m, `You deposited $${amount} into your bank account. Your new balance is $${economyData[userId].balance}.`);
};

// Command to withdraw money from bank
const withdrawMoney = (m, amount) => {
  const userId = m.sender;
  checkUserAccount(userId); // Ensure the user has an account

  if (amount <= 0 || bankData[userId].balance < amount) {
    return sendReply(m, "You don't have enough balance in your bank account to withdraw this amount.");
  }

  bankData[userId].balance -= amount;
  economyData[userId].balance += amount;
  sendReply(m, `You withdrew $${amount} from your bank account. Your new balance is $${economyData[userId].balance}.`);
};

// Command to transfer money to another user
const transferMoney = (m, amount, recipientId) => {
  const userId = m.sender;
  checkUserAccount(userId); // Ensure the user has an account
  checkUserAccount(recipientId); // Ensure the recipient has an account

  if (economyData[userId].balance < amount) {
    return sendReply(m, `You do not have enough money to transfer. Your balance is $${economyData[userId].balance}.`);
  }

  if (amount <= 0) {
    return sendReply(m, "Please provide a valid positive amount to transfer.");
  }

  economyData[userId].balance -= amount;
  economyData[recipientId].balance += amount;
  sendReply(m, `You transferred $${amount} to ${recipientId}. Your new balance is $${economyData[userId].balance}.`);
};

// Command to claim daily reward
const claimDaily = (m) => {
  const userId = m.sender;
  checkUserAccount(userId); // Ensure the user has an account

  const now = Date.now();
  const lastClaim = lastClaimedDaily[userId] || 0;
  const timeSinceLastClaim = now - lastClaim;

  if (timeSinceLastClaim < 86400000) { // Less than 24 hours
    const timeRemaining = 86400000 - timeSinceLastClaim;
    const hoursRemaining = Math.floor(timeRemaining / 3600000);
    const minutesRemaining = Math.floor((timeRemaining % 3600000) / 60000);
    return sendReply(m, `You can claim your daily reward in ${hoursRemaining} hours and ${minutesRemaining} minutes.`);
  }

  const dailyAmount = 100; // Daily reward amount
  economyData[userId].balance += dailyAmount;
  lastClaimedDaily[userId] = now;
  sendReply(m, `You claimed your daily reward of $${dailyAmount}. Your new balance is $${economyData[userId].balance}.`);
};

// Command to show the leaderboard
const showLeaderboard = (m) => {
  const sortedUsers = Object.entries(economyData)
    .sort(([, a], [, b]) => b.balance - a.balance)
    .slice(0, 5);

  if (sortedUsers.length === 0) {
    return sendReply(m, "No users have balances yet.");
  }

  const leaderboard = sortedUsers.map(([userId, { balance }], index) => `${index + 1}. ${userId}: $${balance}`).join("\n");
  sendReply(m, `Top 5 Users:\n${leaderboard}`);
};

// Command handler
const economy = async (m, gss) => {
  // Check if the message is from a group
  if (!m.isGroup) {
    return; // If not from a group, do nothing
  }

  const prefix = config.PREFIX;  // Get prefix from config
  const cmd = m.body.startsWith(prefix) ? m.body.slice(prefix.length).split(' ')[0].toLowerCase() : '';
  const text = m.body.slice(prefix.length + cmd.length).trim();

  if (cmd === 'balance') {
    checkBalance(m);
  } else if (cmd === 'earn' && text) {
    const amount = parseInt(text);
    if (isNaN(amount) || amount <= 0) {
      return sendReply(m, "Please provide a valid positive amount.");
    }
    earnMoney(m, amount);
  } else if (cmd === 'spend' && text) {
    const amount = parseInt(text);
    if (isNaN(amount) || amount <= 0) {
      return sendReply(m, "Please provide a valid positive amount.");
    }
    spendMoney(m, amount);
  } else if (cmd === 'deposit' && text) {
    const amount = parseInt(text);
    if (isNaN(amount) || amount <= 0) {
      return sendReply(m, "Please provide a valid positive amount.");
    }
    depositMoney(m, amount);
  } else if (cmd === 'withdraw' && text) {
    const amount = parseInt(text);
    if (isNaN(amount) || amount <= 0) {
      return sendReply(m, "Please provide a valid positive amount.");
    }
    withdrawMoney(m, amount);
  } else if (cmd === 'transfer' && text) {
    const [recipientId, amountStr] = text.split(' ');
    const amount = parseInt(amountStr);
    if (isNaN(amount) || amount <= 0 || !recipientId) {
      return sendReply(m, "Please provide a valid recipient and positive amount.");
    }
    transferMoney(m, amount, recipientId);
  } else if (cmd === 'daily') {
    claimDaily(m);
  } else if (cmd === 'leaderboard') {
    showLeaderboard(m);
  }
  // Do nothing if the command is invalid or not recognized
};

export default economy; 
