import React, { useState, useEffect } from "react";
import Slider from "react-slick";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import appwriteService from "../appwrite/config";
import PostCard from "./PostCard";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

// Custom Left Arrow
const PrevArrow = (props) => {
  const { onClick } = props;
  return (
    <button
      onClick={onClick}
      className="absolute left-0 z-10 p-3 bg-amber-600 text-white rounded-full hover:bg-blue-800 transition-all"
      style={{ top: "50%", transform: "translateY(-50%)", left: "-1.5rem" }}
    >
      <FaArrowLeft size={20} />
    </button>
  );
};

// Custom Right Arrow
const NextArrow = (props) => {
  const { onClick } = props;
  return (
    <button
      onClick={onClick}
      className="absolute right-0 z-10 p-3 bg-amber-600 text-white rounded-full hover:bg-blue-800 transition-all"
      style={{ top: "50%", transform: "translateY(-50%)", right: "-1.5rem" }}
    >
      <FaArrowRight size={20} />
    </button>
  );
};

const Carousel = () => {
  const [trendingPosts, setTrendingPosts] = useState([]);
  const [accessories, setAccessories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const settings = {
    dots: false,
    infinite: true,
    speed: 1500,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    pauseOnHover: true,
    arrows: true,
    prevArrow: <PrevArrow />,
    nextArrow: <NextArrow />,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };

  useEffect(() => {
    const fetchTrendingPosts = async () => {
      try {
        const response = await appwriteService.searchPosts("trending");
        if (response) {
          setTrendingPosts(response);
        }
      } catch (err) {
        console.error("Error fetching trending posts:", err);
        setError("Failed to fetch trending posts.");
      } finally {
        setLoading(false);
      }
    };

    const fetchAccessories = async () => {
      try {
        const response = await appwriteService.searchPosts("accessories");
        if (response) {
          setAccessories(response);
        }
      } catch (err) {
        console.error("Error fetching accessories:", err);
        setError("Failed to fetch accessories.");
      } finally {
        setLoading(false);
      }
    };

    fetchTrendingPosts();
    fetchAccessories();
  }, []);

  if (loading) {
    return <p className="text-center text-lg">Loading...</p>;
  }

  if (error) {
    return <p className="text-center text-red-500">{error}</p>;
  }

  return (
    <div className="carousel-container gap-8">
      <div className="carousel-section">
        <h2 className="text-3xl font-bold mb-4 ">Trending </h2>
        <div className="w-[95%] max-w-6xl mx-auto p-4 relative">
          <Slider {...settings} >
            {trendingPosts.map((post) => (
              <div key={post.$id} className="px-3">
                <PostCard {...post} />
              </div>
            ))}
          </Slider>
        </div>
      </div>

      <div className="carousel-section">
        <h2 className="text-3xl font-bold mb-4 ">Accessories</h2>
        <div className="w-[95%] max-w-6xl mx-auto p-4 relative">
          <Slider {...settings}>
            {accessories.map((post) => (
              <div key={post.$id} className="mx-3 px-3">
                <PostCard {...post} />
              </div>
            ))}
          </Slider>
        </div>
      </div>
    </div>
  );
};

export default Carousel;
