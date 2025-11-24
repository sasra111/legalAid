import { useEffect } from "react";
import { Calendar } from "lucide-react";
import { useEventStore } from "@/store/eventStore";

const UpcomingEvents = () => {
  const events = useEventStore((s) => s.events);
  const fetchEvents = useEventStore((s) => s.fetchEvents);
  const loading = useEventStore((s) => s.loading);

  useEffect(() => {
    fetchEvents();
  }, [fetchEvents]);

  // Get upcoming events from today onwards (top 5)
  const getUpcomingEvents = () => {
    const today = new Date().toISOString().split('T')[0];
    return events
      .filter(event => event.date >= today)
      .sort((a, b) => a.date.localeCompare(b.date))
      .slice(0, 5);
  };

  const upcomingEvents = getUpcomingEvents();

  return (
    <div className="mt-10 bg-white rounded-xl shadow p-6 border border-blue-100">
      <h3 className="text-lg font-bold mb-3 flex items-center gap-2">
        <Calendar className="h-5 w-5 text-blue-600" /> Upcoming Events
      </h3>
      {loading ? (
        <p className="text-gray-500 text-sm">Loading events...</p>
      ) : upcomingEvents.length === 0 ? (
        <p className="text-gray-500 text-sm">No upcoming events scheduled.</p>
      ) : (
        <ul className="space-y-2">
          {upcomingEvents.map((event) => (
            <li key={event.id} className="flex justify-between text-sm">
              <span className="font-medium text-gray-800">{event.title}</span>
              <span className="text-gray-600">
                {new Date(event.date).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'short',
                  day: 'numeric'
                })}
              </span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default UpcomingEvents;
