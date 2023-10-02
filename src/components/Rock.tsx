import { useTexture } from "@react-three/drei";
import { useLoader, useThree } from "@react-three/fiber";
import { useMemo, type FC } from "react";
import { Mesh } from "three";
import { OBJLoader } from "three/examples/jsm/loaders/OBJLoader";

type RockProps = {
  onClick: (name: string | null, target: [number, number, number]) => void;
};

const Rock: FC<RockProps> = ({ onClick }) => {
  const obj = useLoader(OBJLoader, "/model/model-1.obj");
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
