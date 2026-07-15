// Figma: node-id=17003:82885 (Header Item: Default 17003:82880 / Hover 17003:82886 / Active 17003:82888)

function TailIcon() {
  return (
    // кит Icons 28:27: arrow-down-s (24px frame), белый 50% — рендерится в 16px
    // eslint-disable-next-line @next/next/no-img-element
    <img
      alt=""
      className="block size-[16px] shrink-0"
      src="/assets/icons/kit/arrow-down-s.svg"
    />
  );
}

export function HeaderItem({
  label,
  href = "#",
  active = false,
  leadIcon = false,
  tailIcon = true,
  className,
}: {
  label: string;
  href?: string;
  active?: boolean;
  leadIcon?: boolean;
  tailIcon?: boolean;
  className?: string;
}) {
  return (
    <a
      href={href}
      className={`group relative flex items-center justify-center gap-[4px] overflow-clip rounded-[6px] px-[10px] py-[6px] ${
        active ? "bg-rd-bg-state-soft" : "bg-rd-bg-state-ghost"
      } ${className ?? ""}`}
      data-node-id={active ? "17003:82888" : "17003:82880"}
    >
      {leadIcon && <TailIcon />}
      <span className="flex items-center justify-center px-[2px]">
        <span
          className={`whitespace-nowrap text-center text-rd-sm ${
            active
              ? "font-medium text-rd-text-default"
              : "font-normal text-rd-text-subtle transition-colors duration-150 group-hover:text-rd-text-default"
          }`}
        >
          {label}
        </span>
      </span>
      {tailIcon && <TailIcon />}
    </a>
  );
}
