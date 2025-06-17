import { Router } from "express";
import { createRol } from "../controllers/rol.controller";

const router = Router();

router.post("/create-rol", createRol);

export default router;