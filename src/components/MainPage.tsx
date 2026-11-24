import React, { useMemo, useRef, useState } from 'react';
import { ArrowLeft, Moon, Search, Sun, X } from 'lucide-react';
import { ABWAB, ALL_MASAIL, TOTAL_MASAIL_COUNT } from '../data/abwab';
import { FontScale, ReadingTheme, ScriptStyle } from '../types/bahar';
import { MasalaCard } from './MasalaCard';

interface MainPageProps {
  searchQuery: string;
  onSearchChange: (q: string) => void;
  searchInputRef: React.RefObject<HTMLInputElement>;
  abwabSectionRef: React.RefObject<HTMLElement>;
  scriptStyle: ScriptStyle;
  onChangeScriptStyle: (s: ScriptStyle) => void;
  fontScale: FontScale;
  onChangeFontScale: (f: FontScale) => void;
  theme: ReadingTheme;
  onToggleTheme: () => void;
  bookmarkedIds: Set<string>;
  onToggleBookmark: (masalaId: string) => void;
  onOpenBaab: (baabId: string) => void;
}

export const MainPage: React.FC<MainPageProps> = ({
  searchQuery,
  onSearchChange,
  searchInputRef,
  abwabSectionRef,
  scriptStyle,
  onChangeScriptStyle,
  fontScale,
  onChangeFontScale,
  theme,
  onToggleTheme,
  bookmarkedIds,
  onToggleBookmark,
  onOpenBaab,
}) => {
  const [visibleResultLimit, setVisibleResultLimit] = useState(40);
  const [heroImgFailed, setHeroImgFailed] = useState(false);

  const baabTitleMap = useMemo(() => {
    const map = new Map<string, string>();
    for (const b of ABWAB) {
      map.set(b.id, b.title);
    }
    return map;
  }, []);

  const trimmedQuery = searchQuery.trim();

  const searchResults = useMemo(() => {
    if (!trimmedQuery) return [];
    const tokens = trimmedQuery.split(/\s+/).filter(Boolean);
    return ALL_MASAIL.filter((item) => {
      const combined = `${item.sawal} ${item.jawab} ${item.fatwa} ${baabTitleMap.get(item.baabId) ?? ''}`;
      return tokens.every((tok) => combined.includes(tok));
    });
  }, [trimmedQuery, baabTitleMap]);

  const quickQueries = [
    'وضو کب ٹوٹتا ہے',
    'نماز میں بھول',
    'روزہ کس سے ٹوٹتا ہے',
    'سجدۂ سہو',
    'زکوٰۃ کا نصاب',
    'تین طلاق',
    'قربانی',
    'جمعہ',
  ];

  const handleQueryInput = (val: string) => {
    setVisibleResultLimit(40);
    onSearchChange(val);
  };

  return (
    <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8 lg:py-10">
      {/* Compact Editorial Banner + Primary Search Section */}
      <section className="rounded-2xl border border-stone-200 bg-[#F7F3EA] p-6 sm:p-8 lg:p-10 dark:border-stone-800 dark:bg-[#191613]">
        <div className="grid grid-cols-1 items-center gap-8 lg:grid-cols-12">
          <div className="lg:col-span-8">
            <p className="font-naskh text-sm sm:text-base font-bold text-[#78350F] dark:text-[#FBBF24]">
              فقہِ حنفی کا مستند اردو مجموعہ · بہارِ شریعت
            </p>
            <h1 className="font-nastaliq mt-2 text-4xl font-bold leading-[1.95] text-stone-950 text-balance sm:text-5xl lg:text-6xl dark:text-stone-50">
              روزمرہ شرعی مسائل و احکام
            </h1>
            <p className="font-naskh mt-3 max-w-2xl text-lg font-medium leading-[2] text-stone-700 sm:text-xl dark:text-stone-200">
              سادہ اور عام فہم اردو زبان میں فقہِ حنفی کے مطابق اپنے روزمرہ مسائل کا فوری جواب تلاش
              کریں یا نیچے تمام انیس ابواب میں سے متعلقہ باب منتخب کریں۔
            </p>

            {/* Huge Prominent Instant Search Bar */}
            <div className="mt-6">
              <div className="relative">
                <Search className="pointer-events-none absolute right-4 top-1/2 h-6 w-6 -translate-y-1/2 text-[#14532D] dark:text-[#6EE7B7]" />
                <input
                  ref={searchInputRef}
                  type="search"
                  value={searchQuery}
                  onChange={(e) => handleQueryInput(e.target.value)}
                  placeholder="اپنا مسئلہ یہاں لکھیں..."
                  aria-label="اپنا مسئلہ یہاں لکھیں"
                  className="font-naskh w-full rounded-xl border-2 border-[#14532D]/35 bg-[#FBF9F5] py-5 pr-14 pl-14 text-xl font-semibold text-stone-950 shadow-sm placeholder:text-stone-500 focus:border-[#14532D] focus:outline-none sm:text-2xl dark:border-[#6EE7B7]/35 dark:bg-[#141210] dark:text-stone-50 dark:focus:border-[#6EE7B7]"
                />
                {searchQuery && (
                  <button
                    type="button"
                    onClick={() => handleQueryInput('')}
                    aria-label="تلاش صاف کریں"
                    className="absolute left-3 top-1/2 -translate-y-1/2 rounded-lg p-2 text-stone-600 hover:bg-stone-200/70 dark:text-stone-300 dark:hover:bg-stone-800 cursor-pointer"
                  >
                    <X className="h-6 w-6" />
                  </button>
                )}
              </div>

              {/* Exact 2-Place Total Counts Below Search Bar */}
              <div className="font-naskh tabular-nums mt-4 flex flex-col gap-2 border-t border-stone-200/90 pt-4 text-lg font-bold text-stone-900 sm:flex-row sm:items-center sm:justify-between sm:text-xl dark:border-stone-800 dark:text-stone-100">
                <p>کل مسائل: {TOTAL_MASAIL_COUNT}</p>
                <p className="text-[#14532D] dark:text-[#6EE7B7]">
                  کل سوالات: {TOTAL_MASAIL_COUNT} - کل جوابات: {TOTAL_MASAIL_COUNT}
                </p>
              </div>

              {/* Quick Suggested Search Terms */}
              <div className="mt-4 flex flex-wrap items-center gap-2.5">
                <span className="font-naskh text-sm sm:text-base font-semibold text-stone-600 dark:text-stone-400">
                  مشہور سوالات:
                </span>
                {quickQueries.map((q) => (
                  <button
                    key={q}
                    type="button"
                    onClick={() => handleQueryInput(q)}
                    className="font-naskh rounded-md border border-stone-300 bg-[#FBF9F5] px-3.5 py-1.5 text-sm sm:text-base font-semibold text-stone-800 transition-colors hover:border-[#14532D] hover:text-[#14532D] dark:border-stone-700 dark:bg-[#231F1B] dark:text-stone-200 dark:hover:border-[#6EE7B7] dark:hover:text-[#6EE7B7] whitespace-nowrap shrink-0 cursor-pointer"
                  >
                    {q}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="hidden lg:block lg:col-span-4">
            <div className="h-64 overflow-hidden rounded-xl border border-stone-200 bg-[#EFEAE0] dark:border-stone-800 dark:bg-[#141210]">
              {!heroImgFailed ? (
                <img
                  src="/src/assets/images/bahar_shariat_manuscript_1795537189131.jpg"
                  alt="بہارِ شریعت کا مطبوعہ نسخہ"
                  referrerPolicy="no-referrer"
                  onError={() => setHeroImgFailed(true)}
                  className="h-full w-full object-cover"
                />
              ) : (
                <div className="flex h-full flex-col items-center justify-center p-6 text-center">
                  <p className="font-nastaliq text-3xl font-bold text-[#14532D] dark:text-[#6EE7B7]">
                    بہارِ شریعت
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Workspace Display Preferences Bar (Script, Size, Dark Mode) */}
      <div className="mt-6 flex flex-wrap items-center justify-between gap-3 border-b border-stone-200 pb-4 dark:border-stone-800">
        <div className="flex flex-wrap items-center gap-2.5">
          <div className="inline-flex items-center rounded-lg bg-[#EFEAE0] p-1 dark:bg-[#1E1B18]">
            <button
              type="button"
              onClick={() => onChangeScriptStyle('nastaliq')}
              className={`font-naskh rounded-md px-3.5 py-2 text-sm sm:text-base font-semibold transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                scriptStyle === 'nastaliq'
                  ? 'bg-[#FBF9F5] text-[#14532D] shadow-sm dark:bg-[#2A2521] dark:text-[#6EE7B7]'
                  : 'text-stone-700 dark:text-stone-300'
              }`}
            >
              خطِ نستعلیق
            </button>
            <button
              type="button"
              onClick={() => onChangeScriptStyle('naskh')}
              className={`font-naskh rounded-md px-3.5 py-2 text-sm sm:text-base font-semibold transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                scriptStyle === 'naskh'
                  ? 'bg-[#FBF9F5] text-[#14532D] shadow-sm dark:bg-[#2A2521] dark:text-[#6EE7B7]'
                  : 'text-stone-700 dark:text-stone-300'
              }`}
            >
              خطِ نسخ
            </button>
          </div>

          <div className="inline-flex items-center rounded-lg bg-[#EFEAE0] p-1 dark:bg-[#1E1B18]">
            {(
              [
                { id: 'small', label: 'چھوٹا' },
                { id: 'medium', label: 'درمیانہ' },
                { id: 'large', label: 'بڑا' },
              ] as { id: FontScale; label: string }[]
            ).map((sz) => (
              <button
                key={sz.id}
                type="button"
                onClick={() => onChangeFontScale(sz.id)}
                className={`font-naskh rounded-md px-3 py-2 text-sm sm:text-base font-semibold transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                  fontScale === sz.id
                    ? 'bg-[#FBF9F5] text-[#14532D] shadow-sm dark:bg-[#2A2521] dark:text-[#6EE7B7]'
                    : 'text-stone-700 dark:text-stone-300'
                }`}
              >
                {sz.label}
              </button>
            ))}
          </div>
        </div>

        <button
          type="button"
          onClick={onToggleTheme}
          className="font-naskh inline-flex items-center gap-2 rounded-lg border border-stone-300 bg-[#FBF9F5] px-4 py-2 text-sm sm:text-base font-bold text-stone-800 transition-colors hover:bg-stone-100 dark:border-stone-700 dark:bg-[#1E1B18] dark:text-stone-100 dark:hover:bg-stone-800 whitespace-nowrap shrink-0 cursor-pointer"
        >
          {theme === 'dark' ? (
            <>
              <Sun className="h-5 w-5 text-amber-400" />
              <span>روشن موڈ</span>
            </>
          ) : (
            <>
              <Moon className="h-5 w-5 text-stone-700" />
              <span>شبینہ موڈ</span>
            </>
          )}
        </button>
      </div>

      {/* Instant Live Search Results (appears immediately as user types) */}
      {trimmedQuery && (
        <section aria-live="polite" className="mt-8">
          <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
            <h2 className="font-nastaliq text-3xl sm:text-4xl font-bold text-stone-950 dark:text-stone-50">
              تلاش کے فوری نتائج
            </h2>
            <div className="flex items-center gap-4">
              <p className="font-naskh tabular-nums text-base sm:text-lg font-bold text-[#14532D] dark:text-[#6EE7B7]">
                ملنے والے مسائل: {searchResults.length}
              </p>
              <button
                type="button"
                onClick={() => handleQueryInput('')}
                className="font-naskh text-sm sm:text-base font-semibold text-stone-700 underline hover:text-stone-950 dark:text-stone-300 dark:hover:text-stone-100 cursor-pointer"
              >
                تلاش ختم کریں
              </button>
            </div>
          </div>

          {searchResults.length === 0 ? (
            <div className="rounded-xl border border-stone-200 bg-[#F7F3EA] p-10 text-center dark:border-stone-800 dark:bg-[#1A1714]">
              <p className="font-naskh text-xl font-bold text-stone-900 dark:text-stone-100">
                ‘‘{trimmedQuery}’’ سے متعلق کوئی مسئلہ نہیں ملا۔
              </p>
              <p className="font-naskh mt-2 text-base sm:text-lg font-medium text-stone-600 dark:text-stone-300">
                براہِ کرم آسان یا مختصر اردو لفظ لکھ کر دوبارہ دیکھیں، یا نیچے تمام ابواب میں سے
                متعلقہ باب کھولیں۔
              </p>
            </div>
          ) : (
            <div className="space-y-5">
              {searchResults.slice(0, visibleResultLimit).map((item, idx) => (
                <MasalaCard
                  key={item.id}
                  masala={item}
                  indexNumber={idx + 1}
                  baabTitle={baabTitleMap.get(item.baabId)}
                  scriptStyle={scriptStyle}
                  fontScale={fontScale}
                  isBookmarked={bookmarkedIds.has(item.id)}
                  onToggleBookmark={onToggleBookmark}
                  onOpenBaab={onOpenBaab}
                />
              ))}

              {searchResults.length > visibleResultLimit && (
                <div className="pt-2 text-center">
                  <button
                    type="button"
                    onClick={() => setVisibleResultLimit((n) => n + 40)}
                    className="font-naskh tabular-nums rounded-lg border border-stone-300 bg-[#FBF9F5] px-7 py-3 text-base font-bold text-stone-900 hover:bg-stone-100 dark:border-stone-700 dark:bg-[#1E1B18] dark:text-stone-100 dark:hover:bg-stone-800 cursor-pointer"
                  >
                    مزید مسائل دکھائیں ({searchResults.length - visibleResultLimit} باقی)
                  </button>
                </div>
              )}
            </div>
          )}
        </section>
      )}

      {/* All 19 Baab Cards Grid */}
      <section ref={abwabSectionRef} className="mt-10" aria-labelledby="abwab-heading">
        <div className="mb-6 flex flex-wrap items-end justify-between gap-3 border-b border-stone-200 pb-4 dark:border-stone-800">
          <div>
            <p className="font-naskh text-sm sm:text-base font-semibold text-stone-600 dark:text-stone-400">
              بہارِ شریعت کے تمام موضوعات
            </p>
            <h2
              id="abwab-heading"
              className="font-nastaliq mt-1 text-3xl font-bold leading-[1.95] text-stone-950 sm:text-4xl dark:text-stone-50"
            >
              تمام فقہی ابواب ({ABWAB.length} ابواب)
            </h2>
          </div>
          <p className="font-naskh tabular-nums text-base sm:text-lg font-bold text-stone-700 dark:text-stone-300">
            کل مسائل: {TOTAL_MASAIL_COUNT}
          </p>
        </div>

        <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
          {ABWAB.map((baab) => {
            const count = baab.masail.length;
            return (
              <button
                key={baab.id}
                type="button"
                onClick={() => onOpenBaab(baab.id)}
                className="group flex flex-col justify-between rounded-xl border border-stone-200 bg-[#F9F6EE] p-6 sm:p-7 text-right transition-colors hover:border-[#14532D]/50 hover:bg-[#F3EFE6] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#14532D] dark:border-stone-800 dark:bg-[#1A1714] dark:hover:border-[#6EE7B7]/40 dark:hover:bg-[#221E1A] cursor-pointer"
              >
                <div>
                  <h3 className="font-naskh text-xl sm:text-2xl font-bold leading-[1.85] text-stone-950 group-hover:text-[#14532D] dark:text-stone-50 dark:group-hover:text-[#6EE7B7]">
                    {baab.title} - اس باب میں {count} سوالات - {count} جوابات
                  </h3>
                  <p className="font-naskh mt-3 text-base sm:text-lg font-medium leading-[1.95] text-stone-700 dark:text-stone-300">
                    {baab.description}
                  </p>
                </div>

                <div className="mt-5 flex items-center justify-between border-t border-stone-200/80 pt-4 text-base font-bold text-[#14532D] dark:border-stone-800 dark:text-[#6EE7B7]">
                  <span className="font-naskh">تمام سوالات و جوابات کھولیں</span>
                  <ArrowLeft className="h-5 w-5 transition-transform group-hover:-translate-x-1" />
                </div>
              </button>
            );
          })}
        </div>
      </section>
    </div>
  );
};
