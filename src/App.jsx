import { Canvas } from '@react-three/fiber';
import { Experience } from './components/Experience';
import { Bloom, EffectComposer } from '@react-three/postprocessing';
import { Suspense } from 'react';
import { Loader } from '@react-three/drei';

function App() {
  return (
    <>
      <Canvas shadows camera={{ position: [3, 3, 5], fov: 42 }}>
        <color attach="background" args={['#ececec']} />
        <Suspense fallback={null}>
          <Experience />

          <EffectComposer>
            <Bloom luminanceThreshold={1} intensity={1.25} mipmapBlur />
          </EffectComposer>
        </Suspense>
      </Canvas>
      <Loader />
    </>
  );
}

export default App;
