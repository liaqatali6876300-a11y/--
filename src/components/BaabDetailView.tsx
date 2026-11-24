import React, { useMemo, useState } from 'react';
import { ArrowLeft, ArrowRight, Moon, Search, Sun, X } from 'lucide-react';
import { ABWAB } from '../data/abwab';
import { Baab, FatwaStatus, FontScale, ReadingTheme, ScriptStyle } from '../types/bahar';
import { MasalaCard } from './MasalaCard';

interface BaabDetailViewProps {
  baab: Baab;
  scriptStyle: ScriptStyle;
  onChangeScriptStyle: (s: ScriptStyle) => void;
  fontScale: FontScale;
  onChangeFontScale: (f: FontScale) => void;
  theme: ReadingTheme;
  onToggleTheme: () => void;
  bookmarkedIds: Set<string>;
  onToggleBookmark: (masalaId: string) => void;
  onBackToMain: () => void;
  onSelectBaab: (baabId: string) => void;
}

const FATWA_FILTERS: ('تمام' | FatwaStatus)[] = [
  'تمام',
  'فرض',
  'واجب',
  'سنت',
  'جائز',
  'مکروہ',
  'ناجائز',
];

export const BaabDetailView: React.FC<BaabDetailViewProps> = ({
  baab,
  scriptStyle,
  onChangeScriptStyle,
  fontScale,
  onChangeFontScale,
  theme,
  onToggleTheme,
  bookmarkedIds,
  onToggleBookmark,
  onBackToMain,
  onSelectBaab,
}) => {
  const [localQuery, setLocalQuery] = useState('');
  const [selectedFatwa, setSelectedFatwa] = useState<'تمام' | FatwaStatus>('تمام');
  const [visibleLimit, setVisibleLimit] = useState(50);

  const currentIndex = ABWAB.findIndex((b) => b.id === baab.id);
  const prevBaab = currentIndex > 0 ? ABWAB[currentIndex - 1] : null;
  const nextBaab = currentIndex >= 0 && currentIndex < ABWAB.length - 1 ? ABWAB[currentIndex + 1] : null;

  const filteredMasail = useMemo(() => {
    const trimmed = localQuery.trim();
    const tokens = trimmed ? trimmed.split(/\s+/).filter(Boolean) : [];
    return baab.masail.filter((item) => {
      if (selectedFatwa !== 'تمام' && item.fatwa !== selectedFatwa) {
        return false;
      }
      if (tokens.length === 0) return true;
      const combined = `${item.sawal} ${item.jawab} ${item.fatwa}`;
      return tokens.every((tok) => combined.includes(tok));
    });
  }, [baab.masail, localQuery, selectedFatwa]);

  const handleOpenOtherBaab = (id: string) => {
    setLocalQuery('');
    setSelectedFatwa('تمام');
    setVisibleLimit(50);
    onSelectBaab(id);
  };

  return (
    <div className="mx-auto max-w-5xl px-4 py-6 sm:px-6 lg:px-8 lg:py-10">
      {/* Back to Main Navigation */}
      <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
        <button
          type="button"
          onClick={onBackToMain}
          className="font-naskh inline-flex items-center gap-2 rounded-lg border border-stone-300 bg-[#FBF9F5] px-4 py-2.5 text-sm sm:text-base font-bold text-stone-800 transition-colors hover:bg-stone-100 dark:border-stone-700 dark:bg-[#1E1B18] dark:text-stone-100 dark:hover:bg-stone-800 cursor-pointer"
        >
          <ArrowRight className="h-5 w-5" />
          <span>واپس صفحۂ اول</span>
        </button>

        <p className="font-naskh tabular-nums text-sm sm:text-base font-semibold text-stone-600 dark:text-stone-400">
          باب نمبر {currentIndex + 1} از {ABWAB.length}
        </p>
      </div>

      {/* Baab Header Card */}
      <section className="rounded-2xl border border-stone-200 bg-[#F7F3EA] p-6 sm:p-8 dark:border-stone-800 dark:bg-[#191613]">
        <p className="font-naskh text-sm sm:text-base font-bold text-[#78350F] dark:text-[#FBBF24]">
          بہارِ شریعت · فقہی باب
        </p>
        <h1 className="font-nastaliq mt-2 text-3xl font-bold leading-[2.05] text-stone-950 sm:text-4xl dark:text-stone-50">
          {baab.title} - اس باب میں {baab.masail.length} سوالات - {baab.masail.length} جوابات
        </h1>
        <p className="font-naskh mt-3 text-lg font-medium leading-[2] text-stone-700 sm:text-xl dark:text-stone-200">
          {baab.description}
        </p>

        {/* Inside-Baab Instant Search Input */}
        <div className="mt-5 relative">
          <Search className="pointer-events-none absolute right-4 top-1/2 h-5 w-5 -translate-y-1/2 text-[#14532D] dark:text-[#6EE7B7]" />
          <input
            type="search"
            value={localQuery}
            onChange={(e) => {
              setLocalQuery(e.target.value);
              setVisibleLimit(50);
            }}
            placeholder="اس باب میں مسئلہ تلاش کریں..."
            aria-label="اس باب میں مسئلہ تلاش کریں"
            className="font-naskh w-full rounded-xl border border-stone-300 bg-[#FBF9F5] py-4 pr-12 pl-12 text-lg font-semibold text-stone-950 placeholder:text-stone-500 focus:border-[#14532D] focus:outline-none sm:text-xl dark:border-stone-700 dark:bg-[#141210] dark:text-stone-50 dark:focus:border-[#6EE7B7]"
          />
          {localQuery && (
            <button
              type="button"
              onClick={() => setLocalQuery('')}
              aria-label="تلاش صاف کریں"
              className="absolute left-3 top-1/2 -translate-y-1/2 rounded-md p-1.5 text-stone-600 hover:bg-stone-200/70 dark:text-stone-300 dark:hover:bg-stone-800 cursor-pointer"
            >
              <X className="h-5 w-5" />
            </button>
          )}
        </div>

        {/* Fatwa Filter Tabs */}
        <div className="mt-4 flex flex-wrap items-center gap-2.5">
          <span className="font-naskh text-sm sm:text-base font-semibold text-stone-600 dark:text-stone-400">
            حکم کے لحاظ سے:
          </span>
          {FATWA_FILTERS.map((fatwa) => {
            const active = selectedFatwa === fatwa;
            return (
              <button
                key={fatwa}
                type="button"
                onClick={() => {
                  setSelectedFatwa(fatwa);
                  setVisibleLimit(50);
                }}
                className={`font-naskh rounded-md border px-3.5 py-1.5 text-sm sm:text-base font-bold transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                  active
                    ? 'border-[#14532D] bg-[#14532D] text-white dark:border-[#6EE7B7] dark:bg-[#15803D]'
                    : 'border-stone-300 bg-[#FBF9F5] text-stone-800 hover:bg-stone-100 dark:border-stone-700 dark:bg-[#231F1B] dark:text-stone-200 dark:hover:bg-stone-800'
                }`}
              >
                {fatwa}
              </button>
            );
          })}
        </div>
      </section>

      {/* Display Controls & Result Count */}
      <div className="mt-5 flex flex-wrap items-center justify-between gap-3 border-b border-stone-200 pb-4 dark:border-stone-800">
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

        <div className="flex items-center gap-3">
          <span className="font-naskh tabular-nums text-sm sm:text-base font-bold text-stone-700 dark:text-stone-300">
            ظاہر شدہ مسائل: {filteredMasail.length}
          </span>
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
      </div>

      {/* Sawal-Jawab List */}
      <section className="mt-6 space-y-5">
        {filteredMasail.length === 0 ? (
          <div className="rounded-xl border border-stone-200 bg-[#F7F3EA] p-10 text-center dark:border-stone-800 dark:bg-[#1A1714]">
            <p className="font-naskh text-xl font-bold text-stone-900 dark:text-stone-100">
              اس تلاش یا حکم کے تحت اس باب میں کوئی مسئلہ نہیں ملا۔
            </p>
            <button
              type="button"
              onClick={() => {
                setLocalQuery('');
                setSelectedFatwa('تمام');
              }}
              className="font-naskh mt-4 rounded-lg bg-[#14532D] px-5 py-2.5 text-sm sm:text-base font-bold text-white hover:bg-[#0F3F22] dark:bg-[#15803D] cursor-pointer"
            >
              تمام مسائل دکھائیں
            </button>
          </div>
        ) : (
          <>
            {filteredMasail.slice(0, visibleLimit).map((item, idx) => (
              <MasalaCard
                key={item.id}
                masala={item}
                indexNumber={idx + 1}
                scriptStyle={scriptStyle}
                fontScale={fontScale}
                isBookmarked={bookmarkedIds.has(item.id)}
                onToggleBookmark={onToggleBookmark}
              />
            ))}

            {filteredMasail.length > visibleLimit && (
              <div className="flex flex-wrap items-center justify-center gap-3 pt-4">
                <button
                  type="button"
                  onClick={() => setVisibleLimit((n) => n + 50)}
                  className="font-naskh tabular-nums rounded-lg border border-stone-300 bg-[#FBF9F5] px-7 py-3 text-base font-bold text-stone-900 hover:bg-stone-100 dark:border-stone-700 dark:bg-[#1E1B18] dark:text-stone-100 dark:hover:bg-stone-800 cursor-pointer"
                >
                  مزید ۵۰ مسائل دکھائیں ({filteredMasail.length - visibleLimit} باقی)
                </button>
                <button
                  type="button"
                  onClick={() => setVisibleLimit(filteredMasail.length)}
                  className="font-naskh tabular-nums rounded-lg bg-[#14532D] px-6 py-3 text-base font-bold text-white hover:bg-[#0F3F22] dark:bg-[#15803D] cursor-pointer"
                >
                  تمام ({filteredMasail.length}) مسائل ایک ساتھ دیکھیں
                </button>
              </div>
            )}
          </>
        )}
      </section>

      {/* Previous / Next Baab Footer Navigation */}
      <nav
        aria-label="ابواب کے درمیان منتقلی"
        className="mt-10 grid grid-cols-1 gap-4 border-t border-stone-200 pt-6 sm:grid-cols-2 dark:border-stone-800"
      >
        {prevBaab ? (
          <button
            type="button"
            onClick={() => handleOpenOtherBaab(prevBaab.id)}
            className="flex items-center justify-between rounded-xl border border-stone-200 bg-[#F9F6EE] p-5 text-right transition-colors hover:border-[#14532D]/50 dark:border-stone-800 dark:bg-[#1A1714] dark:hover:border-[#6EE7B7]/40 cursor-pointer"
          >
            <div className="flex items-center gap-3">
              <ArrowRight className="h-5 w-5 text-[#14532D] dark:text-[#6EE7B7]" />
              <div>
                <p className="font-naskh text-sm text-stone-600 dark:text-stone-400">پچھلا باب</p>
                <p className="font-naskh text-lg font-bold text-stone-950 dark:text-stone-50">
                  {prevBaab.title}
                </p>
              </div>
            </div>
          </button>
        ) : (
          <div />
        )}

        {nextBaab ? (
          <button
            type="button"
            onClick={() => handleOpenOtherBaab(nextBaab.id)}
            className="flex items-center justify-between rounded-xl border border-stone-200 bg-[#F9F6EE] p-5 text-right transition-colors hover:border-[#14532D]/50 dark:border-stone-800 dark:bg-[#1A1714] dark:hover:border-[#6EE7B7]/40 cursor-pointer"
          >
            <div>
              <p className="font-naskh text-sm text-stone-600 dark:text-stone-400">اگلا باب</p>
              <p className="font-naskh text-lg font-bold text-stone-950 dark:text-stone-50">
                {nextBaab.title}
              </p>
            </div>
            <ArrowLeft className="h-5 w-5 text-[#14532D] dark:text-[#6EE7B7]" />
          </button>
        ) : (
          <div />
        )}
      </nav>
    </div>
  );
};
