import { useEffect, useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend,
} from "recharts";

function AdminDashboard() {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    const stored =
      JSON.parse(localStorage.getItem("allEvents")) || [];
    setEvents(stored);
  }, []);

  // ==============================
  // 📊 EVENTS PER MONTH
  // ==============================

  const eventsPerMonth = {};

  events.forEach((event) => {
    const month = new Date(event.date).toLocaleString("default", {
      month: "short",
    });

    eventsPerMonth[month] =
      (eventsPerMonth[month] || 0) + 1;
  });

  const monthlyData = Object.keys(eventsPerMonth).map(
    (month) => ({
      month,
      count: eventsPerMonth[month],
    })
  );

  // ==============================
  // 🥧 NATIONS vs NON-NATIONS
  // ==============================

  const nationsCount = events.filter(
    (e) => e.eventType === "Nations"
  ).length;

  const nonNationsCount = events.filter(
    (e) => e.eventType === "Non-Nations"
  ).length;

  const pieData = [
    { name: "Nations", value: nationsCount },
    { name: "Non-Nations", value: nonNationsCount },
  ];

  const COLORS = ["#6D28D9", "#9CA3AF"];

  return (
    <div>
      <h1 className="text-3xl font-bold mb-10">
        Dashboard Overview
      </h1>

      {/* STATS */}
      <div className="grid md:grid-cols-3 gap-6 mb-12">
        <div className="bg-white p-6 rounded-2xl shadow">
          <h3>Total Events</h3>
          <p className="text-3xl font-bold">
            {events.length}
          </p>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow">
          <h3>Nations</h3>
          <p className="text-3xl font-bold">
            {nationsCount}
          </p>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow">
          <h3>Non-Nations</h3>
          <p className="text-3xl font-bold">
            {nonNationsCount}
          </p>
        </div>
      </div>

      {/* CHARTS */}
      <div className="grid md:grid-cols-2 gap-10">

        {/* Bar Chart */}
        <div className="bg-white p-8 rounded-2xl shadow">
          <h3 className="mb-6 font-semibold">
            Events Per Month
          </h3>

          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={monthlyData}>
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="count" fill="#000000" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Pie Chart */}
        <div className="bg-white p-8 rounded-2xl shadow">
          <h3 className="mb-6 font-semibold">
            Event Type Distribution
          </h3>

          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={pieData}
                cx="50%"
                cy="50%"
                outerRadius={100}
                dataKey="value"
                label
              >
                {pieData.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={COLORS[index]}
                  />
                ))}
              </Pie>
              <Legend />
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>

      </div>
    </div>
  );
}

export default AdminDashboard;