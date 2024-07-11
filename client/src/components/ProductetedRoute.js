import React, { useEffect, useState } from "react";
import { GetCurrentUser } from "../services/users";
import { message } from "antd";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setUser } from "../redux/userSlice";
import { HideLoading, ShowLoading } from "../redux/loaderSlice";

function ProductetedRoute({ children }) {
  const { user } = useSelector((state) => state.users);
  console.log(user);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const getCurrentUser = async () => {
    try {
      dispatch(ShowLoading());
      const response = await GetCurrentUser();
      dispatch(HideLoading());
      if (response.success) {
        dispatch(setUser(response.data));
      } else {
        dispatch(setUser(null));
        message.error(response.message);
      }
    } catch (error) {
      dispatch(setUser(null));
      //   message.error(response.message);
    }
  };

  useEffect(() => {
    if (localStorage.getItem("token")) {
      getCurrentUser();
    } else {
      navigate("/login");
    }
  }, []);
  return (
    user && (
      <div className="layout p-1">
        <div className="header bg-primary flex justify-between p-2">
          <div>
            <h1
              className="text-xl text-black cursor-pointer"
              onClick={() => navigate("/")}
            >
              Movie Master
            </h1>
          </div>
          <div className="bg-white">
            <h1
              className="text-sm underline"
              onClick={() => {
                if (user.isAdmin) {
                  navigate("/admin");
                } else {
                  navigate("/profile");
                }
              }}
            >
              {user.name}
            </h1>
            <button
              className="underline"
              onClick={() => {
                localStorage.removeItem("token");
                navigate("/login");
              }}
            >
              {" "}
              logout
            </button>
          </div>
        </div>
        <div className="content mt-1 p-1">{children}</div>
      </div>
    )
  );
}

export default ProductetedRoute;
