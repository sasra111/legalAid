import React, { useState, useEffect } from "react";
import API from "@/lib/api";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import {
  ChevronLeft,
  ChevronRight,
  Calendar as CalendarIcon,
  Plus,
} from "lucide-react";
import clsx from "clsx";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogClose,
} from "@/components/ui/dialog";

// Helper to get days in month
function getDaysInMonth(year: number, month: number) {
  return new Date(year, month + 1, 0).getDate();
}

// Helper to get first day of week (0=Sun, 1=Mon...)
function getFirstDayOfWeek(year: number, month: number) {
  return new Date(year, month, 1).getDay();
}

const weekdays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

interface Client {
  _id: string;
  name: string;
  email: string;
}

interface Event {
  id: string;
  title: string;
  date: string; // YYYY-MM-DD
  description?: string;
  clients?: Client[];
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
  const [allClients, setAllClients] = useState<Client[]>([]);
  const [clientSearch, setClientSearch] = useState("");
  const [selectedClients, setSelectedClients] = useState<Client[]>([]);
  const [loadingClients, setLoadingClients] = useState(false);

  useEffect(() => {
    // Fetch all clients for assignment
    const fetchClients = async () => {
      setLoadingClients(true);
      try {
        const res = await API.get("/clients");
        setAllClients(res.data.clients);
      } catch (err) {
        toast.error("Failed to fetch clients");
      } finally {
        setLoadingClients(false);
      }
    };
    fetchClients();
  }, []);

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

  const handleAddEvent = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedDate || !newEventTitle) return;
    try {
      // Backend: create event with assigned clients
      const res = await API.post("/events", {
        title: newEventTitle,
        date: selectedDate,
        description: newEventDesc,
        clientIds: selectedClients.map((c) => c._id),
      });
      setEvents((prev) => [...prev, res.data.event]);
      toast.success("Event added successfully");
    } catch (err: any) {
      toast.error(err?.response?.data?.message || "Failed to add event");
    }
    setShowAddModal(false);
    setNewEventTitle("");
    setNewEventDesc("");
    setSelectedClients([]);
    setClientSearch("");
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
            <Dialog>
              <DialogTrigger asChild>
                <Button
                  size="sm"
                  variant="outline"
                  className="flex items-center gap-1"
                >
                  <Plus className="h-4 w-4" /> Add Event
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Add New Event</DialogTitle>
                </DialogHeader>
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
                    rows={2}
                  />
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Assign Clients
                    </label>
                    <input
                      type="text"
                      placeholder="Search clients by name or email"
                      value={clientSearch}
                      onChange={(e) => setClientSearch(e.target.value)}
                      className="border border-gray-300 rounded-md px-4 py-2 focus:ring-blue-500 focus:border-blue-500 outline-none mb-2"
                    />
                    <div className="max-h-32 overflow-y-auto border rounded-md bg-gray-50">
                      {loadingClients ? (
                        <div className="p-2 text-gray-500">Loading...</div>
                      ) : (
                        allClients
                          .filter(
                            (c) =>
                              c.name
                                .toLowerCase()
                                .includes(clientSearch.toLowerCase()) ||
                              c.email
                                .toLowerCase()
                                .includes(clientSearch.toLowerCase())
                          )
                          .map((client) => (
                            <div
                              key={client._id}
                              className={`flex items-center px-3 py-1 cursor-pointer hover:bg-blue-100 ${
                                selectedClients.some(
                                  (sc) => sc._id === client._id
                                )
                                  ? "bg-blue-200"
                                  : ""
                              }`}
                              onClick={() => {
                                if (
                                  selectedClients.some(
                                    (sc) => sc._id === client._id
                                  )
                                ) {
                                  setSelectedClients((prev) =>
                                    prev.filter((sc) => sc._id !== client._id)
                                  );
                                } else {
                                  setSelectedClients((prev) => [
                                    ...prev,
                                    client,
                                  ]);
                                }
                              }}
                            >
                              <span className="font-medium text-blue-700 mr-2">
                                {client.name}
                              </span>
                              <span className="text-xs text-gray-500">
                                ({client.email})
                              </span>
                              {selectedClients.some(
                                (sc) => sc._id === client._id
                              ) && (
                                <span className="ml-auto text-green-600 font-bold">
                                  ✓
                                </span>
                              )}
                            </div>
                          ))
                      )}
                    </div>
                    {selectedClients.length > 0 && (
                      <div className="mt-2 flex flex-wrap gap-2">
                        {selectedClients.map((client) => (
                          <span
                            key={client._id}
                            className="bg-blue-100 text-blue-700 px-2 py-1 rounded text-xs flex items-center gap-1"
                          >
                            {client.name}
                            <button
                              type="button"
                              className="ml-1 text-red-500 hover:text-red-700"
                              onClick={() =>
                                setSelectedClients((prev) =>
                                  prev.filter((c) => c._id !== client._id)
                                )
                              }
                            >
                              ×
                            </button>
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                  <Button type="submit" className="px-6 py-2">
                    Add Event
                  </Button>
                </form>
              </DialogContent>
            </Dialog>
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
    </div>
  );
};

export default Calendar;
