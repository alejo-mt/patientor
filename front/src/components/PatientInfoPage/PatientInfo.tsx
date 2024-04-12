import FemaleIcon from '@mui/icons-material/Female';
import MaleIcon from '@mui/icons-material/Male';
import { Entry, EntryFormValues, HealthCheckEntry, Patient } from '../../types';
import {
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  Typography,
} from '@mui/material';
import PatientEntryContainer from './PatientEntry';
import AddEntryForm from './AddEntryForm';
import { useState } from 'react';

type PatientInfoProps = {
  patient: Patient;
  onSubmit: (payload: EntryFormValues) => void;
  error?: string;
};

function PatientInfo({ patient, onSubmit, error }: PatientInfoProps) {
  const [type, setType] = useState<HealthCheckEntry['type'] | string>('');

  const onTypeChange = (event: SelectChangeEvent<string>) => {
    setType(event.target.value);
  };

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
      <div style={{ marginBottom: '2rem' }}>
        <InputLabel style={{ marginBottom: '0.1rem' }} id='type_label'>
          <p>
            <strong>Add a new entry: </strong>
            Select a type of entry
          </p>
        </InputLabel>
        <Select
          labelId='type_label'
          fullWidth
          value={type}
          onChange={onTypeChange}
        >
          {[
            { label: 'Health Check', value: 'HealthCheck' },
            {
              label: 'Occupational Healthcare',
              value: 'OccupationalHealthcare',
            },
            { label: 'Hospital', value: 'Hospital' },
          ].map((option) => (
            <MenuItem key={option.label} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </Select>
      </div>
      {type !== '' && (
        <AddEntryForm
          onSubmit={onSubmit}
          error={error}
          type={type as Entry['type']}
        />
      )}
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
