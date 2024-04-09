import { v1 as uuid } from "uuid";
import patientsData from "../../data/patients.data";
import {
    Entry,
    NewEntry,
    NewPatient,
    NonSensitivePatients,
    Patient,
} from "../types";

const getNonSensitivePatients = (): NonSensitivePatients[] => {
    // Infered type -> patient: Patient
    return patientsData.map((patient: Patient) => {
        const { id, name, dateOfBirth, gender, occupation } = patient;
        return { id, name, dateOfBirth, gender, occupation };
    });
};

const getById = (patientId: string): Patient => {
    const patient = patientsData.find((patient) => patient.id === patientId);
    if (!patient) throw Error("Patient not found");
    return patient;
};

const addPatient = (payload: NewPatient): Patient => {
    const id = uuid();
    const newPatient = { id, ...payload };
    patientsData.push(newPatient);
    return newPatient;
};

const addEntry = (patientId: string, payload: NewEntry): Entry => {
    const id = uuid();
    const patient = getById(patientId);
    patient.entries.push({ id, ...payload });
    return { id, ...payload };
};

export default { getNonSensitivePatients, addPatient, getById, addEntry };
