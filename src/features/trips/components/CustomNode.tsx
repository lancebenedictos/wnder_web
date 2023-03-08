import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader

import { useContext, useEffect, useState } from "react";
import { Handle, Position, useStore } from "reactflow";
import useFetch from "../../../hooks/useFetch";
import { RiAttachmentLine, RiStarFill } from "react-icons/ri";
import { BiChevronDown, BiChevronUp } from "react-icons/bi";
import { MentionsInput, Mention } from "react-mentions";
import context from "../context/context";
import { Carousel } from "react-responsive-carousel";
import { deleteLocation, upsertLocation } from "../services/locationSocket";
import { useSelector } from "react-redux";
import socket from "../services/locationSocket";
import axios from "axios";
import { FaEllipsisH } from "react-icons/fa";
const connectionNodeIdSelector = (state: any) => state.connectionNodeId;

type propTypes = {
  id: string;
  isConnectable: boolean;
  data: any;
};
const mentionStyle = {
  control: {
    backgroundColor: "#fff",
    fontSize: 14,
    fontWeight: "normal",
  },

  "&multiLine": {
    control: {
      minHeight: 63,
    },
    highlighter: {
      padding: 9,
      border: "1px solid transparent",
    },
    input: {
      padding: 9,
      border: "1px solid silver",
      borderRadius: "0.5rem",
    },
  },

  suggestions: {
    list: {
      backgroundColor: "white",
      border: "1px solid rgba(0,0,0,0.15)",
      fontSize: 14,
      borderRadius: "0.5rem",
    },
    item: {
      padding: "5px 15px",
      borderBottom: "1px solid rgba(0,0,0,0.15)",
      "&focused": {
        backgroundColor: "#cee4e5",
      },
    },
  },
};
export default function CustomNode({ id, isConnectable, data }: propTypes) {
  const connectionNodeId = useStore(connectionNodeIdSelector);
  const currentUser = useSelector((store: any) => store.auth.user);

  const isTarget = connectionNodeId && connectionNodeId !== id;
  const trip = useContext<any>(context);
  const users = trip?.users?.map((user: any) => {
    return {
      display: user.user.username,
      id: user.user._id,
    };
  });
  const [mentionVal, setMentionVal] = useState("");
  const [state, setState] = useState({
    detailsOpen: true,
    isHoursOpen: false,
    isDropDownOpen: false,
  });
  const [locationState, setLocationState] = useState<any>(null);
  const [directionState, setDirectionState] = useState<any>({});

  const {
    response,
    // error,
    loading,
  } = useFetch("GET", `http://localhost:8080/locations/${id}`);
  useEffect(() => {
    socket.on("upserted-location", (location) => {
      setLocationState(location);
    });

    return () => {
      socket.removeAllListeners();
    };
  }, []);

  useEffect(() => {
    if (response) setLocationState(response.location);
  }, [response]);

  return (
    <div
      className="customNode overflow"
      onClick={() => setState({ ...state, isDropDownOpen: false })}
    >
      <div
        className="customNodeBody bg-white border-2 w-72 relative pt-3"
        style={{
          borderStyle: isTarget ? "dashed" : "solid",
          borderColor: isTarget ? "rgb(34 197 94)" : "#e5e7eb",
        }}
      >
        <Handle
          className="handle sourceHandle"
          position={Position.Bottom}
          type="source"
          isConnectable={isConnectable}
          onConnect={(connection) =>
            setDirectionState({ ...directionState, source: connection.source })
          }
        />

        <Handle
          className="handle targetHandle"
          position={Position.Top}
          type="target"
          isConnectable={isConnectable}
        />

        {response && locationState ? (
          <div
            className="flex flex-col w-full p-4  gap-2 overflow-x-hidden overflow-y-auto nowheel  h-96"
            id="style-4"
          >
            <span className="flex justify-between items-center">
              <p className="bg-green-500 text-white px-3 py-1 rounded-2xl ">
                {locationState?.addedBy?.username}
              </p>

              {/* Dropdown */}
              <span className="relative">
                <button
                  onClick={() =>
                    setState({
                      ...state,
                      isDropDownOpen: !state.isDropDownOpen,
                    })
                  }
                >
                  <FaEllipsisH />
                </button>
                {state.isDropDownOpen ? (
                  <div className="absolute z-[51] bg-white p-2 right-0 rounded-lg w-32 shadow-2xl">
                    {locationState.addedBy._id === currentUser._id ? (
                      <button
                        onClick={() => {
                          deleteLocation(locationState.trip, locationState._id);
                        }}
                      >
                        Delete location
                      </button>
                    ) : null}
                  </div>
                ) : null}
              </span>
            </span>

            <button
              className="flex z-50 self-start w-full text-start bg-slate-100 rounded-md p-1 items-center justify-between"
              onClick={() =>
                setState({ ...state, detailsOpen: !state.detailsOpen })
              }
            >
              {response.googleLocation.name}
              {state.detailsOpen ? <BiChevronUp /> : <BiChevronDown />}
            </button>

            {/* detauls */}
            {state.detailsOpen ? (
              <>
                <p>{response.googleLocation?.editorial_summary?.overview}</p>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setState({ ...state, isHoursOpen: !state.isHoursOpen });
                  }}
                  className="self-start"
                >
                  Hours
                </button>

                {state.isHoursOpen &&
                  response.googleLocation?.current_opening_hours?.weekday_text.map(
                    (text: string) => {
                      return <p key={text}>{text}</p>;
                    }
                  )}

                <div className=" nodrag " onClick={(e) => e.stopPropagation()}>
                  <Carousel swipeable={true} showThumbs={false}>
                    {response.googleLocation?.reviews?.map((review: any) => {
                      return (
                        <div
                          className=" w-full  border-2 p-4 rounded-lg  flex flex-col gap-3 h-72"
                          key={review.text}
                        >
                          <span className="flex gap-4 items-center justify-between">
                            <p>{review.author_name}</p>
                            <span className="flex items-center">
                              <p>{review.rating}</p>
                              <RiStarFill />
                            </span>
                          </span>

                          <p className=" text-start">{review.text}</p>
                        </div>
                      );
                    })}
                  </Carousel>
                </div>
              </>
            ) : null}
            {/* details end */}

            <div className="nodrag flex flex-col gap-2">
              <label htmlFor="startDate">Choose time and date start:</label>
              <input
                type="datetime-local"
                id="startDate"
                name="startDate"
                className="border-2 p-2 rounded-lg"
                value={locationState.startDate}
                onChange={(e) => {
                  upsertLocation({
                    ...locationState,
                    startDate: e.currentTarget.value,
                  });
                }}
              />
              <label htmlFor="endDate">Choose time and date to leave:</label>
              <input
                type="datetime-local"
                id="endDate"
                name="endDate"
                value={locationState.endDate}
                className="border-2 p-2 rounded-lg"
                onChange={(e) => {
                  upsertLocation({
                    ...locationState,
                    endDate: e.currentTarget.value,
                  });
                }}
              />

              <h2>Reminders</h2>
              <MentionsInput
                value={mentionVal}
                onChange={(e) => setMentionVal(e.target.value)}
                placeholder="Bring chairs @person"
                a11ySuggestionsListLabel="Suggested mentions"
                style={mentionStyle}
                allowSuggestionsAboveCursor={true}
              >
                <Mention
                  trigger="@"
                  data={users}
                  style={{ backgroundColor: "#f5f5f5" }}
                  displayTransform={(id, display): string => {
                    return `@${display}`;
                  }}
                  onAdd={(id, display: any) => {
                    console.log(display);
                  }}
                />
              </MentionsInput>

              <RiAttachmentLine />
              <button
                className="px-3 py-2 text-white rounded-lg bg-green-500"
                onClick={() => {
                  setLocationState({
                    ...locationState,
                    reminders: [
                      ...locationState.reminders,
                      { message: mentionVal, by: currentUser._id },
                    ],
                  });

                  setMentionVal("");
                }}
              >
                Add reminder
              </button>

              <div className="flex flex-col gap-3">
                {locationState.reminders &&
                  locationState.reminders.map((reminder: any) => {
                    return (
                      <p
                        className="bg-slate-100  rounded-lg p-2"
                        id={reminder.message}
                      >
                        {reminder.message.split(" ").map((word: string) => {
                          if (word.match(/@\[[^\]]*\]\([^)]*\)/g)) {
                            return (
                              <span className=" text-blue-700 bold font-semibold">
                                {word.replace(
                                  /@\[[^\]]*\]\([^)]*\)/g,
                                  "@" + word.match(/(?<=\[).+?(?=\])/g)
                                ) + " "}
                              </span>
                            );
                          }
                          return word + " ";
                        })}
                      </p>
                    );
                  })}
              </div>
            </div>
          </div>
        ) : null}
      </div>
    </div>
  );
}
