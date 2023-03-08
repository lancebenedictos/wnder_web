import React, { useState, useCallback, useEffect, useContext } from "react";
import { getBezierPath, Position, useStore } from "reactflow";
import context from "../context/context";
import { AiFillCar } from "react-icons/ai";
import { BiWalk } from "react-icons/bi";
import {
  MdOutlineDirectionsBike,
  MdOutlineDirectionsTransitFilled,
} from "react-icons/md";
import socket, { getTravelTime } from "../services/locationSocket";
const foreignObjectSize = 150;

const onEdgeClick = (evt: any, id: any) => {
  evt.stopPropagation();
  alert(`remove ${id}`);
};

type propTypes = {
  id: string;
  sourceX: number;
  sourceY: number;
  targetX: number;
  targetY: number;
  source: string;
  target: string;
  sourcePosition: Position;
  targetPosition: Position;
  style?: {};
  markerEnd?: string;
};

export default function CustomEdge({
  id,
  sourceX,
  sourceY,
  targetX,
  targetY,
  source,
  target,
  sourcePosition,
  targetPosition,
  style = {},
}: propTypes) {
  const [edgePath, labelX, labelY] = getBezierPath({
    sourceX,
    sourceY,
    sourcePosition,
    targetX,
    targetY,
    targetPosition,
  });

  const sourceNode = useStore(
    useCallback((store) => store.nodeInternals.get(source), [source])
  );
  const targetNode = useStore(
    useCallback((store) => store.nodeInternals.get(target), [target])
  );

  const trip = useContext<any>(context);

  const [state, setState] = useState<any>({ transpo: "driving" });
  const [responseState, setResponseState] = useState<any>({
    transpo: "driving",
  });

  useEffect(() => {
    socket.on("receive-TravelTime", (response) => {
      if (response.edgeId === id) {
        setResponseState({
          distance: response.distance,
          duration: response.duration,
          durationValue: response.durationValue,
        });

        // console.log(new Date(arrivalTime).toString());
      }
    });

    return () => {};
  }, []);

  useEffect(() => {
    const sourceId = sourceNode?.data.location.googleId;
    const targetId = targetNode?.data.location.googleId;
    console.log("req");
    getTravelTime(
      sourceId,
      targetId,
      id,
      trip._id,
      state.transpo,
      sourceNode?.data.location.endDate
    );
  }, [
    sourceNode?.data.location.googleId,
    targetNode?.data.location.googleId,
    state.transpo,
    id,
    trip,
    sourceNode?.data.location.endDate,
  ]);

  return (
    <>
      <path
        id={id}
        style={style}
        className="react-flow__edge-path"
        d={edgePath}
        markerEnd="arrowclosed"
      />
      <foreignObject
        width={150}
        height={100}
        x={labelX - 150 / 2}
        y={labelY - 100 / 2}
        className="edgebutton-foreignobject bg-green-500 flex items-center justify-center rounded-3xl cursor-default"
        requiredExtensions="http://www.w3.org/1999/xhtml"
      >
        <div className="p-2 flex flex-col justify-center">
          <div className="flex gap-1 justify-center">
            <input
              type="radio"
              name="transpo"
              id="driving"
              className="hidden"
            />
            <label
              htmlFor="driving"
              onClick={() => {
                setState({ ...state, transpo: "driving" });
              }}
              className={`text-white p-2 rounded-full cursor-pointer ${
                state.transpo === "driving" ? "bg-green-700" : "bg-green-500"
              }`}
            >
              <AiFillCar />
            </label>

            <input
              type="radio"
              name="transpo"
              id="walking"
              className="hidden"
            />
            <label
              htmlFor="walking"
              onClick={() => {
                setState({ ...state, transpo: "walking" });
              }}
              className={`text-white p-2 rounded-full cursor-pointer ${
                state.transpo === "walking" ? "bg-green-700" : "bg-green-500"
              }`}
            >
              <BiWalk />
            </label>

            <input
              type="radio"
              name="transpo"
              id="bicycling"
              className="hidden"
            />
            <label
              htmlFor="bicycling"
              onClick={() => {
                setState({ ...state, transpo: "bicycling" });
              }}
              className={`text-white p-2 rounded-full cursor-pointer ${
                state.transpo === "bicycling" ? "bg-green-700" : "bg-green-500"
              }`}
            >
              <MdOutlineDirectionsBike />
            </label>

            <input
              type="radio"
              name="transpo"
              id="transit"
              className="hidden"
            />
            <label
              htmlFor="transit"
              onClick={() => {
                setState({ ...state, transpo: "transit" });
              }}
              className={`text-white p-2 rounded-full cursor-pointer ${
                state.transpo === "transit" ? "bg-green-700" : "bg-green-500"
              }`}
            >
              <MdOutlineDirectionsTransitFilled />
            </label>
          </div>

          <p className="text-white">{responseState.duration}</p>
          <p className="text-white">{responseState.distance}</p>
        </div>
      </foreignObject>
    </>
  );
}
