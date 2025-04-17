import React from "react";
import appwriteService from "../appwrite/config";
import { Link } from "react-router-dom";

function PostCard({ $id, title, featured_image1 }) {
    // Determine the image preview URL or use a fallback placeholder
    const imagePreview = featured_image1
        ? appwriteService.getFilePreview(featured_image1)
        : "https://placehold.co/600x400?text=No+Image";

    return (
        <Link to={`/post/${$id}`} className="block group">
            <div className="w-full bg-gray-100 rounded-xl p-4 shadow-md hover:shadow-lg transition-shadow duration-300 min-w-[120px] min-h-[150px]">
                <div className="w-full flex justify-center mb-4">
                    <img
                        src={imagePreview}
                        alt={title || "Post Image"}
                        className="rounded-xl w-full h-48 object-cover sm:h-40"
                        onError={(e) => {
                            e.target.src = "https://placehold.co/600x400?text=No+Image"; // Fallback image
                        }}
                    />
                </div>
                <h2 className="text-xs sm:text-xl font-bold text-gray-800 group-hover:text-blue-600 transition-colors duration-300">
                    {title || "Untitled Post"}
                </h2>
            </div>
        </Link>
    );
}

export default PostCard;
