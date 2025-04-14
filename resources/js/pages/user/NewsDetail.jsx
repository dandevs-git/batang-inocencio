import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { useAPI } from "../../component/contexts/ApiContext";

// const newsList = [
//   {
//     id: "1",
//     date: "2025-03-17",
//     data_date: "2025-03",
//     title: "KNOCK KNOCK, WHO’S HAIR?",
//     image: "News1.png",
//     description:
//       "Sa huling pagkatok ng Batang Inocencio ay pinagbuksan ito para sa proyektong “Knock-knock, Who’s hair?” na ....",
//   },
//   {
//     id: "2",
//     date: "2025-03-12",
//     data_date: "2025-03",
//     title: "Youth Empowerment Summit 2025",
//     image: "News1.png",
//     description:
//       "The Batang Inocencio Youth Summit secondaryfully gathered young leaders across the region to discuss...",
//   },
//   {
//     id: "3",
//     date: "2025-04-10",
//     data_date: "2025-04",
//     title: "Tree Planting Activity",
//     image: "News1.png",
//     description:
//       "Batang Inocencio leads a tree-planting activity to promote environmental sustainability...",
//   },
//   {
//     id: "4",
//     date: "2025-04-22",
//     data_date: "2025-04",
//     title: "Barangay Cleanup Drive",
//     image: "News1.png",
//     description:
//       "Residents and youth volunteers joined hands to clean up the streets of Barangay Inocencio...",
//   },
// ];

const NewsDetail = () => {
  const { getData } = useAPI();
  const { id } = useParams();
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState();
      const [newsList, setNewsList] = useState([]);

  const fetchData = async () => {
    await getData(
      "news",
      setLoading,
      setError
    );
  };

  useEffect(() => {
    const fetchData = async () => {
      const data = await getData(
        "news",
        setLoading,
        setError
      );

      setNewsList(data)
    };
    fetchData()
  }, [])
  
  
  const news = newsList.find((item) => item.id == id);

  if (!news) {
    return (
      <div className="container text-center my-5">
        <h3 className="text-danger">News not found</h3>
        <button
          onClick={() => window.history.back()}
          className="btn btn-outline-primary"
        >
          Go back to the previous page
        </button>
      </div>
    );
  }

  return (
    <div className="container mt-5">
      <div className="row px-3">
        <div className="col-8 px-3">
          <h1>{news.title}</h1>
          <p className="text-muted ps-2">
            Date:{" "}
            {new Date(news.date).toLocaleDateString("en-US", {
              month: "long",
              day: "numeric",
              year: "numeric",
            })}
          </p>
          <img
            src={`/storage/${news.image}`}
            className="rounded-4 border shadow-lg object-fit-cover w-100"
            alt={news.title}
          />
          <div className="fs-3 mt-3">
            <Link
              to={"#"}
              className="bi bi-facebook"
              style={{ color: "#1877F2" }}
              aria-label="Share on Facebook"
            ></Link>
            <Link
              to={"#"}
              className="bi bi-instagram"
              style={{ color: "#E4405F" }}
              aria-label="Share on Instagram"
            ></Link>
            <Link
              to={"#"}
              className="bi bi-twitter"
              style={{ color: "#1DA1F2" }}
              aria-label="Share on Twitter"
            ></Link>
          </div>
          <p
            className="p-3 text-wrap"
            style={{ textIndent: "50px", textAlign: "justify" }}
          >
            {news.description}
          </p>
          <Link
            to={'/news'}
            className="btn btn-outline-dark"
          >
            <i className="bi bi-arrow-left"></i> Go to News Page
          </Link>
        </div>

        <div className="col-4 px-3">
          <h5 className="fw-bold">Latest Post</h5>

          {newsList.map((news, index) => (
            <div className="card shadow-lg mb-4" key={news.id || index}>
              <div className="card-body">
                <p className="text-muted">
                  {new Date(news.date).toLocaleDateString("en-US", {
                    month: "long",
                    day: "numeric",
                    year: "numeric",
                  })}
                </p>
                <h5 className="fw-semibold text-uppercase">
                  “TAGLAY ANG PUSO’T TALINO, TUNGO SA KALIDAD NA SERBISYO”
                </h5>
                <p>
                  {news.content?.slice(0, 120) ||
                    "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean blandit elit eu iaculis sodales..."}
                </p>
                <div className="text-end">
                  <Link
                    to={`/news/${news.id}`}
                    className="text-dark link-underline-primary link-offset-2 link-underline link-underline-opacity-50"
                  >
                    See More
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default NewsDetail;
