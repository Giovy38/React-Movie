import { createContext, useContext, useState } from "react";
import { FilmListNotification } from "../components/FilmListNotification";

type NotificationContextProps = {
  showNotification: (message: string, type: "success" | "error") => void;
};

const NotificationContext = createContext<NotificationContextProps | undefined>(undefined);

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
  const [timerId, setTimerId] = useState<NodeJS.Timeout | null>(null);

  const showNotification = (message: string, type: "success" | "error") => {
    // Se c'è una notifica attiva, rimuovi prima il timer
    if (timerId) {
      clearTimeout(timerId);
    }

    // Imposta la nuova notifica
    setNotification({ message, type });

    // Imposta un timer per rimuovere la notifica dopo 3 secondi
    const newTimerId = setTimeout(() => {
      setNotification(null);
    }, 3000);

    setTimerId(newTimerId); // Salva l'id del nuovo timer
  };

  return (
    <NotificationContext.Provider value={{ showNotification }}>
      {children}
      <div className="fixed bottom-0 right-0 p-4">
        {notification && (
          <FilmListNotification
            message={notification.message}
            type={notification.type}
            onClose={() => setNotification(null)}
          />
        )}
      </div>
    </NotificationContext.Provider>
  );
};
