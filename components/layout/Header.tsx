// Figma: Header Type=Default, Phone=False 17047:80748 (instance 18339:218443) / Phone=True (instance 18337:195018)
"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { Logo } from "@/components/ui/Logo";
import { HeaderItem } from "@/components/ui/HeaderItem";
import { Button } from "@/components/ui/Button";
import { IconButton } from "@/components/ui/IconButton";
import { MobileMenu } from "./MobileMenu";

/** 16px Brick®World mini-cube — цельный SVG (прод-ассет brickworld.io, Project=World) */
function BwMiniIcon() {
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      alt=""
      className="block size-[16px] shrink-0"
      src="/assets/icons/solid/world-32.svg"
    />
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
  // Десктоп: мега-меню открывается по наведению на Brick®World и живёт, пока курсор
  // над кнопкой ИЛИ над панелью; закрытие с задержкой ~200мс, чтобы не мигало при
  // перелёте курсора между кнопкой и панелью. Клик оставлен как toggle (тач/клавиатура).
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const cancelClose = useCallback(() => {
    if (closeTimer.current) {
      clearTimeout(closeTimer.current);
      closeTimer.current = null;
    }
  }, []);
  const openMenu = useCallback(() => {
    cancelClose();
    setMenuOpen(true);
  }, [cancelClose]);
  const scheduleClose = useCallback(() => {
    cancelClose();
    closeTimer.current = setTimeout(() => setMenuOpen(false), 200);
  }, [cancelClose]);
  useEffect(() => cancelClose, [cancelClose]);
  // true, пока меню удерживается ховером мыши — клик мышью по кнопке в этом
  // состоянии не должен схлопывать меню (toggle остаётся для тача/клавиатуры)
  const hoverHeld = useRef(false);

  // Esc и клик мимо панели закрывают меню (a11y)
  const rootRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (!menuOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMenuOpen(false);
    };
    const onDown = (e: PointerEvent) => {
      if (rootRef.current && !rootRef.current.contains(e.target as Node)) {
        setMenuOpen(false);
      }
    };
    document.addEventListener("keydown", onKey);
    document.addEventListener("pointerdown", onDown);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("pointerdown", onDown);
    };
  }, [menuOpen]);

  return (
    <div ref={rootRef} className="contents">
      <header
        className="relative z-40 flex w-full flex-col items-center justify-center bg-rd-bg-default px-[16px] py-[16px] shadow-[inset_0_-1px_0_0_var(--rd-border-default)] md:px-[24px]"
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
                  onClick={() => {
                    cancelClose();
                    if (hoverHeld.current) return; // уже открыто ховером — не схлопывать
                    setMenuOpen((v) => !v);
                  }}
                  onPointerEnter={(e) => {
                    if (e.pointerType !== "mouse") return;
                    hoverHeld.current = true;
                    openMenu();
                  }}
                  onPointerLeave={(e) => {
                    if (e.pointerType !== "mouse") return;
                    hoverHeld.current = false;
                    scheduleClose();
                  }}
                  aria-expanded={menuOpen}
                  aria-haspopup="true"
                  aria-controls="bw-menu"
                  className="group relative flex items-center justify-center gap-[4px] overflow-clip rounded-[6px] bg-rd-bg-state-ghost px-[10px] py-[6px]"
                >
                  <BwMiniIcon />
                  <span className="flex items-center justify-center px-[2px]">
                    {/* hover (Figma 17003:82886): только текст → text/default, без фона */}
                    <span className="whitespace-nowrap text-center text-rd-sm font-normal text-rd-text-subtle transition-colors duration-150 group-hover:text-rd-text-default">
                      {item.label}
                    </span>
                  </span>
                  {/* кит Icons 28:27: arrow-down-s (24px frame), белый 50% */}
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    alt=""
                    className="block size-[16px] shrink-0"
                    src="/assets/icons/kit/arrow-down-s.svg"
                  />
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
                  href="#community"
                  leadIcon="/assets/icons/kit/telegram-2-fill-dark.svg"
                >
                  Связаться
                </Button>
              </div>
            </div>
          </div>

          {/* mobile burger */}
          <div className="flex items-center lg:hidden">
            <IconButton label="Меню" aria-expanded={menuOpen} aria-controls="bw-menu" onClick={() => setMenuOpen((v) => !v)} />
          </div>
        </div>
      </header>
      <MobileMenu
        open={menuOpen}
        onClose={() => setMenuOpen(false)}
        onDesktopPanelEnter={openMenu}
        onDesktopPanelLeave={scheduleClose}
      />
    </div>
  );
}
