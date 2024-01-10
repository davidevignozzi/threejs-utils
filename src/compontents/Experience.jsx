import { Environment, Float, OrbitControls } from '@react-three/drei';
import Heart from './Heart';
import Banana from './Banana';
import { useControls } from 'leva';

const Experience = () => {
  /**
   * Select Item
   */
  const { item } = useControls({
    item: {
      value: 'heart',
      options: ['heart', 'banana']
    }
  });

  return (
    <>
      <OrbitControls enableZoom={false} />

      <Environment preset="sunset" background blur={0.4} />

      <Float floatIntensity={1} speed={2}>
        <Heart scale={0.25} visible={item === 'heart'} />
        <Banana scale={0.15} visible={item === 'banana'} />
      </Float>
    </>
  );
};

export default Experience;
