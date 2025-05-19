import express from "express";
import {
  getUserProfile,
  getTopTracks,
  getPlaylistTracks,
  searchTracks,
  searchAlbums,
} from "../controllers/spotify.controller.js";

const router = express.Router();

router.get("/getUserProfile", getUserProfile);
router.get("/getTopTracks", getTopTracks);
router.get("/getPlaylistTracks", getPlaylistTracks);
router.get("/searchTracks", searchTracks);
router.get("/searchAlbums", searchAlbums);

export default router;
