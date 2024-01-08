import React, { useState, useEffect } from "react";
import appwriteService from "../appwrite/Config";
import { Container, PostCard } from "../components/index";
import { useDispatch } from "react-redux";
import { setstoreData } from "../Feature/DataSlice";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

function Home() {
  const authStatus = useSelector((state) => state.auth.userData);
  const [loading, setLoading] = useState(true);
  const [posts, setPosts] = useState([]);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    appwriteService
      .getPosts()
      .then((posts) => {
        if (posts) {
          setPosts(posts.documents);
          dispatch(setstoreData(posts.documents));
          setLoading(false);
        }
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        if (authStatus === null) {
          navigate("/login");
        }
        if (authStatus) {
          navigate("/");
        }
      });
  }, [authStatus]);

  if (posts?.length === 0) {
    return (
      <div className="w-full py-8 mt-4 text-center bg-tathini-dark">
        <Container>
          <div className="flex justify-center items-center">
            <svg
              className="animate-spin h-16 w-16 text-gray-500"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              ></circle>
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              ></path>
            </svg>
          </div>
        </Container>
      </div>
    );
  }

  return (
    <div className="w-full py-8 flex flex-col">
      <Container>
        <div className="flex flex-wrap justify-normal">
          {posts.map((post) => (
            <div
              key={post.$id}
              className="p-2 w-full sm:w-1/2 md:w-1/3 lg:w-1/4"
            >
              <PostCard {...post} />
            </div>
          ))}
        </div>
      </Container>
    </div>
  );
}

export default Home;
