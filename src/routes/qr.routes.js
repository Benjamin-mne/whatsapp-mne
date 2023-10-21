import { Router } from "express";
import { qrController } from "../controller/qr.controllers.js";

export const qrRoutes = Router()

qrRoutes.get('/', qrController)