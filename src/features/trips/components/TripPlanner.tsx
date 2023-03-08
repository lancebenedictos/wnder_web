import React, { useCallback, useState, useEffect } from "react";
import ReactFlow, {
  MiniMap,
  Controls,
  Background,
  useNodesState,
  useEdgesState,
  addEdge,
  Edge,
  MarkerType,
} from "reactflow";
import "reactflow/dist/style.css";
import useFetch from "../../../hooks/useFetch";
import socket, {
  addNewEdge,
  joinTrip,
  removeEdge,
  updateNodePos,
} from "../services/locationSocket";
import { useParams } from "react-router";
import Context from "../context/context";
import CustomNode from "./CustomNode";
import NewLocationPreviewModal from "./NewLocationPreviewModal";
import uuid from "react-uuid";
import CustomEdge from "./CustomEdge";

const initialNodes = [
  { id: "1", position: { x: 0, y: 0 }, data: { label: "1" } },
  { id: "2", position: { x: 0, y: 100 }, data: { label: "2" } },
];

const initialEdges: Edge<any>[] = [];
const nodeTypes = {
  custom: CustomNode,
};

const edgeTypes = {
  customedge: CustomEdge,
};

function checkSocket() {
  console.log(socket.connected);
}
const defaultEdgeOptions = {
  style: { strokeWidth: 3 },
  animated: true,
  markerEnd: MarkerType.ArrowClosed,
};
function TripPlanner() {
  const { id } = useParams();

  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
  // const [showNewLocationModal, setShowNewLocationModal] = useState(false);

  const onConnect = useCallback(
    (params: any) => {
      setEdges((eds) => {
        if (id)
          addNewEdge(id, [
            ...eds,
            { ...params, id: uuid(), type: "customedge" },
          ]);

        return addEdge({ ...params, id: uuid(), type: "customedge" }, eds);
      });
    },
    [setEdges, id]
  );
  const [state, setState] = useState<any>({ locations: [] });
  const {
    response,
    // error,
    loading,
  } = useFetch("GET", `http://localhost:8080/trips/${id}/users`);

  useEffect(() => {
    window.addEventListener("focus", checkSocket);
    return () => {
      socket.removeAllListeners();
      socket.emit("leave-trip", id);
      window.removeEventListener("focus", checkSocket);
    };
  }, []);

  useEffect(() => {
    if (id) joinTrip(id);
    return () => {};
  }, [id]);

  useEffect(() => {
    if (!loading && response) {
      setState(response);
      setEdges(response.edges);
    }
  }, [response, loading, setEdges]);

  useEffect(() => {
    socket.on("join-trip", (message) => {
      // cb({ connecting: false });
    });

    socket.on("added-location", (trip, location) => {
      setState({
        ...state,
        ...trip,
        locations: [...state.locations, location],
      });
    });

    socket.on("added-edge", (edges) => {
      setState({ ...state, edges });
      setEdges(edges);
    });

    socket.on("removed-edge", (edges) => {
      setState({ ...state, edges });
      setEdges(edges);
    });

    socket.on("updated-trip", (trip) => {
      setState({ ...state, ...trip });
    });

    socket.on("deleted-location", (trip, locations) => {
      setEdges(trip.edges);
      setState({ ...state, ...trip, locations });
    });
  }, [state, setState, setEdges]);

  useEffect(() => {
    if (state && state.nodes) {
      const nodes = state.nodes.map((node: any) => {
        const location = state.locations.find(
          (loc: any) => loc._id === node.id
        );

        node.type = "custom";
        node.data.location = location;

        return node;
      });

      setNodes(nodes);
    }
  }, [state, setState, setNodes]);

  return (
    <Context.Provider value={state}>
      <div className="h-full w-full relative">
        <NewLocationPreviewModal
          cb={() => {}}
          trigger={
            <button className=" shadow-2xl py-2 px-3 rounded-lg absolute top-5 left-5 bg-green-500 text-white text-sm z-10 cursor-pointer">
              Add new location
            </button>
          }
        />
        <ReactFlow
          nodes={nodes}
          edges={edges}
          onNodesChange={(changes: any) => {
            const [node] = changes;
            if (node.dragging) {
              if (id) {
                updateNodePos(id, node.id, node.position.x, node.position.y);
              }
            }
            onNodesChange(changes);
          }}
          onEdgesChange={(changes: any) => {
            const [edge] = changes;

            if (edge.type === "remove") {
              if (id) removeEdge(id, edge.id);
            }

            onEdgesChange(changes);
          }}
          onConnect={onConnect}
          nodeTypes={nodeTypes}
          fitView
          edgeTypes={edgeTypes}
          defaultEdgeOptions={defaultEdgeOptions}
        >
          <MiniMap zoomable pannable />
          <Controls />
          <Background />
        </ReactFlow>
      </div>
    </Context.Provider>
  );
}

export default TripPlanner;
