import config from '../../config.cjs';

const pollCommand = async (m, Matrix) => {
  // Get the full message text (without any prefix handling)
  const text = m.body.trim();

  // Extract the command and the rest of the text
  const prefix = config.PREFIX; // Use the prefix from the config
  if (!text.startsWith(prefix)) return; // Ignore if the message doesn't start with the prefix

  const parts = text.slice(prefix.length).split(" "); // Remove prefix and split the rest of the message
  const cmd = parts[0].toLowerCase(); // Extract the command part

  if (cmd === 'poll') {
    // Remove the command word to get the poll content
    const rest = text.slice(prefix.length + cmd.length).trim();

    // Validate that there are at least two options
    if (!rest.includes('|')) {
      return m.reply("⚠️ Usage: *poll Question | Option1 | Option2 | Option3*");
    }

    let [question, ...options] = rest.split('|').map(t => t.trim());

    // Check for the minimum number of options
    if (options.length < 2) {
      return m.reply("⚠️ You need at least *two options* for a poll.");
    }

    // Check for empty options
    if (options.some(option => option === "")) {
      return m.reply("⚠️ All poll options must be non-empty.");
    }

    try {
      // Send the poll using the Matrix API
      await Matrix.sendMessage(m.from, {
        poll: {
          name: question,
          values: options
        }
      }, { quoted: m });

      // Confirm the poll creation
      m.reply(`✅ Poll created successfully! Question: *${question}* with options: *${options.join(", ")}*`);
    } catch (error) {
      console.error("Error sending poll:", error);
      m.reply("⚠️ An error occurred while creating the poll.");
    }
  }
};

export default pollCommand;
