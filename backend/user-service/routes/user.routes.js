import express from "express";
import protectRoute from "../middleware/protectRoute.js";
import { getUsersForSidebar } from "../controllers/user.controller.js";

const router = express.Router();

router.get("/", protectRoute, getUsersForSidebar); //la funzione getUsersForSidebar si chiama quando l'utente nell'interfaccia grafica lo clicchiamo 

export default router;
