// Figma: FirstBlock 18329:361958 + Bg 18329:361982 (desktop 1440),
//        FirstBlock 18337:196893 + Bg 18337:196888 (mobile 390),
//        1920 variant 18356:48426 (bg elements centered as a 1440 strip)
import { LandingBadge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/motion/Reveal";

export function Hero() {
  return (
    <section className="relative w-full overflow-clip md:h-[1229px]" id="hero">
      {/* Bg — mobile: gradient only (390x410, offset 10px, r-24); desktop: full scene, r-b-64 */}
      <div
        className="absolute inset-x-0 top-[10px] h-[410px] overflow-clip rounded-[24px] bg-[linear-gradient(to_bottom,#0a0a0a_0%,#102804_49.328%,#3d5500_100%)] md:inset-0 md:top-0 md:h-auto md:rounded-none md:rounded-b-[64px]"
        data-node-id="18329:361982"
      >
        {/* inner 1440 strip, centered — matches the 1920 Figma variant exactly */}
        <div className="absolute left-1/2 top-0 hidden h-full w-[1440px] -translate-x-1/2 md:block">
          <div className="absolute left-[202px] top-[604px] h-[592px] w-[1036px]">
            <div className="absolute inset-[-50.68%_-28.96%]">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                alt=""
                className="block size-full max-w-none"
                src="/assets/hero/ellipse-33.svg"
              />
            </div>
          </div>
          <div className="absolute left-[547px] top-[439px] h-[622px] w-[346px]">
            <div className="absolute inset-[-48.23%_-86.71%]">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                alt=""
                className="block size-full max-w-none"
                src="/assets/hero/ellipse-34.svg"
              />
            </div>
          </div>
          <div className="absolute left-[258px] top-[791px] h-[398px] w-[925px]">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              alt=""
              className="pointer-events-none absolute inset-0 size-full max-w-none object-cover"
              src="/assets/hero/glow-photo.png"
            />
          </div>
        </div>
        {/* Figma "qqqqqqqqqq 1" 1200x732 — видео-заливка; webm пока единственный сорс,
            mp4/h264 для iOS Safari добавится позже.
            Привязано к контент-сетке (mx-auto max-w-1200 + поля 24px), а не к полосе 1440:
            на ширинах <1248px полоса давала вылет видео за сетку (на 1024 — на 88px). */}
        <div className="absolute inset-x-[24px] top-[497px] hidden h-[732px] md:block">
          <div
            className="relative mx-auto h-full max-w-[1200px] overflow-hidden"
            data-node-id="18329:361986"
          >
            <video
              className="absolute inset-0 size-full object-cover"
              autoPlay
              loop
              muted
              playsInline
              preload="metadata"
            >
              <source src="/assets/hero/main-banner.webm" type="video/webm" />
            </video>
          </div>
        </div>
      </div>

      {/* FirstBlock content */}
      <div className="relative flex w-full flex-col items-center px-[24px] py-[40px] md:py-[80px]">
        <div className="flex w-full max-w-[660px] flex-col items-center gap-[32px]">
          <Reveal mode="load" y={16}>
            <LandingBadge tailIcon="/assets/icons/kit/arrow-right-s.svg" />
          </Reveal>
          <div className="flex w-full flex-col items-center gap-[16px] text-center [word-break:break-word]">
            <Reveal mode="load" delay={0.12} className="w-full">
            <h1 className="w-full font-semibold tracking-[-0.96px] text-rd-text-default md:font-bold md:tracking-[-1.12px] md:text-rd-text-primary">
              <span className="block whitespace-nowrap text-[48px] leading-[48px] md:text-[56px] md:leading-[56px]">
                Строим успех
              </span>
              <span className="block whitespace-nowrap text-[48px] leading-[48px] md:text-[56px] md:leading-[56px]">
                вашего проекта
              </span>
            </h1>
            </Reveal>
            <Reveal mode="load" delay={0.24} className="w-full flex justify-center">
            <p className="w-full text-rd-text-subtle md:w-[584px]">
              <span className="text-[18px] leading-[28px]">
                Кирпичик за кирпичиком воплощаем ваши идеи в решения с
                инновациями{" "}
              </span>
              <span className="text-[16px] font-medium italic leading-[24px] text-rd-text-default md:text-[18px] md:leading-[28px]">
                Brick® Agency
              </span>
            </p>
            </Reveal>
          </div>
          <Reveal mode="load" delay={0.36}>
            <Button
              variant="primary"
              size="lg"
              href="#contact"
              leadIcon="/assets/icons/kit/telegram-2-fill-dark.svg"
            >
              Построить проект
            </Button>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
