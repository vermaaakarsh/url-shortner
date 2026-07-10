import express from "express";
import {
  generateShortUrlController,
  getOriginalUrlController,
} from "../controllers/url";

const router: express.Router = express.Router();

router.post("/url", generateShortUrlController);
router.get("/:shortCode", getOriginalUrlController);

export default router;
