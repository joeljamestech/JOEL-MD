
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
import fetch from 'node-fetch';

const chatbotCommand = async (m, Matrix) => {
    const text = m.message?.conversation || m.message?.extendedTextMessage?.text || null; // Extract text
    const senderId = m.key.remoteJid; // This gives the full sender ID (including @s.whatsapp.net)
    const senderName = m.pushName || `User ${senderId}`; // Default to 'User <senderId>' if pushName is not available

    // Get the owner's phone number from config
    const ownerNumber = `${config.OWNER_NUMBER}@s.whatsapp.net`; // Construct full ID for owner number

    // Chatbot configuration
    const isChatbotEnabled = config.CHAT_BOT ?? true; // Enable/disable chatbot, with default fallback
    const chatbotMode = config.CHAT_BOT_MODE ?? 'public'; // 'private' or 'public', with default fallback
    const privateUsers = new Set(config.PRIVATE_USERS || []); // Using Set for faster lookup in private mode

    // Ignore all messages if chatbot is disabled
    if (!isChatbotEnabled) {
        console.log('Chatbot is disabled via config. Ignoring message.');
        return;
    }

    // Ignore all owner messages globally
    if (senderId === ownerNumber) {
        console.log('Owner message ignored.');
        return;
    }

    // Ignore group, broadcast, and newsletter messages
    if (senderId.endsWith('@g.us') || senderId === 'status@broadcast' || senderId.includes('@newsletter')) {
        console.log('Group, broadcast, or newsletter message ignored.');
        return;
    }

    // Private mode: Process only specific users
    if (chatbotMode === 'private' && !privateUsers.has(senderId)) {
        console.log(`Message from unauthorized user ignored in private mode: ${senderId}`);
        return;
    }

    // If there is no message text, return
    if (!text) {
        console.log('No valid message found to process.');
        return;
    }

    // Process user messages and fetch response from the API
    try {
        const userMessage = text;

        // Make the API call to the chatbot service
        const response = await fetch(`https://api.paxsenix.biz.id/ai/gemini-realtime?text=${encodeURIComponent(userMessage)}&session_id=ZXlKaklqb2lZMTg0T0RKall6TTNNek13TVdFNE1qazNJaXdpY2lJNkluSmZNbU01TUdGa05ETmtNVFF3WmpNNU5pSXNJbU5vSWpvaWNtTmZZVE16TURWaE1qTmpNR1ExTnpObFl5Sjk`);

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const responseData = await response.json();
        const joelReply = responseData.message || 'Oops! I couldn’t quite catch that 😅. Can you try again?';
        
        // Adding a cute message format with extra charm and emojis
        const formattedReply = `${joelReply}`;

        // Send the AI response to the user
        await Matrix.sendMessage(senderId, { text: formattedReply }, { quoted: m });

    } catch (err) {
        console.error('Error fetching AI response:', err.message);
        await Matrix.sendMessage(senderId, { text: '❌ Oh no, something went wrong. Please try again later! 💔' }, { quoted: m });
    }
};
// codes by lord joel 
export default chatbotCommand;
    
//https://api.paxsenix.biz.id/ai/gemini-realtime?text=remember%20my%20name%20&session_id=ZXlKaklqb2lZMTg0T0RKall6TTNNek13TVdFNE1qazNJaXdpY2lJNkluSmZNbU01TUdGa05ETmtNVFF3WmpNNU5pSXNJbU5vSWpvaWNtTmZZVE16TURWaE1qTmpNR1ExTnpObFl5Sjk
