import { parseString, parseDate, parseGender } from "./parser";
import { NewPatient } from "../types";

const toNewPatient = (payload: unknown): NewPatient => {
    if (!payload || !(payload instanceof Object))
        throw Error("Missing or bad payload");

    if (
        !("name" in payload) ||
        !("dateOfBirth" in payload) ||
        !("ssn" in payload) ||
        !("gender" in payload) ||
        !("occupation" in payload)
    )
        throw Error("Incorrect data, some fields are missing");

    const newPatient: NewPatient = {
        name: parseString(payload.name),
        dateOfBirth: parseDate(payload.dateOfBirth),
        ssn: parseString(payload.ssn),
        gender: parseGender(payload.gender),
        occupation: parseString(payload.occupation),
        entries: [],
    };

    return newPatient;
};

export default toNewPatient;
