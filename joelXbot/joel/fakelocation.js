import axios from "axios";
import { createRequire } from "module";
const require = createRequire(import.meta.url);
const config = require("../../config.cjs");

const locationCommand = async (m, gss) => {
  const prefix = config.PREFIX;
  const cmd = m.body.startsWith(prefix)
    ? m.body.slice(prefix.length).split(" ")[0].toLowerCase()
    : "";

  const validCommands = ["mylocation", "location"];

  if (validCommands.includes(cmd)) {
    const location = {
      degreesLatitude: -6.8000,
      degreesLongitude: 39.2833,
      name: "LIVE LOCATION",
      address: "Dar es Salaam, Tanzania",
    };

    await gss.sendMessage(
      m.from,
      {
        location: {
          degreesLatitude: location.degreesLatitude,
          degreesLongitude: location.degreesLongitude,
          name: location.name,
          address: location.address,
          jpegThumbnail: await getMapThumbnail(), // Static thumbnail from OpenStreetMap
        },
      },
      { quoted: m }
    );
  }
};

async function getMapThumbnail() {
  try {
    const mapUrl = `https://staticmap.openstreetmap.de/staticmap.php?center=-6.8000,39.2833&zoom=13&size=400x400&markers=-6.8000,39.2833,red`;
    const response = await axios.get(mapUrl, { responseType: "arraybuffer" });
    return Buffer.from(response.data, "binary").toString("base64");
  } catch (err) {
    console.error("Failed to load map thumbnail:", err);
    return null;
  }
}

export default locationCommand;
