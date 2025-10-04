/**
 * calculate Daily Points according to the rules:
 * - On the 1st day of the season (September 1 or December 1): 2 points
 * - On the 2nd day of the season: 3 points
 * - On the 3rd+ day: 100% of the previous day's points + 60% of the points from two days ago
 * - Rounding total points: if > 1000, show in "K" format (e.g., 28745 → 29K)
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

  // define the number of days since the start of the season
  const diffTime = Math.abs(today.getTime() - startDate.getTime());
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

  const pointsArray: DailyPointsData[] = [];
  const dayNames = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  // Generate the last 7 days
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
      // 100% from previous day + 60% from two days ago
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
