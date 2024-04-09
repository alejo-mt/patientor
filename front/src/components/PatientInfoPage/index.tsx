import { useParams } from 'react-router-dom';
import patientService from '../../services/patients';
import { useEffect, useState } from 'react';
import { EntryFormValues, Patient } from '../../types';
import PatientInfo from './PatientInfo';
import axios from 'axios';

function PatientInfoPage() {
  const [patient, setPatient] = useState<Patient | null>(null);
  const [error, setError] = useState<string | undefined>();
  const { id } = useParams();

  useEffect(() => {
    const fetchPatient = async () => {
      const data = await patientService.getById(id as string);
      setPatient(data);
    };
    fetchPatient();
  }, [id]);

  const submitNewEntry = async (payload: EntryFormValues) => {
    try {
      if (patient) {
        const result = await patientService.createEntry(payload, patient.id);
        patient.entries = patient.entries.concat(result);
        setPatient(patient);
      }
    } catch (e: unknown) {
      console.error(e);
      if (axios.isAxiosError(e)) {
        if (e?.response?.data && typeof e?.response?.data === 'string') {
          const message = e.response.data.replace(
            'Something went wrong. Error: ',
            ''
          );
          console.error(message);
          setError(message);
        } else {
          setError('Unrecognized axios error');
        }
      } else {
        console.error('Unknown error', e);
        setError('Unknown error');
      }
    }
  };

  return (
    <div>
      {patient ? (
        <PatientInfo
          patient={patient}
          onSubmit={submitNewEntry}
          error={error}
        />
      ) : (
        <>No patient info</>
      )}
    </div>
  );
}

export default PatientInfoPage;
