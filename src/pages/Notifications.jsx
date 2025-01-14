import React, { useEffect, useState } from "react";
import appwriteService from "../appwrite/config";
import { Container, Button } from "../components";
import { useSelector } from "react-redux";

function Notifications() {
  const [notif, setNotif] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Get user data from Redux store
  const userData = useSelector((state) => state.auth.userData);

  const deleteN = async (noti) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this Notification?");
    if (!confirmDelete) return;

    try {
      await appwriteService.deleteNotification(noti.$id);
      setNotif((prev) => prev.filter((item) => item.$id !== noti.$id)); // Update state
    } catch (error) {
      console.error("Failed to delete", error);
      alert("Failed to delete Notification. Please try again.");
    }
  };

  useEffect(() => {
    if (!userData?.$id) {
      setError("User not logged in");
      setLoading(false);
      return;
    }

    const fetchNotif = async () => {
      try {
        const response = await appwriteService.getNotification(userData?.email);
        if (response) {
          setNotif(response);
        } else {
          setError("No notifications available for this user.");
        }
      } catch (err) {
        console.error("Error fetching notifications:", err);
        setError("Failed to fetch notifications. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchNotif();
  }, []); // Adding userData as a dependency

  if (loading) {
    return (
      <div className="w-full py-8 text-center">
        <Container>
          <p className="text-lg">Loading Notifications...</p>
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

  if (notif.length === 0) {
    return (
      <div className="w-full py-8 mt-4 text-center">
        <Container>
          <p className="text-xl font-bold text-gray-600">
            No Notifications available at the moment.
          </p>
        </Container>
      </div>
    );
  }

  return (
    <div className="w-full py-8">
      <Container>
        <h1 className="font-bold text-black text-lg py-1 px-2">My Notifications</h1>
        <div className="flex gap-6 flex-wrap justify-center sm:justify-start py-2 px-2">
          {notif.map((noti) => (
            <div
              key={noti.$id}
              className="p-4 w-full sm:w-1/2 lg:w-1/3 xl:w-1/4 bg-white rounded-lg shadow-lg transform transition-all hover:scale-105 hover:shadow-xl"
            >
              <div className="p-4 flex flex-col space-y-3">
                <h2 className="font-bold text-gray-800 text-lg truncate">
                  {noti.product_name || "Unnamed"}
                </h2>
                <p className="text-gray-600 text-sm line-clamp-3">
                  {noti.notification || "No description provided."}
                </p>
                <Button
                  onClick={() => deleteN(noti)}
                  className="mt-auto bg-red-500 text-white hover:bg-red-600 transition-all"
                >
                  Delete
                </Button>
              </div>
            </div>
          ))}
        </div>
      </Container>
    </div>
  );
}

export default Notifications;
