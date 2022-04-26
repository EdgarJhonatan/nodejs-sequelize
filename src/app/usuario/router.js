import { Router } from "express";
import userCtrl from "./userCtr.js";

const router = Router();

router.get(`/getUser`, userCtrl.getUser);
export default router;
