import { useLoader } from "@react-three/fiber";
import { useMemo, type FC } from "react";
import { Mesh } from "three";
import { Html } from "@react-three/drei";
import { OBJLoader } from "three/examples/jsm/loaders/OBJLoader";
import { apiUrl } from "../services/config";

type RockProps = {
  onClick: (name: string | null, target: [number, number, number]) => void;
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
    let boundingBox: any = null;
    path.traverse((c) => {
      if (c.type === "Mesh") {
        const _c = c as Mesh;
        g = _c.geometry;
        g.computeBoundingBox();
        if (!boundingBox && g.boundingBox) boundingBox = g.boundingBox.min;
      }
    });
    return { geometry: g, boundingBox: boundingBox };
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
        geometry={pathGeometry.geometry}
        scale={1}
        onDoubleClick={(obj) => {
          obj.stopPropagation();
          if (isActive)
            return onClick(null, [obj.point.x, obj.point.y, obj.point.z]);
          return onClick(uuid, [obj.point.x, obj.point.y, obj.point.z]);
        }}
      >
        <meshPhysicalMaterial
          color='#ff0000'
          transparent={true}
          opacity={isActive ? 1 : 0.5}
        />
      </mesh>
      <mesh
        geometry={outlineGeometry}
        scale={1}
        onDoubleClick={(obj) => {
          obj.stopPropagation();
          if (isActive)
            return onClick(null, [obj.point.x, obj.point.y, obj.point.z]);
          return onClick(uuid, [obj.point.x, obj.point.y, obj.point.z]);
        }}
      >
        <meshPhysicalMaterial visible={false} />
      </mesh>
      <mesh
        geometry={ringsGeometry}
        scale={1}
        onDoubleClick={(obj) => {
          if (isActive)
            return onClick(null, [obj.point.x, obj.point.y, obj.point.z]);
          return onClick(uuid, [obj.point.x, obj.point.y, obj.point.z]);
        }}
      >
        <meshPhysicalMaterial
          color='#ddd'
          transparent={true}
          opacity={isActive ? 1 : 0.2}
        />
      </mesh>
      <mesh
        position={[
          pathGeometry.boundingBox.x,
          pathGeometry.boundingBox.y,
          pathGeometry.boundingBox.z,
        ]}
        onDoubleClick={(obj) => {
          if (isActive)
            return onClick(null, [obj.point.x, obj.point.y, obj.point.z]);
          return onClick(uuid, [obj.point.x, obj.point.y, obj.point.z]);
        }}
      >
        {isActive ? (
          <Html distanceFactor={3}>
            <div
              className={`font-bold uppercase text-[#fffffff2] px-6 py-10 rounded-xl text-7xl bg-[#5871aab3] flex justify-center`}
            >
              {index + 1}
            </div>
          </Html>
        ) : (
          <Html distanceFactor={3}>
            <div
              className={`font-bold uppercase text-[#ffffff6b] px-6 py-10 rounded-xl text-7xl bg-[#5871aa52] flex justify-center`}
            >
              {index + 1}
            </div>
          </Html>
        )}
      </mesh>
    </group>
  );
};

export default Route;
