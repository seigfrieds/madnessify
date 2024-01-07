import generateRandomString from "../utils/generateRandomString.js";
import exchangeAuthCodeForAccessToken from "../helpers/exchangeAuthCodeForAccessToken.js";
import cache from "../redis.js";
import { v4 as uuidv4 } from "uuid";
import jwt from "jsonwebtoken";

const login = (req, res) => {
  const state = generateRandomString(16);

  res.cookie(process.env.STATE_KEY, state);
  res.redirect(
    "https://accounts.spotify.com/authorize" +
      `?client_id=${process.env.CLIENT_ID}&redirect_uri=${process.env.REDIRECT_URI}&response_type=${process.env.RESPONSE_TYPE}&scope=${process.env.SCOPE}&state=${state}`
  );
};

const callback = async (req, res) => {
  const code = req.query.code || null;
  const state = req.query.state || null;
  const client_redirect = process.env.CLIENT_REDIRECT;

  if (!state) {
    return res.redirect(`${client_redirect}/#error=state_mismatch`);
  }

  res.clearCookie(process.env.STATE_KEY);

  const token = await exchangeAuthCodeForAccessToken(code);

  if (token) {
    const sessionId = uuidv4();
    const sessionJwt = jwt.sign({ session: sessionId }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    res.cookie("madnessifySession", sessionJwt, {
      httpOnly: true,
      sameSite: "lax",
      maxAge: 1000 * 60 * 60, //1000ms * 60s * 60m = 1h
      //secure: true,
      //signed: true,
    });

    cache.setex(sessionId, 60 * 60, token);

    return res.redirect(`${client_redirect}`);
  }

  res.redirect(`${client_redirect}/#error="invalid_token"`);
};

export { login, callback };
