import * as dayjs from 'dayjs';
import { RuleCompetitionTypeEnum } from 'src/shared/enums/RuleCompetitionType.enum';

export const CURRENT_DATE_UTC = dayjs();
export const DATE_FORMAT = 'DD/MM/YYYY';
export const DEFAULT_DATE_FORMAT = 'YYYY-MM-DD';

export const availableDateMatchIndicesByCompetition: {
  [key: number]: number[];
} = {
  [RuleCompetitionTypeEnum.BrazilianLeagueA]: [
    1, 3, 5, 7, 9, 11, 13, 15, 17, 19, 21, 23, 24, 25, 27, 29, 30, 31, 33, 35,
    36, 37, 39, 41, 43, 45, 46, 47, 49, 51, 52, 53, 55, 57, 59, 61, 63, 64,
  ],
  [RuleCompetitionTypeEnum.BrazilianLeagueB]: [
    1, 3, 5, 7, 9, 11, 13, 15, 17, 19, 21, 23, 24, 25, 27, 29, 30, 31, 33, 35,
    36, 37, 39, 41, 43, 45, 46, 47, 49, 51, 52, 53, 55, 57, 59, 61, 63, 64,
  ],
  [RuleCompetitionTypeEnum.BrazilianLeagueC]: [
    1, 3, 5, 7, 9, 11, 13, 15, 17, 19, 21, 23, 24, 25, 27, 29, 30, 31, 33, 35,
    36, 37, 39, 41, 43, 45, 46, 47, 49, 51, 52, 53, 55, 57, 59, 61, 63, 64,
  ],
  [RuleCompetitionTypeEnum.BrazilianLeagueD]: [
    1, 3, 5, 7, 9, 11, 13, 15, 17, 19, 21, 23, 24, 25,
  ],
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
