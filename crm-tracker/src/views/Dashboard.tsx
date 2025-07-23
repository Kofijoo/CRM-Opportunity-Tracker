import { useRegion } from "../context/RegionContext";
import StatCards from "../components/dashboard/StatCards";
import GoalMeter from "../components/dashboard/GoalMeter";
import LeadSources from "../components/dashboard/LeadSources";
import UpcomingMeetings from "../components/dashboard/UpcomingMeetings";

const Dashboard = () => {
  const { region } = useRegion();

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-800">Dashboard – {region}</h1>
        <div className="flex space-x-2">
          <button className="px-4 py-2 bg-white border border-gray-200 rounded-lg text-sm font-medium text-gray-600 hover:bg-gray-50">
            Last 30 Days
          </button>
          <button className="px-4 py-2 bg-blue-600 rounded-lg text-sm font-medium text-white hover:bg-blue-700">
            + Add Widget
          </button>
        </div>
      </div>

      {/* Stat Cards */}
      <section>
        <StatCards />
      </section>

      {/* Charts Section */}
      <section className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-1">
          <GoalMeter />
        </div>
        <div className="lg:col-span-2">
          <LeadSources />
        </div>
      </section>

      {/* Upcoming Meetings */}
      <section>
        <UpcomingMeetings />
      </section>
    </div>
  );
};

export default Dashboard;
