import React, { useEffect, useState } from "react";
import {
  joinTrip,
  onSocketResponse,
} from "../features/trips/services/locationSocket";
import useFetch from "../hooks/useFetch";
import { useParams } from "react-router";
import LocationModal from "../features/trips/components/LocationModal";
import { BiLocationPlus } from "react-icons/bi";
import Context from "../features/trips/context/context";

function PlanBuilder() {
  const [state, setState] = useState<any>({ locations: [] });

  const { id } = useParams();

  const {
    response,
    // error,
    loading,
  } = useFetch("GET", `http://localhost:8080/trips/${id}/users`);

  useEffect(() => {
    if (id) joinTrip(id);
    return () => {
      // socket.disconnect();
    };
  }, [id]);

  useEffect(() => {
    if (!loading && response) {
      const locations = response.locations.reduce((locArr: [any], el: any) => {
        if (locArr[el.layer]) {
          locArr[el.layer].push({ ...el.location, layer: el.layer });
          return locArr;
        }

        locArr[el.layer] = [{ ...el.location, layer: el.layer }];
        return locArr;
      }, []);

      console.log(locations);
      setState({ ...response, locations });
    }
  }, [response, loading]);

  return (
    <Context.Provider value={state}>
      <div className="items-center flex flex-col p-3  gap-3 ">
        {state.locations &&
          state.locations.map((locArr: [], outerIndex: number) => {
            return (
              <div className="flex gap-5">
                {locArr.map((loc: any, innerIndex) => {
                  return innerIndex + 1 === locArr.length ? (
                    <div className="flex">
                      <LocationModal
                        index={outerIndex}
                        locationId={loc._id}
                        cb={(location) => {}}
                        trigger={
                          <button className="border-2 p-3 rounded-full bg-green-500">
                            <BiLocationPlus className="text-white" />
                          </button>
                        }
                      />
                      <LocationModal
                        index={outerIndex}
                        cb={(location) => {}}
                        trigger={
                          <button className="border-2 p-3 rounded-full bg-green-500">
                            <BiLocationPlus className="text-white" />
                          </button>
                        }
                      />
                    </div>
                  ) : (
                    <LocationModal
                      cb={(location) => {}}
                      locationId={loc._id}
                      index={outerIndex}
                      trigger={
                        <button className="border-2 p-3 rounded-full bg-green-500">
                          <BiLocationPlus className="text-white" />
                        </button>
                      }
                    />
                  );
                })}
              </div>
            );
          })}

        <LocationModal
          index={state?.locations?.length}
          cb={(location) => {}}
          trigger={
            <button className="border-2 p-3 rounded-full bg-green-500">
              <BiLocationPlus className="text-white" />
            </button>
          }
        />
      </div>
    </Context.Provider>
  );
}

export default PlanBuilder;
