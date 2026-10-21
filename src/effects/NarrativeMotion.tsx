import {range, seeded} from '../timing/motion';
import type {FullShot} from '../compositions/fullStoryboard';

// Scenic motion graphics; generated character art is never replaced with vector anatomy.
export const NarrativeMotion = ({shot, frame, silentGap}: {shot: FullShot; frame: number; silentGap: boolean}) => {
  const f = frame - shot.start;
  const dark = shot.world === 'night';
  const ink = dark ? '#e8e9d8' : '#779ea9';
  const accent = dark ? '#e6bdcf' : '#c69ab0';
  const opacity = range(f, 16, 25) * (1 - range(f, shot.end - shot.start - 29, 29));
  const x = shot.side === 'left' ? 1440 : 455;
  const orbit = ['sky','night','water'].includes(shot.world);
  const book = shot.world === 'library' && silentGap;
  const gate = silentGap && shot.world === 'city';
  if (!orbit && !book && !gate) return null;
  return <svg viewBox="0 0 1920 1080" width="100%" height="100%" style={{position:'absolute', pointerEvents:'none', opacity}}>
    {orbit ? <g transform={`translate(${x} 744)`} opacity={0.42}>
      <g transform={`rotate(${f * 0.1})`}>
        <ellipse rx={210} ry={88} fill="none" stroke={ink} strokeWidth={1.4} strokeDasharray="4 15"/>
        <ellipse rx={178} ry={113} fill="none" stroke={accent} strokeWidth={1.5} transform="rotate(-22)"/>
        {[0,1,2,3,4].map(i => {const a=f/100+i*Math.PI*2/5; return <circle key={i} cx={Math.cos(a)*210} cy={Math.sin(a)*88} r={i===0?6:3} fill={i%2?ink:accent}/>})}
      </g>
      <path d="M-21 0 L0 -21 L21 0 L0 21Z" fill="none" stroke={accent} strokeWidth={2} transform={`scale(${0.85+Math.sin(f/45)*0.1})`}/>
    </g> : null}
    {book ? <g transform={`translate(${x} 695)`}>
      <circle r={210} fill="#fff7e6" opacity={0.57}/>
      <g transform={`translate(0 ${Math.sin(f/37)*8})`} fill="#fff9ec" stroke="#92aeb4" strokeWidth={2.3}>
        <path d="M0 -65 Q-86 -114 -165 -78 V113 Q-81 82 0 131Z"/>
        <path d="M0 -65 Q86 -114 165 -78 V113 Q81 82 0 131Z"/>
        <path d="M0 -65 V131" stroke={accent}/>
        {[0,1,2,3].map(i=><path key={i} d={`M-140 ${-45+i*32} Q-80 ${-67+i*32} -23 ${-26+i*32} M23 ${-26+i*32} Q80 ${-67+i*32} 140 ${-45+i*32}`} fill="none" stroke="#c4d3cd" strokeWidth={3}/>)}
      </g>
      {[0,1,2,3].map(i=> {const p=((f+i*41)%170)/170;return <g key={i} opacity={Math.sin(p*Math.PI)*0.75} transform={`translate(${Math.sin(p*4+i)*110} ${-80-p*330}) rotate(${p*80-i*17})`}>
        <path d="M-24 -33 L27 -29 L20 38 L-30 27Z" fill="#fff9ec" stroke={ink} strokeWidth={1.5}/>
      </g>})}
    </g> : null}
    {gate ? <g opacity={0.31}>
      {[0,1,2,3,4,5].map(i=> {const p=((f/180+i/6)%1);const s=0.17+p*1.1;return <g key={i} opacity={Math.sin(p*Math.PI)} transform={`translate(${x} 650) scale(${s}) rotate(${-8+p*12})`}>
        <rect x={-240} y={-300} width={480} height={600} rx={120} fill="none" stroke={i%2?accent:'#fff4da'} strokeWidth={4}/>
      </g>})}
      {Array.from({length:13},(_,i)=><circle key={i} cx={x+(seeded(i+4)-0.5)*500} cy={1080-((f*1.8+i*77)%1080)} r={2+seeded(i+25)*3} fill="#fff8de"/>) }
    </g>:null}
  </svg>;
};
