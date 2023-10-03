import { useState, Suspense, useEffect } from "react";
import "./App.css";
import { Canvas } from "@react-three/fiber";

import Rock from "./components/Rock";
import Route from "./components/Route";
import PositionHandler from "./components/PositionHandler";

import { Coordinates } from "./types/types";
import { authService } from "./services/auth";
import { useModel } from "./hooks/useModel";

function App() {
  const [target, setTarget] = useState<Coordinates>([0, 0, 0]);
  const [activeRoute, setActiveRoute] = useState<null | string>(null);
  const { modelUrl, materialUrl } = useModel("1");

  const routes = [
    "droga_001",
    "droga_002",
    "droga_003",
    "droga_004",
    "droga_005",
    "droga_006",
    "droga_007",
  ];

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
        <ambientLight intensity={0.4} />
        <directionalLight position={[0, 5, 5]} />
        <Suspense fallback={null}>
          <Rock
            onClick={handleTargetChange}
            targetRoute={activeRoute}
            modelUrl={modelUrl}
            materialUrl={materialUrl}
          />
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
