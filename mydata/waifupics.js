import axios from 'axios'; // You need axios for making HTTP requests

// Function to fetch a random waifu image from the waifu.pics API
export const getWaifuImage = async () => {
  try {
    const response = await axios.get('https://api.waifu.pics/sfw/waifu');
    return response.data.url; // Return the URL of the image
  } catch (error) {
    console.error('Error fetching waifu image:', error);
    return null;
  }
};
