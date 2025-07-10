import { create } from "zustand";

interface Notification {
  id: string;
  message: string;
  type?: "success" | "error" | "info";
  duration?: number; // ms
}

interface NotificationState {
  notifications: Notification[];
  notify: (
    message: string,
    type?: "success" | "error" | "info",
    duration?: number
  ) => void;
  remove: (id: string) => void;
}

export const useNotificationStore = create<NotificationState>((set) => ({
  notifications: [],
  notify: (message, type = "info", duration = 3500) => {
    const id = Math.random().toString(36).substr(2, 9);
    set((state) => ({
      notifications: [...state.notifications, { id, message, type, duration }],
    }));
    setTimeout(() => {
      set((state) => ({
        notifications: state.notifications.filter((n) => n.id !== id),
      }));
    }, duration);
  },
  remove: (id) =>
    set((state) => ({
      notifications: state.notifications.filter((n) => n.id !== id),
    })),
}));
