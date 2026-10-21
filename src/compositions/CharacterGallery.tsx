import {AbsoluteFill, Img, staticFile} from 'remotion';
import {characterFiles, type CharacterPose} from '../characters/GeneratedCharacter';

const poses: {pose: CharacterPose; label: string}[] = [
  {pose: 'front', label: '01 迎风站立'},
  {pose: 'look-back', label: '02 回望'},
  {pose: 'open-hand', label: '03 伸手'},
  {pose: 'smile', label: '04 闭眼微笑'},
  {pose: 'walk-key', label: '05 行走关键姿势'},
  {pose: 'look-up', label: '06 抬头看天空'},
];

export const CharacterGallery = () => <AbsoluteFill style={{background: '#edf3ed', fontFamily: 'sans-serif'}}>
  {poses.map(({pose, label}, i) => <div key={pose} style={{position: 'absolute', left: (i % 3) * 640, top: Math.floor(i / 3) * 640, width: 640, height: 640, borderRight: '1px solid #ccddd5', borderBottom: '1px solid #ccddd5', boxSizing: 'border-box'}}>
    <Img src={staticFile(`characters/${characterFiles[pose]}`)} style={{position: 'absolute', left: 127, top: 12, width: 386, height: 579, objectFit: 'contain'}}/>
    <div style={{position: 'absolute', left: 0, right: 0, bottom: 18, textAlign: 'center', fontSize: 23, color: '#496979'}}>{label}</div>
  </div>)}
</AbsoluteFill>;
