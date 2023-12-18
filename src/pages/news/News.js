import React, { useEffect, useState } from "react";
import "./news.css";
import axios from "axios";

import Heading from "../heading/Heading";
import { Row, Col } from "react-grid-system";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Loading from "../loading/Loading";

const News = () => {
  const [news, setNews] = useState([]);
  const [count, setCount] = useState(0);
  const [loading, setLoading] = useState(false);
  const apiUrl = process.env.REACT_APP_API_URL;

  useEffect(() => {
    getAllNews();
  }, [count]);

  const getAllNews = () => {
    setLoading(true);
    axios.get(apiUrl + "/news").then((res) => {
      setNews(res.data);
      setLoading(false);
    });
  };

  const [searchParams, setSearchParams] = useState({
    title: "",
    description: "",
    author: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setSearchParams((prevParams) => ({ ...prevParams, [name]: value }));
  };

  const search = () => {
    setLoading(true);
    axios.post(apiUrl + "/search", searchParams).then((res) => {
      setNews(res.data);
      setLoading(false);
    });
  };

  return (
    <section className="music">
      <Heading title="News" />

      <Row className="searchRow">
        <Col xs={12} md={3}>
          <input
            type="text"
            name="title"
            value={searchParams.title}
            onChange={handleInputChange}
            placeholder="Title"
            className="form-control"
          />
        </Col>
        <Col xs={12} md={3}>
          <input
            type="text"
            name="description"
            value={searchParams.description}
            onChange={handleInputChange}
            placeholder="Description"
            className="form-control"
          />
        </Col>
        <Col xs={12} md={3}>
          <input
            type="text"
            name="author"
            value={searchParams.author}
            onChange={handleInputChange}
            placeholder="Author"
            className="form-control"
          />
        </Col>
        <Col xs={12} md={3}>
          <button onClick={search} className="btn btn-primary">
            Search
          </button>
        </Col>
      </Row>
      {loading && <Loading />}
      <div className="content">
        {news.length > 0 &&
          news?.map((val) => {
            return (
              <div key={val.id} className="items">
                <div className="box shadow flexSB">
                  <div className="images">
                    <div className="img">
                      <img src={val.url_to_image} alt="" />
                    </div>
                  </div>
                  <div className="text">
                    <h1 className="title">{val.title?.slice(0, 40)}...</h1>
                    <div className="date">
                      <i className="fas fa-calendar-days"></i>
                      <label>{val.published_at}</label>
                    </div>
                    <p className="desc">{val.description?.slice(0, 250)}...</p>
                    <div className="comment">
                      <a href={val.url}>Read more....</a>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
      </div>
    </section>
  );
};

export default News;
