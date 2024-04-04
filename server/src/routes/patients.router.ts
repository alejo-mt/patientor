import express from "express";
import service from "../services/patients.service";
import toNewPatient from "../utils/toNewPatient";

const router = express.Router();

router.get("/", (_req, res) => {
    const result = service.getNonSensitivePatients();
    res.json(result);
});
router.get("/:id", (req, res) => {
    const { id } = req.params;
    const result = service.getById(id);
    res.json(result);
});
router.post("/", (req, res) => {
    try {
        const payload = req.body as unknown;
        const newPatient = toNewPatient(payload);
        const result = service.addPatient(newPatient);
        return res.json(result);
    } catch (error: unknown) {
        let message = `Someting went wrong: `;
        if (error instanceof Error) {
            console.log("error.message", error.message);
            message += error.message;
        }
        return res.status(400).json({
            error: message,
        });
    }
});

export default router;
