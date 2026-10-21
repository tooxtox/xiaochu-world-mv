import {AbsoluteFill, Audio, Img, staticFile, useCurrentFrame} from 'remotion';
import {GeneratedCharacter} from '../characters/GeneratedCharacter';
import {DepthPaper} from '../effects/DepthPaper';
import {NarrativeMotion} from '../effects/NarrativeMotion';
import {PaperBirds, WindLines} from '../scenes/Worlds';
import {ConnectionLines, FloatingPages, FullWorldLayer, LargePaperPlane, PetalField} from '../scenes/FullWorlds';
import {BilingualLyrics, type BilingualCue, type LyricLayout} from '../typography/BilingualLyrics';
import {range} from '../timing/motion';
import {useMVFonts} from '../timing/useMVFonts';
import {fullShots, type FullShot} from './fullStoryboard';
import rawData from '../full-data.json';

type FullData = { durationInFrames: number; envelope: number[]; cues: BilingualCue[];};
const data = rawData as FullData;
export const fullDuration = data.durationInFrames;

const lyricLayout = (shot: FullShot): LyricLayout => {
  const dark = shot.world === 'night';
  if (shot.side === 'center') return {x: 260, y: 790, width: 1400, align: 'center', dark};
  if (shot.side === 'left') return {x: 1075, y: 380, width: 735, align: 'left', dark};
  return {x: 110, y: shot.id.startsWith('01') ? 455 : 400, width: 805, align: 'left', dark};
};

const FullCharacter = ({shot, frame, progress}: {shot: FullShot; frame: number; progress: number}) => {
  if (shot.pose === 'none') return null;
  if (shot.pose === 'portrait') return <div style={{position: 'absolute', left: -120 - progress * 6, top: 26 - progress * 4, width: 1040, height: 1560}}>
    <Img src={staticFile('characters/08-portrait.png')} style={{width: '100%', height: '100%', objectFit: 'contain'}}/>
  </div>;
  const wide = shot.framing === 'wide';
  const width = wide ? 415 + progress * 10 : 720 + progress * 12;
  const x = wide ? (shot.side === 'center' ? 740 : shot.side === 'right' ? 1290 : 200)
    : shot.side === 'right' ? 1070 - progress * 14 : 65 + progress * 10;
  const y = wide ? 348 - progress * 6 : 112 - progress * 5;
  return <GeneratedCharacter frame={frame} pose={shot.pose} x={x} y={y} width={width} fullBody={wide}/>;
};

const Scene = ({shot, frame, index}: {shot: FullShot; frame: number; index: number}) => {
  const local = frame - shot.start;
  const progress = Math.max(0, Math.min(1, local / Math.max(1, shot.end - shot.start - 1)));
  const music = data.envelope[frame] ?? 0;
  return <AbsoluteFill>
    <FullWorldLayer shot={shot} frame={local} progress={progress} index={index}/>
    {shot.motif === 'world' ? <ConnectionLines frame={local} strength={1 + music * 0.15}/> : null}
    {shot.motif === 'pages' ? <FloatingPages frame={local} count={7}/> : null}
    {shot.world === 'flight' || shot.id.startsWith('24') ? <DepthPaper frame={local}/> : null}
    <NarrativeMotion shot={shot} frame={frame} silentGap={!data.cues.some(c => frame >= c.startFrame && frame < c.endFrame)}/>
    <FullCharacter shot={shot} frame={frame} progress={progress}/>
    {shot.motif === 'birds' || shot.world === 'flight' ? <PaperBirds frame={local + index * 23} count={shot.world === 'flight' ? 5 : 4}/> : null}
    {shot.motif === 'petals' ? <PetalField frame={local + index * 23} count={shot.framing === 'wide' ? 19 : 12}/> : null}
    {shot.world === 'flight' ? <LargePaperPlane frame={local}/> : null}
    {shot.world === 'rooftop' || shot.world === 'garden' ? <WindLines frame={local}/> : null}
    {shot.world === 'classroom' && shot.pose !== 'portrait' ? <div style={{position: 'absolute', left: shot.side === 'left' ? 770 : 910, top: 0, height: 1080, width: 38, background: '#eee4d1', transform: `translateX(${(progress - 0.5) * -36}px)`}}/> : null}
    {shot.world === 'library' ? <div style={{position: 'absolute', inset: 0, background: '#fff9e9', opacity: 0.035 + Math.sin(local / 90) * 0.02}}/> : null}
  </AbsoluteFill>;
};

const SceneTransition = ({shot, frame, index}: {shot: FullShot; frame: number; index: number}) => {
  const local = frame - shot.start;
  const tail = shot.end - frame;
  if (index === 0) return <AbsoluteFill style={{background: '#fff9ed', opacity: 1 - range(local, 0, 22), pointerEvents: 'none'}}/>;
  if (local >= 20 && tail >= 13) return null;
  const arriving = local < 20;
  const p = arriving ? 1 - range(local, 0, 20) : range(13 - tail, 0, 13);
  if (index % 3 === 0) return <AbsoluteFill style={{background: '#f9f3e6', opacity: p, pointerEvents: 'none'}}/>;
  if (index % 3 === 1) return <AbsoluteFill style={{background: '#eef2e5', clipPath: `circle(${p * 2250}px at ${index % 2 ? 25 : 75}% 50%)`, pointerEvents: 'none'}}/>;
  const x = arriving ? range(local, 0, 20) * 2380 : -2380 + range(13 - tail, 0, 13) * 2380;
  return <div style={{position: 'absolute', left: x - 80, top: -400, width: 2380, height: 1880,
    background: '#fbf5e9', transform: 'rotate(-8deg)', borderLeft: '15px solid #d9bbc7', pointerEvents: 'none'}}/>;
};

const OpeningTitles = ({frame}: {frame: number}) => {
  if (frame > 235) return null;
  const visible = range(frame, 8, 22) * (1 - range(frame, 198, 37));
  return <div style={{position: 'absolute', left: 140, top: 140, opacity: visible, color: '#3a596b'}}>
    <div style={{fontFamily: 'MVJP', fontSize: 60, fontWeight: 700, letterSpacing: '0.025em'}}>それを世界と言うんだね</div>
    <div style={{fontFamily: 'MVSC', fontSize: 29, marginTop: 20, letterSpacing: '0.12em'}}>那称之为世界</div>
    <div style={{fontFamily: 'MVJP', fontSize: 24, marginTop: 21, letterSpacing: '0.14em', opacity: 0.7}}>花譜 × 小初</div>
  </div>;
};

export const FullMV = ({audioSrc = null}: {audioSrc?: string | null}) => {
  const frame = useCurrentFrame();
  useMVFonts();
  let index = fullShots.findIndex(shot => frame >= shot.start && frame < shot.end);
  if (index < 0) index = fullShots.length - 1;
  const shot = fullShots[index];
  const cue = data.cues.find(item => frame >= item.startFrame && frame < item.endFrame);
  const last = index === fullShots.length - 1;
  const finalTitle = last ? range(frame, shot.start + 24, 28) * (1 - range(frame, fullDuration - 42, 40)) : 0;
  return <AbsoluteFill style={{background: '#e6ede4', overflow: 'hidden'}}>
    {audioSrc ? <Audio src={staticFile(audioSrc)}/> : null}
    <Scene shot={shot} frame={frame} index={index}/>
    <SceneTransition shot={shot} frame={frame} index={index}/>
    <OpeningTitles frame={frame}/>
    {cue ? <BilingualLyrics cue={cue} frame={frame} layout={lyricLayout(shot)}/> : null}
    {last ? <div style={{position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', opacity: finalTitle, color: '#405e6b'}}>
      <div style={{fontFamily: 'MVJP', fontSize: 74, letterSpacing: '0.04em'}}>それを世界と言うんだね</div>
      <div style={{fontFamily: 'MVSC', fontSize: 36, marginTop: 27, letterSpacing: '0.16em'}}>那称之为世界</div>
      <div style={{width: 74, height: 2, background: '#b995aa', margin: '36px 0 27px'}}/>
      <div style={{fontFamily: 'MVJP', fontSize: 28, letterSpacing: '0.15em'}}>花譜 / 小初</div>
    </div> : null}
    <AbsoluteFill style={{background: '#fff8ed', opacity: range(frame, fullDuration - 23, 22), pointerEvents: 'none'}}/>
  </AbsoluteFill>;
};
