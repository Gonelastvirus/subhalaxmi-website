import { useState, useCallback } from 'react';

// A simple global state manager for the Download Modal
// In a larger app, we'd use Zustand or Context, but this is clean for a single-page structure
let modalListeners: ((isOpen: boolean) => void)[] = [];
let isModalOpenGlobal = false;

export const setDownloadModalOpen = (isOpen: boolean) => {
  isModalOpenGlobal = isOpen;
  modalListeners.forEach(listener => listener(isOpen));
};

export function useDownloadModal() {
  const [isOpen, setIsOpen] = useState(isModalOpenGlobal);

  // Sync with global listeners so any component can trigger the modal
  const handleSetOpen = useCallback((newState: boolean) => {
    setDownloadModalOpen(newState);
  }, []);

  // Register listener
  useState(() => {
    const listener = (state: boolean) => setIsOpen(state);
    modalListeners.push(listener);
    return () => {
      modalListeners = modalListeners.filter(l => l !== listener);
    };
  });

  return {
    isOpen,
    openModal: () => handleSetOpen(true),
    closeModal: () => handleSetOpen(false),
  };
}
