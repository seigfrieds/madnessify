import jwt from "jsonwebtoken";
import redis from "../redis.js";

const auth = async (req, res, next) => {
  const madnessifyJwt = req.cookies.madnessifySession;

  if (!madnessifyJwt) {
    return res.status(400).json({ message: "Bad Request" });
  }

  jwt.verify(madnessifyJwt, process.env.JWT_SECRET, async (err, decoded) => {
    if (err) {
      res.clearCookie("madnessifySession");

      if (err.name === "TokenExpiredError") {
        return res.status(401).json({ message: "Unauthenticated" });
      }

      //JsonWebTokenError
      return res.status(400).json({ message: "Bad Request" });
    }

    const session = decoded.session;

    const validSession = await redis.get(session);

    if (validSession) {
      req.session = session;
      next();
      return;
    }
    return res.status(401).json({ message: "Unauthorized" });
  });
};

export default auth;
