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
  outlineUrl: string;
  index: number;
};

const Route: FC<RockProps> = ({
  onClick,
  index,
  isActive,
  pathUrl,
  ringsUrl,
  outlineUrl,
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

  const outline = useLoader(OBJLoader, `${apiUrl}${outlineUrl}`);
  const outlineGeometry = useMemo(() => {
    let g;
    outline.traverse((c) => {
      if (c.type === "Mesh") {
        const _c = c as Mesh;
        g = _c.geometry;
      }
    });
    return g;
  }, [outline]);

  return (
    <group>
      <mesh
        geometry={pathGeometry}
        scale={1}
        onDoubleClick={(obj) => {
          obj.stopPropagation();
          onClick(uuid, [obj.point.x, obj.point.y, obj.point.z]);
        }}
      >
        <meshPhysicalMaterial
          color='#e100ff'
          transparent={true}
          opacity={isActive ? 0.8 : 0.5}
        />
      </mesh>
      <mesh
        geometry={outlineGeometry}
        scale={1}
        onDoubleClick={(obj) => {
          obj.stopPropagation();
          onClick(uuid, [obj.point.x, obj.point.y, obj.point.z]);
        }}
      >
        <meshPhysicalMaterial visible={false} />
      </mesh>
      <mesh
        geometry={ringsGeometry}
        scale={1}
        onDoubleClick={(obj) => {
          obj.stopPropagation();
          onClick(uuid, [obj.point.x, obj.point.y, obj.point.z]);
        }}
      >
        <meshPhysicalMaterial
          color='#ddd'
          transparent={true}
          opacity={isActive ? 1 : 0.2}
        />
      </mesh>
    </group>
  );
};

export default Route;
