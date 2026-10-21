import {useEffect, useState} from 'react';
import {AbsoluteFill, Audio, cancelRender, delayRender, continueRender, staticFile, useCurrentFrame} from 'remotion';
import {GeneratedCharacter} from '../characters/GeneratedCharacter';
import {Classroom, PaperBirds, Rooftop, SkyWorld, WindLines} from '../scenes/Worlds';
import {DepthPaper} from '../effects/DepthPaper';
import {MotionText, type LyricCue} from '../typography/MotionText';
import {range} from '../timing/motion';

const studyCues: LyricCue[] = [
  {id: 'title-1', startFrame: 18, endFrame: 158, text: 'それを', style: 'stagger', x: 162, y: 288, size: 100},
  {id: 'title-2', startFrame: 44, endFrame: 166, text: '世界', style: 'cutout', x: 166, y: 412, size: 166},
  {id: 'title-3', startFrame: 78, endFrame: 174, text: 'と言うんだね', style: 'ribbon', x: 170, y: 654, size: 48},
  {id: 'title-4', startFrame: 213, endFrame: 326, text: 'それを', style: 'cutout', x: 1080, y: 298, size: 102},
  {id: 'title-5', startFrame: 361, endFrame: 474, text: '世界', style: 'orbit', x: 1090, y: 305, size: 152},
  {id: 'title-6', startFrame: 505, endFrame: 590, text: 'と言うんだね', style: 'stagger', x: 1030, y: 415, size: 64},
  {id: 'title-7', startFrame: 630, endFrame: 716, text: 'それを世界と言うんだね', style: 'cutout', x: 302, y: 190, size: 67},
];

export type MotionStudyProps = {audioSrc: string | null; audioOffsetFrames: number; enableDepth: boolean; lyrics: LyricCue[]; sceneCuts?: number[]; envelope?: number[];};

const useJapaneseFont = () => {
  const [handle] = useState(() => delayRender('Load local Japanese font'));
  useEffect(() => {
    let active = true;
    const font = new FontFace('MVJapanese', `url(${staticFile('fonts/MVJP-Subset.otf')})`, {weight: '700'});
    font.load().then(loaded => {document.fonts.add(loaded); if (active) continueRender(handle);}).catch(e => {if (active) cancelRender(e);});
    return () => {active = false;};
  }, [handle]);
};

export const MotionStudy = ({audioSrc, audioOffsetFrames, enableDepth, lyrics, sceneCuts, envelope}: MotionStudyProps) => {
  const frame = useCurrentFrame();
  useJapaneseFont();
  const cuts = sceneCuts ?? [180, 330, 480, 600];
  const scene = cuts.filter(cut => frame >= cut).length;
  const local = frame - [0, ...cuts][scene];
  const energy = envelope?.[frame + audioOffsetFrames] ?? 0;
  const titleCues = lyrics.length ? lyrics : studyCues;
  return <AbsoluteFill style={{background: '#d8e9e3', overflow: 'hidden'}}>
    {audioSrc ? <Audio src={staticFile(audioSrc)} trimBefore={audioOffsetFrames}/> : null}
    {scene === 0 ? <>
      <div style={{position: 'absolute', inset: -22, transform: `scale(${1 + local * 0.00012}) translateX(${-local * 0.05}px)`}}><Rooftop frame={local}/></div>
      <GeneratedCharacter frame={frame} pose="front" x={1070 - local * 0.2} y={98 - local * 0.05 - energy * 1.5} width={770}/>
      <WindLines frame={frame}/>
    </> : null}
    {scene === 1 ? <>
      <Classroom frame={local}/>
      <GeneratedCharacter frame={frame} pose="look-back" x={140 + local * 0.05} y={126} width={760}/>
      <div style={{position: 'absolute', left: 760, top: 0, width: 68, height: 1080, background: '#eee4d0', transform: `translateX(${-local * 0.35}px)`, boxShadow: '16px 0 0 #f8f0dc'}}/>
    </> : null}
    {scene === 2 ? <>
      <SkyWorld frame={local}/>
      {enableDepth ? <DepthPaper frame={local}/> : null}
      <GeneratedCharacter frame={frame} pose="open-hand" x={160 - local * 0.09} y={143} width={725}/>
      <PaperBirds frame={frame}/>
    </> : null}
    {scene === 3 ? <>
      <Rooftop frame={local} warm/>
      <div style={{position: 'absolute', inset: 0, background: '#fff4e1', opacity: 0.3}}/>
      <GeneratedCharacter frame={frame} pose="smile" x={64 - local * 0.17} y={-126 + local * 0.07} width={1190}/>
      <WindLines frame={frame}/>
    </> : null}
    {scene === 4 ? <>
      <Rooftop frame={local} warm/>
      <GeneratedCharacter frame={frame} pose="look-up" x={660} y={330 + local * 0.03} width={485 - local * 0.08} fullBody/>
      <PaperBirds frame={frame} count={5}/>
    </> : null}
    {titleCues.map(cue => <MotionText key={cue.id} cue={cue} frame={frame}/>)}
    {cuts.map((cut, i) => {
      const t = frame - cut;
      if (t < -11 || t > 13) return null;
      const x = -2300 + range(t, -11, 24) * 4700;
      return <div key={cut} style={{position: 'absolute', left: x, top: -300, width: 2200, height: 1700, transform: `rotate(${i % 2 ? -14 : 14}deg)`, background: i % 2 ? '#d5e6dd' : '#fff8e8', borderLeft: '32px solid #e7c2cb', borderRight: '18px solid #a6c7cb'}}/>;
    })}
    <div style={{position: 'absolute', inset: 0, background: '#fff8ed', opacity: 1 - range(frame, 0, 18), pointerEvents: 'none'}}/>
  </AbsoluteFill>;
};
