import { create } from "zustand";
import API from "@/lib/api";
import { toast } from "sonner";

export interface Client {
  _id: string;
  name: string;
  email: string;
}

export interface Event {
  id: string;
  title: string;
  date: string;
  description?: string;
  clients?: Client[];
}

interface EventState {
  events: Event[];
  loading: boolean;
  fetchEvents: () => Promise<void>;
  addEvent: (
    data: Omit<Event, "id" | "clients"> & { clientIds: string[] }
  ) => Promise<void>;
  updateEvent: (
    id: string,
    data: Omit<Event, "id" | "clients"> & { clientIds: string[] }
  ) => Promise<void>;
  deleteEvent: (id: string) => Promise<void>;
}

export const useEventStore = create<EventState>((set) => ({
  events: [],
  loading: false,
  fetchEvents: async () => {
    set({ loading: true });
    try {
      const res = await API.get("/events");
      // Map _id to id for frontend consistency
      const events = res.data.events.map((e: any) => ({ ...e, id: e._id }));
      set({ events });
    } catch (err) {
      toast.error("Failed to fetch events");
    } finally {
      set({ loading: false });
    }
  },
  addEvent: async (data) => {
    set({ loading: true });
    try {
      await API.post("/events", data);
      await useEventStore.getState().fetchEvents();
      toast.success("Event added successfully");
    } catch (err: any) {
      toast.error(err?.response?.data?.message || "Failed to add event");
    } finally {
      set({ loading: false });
    }
  },
  updateEvent: async (id, data) => {
    set({ loading: true });
    try {
      await API.put(`/events/${id}`, data);
      await useEventStore.getState().fetchEvents();
      toast.success("Event updated successfully");
    } catch (err: any) {
      toast.error(err?.response?.data?.message || "Failed to update event");
    } finally {
      set({ loading: false });
    }
  },
  deleteEvent: async (id) => {
    set({ loading: true });
    try {
      await API.delete(`/events/${id}`);
      await useEventStore.getState().fetchEvents();
      toast.success("Event deleted successfully");
    } catch (err: any) {
      toast.error(err?.response?.data?.message || "Failed to delete event");
    } finally {
      set({ loading: false });
    }
  },
}));
