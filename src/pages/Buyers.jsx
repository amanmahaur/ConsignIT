import React, { useEffect, useState } from "react";
import appwriteService from "../appwrite/config";
import { Button, Container } from "../components";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import parse from "html-react-parser";

function Buyers() {
  const [buyers, setBuyers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [post, setPost] = useState(null);

  const { slug } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPost = async () => {
      if (slug) {
        try {
          const fetchedPost = await appwriteService.getPost(slug);
          if (fetchedPost) {
            setPost(fetchedPost);
          }
        } catch (error) {
          console.error("Error fetching post:", error);
          navigate("/");
        }
      } else {
        navigate("/");
      }
    };

    fetchPost();
  }, [slug, navigate]);

  useEffect(() => {
    const fetchBuyers = async () => {
      if (!post?.$id) return;
      try {
        const response = await appwriteService.getBuyers(post.$id);
        if (response) {
          setBuyers(response); // Adjust if response has a different structure
        }
      } catch (err) {
        console.error("Error fetching buyers:", err);
        setError("Failed to fetch buyers. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchBuyers();
  }, [post]);

  const acceptNotif = async (id) => {
    const flag = window.confirm("Are you sure?");
    if (!id || !flag) return;

    try {
      const acceptNotifData = {
        notification: "Congratulations! Buying request accepted.",
        email: id,
        product_name: post?.title || "Unknown Product",
      };
      await appwriteService.createNotification(acceptNotifData);
      console.log("Notification sent successfully to buyer:", id);
    } catch (err) {
      console.error("Error in sending notification:", err);
    }
  };

  const deleteNotif = async (id, ID) => {
    const flag = window.confirm("Are you sure?");
    if (!id || !flag) return;

    try {
      const deleteNotifData = {
        notification: "Sorry! Product is sold out.",
        email: id,
        product_name: post?.title || "Unknown Product",
      };
      await appwriteService.createNotification(deleteNotifData);
      await appwriteService.deleteBuyer(ID);
      setBuyers((prev) => prev.filter((buyer) => buyer.email !== id)); // Update state
      console.log("Buyer deleted successfully:", id);
    } catch (err) {
      console.error("Error in deleting buyer:", err);
    }
  };

  if (loading) {
    return (
      <div className="w-full py-8 text-center">
        <Container>
          <p className="text-lg">Loading buyers...</p>
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

  if (buyers.length === 0) {
    return (
      <div className="w-full py-8 mt-4 text-center">
        <Container>
          <p className="text-xl font-bold text-gray-600">
            No buyers found at the moment. Check back later!
          </p>
        </Container>
      </div>
    );
  }

  return (
    <div className="w-full py-8">
      <Container>
        <h1 className="text-3xl text-center font-bold text-black py-1 my-5 px-2">
          All Buyers
        </h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {buyers.map((buyer) => (
            <div
              key={buyer.$id}
              className="p-4 bg-white rounded-lg shadow-md hover:shadow-lg transform transition-all hover:scale-105"
            >
              <div className="flex flex-col space-y-3">
                <h2 className="font-bold text-gray-800 truncate">
                  {buyer.name || "Unnamed Buyer"}
                </h2>
                <p className="text-gray-600">Email: {buyer.email}</p>
                <p className="text-gray-600">Number: {buyer.number}</p>
                <p className="text-gray-600">
                  Description:{" "}
                  {parse(buyer.description || "<p>No description provided.</p>")}
                </p>
                <p className="text-gray-600">
                  Product ID: {buyer.productId || "N/A"}
                </p>
                <div className="flex gap-2 mt-auto">
                  <Button
                    onClick={() => acceptNotif(buyer.email)}
                    className="bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded"
                  >
                    Accept
                  </Button>
                  <Button
                    onClick={() => deleteNotif(buyer.email, buyer?.$id)}
                    className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded"
                  >
                    Delete
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </Container>
    </div>
  );
}

export default Buyers;
