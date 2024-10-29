import React from "react";
import { Container, PostForm } from "../components";
import { Helmet } from "react-helmet-async";

function CreatePost() {
  return (
    <>
      <Helmet>
        <title>Create New Post - Blogify</title>
        <meta
          name="description"
          content="Unlocking Your Creative Potential! Let's Dive into the World of Writing and Beyond."
        />
        <link rel="canonical" href="/create-post" />
      </Helmet>

      <div className="w-full py-10">
        <Container className="flex flex-col justify-center items-center gap-5">
          <h1 className="text-4xl font-bold">Create a new post</h1>
          <PostForm />
        </Container>
      </div>
    </>
  );
}

export default CreatePost;
