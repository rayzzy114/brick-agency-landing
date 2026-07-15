"use client";

// Игровая зона футера: счётчик «ОЧКОВ:/Рекорд:» из макета (FooterCounter) +
// канвас-игра «Башня» (BrickTowerGame — порт эталонного Game.html заказчика).
// Рекорд живёт в localStorage ("brick-footer-record") и синхронизируется
// между инстансами (desktop/mobile) событиями storage/RECORD_EVENT.
import { useState, useSyncExternalStore } from "react";
import { motion } from "motion/react";
import { useAnimDisabled } from "@/components/motion/MotionProvider";
import {
  BrickTowerGame,
  readRecord,
  subscribeRecord,
  useTowerHintOff,
} from "./BrickTowerGame";

/* Зона игры поверх запечённого арта (бокс большого SmokeStack). */
const GEO = {
  desktop: { zone: "left-[214px] top-[-13px] h-[309px] w-[433px]" },
  mobile: { zone: "left-[-37.67px] top-[368.86px] h-[302.068px] w-[446.666px]" },
} as const;

export function FooterCounter({
  score,
  record,
}: {
  score: number;
  record: number;
}) {
  const disabled = useAnimDisabled();
  return (
    <div
      className="relative flex flex-col items-start not-italic [word-break:break-word]"
      data-name="Footer/Counter"
    >
      <p className="w-[min-content] min-w-full text-rd-sm font-medium text-white">
        ОЧКОВ:
      </p>
      {/* key={score}: каждое изменение перемонтирует и даёт scale-bounce pop */}
      <motion.p
        key={score}
        initial={disabled || score === 0 ? false : { scale: 1.45 }}
        animate={{ scale: 1 }}
        transition={
          disabled
            ? { duration: 0 }
            : { type: "spring", stiffness: 430, damping: 15, mass: 0.7 }
        }
        style={{ transformOrigin: "0% 60%" }}
        className="w-[min-content] min-w-full bg-gradient-to-t from-rd-lime to-rd-lime-strong bg-clip-text text-rd-2xl font-bold leading-6 text-transparent"
      >
        {score}
      </motion.p>
      <div className="flex items-start gap-[4px] whitespace-nowrap text-rd-sm">
        <p className="font-normal text-rd-text-muted">Рекорд:</p>
        <p className="font-medium text-rd-text-subtle">{record}</p>
      </div>
    </div>
  );
}

/** Подсказка из макета; как .hint в эталоне — прячется после первого
    броска и возвращается при рестарте (общий стор игры). */
export function ReleaseHint() {
  const off = useTowerHintOff();
  return (
    <p
      className={`w-[164px] text-rd-xs font-normal text-rd-text-hint transition-opacity duration-[450ms] [word-break:break-word] ${
        off ? "opacity-0" : ""
      }`}
    >
      *нажмите, чтобы отпустить
    </p>
  );
}

export function FooterGameBlock({ variant }: { variant: "desktop" | "mobile" }) {
  const [score, setScore] = useState(0);
  const record = useSyncExternalStore(subscribeRecord, readRecord, () => 0);
  return (
    <>
      <FooterCounter score={score} record={Math.max(record, score)} />
      <BrickTowerGame
        className={`absolute z-10 ${GEO[variant].zone}`}
        onScoreChange={setScore}
      />
    </>
  );
}
