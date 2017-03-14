const en: Translation = {
  date: 'Date',
  description: 'Description',
  duration: 'Duration',
  examination: 'Examination',
  patient: 'Patient',
  patientTooltip: 'Go to patient',
  room: 'Room',
  time: 'Time',
  title: 'Title'
};

const de: Translation = {
  date: 'Datum',
  description: 'Beschreibung',
  duration: 'Dauer',
  examination: 'Behandlung',
  patient: 'Patient',
  patientTooltip: 'Zum Patienten',
  room: 'Raum',
  time: 'Uhrzeit',
  title: 'Titel'
};

export interface Translation {
  date: string;
  description: string;
  duration: string;
  examination: string;
  patient: string;
  patientTooltip: string;
  room: string;
  time: string;
  title: string;
};

export function getI18nStrings(): any {
  return localStorage.getItem('locale').startsWith('de') ? de : en;
}
