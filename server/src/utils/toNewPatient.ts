import { Gender, NewPatient } from "../types";

const toNewPatient = (payload: unknown): NewPatient => {
    // Check if it exists and if it is an object
    if (!payload || !(payload instanceof Object))
        throw Error("Missing or bad payload");

    // Check if it has the expected propeties
    if (
        !("name" in payload) ||
        !("dateOfBirth" in payload) ||
        !("ssn" in payload) ||
        !("gender" in payload) ||
        !("occupation" in payload)
    )
        throw Error("Missing payload properties");
    const { name, dateOfBirth, ssn, gender, occupation } = payload;

    // Check if the expected properties have the correct type
    if (!isString(name)) throw Error("`name` must to be an string");
    if (!isString(dateOfBirth))
        throw Error("`dateOfBirth` must to be an string");
    if (!isString(ssn)) throw Error("`ssn` must to be an string");
    if (!isString(gender)) throw Error("`gender` must to be an string");
    if (!isString(occupation)) throw Error("`occupation` must to be an string");

    // Check if some specific properties have the correct value
    if (!isGender(gender)) throw Error("`gender` must to be valid");

    const newPatient: NewPatient = {
        name: name,
        dateOfBirth: dateOfBirth,
        ssn: ssn,
        gender: gender,
        occupation: occupation,
    };

    return newPatient;
};

const isString = (value: unknown): value is string => {
    return typeof value === "string";
};

const isGender = (value: string): value is Gender => {
    const allowedGenders = ["male", "female", "others"];
    if (!allowedGenders.includes(value)) {
        return false;
    }
    return true;
};

export default toNewPatient;
