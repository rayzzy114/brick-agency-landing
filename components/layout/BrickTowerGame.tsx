"use client";

// Порт эталонной канвас-игры «Башня» (brick-footer-game.html) 1:1:
// маятниковая клешня (pivot сверху), release с velocity по фазе, G=2450,
// посадка по перекрытию (MIN_OV=12, PERFECT=6 → combo, ширина отрастает при
// идеале), свес отламывается в debris, камера едет вниз, промах → кувырок →
// game over + overlay с рестартом, floats/частицы/squash/shake, DPR-canvas,
// resize, пауза вне вьюпорта, prefers-reduced-motion. Числа и тайминги —
// из файла, не менять. HUD заменён на FooterCounter из макета (снаружи),
// сюда наружу отдаётся score через onScoreChange, best — в localStorage.
import { useEffect, useRef, useState, useSyncExternalStore } from "react";
import { useAnimDisabled } from "@/components/motion/MotionProvider";

export const STORAGE_KEY = "brick-footer-record";
export const RECORD_EVENT = "brick-record-change";

export function readRecord() {
  // localStorage бросает SecurityError при заблокированных cookies/приватных режимах
  try {
    return Number(localStorage.getItem(STORAGE_KEY) || "0");
  } catch {
    return 0;
  }
}

export function subscribeRecord(cb: () => void) {
  window.addEventListener("storage", cb);
  window.addEventListener(RECORD_EVENT, cb);
  return () => {
    window.removeEventListener("storage", cb);
    window.removeEventListener(RECORD_EVENT, cb);
  };
}

/* ── hint: общий стор (первый бросок прячет подсказку, рестарт возвращает),
      аналог .hint.off из файла — подписан ReleaseHint в FooterGame.tsx ── */
let hintOff = false;
const hintListeners = new Set<() => void>();
function setHintOff(v: boolean) {
  if (hintOff === v) return;
  hintOff = v;
  hintListeners.forEach((l) => l());
}
function subscribeHint(cb: () => void) {
  hintListeners.add(cb);
  return () => {
    hintListeners.delete(cb);
  };
}
export function useTowerHintOff() {
  return useSyncExternalStore(
    subscribeHint,
    () => hintOff,
    () => false,
  );
}

/* ── константы движка (из файла, НЕ менять) ── */
const FONT = "\"Suisse Int'l\",\"Inter\",-apple-system,\"Segoe UI\",sans-serif";
const G = 2450; // гравитация, px/s²
const MIN_OV = 12; // минимальное перекрытие, чтобы кирпич «встал»
const PERFECT = 6; // допуск идеального попадания, px

/* цвета из :root файла (canvas не умеет CSS-переменные) */
const LIME = "#b6f20a";
const LIME_SOFT = "#d7ff4a";
const INK = "#0c1400";
const TXT = "#f2f2f2";
const MUTED = "#a9a9a9";
const MUTED_2 = "#767676";

type Slab = { x: number; w: number; top: number };
type Debris = {
  x: number;
  y: number;
  w: number;
  vx: number;
  vy: number;
  rot: number;
  vr: number;
};
type Part = {
  x: number;
  y: number;
  vx: number;
  vy: number;
  rot: number;
  vr: number;
  life: number;
  size: number;
};
type FloatTxt = { x: number; y: number; txt: string; lime: boolean; life: number };
type OverInfo = { score: number; best: number; visible: boolean };

export function BrickTowerGame({
  className = "",
  onScoreChange,
}: {
  className?: string;
  onScoreChange: (score: number) => void;
}) {
  const disabled = useAnimDisabled();
  const wrapRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [over, setOver] = useState<OverInfo>({
    score: 0,
    best: 0,
    visible: false,
  });
  const onScoreRef = useRef(onScoreChange);
  useEffect(() => {
    onScoreRef.current = onScoreChange;
  });
  const engineRef = useRef<{ restart: () => void } | null>(null);

  useEffect(() => {
    const wrap = wrapRef.current;
    const cvs = canvasRef.current;
    if (!wrap || !cvs) return;
    const ctx = cvs.getContext("2d");
    if (!ctx) return;

    const RM = matchMedia("(prefers-reduced-motion: reduce)").matches;

    let W = 0,
      H = 0,
      BR_H = 38,
      baseW = 120,
      plateW = 200;
    const plateH = 20;
    const pivot = { x: 0, y: 30 };
    let L = 118,
      camInit = 0;

    // состояние
    let state: "aim" | "fall" | "wait" | "over" = "aim";
    let stack: Slab[] = [];
    let plate: Slab = { x: 0, w: 0, top: 0 };
    let camY = 0,
      camT = 0;
    let phase = 0,
      omega = 1.75,
      amp = 0.62;
    let cur = { w: 0, x: 0, y: 0 }; // текущий кирпич {x,y(top,world),w}
    let vx = 0,
      vy = 0,
      tilt = 0,
      vrMiss = 0,
      missed = false;
    let bx = 0,
      by = 0,
      pbx = 0,
      pby = 0; // позиция клешни (screen)
    let score = 0,
      best = 0,
      combo = 0;
    let debris: Debris[] = [],
      parts: Part[] = [],
      floats: FloatTxt[] = [];
    let shake = 0,
      squash = 0,
      clawOpen = 0,
      spawnT = 1,
      waitT = 0;
    let t = 0,
      lastDt = 0.016,
      overAt = -10,
      hover = false,
      started = false;

    /* ── размеры ─────────────────────────────────────────────── */
    function sizes() {
      baseW = Math.max(92, Math.min(150, W * 0.22));
      if (stack.length === 0)
        BR_H = Math.round(Math.max(30, Math.min(42, baseW * 0.32)));
      plateW = baseW * 1.7;
      pivot.x = W / 2;
      L = Math.min(122, H * 0.27);
      camInit = H - plateH - 26;
    }

    function resize() {
      const r = wrap!.getBoundingClientRect();
      const oldCx = W / 2;
      W = Math.max(1, r.width);
      H = Math.max(1, r.height);
      const dpr = Math.min(2, window.devicePixelRatio || 1);
      cvs!.width = W * dpr;
      cvs!.height = H * dpr;
      ctx!.setTransform(dpr, 0, 0, dpr, 0, 0);
      sizes();
      if (disabled) {
        staticFrame();
        return;
      }
      const dx = W / 2 - oldCx;
      if (started) {
        plate.x += dx;
        stack.forEach((b) => (b.x += dx));
        debris.forEach((d) => (d.x += dx));
      }
      if (!started) {
        init();
        started = true;
      }
      camT = Math.max(
        camInit,
        stack.length ? H - 172 - stack[stack.length - 1].top : camInit,
      );
      camY = Math.min(camY, camT) || camT;
    }

    /* ── жизненный цикл ──────────────────────────────────────── */
    function init() {
      stack = [];
      debris = [];
      parts = [];
      floats = [];
      score = 0;
      combo = 0;
      missed = false;
      shake = 0;
      squash = 0;
      tilt = 0;
      plate = { x: W / 2 - plateW / 2, w: plateW, top: 0 };
      camY = camT = camInit;
      phase = Math.random() * 6.283;
      omega = 1.75;
      amp = 0.62;
      newBrick(baseW);
      state = "aim";
      setOver((o) => (o.visible ? { ...o, visible: false } : o));
      setHintOff(false);
      updHud();
    }

    function newBrick(w: number) {
      cur = { w, x: 0, y: 0 };
      spawnT = 0;
    }

    function release() {
      if (state !== "aim") return;
      vx = Math.max(-460, Math.min(460, (bx - pbx) / lastDt));
      vy = Math.max(0, (by - pby) / lastDt) * 0.35;
      cur.x = bx - cur.w / 2;
      cur.y = by + 2 - camY; // в мировые координаты
      tilt = 0;
      missed = false;
      state = "fall";
      setHintOff(true);
    }

    function place(s: Slab, oL: number, oR: number, ov: number) {
      const cd = Math.abs(cur.x + cur.w / 2 - (s.x + s.w / 2));
      let nx = oL,
        nw = ov,
        perf = false;
      if (cd <= PERFECT) {
        perf = true;
        combo++;
        nw = Math.min(cur.w + 6, baseW); // идеально — ширина чуть отрастает
        nx = s.x + s.w / 2 - nw / 2;
      } else {
        combo = 0;
        if (cur.x < oL - 0.5) addDebris(cur.x, oL - cur.x, s.top - BR_H, -1);
        if (cur.x + cur.w > oR + 0.5)
          addDebris(oR, cur.x + cur.w - oR, s.top - BR_H, 1);
      }
      const top = s.top - BR_H;
      stack.push({ x: nx, w: nw, top });

      const pts = perf ? (combo >= 2 ? 3 : 2) : 1;
      score += pts;
      best = Math.max(best, score);
      addFloat(
        nx + nw / 2,
        top - 6,
        perf ? (combo >= 2 ? "Комбо ×" + combo + "  +" + pts : "Идеально!  +2") : "+1",
        perf,
      );
      updHud();

      squash = 1;
      shake = RM ? 0 : perf ? 5 : 3;
      if (perf && !RM) burst(nx + nw / 2, top);

      omega = Math.min(3.5, 1.75 + stack.length * 0.055); // прогресс сложности
      amp = Math.min(0.9, 0.62 + stack.length * 0.012);
      camT = Math.max(camInit, H - 172 - top); // камера едет вниз

      state = "wait";
      waitT = 0.4;
    }

    function gameOver() {
      state = "over";
      overAt = t;
      shake = RM ? 0 : 6;
      setOver({ score, best, visible: true });
    }

    /* ── эффекты ─────────────────────────────────────────────── */
    function addDebris(x: number, w: number, top: number, dir: number) {
      debris.push({
        x,
        y: top,
        w,
        vx: dir * (50 + Math.random() * 50),
        vy: -30,
        rot: 0,
        vr: dir * (2 + Math.random() * 2),
      });
    }
    function burst(x: number, y: number) {
      for (let i = 0; i < 12; i++) {
        const a = -Math.PI / 2 + (Math.random() - 0.5) * 2.4,
          sp = 130 + Math.random() * 160;
        parts.push({
          x,
          y,
          vx: Math.cos(a) * sp,
          vy: Math.sin(a) * sp,
          rot: Math.random() * 3,
          vr: (Math.random() - 0.5) * 8,
          life: 0.55 + Math.random() * 0.3,
          size: 3 + Math.random() * 3,
        });
      }
    }
    function addFloat(x: number, y: number, txt: string, lime: boolean) {
      floats.push({ x, y, txt, lime, life: 1 });
    }

    function updHud() {
      onScoreRef.current(score);
      if (best > readRecord()) {
        try {
          localStorage.setItem(STORAGE_KEY, String(best));
        } catch {}
        window.dispatchEvent(new Event(RECORD_EVENT));
      }
    }

    /* ── апдейт ──────────────────────────────────────────────── */
    function update(dt: number) {
      t += dt;
      if (state !== "over") phase += omega * dt;
      const th = amp * Math.sin(phase);
      pbx = bx;
      pby = by;
      bx = pivot.x + Math.sin(th) * L;
      by = pivot.y + Math.cos(th) * L;

      camY += (camT - camY) * Math.min(1, dt * 5);
      spawnT = Math.min(1, spawnT + dt * 6);
      clawOpen += ((state === "aim" ? 0 : 1) - clawOpen) * Math.min(1, dt * 12);
      squash = Math.max(0, squash - dt * 4.2);
      shake = Math.max(0, shake - dt * 26);

      if (state === "fall") {
        const prevBottom = cur.y + BR_H;
        vy += G * dt;
        cur.y += vy * dt;
        cur.x += vx * dt;
        if (missed) tilt += vrMiss * dt;
        else
          tilt +=
            (Math.max(-0.09, Math.min(0.09, vx * 0.00035)) - tilt) * dt * 8;

        const s = stack.length ? stack[stack.length - 1] : plate;
        if (!missed && prevBottom <= s.top && cur.y + BR_H >= s.top) {
          const oL = Math.max(cur.x, s.x),
            oR = Math.min(cur.x + cur.w, s.x + s.w),
            ov = oR - oL;
          if (ov >= MIN_OV) place(s, oL, oR, ov);
          else {
            missed = true;
            vrMiss = cur.x + cur.w / 2 < s.x + s.w / 2 ? -2.6 : 2.6;
          }
        }
        if (state === "fall" && cur.y + camY > H + 90) gameOver();
      }

      if (state === "wait") {
        waitT -= dt;
        if (waitT <= 0) {
          newBrick(stack[stack.length - 1].w);
          state = "aim";
        }
      }

      for (let i = debris.length - 1; i >= 0; i--) {
        const d = debris[i];
        d.vy += G * 0.9 * dt;
        d.x += d.vx * dt;
        d.y += d.vy * dt;
        d.rot += d.vr * dt;
        if (d.y + camY > H + 80) debris.splice(i, 1);
      }
      for (let i = parts.length - 1; i >= 0; i--) {
        const p = parts[i];
        p.vy += 1400 * dt;
        p.x += p.vx * dt;
        p.y += p.vy * dt;
        p.rot += p.vr * dt;
        p.life -= dt * 1.6;
        if (p.life <= 0) parts.splice(i, 1);
      }
      for (let i = floats.length - 1; i >= 0; i--) {
        const f = floats[i];
        f.y -= 46 * dt;
        f.life -= dt * 1.15;
        if (f.life <= 0) floats.splice(i, 1);
      }
    }

    /* ── отрисовка ───────────────────────────────────────────── */
    function rr(x: number, y: number, w: number, h: number, r: number) {
      r = Math.min(r, w / 2, h / 2);
      ctx!.beginPath();
      ctx!.moveTo(x + r, y);
      ctx!.arcTo(x + w, y, x + w, y + h, r);
      ctx!.arcTo(x + w, y + h, x, y + h, r);
      ctx!.arcTo(x, y + h, x, y, r);
      ctx!.arcTo(x, y, x + w, y, r);
      ctx!.closePath();
    }

    function drawBrick(
      cx: number,
      bottomY: number,
      w: number,
      tone: number | boolean,
      sq: number,
      rot: number,
      scl: number,
    ) {
      const c = ctx!;
      c.save();
      c.translate(cx, bottomY);
      if (scl !== 1) c.scale(scl, scl);
      if (rot) c.rotate(rot);
      if (sq > 0) {
        const e = sq * sq;
        c.scale(1 + 0.1 * e, 1 - 0.15 * e);
      }

      // шипы (выглядывают из-под кирпича выше при обрезке — фича)
      const n = Math.max(1, Math.min(6, Math.round(w / 34)));
      const sw = 13,
        gap = 10,
        total = n * sw + (n - 1) * gap;
      c.fillStyle = tone ? "#9edd08" : "#93cf04";
      for (let i = 0; i < n; i++) {
        const sx = -total / 2 + i * (sw + gap);
        rr(sx, -BR_H - 6, sw, 8, 3);
        c.fill();
      }

      // тело
      const g = c.createLinearGradient(0, -BR_H, 0, 0);
      if (tone) {
        g.addColorStop(0, "#c9fb37");
        g.addColorStop(1, "#9edd05");
      } else {
        g.addColorStop(0, "#b8f312");
        g.addColorStop(1, "#8ec801");
      }
      c.fillStyle = g;
      rr(-w / 2, -BR_H, w, BR_H, 6);
      c.fill();
      c.strokeStyle = "rgba(0,0,0,.35)";
      c.lineWidth = 1;
      c.stroke();

      // светлая грань сверху и тень снизу
      c.fillStyle = "rgba(255,255,255,.3)";
      c.fillRect(-w / 2 + 3, -BR_H + 1.5, w - 6, 2);
      c.fillStyle = "rgba(15,30,0,.3)";
      c.fillRect(-w / 2 + 2, -5, w - 4, 4);
      c.restore();
    }

    function drawPlate() {
      const c = ctx!;
      const x = plate.x,
        y = plate.top + camY,
        w = plate.w;
      c.save();
      const g = c.createLinearGradient(0, y, 0, y + plateH);
      g.addColorStop(0, "#2a2a2a");
      g.addColorStop(1, "#181818");
      c.fillStyle = g;
      rr(x, y, w, plateH, 6);
      c.fill();
      c.strokeStyle = "#0d0d0d";
      c.lineWidth = 1;
      c.stroke();
      c.fillStyle = "rgba(182,242,10,.28)";
      c.fillRect(x + 4, y + 1, w - 8, 1.5);
      const n = Math.floor(w / 26);
      const total = n * 11 + (n - 1) * 12;
      c.fillStyle = "#333";
      for (let i = 0; i < n; i++) {
        rr(x + w / 2 - total / 2 + i * 23, y - 5, 11, 6, 2.5);
        c.fill();
      }
      c.restore();
    }

    function drawClaw() {
      const c = ctx!;
      // крепление
      c.strokeStyle = "#262626";
      c.lineWidth = 4;
      c.beginPath();
      c.moveTo(pivot.x, 0);
      c.lineTo(pivot.x, pivot.y - 8);
      c.stroke();
      c.fillStyle = "#2b2b2b";
      rr(pivot.x - 11, pivot.y - 10, 22, 12, 4);
      c.fill();
      c.fillStyle = "rgba(182,242,10,.9)";
      c.beginPath();
      c.arc(pivot.x, pivot.y - 4, 2, 0, 7);
      c.fill();

      // трос-цепочка
      c.strokeStyle = "#4b4b4b";
      c.lineWidth = 2;
      c.setLineDash([4, 5]);
      c.beginPath();
      c.moveTo(pivot.x, pivot.y);
      c.lineTo(bx, by - 16);
      c.stroke();
      c.setLineDash([]);

      // корпус клешни
      c.fillStyle = "#2e2e2e";
      rr(bx - 15, by - 16, 30, 12, 4);
      c.fill();
      c.strokeStyle = "#161616";
      c.lineWidth = 1;
      c.stroke();
      c.fillStyle = "rgba(182,242,10," + (0.45 + 0.45 * Math.sin(t * 5)) + ")";
      c.beginPath();
      c.arc(bx + 9, by - 10, 2, 0, 7);
      c.fill();

      // лапки
      const halfW =
        state === "aim"
          ? Math.max(9, (cur.w / 2) * (1 - Math.pow(1 - spawnT, 3)))
          : 16;
      for (const s of [-1, 1]) {
        c.save();
        c.translate(bx + s * (halfW - 1), by - 6);
        c.rotate(s * clawOpen * 0.75);
        c.fillStyle = "#272727";
        rr(s > 0 ? 0 : -5, 0, 5, 15, 2);
        c.fill();
        c.fillStyle = "#5f7a10";
        c.fillRect(s > 0 ? 0 : -5, 12, 5, 3);
        c.restore();
      }
    }

    function draw() {
      const c = ctx!;
      c.clearRect(0, 0, W, H);
      c.save();
      if (shake > 0)
        c.translate(
          (Math.random() - 0.5) * 2 * shake,
          (Math.random() - 0.5) * 2 * shake,
        );

      // мир
      drawPlate();
      for (let i = 0; i < stack.length; i++) {
        const b = stack[i],
          last = i === stack.length - 1;
        const sy = b.top + BR_H + camY;
        if (sy < -60 || sy > H + 80) continue;
        drawBrick(b.x + b.w / 2, sy, b.w, i % 2, last ? squash : 0, 0, 1);
      }
      for (const d of debris)
        drawBrick(d.x + d.w / 2, d.y + BR_H + camY, d.w, 1, 0, d.rot, 1);
      if (state === "fall")
        drawBrick(
          cur.x + cur.w / 2,
          cur.y + BR_H + camY,
          cur.w,
          stack.length % 2,
          0,
          tilt,
          1,
        );

      // частицы и всплывающий текст
      for (const p of parts) {
        c.save();
        c.globalAlpha = Math.max(0, p.life * 1.6);
        c.translate(p.x, p.y + camY);
        c.rotate(p.rot);
        c.fillStyle = "#c8ff3c";
        c.fillRect(-p.size / 2, -p.size / 2, p.size, p.size);
        c.restore();
      }
      c.font = "700 13px " + FONT;
      c.textAlign = "center";
      for (const f of floats) {
        c.globalAlpha = Math.max(0, Math.min(1, f.life * 1.4));
        c.fillStyle = f.lime ? "#c8ff3c" : "#9a9a9a";
        c.fillText(f.txt, f.x, f.y + camY);
      }
      c.globalAlpha = 1;

      // клешня и кирпич в захвате — поверх всего
      drawClaw();
      if (state === "aim") {
        const e = 1 - Math.pow(1 - spawnT, 3);
        drawBrick(bx, by + 2 + BR_H, cur.w, stack.length % 2, 0, 0, e);
      }
      c.restore();
    }

    /* ── kill-switch: один статичный кадр (клешня по центру с кирпичом,
          плита), rAF не крутится, ввод не подключается ── */
    function staticFrame() {
      plate = { x: W / 2 - plateW / 2, w: plateW, top: 0 };
      camY = camT = camInit;
      cur = { w: baseW, x: 0, y: 0 };
      spawnT = 1;
      clawOpen = 0;
      state = "aim";
      bx = pivot.x; // th = 0: клешня по центру
      by = pivot.y + L;
      draw();
    }

    best = readRecord();

    /* ── ввод ────────────────────────────────────────────────── */
    const onPointerDown = (e: PointerEvent) => {
      if ((e.target as Element | null)?.closest("button, a")) return;
      if (state === "aim") release();
      else if (state === "over" && t - overAt > 0.45) init();
    };
    const onPointerEnter = () => {
      hover = true;
    };
    const onPointerLeave = () => {
      hover = false;
    };
    // клавиатура: Space работает и при фокусе (не только под мышью)
    let focused = false;
    const onFocus = () => {
      focused = true;
    };
    const onBlur = () => {
      focused = false;
    };
    const onKeyDown = (e: KeyboardEvent) => {
      if ((!hover && !focused) || e.code !== "Space") return;
      e.preventDefault();
      if (state === "aim") release();
      else if (state === "over" && t - overAt > 0.45) init();
    };

    /* ── цикл (пауза, когда футер вне экрана) ────────────────── */
    let running = true,
      last = performance.now(),
      raf = 0;
    let io: IntersectionObserver | null = null;

    const ro = new ResizeObserver(resize);
    ro.observe(wrap);
    resize();

    if (!disabled) {
      engineRef.current = { restart: init };
      wrap.addEventListener("pointerdown", onPointerDown);
      wrap.addEventListener("pointerenter", onPointerEnter);
      wrap.addEventListener("pointerleave", onPointerLeave);
      wrap.addEventListener("focus", onFocus);
      wrap.addEventListener("blur", onBlur);
      window.addEventListener("keydown", onKeyDown);
      if ("IntersectionObserver" in window) {
        io = new IntersectionObserver(
          (en) => {
            running = en[0].isIntersecting;
            if (running) last = performance.now();
          },
          { threshold: 0.05 },
        );
        io.observe(wrap);
      }
      const frame = (now: number) => {
        raf = requestAnimationFrame(frame);
        if (!running) return;
        lastDt = Math.min(0.033, (now - last) / 1000) || 0.016;
        last = now;
        update(lastDt);
        draw();
      };
      raf = requestAnimationFrame(frame);
    }

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      io?.disconnect();
      wrap.removeEventListener("pointerdown", onPointerDown);
      wrap.removeEventListener("pointerenter", onPointerEnter);
      wrap.removeEventListener("pointerleave", onPointerLeave);
      wrap.removeEventListener("focus", onFocus);
      wrap.removeEventListener("blur", onBlur);
      window.removeEventListener("keydown", onKeyDown);
      engineRef.current = null;
    };
  }, [disabled]);

  return (
    <div
      ref={wrapRef}
      role="application"
      tabIndex={disabled ? -1 : 0}
      className={`touch-manipulation select-none ${disabled ? "" : "cursor-pointer"} ${className}`}
      aria-label="Мини-игра: собери башню из кирпичиков — Space или клик, чтобы отпустить кирпич"
      data-name="Footer/TowerGame"
    >
      <canvas ref={canvasRef} className="absolute inset-0 block h-full w-full" />
      {/* экран проигрыша — стили .over/.over-* из файла */}
      <div
        className={`absolute left-1/2 top-1/2 w-[238px] -translate-x-1/2 rounded-[18px] border border-solid border-[#242424] bg-[rgba(10,10,10,0.78)] px-[22px] pb-[24px] pt-[26px] text-center backdrop-blur-[9px] transition-[opacity,transform] duration-[250ms] ${
          over.visible
            ? "-translate-y-1/2"
            : "pointer-events-none -translate-y-[46%] opacity-0"
        }`}
      >
        <p className="text-[15px] font-semibold" style={{ color: TXT }}>
          Башня рухнула
        </p>
        <p
          className="mb-[2px] mt-[10px] text-[40px] font-extrabold leading-[1.2] [font-variant-numeric:tabular-nums]"
          style={{ color: LIME }}
        >
          {over.score}
        </p>
        <p className="text-[12px]" style={{ color: MUTED_2 }}>
          Рекорд · <span style={{ color: MUTED }}>{over.best}</span>
        </p>
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            engineRef.current?.restart();
          }}
          className="mt-[18px] cursor-pointer rounded-full border-0 px-[20px] py-[11px] font-[inherit] text-[13px] font-bold transition-[background-color,transform] duration-[180ms] [background:var(--twr-lime)] hover:[background:var(--twr-lime-soft)] active:scale-[0.97] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-[3px] focus-visible:outline-[#d7ff4a]"
          style={
            {
              color: INK,
              "--twr-lime": LIME,
              "--twr-lime-soft": LIME_SOFT,
            } as React.CSSProperties
          }
        >
          Построить заново
        </button>
      </div>
    </div>
  );
}
