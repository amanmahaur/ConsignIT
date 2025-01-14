import React, { createContext, useState, useContext } from 'react';
import appwriteService from '../appwrite/config';

const PostContext = createContext({});

// Custom hook to use the PostContext
export function usePostContext() {
  return useContext(PostContext);
}

// Provider component to wrap around parts of the app needing post data
export function PostProvider({ children }) {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const fetchPosts = async (tag) => {
    try {
      setLoading(true);
      setError(""); // Clear previous errors
      const response = await appwriteService.searchPosts(tag);
      setPosts(response);
    } catch (err) {
      setPosts([]);
      setError("Failed to load posts. Please try again.");
      console.error("Error fetching posts:", err);
    } finally {
      setLoading(false);
    }
  };

  const contextValue = {
    posts,
    loading,
    error,
    fetchPosts,
  };

  return (
    <PostContext.Provider value={contextValue}>
      {children}
    </PostContext.Provider>
  );
}

