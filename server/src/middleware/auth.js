import jwt from "jsonwebtoken";
import cache from "../redis.js";

const auth = async (req, res, next) => {
  const sessionCookie = req.cookies.madnessifySession;

  if (!sessionCookie) {
    return res.status(400).json({ message: "Bad Request" });
  }

  jwt.verify(sessionCookie, process.env.JWT_SECRET, async (err, payload) => {
    if (err) {
      res.clearCookie("madnessifySession");
      return res.status(401).json({ message: err.message });
    }

    //check if session uuid is in the cache
    const validSession = await cache.get(payload.session);

    if (validSession) {
      req.session = payload.session;
      next();
      return;
    } else {
      res.clearCookie("madnessifySession");
      return res.status(401).json({ message: "Unauthorized" });
    }
  });
};

export default auth;
