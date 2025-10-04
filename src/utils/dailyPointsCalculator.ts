import { type Transaction } from "../types";

/**
 * Расчет Daily Points согласно ТЗ:
 * - На 1 день сезона (сентябрь 1 или декабрь 1): 2 очка
 * - На 2 день сезона: 3 очка
 * - На 3+ день: 100% очков предыдущего дня + 60% очков позапрошлого дня
 * - Округление общих очков: если > 1000, показывать в формате "K" (например, 28745 → 29K)
 */

interface DailyPointsData {
  day: string;
  points: number;
  date: Date;
}

export const calculateDailyPoints = (
  seasonStartDate: string
): DailyPointsData[] => {
  const startDate = new Date(seasonStartDate);
  const today = new Date();

  // Определяем количество дней от начала сезона
  const diffTime = Math.abs(today.getTime() - startDate.getTime());
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

  const pointsArray: DailyPointsData[] = [];
  const dayNames = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  // Генерируем последние 7 дней
  for (let i = 6; i >= 0; i--) {
    const date = new Date(today);
    date.setDate(date.getDate() - i);

    const dayOfWeek = dayNames[date.getDay()];
    const dayNumber = diffDays - i;

    let points = 0;

    if (dayNumber === 1) {
      points = 2;
    } else if (dayNumber === 2) {
      points = 3;
    } else if (dayNumber > 2) {
      // 100% от предыдущего дня + 60% от позапрошлого
      const prevDayPoints = pointsArray[pointsArray.length - 1]?.points || 3;
      const twoDaysAgoPoints = pointsArray[pointsArray.length - 2]?.points || 2;

      points = Math.round(prevDayPoints + twoDaysAgoPoints * 0.6);
    }

    pointsArray.push({
      day: dayOfWeek,
      points: points,
      date: date,
    });
  }

  return pointsArray;
};

export const formatPoints = (points: number): string => {
  if (points > 1000) {
    return `${Math.round(points / 1000)}K`;
  }
  return points.toString();
};

export const getTotalPoints = (dailyPointsData: DailyPointsData[]): number => {
  return dailyPointsData.reduce((sum, day) => sum + day.points, 0);
};
