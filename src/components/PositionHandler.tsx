import { type FC } from "react";
import { useThree } from "@react-three/fiber";
import { Box } from "@react-three/drei/core";
import { Html } from "@react-three/drei";
import type { Coordinates } from "../App";

type PositionHandlerProps = {
  target: Coordinates;
  activeRoute: string | null;
};

const PositionHandler: FC<PositionHandlerProps> = ({ target, activeRoute }) => {
  useThree(({ camera }) => {
    if (target[0] === 0) return;
    camera.position.set(target[0] * 1.6, target[1] * 1.6, target[2] * 1.6);
  });
  return (
    <mesh position={[target[0] + 0.3, target[1] + 0.3, target[2] + 0.3]}>
      <Html distanceFactor={9}>
        {activeRoute && (
          <div className='border-[#7aa2ff] font-bold uppercase text-white py-8 px-16 border-2 rounded-xl text-4xl bg-[#7aa2ff65]'>
            {activeRoute}
          </div>
        )}
      </Html>
    </mesh>
  );
};

export default PositionHandler;
