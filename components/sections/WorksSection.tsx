// Figma: Frame 18329:361939 (desktop 1440x958) / 18337:196917 (mobile 390x1309) — works/portfolio grid
"use client";

import { useState } from "react";
import { Card } from "@/components/ui/Card";
import { Reveal } from "@/components/motion/Reveal";

const TABS = [
  "[WEB] // [UI/UX]",
  "[Motion & 3D]",
  "[Banners]",
  "[Gambling]",
  "[Logos]",
];

const WORKS = [
  1, 2, 3, 4, 5, 6,
].map(() => ({
  image: "/assets/sections/work-futurix.png",
  title: "FuturiX Solutions Website",
  description:
    "A fully composable atomic design overhaul that streamlined workflows, reduced friction, ",
  tags: ["Web", "Motion"],
}));

export function WorksSection() {
  const [activeTab, setActiveTab] = useState(0);

  return (
    <section
      className="relative flex w-full flex-col items-center px-[16px] pb-[40px] pt-[20px] md:px-[24px] md:pb-[80px] md:pt-[40px]"
      id="works"
    >
      <Reveal className="flex w-full max-w-[1200px] flex-col" y={32}>
      <div className="flex w-full max-w-[1200px] flex-col items-center gap-[24px]">
        {/* UpString: tabs + «Посмотреть все работы» */}
        <div className="flex w-full flex-col items-start gap-[16px] md:flex-row md:justify-between md:gap-0">
          {/* overflow-x-clip: в Figma ряд табов шире 390 и клипается краем фрейма */}
          <div className="flex w-full items-center justify-center gap-[8px] overflow-x-clip md:w-auto md:justify-start md:overflow-visible">
            {TABS.map((tab, i) => {
              const active = i === activeTab;
              return (
                <button
                  key={tab}
                  type="button"
                  onClick={() => setActiveTab(i)}
                  className={`relative flex shrink-0 items-center justify-center gap-[4px] overflow-clip rounded-[8px] border border-solid border-rd-border-default p-[10px] transition-colors duration-200 ${
                    active ? "" : "bg-rd-bg-state-ghost hover:bg-rd-bg-state-ghost-hover"
                  }`}
                >
                  {active && (
                    <span
                      aria-hidden
                      className="pointer-events-none absolute inset-0 rounded-[8px] bg-rd-bg-state-secondary"
                    />
                  )}
                  <span className="relative flex items-center justify-center px-[2px]">
                    <span
                      className={`whitespace-nowrap text-rd-sm font-medium transition-colors duration-200 [word-break:break-word] ${
                        active ? "text-rd-text-default" : "text-rd-text-muted"
                      }`}
                    >
                      {tab}
                    </span>
                  </span>
                  {active && (
                    <span className="pointer-events-none absolute inset-0 rounded-[inherit] shadow-rd-component" />
                  )}
                </button>
              );
            })}
          </div>
          {/* hover (кит 34:852 Soft/Hover): bg → bg/state/soft-hover */}
          <button
            type="button"
            className="relative flex w-full items-center justify-center gap-[6px] overflow-clip rounded-[6px] bg-rd-bg-state-soft px-[14px] py-[10px] transition-colors duration-200 hover:bg-rd-bg-state-soft-hover md:w-auto"
          >
            <span className="relative flex items-center justify-center px-[2px]">
              <span className="whitespace-nowrap text-rd-sm font-medium text-rd-text-subtle [word-break:break-word]">
                Посмотреть все работы
              </span>
            </span>
            {/* кит Icons 28:27: arrow-right-up (Fill, 24px frame), белый 50% */}
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              alt=""
              className="relative block size-[18px] shrink-0"
              src="/assets/icons/kit/arrow-right-up-fill.svg"
            />
          </button>
        </div>

        {/* Cards grid: 6 on desktop (3x2, 384px), 3 on mobile (full-width) */}
        <div className="flex w-full flex-wrap content-start items-start gap-[24px]">
          {WORKS.map((work, i) => (
            <Card
              key={i}
              image={work.image}
              title={work.title}
              description={work.description}
              tags={work.tags}
              className={`!w-full md:!w-[384px] ${i >= 3 ? "hidden md:flex" : ""}`}
            />
          ))}
        </div>
      </div>
      </Reveal>
    </section>
  );
}
