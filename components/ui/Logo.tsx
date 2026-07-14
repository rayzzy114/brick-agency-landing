// Figma: node-id=17003:82962 (Logo, Type=Full)
import { PixelGridMasked } from "./PixelGrid";

export function LogoIcon({ className }: { className?: string }) {
  return (
    <div
      className={`relative size-[32px] shrink-0 overflow-clip rounded-[8px] border border-solid border-[rgba(255,255,255,0.5)] bg-gradient-to-b from-[var(--rd-logo-grad-from)] to-[var(--rd-logo-grad-to)] ${className ?? ""}`}
      data-node-id="18328:104449"
    >
      <PixelGridMasked />
      <div className="absolute left-[3.69px] top-[5.63px] h-[18.75px] w-[22.625px]">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          alt=""
          className="absolute inset-0 block size-full max-w-none"
          src="/assets/logo/icon-vector.svg"
        />
      </div>
    </div>
  );
}

export function Logo({
  variant = "full",
  className,
}: {
  variant?: "full" | "icon";
  className?: string;
}) {
  if (variant === "icon") return <LogoIcon className={className} />;

  return (
    <div
      className={`relative flex items-center gap-[8px] ${className ?? ""}`}
      data-node-id="17003:82962"
    >
      <LogoIcon />
      <div className="relative h-[22px] w-[134px] shrink-0">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          alt="Brick Agency"
          className="absolute inset-0 block size-full max-w-none"
          src="/assets/logo/title.svg"
        />
      </div>
    </div>
  );
}
