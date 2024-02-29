'use client';

import { useRef } from 'react';
import {
  MeshTransmissionMaterial,
  Text,
  useGLTF
} from '@react-three/drei';
import { useFrame, useThree } from '@react-three/fiber';
import { useControls } from 'leva';

const Model = () => {
  const meshRef = useRef();
  const { nodes } = useGLTF('/medias/torrus.glb');
  const { viewport } = useThree();

  useFrame(() => {
    // @ts-ignore
    meshRef.current.rotation.x += 0.02;
  });

  const materialProps = useControls({
    thickness: { value: 0.2, min: 0, max: 3, step: 0.05 },
    roughness: { value: 0, min: 0, max: 1, step: 0.1 },
    transmission: { value: 1, min: 0, max: 1, step: 0.1 },
    ior: { value: 1.2, min: 0, max: 3, step: 0.1 },
    chromaticAberration: { value: 0.02, min: 0, max: 1 },
    backside: { value: true }
  });

  return (
    <group scale={viewport.width / 3.5}>
      <Text
        font={'/fonts/PPNeueMontreal-Bold.otf'}
        characters='HeloWrd!'
        position={[0, 0, -1]}
        fontSize={0.5}
        color='white'
        anchorX='center'
        anchorY='middle'
      >
        Hello World!
      </Text>

      {/* @ts-ignore */}
      <mesh ref={meshRef} {...nodes.Torus002}>
        <MeshTransmissionMaterial {...materialProps} />
      </mesh>
    </group>
  );
};
export default Model;
