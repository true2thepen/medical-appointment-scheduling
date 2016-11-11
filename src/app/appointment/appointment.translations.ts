export function getI18nStrings() : any {
  return localStorage.getItem('locale').startsWith('de') ? de : en;
}

const en: Translation = {
  date: 'Date',
  description: 'Description',
  duration: 'Duration',
  examination: 'Examination',
  patient: 'Patient',
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
  room: string;
  time: string;
  title: string;
};
