export const clamp = (n: number, min = 0, max = 1) => Math.min(max, Math.max(min, n));
export const smooth = (n: number) => {const t = clamp(n); return t * t * (3 - 2 * t);};
export const range = (frame: number, start: number, duration: number) => smooth((frame - start) / duration);
export const seeded = (n: number) => {const v = Math.sin(n * 127.1 + 311.7) * 43758.5453; return v - Math.floor(v);};
export const blinkAt = (frame: number) => {
  const cycle = ((frame % 139) + 139) % 139;
  return cycle >= 105 && cycle <= 113 ? Math.max(0.045, Math.abs(cycle - 109) / 4) : 1;
};
