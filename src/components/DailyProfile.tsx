import { DailyProfileData } from "../types";

interface DailyProfileProps {
  dailyProfile: DailyProfileData[];
}

const DailyProfile: React.FC<DailyProfileProps> = ({ dailyProfile }) => {
  const maxDaily = Math.max(...dailyProfile.map((d) => d.amount));

  return (
    <section className="bg-white rounded-2xl shadow-sm p-6 mb-6">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold text-gray-900">
          <i className="fas fa-chart-bar mr-2"></i>Daily Spending
        </h3>
        <i className="fas fa-arrow-trend-up text-green-500"></i>
      </div>
      <div className="flex items-end justify-between h-32 gap-2">
        {dailyProfile.map((day: DailyProfileData, idx: number) => (
          <div key={idx} className="flex-1 flex flex-col items-center gap-2">
            <div
              className="w-full bg-gray-100 rounded-t-lg relative"
              style={{ height: "100%" }}
            >
              <div
                className="absolute bottom-0 w-full bg-gradient-to-t from-blue-500 to-blue-400 rounded-t-lg transition-all"
                style={{ height: `${(day.amount / maxDaily) * 100}%` }}
                title={`$${day.amount}`}
              />
            </div>
            <span className="text-xs text-gray-500 font-medium">{day.day}</span>
          </div>
        ))}
      </div>
    </section>
  );
};

export default DailyProfile;
