import { Canvas } from '@react-three/fiber';
import { Experience } from './components/Experience';
import { Suspense } from 'react';
import { Loader } from '@react-three/drei';

function App() {
  return (
    <>
      <Canvas shadows camera={{ position: [0, 0, 10], fov: 30 }}>
        <Suspense fallback={null}>
          <Experience />
        </Suspense>
      </Canvas>
      <Loader />
    </>
  );
}

export default App;
