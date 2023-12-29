import express from "express";
import dotenv from "dotenv";
import request from "request";
import cors from "cors";
import crypto from "crypto";

dotenv.config();

const port = process.env.PORT || 5000;
const app = express();
app.use(cors());

app.get("/api", (req, res) => {
  res.send("HELLO!");
});

const generateRandomString = (length) => {
  return crypto.randomBytes(60).toString("hex").slice(0, length);
};

app.get("/oauth/login", (req, res) => {
  const state = generateRandomString(16);

  res.cookie(process.env.STATE_KEY, state);
  res.redirect(
    "https://accounts.spotify.com/authorize" +
      `?client_id=${process.env.CLIENT_ID}&redirect_uri=${process.env.REDIRECT_URI}&response_type=${process.env.RESPONSE_TYPE}&scope=${process.env.SCOPE}&state=${state}`
  );
});

app.get("/oauth/callback", (req, res) => {
  const code = req.query.code || null;
  const state = req.query.state || null;
  const client_redirect = process.env.CLIENT_REDIRECT;

  if (!state) {
    res.redirect(`${client_redirect}/#error=state_mismatch`);
  } else {
    res.clearCookie(process.env.STATE_KEY);
    var authOptions = {
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
          new Buffer.from(process.env.CLIENT_ID + ":" + process.env.CLIENT_SECRET).toString(
            "base64"
          ),
      },
      json: true,
    };

    request.post(authOptions, (err, response, body) => {
      if (!err && response.statusCode === 200) {
        const access_token = body.access_token;
        const refresh_token = body.refresh_token;

        res.cookie("spotifyToken", access_token);
        res.cookie("refreshToken", refresh_token);

        res.redirect(`${client_redirect}`);
      } else {
        res.redirect(`${client_redirect}/#error="invalid_token"`);
      }
    });
  }
});

app.listen(port, () => {
  console.log(`Server started on localhost:${port}`);
});
