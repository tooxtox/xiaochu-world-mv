import {useMemo} from 'react';
import {clamp, range} from '../timing/motion';

export type BilingualCue = {
  id: string; startFrame: number; endFrame: number; ja: string; zh: string; phase: string;
  style: string; words: {text: string; startFrame: number; endFrame: number; probability: number}[];
};
export type LyricLayout = {x: number; y: number; width: number; align: 'left' | 'center'; dark: boolean;};

export const BilingualLyrics = ({cue, frame, layout}: {cue: BilingualCue; frame: number; layout: LyricLayout}) => {
  const chars = useMemo(() => {
    let cursor = 0;
    const list = Array.from(cue.ja).map(char => ({char, a: -1, b: -1}));
    for (const word of cue.words) {
      const text = word.text.trim();
      if (!text) continue;
      const at = cue.ja.indexOf(text, cursor);
      if (at < 0) continue;
      for (let i = at; i < at + text.length; i++) {
        if (list[i]) {list[i].a = word.startFrame; list[i].b = word.endFrame;}
      }
      cursor = at + text.length;
    }
    return list;
  }, [cue]);
  const f = frame - cue.startFrame;
  const length = cue.endFrame - cue.startFrame;
  if (f < 0 || f >= length) return null;
  const entrance = range(f, 0, 12);
  const exit = 1 - range(f, Math.max(0, length - 8), 8);
  const weightedLength = Array.from(cue.ja).reduce((total, c) => total + (/[a-zA-Z0-9 ]/.test(c) ? 0.58 : 1), 0);
  const desired = cue.phase.startsWith('chorus') || cue.phase === 'bridge' ? 62 : 55;
  const size = Math.max(40, Math.min(desired, (layout.width - 64) / Math.max(1, weightedLength * 1.04)));
  const ink = layout.dark ? '#fff8ed' : '#354e60';
  const accent = layout.dark ? '#f0c6d5' : '#a86988';
  const pale = layout.dark ? 'rgba(28,47,66,0.91)' : 'rgba(255,251,242,0.92)';
  const isMask = cue.style === 'mask';
  const isRibbon = cue.style === 'ribbon';
  return <div data-lyric-id={cue.id} style={{position: 'absolute', left: layout.x, top: layout.y,
    width: layout.width, boxSizing: 'border-box', padding: '23px 28px 25px',
    textAlign: layout.align, opacity: entrance * exit,
    transform: `translateY(${(1 - entrance) * 12}px)`,
    background: pale, borderLeft: isRibbon ? `5px solid ${accent}` : undefined,
    boxShadow: layout.dark ? '0 2px 24px rgba(0,0,0,0.05)' : '0 1px 18px rgba(52,77,89,0.035)'}}>
    <div style={{fontFamily: 'MVJP, sans-serif', fontSize: size, fontWeight: 700, lineHeight: 1.52,
      letterSpacing: '0.035em', color: ink, overflowWrap: 'anywhere',
      clipPath: isMask ? `inset(0 ${100 * (1 - range(f, 0, 14))}% 0 0)` : undefined}}>
      {chars.map(({char, a, b}, i) => {
        const p = range(f, i * Math.min(0.9, 10 / chars.length), 10);
        const active = a >= 0 && frame >= a && frame < b;
        const orbit = cue.style === 'orbit';
        return <span key={`${i}-${char}`} style={{display: 'inline-block', color: active ? accent : ink,
          opacity: clamp(p * 1.4),
          transform: `translate(${orbit ? (1 - p) * (i - chars.length / 2) * 2.2 : 0}px, ${(1 - p) * (orbit ? -16 : 17)}px) rotate(${orbit ? (1 - p) * (i % 2 ? 5 : -5) : 0}deg)`}}>{char === ' ' ? ' ' : char}</span>;
      })}
    </div>
    <div style={{height: 2, width: 58, marginTop: 14, marginBottom: 15,
      marginLeft: layout.align === 'center' ? 'auto' : 0, marginRight: layout.align === 'center' ? 'auto' : 0,
      background: accent, transform: `scaleX(${range(f, 0, 16)})`, transformOrigin: layout.align === 'center' ? 'center' : 'left'}}/>
    <div style={{fontFamily: 'MVSC, sans-serif', fontSize: 31, fontWeight: 700, lineHeight: 1.55,
      letterSpacing: '0.04em', color: ink, opacity: 0.88, overflowWrap: 'anywhere'}}>{cue.zh}</div>
  </div>;
};
