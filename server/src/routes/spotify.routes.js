import express from "express";
import {
  getTopTracks,
  getPlaylistTracks,
  searchTracks,
} from "../controllers/spotify.controller.js";

const router = express.Router();

router.get("/getTopTracks", getTopTracks);
router.get("/getPlaylistTracks", getPlaylistTracks);
router.get("/searchTracks", searchTracks);

export default router;
