const exchangeAuthCodeForTokenRequest = (code) => {
  return {
    url: "https://accounts.spotify.com/api/token",
    form: {
      code: code,
      redirect_uri: process.env.REDIRECT_URI,
      grant_type: "authorization_code",
    },
    headers: {
      "content-type": "application/x-www-form-urlencoded",
      Authorization:
        "Basic " +
        new Buffer.from(process.env.CLIENT_ID + ":" + process.env.CLIENT_SECRET).toString("base64"),
    },
    json: true,
  };
};

export default exchangeAuthCodeForTokenRequest;
