import { Router } from "express";
import {
  generateShortUrlController,
  activateShortUrlController,
  deactivateShortUrlController,
  deleteShortUrlController,
  getOriginalUrlController,
} from "../controllers/url";
import { asyncHandler } from "../utils/asyncHandler";

const router: Router = Router();

router.post("/url", asyncHandler(generateShortUrlController));
router.patch("/:shortCode/activate", asyncHandler(activateShortUrlController));
router.patch(
  "/:shortCode/deactivate",
  asyncHandler(deactivateShortUrlController),
);
router.delete("/:shortCode", asyncHandler(deleteShortUrlController));
router.get("/:shortCode", asyncHandler(getOriginalUrlController));

export default router;
