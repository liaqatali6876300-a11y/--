import React, { useEffect, useMemo, useRef, useState } from 'react';
import { ABWAB, TOTAL_MASAIL_COUNT } from './data/abwab';
import { BaabDetailView } from './components/BaabDetailView';
import { BookmarksView } from './components/BookmarksView';
import { MainPage } from './components/MainPage';
import { OfflineIndicator } from './components/OfflineIndicator';
import { PWAInstallButton } from './components/PWAInstallButton';
import { TopBar } from './components/TopBar';
import { AppView, FontScale, ReadingTheme, ScriptStyle } from './types/bahar';

const STORAGE_BOOKMARKS_KEY = 'bahar_bookmarks_v2';
const STORAGE_PREFS_KEY = 'bahar_prefs_v2';

interface DisplayPrefs {
  scriptStyle: ScriptStyle;
  fontScale: FontScale;
  theme: ReadingTheme;
}

const DEFAULT_PREFS: DisplayPrefs = {
  scriptStyle: 'nastaliq',
  fontScale: 'medium',
  theme: 'light',
};

export default function App() {
  const [activeView, setActiveView] = useState<AppView>('main');
  const [activeBaabId, setActiveBaabId] = useState<string>(ABWAB[0].id);
  const [searchQuery, setSearchQuery] = useState<string>('');

  const searchInputRef = useRef<HTMLInputElement>(null);
  const abwabSectionRef = useRef<HTMLElement>(null);

  const [bookmarkedIds, setBookmarkedIds] = useState<Set<string>>(() => {
    try {
      const raw = localStorage.getItem(STORAGE_BOOKMARKS_KEY);
      if (raw) {
        const parsed = JSON.parse(raw);
        if (Array.isArray(parsed)) {
          return new Set(parsed.filter((x): x is string => typeof x === 'string'));
        }
      }
    } catch {
      // Ignore storage read errors
    }
    return new Set();
  });

  const [prefs, setPrefs] = useState<DisplayPrefs>(() => {
    try {
      const raw = localStorage.getItem(STORAGE_PREFS_KEY);
      if (raw) {
        const parsed = JSON.parse(raw);
        return {
          scriptStyle: parsed?.scriptStyle === 'naskh' ? 'naskh' : 'nastaliq',
          fontScale:
            parsed?.fontScale === 'small' || parsed?.fontScale === 'large'
              ? parsed.fontScale
              : 'medium',
          theme: parsed?.theme === 'dark' ? 'dark' : 'light',
        };
      }
    } catch {
      // Ignore storage read errors
    }
    return DEFAULT_PREFS;
  });

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_BOOKMARKS_KEY, JSON.stringify(Array.from(bookmarkedIds)));
    } catch {
      // Ignore storage write errors
    }
  }, [bookmarkedIds]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_PREFS_KEY, JSON.stringify(prefs));
    } catch {
      // Ignore storage write errors
    }
    document.documentElement.classList.toggle('dark', prefs.theme === 'dark');
  }, [prefs]);

  const activeBaab = useMemo(
    () => ABWAB.find((b) => b.id === activeBaabId) ?? ABWAB[0],
    [activeBaabId]
  );

  const handleToggleBookmark = (masalaId: string) => {
    setBookmarkedIds((prev) => {
      const next = new Set(prev);
      if (next.has(masalaId)) {
        next.delete(masalaId);
      } else {
        next.add(masalaId);
      }
      return next;
    });
  };

  const handleClearAllBookmarks = () => {
    setBookmarkedIds(new Set());
  };

  const handleOpenBaab = (baabId: string) => {
    setActiveBaabId(baabId);
    setActiveView('baab');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleGoMain = () => {
    setActiveView('main');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleOpenQuickSearch = () => {
    setActiveView('main');
    window.scrollTo({ top: 0, behavior: 'smooth' });
    window.setTimeout(() => {
      searchInputRef.current?.focus();
    }, 120);
  };

  const handleScrollToAbwab = () => {
    setActiveView('main');
    window.setTimeout(() => {
      abwabSectionRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 80);
  };

  const handleOpenBookmarks = () => {
    setActiveView('bookmarks');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div
      dir="rtl"
      lang="ur"
      className="min-h-screen flex flex-col bg-[#FBF9F5] text-[#1C1917] transition-colors duration-200 dark:bg-[#141210] dark:text-[#E7E2D8]"
    >
      <TopBar
        activeView={activeView}
        bookmarkCount={bookmarkedIds.size}
        onGoMain={handleGoMain}
        onOpenQuickSearch={handleOpenQuickSearch}
        onOpenBookmarks={handleOpenBookmarks}
        onScrollToAbwab={handleScrollToAbwab}
      />

      <main className="flex-1">
        {activeView === 'main' && (
          <MainPage
            searchQuery={searchQuery}
            onSearchChange={setSearchQuery}
            searchInputRef={searchInputRef}
            abwabSectionRef={abwabSectionRef}
            scriptStyle={prefs.scriptStyle}
            onChangeScriptStyle={(scriptStyle) => setPrefs((p) => ({ ...p, scriptStyle }))}
            fontScale={prefs.fontScale}
            onChangeFontScale={(fontScale) => setPrefs((p) => ({ ...p, fontScale }))}
            theme={prefs.theme}
            onToggleTheme={() =>
              setPrefs((p) => ({ ...p, theme: p.theme === 'dark' ? 'light' : 'dark' }))
            }
            bookmarkedIds={bookmarkedIds}
            onToggleBookmark={handleToggleBookmark}
            onOpenBaab={handleOpenBaab}
          />
        )}

        {activeView === 'baab' && (
          <BaabDetailView
            baab={activeBaab}
            scriptStyle={prefs.scriptStyle}
            onChangeScriptStyle={(scriptStyle) => setPrefs((p) => ({ ...p, scriptStyle }))}
            fontScale={prefs.fontScale}
            onChangeFontScale={(fontScale) => setPrefs((p) => ({ ...p, fontScale }))}
            theme={prefs.theme}
            onToggleTheme={() =>
              setPrefs((p) => ({ ...p, theme: p.theme === 'dark' ? 'light' : 'dark' }))
            }
            bookmarkedIds={bookmarkedIds}
            onToggleBookmark={handleToggleBookmark}
            onBackToMain={handleGoMain}
            onSelectBaab={handleOpenBaab}
          />
        )}

        {activeView === 'bookmarks' && (
          <BookmarksView
            bookmarkedIds={bookmarkedIds}
            scriptStyle={prefs.scriptStyle}
            fontScale={prefs.fontScale}
            onToggleBookmark={handleToggleBookmark}
            onClearAllBookmarks={handleClearAllBookmarks}
            onOpenBaab={handleOpenBaab}
            onGoMain={handleGoMain}
          />
        )}
      </main>

      <footer className="mt-12 border-t border-stone-200 bg-[#F4EFE4] py-8 dark:border-stone-800 dark:bg-[#191613]">
        <div className="mx-auto flex max-w-7xl flex-col gap-4 px-4 sm:flex-row sm:items-center sm:justify-between sm:px-6 lg:px-8">
          <div>
            <p className="font-nastaliq text-2xl font-bold text-[#14532D] dark:text-[#6EE7B7]">
              بہارِ شریعت
            </p>
            <p className="font-naskh mt-1.5 text-sm sm:text-base font-semibold text-stone-700 dark:text-stone-300">
              فقہِ حنفی کے مستند سوالات و جوابات — کل مسائل: {TOTAL_MASAIL_COUNT}
            </p>
          </div>

          <div className="font-naskh flex flex-wrap items-center gap-6 text-sm sm:text-base font-semibold text-stone-700 dark:text-stone-300">
            <button
              type="button"
              onClick={handleGoMain}
              className="hover:text-[#14532D] dark:hover:text-[#6EE7B7] cursor-pointer"
            >
              صفحۂ اول
            </button>
            <button
              type="button"
              onClick={handleScrollToAbwab}
              className="hover:text-[#14532D] dark:hover:text-[#6EE7B7] cursor-pointer"
            >
              تمام ابواب
            </button>
            <button
              type="button"
              onClick={handleOpenQuickSearch}
              className="hover:text-[#14532D] dark:hover:text-[#6EE7B7] cursor-pointer"
            >
              فوری تلاش
            </button>
            <button
              type="button"
              onClick={handleOpenBookmarks}
              className="hover:text-[#14532D] dark:hover:text-[#6EE7B7] cursor-pointer"
            >
              نشان زدہ مسائل
            </button>
            <PWAInstallButton variant="link" />
          </div>
        </div>
      </footer>

      <OfflineIndicator />
    </div>
  );
}
