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
const stateKey = "spotify_auth_state";

app.get("/oauth", (req, res) => {
  const state = generateRandomString(16);
  res.cookie(stateKey, state);

  res.redirect(
    "https://accounts.spotify.com/authorize" +
      `?client_id=${process.env.CLIENT_ID}&redirect_uri=${process.env.REDIRECT_URI}&response_type=${process.env.RESPONSE_TYPE}&scope=${process.env.SCOPE}&state=${state}`
  );
});

app.get("/oauth/callback", (req, res) => {
  const client_redirect = "http://localhost:3000/login";
  const code = req.query.code || null;
  const state = req.query.state || null;

  if (!state) {
    res.redirect(`${client_redirect}/#error=state_mismatch`);
  } else {
    res.clearCookie(stateKey);
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

        res.redirect(
          `${client_redirect}/#access_token=${access_token}&refresh_token=${refresh_token}`
        );
      } else {
        res.redirect(`${client_redirect}/#error="invalid_token"`);
      }
    });
  }
});

app.listen(port, () => {
  console.log(`Server started on localhost:${port}`);
});
