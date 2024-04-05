import { useParams } from 'react-router-dom';
import patientService from '../../services/patients';
import { useEffect, useState } from 'react';
import { Patient } from '../../types';
import PatientInfo from './PatientInfo';

function PatientInfoPage() {
  const [patient, setPatient] = useState<Patient | null>(null);
  const { id } = useParams();

  useEffect(() => {
    const fetchPatient = async () => {
      const data = await patientService.getById(id as string);
      console.log('data', data);
      setPatient(data);
    };
    fetchPatient();
  }, [id]);

  return (
    <div>
      {patient ? <PatientInfo patient={patient} /> : <>No patient info</>}
    </div>
  );
}

export default PatientInfoPage;
