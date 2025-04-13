import React, { useEffect, useState } from "react";
import Carousel from "../../component/Caroucel";
import News from "./News";
import Announcements from "./Announcements";
import Events from "./Events";
import { useAPI } from "../../component/contexts/ApiContext";

function Home() {
  const { getData } = useAPI();
  const [carouselItems, setCarouselItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState();

  useEffect(() => {
    getData("carousel?page=home", setCarouselItems, setLoading, setError);
  }, [getData]);

  if (loading) return null

  return (
    <>
      <Carousel carouselItems={carouselItems} />
      <News isFullPage={false} />
      <Announcements isFullPage={false} />
      <Events isFullPage={false} />
    </>
  );
}

export default Home;
