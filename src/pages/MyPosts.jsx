import React, { useEffect, useState } from "react";
import appwriteService from "../appwrite/config";
import { Container, PostCard } from "../components";
import { useSelector } from "react-redux";

function MyPosts() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Get user data from Redux store
  const userData = useSelector((state) => state.auth.userData);

  useEffect(() => {
    if (!userData?.$id) {
      setError("User not logged in");
      setLoading(false);
      return;
    }

    const fetchPosts = async () => {
      try {
        const response = await appwriteService.getMy(userData?.$id);
        if (response ) {
          setPosts(response);
        } else {
          setError("No posts available for this user.");
        }
      } catch (err) {
        console.error("Error fetching posts:", err);
        setError("Failed to fetch products. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, [userData]); // Adding userData as a dependency

  if (loading) {
    return (
      <div className="w-full py-8 text-center">
        <Container>
          <p className="text-lg">Loading products...</p>
        </Container>
      </div>
    );
  }

  if (error) {
    return (
      <div className="w-full py-8 text-center">
        <Container>
          <p className="text-red-500">{error}</p>
        </Container>
      </div>
    );
  }

  if (posts.length === 0) {
    return (
      <div className="w-full py-8 mt-4 text-center">
        <Container>
          <p className="text-xl font-bold text-gray-600">
            No products available at the moment. Add Products!
          </p>
        </Container>
      </div>
    );
  }

  return (
    <div className="w-full py-8">
      <Container>
        <h1 className="font-bold text-black text-lg py-1 px-2">My Products</h1>
        <div className="flex flex-wrap -m-2 py-1 px-1">
          {posts.map((post) => (
            <div key={post.$id} className="p-2 w-full sm:w-1/2 lg:w-1/4">
              <PostCard {...post} />
            </div>
          ))}
        </div>
      </Container>
    </div>
  );
}

export default MyPosts;
