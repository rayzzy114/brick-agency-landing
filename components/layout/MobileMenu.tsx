// Figma: HeaderMainMenu 18339:215640 (Property1=Default: 18327:86084 desktop
// mega-dropdown 870x352; Property1=Variant2: mobile panel 290x520)
"use client";

import type { ReactNode } from "react";
import { Tabitem } from "@/components/ui/Tabitem";
import { BrickWorldIcon } from "@/components/ui/BrickWorldIcon";

/* Radial highlight overlay on the MVP preview image — inline data-uri from Figma. */
const MVP_RADIAL =
  "url(\"data:image/svg+xml;utf8,<svg viewBox='0 0 264 396' xmlns='http://www.w3.org/2000/svg' preserveAspectRatio='none'><rect x='0' y='0' height='100%' width='100%' fill='url(%23grad)' opacity='1'/><defs><radialGradient id='grad' gradientUnits='userSpaceOnUse' cx='0' cy='0' r='10' gradientTransform='matrix(-5.3009e-15 7.7966 -13.473 -1.8902e-7 0 1.0991e-14)'><stop stop-color='rgba(255,255,255,0.4)' offset='0'/><stop stop-color='rgba(255,255,255,0)' offset='1'/></radialGradient></defs></svg>\")";

/** Horizontal 1px separator line (Figma: Separator, h-0 with -0.5px overhang). */
function HSeparator({ src, full }: { src: string; full?: boolean }) {
  return (
    <div
      className={`relative h-0 ${full ? "w-full" : "w-[290px]"}`}
      data-name="Separator"
    >
      <div className="absolute inset-[-0.5px_0]">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img alt="" className="block size-full max-w-none" src={src} />
      </div>
    </div>
  );
}

/** Vertical separator between desktop menu columns (rotated horizontal line). */
function VSeparator() {
  return (
    <div
      className="relative flex w-0 items-center justify-center self-stretch"
      style={{ containerType: "size" }}
    >
      <div className="w-[100cqh] flex-none rotate-90">
        <div className="relative h-0 w-full" data-name="Separator">
          <div className="absolute inset-[-0.5px_0]">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              alt=""
              className="block size-full max-w-none"
              src="/assets/menu/separator-vertical.svg"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

/** Project-type tile (BrickWorldIcon cube + title + description).
    size "lg" = desktop (18/20 + 14/20), "sm" = mobile Variant2 (14/16 + 12/16). */
function ProjectTile({
  project,
  title,
  desc,
  size,
  padding,
  textWidth,
  contentFull,
  highlighted,
  onClick,
  children,
}: {
  project: "market" | "tools" | "ceh";
  title: string;
  desc: ReactNode;
  size: "lg" | "sm";
  padding: "p16" | "px16py24";
  /** Figma Text column: flex-1 (Маркет/ЦЕХ) or fixed 224px (Инструменты) */
  textWidth?: 224;
  /** Content row width: full (ЦЕХ) instead of fixed 272px */
  contentFull?: boolean;
  /** Figma Default: у Маркет статичный bg/on-subtle (подсветка под нарисованным курсором) */
  highlighted?: boolean;
  onClick?: () => void;
  children?: ReactNode;
}) {
  const lg = size === "lg";
  return (
    <div
      onClick={onClick}
      className={`flex w-[290px] flex-col items-start overflow-clip hover:bg-[rgba(255,255,255,0.06)] ${
        highlighted ? "bg-[rgba(255,255,255,0.06)]" : ""
      } ${
        padding === "p16"
          ? "min-h-px flex-[1_0_0] p-[16px]"
          : "px-[16px] py-[24px]"
      }`}
      data-name="Tabitem"
    >
      <div
        className={`flex flex-col items-start gap-[24px] overflow-clip ${
          padding === "p16" ? "pb-[24px]" : ""
        } ${contentFull ? "w-full" : ""}`}
        data-name="TabItemContent"
      >
        <div
          className={`flex items-start gap-[16px] ${contentFull ? "w-full" : "w-[272px]"}`}
          data-name="Content"
        >
          <BrickWorldIcon project={project} />
          <div
            className={`flex flex-col items-start justify-center gap-[8px] ${
              textWidth === 224 ? "w-[224px]" : "min-w-px flex-[1_0_0]"
            }`}
            data-name="Text"
          >
            <div className="flex w-full items-center gap-[2px]" data-name="Title">
              <p
                className={`min-w-px flex-[1_0_0] font-medium text-rd-text-default [word-break:break-word] ${
                  lg ? "text-[18px] leading-[20px]" : "text-[14px] leading-[16px]"
                }`}
              >
                {title}
              </p>
            </div>
            <div className="flex w-full items-center pr-[16px]" data-name="Desc">
              <p
                className={`w-[208px] font-normal text-rd-text-subtle [word-break:break-word] ${
                  lg ? "text-rd-sm" : "text-[12px] leading-[16px]"
                }`}
              >
                {desc}
              </p>
            </div>
          </div>
        </div>
        {children}
      </div>
    </div>
  );
}

/** Mobile (Variant2) page-type row: 18px icon + 14/16 title + 12/16 subtitle, gap 32. */
function MobilePageRow({
  icon,
  iconInset,
  title,
  subtitle,
  onClick,
}: {
  icon: string;
  iconInset: string;
  title: string;
  subtitle: ReactNode;
  onClick?: () => void;
}) {
  return (
    <div
      onClick={onClick}
      className="flex w-[290px] flex-col items-start overflow-clip px-[16px] py-[24px] hover:bg-[rgba(255,255,255,0.06)]"
      data-name="Tabitem"
    >
      <div
        className="flex w-full items-center gap-[32px] pr-[16px]"
        data-name="TabItemContent"
      >
        <div className="flex flex-row items-center self-stretch">
          <div className="flex h-full items-start py-[2px]" data-name="IconContainer">
            <div className="relative size-[18px] shrink-0 overflow-clip" data-name="Icon">
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
          className="flex w-[206px] flex-col items-start justify-center gap-[24px]"
          data-name="Info"
        >
          <div
            className="flex w-full flex-col items-start gap-[8px] [word-break:break-word]"
            data-name="Text"
          >
            <p className="w-[min-content] min-w-full text-[14px] font-medium leading-[16px] text-rd-text-default">
              {title}
            </p>
            <p className="whitespace-nowrap text-[12px] font-normal leading-[16px] text-rd-text-subtle">
              {subtitle}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

/** MVP preview image card (desktop mega-menu only). */
function MvpImage() {
  return (
    <div
      className="relative h-[399.508px] w-full rounded-[24px] border border-solid border-rd-border-default"
      data-name="Image"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 rounded-[24px] bg-rd-bg-muted"
      />
      <div
        className="absolute left-[3px] right-[3px] top-[3px] aspect-[520/779] rounded-[22px] border border-solid border-[#e7ffb2]"
        data-name="image 529"
      >
        <div aria-hidden className="pointer-events-none absolute inset-0 rounded-[22px]">
          <div className="absolute inset-0 overflow-hidden rounded-[22px]">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              alt=""
              className="absolute left-[-2.5%] top-[-3.34%] h-[104.49%] w-[105.96%] max-w-none"
              src="/assets/menu/mvp-preview.png"
            />
          </div>
          <div
            className="absolute inset-0 rounded-[22px] mix-blend-plus-lighter"
            style={{ backgroundImage: MVP_RADIAL }}
          />
        </div>
      </div>
      <div className="pointer-events-none absolute inset-0 rounded-[inherit] shadow-[inset_0px_1px_0px_0px_rgba(255,255,255,0.16),inset_0px_2px_4px_0px_rgba(255,255,255,0.12)]" />
    </div>
  );
}

export function MobileMenu({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  if (!open) return null;
  return (
    <div className="relative z-30 w-full">
      {/* Desktop mega-dropdown — Figma: HeaderMainMenu Property1=Default (870px) */}
      <div className="absolute left-1/2 top-0 hidden -translate-x-1/2 lg:block">
        <div
          className="relative flex items-start overflow-clip rounded-[8px] border-[0.5px] border-solid border-[rgba(255,255,255,0.25)] bg-[rgba(26,26,26,0.8)] backdrop-blur-[30px]"
          data-node-id="18327:86084"
        >
          <div
            className="flex flex-col items-start self-stretch"
            data-name="Pages"
          >
            <Tabitem
              icon="/assets/menu/icon-vacancies.svg"
              iconInset="4.17% 8.33% 12.5% 8.33%"
              title="Вакансии"
              subtitle="Мы нуждаемся в талантах"
              width={290}
              onClick={onClose}
            />
            <HSeparator src="/assets/menu/separator-a.svg" />
            <Tabitem
              icon="/assets/menu/icon-articles.svg"
              iconInset="12.5% 12.5% 8.33% 12.5%"
              title="Статьи"
              subtitle={
                <>
                  Делимся толкьо самым важным
                  <br aria-hidden />и только о самом важном
                </>
              }
              width={290}
              onClick={onClose}
            />
            <HSeparator src="/assets/menu/separator-a.svg" />
            <Tabitem
              icon="/assets/menu/icon-resources.svg"
              iconInset="12.51% 0.59% 9.31% 0.63%"
              title="Ресурсы"
              subtitle={
                <>
                  Лучшие ресурсы, шрифты,
                  <br aria-hidden />c просторов интернета!
                </>
              }
              width={290}
              onClick={onClose}
            />
          </div>
          <VSeparator />
          <div
            className="flex flex-col items-start self-stretch"
            data-name="Project"
          >
            <ProjectTile
              project="market"
              title="Маркет"
              desc="Покупайте плагины и ассеты комьюнити и продавайте свои собственные!"
              size="lg"
              padding="p16"
              highlighted
              onClick={onClose}
            />
            <HSeparator src="/assets/menu/separator-b.svg" />
            <ProjectTile
              project="tools"
              title="Инструменты"
              desc="Наши плагины и полезные боты от производства"
              size="lg"
              padding="p16"
              textWidth={224}
              onClick={onClose}
            />
          </div>
          <VSeparator />
          <div
            className="flex flex-col items-start overflow-clip self-stretch"
            data-name="MVP (Most Viral Project)"
          >
            <ProjectTile
              project="ceh"
              title="ЦЕХ"
              desc={
                <>
                  Авто-генератор превью, крео
                  <br aria-hidden />и всего где нужно зацепить
                </>
              }
              size="lg"
              padding="p16"
              contentFull
              onClick={onClose}
            >
              <MvpImage />
            </ProjectTile>
          </div>
          <div className="absolute left-[332px] top-[111px] flex h-[50.311px] w-[44.001px] items-center justify-center">
            <div className="flex-none rotate-[15.41deg] skew-x-[-1.32deg]">
              <div className="relative h-[43.473px] w-[32.659px]" data-name="Vector">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  alt=""
                  className="absolute inset-0 block size-full max-w-none"
                  src="/assets/menu/cursor-arrow.svg"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile panel — Figma: HeaderMainMenu Property1=Variant2 (290px) */}
      <div className="absolute right-0 top-0 lg:hidden">
        <div
          className="flex flex-col items-start overflow-clip border-[0.5px] border-solid border-[rgba(255,255,255,0.25)] bg-rd-bg-subtle backdrop-blur-[30px]"
          data-node-id="18339:215640"
        >
          <div
            className="flex w-[290px] flex-col items-start overflow-clip px-[16px] py-[24px]"
            data-name="MVP (Most Viral Project)"
          >
            <div
              className="flex w-full flex-col items-start gap-[24px] overflow-clip"
              data-name="TabItemContent"
            >
              <div className="flex w-full items-start gap-[16px]" data-name="Content">
                <BrickWorldIcon project="ceh" />
                <div
                  className="flex min-w-px flex-[1_0_0] flex-col items-start justify-center gap-[8px]"
                  data-name="Text"
                >
                  <div className="flex w-full items-center gap-[2px]" data-name="Title">
                    <p className="min-w-px flex-[1_0_0] text-[14px] font-medium leading-[16px] text-rd-text-default [word-break:break-word]">
                      ЦЕХ
                    </p>
                  </div>
                  <div className="flex w-full items-center pr-[16px]" data-name="Desc">
                    <p className="w-[208px] text-[12px] font-normal leading-[16px] text-rd-text-subtle [word-break:break-word]">
                      Авто-генератор превью, крео
                      <br aria-hidden />и всего где нужно зацепить
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <HSeparator src="/assets/menu/separator-b.svg" />
          <ProjectTile
            project="market"
            title="Маркет"
            desc="Покупайте плагины и ассеты комьюнити и продавайте свои собственные!"
            size="sm"
            padding="px16py24"
            onClick={onClose}
          />
          <HSeparator src="/assets/menu/separator-b.svg" />
          <ProjectTile
            project="tools"
            title="Инструменты"
            desc="Наши плагины и полезные боты от производства"
            size="sm"
            padding="px16py24"
            textWidth={224}
            onClick={onClose}
          />
          <HSeparator src="/assets/menu/separator-b.svg" />
          <HSeparator src="/assets/menu/separator-b.svg" />
          <MobilePageRow
            icon="/assets/menu/icon-vacancies.svg"
            iconInset="4.17% 8.33% 12.5% 8.33%"
            title="Вакансии"
            subtitle="Мы нуждаемся в талантах"
            onClick={onClose}
          />
          <HSeparator src="/assets/menu/separator-a.svg" />
          <MobilePageRow
            icon="/assets/menu/icon-articles.svg"
            iconInset="12.5% 12.5% 8.33% 12.5%"
            title="Статьи"
            subtitle={
              <>
                Делимся толкьо самым важным
                <br aria-hidden />и только о самом важном
              </>
            }
            onClick={onClose}
          />
          <HSeparator src="/assets/menu/separator-a.svg" />
          <div className="relative h-0 w-[290px]" data-name="Pages" />
        </div>
      </div>
    </div>
  );
}
