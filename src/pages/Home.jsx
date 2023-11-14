import React, { useState, useEffect } from "react";
import appwriteService from "../appwrite/Config";
import { Container, PostCard } from "../Components";
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
      .then((post) => {
        if (post) {
          setPosts(post.documents);
          dispatch(setstoreData(post.documents));
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
            <h3>there are no posts please add some post</h3>
          </div>
        </Container>
      </div>
    );
  }

  return (
    <div className="w-full py-8">
      <Container>
        <div className="flex flex-wrap">
          {posts.map((post) => {
            return (
              <div key={post.$id} className="p-2 w-1/4">
                <PostCard {...post} />
              </div>
            );
          })}
        </div>
      </Container>
    </div>
  );
}

export default Home;
