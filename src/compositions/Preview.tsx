import {MotionStudy, type MotionStudyProps} from './MotionStudy';
import audioPreview from '../audio-preview.json';

// Keep generated analysis data out of Studio's editable default-props inspector.
// Editorial cue changes belong in audio-preview.json, not a 900-item UI array.
export const Preview = () => <MotionStudy {...(audioPreview as MotionStudyProps)} audioSrc={null}/>;
