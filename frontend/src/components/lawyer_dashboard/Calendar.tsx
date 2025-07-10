import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  ChevronLeft,
  ChevronRight,
  Calendar as CalendarIcon,
  Plus,
} from "lucide-react";
import clsx from "clsx";

// Helper to get days in month
function getDaysInMonth(year: number, month: number) {
  return new Date(year, month + 1, 0).getDate();
}

// Helper to get first day of week (0=Sun, 1=Mon...)
function getFirstDayOfWeek(year: number, month: number) {
  return new Date(year, month, 1).getDay();
}

const weekdays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

interface Event {
  id: string;
  title: string;
  date: string; // YYYY-MM-DD
  description?: string;
}

const initialEvents: Event[] = [
  {
    id: "1",
    title: "Consultation with John Doe",
    date: "2025-07-12",
    description: "Initial client consultation.",
  },
  {
    id: "2",
    title: "Case Review: Silva vs. Fernando",
    date: "2025-07-14",
    description: "Review case documents.",
  },
  {
    id: "3",
    title: "Document Submission Deadline",
    date: "2025-07-15",
    description: "Submit all required documents.",
  },
];

const Calendar: React.FC = () => {
  const today = new Date();
  const [currentMonth, setCurrentMonth] = useState(today.getMonth());
  const [currentYear, setCurrentYear] = useState(today.getFullYear());
  const [selectedDate, setSelectedDate] = useState<string>("");
  const [events, setEvents] = useState<Event[]>(initialEvents);
  const [showAddModal, setShowAddModal] = useState(false);
  const [newEventTitle, setNewEventTitle] = useState("");
  const [newEventDesc, setNewEventDesc] = useState("");

  const daysInMonth = getDaysInMonth(currentYear, currentMonth);
  const firstDayOfWeek = getFirstDayOfWeek(currentYear, currentMonth);

  const handlePrevMonth = () => {
    if (currentMonth === 0) {
      setCurrentMonth(11);
      setCurrentYear((y) => y - 1);
    } else {
      setCurrentMonth((m) => m - 1);
    }
  };

  const handleNextMonth = () => {
    if (currentMonth === 11) {
      setCurrentMonth(0);
      setCurrentYear((y) => y + 1);
    } else {
      setCurrentMonth((m) => m + 1);
    }
  };

  const getDateString = (day: number) => {
    return `${currentYear}-${String(currentMonth + 1).padStart(
      2,
      "0"
    )}-${String(day).padStart(2, "0")}`;
  };

  const eventsForDate = (date: string) => events.filter((e) => e.date === date);

  const handleAddEvent = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedDate || !newEventTitle) return;
    setEvents((prev) => [
      ...prev,
      {
        id: Date.now().toString(),
        title: newEventTitle,
        date: selectedDate,
        description: newEventDesc,
      },
    ]);
    setShowAddModal(false);
    setNewEventTitle("");
    setNewEventDesc("");
  };

  return (
    <div className="bg-white rounded-xl shadow-md p-6 border border-blue-100 max-w-3xl mx-auto">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-blue-800 flex items-center gap-2">
          <CalendarIcon className="h-6 w-6 text-blue-600" /> Calendar
        </h2>
        <div className="flex gap-2">
          <Button variant="outline" size="icon" onClick={handlePrevMonth}>
            <ChevronLeft className="h-5 w-5" />
          </Button>
          <span className="font-semibold text-lg mx-2">
            {today.toLocaleString("default", { month: "long" })} {currentYear}
          </span>
          <Button variant="outline" size="icon" onClick={handleNextMonth}>
            <ChevronRight className="h-5 w-5" />
          </Button>
        </div>
      </div>
      <div className="grid grid-cols-7 gap-2 mb-2">
        {weekdays.map((day) => (
          <div key={day} className="text-center font-semibold text-blue-700">
            {day}
          </div>
        ))}
      </div>
      <div className="grid grid-cols-7 gap-2">
        {Array.from({ length: firstDayOfWeek }).map((_, i) => (
          <div key={i} />
        ))}
        {Array.from({ length: daysInMonth }).map((_, i) => {
          const day = i + 1;
          const dateStr = getDateString(day);
          const isToday =
            day === today.getDate() &&
            currentMonth === today.getMonth() &&
            currentYear === today.getFullYear();
          return (
            <button
              key={day}
              className={clsx(
                "rounded-lg p-2 h-16 w-full flex flex-col items-center justify-start border transition-all duration-150 relative group",
                isToday
                  ? "border-blue-500 bg-blue-50 font-bold text-blue-700 shadow"
                  : "border-gray-200 hover:bg-blue-50",
                selectedDate === dateStr && "ring-2 ring-blue-400"
              )}
              onClick={() => setSelectedDate(dateStr)}
            >
              <span>{day}</span>
              {eventsForDate(dateStr).length > 0 && (
                <span className="absolute top-1 right-1 w-2 h-2 bg-blue-500 rounded-full animate-pulse" />
              )}
            </button>
          );
        })}
      </div>
      {selectedDate && (
        <div className="mt-6">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-lg font-semibold text-blue-700">
              Events for {selectedDate}
            </h3>
            <Button
              size="sm"
              variant="outline"
              onClick={() => setShowAddModal(true)}
              className="flex items-center gap-1"
            >
              <Plus className="h-4 w-4" /> Add Event
            </Button>
          </div>
          <ul className="space-y-2">
            {eventsForDate(selectedDate).length === 0 && (
              <li className="text-gray-500">No events for this day.</li>
            )}
            {eventsForDate(selectedDate).map((event) => (
              <li
                key={event.id}
                className="bg-blue-50 border border-blue-100 rounded-lg p-3 flex flex-col gap-1"
              >
                <span className="font-semibold text-blue-800">
                  {event.title}
                </span>
                {event.description && (
                  <span className="text-gray-600 text-sm">
                    {event.description}
                  </span>
                )}
              </li>
            ))}
          </ul>
        </div>
      )}
      {/* Add Event Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30">
          <div className="bg-white rounded-lg shadow-lg p-8 w-full max-w-md relative animate-fade-in-up">
            <button
              className="absolute top-2 right-2 text-gray-400 hover:text-blue-600 text-2xl font-bold focus:outline-none"
              onClick={() => setShowAddModal(false)}
              aria-label="Close"
            >
              &times;
            </button>
            <h3 className="text-xl font-bold text-blue-700 mb-4">Add Event</h3>
            <form onSubmit={handleAddEvent} className="flex flex-col gap-3">
              <input
                type="text"
                placeholder="Event Title"
                value={newEventTitle}
                onChange={(e) => setNewEventTitle(e.target.value)}
                className="border border-gray-300 rounded-md px-4 py-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                required
              />
              <textarea
                placeholder="Event Description (optional)"
                value={newEventDesc}
                onChange={(e) => setNewEventDesc(e.target.value)}
                className="border border-gray-300 rounded-md px-4 py-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                rows={3}
              />
              <Button type="submit" className="px-6 py-2">
                Add Event
              </Button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Calendar;
