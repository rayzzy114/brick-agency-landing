// Figma: Header Type=Default, Phone=False 17047:80748 (instance 18339:218443) / Phone=True (instance 18337:195018)
"use client";

import { useState } from "react";
import { Logo } from "@/components/ui/Logo";
import { HeaderItem } from "@/components/ui/HeaderItem";
import { Button } from "@/components/ui/Button";
import { IconButton } from "@/components/ui/IconButton";
import { PixelGridMasked } from "@/components/ui/PixelGrid";
import { MobileMenu } from "./MobileMenu";

/** 16px Brick®World mini-cube (Figma: 16px tail-icon with orange gradient) —
    full 32px cube structure scaled 0.5, matching Figma's scaled instance. */
function BwMiniIcon() {
  return (
    <span className="relative block size-[16px] shrink-0">
      <span className="absolute left-0 top-0 origin-top-left scale-50">
        <span className="relative block size-[32px] overflow-clip rounded-[8px] border-2 border-solid border-[rgba(255,255,255,0.5)] bg-gradient-to-b from-[#ffb247] to-[#ff7700]">
          <PixelGridMasked mode="fill" />
          <span className="absolute" style={{ inset: "calc(18.75% - 0.63px)" }}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              alt=""
              className="absolute inset-0 block size-full max-w-none"
              src="/assets/icons/bw-mini.svg"
            />
          </span>
        </span>
      </span>
    </span>
  );
}

const NAV = [
  { label: "О нас", href: "#about" },
  { label: "Наши Работы", href: "#works" },
  { label: "Brick®World", href: "#world", bw: true },
  { label: "Контакты", href: "#contacts" },
];

export function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <>
      <header
        className="relative z-40 flex w-full flex-col items-center justify-center border-b border-solid border-rd-border-default bg-rd-bg-default px-[16px] py-[16px] backdrop-blur-[12px] md:px-[24px]"
        data-node-id="18339:218443"
      >
        <div className="flex w-full max-w-[1200px] items-center justify-between lg:justify-normal">
          <div className="flex flex-col items-start lg:min-w-px lg:flex-[1_0_0]">
            <Logo />
          </div>

          {/* desktop nav */}
          <nav className="hidden items-center gap-[2px] lg:flex">
            {NAV.map((item) =>
              item.bw ? (
                <button
                  key={item.label}
                  type="button"
                  onClick={() => setMenuOpen((v) => !v)}
                  aria-expanded={menuOpen}
                  className="group relative flex items-center justify-center gap-[4px] overflow-clip rounded-[6px] bg-rd-bg-state-ghost px-[10px] py-[6px]"
                >
                  <BwMiniIcon />
                  <span className="flex items-center justify-center px-[2px]">
                    <span className="whitespace-nowrap text-center text-rd-sm font-normal text-rd-text-subtle group-hover:text-rd-text-default">
                      {item.label}
                    </span>
                  </span>
                  <span className="relative size-[16px] shrink-0 overflow-clip">
                    <span className="absolute inset-[34.26%_23.48%_33.33%_23.48%]">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        alt=""
                        className="absolute inset-0 block size-full max-w-none"
                        src="/assets/icons/tail-icon.svg"
                      />
                    </span>
                  </span>
                </button>
              ) : (
                <HeaderItem
                  key={item.label}
                  label={item.label}
                  href={item.href}
                  tailIcon={false}
                />
              ),
            )}
          </nav>

          {/* desktop actions */}
          <div className="hidden min-w-px flex-[1_0_0] flex-col items-end justify-center lg:flex">
            <div className="flex items-center gap-[16px]">
              <div className="flex items-center">
                {/* языковой селектор из макета — без действия, пока нет i18n */}
                <IconButton label="Язык" />
              </div>
              <div className="flex h-[32px] w-0 items-center justify-center">
                <div className="flex-none rotate-90">
                  <div className="relative h-0 w-[32px]">
                    <div className="absolute inset-[-1px_0_0_0]">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        alt=""
                        className="block size-full max-w-none"
                        src="/assets/icons/header-divider.svg"
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-[8px]">
                <Button variant="secondary" href="#login">
                  Войти
                </Button>
                <Button
                  variant="primary"
                  href="#contact"
                  leadIcon="/assets/icons/contact-lead.svg"
                >
                  Связаться
                </Button>
              </div>
            </div>
          </div>

          {/* mobile burger */}
          <div className="flex items-center lg:hidden">
            <IconButton label="Меню" onClick={() => setMenuOpen((v) => !v)} />
          </div>
        </div>
      </header>
      <MobileMenu open={menuOpen} onClose={() => setMenuOpen(false)} />
    </>
  );
}
