import React, { useMemo, useState } from 'react';
import { ArrowRight, Bookmark, Search, Trash2, X } from 'lucide-react';
import { ABWAB, ALL_MASAIL } from '../data/abwab';
import { FontScale, ScriptStyle } from '../types/bahar';
import { MasalaCard } from './MasalaCard';

interface BookmarksViewProps {
  bookmarkedIds: Set<string>;
  scriptStyle: ScriptStyle;
  fontScale: FontScale;
  onToggleBookmark: (masalaId: string) => void;
  onClearAllBookmarks: () => void;
  onOpenBaab: (baabId: string) => void;
  onGoMain: () => void;
}

export const BookmarksView: React.FC<BookmarksViewProps> = ({
  bookmarkedIds,
  scriptStyle,
  fontScale,
  onToggleBookmark,
  onClearAllBookmarks,
  onOpenBaab,
  onGoMain,
}) => {
  const [filterQuery, setFilterQuery] = useState('');

  const baabTitleMap = useMemo(() => {
    const map = new Map<string, string>();
    for (const b of ABWAB) {
      map.set(b.id, b.title);
    }
    return map;
  }, []);

  const bookmarkedMasail = useMemo(() => {
    const list = ALL_MASAIL.filter((item) => bookmarkedIds.has(item.id));
    const trimmed = filterQuery.trim();
    if (!trimmed) return list;
    const tokens = trimmed.split(/\s+/).filter(Boolean);
    return list.filter((item) => {
      const combined = `${item.sawal} ${item.jawab} ${item.fatwa} ${baabTitleMap.get(item.baabId) ?? ''}`;
      return tokens.every((tok) => combined.includes(tok));
    });
  }, [bookmarkedIds, filterQuery, baabTitleMap]);

  return (
    <div className="mx-auto max-w-5xl px-4 py-6 sm:px-6 lg:px-8 lg:py-10">
      <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
        <button
          type="button"
          onClick={onGoMain}
          className="font-naskh inline-flex items-center gap-2 rounded-lg border border-stone-300 bg-[#FBF9F5] px-4 py-2.5 text-sm sm:text-base font-bold text-stone-800 transition-colors hover:bg-stone-100 dark:border-stone-700 dark:bg-[#1E1B18] dark:text-stone-100 dark:hover:bg-stone-800 cursor-pointer"
        >
          <ArrowRight className="h-5 w-5" />
          <span>واپس صفحۂ اول</span>
        </button>

        {bookmarkedIds.size > 0 && (
          <button
            type="button"
            onClick={onClearAllBookmarks}
            className="font-naskh inline-flex items-center gap-2 rounded-lg border border-red-300 bg-[#FBF9F5] px-4 py-2.5 text-sm sm:text-base font-bold text-red-700 transition-colors hover:bg-red-50 dark:border-red-900/50 dark:bg-[#1E1B18] dark:text-red-400 dark:hover:bg-red-950/30 cursor-pointer"
          >
            <Trash2 className="h-4 w-4" />
            <span>تمام نشانیاں صاف کریں</span>
          </button>
        )}
      </div>

      <section className="rounded-2xl border border-stone-200 bg-[#F7F3EA] p-6 sm:p-8 dark:border-stone-800 dark:bg-[#191613]">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <p className="font-naskh text-sm sm:text-base font-bold text-[#78350F] dark:text-[#FBBF24]">
              محفوظ شدہ فہرست
            </p>
            <h1 className="font-nastaliq mt-1 text-3xl font-bold leading-[1.95] text-stone-950 sm:text-4xl dark:text-stone-50">
              نشان زدہ مسائل
            </h1>
          </div>
          <p className="font-naskh tabular-nums rounded-lg border border-stone-300 bg-[#FBF9F5] px-4 py-2.5 text-base sm:text-lg font-bold text-[#14532D] dark:border-stone-700 dark:bg-[#141210] dark:text-[#6EE7B7]">
            کل محفوظ مسائل: {bookmarkedIds.size}
          </p>
        </div>

        {bookmarkedIds.size > 0 && (
          <div className="mt-5 relative">
            <Search className="pointer-events-none absolute right-4 top-1/2 h-5 w-5 -translate-y-1/2 text-[#14532D] dark:text-[#6EE7B7]" />
            <input
              type="search"
              value={filterQuery}
              onChange={(e) => setFilterQuery(e.target.value)}
              placeholder="محفوظ شدہ مسائل میں تلاش کریں..."
              aria-label="محفوظ شدہ مسائل میں تلاش کریں"
              className="font-naskh w-full rounded-xl border border-stone-300 bg-[#FBF9F5] py-4 pr-12 pl-12 text-lg font-semibold text-stone-950 placeholder:text-stone-500 focus:border-[#14532D] focus:outline-none sm:text-xl dark:border-stone-700 dark:bg-[#141210] dark:text-stone-50 dark:focus:border-[#6EE7B7]"
            />
            {filterQuery && (
              <button
                type="button"
                onClick={() => setFilterQuery('')}
                aria-label="تلاش صاف کریں"
                className="absolute left-3 top-1/2 -translate-y-1/2 rounded-md p-1.5 text-stone-600 hover:bg-stone-200/70 dark:text-stone-300 dark:hover:bg-stone-800 cursor-pointer"
              >
                <X className="h-5 w-5" />
              </button>
            )}
          </div>
        )}
      </section>

      <section className="mt-6 space-y-5">
        {bookmarkedIds.size === 0 ? (
          <div className="rounded-xl border border-stone-200 bg-[#F7F3EA] p-12 text-center dark:border-stone-800 dark:bg-[#1A1714]">
            <Bookmark className="mx-auto h-12 w-12 text-stone-400 dark:text-stone-500" />
            <h2 className="font-nastaliq mt-4 text-2xl sm:text-3xl font-bold text-stone-950 dark:text-stone-50">
              ابھی کوئی مسئلہ نشان زد نہیں کیا گیا
            </h2>
            <p className="font-naskh mt-3 text-base sm:text-lg font-medium text-stone-700 dark:text-stone-300">
              کسی بھی سوال و جواب کے نیچے موجود ‘‘نشان زد کریں’’ کے بٹن پر کلک کر کے اسے یہاں محفوظ
              کریں۔
            </p>
            <button
              type="button"
              onClick={onGoMain}
              className="font-naskh mt-5 rounded-lg bg-[#14532D] px-6 py-3 text-base font-bold text-white hover:bg-[#0F3F22] dark:bg-[#15803D] cursor-pointer"
            >
              مسائل تلاش کریں
            </button>
          </div>
        ) : bookmarkedMasail.length === 0 ? (
          <div className="rounded-xl border border-stone-200 bg-[#F7F3EA] p-10 text-center dark:border-stone-800 dark:bg-[#1A1714]">
            <p className="font-naskh text-xl font-bold text-stone-900 dark:text-stone-100">
              ‘‘{filterQuery}’’ سے متعلق کوئی محفوظ مسئلہ نہیں ملا۔
            </p>
          </div>
        ) : (
          bookmarkedMasail.map((item, idx) => (
            <MasalaCard
              key={item.id}
              masala={item}
              indexNumber={idx + 1}
              baabTitle={baabTitleMap.get(item.baabId)}
              scriptStyle={scriptStyle}
              fontScale={fontScale}
              isBookmarked={true}
              onToggleBookmark={onToggleBookmark}
              onOpenBaab={onOpenBaab}
            />
          ))
        )}
      </section>
    </div>
  );
};
