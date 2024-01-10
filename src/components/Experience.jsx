import * as THREE from 'three';
import { ContactShadows, Environment, OrbitControls } from '@react-three/drei';
import { DissolveMaterial } from './DissolveMaterial';
import { useControls } from 'leva';
import { useState } from 'react';
import Table from './Table';
import Chair from './Chair';

const boxMaterial = new THREE.MeshStandardMaterial({ color: '#ffffff' });
const sphereMaterial = new THREE.MeshStandardMaterial({ color: '#ffffff' });

export const Experience = () => {
  const { itemDisplayed } = useControls({
    itemDisplayed: {
      value: 'box',
      options: ['box', 'sphere', 'table', 'chair']
    }
  });

  // Will impact the visibility of the mesh, the rendering of the mesh
  const [visibleItem, setVisibleItem] = useState(itemDisplayed);

  // Will impact the value of the progresion of the DissolveMaterial
  const onFadeOut = () => {
    setVisibleItem(itemDisplayed);
  };

  return (
    <>
      <OrbitControls />

      {
        /**
         * Box
         */
        visibleItem === 'box' && (
          <mesh>
            <boxGeometry />
            <DissolveMaterial
              baseMaterial={boxMaterial}
              visible={itemDisplayed === 'box'}
              onFadeOut={onFadeOut}
              color="#0082b2"
            />
          </mesh>
        )
      }

      {
        /**
         * Sphere
         */
        visibleItem === 'sphere' && (
          <mesh scale={0.5}>
            <sphereGeometry />
            <DissolveMaterial
              baseMaterial={sphereMaterial}
              visible={itemDisplayed === 'sphere'}
              onFadeOut={onFadeOut}
              color="#00c11e"
            />
          </mesh>
        )
      }

      {
        /**
         * Table
         */
        visibleItem === 'table' && (
          <Table dissolveVisible={itemDisplayed === 'table'} onFadeOut={onFadeOut} />
        )
      }

      {
        /**
         * Chair
         */
        visibleItem === 'chair' && (
          <Chair dissolveVisible={itemDisplayed === 'chair'} onFadeOut={onFadeOut} />
        )
      }

      {/* Lights */}
      <Environment preset="sunset" />

      {/* Shadow */}
      <ContactShadows position-y={-1} />
    </>
  );
};
