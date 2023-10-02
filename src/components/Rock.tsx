import { useTexture } from "@react-three/drei";
import { useLoader } from "@react-three/fiber";
import { useMemo } from "react";
import { Mesh } from "three";
import { OBJLoader } from "three/examples/jsm/loaders/OBJLoader";

const Rock = () => {
  const obj = useLoader(OBJLoader, "/model/model-1.obj");
  const texture = useTexture("/model/model.webp");
  const geometry = useMemo(() => {
    let g;
    obj.traverse((c) => {
      if (c.type === "mesh") {
        const _c = c as Mesh;
        g = _c.geometry;
      }
    });
    return g;
  }, [obj]);

  return (
    <mesh geometry={geometry} scale={100}>
      <meshPhysicalMaterial map={texture} />
    </mesh>
  );
};

export default Rock;
