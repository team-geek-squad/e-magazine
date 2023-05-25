import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import YoutubeVideos from "./YoutubeVideos";

import "./YoutubeVideoCarousel.css";

const YoutubeVideoCarousel = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
  };
  return (
    <div className="carouselContainer container">
      <Slider {...settings}>
        <YoutubeVideos/>
        <YoutubeVideos/>
        <YoutubeVideos/>
        <YoutubeVideos/>
      </Slider>
    </div>
  );
};

export default YoutubeVideoCarousel;
