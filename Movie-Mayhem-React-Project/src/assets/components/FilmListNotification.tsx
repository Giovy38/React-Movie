import { useEffect } from "react";
import { createPortal } from "react-dom";

type NotificationProps = {
  message: string;
  type: "success" | "error";
  duration?: number;
  onClose: () => void;
};

export function FilmListNotification({ message, type, duration = 2000, onClose }: NotificationProps) {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, duration);
    return () => clearTimeout(timer); // Cleanup the timer on unmount
  }, [duration, onClose]);

  return createPortal(
    <div className={`uppercase min-w-[400px] max-w-[90vw] flex justify-center items-center fixed bottom-4 right-4 p-4 rounded-full shadow-lg text-white text-center ${
      type === "success" ? "bg-green-700" : "bg-red-700"
    }`}
    style={{ zIndex: 9999 }}>
      {message}
    </div>,
    document.body
  );
}
