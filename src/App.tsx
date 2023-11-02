import { useState, Suspense, useEffect } from "react";
import "./App.css";
import { Canvas } from "@react-three/fiber";

import Rock from "./components/Rock";
import Route from "./components/Route";

import { useRock } from "./hooks/useRock";

function App() {
  const [activeRoute, setActiveRoute] = useState<null | string>(null);
  const { modelUrl, materialUrl, routes } = useRock(
    window.location.pathname.split("/")[1],
  );

  useEffect(() => {
    const messageHandler = (event: any) => {
      if (event.data) return setActiveRoute(event.data);
      setActiveRoute(null);
    };
    window.addEventListener("message", messageHandler);

    return () => {
      window.removeEventListener("message", messageHandler);
    };
  }, []);

  const handleTargetChange = (
    name: string | null
  ) => {
    setActiveRoute(name);
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
          routes.map((route, index) => (
            <Suspense key={route.uuid}>
              <Route
                name={route.name}
                uuid={route.uuid}
                pathUrl={route.pathUrl}
                ringsUrl={route.ringsUrl}
                onClick={handleTargetChange}
                isActive={route.uuid === activeRoute}
                outlineUrl={route.outlineUrl}
                index={index}
              />
            </Suspense>
          ))}
      </Canvas>
    </div>
  );
}

export default App;
