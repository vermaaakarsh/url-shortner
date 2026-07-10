import express from "express";
import {
  generateShortUrlController,
  activateShortUrlController,
  deactivateShortUrlController,
  deleteShortUrlController,
  getOriginalUrlController,
} from "../controllers/url";

const router: express.Router = express.Router();

router.post("/url", generateShortUrlController);
router.patch("/:shortCode/activate", activateShortUrlController);
router.patch("/:shortCode/deactivate", deactivateShortUrlController);
router.delete("/:shortCode", deleteShortUrlController);
router.get("/:shortCode", getOriginalUrlController);

export default router;
