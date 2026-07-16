// Figma: header Action buttons — «Войти» (secondary) / «Связаться» (primary lime)

export function Button({
  children,
  variant = "secondary",
  size = "sm",
  leadIcon,
  href,
  onClick,
  className,
}: {
  children: React.ReactNode;
  variant?: "primary" | "secondary";
  /** sm = header (px-10 py-6, 16px icon, gap-4); lg = hero CTA (px-14 py-10, 18px icon, gap-6) */
  size?: "sm" | "lg";
  /** asset path for the lead icon (цельная кит-иконка, 24px frame) */
  leadIcon?: string;
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
      className={`group relative flex transform-gpu items-center justify-center overflow-clip rounded-[6px] ${
        isLg ? "gap-[6px] px-[14px] py-[10px]" : "gap-[4px] px-[10px] py-[6px]"
      } ${className ?? ""}`}
    >
      {/* Hover — Figma Button kit 34:852: Primary State=Hover = флэт bg/state/primary-hover
          (#c7ff47) вместо градиента; Secondary State=Hover = bg/state/secondary-hover */}
      <span
        aria-hidden
        className={`pointer-events-none absolute inset-0 rounded-[6px] ${
          isPrimary
            ? "bg-gradient-to-t from-[var(--rd-lime)] to-[var(--rd-lime-strong)]"
            : "bg-rd-bg-state-secondary transition-colors duration-200 group-hover:bg-rd-bg-state-secondary-hover"
        }`}
      />
      {isPrimary && (
        <span
          aria-hidden
          className="pointer-events-none absolute inset-0 rounded-[6px] bg-rd-bg-state-primary-hover opacity-0 transition-opacity duration-200 group-hover:opacity-100"
        />
      )}
      {leadIcon && (
        // eslint-disable-next-line @next/next/no-img-element
        <img loading="lazy" decoding="async"
          alt=""
          className={`relative block shrink-0 ${isLg ? "size-[18px]" : "size-[16px]"}`}
          src={leadIcon}
        />
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
