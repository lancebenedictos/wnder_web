import React, { useState, useEffect, useContext } from "react";

import uuid from "react-uuid";
import { search } from "../../search/utils/search";
import LocationPreview from "./LocationPreview";
import LocationForm from "./LocationForm";
import { createLocation } from "../services/locationSocket";
import context from "../context/context";
import { useSelector } from "react-redux";
import axios from "axios";

type propTypes = {
  cb: (location: any) => void;
  trigger: React.ReactNode;
  locationId?: {};
  index: number;
};

function LocationModal(props: propTypes) {
  const [state, setState] = useState<any>({
    sessionToken: uuid(),
    locations: [],
    next: false,
    googleLocation: null,
    modalOpen: false,
    reminders: [],
  });

  const trip = useContext<any>(context);
  const currentUser = useSelector((store: any) => store.auth.user);

  useEffect(() => {
    if (props.locationId) {
      axios
        .get(`http://localhost:8080/locations/${props.locationId}`)
        .then((res) => console.log(res.data));
    }
  }, [props.locationId]);

  const onSearch = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.currentTarget.value;

    const searchParams = new URLSearchParams({
      search: value,
      sessiontoken: state.sessionToken,
    });
    const result = await search(
      `http://localhost:8080/locations/autocomplete?${searchParams}`
    );

    // setLocations(result.predictions);
    setState({ ...state, locations: result.predictions });
  };
  return (
    <div>
      <button
        onClick={() => {
          setState({ ...state, modalOpen: true });
        }}
      >
        {props.trigger}
      </button>

      <div
        onClick={() => {
          setState({ ...state, modalOpen: false });
        }}
        className={`absolute top-0  w-full h-full bg-slate-300 bg-opacity-30  left-0 ${
          state.modalOpen ? "flex" : "hidden"
        }`}
      >
        <div
          className=" w-5/6 bg-white h-5/6 mx-auto my-auto p-2 rounded-lg shadow-md overflow-scroll"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="flex h-11 border-b-2 mb-2">
            {state.next && (
              <button
                className="py-2 px-4 mr-auto"
                onClick={() => {
                  setState({ ...state, next: false });
                }}
              >
                Back
              </button>
            )}

            {state.googleLocation && state.next && (
              <button
                className="py-2 px-4"
                onClick={() => {
                  const { endDate, startDate, reminders } = state;
                  const googleId = state.googleLocation.place_id;
                  const { _id: tripId } = trip;
                  const user = state.user || currentUser._id;

                  // createLocation(tripId, {
                  //   endDate,
                  //   startDate,
                  //   googleId,
                  //   trip: tripId,
                  //   reminders,
                  //   user,
                  //   layer: props.index,
                  // });
                }}
              >
                Add to trip
              </button>
            )}
            {state.googleLocation && !state.next && (
              <button
                className="py-2 px-4 ml-auto"
                onClick={() => {
                  setState({ ...state, next: true });
                }}
              >
                Next
              </button>
            )}
          </div>

          {!state.next && (
            <div className="relative">
              <input
                type="text"
                name="search"
                id="search"
                className="border-2 rounded-lg w-full p-2"
                placeholder="Enter location name"
                autoComplete="off"
                onChange={onSearch}
              />

              {state.locations.length > 0 && (
                <div className="bg-white rounded-lg p-2 flex gap-2 flex-col shadow-lg absolute ">
                  {state.locations.map((e: any) => {
                    return (
                      <p
                        key={e.place_id}
                        className="w-full"
                        onClick={async () => {
                          // refresh token on select

                          const details = await search(
                            `http://localhost:8080/locations/google/${e.place_id}?sessiontoken=${state.sessionToken}`
                          );

                          setState({
                            ...state,
                            googleLocation: details.result,
                            sessionToken: uuid(),
                            locations: [],
                          });
                        }}
                      >
                        {e.description}
                      </p>
                    );
                  })}
                </div>
              )}
            </div>
          )}

          {!state.next && state.googleLocation && (
            <LocationPreview googleLocation={state.googleLocation} />
          )}

          {state.next && state.googleLocation && (
            <LocationForm
              reminders={state.reminders}
              locationName={state.googleLocation.name}
              updateLocationData={(data) => {
                setState({ ...state, ...data });
              }}
            />
          )}
        </div>
      </div>
    </div>
  );
}

export default LocationModal;
