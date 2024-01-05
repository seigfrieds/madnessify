import express from "express";
import { getTopTracks, getPlaylistTracks } from "../controllers/spotify.controller.js";

const router = express.Router();

router.get("/getTopTracks", getTopTracks);
router.get("/getPlaylistTracks", getPlaylistTracks);

export default router;
