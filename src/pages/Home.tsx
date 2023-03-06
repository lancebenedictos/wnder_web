import React, { useEffect } from "react";
import TripCard from "../components/TripCard";
import Trip from "../models/Trip";
import User from "../models/User";

function Home() {
  useEffect(() => {
    document.title = "wnder";
  });

  const author = new User(
    "https://images.unsplash.com/flagged/photo-1570612861542-284f4c12e75f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80",
    "lance",
    "benedictos"
  );

  const trip = new Trip(author, "This is a new trip");

  return (
    <div className="mx-auto justify-center flex flex-col">
      <TripCard trip={trip} />
      <TripCard trip={trip} />
    </div>
  );
}

export default Home;
