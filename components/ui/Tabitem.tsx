// Figma: Tabitem 18327:86053
import type { ReactNode } from "react";

export function Tabitem({
  icon,
  iconInset = "4.17% 8.33% 12.5% 8.33%",
  title,
  subtitle,
  badge,
  href,
  width = 245,
  className,
  onClick,
}: {
  icon: string;
  /** absolute inset of the icon Vector inside its 18px box (Figma per-icon value) */
  iconInset?: string;
  title: string;
  subtitle: ReactNode;
  badge?: { icon?: string; label: string };
  href?: string;
  /** tile width in px (Figma component: 245; HeaderMainMenu instances: 290) */
  width?: number;
  className?: string;
  onClick?: () => void;
}) {
  const Root = (href ? "a" : "div") as "a";
  return (
    <Root
      {...(href ? { href } : {})}
      onClick={onClick}
      style={{ width }}
      className={`flex flex-col items-start overflow-clip p-[16px] hover:bg-[rgba(255,255,255,0.06)] ${className ?? ""}`}
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
            <div
              className="relative size-[18px] shrink-0 overflow-clip"
              data-name="Icon"
            >
              <div className="absolute" style={{ inset: iconInset }}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  alt=""
                  className="absolute inset-0 block size-full max-w-none"
                  src={icon}
                />
              </div>
            </div>
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
                <div className="relative size-[12px] shrink-0 overflow-clip">
                  <div className="absolute inset-[4.17%_16.67%_8.33%_16.67%]">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      alt=""
                      className="absolute inset-0 block size-full max-w-none"
                      src={badge.icon ?? "/assets/menu/badge-lime.svg"}
                    />
                  </div>
                </div>
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
    </Root>
  );
}
