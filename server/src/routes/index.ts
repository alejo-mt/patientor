import express from "express";
import diagnosesRouter from "./diagnoses.router";
import patientsRouter from "./patients.router";
const router = express.Router();

const api = `/api`;

router.use(`${api}/diagnoses`, diagnosesRouter);
router.use(`${api}/patients`, patientsRouter);
router.use(`${api}/*`, (_req, res) =>
    res.status(404).json("No API route found")
);
router.use(api, (_req, res) =>
    res.status(404).json("Welcome to ecommerce API")
);

export default router;
