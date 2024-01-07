import crypto from "crypto";

const generateRandomString = (length) => {
  return crypto.randomBytes(60).toString("hex").slice(0, length);
};

export default generateRandomString;
