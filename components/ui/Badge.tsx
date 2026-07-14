// Figma: node-id=17003:83348 (Landing Badge)

export function LandingBadge({
  title = "Brick®World",
  label = "Маркет для дизайнеров",
  tailIcon = "/assets/icons/tail-icon.svg",
  tailIconInset = "34.26% 23.48% 33.33% 23.48%",
  className,
}: {
  title?: string;
  label?: string;
  /** 16px tail icon asset (hero uses /assets/hero/badge-arrow.svg with its own inset) */
  tailIcon?: string;
  tailIconInset?: string;
  className?: string;
}) {
  return (
    <div
      className={`relative flex h-[32px] items-center justify-center gap-[6px] rounded-full px-[14px] py-[4px] ${className ?? ""}`}
      data-node-id="17003:83348"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 rounded-full bg-rd-bg-badge"
      />
      <p className="relative shrink-0 whitespace-nowrap text-center text-rd-sm font-medium text-rd-text-default">
        {title}
      </p>
      <div className="relative h-[16px] w-0 shrink-0">
        <div className="absolute inset-y-0 -inset-x-[0.5px]">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            alt=""
            className="block size-full max-w-none"
            src="/assets/icons/badge-separator.svg"
          />
        </div>
      </div>
      <p className="relative shrink-0 whitespace-nowrap text-center text-rd-sm font-medium text-rd-text-default">
        {label}
      </p>
      <div className="relative size-[16px] shrink-0 overflow-clip">
        <div className="absolute" style={{ inset: tailIconInset }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            alt=""
            className="absolute inset-0 block size-full max-w-none"
            src={tailIcon}
          />
        </div>
      </div>
      <div className="pointer-events-none absolute inset-0 rounded-[inherit] shadow-rd-component" />
    </div>
  );
}
