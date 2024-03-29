import { v1 as uuid } from "uuid";
import patientsData from "../../data/patients.data";
import { NewPatient, NonSensitivePatients, Patient } from "../types";

const getNonSensitivePatients = (): NonSensitivePatients[] => {
    // Infered type -> patient: Patient
    return patientsData.map((patient: Patient) => {
        const { id, name, dateOfBirth, gender, occupation } = patient;
        return { id, name, dateOfBirth, gender, occupation };
    });
};

const addPatient = (payload: NewPatient): Patient => {
    const id = uuid();
    const newPatient = { id, ...payload };
    return newPatient;
};

export default { getNonSensitivePatients, addPatient };
