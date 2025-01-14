import React, { useEffect, useState } from "react";
import appwriteService from "../appwrite/config";
import { Container, PostCard } from "../components";
import strip from "../assets/strip.jpg"
import wall from "../assets/wall.png"
function AllPosts() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await appwriteService.getPosts();
        if (response) {
          setPosts(response.documents);
        }
      } catch (err) {
        console.error("Error fetching posts:", err);
        setError("Failed to fetch posts. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

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
         <h1 className="font-bold text-black text-3xl py-5 md:text-5xl  px-5">Discover a curated collection of pre-loved treasures.</h1>
                          <h1 className="font-bold mb-10 text-gray-500 text-xl md:text-3xl py-1 px-6">Where quality meets sustainability, and every item tells a unique story.</h1>
                            <img className="hidden lg:flex w-full h-screen py-2" src={strip} alt="strip" />
                            <img className="lg:hidden flex w-full h-2/3 py-2 mb-24" src={wall} alt="strip" />
        <Container>
          <p className="text-xl font-bold text-gray-600">
            No posts available at the moment. Check back later!
          </p>
        </Container>
      </div>
    );
  }

  return (
    <div className="w-full  ">
      <br />
       <h1 className="font-bold text-center text-black text-3xl py-5 md:text-5xl  px-5">Discover a curated collection of pre-loved treasures.</h1>
                        <h1 className="font-bold text-center mb-10 text-gray-500 text-xl md:text-3xl py-1 px-6">Where quality meets sustainability, and every item tells a unique story.</h1>
                          <img className="hidden lg:flex w-full h-screen py-2" src={strip} alt="strip" />
                          <img className="lg:hidden flex w-full h-2/3 py-2 mb-24" src={wall} alt="strip" />
      <Container>
        
      <h1 className="font-bold  text-center text-black text-3xl py-1 px-2">All Products</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 py-10 px-1">
                 {posts.map((post) => (
                   <div
                     key={post.$id}
                     className="w-full"
                   >
                     <PostCard {...post} />
                   </div>
                 ))}
               </div>
      </Container>
    </div>
  );
}

export default AllPosts;
