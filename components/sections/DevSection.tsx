// Figma: DevSection 18340:276605 (desktop 1440x688) / 18340:276604 (mobile 390x708)
import { Reveal } from "@/components/motion/Reveal";

/* Слово-обёртка в текстовых строках («С серверами», «мы»…) */
function Word({ children }: { children: React.ReactNode }) {
  return (
    <p className="whitespace-nowrap text-rd-md font-medium tracking-[-0.16px] text-rd-text-subtle [word-break:break-word]">
      {children}
    </p>
  );
}

/* Технология с иконкой (PYTHON, DOCKER…) */
function Tech({
  icon,
  iconClass,
  iconInset,
  label,
  labelShadow,
}: {
  icon: string;
  /** размеры контейнера иконки */
  iconClass: string;
  /** inset внутреннего Vector, если он не inset-0 */
  iconInset?: string;
  label: string;
  labelShadow?: string;
}) {
  return (
    <div className="flex h-[24px] shrink-0 items-center gap-[4px] overflow-clip">
      <div className={`relative shrink-0 ${iconClass}`}>
        {iconInset ? (
          <div className="absolute" style={{ inset: iconInset }}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img loading="lazy" decoding="async" alt="" className="block size-full max-w-none" src={icon} />
          </div>
        ) : (
          // eslint-disable-next-line @next/next/no-img-element
          <img loading="lazy" decoding="async"
            alt=""
            className="absolute inset-0 block size-full max-w-none"
            src={icon}
          />
        )}
      </div>
      <p
        className={`whitespace-nowrap text-center text-rd-md font-medium tracking-[-0.16px] text-rd-text-default [word-break:break-word] ${labelShadow ?? ""}`}
      >
        {label}
      </p>
    </div>
  );
}

/* Лучи-эллипсы декоративной подсветки */
function Ray({
  posClass,
  boxClass,
  insetClass,
  transformClass,
  src,
  rayId,
}: {
  posClass: string;
  boxClass: string;
  insetClass: string;
  transformClass: string;
  src: string;
  rayId?: string;
}) {
  return (
    <div
      data-ray={rayId}
      className={`absolute flex items-center justify-center ${posClass}`}
    >
      <div className={`flex-none ${transformClass}`}>
        <div className={`relative ${boxClass}`}>
          <div className={`absolute ${insetClass}`}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img loading="lazy" decoding="async" alt="" className="block size-full max-w-none" src={src} />
          </div>
        </div>
      </div>
    </div>
  );
}

const A = "/assets/sections";

export function DevSection() {
  return (
    <section className="relative w-full" id="dev">
      {/* BGLIGHT — свечение под нижней кромкой карточки, desktop (полоса 1440 по центру) */}
      <div className="pointer-events-none absolute left-1/2 top-0 hidden h-full w-[1440px] -translate-x-1/2 md:block">
        <div className="absolute left-[101px] top-[314px] h-[305px] w-[1239px] mix-blend-plus-lighter">
          <div className="absolute inset-[-5.91%_-1.25%]">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img loading="lazy" decoding="async" alt="" className="block size-full max-w-none" src={`${A}/dev-bglight-1-desktop.svg`} />
          </div>
        </div>
        <div className="absolute left-[108px] top-[314px] h-[303px] w-[1225px] mix-blend-plus-lighter">
          <div className="absolute inset-[-20.04%_-4.75%]">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img loading="lazy" decoding="async" alt="" className="block size-full max-w-none" src={`${A}/dev-bglight-2-desktop.svg`} />
          </div>
        </div>
        <div className="absolute left-[114px] top-[317px] h-[297px] w-[1215px] mix-blend-plus-lighter">
          <div className="absolute inset-[-3.24%_-0.65%]">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img loading="lazy" decoding="async" alt="" className="block size-full max-w-none" src={`${A}/dev-bglight-3-desktop.svg`} />
          </div>
        </div>
      </div>
      <div className="relative flex w-full flex-col items-center overflow-clip rounded-[20px] px-[16px] py-[40px] md:px-[24px] md:py-[80px]">
        {/* бордерная карточка */}
        <Reveal y={40} className="relative w-full max-w-[1200px]">
        {/* BGLIGHT mobile — якорь к БОКСУ КАРТОЧКИ (в Figma 390: карточка (16,40)
            358x628, глоу (7,114.88) 375x569 → офсеты -9/+74.9/-8.4/-15.9);
            фикс-координаты в секции на 430..740 вылезали дугой в «Отзывы» */}
        <div
          aria-hidden
          className="pointer-events-none absolute bottom-[-15.9px] left-[-9px] right-[-8.4px] top-[74.9px] md:hidden"
        >
          <div className="absolute inset-0 mix-blend-plus-lighter">
            <div className="absolute inset-[-3.17%_-4.68%_-3.17%_-4.55%]">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img loading="lazy" decoding="async" alt="" className="block size-full max-w-none" src={`${A}/dev-bglight-1-mobile.svg`} />
            </div>
          </div>
          <div className="absolute bottom-[3.7px] left-[2.1px] right-[2.1px] top-0 mix-blend-plus-lighter">
            <div className="absolute inset-[-10.74%_-16.25%]">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img loading="lazy" decoding="async" alt="" className="block size-full max-w-none" src={`${A}/dev-bglight-2-mobile.svg`} />
            </div>
          </div>
          <div className="absolute bottom-[9.4px] left-[3.9px] right-[3.3px] top-[5.6px] mix-blend-plus-lighter">
            <div className="absolute inset-[-1.74%_-2.37%_-1.74%_-2.52%]">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img loading="lazy" decoding="async" alt="" className="block size-full max-w-none" src={`${A}/dev-bglight-3-mobile.svg`} />
            </div>
          </div>
        </div>
        {/* рамка — inset-тенью (в Figma stroke inside: карточка ровно 528, border снаружи давал 530 и 2px-сдвиг робота) */}
        <div className="relative flex w-full flex-col items-center gap-[24px] overflow-clip rounded-[20px] shadow-[inset_0_0_0_1px_var(--rd-border-default)]">
          <div className="relative flex w-full flex-col items-start gap-[16px] rounded-[20px] p-[16px] md:gap-[32px] md:py-[40px] md:pl-[40px] md:pr-[12px]">
            {/* фон: bg/default + радиальный градиент (plus-lighter) */}
            <div aria-hidden className="pointer-events-none absolute inset-0 rounded-[20px]">
              <div className="absolute inset-0 rounded-[20px] bg-rd-bg-default" />
              <div
                className="absolute inset-0 hidden rounded-[20px] mix-blend-plus-lighter md:block"
                style={{ backgroundImage: "url(\"data:image/svg+xml;utf8,<svg viewBox='0 0 1200 528' xmlns='http://www.w3.org/2000/svg' preserveAspectRatio='none'><rect x='0' y='0' height='100%' width='100%' fill='url(%23grad)' opacity='0.20000000298023224'/><defs><radialGradient id='grad' gradientUnits='userSpaceOnUse' cx='0' cy='0' r='10' gradientTransform='matrix(39.8 25.705 -46.111 11.876 8.3267e-15 0)'><stop stop-color='rgba(255,255,255,0.4)' offset='0'/><stop stop-color='rgba(191,191,191,0.3)' offset='0.25'/><stop stop-color='rgba(128,128,128,0.2)' offset='0.5'/><stop stop-color='rgba(64,64,64,0.1)' offset='0.75'/><stop stop-color='rgba(0,0,0,0)' offset='1'/></radialGradient></defs></svg>\")" }}
              />
              <div
                className="absolute inset-0 rounded-[20px] mix-blend-plus-lighter md:hidden"
                style={{ backgroundImage: "url(\"data:image/svg+xml;utf8,<svg viewBox='0 0 358 628' xmlns='http://www.w3.org/2000/svg' preserveAspectRatio='none'><rect x='0' y='0' height='100%' width='100%' fill='url(%23grad)' opacity='0.20000000298023224'/><defs><radialGradient id='grad' gradientUnits='userSpaceOnUse' cx='0' cy='0' r='10' gradientTransform='matrix(11.874 30.573 -13.756 14.125 2.4841e-15 0)'><stop stop-color='rgba(255,255,255,0.4)' offset='0'/><stop stop-color='rgba(191,191,191,0.3)' offset='0.25'/><stop stop-color='rgba(128,128,128,0.2)' offset='0.5'/><stop stop-color='rgba(64,64,64,0.1)' offset='0.75'/><stop stop-color='rgba(0,0,0,0)' offset='1'/></radialGradient></defs></svg>\")" }}
              />
            </div>

            {/* Ligt — лучи, mobile; контейнер = калибровочный якорь (кодген потерял
                транформ группы Ligt — как на десктопе), смещение подобрано хитмапом */}
            <div
              aria-hidden
              id="mligt-cal"
              className="pointer-events-none absolute inset-0 [transform:translate(-130px,300px)] md:hidden"
            >
              <Ray posClass="left-[61.29px] top-[48.64px] h-[702.684px] w-[454.333px]" transformClass="rotate-[19.24deg] skew-x-[35.2deg] scale-y-[-0.82]" boxClass="h-[628.666px] w-[298.122px]" insetClass="inset-[-37.2%_-78.44%]" src={`${A}/dev-ellipse-26-mobile.svg`} />
              <Ray posClass="left-[9.53px] top-0 h-[614.823px] w-[202.632px] mix-blend-plus-lighter" transformClass="rotate-[19.24deg] skew-x-[35.2deg] scale-y-[-0.82]" boxClass="h-[628.666px] w-[31.527px]" insetClass="inset-[-1.49%_-29.67%]" src={`${A}/dev-ellipse-29-mobile.svg`} />
              <Ray posClass="left-[410.64px] top-[3.5px] h-[619.314px] w-[215.5px] mix-blend-plus-lighter" transformClass="rotate-[19.24deg] skew-x-[35.2deg] scale-y-[-0.82]" boxClass="h-[628.666px] w-[45.157px]" insetClass="inset-[-1.49%_-20.71%]" src={`${A}/dev-ellipse-30-mobile.svg`} />
              <Ray posClass="left-[62.32px] top-[84.73px] h-[626.558px] w-[236.251px] mix-blend-plus-lighter" transformClass="rotate-[19.24deg] skew-x-[35.2deg] scale-y-[-0.82]" boxClass="h-[628.666px] w-[67.136px]" insetClass="inset-[-2.98%_-27.87%]" src={`${A}/dev-ellipse-27-mobile.svg`} />
              <Ray posClass="left-0 top-[169.91px] h-[403.141px] w-[219.281px] mix-blend-plus-lighter" transformClass="rotate-[19.24deg] skew-x-[35.2deg] scale-y-[-0.82]" boxClass="h-[377.365px] w-[122.351px]" insetClass="inset-[-8.37%_-25.8%]" src={`${A}/dev-ellipse-31-mobile.svg`} />
              <Ray posClass="left-[294.71px] top-[169.91px] h-[403.141px] w-[219.281px] mix-blend-plus-lighter" transformClass="rotate-[19.24deg] skew-x-[35.2deg] scale-y-[-0.82]" boxClass="h-[377.365px] w-[122.351px]" insetClass="inset-[-8.37%_-25.8%]" src={`${A}/dev-ellipse-32-mobile.svg`} />
              <div className="absolute flex items-center justify-center mix-blend-overlay inset-[38.04%_-180.56%_-52.64%_-6.54%]" style={{ containerType: "size" }}>
                <div className="flex-none -scale-x-100 rotate-[27.73deg] skew-x-[-74.93deg] h-[hypot(43.6073cqw,57.6643cqh)] w-[hypot(-56.3927cqw,-42.3357cqh)]">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img loading="lazy" decoding="async" alt="" className="absolute inset-0 block size-full max-w-none" src={`${A}/dev-light-group-mobile.svg`} />
                </div>
              </div>
              <div className="absolute flex items-center justify-center mix-blend-overlay inset-[38.04%_-180.56%_-52.64%_-6.54%]" style={{ containerType: "size" }}>
                <div className="flex-none -scale-x-100 rotate-[27.73deg] skew-x-[-74.93deg] h-[hypot(43.6073cqw,57.6643cqh)] w-[hypot(-56.3927cqw,-42.3357cqh)]">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img loading="lazy" decoding="async" alt="" className="absolute inset-0 block size-full max-w-none" src={`${A}/dev-light-group-mobile.svg`} />
                </div>
              </div>
              <Ray posClass="left-[10.33px] top-[383.91px] h-[665.173px] w-[346.874px] mix-blend-plus-lighter" transformClass="rotate-[19.24deg] skew-x-[35.2deg] scale-y-[-0.82]" boxClass="h-[628.666px] w-[184.305px]" insetClass="inset-[-4.11%_-14.03%]" src={`${A}/dev-ellipse-28-mobile.svg`} />
            </div>

            {/* Badge «Отдел разработки» */}
            <div className="relative flex shrink-0 items-center justify-center overflow-clip rounded-[6px] bg-rd-bg-badge-orange p-[4px]">
              <div className="flex size-[16px] shrink-0 items-center justify-center">
                {/* кит Icons 28:27: code-s-slash (24px frame), оранж #FF8A33 из макета секции */}
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img loading="lazy" decoding="async" alt="" className="block size-[14px] shrink-0" src="/assets/icons/kit/code-s-slash-orange.svg" />
              </div>
              <div className="flex shrink-0 items-center pl-[2px] pr-[4px]">
                <p className="whitespace-nowrap text-rd-xs font-medium text-rd-orange-strong [word-break:break-word]">
                  Отдел разработки
                </p>
              </div>
            </div>

            {/* Заголовок */}
            <h2 className="relative w-full text-[36px] font-semibold leading-[40px] tracking-[-0.72px] text-rd-text-default [word-break:break-word] md:w-auto md:whitespace-nowrap md:text-[56px] md:font-bold md:leading-[56px] md:tracking-[-1.12px] md:text-rd-text-primary">
              Делаем сегодня то,
              <br aria-hidden className="hidden md:block" /> что нужно завтра
            </h2>

            {/* Текст с иконками технологий */}
            <div className="relative flex w-full flex-col items-start gap-[16px] md:w-[664px] md:gap-[8px]">
              <div className="flex w-full flex-wrap content-start items-start gap-[4px] md:h-[84px]">
                <Word>С серверами</Word>
                <Word>мы</Word>
                <Word>разговариваем</Word>
                <Word>на</Word>
                <Tech icon={`${A}/icon-python.svg`} iconClass="size-[16px]" iconInset="-3.12% -3.13% -3.13% -3.12%" label="PYTHON" />
                <Tech icon={`${A}/icon-csharp.svg`} iconClass="h-[16px] w-[14px]" label="C#" labelShadow="[text-shadow:0px_0.5px_2px_rgba(35,0,96,0.6)]" />
                <Word>и</Word>
                <div className="flex h-[24px] shrink-0 items-center gap-[6px]">
                  <Tech icon={`${A}/icon-java.svg`} iconClass="size-[16px]" iconInset="1.24% 14.04%" label="JAVA" />
                  <p className="whitespace-nowrap text-rd-lg font-medium tracking-[-0.18px] text-rd-text-subtle [word-break:break-word]">,</p>
                </div>
                <Word>с телефонами</Word>
                <div className="flex shrink-0 items-center gap-[6px]">
                  <Word>на</Word>
                  <Tech icon={`${A}/icon-kotlin.svg`} iconClass="size-[16px]" label="KOTLIN" />
                </div>
                <Word>с браузерами</Word>
                <Word>-</Word>
                <Word>на</Word>
                <Tech icon={`${A}/icon-javascript.svg`} iconClass="size-[18px]" label="JAVASCRIPT" />
                <div className="flex h-[24px] shrink-0 items-center gap-[6px]">
                  <Word>и</Word>
                  <Tech icon={`${A}/icon-php.svg`} iconClass="h-[16px] w-[30px]" label="PHP" />
                  <Word>,</Word>
                </div>
                <Word>а с железом</Word>
                <div className="flex h-[24px] shrink-0 items-center gap-[6px]">
                  <Word>на</Word>
                  <Tech icon={`${A}/icon-cpp.svg`} iconClass="h-[16px] w-[14px]" label="C++" />
                </div>
                <p className="h-[24px] w-[61px] text-rd-md font-medium tracking-[-0.16px] text-rd-text-subtle [word-break:break-word]">
                  и даже
                </p>
                <div className="flex shrink-0 items-center gap-[4px] overflow-clip bg-[#010180] px-[8px]">
                  <p className="whitespace-nowrap text-center text-[0px] leading-[0] tracking-[-0.16px] text-rd-text-default [text-shadow:0px_0.5px_0.7px_rgba(0,22,41,0.8)] [word-break:break-word]">
                    <span className="text-[16px] font-medium leading-[24px]">AS</span>
                    <span className="text-[16px] font-medium leading-[24px] text-[#1ef418]">EM</span>
                    <span className="text-[16px] font-medium leading-[24px] text-[#f3fc1a]">BL</span>
                    <span className="text-[16px] font-medium leading-[24px]">ER</span>
                  </p>
                </div>
              </div>
              <div className="flex w-full flex-wrap content-start items-start gap-[4px] md:h-[84px] md:w-[631px]">
                <Word>Данные</Word>
                <Word>складываем в</Word>
                <Tech icon={`${A}/icon-postgresql.svg`} iconClass="size-[16px]" label="PostgreSQL" />
                <div className="flex h-[24px] shrink-0 items-center gap-[6px]">
                  <Word>и</Word>
                  <Tech icon={`${A}/icon-mysql.svg`} iconClass="h-[18px] w-[15px]" iconInset="0 -13.93% -37.14% 0" label="MySQL" />
                </div>
                <Word>всё</Word>
                <Word>хозяйство</Word>
                <Word>заворачиваем</Word>
                <div className="flex shrink-0 items-center gap-[6px]">
                  <Word>в</Word>
                  <Tech icon={`${A}/icon-docker.svg`} iconClass="h-[16px] w-[21px]" label="DOCKER" />
                  <Word>,</Word>
                </div>
                <Word>а если</Word>
                <Word>попадается</Word>
                <Word>что-то</Word>
                <Word>непонятное</Word>
                <div className="flex h-[24px] shrink-0 items-center">
                  <Word>разбираем</Word>
                </div>
                <Word>на</Word>
                <Word>винтики</Word>
                <Word>через</Word>
                <div className="flex shrink-0 items-center gap-[4px] overflow-clip">
                  <div className="relative size-[18px] shrink-0 overflow-clip">
                    <div className="absolute inset-[8.32%]">
                      <div className="absolute inset-[-10%_-13.33%_-16.66%_-13.33%]">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img loading="lazy" decoding="async" alt="" className="block size-full max-w-none" src={`${A}/icon-reverse-engineering.svg`} />
                      </div>
                    </div>
                  </div>
                  <p className="whitespace-nowrap text-center text-rd-md font-medium tracking-[-0.16px] text-rd-text-default [word-break:break-word]">
                    Reverse Engineering
                  </p>
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="relative flex w-full flex-col items-center gap-[8px] md:w-auto md:flex-row md:items-start md:justify-center">
              {/* hover — аналог кита 34:852 Primary/Hover (флэт светлее вместо градиента) */}
              <button
                type="button"
                className="group relative flex w-full items-center justify-center gap-[6px] overflow-clip rounded-[6px] px-[14px] py-[10px] md:w-auto"
              >
                <span
                  aria-hidden
                  className="pointer-events-none absolute inset-0 rounded-[6px] bg-gradient-to-t from-rd-orange to-rd-orange-strong"
                />
                <span
                  aria-hidden
                  className="pointer-events-none absolute inset-0 rounded-[6px] bg-rd-orange-hover opacity-0 transition-opacity duration-200 group-hover:opacity-100"
                />
                {/* кит Icons 28:27: telegram-2 (Fill, 24px frame), белый */}
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img loading="lazy" decoding="async" alt="" className="relative block size-[18px] shrink-0" src="/assets/icons/kit/telegram-2-fill-white.svg" />
                <span className="relative flex items-center justify-center px-[2px]">
                  <span className="whitespace-nowrap text-rd-sm font-medium text-rd-text-default [text-shadow:0px_0.5px_1px_rgba(0,0,0,0.15)] [word-break:break-word]">
                    Заказать разработку
                  </span>
                </span>
                <span className="pointer-events-none absolute inset-0 rounded-[inherit] shadow-[inset_0px_0px_0px_1px_var(--rd-orange),inset_0px_2px_0px_0px_var(--rd-border-default)]" />
              </button>
              <button
                type="button"
                className="relative flex w-full items-center justify-center gap-[6px] overflow-clip rounded-[6px] bg-[rgba(10,10,10,0.4)] px-[14px] py-[10px] transition-colors duration-200 hover:bg-rd-bg-state-soft-hover md:w-auto md:bg-rd-bg-state-soft md:hover:bg-rd-bg-state-soft-hover"
              >
                <span className="relative flex items-center justify-center px-[2px]">
                  <span className="whitespace-nowrap text-rd-sm font-medium text-rd-text-subtle [word-break:break-word]">
                    Хочу в команду
                  </span>
                </span>
              </button>
            </div>

            {/* Ligt — лучи, desktop (в Figma группа идёт ПОСЛЕ Content — поверх текста).
                Иерархия восстановлена: Ligt bbox left-113 top--529 от карточки, внутри
                Group 192л left-228.24 top--99.92 (агент схлопнул contents-офсеты);
                metadata origin Ligt за холстом (x=2399 при 1440) → flip потерян codegen'ом */}
            <div
              aria-hidden
              id="ligt-cal"
              className="pointer-events-none absolute inset-0 hidden md:block"
            >
              <div className="absolute inset-0">
              <Ray posClass="left-[83.37px] top-[154.89px] h-[1354.625px] w-[1413.633px] -scale-y-100" transformClass="rotate-[132.8deg]" boxClass="h-[1523.555px] w-[435.339px]" insetClass="inset-[-48.88%_-171.05%]" src={`${A}/dev-ellipse-26-desktop.svg`} rayId="ray26" />
              <Ray posClass="left-[12.96px] top-0 h-[1068.995px] w-[1149.113px] mix-blend-plus-lighter -scale-x-100" transformClass="rotate-[132.8deg]" boxClass="h-[1523.555px] w-[46.038px]" insetClass="inset-[-1.96%_-64.7%]" src={`${A}/dev-ellipse-29-desktop.svg`} rayId="ray29" />
              <Ray posClass="left-[558.51px] top-[11.16px] h-[1083.598px] w-[1162.637px] mix-blend-plus-lighter -scale-y-100" transformClass="rotate-[132.8deg]" boxClass="h-[1523.555px] w-[65.941px]" insetClass="inset-[-1.96%_-45.17%]" src={`${A}/dev-ellipse-30-desktop.svg`} rayId="ray30" />
              <Ray posClass="left-[84.78px] top-[269.84px] h-[1107.146px] w-[1184.445px] mix-blend-plus-lighter -scale-y-100" transformClass="rotate-[132.8deg]" boxClass="h-[1523.555px] w-[98.037px]" insetClass="inset-[-3.91%_-60.77%]" src={`${A}/dev-ellipse-27-desktop.svg`} rayId="ray27" />
              <Ray posClass="left-0 top-[541.08px] h-[752.489px] w-[792.391px] mix-blend-plus-lighter -scale-y-100" transformClass="rotate-[132.8deg]" boxClass="h-[914.533px] w-[178.666px]" insetClass="inset-[-10.99%_-56.27%]" src={`${A}/dev-ellipse-31-desktop.svg`} rayId="ray31" />
              <Ray posClass="left-[400.83px] top-[541.08px] h-[752.489px] w-[792.391px] mix-blend-plus-lighter -scale-y-100" transformClass="rotate-[132.8deg]" boxClass="h-[914.533px] w-[178.666px]" insetClass="inset-[-10.99%_-56.27%]" src={`${A}/dev-ellipse-31-desktop.svg`} rayId="ray31" />
              </div>
              <div className="absolute flex items-center justify-center mix-blend-overlay inset-[-51.4%_-73.01%_-169.75%_26.79%]" style={{ containerType: "size" }}>
                <div className="flex-none rotate-[-35.83deg] h-[hypot(36.862cqw,52.8234cqh)] w-[hypot(63.138cqw,-47.1766cqh)]">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img loading="lazy" decoding="async" alt="" className="absolute inset-0 block size-full max-w-none" src={`${A}/dev-light-group-desktop.svg`} />
                </div>
              </div>
              <div className="absolute flex items-center justify-center mix-blend-overlay inset-[-51.4%_-73.01%_-169.75%_26.79%]" style={{ containerType: "size" }}>
                <div className="flex-none rotate-[-35.83deg] h-[hypot(36.862cqw,52.8234cqh)] w-[hypot(63.138cqw,-47.1766cqh)]">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img loading="lazy" decoding="async" alt="" className="absolute inset-0 block size-full max-w-none" src={`${A}/dev-light-group-desktop.svg`} />
                </div>
              </div>
              <Ray posClass="left-[509.33px] top-[-28.21px] h-[1232.681px] w-[1300.702px] mix-blend-plus-lighter" transformClass="rotate-[132.8deg]" boxClass="h-[1523.555px] w-[269.135px]" insetClass="inset-[-5.41%_-30.6%]" src={`${A}/dev-ellipse-28-desktop.svg`} rayId="ray28" />
            </div>
          </div>
        </div>

        {/* Figma: IllustrationDEV 18342:180699 — робот ПОВЕРХ карточки; в Figma низ
            широкого кропа (44+564=608) РОВНО совпадает с нижней кромкой карточки
            (80+528=608) → якорим к низу карточки (bottom-0), а не к верху секции,
            иначе при другой фактической высоте карточки появляется зазор.
            x: 668 от полосы 1440 = 548 от карточки (1200). Desktop only. */}
        {/* БЕЗ Parallax: клиент требует робота ВПРИТЫК к кромке карточки всегда,
            а параллакс при скролле поднимал его над краем (зазор) */}
        <div className="pointer-events-none absolute inset-0 z-10 hidden md:block">
          <div className="absolute inset-0">
            <div className="absolute bottom-0 left-[548px] h-[564px] w-[794px]">
              <div className="pointer-events-none absolute inset-0 overflow-hidden">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img loading="lazy" decoding="async"
                  alt=""
                  className="absolute left-0 top-0 h-[140.78%] w-full max-w-none"
                  src={`${A}/illustration-dev.webp`}
                />
              </div>
            </div>
            <div className="absolute bottom-[-230px] left-[548px] h-[794px] w-[296px]">
              <div className="pointer-events-none absolute inset-0 overflow-hidden">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img loading="lazy" decoding="async"
                  alt=""
                  className="absolute left-0 top-0 h-full w-[268.24%] max-w-none"
                  src={`${A}/illustration-dev.webp`}
                />
              </div>
            </div>
          </div>
        </div>
        </Reveal>
      </div>
    </section>
  );
}
