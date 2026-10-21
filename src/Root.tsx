import {Composition} from 'remotion';
import {FullMV, fullDuration} from './compositions/FullMV';
import {EnvironmentCheck} from './technical/EnvironmentCheck';
import {MotionStudy} from './compositions/MotionStudy';
import {Preview} from './compositions/Preview';
import {CharacterGallery} from './compositions/CharacterGallery';

export const Root = () => (<>
  <Composition id="FullMV-JA-ZH" component={FullMV} width={1920} height={1080} fps={30} durationInFrames={fullDuration} defaultProps={{audioSrc: null}}/>
  <Composition id="Preview-Recombined-ASR" component={Preview} width={1920} height={1080} fps={30} durationInFrames={900} />
  <Composition id="CharacterGallery" component={CharacterGallery} width={1920} height={1280} fps={30} durationInFrames={1}/>
  <Composition
    id="MotionStudy-Silent"
    component={MotionStudy}
    width={1920}
    height={1080}
    fps={30}
    durationInFrames={720}
    defaultProps={{audioSrc: null, audioOffsetFrames: 0, enableDepth: true, lyrics: []}}
  />
  <Composition
    id="EnvironmentCheck"
    component={EnvironmentCheck}
    width={1920}
    height={1080}
    fps={30}
    durationInFrames={60}
  />
</>);
