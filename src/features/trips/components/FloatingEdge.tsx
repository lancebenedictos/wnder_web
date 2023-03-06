import { useCallback, useState } from "react";
import { useStore, getBezierPath, EdgeMarkerType } from "reactflow";
import { CSSProperties } from "react";
import { getEdgeParams } from "../utils/utils";
type propTypes = {
  id: string;
  source: string;
  target: string;
  markerEnd?: EdgeMarkerType;
  style?: CSSProperties;
};

function FloatingEdge({ id, source, target, markerEnd, style }: propTypes) {
  const sourceNode = useStore(
    useCallback((store) => store.nodeInternals.get(source), [source])
  );
  const targetNode = useStore(
    useCallback((store) => store.nodeInternals.get(target), [target])
  );

  if (!sourceNode || !targetNode) {
    return null;
  }

  const { sx, sy, tx, ty } = getEdgeParams(sourceNode, targetNode);

  const [edgePath] = getBezierPath({
    sourceX: sx,
    sourceY: sy,
    targetX: tx,
    targetY: ty,
  });

  return (
    <>
      <path
        id={id}
        className="react-flow__edge-path text-green-500"
        d={edgePath}
        markerEnd={markerEnd?.toString()}
        style={style}
      />
    </>
  );
}

export default FloatingEdge;
