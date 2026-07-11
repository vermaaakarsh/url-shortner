import { Router } from "express";
import healthRoutes from "./health";
import urlRoutes from "./url";

const router: Router = Router();

router.use("/health", healthRoutes);
router.use("/", urlRoutes);

export default router;
