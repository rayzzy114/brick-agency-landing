// Figma: node-id=18371:161072 (ghost icon Button, 32px — mobile burger)

export function IconButton({
  icon = "/assets/icons/solid/lang.svg",
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
      {/* цельный SVG 20px (прод-ассет brickworld.io), без inset-сборки */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img alt="" className="block size-[20px] shrink-0" src={icon} />
    </button>
  );
}
