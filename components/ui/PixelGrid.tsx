/* Shared pixel-art dot pattern used inside the logo cube and BrickWorldIcon cubes.
   Row-major 20x20; a=20% b=40% c=70% d=100% white — transcribed 1:1 from Figma. */
const GRID =
  "bdbbadbdbbbdbbadbdbbbbaabbbbbcbbaabbbbbcdcbbdbbbaddcbbdbbbadabbacadbbbabbacadbbbbdbdbbbbabbdbdbbbbabbaabdaddbbbaabdaddbbbbabbbaababbabbbaabaabbbbbbbbbabbbbbbbbbbcabdabbccbcabdabbccbbabbbbbcabbabbbbbcabdbbadbdbbbdbbadbdbbbbaabbbbbcbbaabbbbbcdcbbdbbbaddcbbdbbbadabbacadbbbabbacadbbbbdbdbbbbabbdbdbbbbabbaabdaddbbbaabdaddbbbbabbbaababbabbbaabaabbbbbbbbbabbbbbbbbbbcabdabbccbcabdabbccbbabbbbbcabbabbbbbca";

const OPACITY: Record<string, number> = { a: 0.2, b: 0.4, c: 0.7, d: 1 };

/** Raw pattern data for custom-scaled grids (e.g. TabBar special tab 42px grid). */
export { GRID as PIXEL_GRID, OPACITY as PIXEL_OPACITY };

/** mode "fit": 1px cells + 1px gaps centered at (50%∓0.5px) — logo cube.
    mode "fill": 20x20 1fr grid stretched to 32px — some BrickWorldIcon variants. */
export function PixelGrid({ mode = "fit" }: { mode?: "fit" | "fill" }) {
  return (
    <div
      className={
        mode === "fill"
          ? "absolute left-1/2 top-1/2 grid size-[32px] -translate-x-1/2 -translate-y-1/2 gap-x-px gap-y-px"
          : "absolute left-[calc(50%-0.5px)] top-[calc(50%+0.5px)] inline-grid -translate-x-1/2 -translate-y-1/2 gap-x-px gap-y-px"
      }
      style={
        mode === "fill"
          ? {
              gridTemplateColumns: "repeat(20, minmax(0, 1fr))",
              gridTemplateRows: "repeat(20, minmax(0, 1fr))",
            }
          : {
              gridTemplateColumns: "repeat(20, fit-content(100%))",
              gridTemplateRows: "repeat(20, fit-content(100%))",
            }
      }
    >
      {Array.from(GRID).map((ch, i) => (
        <div
          key={i}
          className={mode === "fill" ? "bg-white" : "size-px shrink-0 bg-white"}
          style={OPACITY[ch] < 1 ? { opacity: OPACITY[ch] } : undefined}
        />
      ))}
    </div>
  );
}

/** 30px inner rounded viewport with the Figma alpha mask, wrapping the grid. */
export function PixelGridMasked({ mode = "fit" }: { mode?: "fit" | "fill" }) {
  return (
    <div
      className="absolute left-px top-px size-[30px] overflow-clip rounded-[7px]"
      style={{
        maskImage: 'url("/assets/logo/icon-mask.svg")',
        maskSize: "32px 32px",
        maskPosition: "-1px -1px",
        maskRepeat: "no-repeat",
        WebkitMaskImage: 'url("/assets/logo/icon-mask.svg")',
        WebkitMaskSize: "32px 32px",
        WebkitMaskPosition: "-1px -1px",
        WebkitMaskRepeat: "no-repeat",
      }}
    >
      <PixelGrid mode={mode} />
    </div>
  );
}
