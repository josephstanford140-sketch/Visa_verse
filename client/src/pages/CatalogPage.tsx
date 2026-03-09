import { useState, useEffect, useCallback } from 'react';
import { ChevronLeft, ChevronRight, ZoomIn, ZoomOut } from 'lucide-react';
import PageHeader from '@/components/PageHeader';

const TOTAL_SLIDES = 90;

const slides = Array.from({ length: TOTAL_SLIDES }, (_, i) => {
  const num = String(i + 1).padStart(2, '0');
  return `/catalog/slide-${num}.png`;
});

const CatalogPage = () => {
  const [current, setCurrent] = useState(0);
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);
  const [zoomed, setZoomed] = useState(false);

  const goNext = useCallback(() => {
    setCurrent((c) => Math.min(TOTAL_SLIDES - 1, c + 1));
    setZoomed(false);
  }, []);

  const goPrev = useCallback(() => {
    setCurrent((c) => Math.max(0, c - 1));
    setZoomed(false);
  }, []);

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') goNext();
      if (e.key === 'ArrowLeft') goPrev();
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [goNext, goPrev]);

  const onTouchStart = (e: React.TouchEvent) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const onTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    const distance = touchStart - touchEnd;
    if (Math.abs(distance) > 50) {
      if (distance > 0) goNext();
      else goPrev();
    }
    setTouchStart(null);
    setTouchEnd(null);
  };

  return (
    <div className="min-h-screen bg-background pb-20">
      <PageHeader title="Product Catalog" />

      <div className="px-2 py-3">
        <div
          className="relative bg-card border rounded-xl overflow-hidden shadow-sm"
          onTouchStart={onTouchStart}
          onTouchMove={onTouchMove}
          onTouchEnd={onTouchEnd}
          data-testid="catalog-slideshow"
        >
          <div className={`flex items-center justify-center bg-gray-100 dark:bg-gray-900 ${zoomed ? 'min-h-[70vh]' : 'min-h-[50vh]'}`}>
            <img
              src={slides[current]}
              alt={`Slide ${current + 1}`}
              className={`w-full h-auto transition-transform duration-200 ${zoomed ? 'scale-150' : 'scale-100'}`}
              draggable={false}
              data-testid={`catalog-slide-${current + 1}`}
            />
          </div>

          <button
            onClick={goPrev}
            disabled={current === 0}
            className="absolute left-2 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/30 backdrop-blur-sm flex items-center justify-center text-white disabled:opacity-20 transition-opacity"
            data-testid="button-prev-slide"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>

          <button
            onClick={goNext}
            disabled={current === TOTAL_SLIDES - 1}
            className="absolute right-2 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/30 backdrop-blur-sm flex items-center justify-center text-white disabled:opacity-20 transition-opacity"
            data-testid="button-next-slide"
          >
            <ChevronRight className="w-6 h-6" />
          </button>
        </div>

        <div className="flex items-center justify-between mt-3 px-2">
          <button
            onClick={() => setZoomed(!zoomed)}
            className="p-2 rounded-lg bg-secondary text-secondary-foreground"
            data-testid="button-zoom"
          >
            {zoomed ? <ZoomOut className="w-5 h-5" /> : <ZoomIn className="w-5 h-5" />}
          </button>

          <div className="flex items-center gap-3">
            <span className="text-sm font-medium text-foreground" data-testid="text-slide-counter">
              {current + 1} / {TOTAL_SLIDES}
            </span>
          </div>

          <div className="flex gap-1">
            <input
              type="number"
              min={1}
              max={TOTAL_SLIDES}
              value={current + 1}
              onChange={(e) => {
                const val = parseInt(e.target.value);
                if (val >= 1 && val <= TOTAL_SLIDES) {
                  setCurrent(val - 1);
                  setZoomed(false);
                }
              }}
              className="w-14 h-8 rounded-md border border-input bg-background px-2 text-sm text-center"
              data-testid="input-slide-number"
            />
          </div>
        </div>

        <div className="mt-4 px-2">
          <div className="flex gap-1.5 overflow-x-auto pb-2 snap-x">
            {slides.map((src, idx) => (
              <button
                key={idx}
                onClick={() => { setCurrent(idx); setZoomed(false); }}
                className={`flex-shrink-0 w-16 h-12 rounded-lg overflow-hidden border-2 transition-all snap-start ${
                  idx === current ? 'border-primary ring-1 ring-primary' : 'border-transparent opacity-60 hover:opacity-100'
                }`}
                data-testid={`thumbnail-${idx + 1}`}
              >
                <img src={src} alt={`Thumb ${idx + 1}`} className="w-full h-full object-cover" loading="lazy" />
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CatalogPage;
