import config from '../../config.cjs';
import { playHandler } from '../../framework/joel.js';

const playCommand = async (m, sock) => {
  const prefix = config.PREFIX || '!';
  await playHandler(m, sock, prefix);
};

export default playCommand;
