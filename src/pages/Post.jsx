import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import appwriteService from "../appwrite/config";
import { Button, Container } from "../components";
import parse from "html-react-parser";
import { useSelector } from "react-redux";

export default function Post() {
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const { slug } = useParams();
  const navigate = useNavigate();


  const [isModalOpen, setIsModalOpen] = useState(false); // State to track modal visibility
  const [currentImage, setCurrentImage] = useState(""); // Store the clicked image URL

  // Function to handle opening the modal and setting the current image
  const openImagePreview = (imageSrc) => {
    setCurrentImage(imageSrc);
    setIsModalOpen(true);
  };

  // Function to close the modal
  const closeModal = () => {
    setIsModalOpen(false);
    setCurrentImage(""); // Reset image on modal close
  };

  const userData = useSelector((state) => state.auth.userData);
  const isAuthor = post && userData ? post.userId === userData.$id : false;

  useEffect(() => {
    if (slug) {
      setLoading(true);
      setError("");
      appwriteService
        .getPost(slug)
        .then((post) => {
          if (post) setPost(post);
          else throw new Error("Post not found");
        })
        .catch((error) => {
          console.error("Failed to fetch post:", error);
          setError("Failed to load the post. Please try again later.");
        })
        .finally(() => setLoading(false));
    } else {
      navigate("/");
    }
  }, [slug, navigate]);

  const deletePost = async () => {
    const confirmDelete = window.confirm("Are you sure you want to delete this Product?");
    if (!confirmDelete) return;

    try {
      await appwriteService.deletePost(post.$id);
      await appwriteService.deleteBuyer(post.$id);
      if (post.featured_image1) {
        await appwriteService.deleteFile(post.featured_image1);
      }
      if (post.featured_image2) {
        await appwriteService.deleteFile(post.featured_image2);
      }

      navigate("/");
    } catch (error) {
      console.error("Failed to delete post:", error);
      alert("Failed to delete the post. Please try again.");
    }
  };


  
 




  if (loading) {
    return (
      <div className="text-center py-8">
        <div className="spinner">Loading...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="w-full py-8 text-center">
        <Container>
          <p className="text-red-600">{error}</p>
          <Button onClick={() => navigate("/")}>Go Back</Button>
        </Container>
      </div>
    );
  }
  return post ? (
    <div className="py-8">
      <Container>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
          {post.featured_image1 && (
             <img
             src={appwriteService.getFilePreview(post.featured_image1)}
             alt={post.title || "Post Image"}
             className="rounded-xl w-full h-64 object-cover shadow-md hover:shadow-lg transition-shadow duration-300 cursor-pointer"
             onClick={() => openImagePreview(appwriteService.getFilePreview(post.featured_image1))}
             onError={(e) => {
               e.target.src = "https://placehold.co/600x400?text=No+Image
"; // Fallback for broken image links
             }}
           />
          )}
          {post.featured_image2 && (
           <img
           src={appwriteService.getFilePreview(post.featured_image2)}
           alt={post.title || "Post Image"}
           className="rounded-xl w-full h-64 object-cover shadow-md hover:shadow-lg transition-shadow duration-300 cursor-pointer"
           onClick={() => openImagePreview(appwriteService.getFilePreview(post.featured_image2))}
           onError={(e) => {
             e.target.src = "https://placehold.co/600x400?text=No+Image
"; // Fallback for broken image links
           }}
         />
          )}
        </div>

        {isAuthor && (
          <div className="flex justify-end mb-4">
            <Link to={`/edit-post/${post.$id}`}>
              <Button bgColor="bg-green-500" className="mr-3">
                Edit
              </Button>
            </Link>
            <Button bgColor="bg-red-500" className="mr-3" onClick={deletePost}>
              Delete
            </Button>
            <Link to={`/buyers/${post.$id}`}>
            <Button bgColor="bg-blue-500">
              Buyers
            </Button>
            </Link>
          </div>
        )}



        {/* New Buy Item */}



        {!isAuthor && (
          <div className="flex justify-end mb-4">
            <Link to={`/buy-post`}>
            <Button bgColor="bg-blue-500">
              Buy
            </Button>
            </Link>
          </div>
        )}




        <div className="w-full mb-6 text-center">
          <h1 className="text-3xl font-bold text-gray-800">{post.title || "Untitled Post"}</h1>
        </div>
        <div className="w-full mb-6 text-center">
          <h1 className="text-sm font-bold text-gray-800">Product ID: {post?.$id || "No ID"}</h1>
          <p className="text-sm font-thin text-gray-400">!!!copy before buying</p>
        </div>
        <div className="prose max-w-none text-gray-700">
          
        <h3 className="text-lg text-black font-bold">Description:</h3>
          {parse(post.description || "<p>No content available</p>")}
        </div>
        <div className="prose max-w-none text-gray-700">
          <h3 className="text-lg text-black font-bold">Tags:</h3>
          {parse(post.tags || "<p>No content available</p>")}
        </div>
      </Container>
         {/* Modal for Image Preview */}
         {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="relative bg-white p-4 rounded-lg shadow-lg max-w-3xl w-full">
            <button
              className="absolute top-0 right-0 p-2 text-black font-bold text-lg"
              onClick={closeModal}
            >
              X
            </button>
            <img
              src={currentImage}
              alt="Preview"
              className="w-full max-h-[80vh] object-contain"
            />
          </div>
        </div>
      )}
    </div>
  ) : (
    <div className="text-center py-8">
      <p className="text-lg">Product not found!</p>
    </div>
  );
}
