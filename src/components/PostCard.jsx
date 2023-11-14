import React from "react";
import appwriteService from "../appwrite/Config";
import { Link } from "react-router-dom";
function PostCard({ $id, title, featuredImage }) {
  return (
    <Link to={`/post/${$id}`}>
      <div className="w-[300px] rounded-md hover:shadow-xl hover:duration-500 hover:ease-in-out hover:scale-125 ">
        <img
          src={appwriteService.getFilePreview(featuredImage)}
          alt={title}
          className="h-[200px] w-full rounded-md object-cover"
        />
        <div className="p-4">
          <h2 className="text-lg font-semibold">{title}</h2>
          <p className="mt-3 text-sm text-gray-600">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Iusto
            officia mollitia ipsum consequuntur, quo doloremque quaerat expedita
            ut deserunt harum architecto error magnam optio vero, repudiandae
            facere corrupti voluptatem facilis.
          </p>
        </div>
      </div>
    </Link>
  );
}

export default PostCard;
