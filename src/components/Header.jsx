import React, { useMemo } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, NavLink, useNavigate } from "react-router-dom";
import authService from "../appwrite/auth";
import { logout } from "../store/authSlice";
import { cleanPosts } from "../store/postSlice";
import { Container } from "./index";
import { cleanUsers } from "../store/userSlice";

function Header() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const authStatus = useSelector((state) => state.auth.status);
  const userData = useSelector((state) => state.auth.userData);

  const logoutHandler = async () => {
    try {
      const status = await authService.logoutUser();
      if (status) {
        dispatch(logout());
        dispatch(cleanPosts());
        dispatch(cleanUsers());
        navigate("/");
      }
    } catch (error) {
      console.log("Unable to logout user :: ", error);
    }
  };

  const navItems = useMemo(
    () => ({
      showAllways: [
        {
          name: "Home",
          slug: "/",
        },
      ],
      showIfUser: [
        // do not add new item at last
        {
          name: "Create Post",
          slug: "create-post",
        },
        {
          name: userData?.name,
          slug: `user/${userData?.$id}`,
        },
      ],
      showIfUserNot: [
        // do not add any item here add in showAllways
        {
          name: "Login",
          slug: "login",
        },
        {
          name: "Sign up",
          slug: "signup",
        },
      ],
    }),
    [authStatus, userData]
  );

  return (
    <header className="w-full">
      <Container className="pt-2 z-10">
        <div className="p-3 rounded-md flex justify-between items-center bg-gray-800">
          <Link to="/">
            <h2 className="uppercase text-2xl font-bold">BLOGIFY</h2>
          </Link>
          <ul className="flex items-center gap-5">
            {navItems.showAllways.map((item) => (
              <li key={item.name}>
                <NavLink
                  to={item.slug}
                  className={({ isActive }) =>
                    `text-md font-medium transition-all border-b duration-200 ${
                      isActive
                        ? "text-teal-500 border-b-teal-500"
                        : "hover:text-teal-500 border-b-transparent hover:border-b-teal-500"
                    }`
                  }
                >
                  {item.name}
                </NavLink>
              </li>
            ))}
            {authStatus === true
              ? navItems.showIfUser.map((item, index) => (
                  <li key={item.name}>
                    {index === navItems.showIfUser.length - 1 ? (
                      <div className="group relative bg-gray-700 rounded-md hover:rounded-b-none">
                        <div className="w-full min-w-24 h-9 px-2 bg-gray-700 rounded-md fill-gray-300 flex gap-2 justify-between items-center group-hover:bg-gray-600 cursor-pointer transition-all duration-200">
                          <img
                            src={`https://cloud.appwrite.io/v1/avatars/initials?name=${userData?.name}`}
                            alt={userData?.name}
                            className="rounded-full w-6 h-6 aspect-square bg-gray-900 object-cover"
                          />
                          <span className="text-md font-medium">
                            {item.name}
                          </span>
                          <svg
                            className="transition-all duration-200 group-hover:rotate-180"
                            width="14"
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 448 448"
                          >
                            <path d="M201.4 342.6c12.5 12.5 32.8 12.5 45.3 0l160-160c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L224 274.7 86.6 137.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l160 160z" />
                          </svg>
                        </div>

                        <div className="w-full flex flex-col gap-2 items-center justify-center transition-all duration-200 opacity-0 pointer-events-none group-hover:opacity-100 group-hover:pointer-events-auto rounded-b-md bg-gray-700 absolute top-9 p-3">
                          <NavLink
                            to={item.slug}
                            className={({ isActive }) =>
                              `text-md font-medium transition-all border-b duration-200 text-nowrap ${
                                isActive
                                  ? "text-teal-500 border-b-teal-500"
                                  : "hover:text-teal-500 border-b-transparent hover:border-b-teal-500"
                              }`
                            }
                          >
                            Your Profile
                          </NavLink>
                          <button
                            onClick={logoutHandler}
                            className="text-md font-medium transition-all border-b border-b-transparent duration-200 hover:text-red-500 hover:border-b-red-500"
                          >
                            Logout
                          </button>
                        </div>
                      </div>
                    ) : (
                      <NavLink
                        to={item.slug}
                        className={({ isActive }) =>
                          `text-md font-medium transition-all border-b duration-200 ${
                            isActive
                              ? "text-teal-500 border-b-teal-500"
                              : "hover:text-teal-500 border-b-transparent hover:border-b-teal-500"
                          }`
                        }
                      >
                        {item.name}
                      </NavLink>
                    )}
                  </li>
                ))
              : navItems.showIfUserNot.map((item) => (
                  <li key={item.name}>
                    <NavLink
                      to={item.slug}
                      className={`h-9 px-3 rounded-md font-medium flex justify-center items-center transition-all duration-200
                        ${
                          item.name === "Sign up"
                            ? "bg-teal-600 hover:bg-teal-700"
                            : "bg-gray-700 hover:bg-gray-600"
                        }`}
                    >
                      {item.name}
                    </NavLink>
                  </li>
                ))}
          </ul>
        </div>
      </Container>
    </header>
  );
}

export default Header;
