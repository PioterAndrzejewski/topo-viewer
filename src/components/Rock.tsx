import { useTexture } from "@react-three/drei";
import { useLoader } from "@react-three/fiber";
import { useMemo, type FC } from "react";
import { Mesh } from "three";
import { OBJLoader } from "three/examples/jsm/loaders/OBJLoader";
import { apiUrl } from "../services/config";

type RockProps = {
  onClick: (name: string | null, target: [number, number, number]) => void;
  targetRoute: string | null;
  modelUrl: string;
};

const Rock: FC<RockProps> = ({ onClick, targetRoute, modelUrl }) => {
  const obj = useLoader(OBJLoader, `${apiUrl}${modelUrl}`);
  const texture = useTexture("/model/model.webp");
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
        onClick(null, [
          obj.object.position.x,
          obj.object.position.y,
          obj.object.position.z,
        ]);
      }}
    >
      <meshPhysicalMaterial map={texture} />
    </mesh>
  );
};

export default Rock;
