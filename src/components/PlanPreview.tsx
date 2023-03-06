import React from "react";
import LocationCarousel from "./LocationCarousel";
import { FaEllipsisH } from "react-icons/fa";
function PlanPreview() {
  return (
    <div className="border-b-2 py-2">
      <span className="flex items-center justify-between">
        <p>title</p>
        <FaEllipsisH />
      </span>
      <p className="text-slate-400">Date start - date end</p>
      <p>Plan with</p>
      <p>Private/published</p>
      <LocationCarousel />
    </div>
  );
}

export default PlanPreview;
