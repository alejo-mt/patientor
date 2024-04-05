import FemaleIcon from '@mui/icons-material/Female';
import MaleIcon from '@mui/icons-material/Male';
import { Patient } from '../../types';
import { Typography } from '@mui/material';
import PatientEntryContainer from './PatientEntry';

type PatientInfoProps = { patient: Patient };

function PatientInfo({ patient }: PatientInfoProps) {
  return (
    <>
      <div style={{ display: 'flex', alignItems: 'center', gap: '2rem' }}>
        <Typography variant='h4' style={{ marginBottom: '0.5em' }}>
          {patient.name}
        </Typography>
        {patient.gender === 'male' ? (
          <MaleIcon style={{ background: 'blue', fontSize: '30px' }} />
        ) : (
          <FemaleIcon style={{ background: '#FF69B4', fontSize: '30px' }} />
        )}
      </div>
      <div>
        <p>
          <strong>ssh: </strong>
          {patient.ssn}
        </p>
        <p>
          <strong>occupation: </strong>
          {patient.occupation}
        </p>
      </div>
      <Typography variant='h5' style={{ marginBottom: '0.5em' }}>
        Entries
      </Typography>
      {patient.entries.map((entry) => (
        <PatientEntryContainer key={entry.id} entry={entry} />
      ))}
    </>
  );
}

export default PatientInfo;
