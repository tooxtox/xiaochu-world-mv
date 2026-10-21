import {AbsoluteFill, Img, staticFile} from 'remotion';
import {Classroom, Rooftop, SkyWorld} from './Worlds';
import {range, seeded} from '../timing/motion';
import type {FullShot, FullWorld} from '../compositions/fullStoryboard';

const backgrounds: Partial<Record<FullWorld, string>> = {
  library: '01-library-day.png', garden: '02-garden-sky.png', city: '03-city-evening.png',
};

const NightWorld = ({frame, water = false}: {frame: number; water?: boolean}) => <svg viewBox="0 0 1920 1080" width="100%" height="100%" style={{position: 'absolute'}}>
  <rect width={1920} height={1080} fill={water ? '#8fb6c5' : '#23394f'}/>
  <circle cx={1440} cy={260} r={127} fill={water ? '#e5e7d8' : '#f1ebd5'}/>
  <circle cx={1485} cy={236} r={125} fill={water ? '#8fb6c5' : '#23394f'}/>
  {Array.from({length: water ? 22 : 85}, (_, i) => {
    const x = seeded(i + 71) * 1920;
    const y = seeded(i + 111) * (water ? 580 : 780);
    const r = 1.2 + seeded(i + 39) * 2;
    return <circle key={i} cx={x + Math.sin(frame / 170 + i) * 8} cy={y} r={r} fill="#f5efdc" opacity={0.35 + 0.35 * Math.sin(frame / 42 + i) ** 2}/>;
  })}
  <path d="M0 813 Q353 728 760 798 T1490 787 T1920 790 V1080 H0Z" fill={water ? '#709ba9' : '#1d3147'}/>
  <path d="M0 876 Q410 806 900 886 T1920 849 V1080 H0Z" fill={water ? '#608c9d' : '#1a2e43'}/>
  {[0,1,2,3,4].map(i => <path key={i} d={`M${1120 - i * 75 + Math.sin(frame / 45 + i) * 40} ${856 + i * 35} h${260 + i * 110}`} stroke="#d8e5da" strokeWidth={2 + i} opacity={water ? 0.35 : 0.17}/>)}
  {!water ? <g transform={`translate(${((frame * 7) % 2500) - 400} ${100 + frame * 0.2 % 250}) rotate(-20)`}>
    <path d="M0 0 h165" stroke="#dfe9df" strokeWidth={2}/><path d="M160 0 h22" stroke="#faf5e5" strokeWidth={4}/>
  </g> : null}
</svg>;

const ClockWorld = ({frame}: {frame: number}) => <svg viewBox="0 0 1920 1080" width="100%" height="100%" style={{position: 'absolute'}}>
  <rect width={1920} height={1080} fill="#e8ede2"/>
  <circle cx={700} cy={530} r={410} fill="#f7f3e7" stroke="#b5cecb" strokeWidth={3}/>
  <circle cx={700} cy={530} r={369} stroke="#cddcd4" strokeWidth={2} fill="none"/>
  {Array.from({length: 60}, (_, i) => <path key={i} d={`M700 ${i % 5 ? 173 : 161} v${i % 5 ? 12 : 31}`} transform={`rotate(${i * 6} 700 530)`} stroke={i % 5 ? '#b8cbc7' : '#8da9ad'} strokeWidth={i % 5 ? 2 : 4}/>) }
  <path d="M700 530 L700 290" transform={`rotate(${frame * 0.16} 700 530)`} stroke="#92b5bb" strokeWidth={7} strokeLinecap="round"/>
  <path d="M700 530 L860 615" transform={`rotate(${frame * 0.035} 700 530)`} stroke="#dfb8c4" strokeWidth={11} strokeLinecap="round"/>
  <circle cx={700} cy={530} r={9} fill="#7b9da8"/>
  <path d="M0 970 Q550 850 1120 974 T1920 930 V1080 H0Z" fill="#d6e4dc"/>
</svg>;

export const FullWorldLayer = ({shot, frame, progress, index}: {shot: FullShot; frame: number; progress: number; index: number}) => {
  const image = backgrounds[shot.world];
  const pan = (index % 2 ? 1 : -1) * (progress - 0.5) * 28;
  const zoom = 1.035 + progress * (shot.framing === 'wide' ? 0.015 : 0.035);
  return <AbsoluteFill style={{transform: `translateX(${pan}px) scale(${zoom})`}}>
    {image ? <Img src={staticFile(`backgrounds/${image}`)} style={{width: '100%', height: '100%', objectFit: 'cover'}}/> : null}
    {shot.world === 'rooftop' ? <Rooftop frame={frame} warm={shot.warm}/> : null}
    {shot.world === 'classroom' ? <Classroom frame={frame}/> : null}
    {shot.world === 'sky' || shot.world === 'flight' ? <SkyWorld frame={frame}/> : null}
    {shot.world === 'night' || shot.world === 'water' ? <NightWorld frame={frame} water={shot.world === 'water'}/> : null}
    {shot.world === 'clock' ? <ClockWorld frame={frame}/> : null}
    {shot.warm && image ? <AbsoluteFill style={{background: '#f4caa9', opacity: 0.1}}/> : null}
    {shot.world === 'library' || shot.world === 'classroom' ? <svg viewBox="0 0 1920 1080" width="100%" height="100%" style={{position: 'absolute'}}>
      <g transform={`translate(${Math.sin(frame / 130) * 20} 0)`} fill="#fff8d6" opacity={0.06 + progress * 0.035}>
        <path d="M600 0 H740 L1920 1020 V1080 H1760Z M1070 0 H1120 L1920 605 V760Z"/>
      </g>
    </svg> : null}
  </AbsoluteFill>;
};

export const FloatingPages = ({frame, count = 9}: {frame: number; count?: number}) => <svg viewBox="0 0 1920 1080" width="100%" height="100%" style={{position: 'absolute', pointerEvents: 'none'}}>
  {Array.from({length: count}, (_, i) => {
    const seed = seeded(i + 241);
    const x = ((frame * (1.1 + seed) + i * 271) % 2480) - 280;
    const y = 190 + seeded(i + 274) * 660 + Math.sin(frame / 64 + i) * 38;
    return <g key={i} transform={`translate(${x} ${y}) rotate(${Math.sin(frame / 85 + i) * 18}) scale(${0.5 + seed * 0.6})`} opacity={0.58}>
      <path d="M-31 -45 Q0 -54 35 -38 L30 48 Q0 40 -37 44Z" fill="#fff9ea" stroke="#a8bbc0" strokeWidth={1.5}/>
      <path d="M-22 -20 L22 -17 M-24 -9 L21 -6 M-24 3 L21 6 M-25 15 L9 17" stroke="#bdccca" strokeWidth={2}/>
    </g>;
  })}
</svg>;

export const PetalField = ({frame, count = 17, front = false}: {frame: number; count?: number; front?: boolean}) => <svg viewBox="0 0 1920 1080" width="100%" height="100%" style={{position: 'absolute', pointerEvents: 'none'}}>
  {Array.from({length: count}, (_, i) => {
    const s = seeded(i + 391);
    const x = ((frame * (1.8 + s) + i * 193) % 2330) - 200;
    const y = ((i * 131 + frame * (0.2 + s * 0.24)) % 1150) - 40;
    return <path key={i} d="M-9 0 Q-8 -14 4 -14 Q15 -8 8 2 Q0 9 -9 0Z" fill={i % 3 ? '#f6e9df' : '#e7b6c9'} opacity={front ? 0.75 : 0.4} transform={`translate(${x} ${y}) rotate(${frame * 0.7 + i * 42}) scale(${front ? 1.4 + s : 0.5 + s * 0.5})`}/>;
  })}
</svg>;

export const ConnectionLines = ({frame, strength = 1}: {frame: number; strength?: number}) => <svg viewBox="0 0 1920 1080" width="100%" height="100%" style={{position: 'absolute', pointerEvents: 'none'}}>
  {[0,1,2].map(i => {
    const reveal = range(frame, 12 + i * 8, 80);
    return <g key={i} opacity={0.25 * strength}>
      <path d={`M${160 + i * 70} ${810 - i * 145} C700 ${560 + i * 70}, 1160 ${120 + i * 50}, ${1740 - i * 35} ${325 + i * 170}`} stroke={i % 2 ? '#d9aabd' : '#82b1ba'} strokeWidth={2.2} strokeDasharray={1800} strokeDashoffset={(1 - reveal) * 1800} fill="none"/>
      <circle cx={1740 - i * 35} cy={325 + i * 170} r={4 + i} fill="#d9aabd" opacity={reveal}/>
    </g>;
  })}
</svg>;

export const LargePaperPlane = ({frame}: {frame: number}) => {
  const t = Math.min(1, frame / 215);
  const x = 90 + t * 1820;
  const y = 780 - Math.sin(t * Math.PI * 0.85) * 520;
  return <svg viewBox="0 0 1920 1080" width="100%" height="100%" style={{position: 'absolute', pointerEvents: 'none'}}>
    <path d="M70 813 Q790 190 1830 470" fill="none" stroke="#a5c6ca" strokeWidth={2} strokeDasharray="6 12" opacity={0.23}/>
    <g transform={`translate(${x} ${y}) rotate(${-28 + t * 30}) scale(${1.3 - t * 0.6})`}>
      <path d="M-120 12 L115 -65 L-8 63 L-22 17Z" fill="#fff8e7" stroke="#729aa9" strokeWidth={2}/>
      <path d="M-22 17 L115 -65 L-8 63Z" fill="#d2e4df" stroke="#729aa9" strokeWidth={2}/>
      <path d="M-22 17 L-15 77 L18 39" fill="#eef3df" stroke="#729aa9" strokeWidth={2}/>
    </g>
  </svg>;
};
