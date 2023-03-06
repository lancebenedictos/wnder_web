import React from "react";
import Trip from "../models/Trip";
import LocationCarousel from "./LocationCarousel";
import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";
import { BiComment } from "react-icons/bi";
import { IoIosShareAlt } from "react-icons/io";
type props = { trip: Trip };
function TripCard(props: props) {
  const { trip } = props;
  return (
    <div className="w-screen p-3">
      <span className="flex items-center gap-2">
        <img
          src={trip.author.img}
          alt="profile"
          className="rounded-full w-12 aspect-square object-cover border-black border-2 p-1"
        />

        <span>
          <p>{trip.author.firstName + " " + trip.author.lastName}</p>
          <p className="text-gray-400">Date</p>
        </span>
      </span>

      <span className="grid grid-cols-3 py-7">
        <span className="text-center">
          <p>Variations#</p>
          <p>#</p>
        </span>
        <span className="text-center">
          <p>likes</p>
          <p>#</p>
        </span>
        <span className="text-center">
          <p>create variation</p>
          <p>#</p>
        </span>
      </span>
      <p className="py-2">{trip.details}</p>

      <LocationCarousel />

      <h2>Reminders</h2>
      <span className="flex gap-6 my-5">
        <button>
          <AiOutlineHeart className="h-6 w-6" />
        </button>
        <button>
          <BiComment className="h-6 w-6" />
        </button>
        <button>
          <IoIosShareAlt className="h-6 w-6" />
        </button>
      </span>

      <span>
        <p>comments</p>
      </span>
    </div>
  );
}

export default TripCard;
