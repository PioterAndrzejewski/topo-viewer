import { useState, Suspense } from "react";
import "./App.css";
import { OrbitControls } from "@react-three/drei/core";
import { Box } from "@react-three/drei/core";
import { Vector3 } from "three";
import { ThreeEvent } from "@react-three/fiber";
import { Canvas } from "@react-three/fiber";
import Rock from "./components/Rock";

function App() {
  const [target, setTarget] = useState<Vector3 | undefined>(undefined);

  return (
    <div className='h-screen w-full'>
      <Canvas>
        <OrbitControls
          target={target}
          onDoubleClick={() => setTarget(undefined)}
        />
        <ambientLight intensity={0.4} />
        <directionalLight position={[0, 5, 5]} />
        <Box
          position={[10, 10, 10]}
          onClick={(obj: ThreeEvent<MouseEvent>) =>
            setTarget(obj.object.position)
          }
        >
          <meshBasicMaterial color='red' />
        </Box>
        <Suspense fallback={null}>
          <Rock />
        </Suspense>
      </Canvas>
    </div>
  );
}

export default App;
