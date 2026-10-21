import {AbsoluteFill, useCurrentFrame, useVideoConfig} from 'remotion';
import {ThreeCanvas} from '@remotion/three';

// An explicit technical probe, never a substitute for an MV sample.
// Every animation derives from the requested frame, including the R3F scene.
export const EnvironmentCheck = () => {
  const frame = useCurrentFrame();
  const {fps, width, height} = useVideoConfig();
  const time = frame / fps;
  return (
    <AbsoluteFill style={{backgroundColor: '#101824', color: '#e4eaf1', fontFamily: 'sans-serif'}}>
      <ThreeCanvas width={width} height={height} camera={{position: [0, 0, 5], fov: 40}}>
        <ambientLight intensity={0.6} />
        <directionalLight position={[3, 4, 5]} intensity={2} />
        <mesh rotation={[time * 0.2, time * 0.5, 0]}>
          <torusKnotGeometry args={[0.8, 0.18, 96, 12]} />
          <meshStandardMaterial color="#8fbdcc" roughness={0.65} metalness={0.1} />
        </mesh>
      </ThreeCanvas>
      <svg width={width} height={height} style={{position: 'absolute'}}>
        <line x1={120} y1={920} x2={1800} y2={920} stroke="#34465a" strokeWidth={3} />
        <circle cx={120 + (frame / 59) * 1680} cy={920} r={10} fill="#a3cdd4" />
      </svg>
      <div style={{position: 'absolute', top: 84, left: 120, fontSize: 32}}>LOCAL RENDER ENVIRONMENT CHECK</div>
      <div style={{position: 'absolute', top: 134, left: 120, fontSize: 22, opacity: 0.65}}>
        Technical test only. Character and master audio are pending.
      </div>
      <div style={{position: 'absolute', bottom: 76, left: 120, fontSize: 24, fontVariantNumeric: 'tabular-nums'}}>
        Frame {String(frame).padStart(3, '0')} / 059 · {width} × {height} · {fps} FPS
      </div>
    </AbsoluteFill>
  );
};
