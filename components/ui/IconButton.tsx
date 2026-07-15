// Figma: node-id=18371:161072 (ghost icon Button, 32px — mobile burger)

export function IconButton({
  icon = "/assets/icons/burger.svg",
  label,
  onClick,
  className,
}: {
  icon?: string;
  label: string;
  onClick?: () => void;
  className?: string;
}) {
  return (
    <button
      type="button"
      aria-label={label}
      onClick={onClick}
      className={`relative flex size-[32px] items-center justify-center overflow-clip rounded-[6px] bg-rd-bg-state-ghost transition-colors duration-200 hover:bg-rd-bg-state-ghost-hover ${className ?? ""}`}
      data-node-id="18371:161072"
    >
      <span className="relative size-[20px] shrink-0 overflow-clip">
        <span className="absolute inset-[8.33%_4.58%_12.5%_8.33%]">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            alt=""
            className="absolute inset-0 block size-full max-w-none"
            src={icon}
          />
        </span>
      </span>
    </button>
  );
}
