import { createContext, useContext, useState, useCallback, useRef } from "react";
import { ShowListNotification } from "../components/ShowListNotification";

type NotificationContextProps = {
  showNotification: (message: string, type: "success" | "error") => void;
};

const NotificationContext = createContext<NotificationContextProps>({
  showNotification: () => { },
});

// eslint-disable-next-line react-refresh/only-export-components
export const useNotification = () => {
  const context = useContext(NotificationContext);
  if (!context) {
    throw new Error("useNotification must be used within a NotificationProvider");
  }
  return context;
};

export const NotificationProvider = ({ children }: { children: React.ReactNode }) => {
  const [notification, setNotification] = useState<{ message: string; type: "success" | "error" } | null>(null);
  const timerIdRef = useRef<NodeJS.Timeout | null>(null);

  const showNotification = useCallback((message: string, type: "success" | "error") => {
    if (timerIdRef.current) {
      clearTimeout(timerIdRef.current);
    }

    setNotification({ message, type });

    const newTimerId = setTimeout(() => {
      setNotification(null);
    }, 3000);

    timerIdRef.current = newTimerId;
  }, []);

  return (
    <NotificationContext.Provider value={{ showNotification }}>
      {children}
      <div className="fixed bottom-0 right-0 p-4">
        {notification && (
          <ShowListNotification
            message={notification.message}
            type={notification.type}
            onClose={() => setNotification(null)}
          />
        )}
      </div>
    </NotificationContext.Provider>
  );
};
