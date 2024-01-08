import React from "react";
import appwriteService from "../appwrite/Config";
import { Link } from "react-router-dom";

function PostCard({ $id, Title, FeaturedImage }) {
  return (
    <Link to={`/post/${$id}`} className="block">
      <div className="w-full sm:w-[300px] rounded-md overflow-hidden hover:shadow-sm hover:duration-500 hover:ease-in-out hover:scale-125 border-solid border-4 border-slate-700">
        <img
          src={appwriteService.getFilePreview(FeaturedImage)}
          alt={Title}
          className="h-[200px] w-full rounded-md object-cover"
        />
        <div className="p-4">
          <h2 className="text-lg font-bold text-gray-900">{Title}</h2>
          <p className="mt-3 text-sm text-gray-900">
            Click to Read More.............
          </p>
        </div>
      </div>
    </Link>
  );
}

export default PostCard;
