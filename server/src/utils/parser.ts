import {
    Diagnosis,
    Gender,
    HealthCheckRating,
    OccupationalHealthcareEntry,
} from "../types";

const parseString = (value: unknown): string => {
    if (!isString(value)) throw Error(`Incorrect or missing value: ${value}`);
    return value;
};

const parseDate = (value: unknown) => {
    if (!isString(value) || !isDate(value))
        throw Error(`Incorrect or missing date: ${value}`);
    return value;
};

const parseGender = (value: unknown) => {
    if (!isString(value) || !isGender(value))
        throw Error(`Incorrect or missing gender: ${value}`);
    return value;
};

const parseDiagnosisCodes = (payload: object): Array<Diagnosis["code"]> => {
    if (!("diagnosisCodes" in payload) || !isArray(payload.diagnosisCodes))
        return [];
    return payload.diagnosisCodes as Array<Diagnosis["code"]>;
};

const parseHealthCheckRating = (value: unknown): HealthCheckRating => {
    if (!isString(value) || !(value in HealthCheckRating))
        throw Error(`Incorrect or missing health rating: ${value}`);

    const rating: HealthCheckRating =
        HealthCheckRating[value as keyof typeof HealthCheckRating];
    if (rating === undefined) {
        throw Error(`Invalid health rating: ${value}`);
    }

    return rating;
};

const parseSickLeave = (
    payload: object
): OccupationalHealthcareEntry["sickLeave"] => {
    if (
        !("sickLeave" in payload) ||
        !(payload.sickLeave instanceof Object) ||
        !("startDate" in payload.sickLeave) ||
        !("endDate" in payload.sickLeave)
    )
        throw Error("Incorrect or missing sick leave payload");

    return payload.sickLeave as OccupationalHealthcareEntry["sickLeave"];
};

const isArray = (value: unknown): value is [] => {
    if (value instanceof Array) return true;
    return false;
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
export {
    parseString,
    parseDate,
    parseGender,
    parseDiagnosisCodes,
    parseHealthCheckRating,
    parseSickLeave,
};
