import React, { useState } from 'react';
import { Menu, X } from 'lucide-react';
import { AppView } from '../types/bahar';

interface TopBarProps {
  activeView: AppView;
  bookmarkCount: number;
  onGoMain: () => void;
  onOpenQuickSearch: () => void;
  onOpenBookmarks: () => void;
  onScrollToAbwab: () => void;
}

export const TopBar: React.FC<TopBarProps> = ({
  activeView,
  bookmarkCount,
  onGoMain,
  onOpenQuickSearch,
  onOpenBookmarks,
  onScrollToAbwab,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 border-b border-stone-200/90 bg-[#FBF9F5]/95 backdrop-blur-sm dark:border-stone-800 dark:bg-[#141210]/95">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-8 px-4 py-3.5 sm:px-6 lg:px-8">
        {/* Zone 1: Single text element wordmark */}
        <button
          type="button"
          onClick={() => {
            onGoMain();
            setMobileMenuOpen(false);
          }}
          className="font-nastaliq text-2xl sm:text-3xl font-bold text-[#14532D] transition-colors hover:text-[#0F3F22] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#14532D] dark:text-[#6EE7B7] dark:hover:text-[#A7F3D0] whitespace-nowrap shrink-0 cursor-pointer"
        >
          بہارِ شریعت
        </button>

        {/* Zone 2: Concise single-line Urdu nav links */}
        <nav
          aria-label="بنیادی مینیو"
          className="hidden md:flex items-center gap-7 text-base lg:text-lg font-semibold text-stone-700 dark:text-stone-300"
        >
          <button
            type="button"
            onClick={onGoMain}
            className={`font-naskh relative py-1 transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
              activeView === 'main'
                ? 'font-bold text-[#14532D] dark:text-[#6EE7B7]'
                : 'text-stone-700 hover:text-stone-950 dark:text-stone-300 dark:hover:text-stone-100'
            }`}
          >
            صفحۂ اول
            {activeView === 'main' && (
              <span
                aria-hidden="true"
                className="absolute inset-x-0 -bottom-[15px] h-0.5 bg-[#14532D] dark:bg-[#6EE7B7]"
              />
            )}
          </button>

          <button
            type="button"
            onClick={onScrollToAbwab}
            className={`font-naskh relative py-1 transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
              activeView === 'baab'
                ? 'font-bold text-[#14532D] dark:text-[#6EE7B7]'
                : 'text-stone-700 hover:text-stone-950 dark:text-stone-300 dark:hover:text-stone-100'
            }`}
          >
            تمام ابواب
            {activeView === 'baab' && (
              <span
                aria-hidden="true"
                className="absolute inset-x-0 -bottom-[15px] h-0.5 bg-[#14532D] dark:bg-[#6EE7B7]"
              />
            )}
          </button>

          <button
            type="button"
            onClick={onOpenQuickSearch}
            className="font-naskh py-1 text-stone-700 transition-colors hover:text-stone-950 dark:text-stone-300 dark:hover:text-stone-100 whitespace-nowrap shrink-0 cursor-pointer"
          >
            فوری تلاش
          </button>

          <button
            type="button"
            onClick={onOpenBookmarks}
            className={`font-naskh tabular-nums relative py-1 transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
              activeView === 'bookmarks'
                ? 'font-bold text-[#14532D] dark:text-[#6EE7B7]'
                : 'text-stone-700 hover:text-stone-950 dark:text-stone-300 dark:hover:text-stone-100'
            }`}
          >
            نشان زدہ ({bookmarkCount})
            {activeView === 'bookmarks' && (
              <span
                aria-hidden="true"
                className="absolute inset-x-0 -bottom-[15px] h-0.5 bg-[#14532D] dark:bg-[#6EE7B7]"
              />
            )}
          </button>
        </nav>

        {/* Zone 3: 1 Primary CTA */}
        <div className="flex items-center gap-3 shrink-0">
          <button
            type="button"
            onClick={() => {
              onOpenQuickSearch();
              setMobileMenuOpen(false);
            }}
            className="font-naskh hidden sm:inline-flex items-center justify-center rounded-lg bg-[#14532D] px-5 py-2.5 text-sm sm:text-base font-bold text-white transition-colors hover:bg-[#0F3F22] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#14532D] dark:bg-[#15803D] dark:hover:bg-[#166534] whitespace-nowrap shrink-0 cursor-pointer"
          >
            مسئلہ تلاش کریں
          </button>

          <button
            type="button"
            onClick={() => setMobileMenuOpen((prev) => !prev)}
            aria-label={mobileMenuOpen ? 'مینیو بند کریں' : 'مینیو کھولیں'}
            aria-expanded={mobileMenuOpen}
            className="inline-flex h-11 w-11 items-center justify-center rounded-lg border border-stone-300 text-stone-800 hover:bg-stone-100 md:hidden dark:border-stone-700 dark:text-stone-200 dark:hover:bg-stone-800 cursor-pointer"
          >
            {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {mobileMenuOpen && (
        <div className="border-t border-stone-200 bg-[#FBF9F5] px-4 py-4 md:hidden dark:border-stone-800 dark:bg-[#141210]">
          <nav className="flex flex-col gap-2">
            <button
              type="button"
              onClick={() => {
                onGoMain();
                setMobileMenuOpen(false);
              }}
              className="font-naskh flex min-h-[46px] items-center rounded-lg px-3 py-2 text-right text-lg font-semibold text-stone-800 hover:bg-stone-100 dark:text-stone-200 dark:hover:bg-stone-800 cursor-pointer"
            >
              صفحۂ اول
            </button>
            <button
              type="button"
              onClick={() => {
                onScrollToAbwab();
                setMobileMenuOpen(false);
              }}
              className="font-naskh flex min-h-[46px] items-center rounded-lg px-3 py-2 text-right text-lg font-semibold text-stone-800 hover:bg-stone-100 dark:text-stone-200 dark:hover:bg-stone-800 cursor-pointer"
            >
              تمام ابواب
            </button>
            <button
              type="button"
              onClick={() => {
                onOpenBookmarks();
                setMobileMenuOpen(false);
              }}
              className="font-naskh tabular-nums flex min-h-[46px] items-center rounded-lg px-3 py-2 text-right text-lg font-semibold text-stone-800 hover:bg-stone-100 dark:text-stone-200 dark:hover:bg-stone-800 cursor-pointer"
            >
              نشان زدہ ({bookmarkCount})
            </button>
            <button
              type="button"
              onClick={() => {
                onOpenQuickSearch();
                setMobileMenuOpen(false);
              }}
              className="font-naskh mt-2 flex min-h-[48px] items-center justify-center rounded-lg bg-[#14532D] px-4 py-2.5 text-lg font-bold text-white hover:bg-[#0F3F22] dark:bg-[#15803D] cursor-pointer"
            >
              مسئلہ تلاش کریں
            </button>
          </nav>
        </div>
      )}
    </header>
  );
};
