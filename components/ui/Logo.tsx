// Figma: node-id=17003:82962 (Logo, Type=Full); куб — цельный SVG (logo-brick.svg,
// прод-ассет brickworld.io: градиент + пиксель-паттерн + глиф + рамка в одном файле)

export function LogoIcon({ className }: { className?: string }) {
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img loading="lazy" decoding="async"
      alt=""
      className={`block shrink-0 ${className ?? "size-[32px]"}`}
      src="/assets/icons/solid/logo-brick.svg"
      data-node-id="18328:104449"
    />
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
        <img loading="lazy" decoding="async"
          alt="Brick Agency"
          className="absolute inset-0 block size-full max-w-none"
          src="/assets/logo/title.svg"
        />
      </div>
    </div>
  );
}
