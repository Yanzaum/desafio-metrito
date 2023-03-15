import { Router } from "express";

import * as ApiController from "../controllers/apiController";

const router = Router();

router.post("/vendas", ApiController.allSales);
router.get("/autenticar", ApiController.authentication);

export default router;
