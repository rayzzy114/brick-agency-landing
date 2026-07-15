// Figma: node-id=18327:86059 (Card: Default 18327:86060 / Hover 18327:86073)

export function Card({
  image,
  title,
  description,
  tags,
  className,
}: {
  image: string;
  title: string;
  description: string;
  tags: string[];
  className?: string;
}) {
  return (
    <div
      className={`group relative flex w-[350px] flex-col items-start gap-[8px] rounded-[24px] p-[8px] ${className ?? ""}`}
      data-node-id="18327:86060"
    >
      {/* bg: flat by default, lime-tinted gradient on hover (Figma Hover variant) */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 rounded-[24px] bg-rd-bg-muted"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 rounded-[24px] bg-gradient-to-b from-[var(--rd-card-hover-grad-from)] to-[var(--rd-bg-muted)] opacity-0 transition-opacity duration-300 group-hover:opacity-100"
      />
      <div className="relative aspect-[160/90] w-full shrink-0 rounded-[16px]">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          alt={title}
          className="pointer-events-none absolute inset-0 size-full max-w-none rounded-[16px] object-cover"
          src={image}
        />
      </div>
      <div className="relative flex w-full shrink-0 flex-col items-start gap-[16px] overflow-clip p-[16px]">
        <div className="relative flex w-full shrink-0 flex-col items-start gap-[8px] [word-break:break-word]">
          <p className="w-full text-rd-md font-semibold text-rd-text-default">
            {title}
          </p>
          <p className="w-full text-rd-sm font-normal text-rd-text-subtle">
            {description}
          </p>
        </div>
        <div className="relative flex shrink-0 items-center gap-[4px]">
          {/* Один чип с фиксированной геометрией (default-вариант 18329:362401);
              по hover карточки меняются ТОЛЬКО цвета (bg → rgba(255,255,255,0.12),
              текст → #f3f3f3) — раньше hover подменял чип другим (иные паддинги/
              радиус/шрифт) и чипы «дёргались» */}
          {tags.map((tag) => (
            <span
              key={tag}
              className="flex shrink-0 items-center justify-center overflow-clip rounded-[6px] bg-rd-bg-badge p-[4px] shadow-[inset_0_0_0_1px_var(--rd-border-default)] backdrop-blur-[2px] transition-colors duration-200 group-hover:bg-[var(--rd-chip-bg)]"
            >
              <span className="flex items-center px-[4px]">
                <span className="whitespace-nowrap text-rd-xs font-medium text-rd-text-subtle transition-colors duration-200 [word-break:break-word] group-hover:text-rd-text-primary">
                  {tag}
                </span>
              </span>
            </span>
          ))}
        </div>
      </div>
      {/* stroke inside (как в Figma) + карточная тень одним box-shadow — border снаружи раздувал 375 → 377 */}
      <div className="pointer-events-none absolute inset-0 rounded-[inherit] [box-shadow:inset_0_0_0_1px_var(--rd-border-default),var(--rd-shadow-card)]" />
    </div>
  );
}
