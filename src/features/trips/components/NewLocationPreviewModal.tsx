import React, { useState, useContext } from "react";
import { BsSearch } from "react-icons/bs";
import { AiOutlineClose } from "react-icons/ai";
import uuid from "react-uuid";
import { search } from "../../search/utils/search";
import LocationPreview from "./LocationPreview";
import LocationForm from "./LocationForm";
import { useSelector } from "react-redux";
import { createLocation } from "../services/locationSocket";
import context from "../context/context";
type propTypes = {
  cb: (location: any) => void;
  trigger: React.ReactNode;
};
function NewLocationPreviewModal(props: propTypes) {
  const [isShowing, setIsShowing] = useState(false);
  const [searchAutocomplete, setSearchAutoComplete] = useState<any>(null);
  const [state, setState] = useState<any>({
    sessiontoken: uuid(),
  });
  const currentUser = useSelector((store: any) => store.auth.user);
  const trip = useContext<any>(context);

  const onSearch = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.currentTarget.value;

    if (value === "") return setSearchAutoComplete(null);

    const searchParams = new URLSearchParams({
      search: value,
      sessiontoken: state.sessiontoken,
    });
    const result = await search(
      `http://localhost:8080/locations/autocomplete?${searchParams}`
    );

    // setLocations(result.predictions);
    if (result.predictions) setSearchAutoComplete(result.predictions);
  };

  return (
    <div>
      <span onClick={() => setIsShowing(!isShowing)}>{props.trigger}</span>
      {/* modal bg */}
      {isShowing ? (
        <div
          className="w-full h-full bg-slate-500 absolute z-20 flex justify-center items-center bg-opacity-25"
          onClick={() => {
            setIsShowing(!isShowing);
          }}
        >
          <div
            className="bg-white rounded-lg w-2/4 h-3/4 flex flex-col p-4 "
            onClick={(e) => {
              e.stopPropagation();
            }}
          >
            {/* controls */}
            <div className="flex pb-3 px-2">
              <button
                onClick={() => {
                  setIsShowing(!isShowing);
                }}
              >
                <AiOutlineClose />
              </button>

              {state.googleLocation ? (
                <button
                  className="ml-auto"
                  onClick={() => {
                    const { endDate, startDate, reminders } = state;
                    const googleId = state.googleLocation.place_id;
                    const { _id: tripId } = trip;
                    const user = state.user || currentUser._id;

                    createLocation(
                      {
                        endDate,
                        startDate,
                        name: state.googleLocation.name,
                        googleId,
                        trip: tripId,
                        reminders,
                        addedBy: user || "0",
                      },
                      () => {
                        console.log("here");

                        setIsShowing(false);
                        setSearchAutoComplete(null);
                        setState({
                          sessiontoken: uuid(),

                          reminders: [],
                        });
                      }
                    );
                  }}
                >
                  Add
                </button>
              ) : null}
            </div>

            {/* Modal */}

            <div className="border-4 rounded-lg flex items-center px-2">
              <BsSearch />
              <input
                type="search"
                name="query"
                id="query"
                autoComplete="off"
                placeholder="Search location..."
                className="w-full h-full px-2 py-2 outline-none"
                onChange={onSearch}
              />
            </div>

            {/* Search results */}
            {searchAutocomplete ? (
              <div className="h-full w-full overflow-scroll flex flex-col gap-3 mt-4 no-scrollbar">
                {searchAutocomplete.map((e: any) => {
                  return (
                    <p
                      key={e.place_id}
                      className="w-full cursor-pointer"
                      onClick={async () => {
                        // refresh token on select

                        const details = await search(
                          `http://localhost:8080/locations/google/${e.place_id}?sessiontoken=${state.sessiontoken}`
                        );

                        // upload new location
                        setState({
                          ...state,
                          googleLocation: details.result,
                          sessiontoken: uuid(),
                        });
                        setSearchAutoComplete(null);
                      }}
                    >
                      {e.description}
                    </p>
                  );
                })}
              </div>
            ) : null}

            {/* Preview before add */}
            {state.googleLocation && !searchAutocomplete ? (
              <div className="h-full w-full overflow-scroll mt-4">
                <LocationPreview googleLocation={state.googleLocation} />
              </div>
            ) : null}
          </div>
        </div>
      ) : null}
    </div>
  );
}

export default NewLocationPreviewModal;
