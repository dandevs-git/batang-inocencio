import { useParams, useNavigate } from "react-router-dom";

const newsList = [
  {
    id: "1",
    date: "2025-03-17",
    data_date: "2025-03",
    title: "KNOCK KNOCK, WHO’S HAIR?",
    image: "News1.png",
    description:
      "Sa huling pagkatok ng Batang Inocencio ay pinagbuksan ito para sa proyektong “Knock-knock, Who’s hair?” na ....",
  },
  {
    id: "2",
    date: "2025-03-12",
    data_date: "2025-03",
    title: "Youth Empowerment Summit 2025",
    image: "News1.png",
    description:
      "The Batang Inocencio Youth Summit secondaryfully gathered young leaders across the region to discuss...",
  },
  {
    id: "3",
    date: "2025-04-10",
    data_date: "2025-04",
    title: "Tree Planting Activity",
    image: "News1.png",
    description:
      "Batang Inocencio leads a tree-planting activity to promote environmental sustainability...",
  },
  {
    id: "4",
    date: "2025-04-22",
    data_date: "2025-04",
    title: "Barangay Cleanup Drive",
    image: "News1.png",
    description:
      "Residents and youth volunteers joined hands to clean up the streets of Barangay Inocencio...",
  },
];

const NewsDetail = () => {
  const { id } = useParams();

  const news = newsList.find((item) => item.id === id);

  if (!news) {
    return (
      <div className="container py-5 text-center">
        <h3 className="text-danger">News not found.</h3>
        <button
          onClick={() => window.history.back()}
          className="btn btn-secondary mt-3"
        >
          Go Back to News
        </button>
      </div>
    );
  }

  return (
    <div className="container py-5">
      <div className="mb-4">
        <button
          onClick={() => window.history.back()}
          className="btn btn-outline-primary"
        >
          ← Back to News
        </button>
      </div>

      <div className="card border-0 shadow-lg rounded-4">
        <img
          src={`/storage/images/${news.image}`}
          className="card-img-top rounded-top-4"
          alt={news.title}
        />
        <div className="card-body">
          <h2 className="card-title mb-3">{news.title}</h2>
          <p className="text-muted small mb-4">
            {new Date(news.date).toLocaleDateString("en-US", {
              month: "long",
              day: "numeric",
              year: "numeric",
            })}
          </p>
          <p className="card-text">{news.description}</p>
        </div>
      </div>
    </div>
  );
};

export default NewsDetail;
