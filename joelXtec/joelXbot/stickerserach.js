import axios from 'axios';

// Your Tenor API key
const tenorApiKey = "AIzaSyCyouca1_KKy4W_MG1xsPzuku5oa8W358c"; // Replace with your actual Tenor API key

// Sticker search function
const stickerSearch = async (query) => {
  try {
    // Making the request to the Tenor API with the provided search query
    const response = await axios.get('https://api.tenor.com/v1/search', {
      params: {
        key: tenorApiKey,  // Your Tenor API key
        q: query,          // The search query (e.g., 'cat', 'dog')
        limit: 10,         // Limiting the number of results to 10
        media_filter: 'minimal', // Optional: 'minimal' media filter
      },
    });

    // Get the results from the Tenor API response
    const results = response.data.results;

    // Check if there are any results
    if (results.length > 0) {
      // Map the results to include sticker URLs along with the pack name and author
      const stickers = results.slice(0, 5).map((item) => ({
        url: item.media[0].gif.url,  // The sticker URL
        pack_name: 'Joel',           // The pack name
        pack_author: 'xmd',          // The author of the pack
      }));
      
      return stickers;  // Return the sticker details with pack name and author
    } else {
      return [{ message: 'No stickers found for this query.' }];  // Return a message if no stickers are found
    }
  } catch (error) {
    // Log any errors and return a default error message
    console.error('Error fetching stickers from Tenor API:', error);
    return [{ message: 'An error occurred while fetching stickers.' }];
  }
};

// Export the stickerSearch function so it can be used elsewhere
export default stickerSearch;
