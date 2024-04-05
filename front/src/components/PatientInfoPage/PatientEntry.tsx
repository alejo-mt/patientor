import { Entry } from '../../types';

type PatientEntryProps = {
  entry: Entry;
};

function PatientEntry({ entry }: PatientEntryProps) {
  return (
    <div>
      <p>
        {entry.date}: {entry.description}
      </p>
      <ul>
        {entry.diagnosisCodes?.map((code) => (
          <li key={code}>{code}</li>
        ))}
      </ul>
    </div>
  );
}

export default PatientEntry;
