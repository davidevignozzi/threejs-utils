import * as THREE from 'three';
import {
  CameraControls,
  Environment,
  MeshPortalMaterial,
  RoundedBox,
  Text,
  useCursor,
  useTexture
} from '@react-three/drei';
import { Fish } from './Fish';
import { Dragon_Evolved } from './Dragon_Evolved';
import { Cactoro } from './Cactoro';
import { useEffect, useRef, useState } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import { easing } from 'maath';

export const Experience = () => {
  const [active, setActive] = useState(null);
  const [hovered, setHovered] = useState(null);
  const controlsRef = useRef();
  const scene = useThree((state) => state.scene);

  useCursor(hovered);

  useEffect(() => {
    if (active) {
      const targetPosition = new THREE.Vector3();
      scene.getObjectByName(active).getWorldPosition(targetPosition);
      controlsRef.current.setLookAt(
        0,
        0,
        5,
        targetPosition.x,
        targetPosition.y,
        targetPosition.z,
        true
      );
    } else {
      controlsRef.current.setLookAt(0, 0, 10, 0, 0, 0, true);
    }
  }, [active]);

  return (
    <>
      <ambientLight intensity={0.5} />
      <Environment preset="sunset" />
      <CameraControls ref={controlsRef} maxPolarAngle={Math.PI / 2} minPolarAngle={Math.PI / 6} />
      <MonsterStage
        texture={'textures/anime_water_world.jpg'}
        name={'Fish King'}
        color={'#38adcf'}
        position-z={-0.4}
        active={active}
        setActive={setActive}
        hovered={hovered}
        setHovered={setHovered}
      >
        <Fish scale={0.6} position-y={-1} hovered={hovered === 'Fish King'} />
      </MonsterStage>

      <MonsterStage
        texture={'textures/anime_erupting_volcano_world.jpg'}
        name={'Dragon'}
        color={'#df8d52'}
        position-x={-2.5}
        rotation-y={Math.PI / 8}
        active={active}
        setActive={setActive}
        hovered={hovered}
        setHovered={setHovered}
      >
        <Dragon_Evolved scale={0.5} position-y={-1} hovered={hovered === 'Dragon'} />
      </MonsterStage>

      <MonsterStage
        texture={'textures/anime_cactus_forest_world.jpg'}
        name={'Cactoro'}
        color={'#32c944'}
        position-x={2.5}
        rotation-y={-Math.PI / 8}
        active={active}
        setActive={setActive}
        hovered={hovered}
        setHovered={setHovered}
      >
        <Cactoro scale={0.45} position-y={-1} hovered={hovered === 'Cactoro'} />
      </MonsterStage>
    </>
  );
};

const MonsterStage = ({
  children,
  texture,
  name,
  color,
  active,
  setActive,
  hovered,
  setHovered,
  ...props
}) => {
  /**
   * Texture
   */
  const map = useTexture(texture);

  const portalMaterial = useRef();

  useFrame((_state, delta) => {
    const worldOpen = active === name;
    easing.damp(portalMaterial.current, 'blend', worldOpen ? 1 : 0, 0.2, delta);
  });

  return (
    <group {...props}>
      <Text
        font="fonts/Caprasimo-Regular.ttf"
        fontSize={0.3}
        position={[0, -1.4, 0.051]}
        anchorY={'bottom'}
      >
        {name}
        <meshBasicMaterial color={color} toneMapped={false} />
      </Text>
      <RoundedBox
        name={name}
        args={[2, 3, 0.1]}
        onPointerEnter={() => setHovered(name)}
        onPointerLeave={() => setHovered(null)}
        onDoubleClick={() => setActive(active === name ? null : name)}
      >
        <MeshPortalMaterial
          ref={portalMaterial}
          side={THREE.DoubleSide}
          // blend={active === name ? 1 : 0}
        >
          <ambientLight intensity={1} />
          <Environment preset="sunset" />
          {children}
          <mesh>
            <sphereGeometry args={[5, 64, 64]} />
            <meshStandardMaterial map={map} side={THREE.BackSide} />
          </mesh>
        </MeshPortalMaterial>
      </RoundedBox>
    </group>
  );
};
