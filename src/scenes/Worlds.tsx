import {seeded} from '../timing/motion';

const skyline = Array.from({length: 25}, (_, i) => ({x: i * 96 - 150, h: 70 + seeded(i + 7) * 170, w: 52 + seeded(i + 31) * 47}));

export const Rooftop = ({frame, warm = false}: {frame: number; warm?: boolean}) => {
  const drift = frame * 0.09;
  return <svg viewBox="0 0 1920 1080" width="100%" height="100%" style={{position: 'absolute'}}>
    <rect width={1920} height={1080} fill={warm ? '#e8d8ce' : '#c9e7ec'}/>
    <g fill={warm ? '#fff0d9' : '#fffaf0'} transform={`translate(${-drift} 0)`}>
      <path d="M-80 248 Q0 224 20 188 Q62 145 110 183 Q152 130 210 174 Q242 174 251 204 Q306 195 339 234 H430 L440 249Z"/>
      <path d="M1080 162 Q1140 150 1170 114 Q1207 88 1244 123 Q1281 96 1314 126 Q1354 124 1379 151 L1482 164Z"/>
    </g>
    <g transform={`translate(${-drift * 0.4} 0)`}>
      {skyline.map((b, i) => <rect key={i} x={b.x} y={738 - b.h} width={b.w} height={b.h + 100} fill={i % 3 === 0 ? '#b3cdd8' : '#bcd6dd'} />)}
    </g>
    <g transform={`translate(${-drift} 0)`}>
      {skyline.map((b, i) => <g key={i}><path d={`M${b.x - 10} 802 V${758 - b.h * 0.6} H${b.x + b.w + 10} V802Z`} fill={i % 2 ? '#9bb9ca' : '#a6c4cf'}/>
        {i % 3 === 0 ? <path d={`M${b.x + 12} ${782 - b.h * 0.6} h12 v24 h-12Z M${b.x + 36} ${782 - b.h * 0.6} h12 v24 h-12Z`} fill="#dfebdf"/> : null}</g>)}
    </g>
    <path d="M0 865 H1920 V1080 H0Z" fill={warm ? '#d8c5bc' : '#bdcfce'}/>
    <path d="M0 1050 L1920 872 M370 1080 L1290 875 M940 1080 L1530 875" stroke="#aabec2" strokeWidth={2}/>
    <g stroke="#718f9e" strokeWidth={11} fill="none">
      <path d="M0 771 H1920 M0 909 H1920" />
      {Array.from({length: 11}, (_, i) => <path key={i} d={`M${i * 210 - drift * 1.6} 771 V974`} />)}
    </g>
    <path d="M0 760 H1920 V772 H0Z" fill="#f6f1dc"/>
    {warm ? <path d="M0 0 H710 L1640 1080 H1170Z" fill="#fff4d7" opacity={0.14}/> : null}
  </svg>;
};

export const Classroom = ({frame}: {frame: number}) => {
  const drift = Math.sin(frame / 90) * 12;
  return <svg viewBox="0 0 1920 1080" width="100%" height="100%" style={{position: 'absolute'}}>
    <rect width={1920} height={1080} fill="#f4ead9"/>
    <rect x={740} y={100} width={1180} height={715} fill="#c6e1e6"/>
    <path d="M750 648 L969 597 L1084 630 L1324 571 L1588 645 L1920 590 V817 H750Z" fill="#adcad5"/>
    <path d="M839 296 Q925 263 975 297 Q1000 279 1038 302 H1127 M1491 208 Q1573 169 1641 207 H1750" fill="#fcf9ec"/>
    <g stroke="#e4d8c6" strokeWidth={31}><path d="M756 100 V813 M1140 100 V813 M1530 100 V813 M1905 100 V813 M740 457 H1920 M740 800 H1920"/></g>
    <path d="M0 855 H1920 V1080 H0Z" fill="#cfbca6"/>
    <g transform={`translate(${drift} 0)`} fill="#fff8dd" opacity={0.65}>
      <path d="M760 812 L1100 1080 H1390 L1140 812Z M1190 812 L1460 1080 H1750 L1530 812Z M1580 812 L1820 1080 H1920 V812Z"/>
    </g>
    <path d={`M710 70 Q${650 + drift} 235 702 414 Q${730 - drift} 631 677 832 L571 824 Q619 602 594 425 Q568 229 600 70Z`} fill="#fffaf0" stroke="#c7c8be" strokeWidth={3}/>
    <path d="M1310 879 L1826 828 L1920 911 L1387 973Z" fill="#c99e7e" stroke="#947e70" strokeWidth={3}/>
    <path d="M1387 973 L1388 1080 M1830 927 L1843 1080" stroke="#7b8c8d" strokeWidth={15}/>
    <path d="M1504 863 L1670 850 L1730 884 L1564 900Z" fill="#f5eee0" stroke="#7b8c8d" strokeWidth={2}/>
    <path d="M1504 863 L1570 889 L1730 884 M1570 889 V900" stroke="#a3acb1" strokeWidth={2} fill="none"/>
  </svg>;
};

export const SkyWorld = ({frame}: {frame: number}) => <svg viewBox="0 0 1920 1080" width="100%" height="100%" style={{position: 'absolute'}}>
  <rect width={1920} height={1080} fill="#e2efe6"/>
  <circle cx={1290} cy={380} r={350} fill="#c5dee0"/>
  <circle cx={1290} cy={380} r={278} fill="#edf3e6"/>
  <path d="M0 850 Q580 729 1050 861 T1920 811 V1080 H0Z" fill="#bad7da"/>
  {[0, 1, 2, 3].map(i => <ellipse key={i} cx={1220} cy={940} rx={80 + ((frame * 2 + i * 110) % 440)} ry={12 + ((frame * 0.35 + i * 19) % 77)} fill="none" stroke="#f7f7e9" strokeWidth={3} opacity={0.6 * (1 - ((frame * 2 + i * 110) % 440) / 440)} />)}
  <path d="M140 355 H500 M220 373 H430 M1390 717 H1750" stroke="#a5c7c9" strokeWidth={3}/>
</svg>;

export const PaperBirds = ({frame, count = 7}: {frame: number; count?: number}) => <svg viewBox="0 0 1920 1080" width="100%" height="100%" style={{position: 'absolute', pointerEvents: 'none'}}>
  {Array.from({length: count}, (_, i) => {
    const seed = seeded(i + 5);
    const x = ((frame * (1.8 + seed) + i * 317) % 2500) - 300;
    const y = 185 + seeded(i + 33) * 430 + Math.sin(frame / 40 + i) * 25;
    const wing = Math.sin(frame / 13 + i) * 7;
    return <g key={i} transform={`translate(${x} ${y}) rotate(${-12 + wing}) scale(${0.5 + seed * 0.5})`}>
      <path d="M-48 6 L8 -15 L-3 14 L58 -10 L18 25Z" fill="#fff9eb" stroke="#8caab3" strokeWidth={2}/>
      <path d={`M-3 14 L8 ${-15 - wing} L18 25Z`} fill="#d5e5e0" stroke="#8caab3" strokeWidth={1.5}/>
    </g>;
  })}
</svg>;

export const WindLines = ({frame}: {frame: number}) => <svg viewBox="0 0 1920 1080" width="100%" height="100%" style={{position: 'absolute', pointerEvents: 'none'}}>
  {[0, 1, 2].map(i => <path key={i} d={`M${-600 + ((frame * 9 + i * 830) % 3100)} ${270 + i * 120} q180 -55 360 0 t380 0`} stroke="#fff9ef" strokeWidth={2} fill="none" opacity={0.35}/>) }
</svg>;
