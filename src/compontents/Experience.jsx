import { useState } from 'react';
import { OrbitControls } from '@react-three/drei';
import { button, useControls } from 'leva';
import ExplosionConfetti from './ExplosionConfetti';

const Experience = () => {
  const [isConfettiExploding, setIsConfettiExploding] = useState(false);

  /**
   * Tweek those to start or stop Confetti Animation
   */
  const startConfettiExplosion = useControls('Confetti', {
    start: button(() => {
      setIsConfettiExploding(true);
    }),
    stop: button(() => {
      setIsConfettiExploding(false);
    })
  });

  return (
    <>
      <OrbitControls />

      <mesh>
        <boxGeometry />
        <meshNormalMaterial />
      </mesh>

      <ExplosionConfetti
        isExploding={isConfettiExploding} // default => false //	Enable exploding (Start the confetti).
        amount={50} // default => 100 // The amount of particles.
        rate={2} // default => 3 // Increases or decreases the frequency for particles. Don't set it too high.
        radius={8} // default => 15 // The radius of each explosion.
        areaWidth={1} // default => 3 // The area width for explosion.
        areaHeight={0} // default => 1 // The area width for explosion.
        fallingHeight={5} // default => 10 // 	Height for the particles to fall from
        fallingSpeed={2} // default => 8 // The speed of particles.
        colors={[0x0000ff, 0xff0000, 0xffff00]} // default [0x0000ff, 0xff0000, 0xffff00] //Array of Hex color codes for particles.
        enableShadows={false} // default => false // 	Enable particle shadows. Set false for better performance.
      />
    </>
  );
};

export default Experience;
