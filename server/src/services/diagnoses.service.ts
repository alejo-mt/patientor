import diagnosesData from "../../data/diagnoses.data";
import { Diagnosis } from "../types";

const getAll = (): Diagnosis[] => {
    return diagnosesData;
};
export default { getAll };
