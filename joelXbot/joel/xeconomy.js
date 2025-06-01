
/*                                   
────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────
─██████──────────██████████████──████████████████────████████████────────────────────────────██████──██████████████──██████████████──██████─────────
─██░░██──────────██░░░░░░░░░░██──██░░░░░░░░░░░░██────██░░░░░░░░████──────────────────────────██░░██──██░░░░░░░░░░██──██░░░░░░░░░░██──██░░██─────────
─██░░██──────────██░░██████░░██──██░░████████░░██────██░░████░░░░██──────────────────────────██░░██──██░░██████░░██──██░░██████████──██░░██─────────
─██░░██──────────██░░██──██░░██──██░░██────██░░██────██░░██──██░░██──────────────────────────██░░██──██░░██──██░░██──██░░██──────────██░░██─────────
─██░░██──────────██░░██──██░░██──██░░████████░░██────██░░██──██░░██──██████████████──────────██░░██──██░░██──██░░██──██░░██████████──██░░██─────────
─██░░██──────────██░░██──██░░██──██░░░░░░░░░░░░██────██░░██──██░░██──██░░░░░░░░░░██──────────██░░██──██░░██──██░░██──██░░░░░░░░░░██──██░░██─────────
─██░░██──────────██░░██──██░░██──██░░██████░░████────██░░██──██░░██──██████████████──██████──██░░██──██░░██──██░░██──██░░██████████──██░░██─────────
─██░░██──────────██░░██──██░░██──██░░██──██░░██──────██░░██──██░░██──────────────────██░░██──██░░██──██░░██──██░░██──██░░██──────────██░░██─────────
─██░░██████████──██░░██████░░██──██░░██──██░░██████──██░░████░░░░██──────────────────██░░██████░░██──██░░██████░░██──██░░██████████──██░░██████████─
─██░░░░░░░░░░██──██░░░░░░░░░░██──██░░██──██░░░░░░██──██░░░░░░░░████──────────────────██░░░░░░░░░░██──██░░░░░░░░░░██──██░░░░░░░░░░██──██░░░░░░░░░░██─
─██████████████──██████████████──██████──██████████──████████████────────────────────██████████████──██████████████──██████████████──██████████████─
───────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────
made by lord joel
contact owner +2557114595078

CURRENTLY RUNNING ON BETA VERSION!!
*
   * @project_name : JOEL XMD
   * @author : LORD_JOEL
   * @youtube : https://www.youtube.com/@joeljamestech255
   * @infoription : joel Md ,A Multi-functional whatsapp user bot.
   * @version 10 
*
   * Licensed under the  GPL-3.0 License;
* 
   * ┌┤Created By joel tech info.
   * © 2025 joel md ✭ ⛥.
   * plugin date : 11/1/2025
* 
   * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
   * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
   * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
   * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
   * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
   * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
   * SOFTWARE.
*/



import config from '../../config.cjs';

const economyData = {};
const lastClaimedDaily = {};
const bankData = {};
const goldData = {};

const checkUserAccount = (userId) => {
  if (!economyData[userId]) economyData[userId] = { balance: 0 };
  if (!bankData[userId]) bankData[userId] = { balance: 0 };
  if (!goldData[userId]) goldData[userId] = { balance: 0 };
};

const sendReply = (m, message) => m.reply(message);

const formatCurrency = (amount) => `$${amount.toLocaleString()}`;

// Wallet Command
const showWallet = (m) => {
  const userId = m.sender;
  checkUserAccount(userId);

  const wallet = formatCurrency(economyData[userId].balance);
  const bank = formatCurrency(bankData[userId].balance);
  const gold = goldData[userId].balance;

  sendReply(m, `╭───〔 ᴡᴀʟʟᴇᴛ 〕───╮\n` +
    `│ 💵 Wallet: ${wallet}\n` +
    `│ 🏦 Bank: ${bank}\n` +
    `│ ✨ Gold: ${gold}G\n` +
    `╰────────────────╯\n\nᴘᴏᴡᴇʀᴇᴅ ʙʏ ʟᴏʀᴅ ᴊᴏᴇʟ`);
};

// Gold Commands
const checkGold = (m) => {
  const userId = m.sender;
  checkUserAccount(userId);

  const gold = goldData[userId].balance;
  sendReply(m, `✨ ʏᴏᴜʀ ɢᴏʟᴅ ʙᴀʟᴀɴᴄᴇ: ${gold}G\n\nᴘᴏᴡᴇʀᴇᴅ ʙʏ ʟᴏʀᴅ ᴊᴏᴇʟ`);
};

const earnGold = (m, amount) => {
  const userId = m.sender;
  checkUserAccount(userId);

  if (amount <= 0) return sendReply(m, "❌ ᴇɴᴛᴇʀ ᴀ ᴘᴏsɪᴛɪᴠᴇ ɢᴏʟᴅ ᴀᴍᴏᴜɴᴛ.");
  
  goldData[userId].balance += amount;
  sendReply(m, `⚡ ʏᴏᴜ ᴇᴀʀɴᴇᴅ ${amount}G ɢᴏʟᴅ!\nᴛᴏᴛᴀʟ: ${goldData[userId].balance}G\n\nᴘᴏᴡᴇʀᴇᴅ ʙʏ ʟᴏʀᴅ ᴊᴏᴇʟ`);
};

// Balance Command
const checkBalance = (m) => {
  const userId = m.sender;
  checkUserAccount(userId);
  sendReply(m, `╔════◇\n║ *YOEL XMD ECONOMY*\n║ 💵 *Balance:* ${formatCurrency(economyData[userId].balance)}\n║ 🥳 Enjoy!\n╚════════════╝\n\nᴘᴏᴡᴇʀᴇᴅ ʙʏ ʟᴏʀᴅ ᴊᴏᴇʟ`);
};

// Earn Money
const earnMoney = (m, amount) => {
  const userId = m.sender;
  checkUserAccount(userId);

  if (amount <= 0) return sendReply(m, "❌ Please provide a valid positive amount.");

  economyData[userId].balance += amount;
  sendReply(m, `✅ You earned ${formatCurrency(amount)}!\n💰 New Balance: ${formatCurrency(economyData[userId].balance)}\n\nᴘᴏᴡᴇʀᴇᴅ ʙʏ ʟᴏʀᴅ ᴊᴏᴇʟ`);
};

// Spend
const spendMoney = (m, amount) => {
  const userId = m.sender;
  checkUserAccount(userId);

  if (amount <= 0) return sendReply(m, "❌ Provide a valid amount.");
  if (economyData[userId].balance < amount) return sendReply(m, `🚫 Not enough funds. Balance: ${formatCurrency(economyData[userId].balance)}`);

  economyData[userId].balance -= amount;
  sendReply(m, `🧾 You spent ${formatCurrency(amount)}.\n💰 New Balance: ${formatCurrency(economyData[userId].balance)}\n\nᴘᴏᴡᴇʀᴇᴅ ʙʏ ʟᴏʀᴅ ᴊᴏᴇʟ`);
};

// Deposit
const depositMoney = (m, amount) => {
  const userId = m.sender;
  checkUserAccount(userId);

  if (amount <= 0 || economyData[userId].balance < amount) return sendReply(m, "❌ Insufficient wallet balance.");

  economyData[userId].balance -= amount;
  bankData[userId].balance += amount;

  sendReply(m, `🏦 Deposited ${formatCurrency(amount)} to bank.\n💼 New Wallet: ${formatCurrency(economyData[userId].balance)}\n\nᴘᴏᴡᴇʀᴇᴅ ʙʏ ʟᴏʀᴅ ᴊᴏᴇʟ`);
};

// Withdraw
const withdrawMoney = (m, amount) => {
  const userId = m.sender;
  checkUserAccount(userId);

  if (amount <= 0 || bankData[userId].balance < amount) return sendReply(m, "❌ Not enough bank balance.");

  bankData[userId].balance -= amount;
  economyData[userId].balance += amount;

  sendReply(m, `💸 Withdrawn ${formatCurrency(amount)} from bank.\n💼 Wallet: ${formatCurrency(economyData[userId].balance)}\n\nᴘᴏᴡᴇʀᴇᴅ ʙʏ ʟᴏʀᴅ ᴊᴏᴇʟ`);
};

// Transfer
const transferMoney = (m, amount, recipientId) => {
  const userId = m.sender;
  checkUserAccount(userId);
  checkUserAccount(recipientId);

  if (amount <= 0 || economyData[userId].balance < amount) return sendReply(m, `❌ Invalid amount or insufficient funds.`);

  economyData[userId].balance -= amount;
  economyData[recipientId].balance += amount;

  sendReply(m, `🤝 Transferred ${formatCurrency(amount)} to ${recipientId}.\n🪙 New Balance: ${formatCurrency(economyData[userId].balance)}\n\nᴘᴏᴡᴇʀᴇᴅ ʙʏ ʟᴏʀᴅ ᴊᴏᴇʟ`);
};

// Daily Reward
const claimDaily = (m) => {
  const userId = m.sender;
  checkUserAccount(userId);

  const now = Date.now();
  const lastClaim = lastClaimedDaily[userId] || 0;
  const timeSince = now - lastClaim;

  if (timeSince < 86400000) {
    const remaining = 86400000 - timeSince;
    const hours = Math.floor(remaining / 3600000);
    const minutes = Math.floor((remaining % 3600000) / 60000);
    return sendReply(m, `⏳ Wait ${hours}h ${minutes}m to claim again.`);
  }

  const reward = 100;
  economyData[userId].balance += reward;
  lastClaimedDaily[userId] = now;

  sendReply(m, `🎁 Daily reward: ${formatCurrency(reward)}\n💰 New Balance: ${formatCurrency(economyData[userId].balance)}\n\nᴘᴏᴡᴇʀᴇᴅ ʙʏ ʟᴏʀᴅ ᴊᴏᴇʟ`);
};

// Leaderboard
const showLeaderboard = (m) => {
  const sorted = Object.entries(economyData).sort(([, a], [, b]) => b.balance - a.balance).slice(0, 5);
  if (sorted.length === 0) return sendReply(m, "No data yet.");

  const board = sorted.map(([uid, { balance }], i) => `${i + 1}. ${uid}: ${formatCurrency(balance)}`).join("\n");
  sendReply(m, `🏆 ᴛᴏᴘ 5 ᴜsᴇʀs:\n${board}\n\nᴘᴏᴡᴇʀᴇᴅ ʙʏ ʟᴏʀᴅ ᴊᴏᴇʟ`);
};

// Command handler
const economy = async (m, gss) => {
  const prefix = config.PREFIX;
  const cmd = m.body.startsWith(prefix) ? m.body.slice(prefix.length).split(' ')[0].toLowerCase() : '';
  const text = m.body.slice(prefix.length + cmd.length).trim();

  // Group command check
  if (!m.isGroup && ['balance', 'earn', 'spend', 'deposit', 'withdraw', 'transfer', 'daily', 'leaderboard', 'wallet', 'gold', 'earngold'].includes(cmd)) {
    return sendReply(m, "❌ This is a group-only command.");
  }

  if (cmd === 'balance') return checkBalance(m);
  if (cmd === 'earn' && text) return earnMoney(m, parseInt(text));
  if (cmd === 'spend' && text) return spendMoney(m, parseInt(text));
  if (cmd === 'deposit' && text) return depositMoney(m, parseInt(text));
  if (cmd === 'withdraw' && text) return withdrawMoney(m, parseInt(text));
  if (cmd === 'transfer' && text) {
    const [to, amountStr] = text.split(' ');
    return transferMoney(m, parseInt(amountStr), to);
  }
  if (cmd === 'daily') return claimDaily(m);
  if (cmd === 'leaderboard') return showLeaderboard(m);
  if (cmd === 'wallet') return showWallet(m);
  if (cmd === 'gold') return checkGold(m);
  if (cmd === 'earngold' && text) return earnGold(m, parseInt(text));
};

export default economy;