import React from "react";
import { cn } from "@/lib/utils";

interface NotificationProps {
  message: string;
  type?: "success" | "error" | "info";
  onClose?: () => void;
  className?: string;
}

const typeStyles = {
  success: "bg-green-100 border-green-400 text-green-800",
  error: "bg-red-100 border-red-400 text-red-800",
  info: "bg-blue-100 border-blue-400 text-blue-800",
};

const Notification: React.FC<NotificationProps> = ({
  message,
  type = "info",
  onClose,
  className = "",
}) => {
  return (
    <div
      className={cn(
        "flex items-center justify-between px-4 py-2 rounded-md border shadow-sm animate-fade-in-up",
        typeStyles[type],
        className
      )}
      role="alert"
    >
      <span>{message}</span>
      {onClose && (
        <button
          onClick={onClose}
          className="ml-4 text-lg font-bold text-gray-400 hover:text-gray-700 focus:outline-none"
          aria-label="Close notification"
        >
          &times;
        </button>
      )}
    </div>
  );
};

export default Notification;
