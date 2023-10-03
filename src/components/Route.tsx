import { useLoader } from "@react-three/fiber";
import { useMemo, type FC } from "react";
import { Mesh } from "three";
import { OBJLoader } from "three/examples/jsm/loaders/OBJLoader";
import { apiUrl } from "../services/config";

type RockProps = {
  onClick: (name: string, target: [number, number, number]) => void;
  name: string;
  isActive: boolean;
  ringsUrl: string;
  pathUrl: string;
  uuid: string;
};

const Route: FC<RockProps> = ({
  onClick,
  name,
  isActive,
  pathUrl,
  ringsUrl,
  uuid,
}) => {
  const path = useLoader(OBJLoader, `${apiUrl}${pathUrl}`);
  const pathGeometry = useMemo(() => {
    let g;
    path.traverse((c) => {
      if (c.type === "Mesh") {
        const _c = c as Mesh;
        g = _c.geometry;
      }
    });
    return g;
  }, [path]);
  const rings = useLoader(OBJLoader, `${apiUrl}${ringsUrl}`);
  const ringsGeometry = useMemo(() => {
    let g;
    rings.traverse((c) => {
      if (c.type === "Mesh") {
        const _c = c as Mesh;
        g = _c.geometry;
      }
    });
    return g;
  }, [rings]);

  return (
    <group>
      <mesh
        geometry={ringsGeometry}
        scale={1}
        onDoubleClick={(obj) => {
          obj.stopPropagation();
          onClick(uuid, [obj.point.x, obj.point.y, obj.point.z]);
        }}
      >
        <meshPhysicalMaterial
          color='blue'
          transparent={true}
          opacity={isActive ? 0.8 : 0.2}
        />
      </mesh>
      <mesh
        geometry={pathGeometry}
        scale={1}
        onDoubleClick={(obj) => {
          obj.stopPropagation();
          onClick(uuid, [obj.point.x, obj.point.y, obj.point.z]);
        }}
      >
        <meshPhysicalMaterial
          color='red'
          transparent={true}
          opacity={isActive ? 0.4 : 0.2}
        />
      </mesh>
    </group>
  );
};

export default Route;
