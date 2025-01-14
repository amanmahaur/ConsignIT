import React, { useEffect,useState } from "react";
import { Container, PostCard } from "../components";
import { usePostContext } from "../Context/PostContext";

function Results() {
  const { posts = [], error, loading, fetchPosts } = usePostContext(); 
  
  // You can set tag value based on query params, URL, or any other logic
 
    if (loading) {
        return (
          <div className="w-full py-8 text-center">
            <Container>
              <p className="text-lg">Loading posts...</p>
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
                No posts available at the moment. Check back later!
              </p>
            </Container>
          </div>
        );
      }



   return (
     <div className="w-full py-8">
       <Container>
         <div className="flex flex-wrap -m-2 py-1 px-1"> 
           {posts.map((post) => (
             <div
               key={post.$id}
               className="p-2 w-full sm:w-1/2 lg:w-1/4"
             >
               <PostCard {...post} />
             </div>
           ))}
         </div>
       </Container>
     </div>
   );
 }


export default Results;
