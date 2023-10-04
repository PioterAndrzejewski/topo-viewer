import { type FC, useEffect, useState } from "react";
import { OrbitControls } from "@react-three/drei/core";
import { useFrame } from "@react-three/fiber";
import { Html } from "@react-three/drei";
import type { Coordinates, RouteModelShortData } from "../types/types";

import { grades } from "../types/types";

type PositionHandlerProps = {
  target: Coordinates;
  activeRoute: RouteModelShortData | null;
};

const PositionHandler: FC<PositionHandlerProps> = ({ target, activeRoute }) => {
  const [transitionSteps, setTransitionSteps] = useState<number>(0);
  const [currentTarget, setCurrentTarget] = useState<Coordinates>(target);
  const [cameraSet, setCameraSet] = useState(false);
  useFrame((state) => {
    if (!cameraSet) {
      state.camera.position.set(10, 5, 8);
      setCameraSet(true);
    }
    if (transitionSteps < 1) return;
    const diffStep = 0.05;
    const diff = {
      x: state.camera.position.x - target[0] * 1.6,
      y: state.camera.position.y - target[1] * 1.6,
      z: state.camera.position.z - target[2] * 1.6,
    };
    const targetDiff = {
      x: currentTarget[0] - target[0],
      y: currentTarget[1] - target[1],
      z: currentTarget[2] - target[2],
    };
    let newTarget: Coordinates = [0, 0, 0];
    if (diff.x > 1 || diff.x < -1) {
      if (diff.x > 0)
        state.camera.position.setX(state.camera.position.x - diffStep);
      if (diff.x < 0)
        state.camera.position.setX(state.camera.position.x + diffStep);
    }
    if (diff.y > 1 || diff.y < -1) {
      if (diff.y > 0)
        state.camera.position.setY(state.camera.position.y - diffStep);
      if (diff.y < 0)
        state.camera.position.setY(state.camera.position.y + diffStep);
    }
    if (diff.z > 1 || diff.z < -1) {
      if (diff.z > 0)
        state.camera.position.setZ(state.camera.position.z - diffStep);
      if (diff.z < 0)
        state.camera.position.setZ(state.camera.position.z + diffStep);
    }

    if (targetDiff.x > 1 || targetDiff.x < -1) {
      if (targetDiff.x > 0) newTarget[0] = currentTarget[0] - diffStep;
      if (targetDiff.x < 0) newTarget[0] = currentTarget[0] + diffStep;
    } else {
      newTarget[0] = currentTarget[0];
    }
    if (targetDiff.y > 1 || targetDiff.y < -1) {
      if (targetDiff.y > 0) newTarget[1] = currentTarget[1] - diffStep;
      if (targetDiff.y < 0) newTarget[1] = currentTarget[1] + diffStep;
    } else {
      newTarget[1] = currentTarget[1];
    }
    if (targetDiff.z > 1 || targetDiff.z < -1) {
      if (targetDiff.z > 0) newTarget[2] = currentTarget[2] - diffStep;
      if (targetDiff.z < 0) newTarget[2] = currentTarget[2] + diffStep;
    } else {
      newTarget[2] = currentTarget[2];
    }
    setCurrentTarget(newTarget);
    setTransitionSteps((prev: number) => prev - 1);
  });
  useEffect(() => {
    if (target[0] === 0 && target[1] === 0 && target[2] === 0) {
      return setCurrentTarget(target);
    }
    if (target) setTransitionSteps(30);
  }, [target]);

  console.log(activeRoute);
  return (
    <>
      <OrbitControls target={currentTarget} />
      <mesh position={[target[0] + 0.3, target[1] + 0.3, target[2] + 0.3]}>
        <Html distanceFactor={5}>
          {activeRoute && (
            <div className='font-bold uppercase text-[#ffffffcd] px-16 py-4 rounded-xl text-4xl bg-[#7aa2ff65] min-w-[600px] flex justify-center'>
              {activeRoute.name} - {grades[activeRoute.grade]}
            </div>
          )}
        </Html>
      </mesh>
    </>
  );
};

export default PositionHandler;
