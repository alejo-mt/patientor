import { SyntheticEvent, useState } from 'react';
import {
  TextField,
  Button,
  Grid,
  Typography,
  Chip,
  Alert,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from '@mui/material';
import {
  EntryFormValues,
  Entry,
  HealthCheckRating,
  BaseEntry,
} from '../../types';

type AddEntryFormProps = {
  type: Entry['type'];
  onSubmit: (payload: EntryFormValues) => void;
  error?: string;
};

function AddEntryForm({ type, onSubmit, error }: AddEntryFormProps) {
  const [date, setDate] = useState('');
  const [description, setDescription] = useState('');
  const [specialist, setSpecialist] = useState('');
  const [diagnosisCodeInput, setDiagnosisCodeInput] = useState('');
  const [diagnosisCodes, setDiagnosisCodes] = useState<string[]>([]);

  const [healthCheckRating, setHealthCheckRating] = useState<number>(0);
  const [employerName, setEmployerName] = useState('');
  const [sickLeave, setSickLeave] = useState({
    startDate: '',
    endDate: '',
  });
  const [discharge, setDischarge] = useState({
    date: '',
    criteria: '',
  });

  const displayTypeValues = {
    HealthCheck: 'Health Check',
    OccupationalHealthcare: 'Occupational Healthcare',
    Hospital: 'Hospital',
  };

  const handleAddDiagnosisCode = () => {
    if (
      diagnosisCodeInput.trim() !== '' &&
      !diagnosisCodes.includes(diagnosisCodeInput)
    ) {
      setDiagnosisCodes([...diagnosisCodes, diagnosisCodeInput]);
      setDiagnosisCodeInput('');
    }
  };

  const handleRemoveDiagnosisCode = (code: string) => {
    setDiagnosisCodes(diagnosisCodes.filter((c) => c !== code));
  };

  const addNewEntry = (event: SyntheticEvent) => {
    event.preventDefault();
    const baseEntry: Omit<BaseEntry, 'id'> = {
      date,
      description,
      specialist,
      diagnosisCodes,
    };
    switch (type) {
      case 'HealthCheck':
        onSubmit({
          ...baseEntry,
          type,
          healthCheckRating,
        });
        break;
      case 'OccupationalHealthcare':
        onSubmit({
          ...baseEntry,
          type,
          employerName,
          sickLeave,
        });
        break;
      case 'Hospital':
        onSubmit({
          ...baseEntry,
          type,
          discharge,
        });
        break;

      default:
        break;
    }
  };

  return (
    <form onSubmit={addNewEntry}>
      {error && <Alert severity='error'>{error}</Alert>}
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Typography variant='h6'>{displayTypeValues[type]}</Typography>
        </Grid>

        <Grid item xs={12}>
          <InputLabel>Date</InputLabel>

          <TextField
            onChange={({ target }) => setDate(target.value)}
            value={date}
            type='date'
            fullWidth
            required
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            onChange={({ target }) => setDescription(target.value)}
            value={description}
            label='Description'
            fullWidth
            required
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            onChange={({ target }) => setSpecialist(target.value)}
            value={specialist}
            label='Specialist'
            fullWidth
            required
          />
        </Grid>
        <Grid item xs={12}>
          <Grid container spacing={1}>
            {diagnosisCodes.map((code) => (
              <Grid item key={code}>
                <Chip
                  label={code}
                  onDelete={() => handleRemoveDiagnosisCode(code)}
                />
              </Grid>
            ))}
          </Grid>
          <Grid container spacing={1} alignItems='center'>
            <Grid item>
              <TextField
                label='Add Diagnosis Code'
                value={diagnosisCodeInput}
                onChange={(e) => setDiagnosisCodeInput(e.target.value)}
              />
            </Grid>
            <Grid item>
              <Button variant='outlined' onClick={handleAddDiagnosisCode}>
                Add
              </Button>
            </Grid>
          </Grid>
        </Grid>
        {type === 'HealthCheck' && (
          <Grid item xs={12}>
            <FormControl fullWidth>
              <InputLabel id='healthCheckRatingLabel'>
                Health Check Rating
              </InputLabel>
              <Select
                labelId='healthCheckRatingLabel'
                value={healthCheckRating}
                onChange={(e) =>
                  setHealthCheckRating(
                    Number(e.target.value) as HealthCheckRating
                  )
                }
              >
                {Object.values([0, 1, 2, 3]).map((rating) => (
                  <MenuItem key={rating} value={rating}>
                    {rating}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
        )}
        {type === 'OccupationalHealthcare' && (
          <>
            <Grid item xs={12}>
              <TextField
                onChange={({ target }) => setEmployerName(target.value)}
                value={employerName}
                label='Employer'
                fullWidth
                required
              />
            </Grid>
            <Grid item xs={12}>
              <InputLabel>Sick Leave</InputLabel>
            </Grid>
            <Grid item container spacing={2}>
              <Grid item xs={6}>
                <InputLabel>Start date</InputLabel>
                <TextField
                  onChange={({ target }) =>
                    setSickLeave({ ...sickLeave, [target.name]: target.value })
                  }
                  value={sickLeave.startDate}
                  type='date'
                  fullWidth
                  name='startDate'
                />
              </Grid>
              <Grid item xs={6}>
                <InputLabel>End date</InputLabel>
                <TextField
                  onChange={({ target }) =>
                    setSickLeave({ ...sickLeave, [target.name]: target.value })
                  }
                  value={sickLeave.endDate}
                  type='date'
                  fullWidth
                  name='endDate'
                />
              </Grid>
            </Grid>
          </>
        )}
        {type === 'Hospital' && (
          <>
            <Grid item xs={12}>
              <InputLabel>Discharge</InputLabel>
            </Grid>
            <Grid item container spacing={2}>
              <Grid item xs={6}>
                <InputLabel>Date</InputLabel>
                <TextField
                  onChange={({ target }) =>
                    setDischarge({ ...discharge, [target.name]: target.value })
                  }
                  value={discharge.date}
                  type='date'
                  fullWidth
                  name='date'
                />
              </Grid>
              <Grid item xs={6}>
                <InputLabel>Criteria</InputLabel>
                <TextField
                  onChange={({ target }) =>
                    setDischarge({ ...discharge, [target.name]: target.value })
                  }
                  value={discharge.criteria}
                  type='text'
                  fullWidth
                  name='criteria'
                />
              </Grid>
            </Grid>
          </>
        )}

        <Grid item xs={12}>
          <Button type='submit' variant='contained' color='primary'>
            Submit
          </Button>
        </Grid>
      </Grid>
    </form>
  );
}
export default AddEntryForm;
