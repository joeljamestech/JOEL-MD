import config from '../../config.cjs';

let tttGames = {};

const ttt = async (m, sock) => {
  const from = m.from;
  const sender = m.sender;
  const prefix = config.PREFIX || ".";

  const cmd = m.body.startsWith(prefix)
    ? m.body.slice(prefix.length).split(' ')[0].toLowerCase()
    : "";

  if (cmd === "ttt") {
    if (!tttGames[from]) {
      tttGames[from] = {
        playerX: sender,
        playerO: null,
        board: ["1️⃣", "2️⃣", "3️⃣", "4️⃣", "5️⃣", "6️⃣", "7️⃣", "8️⃣", "9️⃣"],
        turn: "X",
      };
      return m.reply(`🎮 *Tic Tac Toe Created!*\n🕹️ *${sender}* started a game.\nWaiting for a second player...\nType *${prefix}ttt* to join!`);
    }

    const game = tttGames[from];
    if (!game.playerO && sender !== game.playerX) {
      game.playerO = sender;
      const boardText = drawBoard(game.board);
      return sock.sendMessage(from, {
        text: `✅ *Game Started!*\n${boardText}\n❌ *${game.playerX}* vs ⭕ *${game.playerO}*\n\n🔥 *${game.playerX}*'s (❌) turn!`
      });
    }

    return m.reply("⚠️ Game already started. Please wait your turn.");
  }

  // Reset command
  if (cmd === "resetgame") {
    if (tttGames[from]) {
      delete tttGames[from];
      return m.reply("♻️ *Tic Tac Toe game has been reset!*");
    } else {
      return m.reply("❌ No active game to reset.");
    }
  }

  // Ongoing game logic
  const game = tttGames[from];
  if (!game || !game.playerO) return;

  const validPlayers = [game.playerX, game.playerO];
  if (!validPlayers.includes(sender)) return;

  const move = m.body.trim();
  if (!/^[1-9]$/.test(move)) return;

  const pos = parseInt(move) - 1;
  if (game.board[pos] === "❌" || game.board[pos] === "⭕") {
    return m.reply("❌ That spot is already taken!");
  }

  const symbol = game.turn === "X" ? "❌" : "⭕";
  const currentPlayer = game.turn === "X" ? game.playerX : game.playerO;

  if (sender !== currentPlayer) {
    return m.reply("⏳ Not your turn!");
  }

  game.board[pos] = symbol;
  const boardText = drawBoard(game.board);

  const winner = checkWinner(game.board);
  if (winner) {
    await sock.sendMessage(from, {
      text: `🏁 *Game Over!*\n${boardText}\n🏆 Winner: *${currentPlayer}* (${symbol})`,
    });
    delete tttGames[from];
    return;
  }

  if (game.board.every(cell => cell === "❌" || cell === "⭕")) {
    await sock.sendMessage(from, {
      text: `🤝 *Draw!*\n${boardText}`,
    });
    delete tttGames[from];
    return;
  }

  game.turn = game.turn === "X" ? "O" : "X";
  const nextPlayer = game.turn === "X" ? game.playerX : game.playerO;
  const nextSymbol = game.turn === "X" ? "❌" : "⭕";

  await sock.sendMessage(from, {
    text: `🎮 *Next Turn!*\n${boardText}\n👉 *${nextPlayer}*'s (${nextSymbol}) move.`,
  });
};

function drawBoard(board) {
  return `

   ${board[0]}   •   ${board[1]}   •   ${board[2]}
   ———————————
   ${board[3]}   •   ${board[4]}   •   ${board[5]}
   ———————————
   ${board[6]}   •   ${board[7]}   •   ${board[8]}
`;
}

function checkWinner(b) {
  const winPatterns = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8],
    [0, 3, 6], [1, 4, 7], [2, 5, 8],
    [0, 4, 8], [2, 4, 6]
  ];
  for (const [a, b_, c] of winPatterns) {
    if (b[a] === b[b_] && b[b_] === b[c]) {
      return b[a];
    }
  }
  return null;
}

export default ttt;
