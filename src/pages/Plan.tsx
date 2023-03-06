import React from "react";
import { Link } from "react-router-dom";
import PlanPreview from "../components/PlanPreview";

function Plan() {
  return (
    <div className="container mx-auto flex flex-col md:order-1 p-3 relative h-full">
      <span className="flex justify-between">
        <h1 className=" text-xl">Your trips</h1>
        <Link
          to="/plan/create"
          className=" bg-green-500 text-white rounded-full p-2 w-36 text-center"
        >
          Create new plan
        </Link>
      </span>

      <PlanPreview />
    </div>
  );
}

export default Plan;
