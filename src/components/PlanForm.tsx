import axios from "axios";
import React from "react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router";

type formInfo = {
  name?: string;
  description?: string;
  id?: string;
  visibility: boolean;
};

function PlanForm() {
  const [state, setState] = useState<formInfo>({
    visibility: false,
  });
  const navigate = useNavigate();

  useEffect(() => {
    return () => {};
  }, [state]);

  const onFieldChange = (
    e: React.FormEvent<HTMLTextAreaElement | HTMLInputElement>
  ) => {
    setState({ ...state, [e.currentTarget.name]: e.currentTarget.value });
  };
  return (
    <form
      className="flex items-center flex-col gap-3 w-full p-3 bg-white max-w-sm mx-auto"
      onSubmit={(e) => {
        e.preventDefault();
        axios({
          method: "POST",
          url: "http://localhost:8080/trips/",
          withCredentials: true,
          data: state,
        }).then((res) => {
          console.log(res);
          navigate(`/plan/create/${res.data.data._id}`);
        });
      }}
    >
      <label htmlFor="name" className=" self-start">
        Trip name
      </label>
      <input
        type="text"
        onChange={onFieldChange}
        name="name"
        id="name"
        placeholder="Trip name"
        className="p-2 border-2 rounded-lg  max-w-lg w-full md:w-96"
      />

      <label htmlFor="description" className=" self-start">
        Description
      </label>
      <textarea
        onChange={onFieldChange}
        name="description"
        id="description"
        placeholder="Give your friends an idea about this trip!"
        className="p-2 border-2 rounded-lg  max-w-lg w-full md:w-96 h-64 resize-none"
      />

      <label htmlFor="planName" className=" self-start">
        Add people
      </label>

      <input
        type="text"
        name=""
        id=""
        placeholder="Email or username"
        className="p-2 border-2 rounded-lg max-w-lg w-full md:w-96"
      />

      <fieldset className=" self-start flex items-center gap-4">
        <label
          htmlFor="visibility"
          onClick={() => {
            setState({ ...state, visibility: !state.visibility });
          }}
        >
          Public
        </label>
        <div
          className={`${
            state.visibility ? "bg-green-500" : "bg-white"
          } w-[3.7rem] h-8 rounded-full border-2 flex items-center cursor-pointer transition duration-200 ease-linear`}
          onClick={() => {
            setState({ ...state, visibility: !state.visibility });
          }}
        >
          <div
            className={`rounded-full h-6 w-6 transition duration-200 ease-linear ml-1 ${
              state.visibility
                ? "translate-x-full bg-white "
                : "translate-x-0  bg-green-500 "
            }`}
          ></div>
        </div>
        <input
          type="checkbox"
          name="visibility"
          id="visibility"
          className="hidden"
          checked={state.visibility}
          // onChange={({ target }) => {
          //   setState({ ...state, visibility: target.checked });
          // }}
        />
      </fieldset>

      <button className="bg-green-500 text-white px-8 py-3 rounded-lg">
        Submit
      </button>
    </form>
  );
}

export default PlanForm;
