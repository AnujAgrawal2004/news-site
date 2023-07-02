import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
const FetchData = ({ cat }) => {
  const [Data, setData] = useState("");
  const fetchData = async () => {
    await axios
      .get(
        cat
          ? `https://newsapi.org/v2/top-headlines?country=in&category=${cat}&apiKey=${process.env.REACT_APP_NEWS_API_KEY}`
          : `https://newsapi.org/v2/top-headlines?country=in&apiKey=${process.env.REACT_APP_NEWS_API_KEY}`
      )
      .then((res) => setData(res.data.articles));
  };
  useEffect(() => {
    fetchData();
  }, [cat]);
  return (
    <div className="container my-4 ">
      <h3>
        <u>Top Headlines</u>
      </h3>
      <div
        className="container d-flex flex-column justify-content-center align-items-center my-3"
        style={{ minHeight: "100vh" }}
      >
        {Data
          ? Data.map((items, index) => (
              <>
                <div
                  className="container my-3 p-3"
                  style={{
                    width: "600px",
                    boxShadow: "2px 2px 10px silver",
                    borderRadius: "10px",
                  }}
                >
                  <h5 className="my-2">{items.title}</h5>

                  <div className="d-flex justify-content-center align-items-center">
                    <img
                      src={items.urlToImage}
                      alt="Image not found"
                      className="img-fluid"
                      style={{
                        width: "100%",
                        height: "300px",
                        objectFit: "cover",
                      }}
                    />
                  </div>
                  <p className="my-1">{items.content}</p>
                  <Link to={items.url} target="blank">
                    View More
                  </Link>
                </div>
              </>
            ))
          : "LOADING"}
      </div>
    </div>
  );
};

export default FetchData;
