import React from "react";
import { useRouteError } from "react-router";

function Error() {
  const error: any = useRouteError();
  return (
    <div className="container mx-auto h-screen justify-center flex md:order-2">
      {error.message || "no error"}
      error
    </div>
  );
}

export default Error;
