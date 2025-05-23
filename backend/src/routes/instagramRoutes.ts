import express from "express";
import { InstagramController } from "../controllers/instagramController";

const router = express.Router();
const instagramController = new InstagramController();


router.get("/followers/:username", instagramController.getFollowers);
router.get("/followers-count/:username", instagramController.getFollowersCount);

export default router;
