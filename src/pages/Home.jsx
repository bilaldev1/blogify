import React, { useState, useMemo, useCallback } from "react";
import { useSelector } from "react-redux";
import { Container, ButtonTeal, ButtonGray, PostCard } from "../components";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";

function Home() {
  const userData = useSelector((state) => state.auth.userData);
  const posts = useSelector((state) => state.post.posts);
  const [isSorted, setIsSorted] = useState(true);

  const sortedPosts = useMemo(() => {
    return isSorted ? posts : [...posts].reverse(); // posts?.slice().reverse();
  }, [posts, isSorted]);

  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 10;
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPagePosts = sortedPosts?.slice(
    indexOfFirstPost,
    indexOfLastPost
  );
  const paginate = useCallback((pageNumber) => setCurrentPage(pageNumber), []);

  const toggleSort = () => {
    setIsSorted((prevIsSorted) => !prevIsSorted);
    setCurrentPage(1);
  };

  return (
    <>
      <Helmet>
        <title>Blogify - World Of Insightful Posts</title>
        <meta
          name="description"
          content="Unlock a world of insightful posts! Let's Dive into the World of Writing and Beyond."
        />
        <link rel="canonical" href="/" />
      </Helmet>

      {userData ? (
        posts?.length === 0 ? (
          <div className="w-full py-10">
            <Container className="flex flex-col items-center gap-5">
              <h1 className="text-4xl font-bold">There is nothing to show!</h1>
              <h2 className="text-2xl font-medium">Please create posts.</h2>
              <Link to="/create-post">
                <ButtonTeal type="button">Create Post</ButtonTeal>
              </Link>
            </Container>
          </div>
        ) : (
          <div className="w-full py-10">
            <Container className="flex flex-col gap-5">
              <div className="flex justify-between items-center">
                <h1 className="text-3xl font-bold">All Posts</h1>
                <div className="flex gap-5">
                  {sortedPosts?.length > 1 && (
                    <ButtonGray type="button" onClick={toggleSort}>
                      {isSorted ? "See Oldest First" : "See Latest First"}
                    </ButtonGray>
                  )}
                  <Link to="/create-post">
                    <ButtonTeal type="button">Create New Post</ButtonTeal>
                  </Link>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-7">
                {currentPagePosts?.map((post) => (
                  <PostCard key={post?.$id} {...post} />
                ))}
              </div>
              {sortedPosts?.length > postsPerPage && (
                <div className="flex gap-3 justify-center items-center pt-5">
                  {/* here "_" in the arrow function is used to ignore the value of array */}
                  {Array.from(
                    { length: Math.ceil(posts.length / postsPerPage) },
                    (_, index) => (
                      <button
                        key={index}
                        onClick={() => paginate(index + 1)}
                        className={`h-8 w-8 text-lg leading-[0] rounded-md transition-all duration-200 ${
                          currentPage === index + 1
                            ? "bg-gray-600"
                            : "bg-gray-800 hover:bg-gray-700"
                        }`}
                      >
                        {index + 1}
                        {/* here "index + 1" because array index starts from 0 but we want
                        to start pagination from 1, thats why everywhere in this
                        button we are using "index + 1" */}
                      </button>
                    )
                  )}
                </div>
              )}
            </Container>
          </div>
        )
      ) : (
        <div className="w-full py-10">
          <Container className="flex flex-col items-center gap-5">
            <h1 className="text-4xl font-bold">
              Unlock a world of insightful posts!
            </h1>
            <h2 className="text-2xl font-medium">
              Login or Sign up now to start exploring.
            </h2>
          </Container>
        </div>
      )}
    </>
  );
}

export default Home;
