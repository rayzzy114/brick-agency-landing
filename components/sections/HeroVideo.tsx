// Видео хиро: preload="none" + play() только на md+ — иначе мобилка качала
// 12MB webm, скрытый через CSS (браузер грузит display:none-видео с autoplay).
"use client";

import { useEffect, useRef } from "react";

export function HeroVideo() {
  const ref = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const mq = window.matchMedia("(min-width: 768px)");
    const sync = () => {
      const v = ref.current;
      if (!v) return;
      if (mq.matches) {
        // на десктопе — стартуем (muted-автоплей разрешён)
        v.play().catch(() => {});
      } else {
        v.pause();
      }
    };
    sync();
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, []);

  return (
    <video
      ref={ref}
      className="absolute inset-0 size-full object-cover"
      loop
      muted
      playsInline
      preload="none"
      poster="/assets/hero/main-banner-poster.jpg"
    >
      <source src="/assets/hero/main-banner.webm" type="video/webm" />
    </video>
  );
}
