import {Img, staticFile} from 'remotion';

export type CharacterPose = 'front' | 'look-back' | 'open-hand' | 'smile' | 'walk-key' | 'look-up' | 'reading';
export const characterFiles: Record<CharacterPose, string> = {
  front: '01-front-breeze.png',
  'look-back': '02-look-back.png',
  'open-hand': '03-open-hand.png',
  smile: '04-eyes-closed-smile.png',
  'walk-key': '05-walk-key-a.png',
  'look-up': '06-look-up.png',
  reading: '07-reading.png',
};

// Complete model-generated key poses. No SVG character geometry or fake part rig.
// Motion here is a subtle whole-character hold; independent body-part motion is
// only possible once corresponding separate assets/animation frames are made.
export const GeneratedCharacter = ({frame, x, y, width, pose, fullBody = false}: {
  frame: number; x: number; y: number; width: number; pose: CharacterPose; fullBody?: boolean;
}) => {
  const imageWidth = fullBody ? width : width * 1.7;
  const imageHeight = imageWidth * 1.5;
  const left = fullBody ? x : x + width * 0.49 - imageWidth * 0.44;
  const top = fullBody ? y : y + width * 0.43 - imageHeight * 0.15;
  const hold = Math.sin(frame / 52) * 1.4;
  return <div style={{position: 'absolute', left, top: top + hold, width: imageWidth, height: imageHeight}}>
    <Img src={staticFile(`characters/${characterFiles[pose]}`)} alt={`小初：${pose}`} style={{width: '100%', height: '100%', objectFit: 'contain'}}/>
  </div>;
};
