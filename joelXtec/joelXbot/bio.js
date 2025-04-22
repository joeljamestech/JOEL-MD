import fs from 'fs';

import config from '../../config.cjs';

// For global intervals tracking

const intervals = {}; 

const startTime = Date.now(); // Store bot start time

// Helper function to format uptime into "days, hours, minutes, seconds"

const getUptime = () => {

  const totalSeconds = Math.floor((Date.now() - startTime) / 1000);

  const days = Math.floor(totalSeconds / 86400);

  const hours = Math.floor((totalSeconds % 86400) / 3600);

  const minutes = Math.floor((totalSeconds % 3600) / 60);

  const seconds = totalSeconds % 60;

  return `${days}d ${hours}h ${minutes}m ${seconds}s`;

};

// Helper function to get a random quote

const getRandomQuote = () => {

  const randomQuotes = [

    "The best way to predict the future is to create it.",

    "Success is not final, failure is not fatal: It is the courage to continue that counts.",

    "Believe you can and you're halfway there.",

    "Don't watch the clock; do what it does. Keep going.",

    "Hardships often prepare ordinary people for an extraordinary destiny.",

    "Your time is limited, don't waste it living someone else's life.",

    "The only way to do great work is to love what you do.",

    "Success usually comes to those who are too busy to be looking for it.",

    "The only limit to our realization of tomorrow is our doubts of today.",

    "It always seems impossible until it's done."

  ];

  return randomQuotes[Math.floor(Math.random() * randomQuotes.length)];

};

// Function to update Bio with custom uptime and random quote

const updateBio = async (Matrix) => {

  const uptime = getUptime(); // Calculate uptime using custom function

  const randomQuote = getRandomQuote();

  const newBio = `ʝσєℓ χ∂ ν⁷ ιѕ αℓινє ƒяσм ${uptime} | qυσтє: "${randomQuote}"`;

  try {

    await Matrix.updateProfileStatus(newBio);

    console.log("Bio updated successfully:", newBio);

  } catch (error) {

    console.error("Failed to update bio:", error);

  }

};

const autobioCommand = async (m, Matrix) => {

  // Check if AUTO_BIO is enabled in the config

  if (config.AUTO_BIO) {

    if (!intervals['autobio']) {

      intervals['autobio'] = setInterval(() => updateBio(Matrix), 60000); // Update every minute

      console.log("Auto-Bio updates enabled.");

    }

  } else {

    // If AUTO_BIO is false, clear the interval

    if (intervals['autobio']) {

      clearInterval(intervals['autobio']);

      delete intervals['autobio'];

      console.log("Auto-Bio updates disabled.");

    }

  }

};

export default autobioCommand;