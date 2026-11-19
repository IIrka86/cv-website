'use client';

import React, {
  createContext,
  FC,
  use,
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react';
import styles from './Toast.module.css';
import { Toast } from './Toast';
import { TOAST_DURATION_MS } from '@/styles/tokens/motion';

type ShowToast = (message: string) => void;

const ToastContext = createContext<ShowToast | null>(null);

export const useToast = (): ShowToast => {
  const show = use(ToastContext);

  if (!show) {
    throw new Error('useToast must be used inside ToastProvider');
  }

  return show;
};

interface ToastState {
  id: number;
  message: string;
}

export interface ToastProviderProps {
  children: React.ReactNode;
}

export const ToastProvider: FC<ToastProviderProps> = ({ children }) => {
  const [toast, setToast] = useState<ToastState | null>(null);
  const [paused, setPaused] = useState(false);
  const nextId = useRef(0);

  const show = useCallback<ShowToast>((message) => {
    nextId.current += 1;
    setToast({ id: nextId.current, message });
  }, []);

  useEffect(() => {
    if (!toast || paused) {
      return;
    }

    const timer = setTimeout(() => setToast(null), TOAST_DURATION_MS);

    return () => clearTimeout(timer);
  }, [toast, paused]);

  return (
    <ToastContext value={show}>
      {children}
      <div role="status" className={styles.region}>
        {toast && (
          <Toast
            key={toast.id}
            onMouseEnter={() => setPaused(true)}
            onMouseLeave={() => setPaused(false)}
          >
            {toast.message}
          </Toast>
        )}
      </div>
    </ToastContext>
  );
};
