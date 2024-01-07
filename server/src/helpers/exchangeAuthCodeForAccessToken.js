import axios from "axios";

export const exchangeAuthCodeForAccessToken = async (code) => {
  const res = await axios.post(
    "https://accounts.spotify.com/api/token",
    {
      code: code,
      redirect_uri: process.env.REDIRECT_URI,
      grant_type: "authorization_code",
    },
    {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        Authorization:
          "Basic " +
          new Buffer.from(process.env.CLIENT_ID + ":" + process.env.CLIENT_SECRET).toString(
            "base64"
          ),
      },
    }
  );

  return res.data.access_token;
};

export default exchangeAuthCodeForAccessToken;
