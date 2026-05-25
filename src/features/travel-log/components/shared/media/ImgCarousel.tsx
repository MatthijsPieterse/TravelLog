import type { TouchEvent } from "react";
import { useEffect, useMemo, useRef, useState } from "react";

type ImgCarouselProps = {
  images: string[];
  height?: "sm" | "md" | "lg";
  imgPosition?: string;
  autoRotate?: boolean;
  autoRotateDelayMs?: number;
};

const HEIGHT_CLASS_BY_SIZE = {
  lg: "h-64 md:h-full",
  md: "h-48 md:h-120",
  sm: "h-32",
} as const;

const SWIPE_THRESHOLD = 40;

const ImgCarousel = ({
  images,
  height = "md",
  imgPosition = "",
  autoRotate = false,
  autoRotateDelayMs = 10000,
}: ImgCarouselProps) => {
  const [index, setIndex] = useState(0);
  const touchStartXRef = useRef<number | null>(null);
  const safeImages = useMemo(() => images.filter(Boolean), [images]);

  useEffect(() => {
    if (!autoRotate || safeImages.length < 2) {
      return undefined;
    }

    const intervalId = window.setInterval(() => {
      setIndex((currentIndex) => (currentIndex + 1) % safeImages.length);
    }, autoRotateDelayMs);

    return () => window.clearInterval(intervalId);
  }, [autoRotate, autoRotateDelayMs, safeImages.length]);

  if (!safeImages.length) {
    return null;
  }

  const activeIndex = index >= safeImages.length ? 0 : index;

  const goToNext = () => {
    setIndex((currentIndex) => (currentIndex + 1) % safeImages.length);
  };

  const goToPrevious = () => {
    setIndex((currentIndex) => (currentIndex - 1 + safeImages.length) % safeImages.length);
  };

  const handleTouchStart = (event: TouchEvent<HTMLDivElement>) => {
    touchStartXRef.current = event.touches[0]?.clientX ?? null;
  };

  const handleTouchEnd = (event: TouchEvent<HTMLDivElement>) => {
    if (touchStartXRef.current === null) {
      return;
    }

    const touchEndX = event.changedTouches[0]?.clientX ?? touchStartXRef.current;
    const deltaX = touchEndX - touchStartXRef.current;
    touchStartXRef.current = null;

    if (Math.abs(deltaX) < SWIPE_THRESHOLD) {
      return;
    }

    if (deltaX < 0) {
      goToNext();
      return;
    }

    goToPrevious();
  };

  return (
    <div className="relative mb-6 overflow-hidden rounded-2xl" onTouchStart={handleTouchStart} onTouchEnd={handleTouchEnd}>
      <img
        src={safeImages[activeIndex]}
        alt=""
        className={`${HEIGHT_CLASS_BY_SIZE[height]} w-full object-cover ${imgPosition}`}
        loading="lazy"
      />

      {safeImages.length > 1 ? (
        <>
          <button
            type="button"
            onClick={goToPrevious}
            aria-label="Show previous image"
            className="absolute left-2 top-1/2 z-10 -translate-y-1/2 rounded-full bg-white/80 px-2 py-1 text-sm shadow"
          >
            {"<"}
          </button>

          <button
            type="button"
            onClick={goToNext}
            aria-label="Show next image"
            className="absolute right-2 top-1/2 z-10 -translate-y-1/2 rounded-full bg-white/80 px-2 py-1 text-sm shadow"
          >
            {">"}
          </button>
        </>
      ) : null}

      {safeImages.length > 1 ? (
        <div className="absolute bottom-2 left-1/2 z-10 flex -translate-x-1/2 gap-1">
          {safeImages.map((image, imageIndex) => (
            <button
              key={`${image}-${imageIndex}`}
              type="button"
              aria-label={`Show image ${imageIndex + 1}`}
              onClick={() => setIndex(imageIndex)}
              className={`h-1.5 rounded-full transition-all ${imageIndex === activeIndex ? "w-4 bg-white" : "w-4 bg-white/40 hover:bg-white/70"}`}
            />
          ))}
        </div>
      ) : null}
    </div>
  );
};

export default ImgCarousel;
