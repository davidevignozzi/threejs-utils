import { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { Leva, useControls } from 'leva';
import { Perf } from 'r3f-perf';
import { Loader } from '@react-three/drei';
import Experience from './compontents/Experience';

function App() {
  /**
   * Tweek it in leva to make Perf Visible
   */
  const { perfVisible } = useControls({
    perfVisible: false
  });

  return (
    <>
      <Leva collapsed />
      <Canvas shadows camera={{ position: [3, 3, 3], fov: 30 }}>
        <color attach="background" args={['#ececec']} />
        {perfVisible && <Perf position="top-left" />}
		<Suspense fallback={null}>
		  <Experience />
		</Suspense>
      </Canvas>
	  <Loader />
    </>
  );
}

export default App;
