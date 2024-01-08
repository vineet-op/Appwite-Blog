import React, { useState, useEffect } from "react";
import appwriteService from "../appwrite/Config";
import { Link, useNavigate } from "react-router-dom";
import { Container, PostCard } from "../components/index";

function AllPost() {
  const [post, setPost] = useState([]);

  appwriteService.getPosts([]).then((posts) => {
    if (posts) {
      setPost(posts.documents);
    }
  });
  if (post.length === 0) {
    return (
      <div className="flex gap-6 gap-y-10 py-6  md:grid-cols-2 lg:grid-cols-3 justify-center text-center">
        there are no post please go to{" "}
        <Link to="/add-post" className="text-underline text-black">
          Add-Post
        </Link>{" "}
        page and add some post
      </div>
    );
  }
  return (
    <div>
      <Container>
        <div className="grid gap-2 gap-y-10 py-6 md:grid-cols-2 lg:grid-cols-3">
          {" "}
          {post.map((post) => {
            return (
              <div key={post.$id}>
                <PostCard {...post} />
              </div>
            );
          })}
        </div>
      </Container>
    </div>
  );
}

export default AllPost;
