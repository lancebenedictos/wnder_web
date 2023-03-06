import React from "react";

function LocationCarousel() {
  return (
    <div className="flex overflow-x-auto gap-3 snap-x snap-mandatory no-scrollbar">
      <div className="w-2/5 aspect-[3/4] shrink-0 snap-center rounded-lg overflow-clip border-2">
        <img
          src="https://images.unsplash.com/flagged/photo-1570612861542-284f4c12e75f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80"
          alt=""
          className="shrink-0 snap-center object-contain"
        />

        <span className="p-2 block">
          <p>Name</p>
          <p>City,province</p>
          <p>Tags</p>
          <p>Stars</p>
        </span>
      </div>

      {/* 
      <img
        src="https://images.unsplash.com/photo-1671363690138-a5a03675f559?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxleHBsb3JlLWZlZWR8Mnx8fGVufDB8fHx8&auto=format&fit=crop&w=2000&q=60"
        alt=""
        className="shrink-0 snap-center object-contain"
      />
      <img
        src="https://images.unsplash.com/photo-1671358661718-138a946867b8?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxleHBsb3JlLWZlZWR8MXx8fGVufDB8fHx8&auto=format&fit=crop&w=2000&q=60"
        alt=""
        className="shrink-0 snap-center object-contain"
      /> */}
    </div>
  );
}

export default LocationCarousel;
