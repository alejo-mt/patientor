import express from "express";
import service from "../services/patients.service";

const router = express.Router();

router.get("/", (_req, res) => {
    const result = service.getNonSensitivePatients();
    res.json(result);
});

router.post("/", (req, res) => {
    const { body } = req;
    const result = service.addPatient(body);
    res.json(result);
});

export default router;
