import React from "react";
import { useNotificationStore } from "@/store/notificationStore";
import Notification from "./Notification";

const NotificationPortal: React.FC = () => {
  const notifications = useNotificationStore((s) => s.notifications);
  const remove = useNotificationStore((s) => s.remove);

  return (
    <div className="fixed top-5 right-5 z-50 flex flex-col gap-3 items-end pointer-events-none">
      {notifications.map((n) => (
        <div key={n.id} className="pointer-events-auto">
          <Notification
            message={n.message}
            type={n.type}
            onClose={() => remove(n.id)}
          />
        </div>
      ))}
    </div>
  );
};

export default NotificationPortal;
