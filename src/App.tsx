import React, { useEffect } from "react";
import useFetch from "./hooks/useFetch";
import { useDispatch } from "react-redux";
import { setUser } from "./store/authSlice";
// import { BrowserRouter, Route, Routes } from "react-router-dom";
import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";
import Home from "./pages/Home";
import NotFound from "./pages/NotFound";
import Navbar from "./components/Navbar";
import Plan from "./pages/Plan";
import Header from "./components/Header";
import Search from "./pages/Search";
import Messages from "./pages/Messages";
import Notifications from "./pages/Notifications";
import Account from "./pages/Account";
import PlanBuilder from "./pages/PlanBuilder";
import SignUpForm from "./components/SignUpForm";
import LoginForm from "./components/LoginForm";
import PlanForm from "./components/PlanForm";
import socket from "./libs/socket";
import TripPlanner from "./features/trips/components/TripPlanner";
const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <div className="grid grid-rows-sm md:grid-rows-none md:grid-cols-md lg:grid-cols-lg w-screen h-full fixed overflow-y-clip">
        <Header />
        <div className="overflow-scroll md:order-2 relative max-h-full">
          <Outlet />
        </div>
        <Navbar />
      </div>
    ),
    children: [
      {
        path: "/home",
        element: <Home />,
      },
      {
        path: "plan",
        element: <Plan />,
      },
      {
        path: "/plan/create",
        element: <PlanForm />,
      },
      { path: "/plan/create/:id", element: <TripPlanner /> },
      {
        path: "/search",
        element: <Search />,
      },
      {
        path: "/messages",
        element: <Messages />,
      },
      {
        path: "/notifications",
        element: <Notifications />,
      },
      {
        path: "/account",
        element: <Account />,
      },
      {
        path: "/signup",
        element: <SignUpForm />,
      },
      {
        path: "/login",
        element: <LoginForm />,
      },
      {
        path: "/*",
        element: <NotFound />,
      },
    ],
  },
]);

function App() {
  const dispatch = useDispatch();

  const {
    response,
    // error,
    // loading,
  } = useFetch("GET", "http://localhost:8080/users/me");

  useEffect(() => {
    return () => {
      console.log("disconnect");
      socket.off("connect");
      socket.off("disconnect");
      socket.off("pong");
    };
  }, []);

  useEffect(() => {
    if (response && response.user) {
      dispatch(setUser(response));
      socket.emit("join-room", response.user._id);
    }
  }, [response, dispatch]);

  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
