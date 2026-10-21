import {ThreeCanvas} from '@remotion/three';
import {seeded} from '../timing/motion';

// Sparse flat paper facets. Positions are analytic, so seeking and parallel renders agree.
export const DepthPaper = ({frame}: {frame: number}) => <div style={{position: 'absolute', inset: 0, pointerEvents: 'none'}}>
  <ThreeCanvas width={1920} height={1080} camera={{position: [0, 0, 10], fov: 45}} gl={{alpha: true, antialias: true}}>
    {Array.from({length: 13}, (_, i) => {
      const s = seeded(i + 55);
      const x = ((i * 2.61 + frame / 130) % 16) - 8;
      const y = Math.sin(frame / 85 + i * 0.7) * 1.6 + (s - 0.5) * 3;
      return <mesh key={i} position={[x, y, -s * 5]} rotation={[frame / 100 + i, frame / 180 + i, frame / 200]} scale={0.11 + s * 0.1}>
        <planeGeometry args={[0.9, 1.6]}/>
        <meshBasicMaterial color={i % 3 ? '#f7f4df' : '#e7b4c3'} side={2} transparent opacity={0.75}/>
      </mesh>;
    })}
  </ThreeCanvas>
</div>;
