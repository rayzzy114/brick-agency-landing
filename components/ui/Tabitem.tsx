// Figma: Tabitem 18327:86053
import type { ReactNode } from "react";

export function Tabitem({
  icon,
  title,
  subtitle,
  badge,
  href,
  width = 245,
  className,
  onClick,
}: {
  /** цельная кит-иконка (24px frame), рендерится в 18px */
  icon: string;
  title: string;
  subtitle: ReactNode;
  badge?: { icon?: string; label: string };
  href?: string;
  /** tile width in px (Figma component: 245; HeaderMainMenu instances: 290) */
  width?: number;
  className?: string;
  onClick?: () => void;
}) {
  // всегда <a>: без href пункт был <div> — не фокусировался и не работал с клавиатуры
  return (
    <a
      href={href ?? "#"}
      onClick={onClick}
      style={{ width }}
      className={`flex flex-col items-start overflow-clip p-[16px] hover:bg-[rgba(255,255,255,0.06)] focus-visible:bg-[rgba(255,255,255,0.06)] ${className ?? ""}`}
      data-name="Tabitem"
    >
      <div
        className="flex w-full items-center gap-[16px] pb-[24px] pr-[16px]"
        data-name="TabItemContent"
      >
        <div className="flex flex-row items-center self-stretch">
          <div
            className="flex h-full items-start py-[2px]"
            data-name="IconContainer"
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img loading="lazy" decoding="async"
              alt=""
              className="block size-[18px] shrink-0"
              src={icon}
              data-name="Icon"
            />
          </div>
        </div>
        <div
          className="flex min-w-px flex-[1_0_0] flex-col items-start justify-center gap-[24px]"
          data-name="Info"
        >
          <div
            className="flex w-full flex-col items-start gap-[8px] [word-break:break-word]"
            data-name="Text"
          >
            <p className="w-[min-content] min-w-full text-[18px] font-medium leading-[20px] text-rd-text-default">
              {title}
            </p>
            <p className="whitespace-nowrap text-rd-sm font-normal text-rd-text-subtle">
              {subtitle}
            </p>
          </div>
          {badge && (
            <div
              className="flex items-center justify-center overflow-clip rounded-[6px] border border-solid border-rd-border-default bg-[rgba(176,255,0,0.1)] p-[2px]"
              data-name="Badge"
            >
              <div className="flex size-[16px] items-center justify-center">
                {/* кит Icons 28:27: user-3 (Fill, 24px frame), lime #B0FF00 */}
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img loading="lazy" decoding="async"
                  alt=""
                  className="block size-[12px] shrink-0"
                  src={badge.icon ?? "/assets/icons/kit/user-3-fill-lime.svg"}
                />
              </div>
              <div className="flex items-center pl-[2px] pr-[4px]">
                <p className="whitespace-nowrap text-rd-xs font-medium text-rd-lime-strong [word-break:break-word]">
                  {badge.label}
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </a>
  );
}
