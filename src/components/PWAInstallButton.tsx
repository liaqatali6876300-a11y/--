import React, { useState } from 'react';
import { Download, Share, Smartphone, X } from 'lucide-react';
import { usePWAInstall } from '../hooks/usePWAInstall';

interface PWAInstallButtonProps {
  variant?: 'button' | 'banner' | 'link';
}

export const PWAInstallButton: React.FC<PWAInstallButtonProps> = ({ variant = 'button' }) => {
  const { isInstallable, isInstalled, isIOS, install } = usePWAInstall();
  const [showGuideModal, setShowGuideModal] = useState(false);
  const [dismissedBanner, setDismissedBanner] = useState(false);

  if (isInstalled) {
    return null;
  }

  if (variant === 'banner' && dismissedBanner) {
    return null;
  }

  const handleInstallClick = async () => {
    if (isInstallable) {
      const accepted = await install();
      if (!accepted) {
        return;
      }
      return;
    }
    setShowGuideModal(true);
  };

  const renderModal = () =>
    showGuideModal && (
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="install-guide-title"
        className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-xs"
      >
        <div className="w-full max-w-md rounded-2xl border border-stone-200 bg-[#FBF9F5] p-6 shadow-2xl dark:border-stone-700 dark:bg-[#1A1714]">
          <div className="flex items-start justify-between gap-4 border-b border-stone-200 pb-4 dark:border-stone-800">
            <div>
              <p className="font-naskh text-sm font-bold text-[#78350F] dark:text-[#FBBF24]">
                بہارِ شریعت ایپ
              </p>
              <h3
                id="install-guide-title"
                className="font-nastaliq mt-1 text-2xl font-bold text-stone-950 dark:text-stone-50"
              >
                فون یا کمپیوٹر پر انسٹال کرنے کا طریقہ
              </h3>
            </div>
            <button
              type="button"
              onClick={() => setShowGuideModal(false)}
              aria-label="بند کریں"
              className="rounded-lg p-2 text-stone-600 hover:bg-stone-200/70 dark:text-stone-300 dark:hover:bg-stone-800 cursor-pointer"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          {isIOS ? (
            <ol className="font-naskh mt-5 space-y-3 text-base font-medium leading-[1.9] text-stone-800 dark:text-stone-200">
              <li className="flex items-start gap-3">
                <span className="mt-1 inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#14532D] text-xs font-bold text-white dark:bg-[#15803D]">
                  ۱
                </span>
                <span>
                  براؤزر کے نیچے یا اوپر موجود{' '}
                  <strong className="inline-flex items-center gap-1 font-bold text-[#14532D] dark:text-[#6EE7B7]">
                    <Share className="h-4 w-4" />
                    شیئر
                  </strong>{' '}
                  کے بٹن پر کلک کریں۔
                </span>
              </li>
              <li className="flex items-start gap-3">
                <span className="mt-1 inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#14532D] text-xs font-bold text-white dark:bg-[#15803D]">
                  ۲
                </span>
                <span>
                  فہرست میں نیچے جا کر <strong>‘‘ہوم اسکرین پر شامل کریں’’</strong> منتخب کریں۔
                </span>
              </li>
              <li className="flex items-start gap-3">
                <span className="mt-1 inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#14532D] text-xs font-bold text-white dark:bg-[#15803D]">
                  ۳
                </span>
                <span>
                  اوپر کونے میں <strong>‘‘شامل کریں’’</strong> دبا دیں، ایپ آپ کے فون پر آ جائے گی۔
                </span>
              </li>
            </ol>
          ) : (
            <ol className="font-naskh mt-5 space-y-3 text-base font-medium leading-[1.9] text-stone-800 dark:text-stone-200">
              <li className="flex items-start gap-3">
                <span className="mt-1 inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#14532D] text-xs font-bold text-white dark:bg-[#15803D]">
                  ۱
                </span>
                <span>
                  اپنے براؤزر کے اوپر کونے میں موجود <strong>تین نقطوں والے مینیو</strong> یا ایڈریس بار کے اندر{' '}
                  <strong>انسٹال آئیکن</strong> پر کلک کریں۔
                </span>
              </li>
              <li className="flex items-start gap-3">
                <span className="mt-1 inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#14532D] text-xs font-bold text-white dark:bg-[#15803D]">
                  ۲
                </span>
                <span>
                  وہاں سے <strong>‘‘ایپ انسٹال کریں’’</strong> یا{' '}
                  <strong>‘‘ہوم اسکرین پر شامل کریں’’</strong> کا انتخاب کریں۔
                </span>
              </li>
              <li className="flex items-start gap-3">
                <span className="mt-1 inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#14532D] text-xs font-bold text-white dark:bg-[#15803D]">
                  ۳
                </span>
                <span>
                  انسٹال ہونے کے بعد یہ ایپ انٹرنیٹ کے بغیر بھی آپ کے فون اور کمپیوٹر پر چلے گی۔
                </span>
              </li>
            </ol>
          )}

          <button
            type="button"
            onClick={() => setShowGuideModal(false)}
            className="font-naskh mt-6 w-full rounded-xl bg-[#14532D] py-3 text-base font-bold text-white transition-colors hover:bg-[#0F3F22] dark:bg-[#15803D] dark:hover:bg-[#166534] cursor-pointer"
          >
            سمجھ آ گیا
          </button>
        </div>
      </div>
    );

  if (variant === 'banner') {
    return (
      <>
        <div className="mt-6 flex flex-wrap items-center justify-between gap-4 rounded-2xl border border-[#14532D]/25 bg-[#EFF5F0] px-5 py-4 dark:border-[#6EE7B7]/25 dark:bg-[#16221B]">
          <div className="flex items-center gap-3.5">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-[#14532D] text-white dark:bg-[#15803D]">
              <Smartphone className="h-6 w-6" />
            </div>
            <div>
              <p className="font-naskh text-lg sm:text-xl font-bold text-stone-950 dark:text-stone-50">
                بہارِ شریعت ایپ انسٹال کریں
              </p>
              <p className="font-naskh text-sm sm:text-base font-medium text-stone-700 dark:text-stone-300">
                موبائل یا کمپیوٹر پر انسٹال کر کے انٹرنیٹ کے بغیر بھی تمام مسائل پڑھیں۔
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2.5">
            <button
              type="button"
              onClick={handleInstallClick}
              className="font-naskh inline-flex items-center gap-2 rounded-xl bg-[#14532D] px-5 py-2.5 text-base font-bold text-white shadow-sm transition-colors hover:bg-[#0F3F22] dark:bg-[#15803D] dark:hover:bg-[#166534] whitespace-nowrap shrink-0 cursor-pointer"
            >
              <Download className="h-5 w-5" />
              <span>ایپ انسٹال کریں</span>
            </button>
            <button
              type="button"
              onClick={() => setDismissedBanner(true)}
              aria-label="اطلاع بند کریں"
              className="rounded-lg p-2 text-stone-600 hover:bg-stone-200/70 dark:text-stone-300 dark:hover:bg-stone-800 cursor-pointer"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
        </div>
        {renderModal()}
      </>
    );
  }

  if (variant === 'link') {
    return (
      <>
        <button
          type="button"
          onClick={handleInstallClick}
          className="inline-flex items-center gap-1.5 font-bold text-[#14532D] hover:underline dark:text-[#6EE7B7] cursor-pointer"
        >
          <Download className="h-4 w-4" />
          <span>ایپ انسٹال کریں</span>
        </button>
        {renderModal()}
      </>
    );
  }

  return (
    <>
      <button
        type="button"
        onClick={handleInstallClick}
        className="font-naskh inline-flex items-center gap-2 rounded-lg bg-[#14532D] px-4 py-2 text-sm sm:text-base font-bold text-white transition-colors hover:bg-[#0F3F22] dark:bg-[#15803D] dark:hover:bg-[#166534] whitespace-nowrap shrink-0 cursor-pointer"
      >
        <Download className="h-4 w-4" />
        <span>ایپ انسٹال کریں</span>
      </button>
      {renderModal()}
    </>
  );
};
