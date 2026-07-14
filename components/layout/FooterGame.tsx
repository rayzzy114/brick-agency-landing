"use client";

// Мини-игра футера: подвес (верёвка+кирпич, вырезаны из smoke.png) качается;
// по клику кирпич МГНОВЕННО отпускается из текущей точки маятника, летит с
// горизонтальным дрейфом (release timing = скилл), приземляется со squash &
// stretch, impact-волной по стеку и искрами; промах у края сбрасывает счёт.
// Новый кирпич подаётся с крюка с elastic-пружиной. Рекорд в localStorage.
import { useEffect, useRef, useState, useSyncExternalStore } from "react";
import {
  AnimatePresence,
  motion,
  useAnimate,
  useAnimationFrame,
  useMotionValue,
} from "motion/react";
import { useAnimDisabled } from "@/components/motion/MotionProvider";

const STORAGE_KEY = "brick-footer-record";
const RECORD_EVENT = "brick-record-change";
/** максимум слоёв до сброса кучи */
const MAX_STACK = 5;

/* ---- game-feel тюнинг ---- */
/** амплитуда маятника, градусы */
const SWING_AMP = 5;
/** период полного колебания, сек */
const SWING_PERIOD = 1.7;
const SWING_W = (Math.PI * 2) / SWING_PERIOD;
const DEG = Math.PI / 180;
/** усиление горизонтального дрейфа от угловой скорости в момент отпускания */
const DRIFT_GAIN = 1.6;
/** новый кирпич подаётся с крюка через столько мс после отпускания */
const RESPAWN_MS = 240;
/** хвост полёта при промахе (кувырок за край), сек */
const MISS_TAIL = 0.38;

/* Геометрия спрайтов (PNG 792x677, регион x235..512: rope y38..228, brick y228..336),
   пересчитанная в координаты зоны (зона = бокс большого SmokeStack). */
const GEO = {
  desktop: {
    zone: "left-[214px] top-[-13px] h-[309px] w-[433px]",
    scale: 0.5304,
    spriteLeft: 133.6,
    ropeTop: -41.7,
    plateTop: 262.7,
  },
  mobile: {
    zone: "left-[-37.67px] top-[368.86px] h-[302.068px] w-[446.666px]",
    scale: 0.5471,
    spriteLeft: 137.8,
    ropeTop: -39.7,
    plateTop: 274.3,
  },
} as const;

function subscribeRecord(cb: () => void) {
  window.addEventListener("storage", cb);
  window.addEventListener(RECORD_EVENT, cb);
  return () => {
    window.removeEventListener("storage", cb);
    window.removeEventListener(RECORD_EVENT, cb);
  };
}

function readRecord() {
  return Number(localStorage.getItem(STORAGE_KEY) || "0");
}

function useBrickGame() {
  const [score, setScore] = useState(0);
  const scoreRef = useRef(0);
  const record = useSyncExternalStore(subscribeRecord, readRecord, () => 0);

  const addPoint = () => {
    const next = ++scoreRef.current;
    setScore(next);
    if (next > readRecord()) {
      localStorage.setItem(STORAGE_KEY, String(next));
      window.dispatchEvent(new Event(RECORD_EVENT));
    }
  };

  const resetScore = () => {
    scoreRef.current = 0;
    setScore(0);
  };

  return { score, record: Math.max(record, score), addPoint, resetScore };
}

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

type Flight = {
  id: number;
  layer: number;
  x0: number;
  xLand: number;
  rot0: number;
  rotMid: number;
  rotEnd: number;
  fy: number;
  dur: number;
  miss: boolean;
};

type Stacked = { id: number; layer: number; off: number };

type SparkPart = { dx: number; dy: number; s: number; rot: number };
type Burst = { id: number; x: number; y: number; parts: SparkPart[] };

function makeSparkParts(dir: number): SparkPart[] {
  // 2 искры против направления удара, 2 по нему; лёгкий рандом в момент удара
  return [-1.1, -0.55, 0.6, 1.15].map((k) => ({
    dx: k * (14 + Math.random() * 12) + dir * 4,
    dy: -(9 + Math.random() * 15),
    s: 4 + Math.random() * 3,
    rot: (Math.random() - 0.5) * 300,
  }));
}

export function FooterGameBlock({ variant }: { variant: "desktop" | "mobile" }) {
  const disabled = useAnimDisabled();
  const { score, record, addPoint, resetScore } = useBrickGame();
  const [bricks, setBricks] = useState<Stacked[]>([]);
  const [flight, setFlight] = useState<Flight | null>(null);
  const [hangReady, setHangReady] = useState(true);
  const [hangKey, setHangKey] = useState(0);
  const [burst, setBurst] = useState<Burst | null>(null);
  const [scope, animateFn] = useAnimate();

  const nextId = useRef(1);
  const timeRef = useRef(0); // текущее время rAF маятника, мс
  const timersRef = useRef<Set<ReturnType<typeof setTimeout>>>(new Set());
  const hangReadyRef = useRef(true);
  const flightRef = useRef<Flight | null>(null);
  const stackLenRef = useRef(0);
  const queueRef = useRef(0);
  const releaseRef = useRef<() => void>(() => {});

  const g = GEO[variant];
  const spriteW = 277 * g.scale; // ширина региона 277px в PNG
  const ropeH = 190 * g.scale;
  const brickH = 108 * g.scale;
  const brickTop = g.ropeTop + ropeH; // верх кирпича на верёвке
  const stackStep = 57 * g.scale; // шаг укладки (тело кирпича без тени)
  const brickBodyH = 57 * g.scale; // низ тела кирпича (без тени) — origin для squash
  /** расстояние от точки крюка (pivot) до центра тела кирпича */
  const pivotLen = (190 + 45 - 22) * g.scale;
  /** допуск точности приземления: дальше — промах */
  const goodTol = 30 * g.scale;

  const floorY = (layer: number) =>
    g.plateTop - brickH - layer * stackStep + 6 * g.scale;

  /* маятник: rAF-синус в motion value, чтобы читать фазу в момент клика */
  const swing = useMotionValue(0);
  useAnimationFrame((t) => {
    if (disabled) return;
    timeRef.current = t;
    swing.set(SWING_AMP * Math.sin(SWING_W * (t / 1000)));
  });

  const schedule = (fn: () => void, ms: number) => {
    const id = setTimeout(() => {
      timersRef.current.delete(id);
      fn();
    }, ms);
    timersRef.current.add(id);
  };
  useEffect(() => {
    const timers = timersRef.current;
    return () => timers.forEach(clearTimeout);
  }, []);

  const land = (f: Flight) => {
    setFlight(null);
    flightRef.current = null;
    if (f.miss) {
      resetScore();
      // жёсткая тряска-фейл
      animateFn(
        "[data-shake]",
        { x: [0, -2.2, 1.7, -0.9, 0], y: [0, 1.5, -1.1, 0.5, 0] },
        { duration: 0.34, ease: "easeOut" },
      );
    } else {
      stackLenRef.current = f.layer + 1;
      setBricks((prev) => [
        ...prev,
        { id: f.id, layer: f.layer, off: f.xLand },
      ]);
      addPoint();
      // искры в точке удара
      setBurst({
        id: f.id,
        x: g.spriteLeft + spriteW / 2 + f.xLand,
        y: f.fy + brickBodyH,
        parts: makeSparkParts(f.xLand >= 0 ? 1 : -1),
      });
      // impact-волна вниз по стеку: нижние проседают и пружинят, с затуханием
      const root = scope.current as HTMLDivElement | null;
      const nodes = root
        ? Array.from(root.querySelectorAll<HTMLElement>("[data-brick-layer]"))
        : [];
      nodes.forEach((el) => {
        const l = Number(el.dataset.brickLayer);
        if (l >= f.layer) return;
        const d = f.layer - l;
        const push = 7 * g.scale * Math.pow(0.62, d - 1);
        animateFn(
          el,
          { y: [0, push, -push * 0.3, 0] },
          { duration: 0.34, delay: 0.03 * (d - 1), ease: "easeOut" },
        );
      });
      // микро-тряска всей сцены
      animateFn(
        "[data-shake]",
        { y: [0, 1.6, -1.1, 0.4, 0], x: [0, -1, 0.7, -0.3, 0] },
        { duration: 0.3, ease: "easeOut" },
      );
    }
    // очередь быстрых кликов: следующий бросок сразу после посадки
    schedule(() => {
      if (
        queueRef.current > 0 &&
        hangReadyRef.current &&
        !flightRef.current
      ) {
        queueRef.current -= 1;
        releaseRef.current();
      }
    }, 90);
  };

  const doRelease = () => {
    if (!hangReadyRef.current || flightRef.current) return;
    // фаза маятника в момент отпускания → угол + угловая скорость
    const tNow = timeRef.current / 1000;
    const theta = SWING_AMP * Math.sin(SWING_W * tNow); // deg
    const omegaDeg = SWING_AMP * SWING_W * Math.cos(SWING_W * tNow); // deg/s
    const x0 = pivotLen * Math.sin(theta * DEG);
    const vx = omegaDeg * DEG * pivotLen; // px/s

    let layer = stackLenRef.current;
    if (layer >= MAX_STACK) {
      // куча полная: старая рассыпается, пока летит новый кирпич
      layer = 0;
      stackLenRef.current = 0;
      setBricks([]);
    }
    const fy = floorY(layer);
    const dist = Math.max(40, fy - brickTop);
    const dur = Math.min(
      0.5,
      Math.max(0.24, 0.44 * Math.sqrt(dist / (floorY(0) - brickTop))),
    );
    const xLand = x0 + vx * dur * DRIFT_GAIN;
    const miss = Math.abs(xLand) > goodTol;
    const dir = xLand >= 0 ? 1 : -1;
    const f: Flight = {
      id: nextId.current++,
      layer,
      x0,
      xLand,
      rot0: theta,
      rotMid: theta + omegaDeg * 0.12, // доворот по инерции в полёте
      rotEnd: miss ? dir * 72 : 0,
      fy,
      dur,
      miss,
    };
    setFlight(f);
    flightRef.current = f;
    hangReadyRef.current = false;
    setHangReady(false);

    // верёвка: recoil вверх с затухающим колебанием (груз ушёл)
    animateFn(
      "[data-rope]",
      { scaleY: [1, 0.86, 1.07, 0.97, 1] },
      { duration: 0.7, times: [0, 0.18, 0.45, 0.72, 1], ease: "easeOut" },
    );

    // подача нового кирпича с крюка
    schedule(() => {
      setHangKey((k) => k + 1);
      setHangReady(true);
      hangReadyRef.current = true;
    }, RESPAWN_MS);

    // фиксация посадки (таймер надёжнее onAnimationComplete при пер-свойственных transition)
    schedule(() => land(f), (miss ? dur + MISS_TAIL : dur) * 1000 + 50);
  };
  useEffect(() => {
    releaseRef.current = doRelease;
  });

  const onTap = () => {
    if (disabled) {
      // kill-switch: мгновенный статичный результат, ноль анимаций и таймеров
      const id = nextId.current++;
      const reset = stackLenRef.current >= MAX_STACK;
      const layer = reset ? 0 : stackLenRef.current;
      stackLenRef.current = layer + 1;
      setBricks((prev) =>
        reset ? [{ id, layer: 0, off: 0 }] : [...prev, { id, layer, off: 0 }],
      );
      addPoint();
      return;
    }
    if (!hangReadyRef.current || flightRef.current) {
      queueRef.current = Math.min(queueRef.current + 1, 1);
      return;
    }
    doRelease();
  };

  const missDir = flight && flight.xLand >= 0 ? 1 : -1;

  return (
    <>
      <FooterCounter score={score} record={record} />
      <div
        ref={scope}
        className={`absolute z-10 cursor-pointer select-none ${g.zone}`}
        onClick={onTap}
        title="*нажмите, чтобы отпустить"
      >
        {/* обёртка для микро-тряски сцены при ударе */}
        <div data-shake className="absolute inset-0">
          {/* подвес: качается вокруг крюка (pivot ~ центр верёвки, y крюка) */}
          <motion.div
            className="absolute"
            style={{
              left: g.spriteLeft,
              top: g.ropeTop,
              width: spriteW,
              transformOrigin: `${(140.5 / 277) * 100}% ${22 * g.scale}px`,
              rotate: swing,
            }}
          >
            <motion.div data-rope style={{ transformOrigin: "50% 0%" }}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                alt=""
                className="block max-w-none"
                style={{ width: spriteW, height: ropeH }}
                src="/assets/footer/sprite-rope.png"
              />
            </motion.div>
            {/* висящий кирпич: исчезает мгновенно, новый подаётся elastic-пружиной */}
            <div style={{ height: brickH }}>
              {hangReady && (
                <motion.div
                  key={hangKey}
                  initial={
                    disabled || hangKey === 0
                      ? false
                      : { y: -ropeH * 0.55, scaleY: 0.55, scaleX: 0.85 }
                  }
                  animate={{ y: 0, scaleY: 1, scaleX: 1 }}
                  transition={
                    disabled
                      ? { duration: 0 }
                      : {
                          type: "spring",
                          stiffness: 340,
                          damping: 13,
                          mass: 0.9,
                        }
                  }
                  style={{ transformOrigin: "50% 0%" }}
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    alt=""
                    className="block max-w-none"
                    style={{ width: spriteW, height: brickH }}
                    src="/assets/footer/sprite-brick.png"
                  />
                </motion.div>
              )}
            </div>
          </motion.div>

          {/* летящий кирпич: старт из текущей позиции/угла маятника */}
          {flight && !disabled && (
            <motion.div
              key={flight.id}
              className="absolute"
              style={{
                left: g.spriteLeft,
                top: 0,
                width: spriteW,
                transformOrigin: `50% ${45 * g.scale}px`,
              }}
              initial={{
                x: flight.x0,
                y: brickTop,
                rotate: flight.rot0,
                opacity: 1,
              }}
              animate={
                flight.miss
                  ? {
                      x: [flight.x0, flight.xLand, flight.xLand + missDir * 26],
                      y: [brickTop, flight.fy, flight.fy + 80],
                      rotate: [flight.rot0, flight.rotMid, flight.rotEnd],
                      opacity: [1, 1, 0],
                    }
                  : {
                      x: flight.xLand,
                      y: flight.fy,
                      rotate: [flight.rot0, flight.rotMid, 0],
                    }
              }
              transition={
                flight.miss
                  ? {
                      duration: flight.dur + MISS_TAIL,
                      times: [0, flight.dur / (flight.dur + MISS_TAIL), 1],
                      ease: ["easeIn", "easeIn"],
                      opacity: {
                        duration: flight.dur + MISS_TAIL,
                        times: [0, 0.62, 1],
                        ease: "linear",
                      },
                    }
                  : {
                      y: {
                        duration: flight.dur,
                        ease: [0.45, 0.02, 0.9, 0.6],
                      },
                      x: { duration: flight.dur, ease: "linear" },
                      rotate: {
                        duration: flight.dur,
                        times: [0, 0.5, 1],
                        ease: "easeInOut",
                      },
                    }
              }
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                alt=""
                className="block max-w-none"
                style={{ width: spriteW, height: brickH }}
                src="/assets/footer/sprite-brick.png"
              />
            </motion.div>
          )}

          {/* упавшие кирпичи: позиция статична (top/left), transform свободен
              под impact-волну; на маунте — squash & stretch с отскоком */}
          <AnimatePresence>
            {bricks.map((b) => (
              <motion.div
                key={b.id}
                data-brick-layer={b.layer}
                className="absolute"
                style={{
                  left: g.spriteLeft + b.off,
                  top: floorY(b.layer),
                  width: spriteW,
                }}
                exit={
                  disabled
                    ? { opacity: 0, transition: { duration: 0 } }
                    : {
                        opacity: 0,
                        scaleY: 0.7,
                        transition: { duration: 0.22, ease: "easeIn" },
                      }
                }
              >
                <motion.div
                  style={{ transformOrigin: `50% ${brickBodyH}px` }}
                  animate={
                    disabled
                      ? undefined
                      : {
                          scaleY: [1, 0.78, 1.09, 0.96, 1],
                          scaleX: [1, 1.16, 0.94, 1.02, 1],
                        }
                  }
                  transition={{
                    duration: 0.4,
                    times: [0, 0.22, 0.55, 0.8, 1],
                    ease: "easeOut",
                  }}
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    alt=""
                    className="block max-w-none"
                    style={{ width: spriteW, height: brickH }}
                    src="/assets/footer/sprite-brick.png"
                  />
                </motion.div>
              </motion.div>
            ))}
          </AnimatePresence>

          {/* искры при ударе (лаймовые крошки-кирпичики) */}
          {burst && !disabled && (
            <div
              key={burst.id}
              className="pointer-events-none absolute"
              style={{ left: burst.x, top: burst.y }}
            >
              {burst.parts.map((p, i) => (
                <motion.div
                  key={i}
                  className="absolute rounded-[1px] bg-rd-lime"
                  style={{
                    width: p.s,
                    height: p.s,
                    left: -p.s / 2,
                    top: -p.s / 2,
                  }}
                  initial={{ x: 0, y: 0, opacity: 1, rotate: 0, scale: 1 }}
                  animate={{
                    x: [0, p.dx * 0.8, p.dx],
                    y: [0, p.dy, p.dy + 16],
                    opacity: [1, 1, 0],
                    rotate: p.rot,
                    scale: 0.4,
                  }}
                  transition={{
                    duration: 0.55,
                    times: [0, 0.55, 1],
                    ease: "easeOut",
                  }}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  );
}
