import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import appwriteService from "../appwrite/Config";
import { Button, Container } from "../components";
import parse from "html-react-parser";
import { useSelector } from "react-redux";

export default function Post() {
  const [post, setPost] = useState(null);
  const { slug } = useParams();
  const navigate = useNavigate();

  const userData = useSelector((state) => state.auth.userData);

  useEffect(() => {
    if (slug) {
      appwriteService.getPost(slug).then((post) => {
        if (post) setPost(post);
        else navigate("/");
      });
    } else navigate("/");
  }, [slug, navigate]);

  const deletePost = () => {
    appwriteService.deletePost(post.$id).then((status) => {
      if (status) {
        appwriteService.deleteFile(post.FeaturedImage);
        navigate("/");
      }
    });
  };

  return post ? (
    <div className="py-8">
      <Container>
        <div className="w-full flex flex-col items-center mb-4 sm:flex-row sm:justify-center relative border rounded-xl p-2">
          <div className="mb-4 sm:mb-0 sm:mr-4 sm:w-1/3 sm:flex-none sm:self-start">
            <img
              src={appwriteService.getFilePreview(post.FeaturedImage)}
              alt={post.Title}
              className="rounded-xl"
            />
            <div className="absolute top-0 left-0 sm:static sm:ml-2 mt-2">
              <Link to={`/edit-post/${post.$id}`}>
                <Button bgColor="bg-green-500" className="mr-3">
                  Edit
                </Button>
              </Link>
              <Button bgColor="bg-red-500" onClick={deletePost}>
                Delete
              </Button>
            </div>
          </div>
          <div className="w-full sm:w-2/3">
            <div className="mb-6">
              <h1 className="text-2xl font-bold">{post.Title}</h1>
            </div>
            <div className="browser-css">{parse(post.Content)}</div>
          </div>
        </div>
      </Container>
    </div>
  ) : null;
}
