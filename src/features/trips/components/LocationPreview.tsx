import React, { useEffect, useState } from "react";

type propTypes = {
  googleLocation: any;
};
function LocationPreview(props: propTypes) {
  const { googleLocation } = props;
  const [state, setState] = useState<any>({
    isHoursOpen: false,
  });
  useEffect(() => {
    return () => {};
  }, []);

  return (
    <div className="p-2">
      <h2 className="text-xl border-b-2 pb-2">{googleLocation?.name}</h2>
      <button
        onClick={() => {
          setState({ ...state, isHoursOpen: !state.isHoursOpen });
        }}
      >
        Hours
      </button>

      {state.isHoursOpen &&
        googleLocation?.current_opening_hours?.weekday_text.map(
          (text: string) => {
            return <p>{text}</p>;
          }
        )}

      <p>{googleLocation?.editorial_summary?.overview}</p>

      {/* reviews */}
      <div className="flex overflow-scroll py-4 no-scrollbar snap-x snap-mandatory no-scrollbar gap-5 ">
        {googleLocation?.reviews.map((review: any) => {
          return (
            <div className=" w-3/4 shrink-0 snap-center border-2 p-4 rounded-lg aspect-square">
              <span className="flex gap-4">
                <p>{review.author_name}</p>
                <p>{review.rating}</p>
              </span>
              <p>{review.text}</p>
            </div>
          );
        })}
      </div>

      <div className="grid grid-cols-3 grid-rows-3 gap-1">
        {googleLocation?.photos.map((image: any) => {
          return (
            <img
              src={`https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photo_reference=${image.photo_reference}&key=${process.env.REACT_APP_PLACES_KEY}`}
              alt={image.html_attributions}
              className=" aspect-square rounded-md"
            />
          );
        })}
      </div>
    </div>
  );
}

export default LocationPreview;
