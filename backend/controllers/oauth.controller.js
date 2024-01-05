import crypto from "crypto";
import request from "request";
import redis from "../redis.js";
import { v4 as uuidv4 } from "uuid";
import jwt from "jsonwebtoken";

const generateRandomString = (length) => {
  return crypto.randomBytes(60).toString("hex").slice(0, length);
};

const login = (req, res) => {
  const state = generateRandomString(16);

  res.cookie(process.env.STATE_KEY, state);
  res.redirect(
    "https://accounts.spotify.com/authorize" +
      `?client_id=${process.env.CLIENT_ID}&redirect_uri=${process.env.REDIRECT_URI}&response_type=${process.env.RESPONSE_TYPE}&scope=${process.env.SCOPE}&state=${state}`
  );
};

const callback = (req, res) => {
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
        const session = uuidv4();
        const token = jwt.sign({ session: session }, process.env.JWT_SECRET, { expiresIn: "1h" });

        redis.set(session, body.access_token);

        res.cookie("madnessifySession", token, {
          httpOnly: true,
          sameSite: "lax",
          maxAge: 1000 * 60 * 60, //1000ms * 60s * 60m = 1h
          //secure: true,
          //signed: true,
        });
        res.cookie("spotifyToken", body.access_token, { maxAge: 1000 * 60 * 60 });

        res.redirect(`${client_redirect}`);
      } else {
        res.redirect(`${client_redirect}/#error="invalid_token"`);
      }
    });
  }
};

export { login, callback };
