import React, { createContext, useContext, useEffect, useState } from "react";
import "./Home.css";
import axios from "axios";
import PostCard from "./PostCard/PostCard";
import Banner from "./Banner/Banner";
import Loader from "../Loader/Loader";

function Home() {
  const [activeButton, setActiveButton] = useState("sale");
  const [postData, setPostData] = useState([]);

  let button_css = "home_button_clicked";
  function handleClick(buttonId) {
    setActiveButton(buttonId);
  }
  

  useEffect(() => {
    fetchPosts();
  }, [postData]);

  async function fetchPosts() {
    try {
      const response = await axios.get("http://localhost:8080/post");
      setPostData(response.data);
    } catch (error) {
      console.error("Error fetching posts:", error);
    }
  }
  // console.log(postData);

  return (
    <>
      <Banner />
      <div className="home">
        <div className="home_navbar">
          <div
            className={
              activeButton === "sale"
                ? "home_button_clicked"
                : "home_button_not_clicked"
            }
            onClick={() => handleClick("sale")}
          >
            for sale
          </div>
          <div
            className={
              activeButton === "rent"
                ? "home_button_clicked"
                : "home_button_not_clicked"
            }
            onClick={() => handleClick("rent")}
          >
            for rent
          </div>
        </div>
        {postData ? (
          <div className="home_posts">
            {activeButton === "sale" && (
              <div className="sale">
                <div className="home_post_container">
                  {postData?.map((post) => {
                    if (post.for === "sale") return <PostCard post={post} />;
                  })}
                </div>
              </div>
            )}
            {activeButton === "rent" && (
              <div className="rent">
                <div className="home_post_container">
                  {postData?.map((post) => {
                    if (post.for === "rent") return <PostCard post={post} />;
                  })}
                </div>
              </div>
            )}
          </div>
        ) : (
          <Loader />
        )}
      </div>
    </>
  );
}

export default Home;
