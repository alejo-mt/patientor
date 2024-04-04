import { Gender, NewPatient } from "../types";

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

const parseString = (value: unknown): string => {
    if (!isString(value)) throw Error(`Incorrect or missing value: ${value}`);
    return value;
};

const parseGender = (value: unknown) => {
    if (!isString(value) || !isGender(value))
        throw Error(`Incorrect or missing gender: ${value}`);
    return value;
};

const parseDate = (value: unknown) => {
    if (!isString(value) || !isDate(value))
        throw Error(`Incorrect or missing date: ${value}`);
    return value;
};

const isString = (text: unknown): text is string => {
    return typeof text === "string";
};

const isDate = (date: string): boolean => {
    return Boolean(Date.parse(date));
};

const isGender = (value: string): value is Gender => {
    if (
        !Object.values(Gender)
            .map((v) => v.toString())
            .includes(value)
    ) {
        return false;
    }
    return true;
};

export default toNewPatient;
