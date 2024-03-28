import express from "express";
import service from "../services/patients.service";

const router = express.Router();

router.get("/", (_req, res) => {
    const result = service.getNonSensitivePatients();
    res.json(result);
});

router.post("/", (_req, res) => {
    res.send("Saving a diary!");
});

export default router;
