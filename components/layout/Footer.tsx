// Figma: Footer Type=Default Phone=False (18329:359529) / Phone=True (18339:201451)
import { CSSProperties, ReactNode } from "react";
import { Logo, LogoIcon } from "@/components/ui/Logo";
import { BrickWorldIcon } from "@/components/ui/BrickWorldIcon";
import { FooterGameBlock, ReleaseHint } from "./FooterGame";

/** 16px mini-cube: цельные SVG-иконки рендерятся сразу в 16px */
function Mini16({ children }: { children: ReactNode }) {
  return <div className="flex size-[16px] shrink-0 items-center">{children}</div>;
}

function ProjectLine({ icon, tail }: { icon: ReactNode; tail: string }) {
  return (
    <div className="flex w-full items-center gap-[6px]" data-name="Line">
      {icon}
      <p className="whitespace-nowrap text-rd-sm font-normal text-rd-text-subtle [word-break:break-word]">
        <span className="italic">Brick®</span>
        <span>{` ${tail}`}</span>
      </p>
    </div>
  );
}

function ProjectsBlock({ className }: { className: string }) {
  return (
    <div className={`flex flex-col items-start gap-[12px] ${className}`}>
      <p className="w-full text-rd-sm font-medium text-rd-text-default [word-break:break-word]">
        Проекты
      </p>
      <ProjectLine
        icon={
          <Mini16>
            <LogoIcon className="size-[16px]" />
          </Mini16>
        }
        tail="Agency"
      />
      <ProjectLine
        icon={
          <Mini16>
            <BrickWorldIcon project="market" className="size-[16px]" />
          </Mini16>
        }
        tail="Market"
      />
      <ProjectLine
        icon={
          <Mini16>
            <BrickWorldIcon project="tools" className="size-[16px]" />
          </Mini16>
        }
        tail="Tools"
      />
      <ProjectLine
        icon={
          <Mini16>
            <BrickWorldIcon project="ceh" className="size-[16px]" />
          </Mini16>
        }
        tail="ЦЕХ"
      />
    </div>
  );
}

function ContactsBlock({ className }: { className: string }) {
  return (
    <div
      className={`flex flex-col items-start gap-[12px] text-rd-sm not-italic [word-break:break-word] ${className}`}
    >
      <p className="w-full font-medium text-rd-text-default">Контакты</p>
      <p className="w-full font-normal text-rd-text-subtle">Telegram-канал</p>
      <p className="w-full font-normal text-rd-text-subtle">Telegram</p>
    </div>
  );
}

/** Hairline divider drawn as the Figma line SVG (white @ 6%). */
function Divider() {
  return (
    <div className="relative h-0 w-full shrink-0" data-name="Line">
      <div className="absolute inset-[-1px_0_0_0]">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          alt=""
          className="hidden size-full max-w-none lg:block"
          src="/assets/footer/line-desktop.svg"
        />
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          alt=""
          className="block size-full max-w-none lg:hidden"
          src="/assets/footer/line-mobile.svg"
        />
      </div>
    </div>
  );
}

/** Smoke overlay: two stacked crops of the same PNG, blended lighten. */
function SmokeStack({
  className,
  secondLayer,
}: {
  className: string;
  secondLayer: CSSProperties;
}) {
  return (
    <div className={`absolute mix-blend-lighten ${className}`}>
      <div aria-hidden className="pointer-events-none absolute inset-0">
        <div className="absolute inset-0 overflow-hidden">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            alt=""
            className="absolute left-[2.12%] top-[-22.98%] h-[123.04%] w-[99.78%] max-w-none"
            src="/assets/footer/smoke-static.png"
          />
        </div>
        <div className="absolute inset-0 overflow-hidden">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            alt=""
            className="absolute max-w-none"
            style={secondLayer}
            src="/assets/footer/smoke-static.png"
          />
        </div>
      </div>
    </div>
  );
}

const SMOKE_LAYER_A: CSSProperties = {
  height: "331.51%",
  left: "3.58%",
  top: "-7.29%",
  width: "168.03%",
};
const SMOKE_LAYER_B: CSSProperties = {
  height: "115.87%",
  left: "2.07%",
  top: "-20.02%",
  width: "97.01%",
};

export function Footer() {
  return (
    <footer
      className="relative flex w-full flex-col items-center bg-rd-bg-default px-[16px] py-[40px] shadow-[inset_0_1px_0_0_var(--rd-border-default)] lg:px-[24px] lg:py-[48px]"
      data-name="Footer"
      data-node-id="18329:359529"
    >
      <div className="relative flex w-full max-w-[1200px] flex-col items-start gap-[24px] lg:gap-0">
        {/* top content — desktop (4 columns, fixed 286px height) */}
        <div className="hidden h-[286px] w-full items-start gap-[24px] lg:flex">
          <div className="flex flex-col items-start">
            <Logo />
          </div>
          <div className="flex h-full min-w-px flex-[1_0_0] items-start justify-between px-[32px] pb-[24px]">
            <FooterGameBlock variant="desktop" />
            {/* на lg (1024..1279) зоне игры тесно — подсказку показываем с xl */}
            <div className="hidden h-full items-end justify-center xl:flex">
              <ReleaseHint />
            </div>
          </div>
          <ProjectsBlock className="w-[182px] max-w-[200px]" />
          <ContactsBlock className="w-[168px] max-w-[200px]" />
        </div>

        {/* top content — mobile (stacked) */}
        <div className="flex w-full flex-col items-start gap-[24px] lg:hidden">
          <Logo />
          <ProjectsBlock className="w-full" />
          <ContactsBlock className="w-full" />
        </div>

        {/* smoke overlays — desktop */}
        <div className="hidden lg:contents">
          <SmokeStack
            className="left-[214px] top-[-67px] h-[108px] w-[250px]"
            secondLayer={SMOKE_LAYER_A}
          />
          <SmokeStack
            className="left-[214px] top-[-13px] h-[309px] w-[433px]"
            secondLayer={SMOKE_LAYER_B}
          />
        </div>
        {/* smoke overlays — mobile */}
        <div className="contents lg:hidden">
          <SmokeStack
            className="left-[-37.67px] top-[316.07px] h-[105.577px] w-[257.89px]"
            secondLayer={SMOKE_LAYER_A}
          />
          <SmokeStack
            className="left-[-37.67px] top-[368.86px] h-[302.068px] w-[446.666px]"
            secondLayer={SMOKE_LAYER_B}
          />
        </div>

        <Divider />

        {/* counter row — mobile only (on desktop the counter lives in the top row) */}
        <div className="flex h-[286px] w-full items-start justify-between pb-[24px] lg:hidden">
          <FooterGameBlock variant="mobile" />
          <div className="flex h-full min-w-px flex-[1_0_0] items-start justify-end">
            <ReleaseHint />
          </div>
        </div>
        <div className="contents lg:hidden">
          <Divider />
        </div>

        {/* bottom bar: legal links + copyright */}
        <div className="flex w-full flex-col items-start gap-[16px] whitespace-nowrap font-normal not-italic [word-break:break-word] lg:flex-row lg:gap-[8px] lg:pt-[36px]">
          <div className="flex w-full flex-col items-start justify-center gap-[16px] text-rd-xs text-rd-text-muted lg:w-auto lg:min-w-px lg:flex-[1_0_0] lg:flex-row lg:items-center lg:justify-start">
            <p>Политика конфиденциальности</p>
            <p>Пользовательское соглашение</p>
            <p>Cookie</p>
          </div>
          <p className="text-rd-sm text-rd-text-subtle lg:text-rd-xs lg:text-rd-text-muted">
            BrickAgency All Rights Reserved © 2026
          </p>
        </div>
      </div>
    </footer>
  );
}
