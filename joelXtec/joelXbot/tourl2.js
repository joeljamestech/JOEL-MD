import axios from "axios";
import FormData from "form-data";
import fs from "fs";
import os from "os";
import path from "path";

const IMGUR_CLIENT_ID = "51c547f88a81855"; // Your Imgur Client ID

const tourl = async (m, sock) => {
  const prefix = ".";
  const cmd = m.body.startsWith(prefix)
    ? m.body.slice(prefix.length).split(" ")[0].toLowerCase()
    : "";

  if (cmd === "url2") {
    try {
      if (!m.quoted || !m.quoted.message) {
        throw "*Please reply to an image or video!*";
      }

      // Detect media type
      const message = m.quoted.message;
      let mimeType = "";
      let mediaMessage;

      if (message.imageMessage) {
        mimeType = "image/jpeg"; // WhatsApp images are usually JPEG
        mediaMessage = message.imageMessage;
      } else if (message.videoMessage) {
        mimeType = "video/mp4"; // WhatsApp videos are MP4
        mediaMessage = message.videoMessage;
      } else if (message.stickerMessage) {
        mimeType = "image/webp"; // Stickers are WebP
        mediaMessage = message.stickerMessage;
      }

      if (!mediaMessage) {
        throw "*Please reply to a valid image or video!*";
      }

      // Download media
      const fileBuffer = await m.quoted.download();
      if (!fileBuffer || fileBuffer.length === 0) {
        throw "*Media download failed!*";
      }

      // Save media temporarily
      const fileExt = mimeType.includes("video") ? "mp4" : "jpg";
      const tempFilePath = path.join(os.tmpdir(), `sarkar_temp_media.${fileExt}`);
      fs.writeFileSync(tempFilePath, fileBuffer);

      // Upload media to Imgur
      const formData = new FormData();
      formData.append("image", fs.createReadStream(tempFilePath));

      const apiUrl = `https://api.imgur.com/3/upload`;
      const response = await axios.post(apiUrl, formData, {
        headers: {
          ...formData.getHeaders(),
          Authorization: `Client-ID ${IMGUR_CLIENT_ID}`,
        },
      });

      // Delete the temporary file
      fs.unlinkSync(tempFilePath);

      if (!response.data || !response.data.data || !response.data.data.link) {
        throw "Error uploading the media.";
      }

      const mediaUrl = response.data.data.link;
      const responseText = `*ᴊᴏᴇʟ xᴍᴅ ʙᴏᴛ ᴜʀʟ ᴍᴇɴᴜ*\n\n*URL:* ${mediaUrl}\n\n*ᴋᴇᴇᴘ ᴜsɪɴɢ  ᴊᴏᴇʟ xᴍᴅ*`;

      await sock.sendMessage(
        m.from,
        { text: responseText },
        { quoted: m }
      );
    } catch (error) {
      await sock.sendMessage(m.from, { text: `Error: ${error.message || error}` }, { quoted: m });
      console.log(error);
    }
  }
};

export default tourl;
