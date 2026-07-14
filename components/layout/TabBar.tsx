// Figma: Tab Bar 18339:253479
import { PIXEL_GRID, PIXEL_OPACITY } from "@/components/ui/PixelGrid";

type TabKey = "about" | "portfolio" | "world" | "login" | "contact";

/** Default-type tab (Figma: Tab Type=Default). Active styling for Default tabs
    is not present in the Figma dump — white label is used for the active state. */
function TabDefault({
  label,
  icon,
  iconInset,
  href,
  active,
}: {
  label: string;
  icon: string;
  /** inset of the Vector inside the 24px lead-icon box; omit for the centered 20px icon ("О нас") */
  iconInset?: string;
  href?: string;
  active?: boolean;
}) {
  return (
    <a
      href={href}
      className="flex min-w-px flex-[1_0_0] flex-col items-center justify-center gap-[4px] overflow-clip py-[8px]"
      data-name="Tab"
    >
      {iconInset ? (
        <div
          className="relative size-[24px] shrink-0 overflow-clip"
          data-name="lead-icon"
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
      ) : (
        <div
          className="flex size-[24px] shrink-0 items-center justify-center overflow-clip"
          data-name="lead-icon"
        >
          <div className="relative size-[20px] shrink-0">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              alt=""
              className="absolute inset-0 block size-full max-w-none"
              src={icon}
            />
          </div>
        </div>
      )}
      <p
        className={`whitespace-nowrap text-center text-[10px] font-medium leading-[16px] ${
          active ? "text-rd-text-default" : "text-rd-text-muted"
        }`}
      >
        {label}
      </p>
    </a>
  );
}

/** Special-type tab (Figma: Tab Type=Special, State=Active — the Brick®World tab).
    The inactive Special state is not present in the dump; when inactive the
    orange gradient and bottom glow are omitted. */
function TabSpecial({ href, active }: { href?: string; active?: boolean }) {
  const maskCube = {
    maskImage: 'url("/assets/menu/tab-special-mask.svg")',
    maskSize: "42px 41px",
    maskRepeat: "no-repeat",
    WebkitMaskImage: 'url("/assets/menu/tab-special-mask.svg")',
    WebkitMaskSize: "42px 41px",
    WebkitMaskRepeat: "no-repeat",
  } as const;
  const maskGrid = {
    maskImage:
      'url("/assets/menu/tab-special-mask.svg"), url("/assets/menu/tab-special-grid-mask.svg")',
    maskPosition: "-1.313px -0.313px, -1.313px -1.313px",
    maskRepeat: "no-repeat",
    maskComposite: "intersect",
    WebkitMaskImage:
      'url("/assets/menu/tab-special-mask.svg"), url("/assets/menu/tab-special-grid-mask.svg")',
    WebkitMaskPosition: "-1.313px -0.313px, -1.313px -1.313px",
    WebkitMaskRepeat: "no-repeat",
    WebkitMaskComposite: "source-in",
  } as const;
  return (
    <a
      href={href}
      className={`relative flex h-[60px] w-[100px] shrink-0 flex-col items-center justify-end gap-[8px] py-[8px] ${
        active
          ? "bg-gradient-to-t from-[rgba(255,138,51,0.08)] to-[rgba(255,138,51,0)]"
          : ""
      }`}
      data-name="Tab"
    >
      <div className="relative size-[24px] shrink-0">
        <div
          className="absolute inset-[-70.83%_-37.5%_0_-37.5%]"
          style={maskCube}
          data-name="Vector"
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            alt=""
            className="absolute inset-0 block size-full max-w-none"
            src="/assets/menu/tab-special-art.svg"
          />
        </div>
        <div className="absolute contents inset-[-75%_-37.5%_0_-37.5%]" data-name="Dot">
          <div
            className="absolute contents inset-[-69.53%_-32.03%_5.47%_-32.03%]"
            data-name="Upm"
          >
            <div
              className="absolute inset-[-69.53%_-32.03%_5.47%_-32.03%] overflow-clip rounded-[9.188px]"
              style={maskGrid}
              data-name="FrameContainer"
            >
              <div
                className="absolute left-1/2 top-1/2 grid size-[42px] -translate-x-1/2 -translate-y-1/2 gap-x-[1.3125px] gap-y-[1.3125px]"
                style={{
                  gridTemplateColumns: "repeat(20, minmax(0, 1fr))",
                  gridTemplateRows: "repeat(20, minmax(0, 1fr))",
                }}
                data-name="Pattern"
              >
                {Array.from(PIXEL_GRID).map((ch, i) => (
                  <div
                    key={i}
                    className="relative size-[1.313px] shrink-0 bg-white"
                    style={
                      PIXEL_OPACITY[ch] < 1
                        ? { opacity: PIXEL_OPACITY[ch] }
                        : undefined
                    }
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
      <p className="whitespace-nowrap text-center text-[10px] font-medium leading-[16px] text-rd-text-default">
        Brick®World
      </p>
      {active && (
        <div className="absolute bottom-0 left-1/2 contents -translate-x-1/2" data-name="Group">
          <div
            className="absolute bottom-0 left-1/2 h-[4px] w-[32px] -translate-x-1/2 bg-rd-orange-strong blur-[10px]"
            data-name="Light"
          />
          <div
            className="absolute bottom-0 left-1/2 h-[2px] w-[20px] -translate-x-1/2 rounded-tl-[12px] rounded-tr-[12px] bg-rd-orange-strong"
            data-name="Light"
          />
        </div>
      )}
    </a>
  );
}

export function TabBar({ active = "world" }: { active?: TabKey }) {
  return (
    <div
      className="fixed bottom-0 left-0 right-0 z-40 flex flex-col items-center md:hidden"
      data-name="Tab Bar"
      data-node-id="18339:253479"
    >
      <div className="flex w-full flex-col items-center">
        <div className="relative h-[19px] w-[161px]" data-name="Union">
          <div className="absolute inset-[0_22.36%_0_23.03%]">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              alt=""
              className="block size-full max-w-none"
              src="/assets/menu/tabbar-union.svg"
            />
          </div>
        </div>
        <div
          className="relative flex w-full items-end justify-center"
          data-name="Tab Bar"
        >
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 bg-rd-bg-default backdrop-blur-[8px]"
          />
          <TabDefault
            label="О нас"
            icon="/assets/menu/tab-about.svg"
            href="#about"
            active={active === "about"}
          />
          <TabDefault
            label="Портфолио"
            icon="/assets/menu/tab-portfolio.svg"
            iconInset="12.5%"
            href="#works"
            active={active === "portfolio"}
          />
          <TabSpecial href="#world" active={active === "world"} />
          <TabDefault
            label="Вход"
            icon="/assets/menu/tab-login.svg"
            iconInset="8.33% 8.33% 8.33% 4.17%"
            href="#login"
            active={active === "login"}
          />
          <TabDefault
            label="Связаться"
            icon="/assets/menu/tab-contact.svg"
            iconInset="20.15% 15.2% 12.35% 3.35%"
            href="#contact"
            active={active === "contact"}
          />
          <div className="pointer-events-none absolute inset-0 rounded-[inherit] shadow-[inset_0px_-1px_0px_0px_var(--rd-border-default),inset_0px_1px_0px_0px_var(--rd-border-default)]" />
        </div>
      </div>
    </div>
  );
}
