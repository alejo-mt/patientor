import { useState } from 'react';
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
import { EntryFormValues, HealthCheckRating } from '../../types';

type AddEntryFormProps = {
  onSubmit: (payload: EntryFormValues) => void;
  error?: string;
};

function AddEntryForm({ onSubmit, error }: AddEntryFormProps) {
  const type = 'HealthCheck';
  const [date, setDate] = useState('');
  const [description, setDescription] = useState('');
  const [specialist, setSpecialist] = useState('');
  const [diagnosisCodeInput, setDiagnosisCodeInput] = useState('');
  const [diagnosisCodes, setDiagnosisCodes] = useState<string[]>([]);

  const [healthCheckRating, setHealthCheckRating] = useState<number>(0);

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

  const addNewEntry = () => {
    onSubmit({
      date,
      description,
      specialist,
      type,
      diagnosisCodes,
      healthCheckRating,
    });
  };

  return (
    <form onSubmit={addNewEntry}>
      {error && <Alert severity='error'>{error}</Alert>}
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Typography variant='h6'>Health Check Entry</Typography>
        </Grid>

        <Grid item xs={12}>
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
