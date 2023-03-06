import { Edge } from "reactflow";
import socket from "../../../libs/socket";

function createLocation(location: any, cb: () => void) {
  socket.emit("create-location", location, cb);
}

function updateNodePos(tripId: string, nodeId: string, x: number, y: number) {
  socket.emit("update-node-position", tripId, nodeId, x, y);
}

function addNewEdge(tripId: string, edge: Edge<any>[]) {
  socket.emit("add-edge", tripId, edge);
}

function removeEdge(tripId: string, edgeId: string) {
  console.log(edgeId);
  socket.emit("remove-edge", tripId, edgeId);
}

function joinTrip(id: string) {
  socket.emit("join-trip", id);
}

function upsertLocation(location: any) {
  socket.emit("upsert-location", location);
}

function onSocketResponse(setState: (data: any) => void, state: any) {}

function removeListeners() {}

export {
  createLocation,
  joinTrip,
  onSocketResponse,
  removeListeners,
  updateNodePos,
  addNewEdge,
  removeEdge,
  upsertLocation,
};
export default socket;
