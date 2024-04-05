import { useEffect, useState } from 'react';
import {
  Diagnosis,
  Entry,
  HealthCheckEntry,
  HospitalEntry,
  OccupationalHealthcareEntry,
} from '../../types';
import diagnosesService from '../../services/diagnoses';
import LocalHospitalIcon from '@mui/icons-material/LocalHospital';
import SpaIcon from '@mui/icons-material/Spa';
import MedicalInformationIcon from '@mui/icons-material/MedicalInformation';
import Card from '@mui/material/Card';

type PatientEntryProps = {
  entry: Entry;
};

function PatientEntryContainer({ entry }: PatientEntryProps) {
  return <PatientEntry entry={entry} />;
}

const PatientEntry = ({ entry }: PatientEntryProps) => {
  const [diagnoses, setdiagnoses] = useState<Diagnosis[]>([]);

  useEffect(() => {
    const fetchDiagnoses = async () => {
      const data = await diagnosesService.getAll();
      setdiagnoses(data);
    };
    fetchDiagnoses();
  }, []);

  switch (entry.type) {
    case 'Hospital':
      return <HospitalEntryComponent diagnoses={diagnoses} entry={entry} />;
      break;
    case 'HealthCheck':
      return <HealthCheckEntryComponent diagnoses={diagnoses} entry={entry} />;
      break;
    case 'OccupationalHealthcare':
      return (
        <OccupationalHealthcareEntryComponent
          diagnoses={diagnoses}
          entry={entry}
        />
      );
      break;

    default:
      return <>unknown</>;
      break;
  }
};

const HealthCheckEntryComponent = ({
  entry,
  diagnoses,
}: {
  entry: HealthCheckEntry;
  diagnoses: Diagnosis[];
}) => {
  return (
    <Card
      style={{
        border: '1px solid  white',
        marginBottom: '2rem',
        padding: '1rem',
      }}
    >
      <SpaIcon />{' '}
      <p>
        {entry.date}: {entry.description}
      </p>
      <ul>
        {entry.diagnosisCodes?.map((code) => {
          const currentDiagnosis = diagnoses.find((v) => v.code === code);
          return (
            <li key={code}>
              {code}: {currentDiagnosis?.name}
            </li>
          );
        })}
      </ul>
      <p>Healthcheck rating: {entry.healthCheckRating}</p>
      <p>diagnose by: {entry.specialist}</p>
    </Card>
  );
};
const HospitalEntryComponent = ({
  entry,
  diagnoses,
}: {
  entry: HospitalEntry;
  diagnoses: Diagnosis[];
}) => {
  return (
    <Card
      style={{
        border: '1px solid  white',
        marginBottom: '2rem',
        padding: '1rem',
      }}
    >
      <LocalHospitalIcon />{' '}
      <p>
        {entry.date}: {entry.description}
      </p>
      <ul>
        {entry.diagnosisCodes?.map((code) => {
          const currentDiagnosis = diagnoses.find((v) => v.code === code);
          return (
            <li key={code}>
              {code}: {currentDiagnosis?.name}
            </li>
          );
        })}
      </ul>
      {entry.discharge ? <p>Discharge: {entry.discharge.criteria}</p> : ''}
      <p>diagnose by: {entry.specialist}</p>
    </Card>
  );
};
const OccupationalHealthcareEntryComponent = ({
  entry,
  diagnoses,
}: {
  entry: OccupationalHealthcareEntry;
  diagnoses: Diagnosis[];
}) => {
  return (
    <Card
      style={{
        border: '1px solid  white',
        marginBottom: '2rem',
        padding: '1rem',
      }}
    >
      <MedicalInformationIcon /> - {entry.employerName}
      <p>
        {entry.date}: {entry.description}
      </p>
      <ul>
        {entry.diagnosisCodes?.map((code) => {
          const currentDiagnosis = diagnoses.find((v) => v.code === code);
          return (
            <li key={code}>
              {code}: {currentDiagnosis?.name}
            </li>
          );
        })}
      </ul>
      <p>diagnose by: {entry.specialist}</p>
    </Card>
  );
};

export default PatientEntryContainer;
