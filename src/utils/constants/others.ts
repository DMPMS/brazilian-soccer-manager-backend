import * as dayjs from 'dayjs';

export const CURRENT_DATE_UTC = dayjs();
export const DATE_FORMAT = 'DD/MM/YYYY';
export const DEFAULT_DATE_FORMAT = 'YYYY-MM-DD';

export const availableDateMatchIndicesByCompetition: {
  [key: number]: number[];
} = {
  1: [
    1, 3, 5, 7, 9, 11, 13, 15, 17, 19, 21, 23, 24, 25, 27, 29, 30, 31, 33, 35,
    36, 37, 39, 41, 43, 45, 46, 47, 49, 51, 52, 53, 55, 57, 59, 61, 63, 64,
  ],
  2: [2, 6, 18, 22, 32, 34, 42, 44, 54, 56, 60, 62],
  3: [0, 4, 8, 12, 16, 20, 26, 28, 38, 40, 48, 50, 58],
};

export const availableTimesMatch = [
  '16:00',
  '16:30',
  '17:00',
  '17:30',
  '18:00',
  '18:30',
  '19:00',
  '19:30',
  '20:00',
];
