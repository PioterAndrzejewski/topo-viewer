import { useState, Suspense, useEffect } from "react";
import "./App.css";
import { OrbitControls } from "@react-three/drei/core";
import { Box } from "@react-three/drei/core";
import { Vector3 } from "three";
import { ThreeEvent } from "@react-three/fiber";
import { Canvas } from "@react-three/fiber";
import Rock from "./components/Rock";
import Route from "./components/Route";
import PositionHandler from "./components/PositionHandler";

export type Coordinates = [number, number, number];

function App() {
  const [target, setTarget] = useState<Coordinates>([0, 0, 0]);
  const [activeRoute, setActiveRoute] = useState<null | string>(null);

  useEffect(() => {
    console.log(target);
  }, [target]);

  const routes = ["droga_001", "droga_002", "droga_003", "droga_004"];

  const handleTargetChange = (
    name: string | null,
    coordinates: Coordinates,
  ) => {
    setActiveRoute(name);
    setTarget(coordinates);
  };

  return (
    <div className='h-screen w-full'>
      <Canvas>
        <OrbitControls target={target} />
        <ambientLight intensity={0.4} />
        <directionalLight position={[0, 5, 5]} />
        <Box
          position={[10, 10, 10]}
          onClick={(obj: ThreeEvent<MouseEvent>) =>
            setTarget([
              obj.object.position.x,
              obj.object.position.y,
              obj.object.position.z,
            ])
          }
        >
          <meshBasicMaterial color='red' />
        </Box>
        <Suspense fallback={null}>
          <Rock onClick={handleTargetChange} />
        </Suspense>
        {routes.map((route) => {
          return (
            <Suspense key={route}>
              <Route
                name={route}
                onClick={handleTargetChange}
                isActive={route === activeRoute}
              />
            </Suspense>
          );
        })}
        <PositionHandler target={target} activeRoute={activeRoute} />
      </Canvas>
    </div>
  );
}

export default App;
