// Figma: 18329:363317 (desktop 1440x604) / 18337:197515 (mobile 390x1104)
import { Reveal } from "@/components/motion/Reveal";

const REVIEWS = [
  {
    name: "ProjectName",
    type: "ProjectTypeinfo",
    text: "Review text, написано тут о чём-то положительным, что пиздатые мы и отзыввы тут только от крутых копаний типа макдональдс?",
  },
  {
    name: "ProjectName",
    type: "ProjectTypeinfo",
    text: "Review text, написано тут о чём-то положительным, что пиздатые мы и отзыввы тут только от крутых копаний типа макдональдс?",
  },
  {
    name: "ProjectName",
    type: "ProjectTypeinfo",
    text: "Review text, написано тут о чём-то положительным, что пиздатые мы и отзыввы тут только от крутых копаний типа макдональдс?",
  },
];

export function Reviews() {
  return (
    <section
      className="flex w-full flex-col items-center px-[24px] py-[40px] md:py-[80px]"
      id="reviews"
      data-node-id="18329:363317"
    >
      <div className="flex w-full max-w-[1200px] flex-col items-center gap-[48px]">
        {/* Header */}
        <Reveal className="flex w-full justify-center">
        <div className="flex w-full max-w-[530px] flex-col items-center justify-center gap-[16px]">
          {/* badge — desktop only (absent in the mobile frame) */}
          <div className="relative hidden h-[32px] items-center justify-center gap-[6px] rounded-full px-[14px] py-[4px] md:flex">
            <div
              aria-hidden
              className="pointer-events-none absolute inset-0 rounded-full bg-rd-bg-badge"
            />
            <p className="relative shrink-0 whitespace-nowrap text-center text-rd-sm font-medium text-rd-text-default">
              Отзывы
            </p>
            <div className="pointer-events-none absolute inset-0 rounded-[inherit] shadow-rd-component" />
          </div>
          {/* title — copy differs per breakpoint in Figma */}
          <h2 className="hidden w-full text-center text-rd-4xl font-semibold tracking-[-0.72px] text-rd-text-default md:block [word-break:break-word]">
            Мы делаем - о нас говорят
          </h2>
          <h2 className="w-full text-center text-rd-4xl font-semibold tracking-[-0.72px] text-rd-text-default md:hidden [word-break:break-word]">
            {"Мы делаем "}
            <br />
            и о нас говорят
          </h2>
          <p className="hidden w-full text-center text-rd-lg font-normal text-rd-text-subtle md:block [word-break:break-word]">
            Отзывы настоящих клиентов не дадут соврать
          </p>
          <p className="w-full text-center text-rd-lg font-normal text-rd-text-subtle md:hidden [word-break:break-word]">
            Отзывы настоящих клиентов
            <br />
            не дадут соврать
          </p>
        </div>
        </Reveal>
        {/* Cards — stacked on mobile (r-16), 3-up row on desktop (r-12) */}
        <div className="flex w-full flex-col gap-[24px] md:flex-row md:items-start">
          {REVIEWS.map((review, i) => (
            <Reveal
              key={i}
              delay={i * 0.12}
              className="relative flex w-full flex-col items-start gap-[20px] overflow-clip rounded-[16px] p-[24px] md:min-w-px md:flex-1 md:rounded-[12px]"
            >
              <div
                aria-hidden
                className="pointer-events-none absolute inset-0 rounded-[inherit] bg-rd-bg-subtle"
              />
              <div className="relative flex w-full items-start gap-[20px]">
                <div className="pointer-events-none relative size-[48px] shrink-0 rounded-[8px] shadow-[0px_0px_0px_1px_#0e0e0e]">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    alt=""
                    className="absolute inset-0 size-full max-w-none rounded-[8px] object-cover"
                    src="/assets/sections/review-avatar.png"
                  />
                  <div className="absolute inset-0 rounded-[inherit] shadow-[inset_0px_1px_0px_0px_rgba(255,255,255,0.4)]" />
                </div>
                <div className="flex min-w-px flex-1 flex-col items-start justify-center whitespace-nowrap text-rd-md [word-break:break-word]">
                  <p className="relative shrink-0 font-semibold text-rd-text-default">
                    {review.name}
                  </p>
                  <p className="relative shrink-0 font-normal text-[rgba(212,221,255,0.6)]">
                    {review.type}
                  </p>
                </div>
              </div>
              <div className="relative flex w-full flex-col items-start overflow-clip">
                <p className="w-full text-rd-md font-normal text-rd-text-subtle [word-break:break-word]">
                  {review.text}
                </p>
              </div>
              {/* hover (кит 34:852 Soft/Hover): bg → bg/state/soft-hover */}
              <button
                type="button"
                className="relative flex items-center justify-center gap-[4px] overflow-clip rounded-[6px] bg-rd-bg-state-soft px-[10px] py-[6px] transition-colors duration-200 hover:bg-rd-bg-state-soft-hover"
              >
                <span className="flex items-center justify-center px-[2px]">
                  <span className="whitespace-nowrap text-rd-sm font-medium text-rd-text-subtle [word-break:break-word]">
                    Взглянуть на проект
                  </span>
                </span>
                {/* кит Icons 28:27: arrow-right-up (Fill, 24px frame), белый 50% */}
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  alt=""
                  className="relative block size-[16px] shrink-0"
                  src="/assets/icons/kit/arrow-right-up-fill.svg"
                />
              </button>
              <div className="pointer-events-none absolute inset-0 rounded-[inherit] shadow-rd-component" />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
