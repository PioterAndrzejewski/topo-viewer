import { useState, Suspense, useEffect } from "react";
import "./App.css";
import { Canvas } from "@react-three/fiber";
import Rock from "./components/Rock";
import Route from "./components/Route";
import PositionHandler from "./components/PositionHandler";
import axios from "axios";

export type Coordinates = [number, number, number];

export const authService = axios.create({
  headers: {
    Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwiaWF0IjoxNjk2Mjg0MzQwLCJleHAiOjE2OTg4NzYzNDB9.tGMSOY6BCd4CpuuzCFOqciy-E8r4ktYTTkz4KMGrZGI`,
  },
});

function App() {
  const [target, setTarget] = useState<Coordinates>([0, 0, 0]);
  const [activeRoute, setActiveRoute] = useState<null | string>(null);
  const [modelUrl, setModelUrl] = useState("");

  // useEffect(() => {
  //   const handleLogin = async () => {
  //     const { data } = await axios.post(
  //       "http://localhost:1337/api/auth/local/",
  //       {
  //         identifier: "mikel@aaa.pl",
  //         password: "password",
  //       },
  //     );
  //     console.log(data);
  //   };
  //   handleLogin();
  // }, []);

  useEffect(() => {
    const handleGetModel = async () => {
      const { data } = await authService.get(
        "http://192.168.50.223:1337/api/models/1?populate=*",
      );
      console.log(data.data.attributes.model_main.data.attributes.url);
      setModelUrl(data.data.attributes.model_main.data.attributes.url);
    };
    handleGetModel();
  }, []);

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
