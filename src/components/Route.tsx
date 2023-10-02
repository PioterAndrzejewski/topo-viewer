import { useTexture } from "@react-three/drei";
import { useLoader, useThree } from "@react-three/fiber";
import { useMemo, type FC } from "react";
import { Mesh } from "three";
import { OBJLoader } from "three/examples/jsm/loaders/OBJLoader";
import { Vector3 } from "three";

type RockProps = {
  onClick: (name: string, target: [number, number, number]) => void;
  name: string;
  isActive: boolean;
};

const Route: FC<RockProps> = ({ onClick, name, isActive }) => {
  useThree(({ camera }) => {
    camera.position.set(8, 6, 10);
  });

  const obj = useLoader(OBJLoader, `/model/${name}.obj`);
  const geometry = useMemo(() => {
    let g;
    obj.traverse((c) => {
      if (c.type === "Mesh") {
        const _c = c as Mesh;
        g = _c.geometry;
      }
    });
    return g;
  }, [obj]);

  return (
    <mesh
      geometry={geometry}
      scale={1}
      onDoubleClick={(obj) => {
        obj.stopPropagation();
        onClick(name, [obj.point.x, obj.point.y, obj.point.z]);
      }}
    >
      <meshPhysicalMaterial
        color='red'
        transparent={true}
        opacity={isActive ? 0.8 : 0.4}
      />
    </mesh>
  );
};

export default Route;
