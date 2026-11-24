import React, { useState } from 'react';
import { Bookmark, Check, Copy } from 'lucide-react';
import { FatwaStatus, FontScale, SawalJawab, ScriptStyle } from '../types/bahar';

interface MasalaCardProps {
  masala: SawalJawab;
  baabTitle?: string;
  indexNumber?: number;
  scriptStyle: ScriptStyle;
  fontScale: FontScale;
  isBookmarked: boolean;
  onToggleBookmark: (masalaId: string) => void;
  onOpenBaab?: (baabId: string) => void;
}

const FATWA_STYLES: Record<FatwaStatus, string> = {
  فرض: 'border-emerald-800/30 bg-emerald-900/10 text-emerald-900 dark:border-emerald-400/30 dark:bg-emerald-500/15 dark:text-emerald-300',
  واجب: 'border-teal-800/30 bg-teal-900/10 text-teal-900 dark:border-teal-400/30 dark:bg-teal-500/15 dark:text-teal-300',
  سنت: 'border-sky-800/30 bg-sky-900/10 text-sky-900 dark:border-sky-400/30 dark:bg-sky-500/15 dark:text-sky-300',
  جائز: 'border-lime-800/30 bg-lime-900/10 text-lime-900 dark:border-lime-400/30 dark:bg-lime-500/15 dark:text-lime-300',
  مکروہ: 'border-amber-800/30 bg-amber-900/10 text-amber-900 dark:border-amber-400/30 dark:bg-amber-500/15 dark:text-amber-300',
  ناجائز: 'border-red-800/30 bg-red-900/10 text-red-900 dark:border-red-400/30 dark:bg-red-500/15 dark:text-red-300',
};

export const MasalaCard: React.FC<MasalaCardProps> = ({
  masala,
  baabTitle,
  indexNumber,
  scriptStyle,
  fontScale,
  isBookmarked,
  onToggleBookmark,
  onOpenBaab,
}) => {
  const [copied, setCopied] = useState(false);

  const sawalSizeClass =
    scriptStyle === 'nastaliq'
      ? fontScale === 'small'
        ? 'text-2xl sm:text-3xl'
        : fontScale === 'large'
          ? 'text-4xl sm:text-5xl'
          : 'text-3xl sm:text-[34px]'
      : fontScale === 'small'
        ? 'text-xl sm:text-2xl'
        : fontScale === 'large'
          ? 'text-3xl sm:text-4xl'
          : 'text-2xl sm:text-3xl';

  const jawabSizeClass =
    scriptStyle === 'nastaliq'
      ? fontScale === 'small'
        ? 'text-xl sm:text-2xl'
        : fontScale === 'large'
          ? 'text-3xl sm:text-4xl'
          : 'text-2xl sm:text-[26px]'
      : fontScale === 'small'
        ? 'text-lg sm:text-xl'
        : fontScale === 'large'
          ? 'text-2xl sm:text-3xl'
          : 'text-xl sm:text-2xl';

  const scriptClass =
    scriptStyle === 'nastaliq'
      ? 'font-nastaliq leading-[2.45]'
      : 'font-naskh leading-[2.05]';

  const handleCopy = async () => {
    const textToCopy = `سوال: ${masala.sawal}\nجواب: ${masala.jawab}\nفتویٰ: ${masala.fatwa}`;
    try {
      await navigator.clipboard.writeText(textToCopy);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1800);
    } catch {
      const textarea = document.createElement('textarea');
      textarea.value = textToCopy;
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand('copy');
      document.body.removeChild(textarea);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1800);
    }
  };

  return (
    <article className="rounded-xl border border-stone-200 bg-[#F9F6EE] p-6 transition-colors sm:p-8 dark:border-stone-800 dark:bg-[#1A1714]">
      {/* Quiet Top Metadata Line (only if baabTitle or indexNumber provided) */}
      {(baabTitle || indexNumber !== undefined) && (
        <div className="font-naskh mb-3.5 flex flex-wrap items-center justify-between gap-2 text-sm sm:text-base text-stone-600 dark:text-stone-400">
          <div className="flex items-center gap-2.5">
            {indexNumber !== undefined && (
              <span className="tabular-nums font-bold text-stone-800 dark:text-stone-200">
                مسئلہ نمبر {indexNumber}
              </span>
            )}
            {indexNumber !== undefined && baabTitle && <span aria-hidden="true">·</span>}
            {baabTitle && onOpenBaab ? (
              <button
                type="button"
                onClick={() => onOpenBaab(masala.baabId)}
                className="font-bold text-[#14532D] hover:underline dark:text-[#6EE7B7] cursor-pointer"
              >
                {baabTitle}
              </button>
            ) : baabTitle ? (
              <span className="font-semibold">{baabTitle}</span>
            ) : null}
          </div>
        </div>
      )}

      {/* Sawal (Larger & Prominent) */}
      <h3
        className={`font-bold text-stone-950 dark:text-stone-50 ${scriptClass} ${sawalSizeClass}`}
      >
        <span className="text-[#14532D] dark:text-[#6EE7B7]">سوال: </span>
        {masala.sawal}
      </h3>

      {/* Jawab (Clean & Easy Hanafi Answer - Zero Hadith Hawala) */}
      <p
        className={`mt-5 font-medium text-stone-900 dark:text-stone-100 ${scriptClass} ${jawabSizeClass}`}
      >
        <span className="font-bold text-[#78350F] dark:text-[#FBBF24]">جواب: </span>
        {masala.jawab}
      </p>

      {/* Bottom Action & Fatwa Row */}
      <div className="mt-6 flex flex-wrap items-center justify-between gap-3 border-t border-stone-200/80 pt-4 dark:border-stone-800">
        {/* Colored Fatwa Status with Explicit Text Label */}
        <div
          className={`font-naskh inline-flex items-center gap-2 rounded-md border px-3.5 py-1.5 text-sm sm:text-base font-bold whitespace-nowrap shrink-0 ${FATWA_STYLES[masala.fatwa]}`}
        >
          <span>فتویٰ:</span>
          <span>{masala.fatwa}</span>
        </div>

        {/* Copy & Bookmark Action Buttons */}
        <div className="flex items-center gap-2.5">
          <button
            type="button"
            onClick={handleCopy}
            className="font-naskh inline-flex min-h-[42px] items-center gap-2 rounded-lg border border-stone-300 bg-[#FBF9F5] px-4 py-2 text-sm sm:text-base font-semibold text-stone-800 transition-colors hover:bg-stone-100 dark:border-stone-700 dark:bg-[#231F1B] dark:text-stone-100 dark:hover:bg-stone-800 whitespace-nowrap shrink-0 cursor-pointer"
          >
            {copied ? (
              <>
                <Check className="h-4 w-4 text-[#14532D] dark:text-[#6EE7B7]" />
                <span>نقل ہو گیا</span>
              </>
            ) : (
              <>
                <Copy className="h-4 w-4" />
                <span>نقل کریں</span>
              </>
            )}
          </button>

          <button
            type="button"
            onClick={() => onToggleBookmark(masala.id)}
            className={`font-naskh inline-flex min-h-[42px] items-center gap-2 rounded-lg border px-4 py-2 text-sm sm:text-base font-semibold transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
              isBookmarked
                ? 'border-[#14532D] bg-[#14532D]/10 text-[#14532D] dark:border-[#6EE7B7] dark:bg-[#6EE7B7]/10 dark:text-[#6EE7B7]'
                : 'border-stone-300 bg-[#FBF9F5] text-stone-800 hover:bg-stone-100 dark:border-stone-700 dark:bg-[#231F1B] dark:text-stone-100 dark:hover:bg-stone-800'
            }`}
          >
            <Bookmark
              className="h-4 w-4"
              fill={isBookmarked ? 'currentColor' : 'none'}
            />
            <span>{isBookmarked ? 'نشان زدہ' : 'نشان زد کریں'}</span>
          </button>
        </div>
      </div>
    </article>
  );
};
