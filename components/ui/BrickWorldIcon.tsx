// Figma: node-id=18328:268584 (BrickWorldIcon, 8 project variants)
import { CSSProperties } from "react";
import { PixelGridMasked } from "./PixelGrid";

type BwProject =
  | "tools"
  | "ceh"
  | "market"
  | "world"
  | "test"
  | "test2"
  | "project7"
  | "project8";

/* Per-variant values transcribed from Figma variants (get_design_context per symbol). */
const VARIANTS: Record<
  BwProject,
  {
    bg: CSSProperties;
    /** outer Vector inset (top right bottom left) */
    inset: string;
    /** inner img overflow inset */
    innerInset: string;
    gridMode: "fit" | "fill";
  }
> = {
  tools: {
    bg: { background: "#5cadff" },
    inset:
      "calc(19.43% - 0.61px) calc(16.34% - 0.67px) calc(18.07% - 0.64px) calc(21.16% - 0.58px)",
    innerInset: "0 -20% -40% -20%",
    gridMode: "fit",
  },
  ceh: {
    bg: { background: "linear-gradient(to bottom, #c7ff47, #87c200)" },
    inset: "calc(18.75% - 0.63px)",
    innerInset: "0 -21.05% -42.11% -21.05%",
    gridMode: "fit",
  },
  market: {
    bg: { background: "linear-gradient(to bottom, #dbdbdb, #afafaf)" },
    inset:
      "calc(18.75% - 0.63px) calc(18.75% - 0.63px) calc(21.88% - 0.56px) calc(21.88% - 0.56px)",
    innerInset: "0 -21.05% -42.11% -21.05%",
    gridMode: "fit",
  },
  world: {
    bg: { background: "linear-gradient(to bottom, #ffb247, #ff7700)" },
    inset:
      "calc(18.75% - 0.63px) calc(18.75% - 0.63px) calc(21.88% - 0.56px) calc(21.88% - 0.56px)",
    innerInset: "0 -21.05% -42.11% -21.05%",
    gridMode: "fit",
  },
  test: {
    bg: { background: "linear-gradient(to bottom, #ffb247, #ff7700)" },
    inset:
      "calc(18.75% - 0.63px) calc(18.75% - 0.63px) calc(21.88% - 0.56px) calc(21.88% - 0.56px)",
    innerInset: "0 -21.05% -42.11% -21.05%",
    gridMode: "fill",
  },
  test2: {
    bg: { background: "linear-gradient(to bottom, #d9adff, #8c20ff)" },
    inset:
      "calc(18.75% - 0.63px) calc(18.75% - 0.63px) calc(21.88% - 0.56px) calc(21.88% - 0.56px)",
    innerInset: "0 -21.05% -42.11% -21.05%",
    gridMode: "fit",
  },
  project7: {
    bg: { background: "linear-gradient(to bottom, #95d72d, #275b00)" },
    inset:
      "calc(18.75% - 0.63px) calc(18.75% - 0.63px) calc(21.88% - 0.56px) calc(21.88% - 0.56px)",
    innerInset: "0 -21.05% -42.11% -21.05%",
    gridMode: "fit",
  },
  project8: {
    bg: { background: "linear-gradient(to bottom, #95d72d, #275b00)" },
    inset:
      "calc(18.75% - 0.63px) calc(18.75% - 0.63px) calc(21.88% - 0.56px) calc(21.88% - 0.56px)",
    innerInset: "0 -21.05% -42.11% -21.05%",
    gridMode: "fit",
  },
};

export function BrickWorldIcon({
  project,
  className,
}: {
  project: BwProject;
  className?: string;
}) {
  const v = VARIANTS[project];
  return (
    <div
      className={`relative size-[32px] shrink-0 overflow-clip rounded-[8px] border border-solid border-[rgba(255,255,255,0.5)] ${className ?? ""}`}
      style={v.bg}
      data-name={`BrickWorldIcon/${project}`}
    >
      <PixelGridMasked mode={v.gridMode} />
      <div className="absolute" style={{ inset: v.inset }}>
        <div className="absolute" style={{ inset: v.innerInset }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            alt=""
            className="block size-full max-w-none"
            src={`/assets/icons/brick-world/${project}.svg`}
          />
        </div>
      </div>
    </div>
  );
}
