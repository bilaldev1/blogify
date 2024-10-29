import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import authService from "./appwrite/auth";
import databaseService from "./appwrite/database";
import { login } from "./store/authSlice";
import { setPosts } from "./store/postSlice";
import { setUsers } from "./store/userSlice";
import { Header, Footer } from "./components";
import { Outlet } from "react-router-dom";

function App() {
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [userData, allPosts, allUsers] = await Promise.all([
          authService.getCurrentUser(),
          databaseService.getPosts(),
          databaseService.getUsers(),
        ]);

        if (userData) {
          allPosts && dispatch(setPosts(allPosts.documents));
          dispatch(login(userData));
          allUsers && dispatch(setUsers(allUsers.documents));
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  return !loading ? (
    <>
      <Header />
      <main className="w-full min-h-[calc(100vh-7.8rem)] flex flex-col gap-20 items-center justify-center">
        <Outlet />
      </main>
      <Footer />
    </>
  ) : null;
}

export default App;
