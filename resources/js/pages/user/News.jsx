import React, { useState, useEffect } from "react";
import Carousel from "../../component/Caroucel";
import { Link, useLocation } from "react-router-dom";
import { useAPI } from "../../component/contexts/ApiContext";

const carousel = [
  {
    image: "/storage/images/Carousel2.png",
    title: "Youth Events & Activities",
    description:
      "Join our various programs to develop your skills and talents.",
  },
  {
    image: "/storage/images/Carousel1.png",
    title: "Welcome to Batang Inocencio",
    description:
      "Empowering the youth through leadership and community service.",
  },
  {
    image: "/storage/images/Carousel3.png",
    title: "Be a Part of the Change",
    description: "Engage with the community and make a difference.",
  },
  {
    image: "no-image",
    title: "Sample Placeholder",
    description:
      "Displays a placeholder image when no actual image is available",
  },
];

function News() {
  const { getData, postData, putData, deleteData } = useAPI();
  const location = useLocation();
  const [selectedMonth, setSelectedMonth] = useState("");
  const [filteredNews, setFilteredNews] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState();

  useEffect(() => {
    getData("news", setFilteredNews, setLoading, setError);
  }, [getData]);

  useEffect(() => {
    const now = new Date();
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, "0");
    setSelectedMonth(`${year}-${month}`);
  }, []);

  const handleMonthChange = (e) => {
    const selectedValue = e.target.value;
    setSelectedMonth(selectedValue);

    if (!selectedValue) return;

    const filtered = newsList.filter(
      (news) => news.data_date === selectedValue
    );
    setFilteredNews(filtered);
  };

  const isNewsPage = location.pathname.endsWith("news");

  return (
    <>
      {isNewsPage && <Carousel carouselItems={carousel} />}

      <div className="container pb-5">
        {isNewsPage && (
          <div className="input-group mb-4" style={{ maxWidth: "300px" }}>
            <input
              type="month"
              className="form-control"
              id="newsMonthYearPicker"
              value={selectedMonth}
              onChange={handleMonthChange}
            />
            <button className="btn btn-primary">Filter</button>
          </div>
        )}

        {!isNewsPage && (
          <div className="container text-center my-5">
            <h5 className="section-title text-primary">News & Updates</h5>
            <h2 className="main-heading mt-3 text-dark">
              Stay Informed with the Latest <br /> News & Announcements
            </h2>
            <p className="sub-text mt-3">
              Get the latest updates on community events, upcoming projects, and
              important announcements. Stay connected with the latest news from
              the Sangguniang Kabataan (SK) of Barangay Inocencio.
            </p>
          </div>
        )}

        <div className="row g-4">
          {filteredNews.length > 0 ? (
            filteredNews.map((news, index) => (
              <div
                key={index}
                className="col-3 news-card"
                data-date={news.data_date}
              >
                <div className="card rounded-3 shadow-lg  border-0 h-100 d-flex flex-column">
                  <img
                    src={`/storage/${news.image}`}
                    className="card-img-top rounded-top-3 object-fit-cover"
                    alt="News Image"
                    style={{ height: "160px" }}
                  />
                  <div className="card-body d-flex flex-column h-100 p-3">
                    <p className="news-date small text-uppercase">
                      {news.date}
                    </p>
                    <h5 className="card-title">{news.title}</h5>
                    <p className="card-text flex-grow-1">
                      {news.description.slice(0, 100)}...
                    </p>
                    <div className="mt-auto mb-3">
                      <Link
                        to={`/news/${news.id}`}
                        className="btn btn-primary rounded-pill px-4 py-1 read-more-btn"
                      >
                        Read more
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div id="noNewsMessage" className="text-center text-muted">
              <p>No news found.</p>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default News;
