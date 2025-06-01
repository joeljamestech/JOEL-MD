import config from '../../config.cjs';

const games = {};

const EMPTY = '⚪';
const RED = '🔴';
const YELLOW = '🟡';

const createBoard = () => Array(6).fill(null).map(() => Array(7).fill(EMPTY));

const drawBoard = board => board.map(row => row.join('')).join('\n');

const checkWin = (board, color) => {
  const directions = [
    [0, 1], [1, 0], [1, 1], [1, -1]
  ];

  for (let r = 0; r < 6; r++) {
    for (let c = 0; c < 7; c++) {
      if (board[r][c] !== color) continue;

      for (const [dr, dc] of directions) {
        let count = 0;
        for (let i = 0; i < 4; i++) {
          const nr = r + dr * i;
          const nc = c + dc * i;
          if (nr < 0 || nr >= 6 || nc < 0 || nc >= 7 || board[nr][nc] !== color) break;
          count++;
        }
        if (count === 4) return true;
      }
    }
  }
  return false;
};

const connectfour = async (m, sock) => {
  const prefix = config.PREFIX;
  const from = m.from;
  const sender = m.sender;

  const cmd = m.body.startsWith(prefix)
    ? m.body.slice(prefix.length).split(' ')[0].toLowerCase()
    : "";

  // Start game
  if (cmd === "connect4") {
    if (games[from]) return m.reply("⚠️ A Connect 4 game is already in progress.");
    games[from] = {
      board: createBoard(),
      players: [sender],
      turn: 0,
    };
    return m.reply(`🎮 *Connect 4 Started!*\nWaiting for a second player to type *${prefix}connect4* to join.`);
  }

  // Join game
  if (games[from] && cmd === "connect4" && !games[from].players.includes(sender)) {
    games[from].players.push(sender);
    return sock.sendMessage(from, {
      text: `✅ *2nd player joined!*\n${games[from].players[0]} (🔴) vs ${games[from].players[1]} (🟡)\n\nUse *${prefix}drop <1-7>* to play.\n${drawBoard(games[from].board)}`,
    });
  }

  // Drop piece
  if (cmd === "drop") {
    const col = parseInt(m.body.trim().split(" ")[1]) - 1;
    if (!games[from]) return;
    if (!games[from].players.includes(sender)) return;
    if (games[from].players.length < 2) return m.reply("⏳ Waiting for another player...");
    if (games[from].players[games[from].turn % 2] !== sender) return m.reply("⏳ Wait for your turn.");

    if (isNaN(col) || col < 0 || col > 6) return m.reply("❌ Invalid column. Use 1-7.");

    const board = games[from].board;
    let placed = false;

    for (let row = 5; row >= 0; row--) {
      if (board[row][col] === EMPTY) {
        board[row][col] = games[from].turn % 2 === 0 ? RED : YELLOW;
        placed = true;
        break;
      }
    }

    if (!placed) return m.reply("❌ Column is full.");

    const currentColor = games[from].turn % 2 === 0 ? RED : YELLOW;
    if (checkWin(board, currentColor)) {
      const winner = games[from].players[games[from].turn % 2];
      delete games[from];
      return sock.sendMessage(from, {
        text: `🏆 *${winner} wins with ${currentColor}*\n\n${drawBoard(board)}`
      });
    }

    games[from].turn++;
    return sock.sendMessage(from, {
      text: `🎮 *Turn: ${games[from].players[games[from].turn % 2]}*\n\n${drawBoard(board)}`
    });
  }

  // Reset game
  if (cmd === "reset4") {
    if (games[from]) {
      delete games[from];
      return m.reply("♻️ Connect 4 game reset.");
    } else {
      return m.reply("⚠️ No game to reset.");
    }
  }
};
//codes by lord joel 
export default connectfour;
