import React from "react";
import Carousel from "../../component/Caroucel";
import News from "./News";
import Announcements from "./Announcements";
import Events from "./Events";


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

function Home() {
  return (
    <>
      <Carousel carouselItems={carousel} />
      <News />
      <Announcements />
      <Events />
    </>
  );
}

export default Home;
