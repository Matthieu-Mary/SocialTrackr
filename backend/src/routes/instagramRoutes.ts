import express from "express";
import { InstagramController } from "../controllers/instagramController";

const router = express.Router();
const instagramController = new InstagramController();

router.get("/followers/:username", instagramController.getFollowers);

export default router;
