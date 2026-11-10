import { createContext, useContext, useCallback, useState } from "react";
import { CheckCircle2, XCircle, AlertTriangle, Info, X } from "lucide-react";

const NotificationContext = createContext(null);

let idCounter = 0;

export function NotificationProvider({ children }) {
  const [toasts, setToasts] = useState([]);

  const dismiss = useCallback((id) => {
    setToasts((t) => t.filter((x) => x.id !== id));
  }, []);

  const notify = useCallback((message, type = "success", opts = {}) => {
    const id = ++idCounter;
    setToasts((t) => [...t, { id, message, type, title: opts.title }]);
    const duration = opts.duration ?? 3200;
    if (duration > 0) {
      setTimeout(() => dismiss(id), duration);
    }
    return id;
  }, [dismiss]);

  const value = {
    notify,
    dismiss,
    success: (m, o) => notify(m, "success", o),
    error: (m, o) => notify(m, "error", o),
    warning: (m, o) => notify(m, "warning", o),
    info: (m, o) => notify(m, "info", o),
  };

  return (
    <NotificationContext.Provider value={value}>
      {children}
      <ToastContainer toasts={toasts} dismiss={dismiss} />
    </NotificationContext.Provider>
  );
}

const ICONS = {
  success: <CheckCircle2 size={19} className="text-pitch shrink-0" />,
  error: <XCircle size={19} className="text-red-400 shrink-0" />,
  warning: <AlertTriangle size={19} className="text-amber-400 shrink-0" />,
  info: <Info size={19} className="text-sky-400 shrink-0" />,
};

function ToastContainer({ toasts, dismiss }) {
  return (
    <div className="fixed top-20 right-4 z-[100] flex flex-col gap-2 w-[calc(100%-2rem)] max-w-sm">
      {toasts.map((t) => (
        <div
          key={t.id}
          role="status"
          className="animate-slideInRight flex items-start gap-3 bg-charcoal text-white border border-line rounded-card px-4 py-3 shadow-premium"
        >
          {ICONS[t.type]}
          <div className="flex-1 min-w-0">
            {t.title && <p className="text-sm font-semibold">{t.title}</p>}
            <p className="text-sm text-white/85 leading-snug">{t.message}</p>
          </div>
          <button
            onClick={() => dismiss(t.id)}
            aria-label="Dismiss notification"
            className="text-white/40 hover:text-white transition-colors"
          >
            <X size={16} />
          </button>
        </div>
      ))}
    </div>
  );
}

export const useNotification = () => useContext(NotificationContext);
