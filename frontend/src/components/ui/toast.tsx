"use client";

/**
 * Toast system: success, error, warning.
 * Usage (in a client component):
 *   const toast = useToast();
 *   toast.success("Saved!");
 *   toast.error("Something went wrong");
 *   toast.warning("Please review and try again");
 */
import * as React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle, XCircle, AlertTriangle, X } from "lucide-react";
import { cn } from "@/lib/utils";

export type ToastVariant = "success" | "error" | "warning";

export interface ToastItem {
  id: string;
  variant: ToastVariant;
  title?: string;
  message: string;
  duration?: number;
}

interface ToastContextValue {
  toasts: ToastItem[];
  addToast: (toast: Omit<ToastItem, "id">) => string;
  removeToast: (id: string) => void;
  success: (message: string, title?: string) => string;
  error: (message: string, title?: string) => string;
  warning: (message: string, title?: string) => string;
}

const ToastContext = React.createContext<ToastContextValue | null>(null);

const DEFAULT_DURATION = 5000;

function generateId() {
  return `toast-${Date.now()}-${Math.random().toString(36).slice(2, 9)}`;
}

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [toasts, setToasts] = React.useState<ToastItem[]>([]);
  const timeoutsRef = React.useRef<Map<string, ReturnType<typeof setTimeout>>>(new Map());

  const removeToast = React.useCallback((id: string) => {
    const t = timeoutsRef.current.get(id);
    if (t) clearTimeout(t);
    timeoutsRef.current.delete(id);
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  const addToast = React.useCallback((toast: Omit<ToastItem, "id">) => {
    const id = generateId();
    const duration = toast.duration ?? DEFAULT_DURATION;
    const item: ToastItem = { ...toast, id, duration };
    setToasts((prev) => [...prev, item]);
    if (duration > 0) {
      const t = setTimeout(() => removeToast(id), duration);
      timeoutsRef.current.set(id, t);
    }
    return id;
  }, [removeToast]);

  const success = React.useCallback(
    (message: string, title?: string) => addToast({ variant: "success", message, title }),
    [addToast]
  );
  const error = React.useCallback(
    (message: string, title?: string) => addToast({ variant: "error", message, title }),
    [addToast]
  );
  const warning = React.useCallback(
    (message: string, title?: string) => addToast({ variant: "warning", message, title }),
    [addToast]
  );

  const value: ToastContextValue = {
    toasts,
    addToast,
    removeToast,
    success,
    error,
    warning,
  };

  return (
    <ToastContext.Provider value={value}>
      {children}
      <Toaster toasts={toasts} onDismiss={removeToast} />
    </ToastContext.Provider>
  );
}

export function useToast() {
  const ctx = React.useContext(ToastContext);
  if (!ctx) throw new Error("useToast must be used within ToastProvider");
  return ctx;
}

const variantConfig: Record<
  ToastVariant,
  { icon: React.ComponentType<{ className?: string }>; containerClass: string; iconClass: string }
> = {
  success: {
    icon: CheckCircle,
    containerClass: "border-l-4 border-l-success",
    iconClass: "text-primary",
  },
  error: {
    icon: XCircle,
    containerClass: "border-l-4 border-l-destructive",
    iconClass: "text-destructive",
  },
  warning: {
    icon: AlertTriangle,
    containerClass: "border-l-4 border-l-warning",
    iconClass: "text-warning",
  },
};

function ToastItemComponent({
  toast,
  onDismiss,
}: {
  toast: ToastItem;
  onDismiss: (id: string) => void;
}) {
  const config = variantConfig[toast.variant];
  const Icon = config.icon;

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 24 }}
      transition={{ type: "tween", duration: 0.25, ease: [0.25, 0.1, 0.25, 1] }}
      className={cn(
        "flex w-full max-w-sm items-start gap-3 rounded-lg border border-border bg-card px-4 py-3 shadow-card transition-shadow hover:shadow-card-hover",
        config.containerClass
      )}
    >
      <Icon className={cn("h-5 w-5 shrink-0 mt-0.5", config.iconClass)} />
      <div className="flex-1 min-w-0">
        {toast.title && (
          <p className="text-sm font-semibold text-foreground">{toast.title}</p>
        )}
        <p className={cn("text-sm font-medium text-foreground", toast.title && "mt-0.5")}>
          {toast.message}
        </p>
      </div>
      <button
        type="button"
        onClick={() => onDismiss(toast.id)}
        className="shrink-0 rounded-md p-1 text-muted-foreground hover:bg-black/10 hover:text-foreground focus:outline-none focus-visible:ring-2 focus-visible:ring-ring"
        aria-label="Dismiss"
      >
        <X className="h-4 w-4" />
      </button>
    </motion.div>
  );
}

function Toaster({
  toasts,
  onDismiss,
}: {
  toasts: ToastItem[];
  onDismiss: (id: string) => void;
}) {
  return (
    <div
      className="fixed bottom-4 left-4 right-4 z-[100] flex flex-col-reverse gap-2 pointer-events-none sm:left-auto sm:right-4 sm:max-w-sm"
      aria-live="polite"
      aria-label="Notifications"
    >
      <div className="flex flex-col-reverse gap-2 pointer-events-auto">
        <AnimatePresence mode="popLayout">
          {toasts.map((toast) => (
            <ToastItemComponent key={toast.id} toast={toast} onDismiss={onDismiss} />
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
}
