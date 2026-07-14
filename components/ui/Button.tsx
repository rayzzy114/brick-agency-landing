// Figma: header Action buttons — «Войти» (secondary) / «Связаться» (primary lime)

export function Button({
  children,
  variant = "secondary",
  size = "sm",
  leadIcon,
  leadIconInset = "20.15% 15.2% 12.35% 3.35%",
  href,
  onClick,
  className,
}: {
  children: React.ReactNode;
  variant?: "primary" | "secondary";
  /** sm = header (px-10 py-6, 16px icon, gap-4); lg = hero CTA (px-14 py-10, 18px icon, gap-6) */
  size?: "sm" | "lg";
  /** asset path for the lead icon */
  leadIcon?: string;
  leadIconInset?: string;
  href?: string;
  onClick?: () => void;
  className?: string;
}) {
  const Tag = href ? "a" : "button";
  const isPrimary = variant === "primary";
  const isLg = size === "lg";
  return (
    <Tag
      {...(href ? { href } : { type: "button" as const, onClick })}
      className={`relative flex transform-gpu items-center justify-center overflow-clip rounded-[6px] ${
        isLg ? "gap-[6px] px-[14px] py-[10px]" : "gap-[4px] px-[10px] py-[6px]"
      } ${className ?? ""}`}
    >
      <span
        aria-hidden
        className={`pointer-events-none absolute inset-0 rounded-[6px] ${
          isPrimary
            ? "bg-gradient-to-t from-[var(--rd-lime)] to-[var(--rd-lime-strong)]"
            : "bg-rd-bg-state-secondary"
        }`}
      />
      {leadIcon && (
        <span
          className={`relative shrink-0 overflow-clip ${isLg ? "size-[18px]" : "size-[16px]"}`}
        >
          <span className="absolute" style={{ inset: leadIconInset }}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              alt=""
              className="absolute inset-0 block size-full max-w-none"
              src={leadIcon}
            />
          </span>
        </span>
      )}
      <span className="relative flex items-center justify-center px-[2px]">
        <span
          className={`whitespace-nowrap text-rd-sm font-medium ${
            isPrimary
              ? "text-rd-text-dark [text-shadow:0px_0.5px_1px_rgba(0,0,0,0.15)]"
              : "text-rd-text-default"
          }`}
        >
          {children}
        </span>
      </span>
      <span
        className={`pointer-events-none absolute inset-0 rounded-[inherit] ${
          isPrimary ? "shadow-rd-button-primary" : "shadow-rd-component"
        }`}
      />
    </Tag>
  );
}
