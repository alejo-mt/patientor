import patientsData from "../../data/patients.data";
import { NonSensitivePatients } from "../types";

const getNonSensitivePatients = (): NonSensitivePatients[] => {
    return patientsData.map(
        ({ id, name, dateOfBirth, gender, occupation }) => ({
            id,
            name,
            dateOfBirth,
            gender,
            occupation,
        })
    );
};

const addPatient = (payload: unknown) => {
    return payload;
};
export default { getNonSensitivePatients, addPatient };
