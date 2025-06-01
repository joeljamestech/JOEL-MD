
import config from '../../config.cjs';

const wcgGames = {};

const wcg = async (m, sock) => {
  const from = m.from;
  const sender = m.sender;
  const prefix = config.PREFIX || ".";

  const cmd = m.body.startsWith(prefix)
    ? m.body.slice(prefix.length).split(' ')[0].toLowerCase()
    : "";

  // Start WCG game
  if (cmd === "wcg") {
    if (wcgGames[from]) {
      return m.reply("⚠️ A game is already in progress!\nType your number guess (1-20) to play.");
    }

    const number = Math.floor(Math.random() * 20) + 1;
    wcgGames[from] = { number, attempts: {}, startedBy: sender };

    return m.reply(`🎯 *WCG Game Started!*\nGuess a number between *1 - 20*.\nEach player has *15 chances*! Type a number to play.`);
  }

  // Reset WCG game
  if (cmd === "resetwcg") {
    if (wcgGames[from]) {
      delete wcgGames[from];
      return m.reply("♻️ *WCG game has been reset!*");
    } else {
      return m.reply("❌ No active WCG game to reset.");
    }
  }

  // Ongoing game logic
  const game = wcgGames[from];
  if (!game) return;

  const guess = parseInt(m.body.trim());
  if (isNaN(guess) || guess < 1 || guess > 20) return;

  // Track attempts
  if (!game.attempts[sender]) {
    game.attempts[sender] = { guesses: [], count: 0 };
  }

  if (game.attempts[sender].count >= 15) {
    return m.reply("❌ You've used all 15 guesses! Wait for others or reset the game.");
  }

  game.attempts[sender].count++;
  game.attempts[sender].guesses.push(guess);

  if (guess === game.number) {
    delete wcgGames[from];
    return sock.sendMessage(from, {
      text: `🏆 *Correct!* ${sender} guessed the number *${guess}* in ${game.attempts[sender].count} tries!`,
    });
  } else {
    return m.reply(`❌ ${guess} is wrong! (${15 - game.attempts[sender].count} guesses left)`);
  }
};
//codes by lord joel 
export default wcg;
