import { useState, Suspense } from "react";
import "./App.css";
import { Canvas } from "@react-three/fiber";

import Rock from "./components/Rock";
import Route from "./components/Route";
import PositionHandler from "./components/PositionHandler";

import { Coordinates } from "./types/types";
import { useRock } from "./hooks/useRock";

function App() {
  const [target, setTarget] = useState<Coordinates>([0, 0, 0]);
  const [activeRoute, setActiveRoute] = useState<null | string>(null);
  const { modelUrl, materialUrl, routes } = useRock(
    "7bdea9b7-41c1-4d30-8894-663f6c9f25f2",
  );

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
        <ambientLight intensity={2} />
        <directionalLight position={[0, 5, 5]} />
        <Suspense fallback={null}>
          <Rock
            onClick={handleTargetChange}
            targetRoute={activeRoute}
            modelUrl={modelUrl}
            materialUrl={materialUrl}
          />
        </Suspense>
        {routes &&
          routes.map((route) => (
            <Suspense key={route.uuid}>
              <Route
                name={route.name}
                uuid={route.uuid}
                pathUrl={route.pathUrl}
                ringsUrl={route.ringsUrl}
                onClick={handleTargetChange}
                isActive={route.uuid === activeRoute}
                outlineUrl={route.outlineUrl}
              />
            </Suspense>
          ))}
        <PositionHandler
          target={target}
          activeRoute={
            routes?.find((route) => route.uuid === activeRoute) || null
          }
        />
      </Canvas>
    </div>
  );
}

export default App;
