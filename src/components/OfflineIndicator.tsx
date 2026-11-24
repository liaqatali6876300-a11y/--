import React from 'react';
import { WifiOff } from 'lucide-react';
import { useOnlineStatus } from '../hooks/useOnlineStatus';

export const OfflineIndicator: React.FC = () => {
  const isOnline = useOnlineStatus();

  if (isOnline) {
    return null;
  }

  return (
    <div
      role="status"
      aria-live="polite"
      className="font-naskh fixed bottom-4 left-4 z-50 flex items-center gap-2.5 rounded-xl border border-amber-700/30 bg-amber-600 px-4 py-2.5 text-sm sm:text-base font-bold text-white shadow-lg"
    >
      <WifiOff className="h-4 w-4 shrink-0" />
      <span>آف لائن موڈ — محفوظ شدہ تمام مسائل دستیاب ہیں</span>
    </div>
  );
};
