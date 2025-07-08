import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import Gambar1A from '../../assets/Room/DetailKamar1.svg';
import Gambar2A from '../../assets/Room/DetailKamar2.svg';
import Gambar3A from '../../assets/Room/DetailKamar3.svg';
import Gambar4A from '../../assets/Room/DetailKamar4.svg';
import Gambar5A from '../../assets/Room/DetailKamar5.svg';

const GalleryKamarA = () => {
  const images = [Gambar1A, Gambar2A, Gambar3A, Gambar4A, Gambar5A];

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: true,
    autoplay: true,
    autoplaySpeed: 3000,
  };

  return (
    <div className="flex flex-col items-center justify-center">
      <h2 className="text-2xl font-bold mb-4">Gallery Kamar A</h2>
      <div className="w-full max-w-sm md:max-w-md lg:max-w-lg">
        <Slider {...settings}>
          {images.map((img, idx) => (
            <div key={idx} className="p-2">
              <div className="w-full aspect-square overflow-hidden rounded-lg">
                <img
                  src={img}
                  alt={`Kamar ${idx + 1}`}
                  className="object-cover w-full h-full"
                />
              </div>
            </div>
          ))}
        </Slider>
      </div>
    </div>
  );
};

export default GalleryKamarA;