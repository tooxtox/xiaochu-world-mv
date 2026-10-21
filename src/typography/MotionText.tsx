import type {CSSProperties} from 'react';
import {clamp, range} from '../timing/motion';

export type LyricCue = {id: string; startFrame: number; endFrame: number; text: string; style: 'stagger' | 'ribbon' | 'orbit' | 'cutout'; x: number; y: number; size: number; accent?: string; tokens?: {text: string; startFrame: number; endFrame: number}[];};

// Cue data is in global integer frames. Text in the study is the song title only.
// Actual lyric text and word timings must be supplied and aligned to the master audio.
export const MotionText = ({cue, frame}: {cue: LyricCue; frame: number}) => {
  const f = frame - cue.startFrame;
  const duration = cue.endFrame - cue.startFrame;
  if (f < 0 || f >= duration) return null;
  const end = 1 - range(f, duration - 15, 15);
  const color = cue.accent ?? '#466c7b';
  const base: CSSProperties = {position: 'absolute', left: cue.x, top: cue.y, fontFamily: 'MVJapanese, sans-serif', fontSize: cue.size, fontWeight: 700, letterSpacing: '0.1em', color, opacity: end, whiteSpace: 'nowrap'};
  if (cue.style === 'ribbon') {
    const r = range(f, 0, 22);
    return <div style={base}>
      <div style={{position: 'absolute', inset: '-12px -24px', background: '#f2c5ce', transform: `scaleX(${r})`, transformOrigin: 'left center'}} />
      <div style={{position: 'relative', clipPath: `inset(0 ${100 * (1 - range(f, 8, 20))}% 0 0)`, padding: '0 10px'}}>{cue.text}</div>
    </div>;
  }
  if (cue.style === 'cutout') return <div style={{...base, overflow: 'hidden', padding: '10px 0'}}>
    <div style={{transform: `translateY(${(1 - range(f, 0, 24)) * 130}%) rotate(${(1 - range(f, 0, 24)) * -4}deg)`}}>{cue.text}</div>
    <div style={{height: 3, background: color, transform: `scaleX(${range(f, 8, 30)})`, transformOrigin: 'left'}} />
  </div>;
  const characters = Array.from(cue.text);
  if (cue.tokens?.length) return <div style={{...base, display: 'flex', gap: 2}}>
    {cue.tokens.map((token, i) => {
      const p = range(frame, cue.startFrame + i * 2, 12);
      const active = frame >= token.startFrame && frame < token.endFrame;
      return <span key={i} style={{display: 'inline-block', position: 'relative', opacity: p, transform: `translateY(${(1 - p) * 42 - (active ? Math.sin(range(frame, token.startFrame, 6) * Math.PI) * 5 : 0)}px)`, color: active ? '#b57594' : color}}>
        {token.text}
        <span style={{position: 'absolute', left: 0, right: 0, height: 3, bottom: -9, background: '#d4a6ba', transform: `scaleX(${range(frame, token.startFrame, Math.max(4, token.endFrame - token.startFrame))})`, transformOrigin: 'left'}}/>
      </span>;
    })}
  </div>;
  return <div style={{...base, display: 'flex', gap: cue.style === 'orbit' ? 10 : 0}}>
    {characters.map((c, i) => {
      const p = range(f, i * 3, 18);
      const orbit = cue.style === 'orbit';
      const angle = (1 - p) * (i % 2 ? 24 : -24);
      return <span key={`${i}-${c}`} style={{display: 'inline-block', opacity: clamp(p * 2), transform: `translate(${orbit ? (1 - p) * (i - characters.length / 2) * 26 : 0}px, ${(1 - p) * (orbit ? -70 : 60)}px) rotate(${angle}deg) scale(${orbit ? 0.6 + p * 0.4 : 1})`, borderBottom: orbit ? '3px solid #dfb1c1' : undefined}}>{c}</span>;
    })}
  </div>;
};
