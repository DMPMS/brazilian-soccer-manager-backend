import * as dayjs from 'dayjs';
import { WeekDaysEnum } from 'src/shared/enums/WeekDays.enum';
import { DEFAULT_DATE_FORMAT } from './constants/others';

export function getWeekdayDates(year: number): string[] {
  const dates: string[] = [];

  const startDate = dayjs().year(year).month(0).date(1).startOf('day');
  const endDate = startDate.add(1, 'year');

  let currentDate = startDate;

  while (currentDate.isBefore(endDate)) {
    const dayOfWeek = currentDate.day();

    if (
      dayOfWeek === WeekDaysEnum.Sunday ||
      dayOfWeek === WeekDaysEnum.Wednesday
    ) {
      dates.push(currentDate.format(DEFAULT_DATE_FORMAT));
    }

    currentDate = currentDate.add(1, 'day');
  }

  return dates;
}

// function getWeekdayDates(year: number): Date[] {
//   const dates: Date[] = [];

//   const startDate = new Date(year, 0, 1);
//   const endDate = new Date(year + 1, 0, 1);

//   const currentDate = startDate;

//   while (currentDate < endDate) {
//     const dayOfWeek = currentDate.getDay();

//     if (dayOfWeek === 0 || dayOfWeek === 3) {
//       dates.push(new Date(currentDate));
//     }

//     currentDate.setDate(currentDate.getDate() + 1);
//   }

//   return dates;
// }
