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
export default { getNonSensitivePatients };
