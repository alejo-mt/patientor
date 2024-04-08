import {
    parseString,
    parseDate,
    parseDiagnosisCodes,
    parseHealthCheckRating,
    parseSickLeave,
} from "./parser";
import { NewEntry } from "../types";

const toNewEntry = (payload: unknown): NewEntry => {
    if (!payload || !(payload instanceof Object))
        throw Error("Missing or bad payload");

    if (
        !("date" in payload) ||
        !("description" in payload) ||
        !("specialist" in payload) ||
        !("type" in payload)
    )
        throw Error("Incorrect data, some fields are missing");

    const baseNewEntry = {
        date: parseDate(payload.date),
        specialist: parseString(payload.specialist),
        diagnosisCodes: parseDiagnosisCodes(payload),
        description: parseString(payload.description),
    };

    switch (payload.type) {
        case "Hospital":
            if (
                !("discharge" in payload) ||
                !(payload.discharge instanceof Object) ||
                !("date" in payload.discharge) ||
                !("criteria" in payload.discharge)
            )
                throw Error(
                    `Incorrect data, some fields are missing in ${payload.type} type`
                );

            return {
                ...baseNewEntry,
                type: payload.type,
                discharge: {
                    date: parseDate(payload.discharge.date),
                    criteria: parseString(payload.discharge.criteria),
                },
            };
            break;
        case "HealthCheck":
            if (!("healthCheckRating" in payload))
                throw Error(
                    `Incorrect data, some fields are missing in ${payload.type} type`
                );

            return {
                ...baseNewEntry,
                type: payload.type,
                healthCheckRating: parseHealthCheckRating(
                    payload.healthCheckRating
                ),
            };
            break;
        case "OccupationalHealthcare":
            if (!("employerName" in payload))
                throw Error(
                    `Incorrect data, some fields are missing in ${payload.type} type`
                );

            return {
                ...baseNewEntry,
                type: payload.type,
                employerName: parseString(payload.employerName),
                sickLeave: parseSickLeave(payload),
            };
            break;

        default:
            throw Error(`Unknown type: ${payload.type}`);
            break;
    }
};

export default toNewEntry;
