// Figma: 18329:363117 (desktop 1440x500) / 18337:197575 (mobile 390x899)
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/motion/Reveal";
import { Magnetic } from "@/components/motion/Magnetic";

const MASK_DESKTOP: React.CSSProperties = {
  maskImage: "url(/assets/sections/community-mask-desktop.svg)",
  WebkitMaskImage: "url(/assets/sections/community-mask-desktop.svg)",
  maskSize: "560px 625px",
  WebkitMaskSize: "560px 625px",
  maskRepeat: "no-repeat",
  WebkitMaskRepeat: "no-repeat",
};

const MASK_MOBILE: React.CSSProperties = {
  maskImage: "url(/assets/sections/community-mask-mobile.svg)",
  WebkitMaskImage: "url(/assets/sections/community-mask-mobile.svg)",
  maskSize: "407.186px 454.946px",
  WebkitMaskSize: "407.186px 454.946px",
  maskRepeat: "no-repeat",
  WebkitMaskRepeat: "no-repeat",
};

/* Figma: Group 18329:363118 — зелёное свечение на уровне фрейма (page y=3091, за секциями CTA/Reviews).
   Координаты страницы переведены в координаты секции (cta top = 3543 → top -452). */
function GreenGlow() {
  const A = "/assets/sections";
  return (
    // клип-обёртка: как фрейм в Figma, режет глоу по низу секции (иначе бокс 1622px
    // растягивает страницу под футером)
    <div className="pointer-events-none absolute inset-x-0 bottom-0 top-[-452px] z-0 hidden overflow-hidden md:block">
    <div className="pointer-events-none absolute left-1/2 top-0 h-[1622.666px] w-[1440px] -translate-x-1/2">
      {/* Figma-группа повёрнута на 180° (flip X+Y) — codegen теряет трансформ группы;
          выверено по скринам макета (аврора за роботом, карточки чистые) */}
      <div className="absolute left-[320px] top-0 h-[1622.666px] w-[1652.662px] -scale-x-100 -scale-y-100">
        <div className="absolute left-[242.46px] top-0 h-[1295.95px] w-[1365.822px]">
          <div className="absolute left-0 top-[125.46px] flex h-[950.689px] w-[719.374px] items-center justify-center">
            <div className="flex-none rotate-[149deg]">
              <div className="relative h-[946.588px] w-[270.477px]">
                <div className="absolute inset-[-48.88%_-171.05%]">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img alt="" className="block size-full max-w-none" src={`${A}/glow-ellipse-26.svg`} />
                </div>
              </div>
            </div>
          </div>
          <div className="absolute left-[51.29px] top-0 flex h-[826.115px] w-[512.048px] items-center justify-center mix-blend-plus-lighter">
            <div className="flex-none rotate-[149deg]">
              <div className="relative h-[946.588px] w-[28.604px]">
                <div className="absolute inset-[-1.96%_-64.7%]">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img alt="" className="block size-full max-w-none" src={`${A}/glow-ellipse-29.svg`} />
                </div>
              </div>
            </div>
          </div>
          <div className="absolute left-[390.24px] top-[6.93px] flex h-[832.484px] w-[522.648px] items-center justify-center mix-blend-plus-lighter">
            <div className="flex-none rotate-[149deg]">
              <div className="relative h-[946.588px] w-[40.969px]">
                <div className="absolute inset-[-1.96%_-45.17%]">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img alt="" className="block size-full max-w-none" src={`${A}/glow-ellipse-30.svg`} />
                </div>
              </div>
            </div>
          </div>
          <div className="absolute left-[95.91px] top-[167.65px] flex h-[842.754px] w-[539.74px] items-center justify-center mix-blend-plus-lighter">
            <div className="flex-none rotate-[149deg]">
              <div className="relative h-[946.588px] w-[60.91px]">
                <div className="absolute inset-[-3.91%_-60.77%]">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img alt="" className="block size-full max-w-none" src={`${A}/glow-ellipse-27.svg`} />
                </div>
              </div>
            </div>
          </div>
          <div className="absolute left-[43.24px] top-[336.17px] flex h-[544.215px] w-[387.796px] items-center justify-center mix-blend-plus-lighter">
            <div className="flex-none rotate-[149deg]">
              <div className="relative h-[568.201px] w-[111.005px]">
                <div className="absolute inset-[-10.99%_-56.27%]">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img alt="" className="block size-full max-w-none" src={`${A}/glow-ellipse-31.svg`} />
                </div>
              </div>
            </div>
          </div>
          <div className="absolute left-[292.28px] top-[336.17px] flex h-[544.215px] w-[387.796px] items-center justify-center mix-blend-plus-lighter">
            <div className="flex-none rotate-[149deg]">
              <div className="relative h-[568.201px] w-[111.005px]">
                <div className="absolute inset-[-10.99%_-56.27%]">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img alt="" className="block size-full max-w-none" src={`${A}/glow-ellipse-32.svg`} />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="absolute left-[22.99px] top-[75.86px] flex h-[931.784px] w-[1030.265px] items-center justify-center mix-blend-overlay">
          <div className="flex-none rotate-[-19.64deg]">
            <div className="relative h-[686.413px] w-[848.974px]">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img alt="" className="absolute inset-0 block size-full max-w-none" src={`${A}/glow-group-1.svg`} />
            </div>
          </div>
        </div>
        <div className="absolute left-0 top-[187.83px] flex h-[931.784px] w-[1030.265px] items-center justify-center mix-blend-overlay">
          <div className="flex-none rotate-[-19.64deg]">
            <div className="relative h-[686.414px] w-[848.974px]">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img alt="" className="absolute inset-0 block size-full max-w-none" src={`${A}/glow-group-2.svg`} />
            </div>
          </div>
        </div>
        <div className="absolute left-[315.34px] top-[154.45px] flex h-[897.505px] w-[630.86px] items-center justify-center mix-blend-plus-lighter">
          <div className="flex-none rotate-[149deg]">
            <div className="relative h-[946.588px] w-[167.214px]">
              <div className="absolute inset-[-5.41%_-30.6%]">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img alt="" className="block size-full max-w-none" src={`${A}/glow-ellipse-28.svg`} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    </div>
  );
}

export function TelegramCta() {
  return (
    <section
      className="relative flex h-[899px] w-full flex-col items-center gap-[10px] overflow-x-clip px-[48px] py-[20px] md:h-[500px] md:justify-center md:px-[24px] md:py-[96px]"
      id="community"
      data-node-id="18329:363117"
    >
      <GreenGlow />
      <div className="relative flex w-full max-w-[660px] md:max-w-[1200px] md:items-center">
        <Reveal className="flex w-full flex-col items-start justify-center gap-[40px] md:min-w-px md:max-w-[660px] md:flex-1">
          <div className="flex w-full flex-col items-start justify-center gap-[16px] text-center md:text-left [word-break:break-word]">
            <h2 className="w-full text-rd-4xl font-semibold tracking-[-0.72px] text-rd-text-default">
              Узнавайте все новости о нашем проекте первым а также заходи в чат
              если ты дизайнер а не лошок
            </h2>
            <p className="w-full text-rd-md font-normal text-rd-text-subtle">
              Тут ещё текст навалить можно прикольный про всякие штуки как
              комьюнити и так далее
            </p>
          </div>
          <div className="flex w-full flex-col items-start gap-[8px] md:w-auto md:flex-row">
            {/* primary label differs per breakpoint in Figma (чат on desktop, канал on mobile) */}
            <Magnetic className="w-full md:w-auto">
              <Button variant="primary" size="lg" className="w-full md:w-auto">
                <span className="md:hidden">Перейти в Telegram-канал</span>
                <span className="hidden md:inline">Перейти в Telegram-чат</span>
              </Button>
            </Magnetic>
            {/* secondary: bg/state/soft + text/subtle, no inner shadow — differs from ui/Button secondary */}
            <button
              type="button"
              className="relative flex w-full items-center justify-center gap-[6px] overflow-clip rounded-[6px] bg-rd-bg-state-soft px-[14px] py-[10px] md:w-auto"
            >
              <span className="flex items-center justify-center px-[2px]">
                <span className="whitespace-nowrap text-rd-sm font-medium text-rd-text-subtle [word-break:break-word]">
                  Перейти в Telegram-канал
                </span>
              </span>
            </button>
          </div>
        </Reveal>
      </div>
      {/* Illustration — masked photo, fades out via alpha gradient */}
      <div className="pointer-events-none absolute left-1/2 top-0 hidden h-full w-[1440px] -translate-x-1/2 md:block">
        <div
          className="absolute left-[839px] top-0 h-[625px] w-[560px]"
          style={MASK_DESKTOP}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            alt=""
            className="pointer-events-none absolute inset-0 size-full max-w-none object-cover"
            src="/assets/sections/community-photo.png"
          />
        </div>
      </div>
      <div
        className="pointer-events-none absolute left-[7px] top-[516.88px] h-[455.196px] w-[407.409px] md:hidden"
        style={MASK_MOBILE}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          alt=""
          className="pointer-events-none absolute inset-0 size-full max-w-none object-cover"
          src="/assets/sections/community-photo.png"
        />
      </div>
    </section>
  );
}
