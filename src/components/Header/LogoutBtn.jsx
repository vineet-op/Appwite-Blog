import React from "react";
import { useDispatch } from "react-redux";
import authservice from "../../appwrite/auth";
import { logout } from "../../Feature/authSlice";

function LogoutBtn() {
  const dispatch = useDispatch();

  const logOutHandler = () => {
    authservice
      .logout()
      .then((res) => {
        dispatch(logout(res));
      })
      .catch((err) => console.log("LOGOUT BTN ERROR :", err));
  };
  return (
    <button
      className="m-3 flex items-center rounded-md p-3  text-sm font-semibold hover:bg-gray-50 hover:shadow-xl hover:duration-200 hover:ease-in-out "
      onClick={logOutHandler}
    >
      Logout
    </button>
  );
}

export default LogoutBtn;
