// I'm joel Xmd bot 
import axios from "axios";

export const fetchCoupleDP = async () => {
  const API_URL = "https://api.nexoracle.com/wallpapers/couple-dps?apikey=33241c3a8402295fdc";
  const { data } = await axios.get(API_URL);

  if (!data?.result?.male || !data?.result?.female) {
    throw new Error("Invalid response from couple DP API.");
  }

  return {
    male: data.result.male,
    female: data.result.female
  };
};
