import { useParams } from 'react-router-dom';
import FemaleIcon from '@mui/icons-material/Female';
import MaleIcon from '@mui/icons-material/Male';
import patientService from '../../services/patients';
import { useEffect, useState } from 'react';
import { Patient } from '../../types';

function PatientInfo() {
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
      <div style={{ display: 'flex', alignItems: 'center', gap: '2rem' }}>
        <h2>{patient?.name}</h2>
        {patient?.gender === 'male' ? (
          <MaleIcon style={{ background: 'blue', fontSize: '30px' }} />
        ) : (
          <FemaleIcon style={{ background: 'blue', fontSize: '30px' }} />
        )}
      </div>
      <div>
        <p>
          <strong>ssh: </strong>
          {patient?.ssn}
        </p>
        <p>
          <strong>occupation: </strong>
          {patient?.occupation}
        </p>
      </div>
    </div>
  );
}

export default PatientInfo;
