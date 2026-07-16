// Цельные SVG-иконки проектов Brick®World (не «частями» — прод-ассеты brickworld.io,
// идентичные Figma: фон-градиент + пиксель-паттерн + глиф + рамка в одном файле).
type BwProject = "world" | "ceh" | "market" | "tools";

export function BrickWorldIcon({
  project,
  className,
}: {
  project: BwProject;
  className?: string;
}) {
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img loading="lazy" decoding="async"
      alt=""
      className={`block shrink-0 ${className ?? "size-[32px]"}`}
      src={`/assets/icons/solid/${project}-32.svg`}
      data-name={`BrickWorldIcon/${project}`}
    />
  );
}
