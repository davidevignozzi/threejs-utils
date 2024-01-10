import { useEffect } from 'react';
import * as THREE from 'three';
import { useScroll } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';

export const useExplode = (
  group,
  { distance = 3, enableRotation = true }
) => {
  useEffect(() => {
    /**
     * Group position => Origin
     */
    const groupWorldPosition = new THREE.Vector3();
    group.current.getWorldPosition(groupWorldPosition);

    group.current.children.forEach((mesh) => {
      /**
       * Each Mesh position
       */
      mesh.originalPosition = mesh.position.clone();
      const meshWorldPosition = new THREE.Vector3();
      mesh.getWorldPosition(meshWorldPosition);

      /**
       * Distance between the group position (origin)
       * and the mesh position
       */
      mesh.directionVector = meshWorldPosition
        .clone()
        .sub(groupWorldPosition)
        .normalize();

      /**
       * Rotation of each mesh at start
       */
      mesh.originalRotation = mesh.rotation.clone();

      /**
       * Random rotation for each mesh
       * will have it at the end of the animation
       */
      mesh.targetRotation = new THREE.Euler(
        Math.random() * Math.PI,
        Math.random() * Math.PI,
        Math.random() * Math.PI
      );
    });
  }, []);

  useEffect(() => {
    /**
     * Group position => Origin
     */
    const groupWorldPosition = new THREE.Vector3();
    group.current.getWorldPosition(groupWorldPosition);

    group.current.children.forEach((mesh) => {
      /**
       * Increase the distance between the group position (origin)
       * and the mesh position.
       * In this way we calculate the target position
       * (Where the mesh will be on scroll)
       */
      mesh.targetPosition = mesh.originalPosition
        .clone()
        .add(mesh.directionVector.clone().multiplyScalar(distance));
    });
  }, [distance]);

  const scrollData = useScroll();

  useFrame(() => {
    group.current.children.forEach((mesh) => {
      /**
       * Hide original on scroll
       */
      if (scrollData < 0.00001) {
        if (mesh.name === 'origin') {
          mesh.visible = true;
        } else {
          mesh.visible = false;
        }
      } else {
        if (mesh.name === 'origin') {
          mesh.visible = false;
        } else {
          mesh.visible = true;
        }
      }

      /**
       * Animate position of each mesh on scroll
       */
      mesh.position.x = THREE.MathUtils.lerp(
        mesh.originalPosition.x,
        mesh.targetPosition.x,
        scrollData.offset // 0 at the beginning and 1 after scroll
      );

      mesh.position.y = THREE.MathUtils.lerp(
        mesh.originalPosition.y,
        mesh.targetPosition.y,
        scrollData.offset // 0 at the beginning and 1 after scroll
      );

      mesh.position.z = THREE.MathUtils.lerp(
        mesh.originalPosition.z,
        mesh.targetPosition.z,
        scrollData.offset // 0 at the beginning and 1 after scroll
      );

      /**
       * Roatate each mesh
       */
      if (enableRotation) {
        mesh.rotation.x = THREE.MathUtils.lerp(
          mesh.originalRotation.x,
          mesh.targetRotation.x,
          scrollData.offset // 0 at the beginning and 1 after scroll
        );

        mesh.rotation.y = THREE.MathUtils.lerp(
          mesh.originalRotation.y,
          mesh.targetRotation.y,
          scrollData.offset // 0 at the beginning and 1 after scroll
        );

        mesh.rotation.z = THREE.MathUtils.lerp(
          mesh.originalRotation.z,
          mesh.targetRotation.z,
          scrollData.offset // 0 at the beginning and 1 after scroll
        );
      }
    });
  });
};
