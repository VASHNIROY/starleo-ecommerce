// import { Carousel } from "react-responsive-carousel";
// import "react-responsive-carousel/lib/styles/carousel.min.css";
// import { useAppContext } from "../../Context";
// import Loader from "../Loader/Loader";
// import "./bannerCarousel.css";
// import { useEffect, useState } from "react";

// const BannerCarousel = () => {
//   const { dashboardData } = useAppContext();
//   const [isLoading, setIsLoading] = useState(true);
//   const [selectedSlide, setSelectedSlide] = useState(0);

//   useEffect(() => {
//     if (dashboardData && dashboardData.data) {
//       setIsLoading(false);
//     }
//   }, [dashboardData]);

//   const handleSlideChange = (index) => {
//     setSelectedSlide(index);
//   };

//   const bannerData =
//     dashboardData && dashboardData.data
//       ? dashboardData.data.filter((each) => each.type === "banner")
//       : [];

//   return (
//     <>
//       {isLoading ? (
//         <Loader value={20} />
//       ) : (
//         <div className="study-abroad-carousel-main-container">
//           <Carousel
//             showThumbs={false}
//             autoPlay={true}
//             interval={3000}
//             showArrows={true}
//             selectedItem={selectedSlide}
//             onChange={handleSlideChange}
//             className="slider"
//           >
//             {bannerData[0].data.map((slide) => {
//               console.log("slide ", slide.image);
//               return (
//                 <>
//                   <img
//                     key={slide.banner_id}
//                     className="study-abroad-carousel-slide"
//                     src={slide.image}
//                   />
//                 </>
//               );
//             })}
//           </Carousel>
//         </div>
//       )}
//     </>
//   );
// };

// export default BannerCarousel;

import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { useEffect, useState } from "react";
import { useAppContext } from "../../Context";
import Loader from "../Loader/Loader";
import "./bannerCarousel.css";
import banner from "../../Utils/banner1.png";

const BannerCarousel = () => {
  const { dashboardData } = useAppContext();
  const [isLoading, setIsLoading] = useState(true);
  const [selectedSlide, setSelectedSlide] = useState(0);
  const [imageLoadError, setImageLoadError] = useState(false);

  useEffect(() => {
    if (dashboardData && dashboardData.data) {
      setIsLoading(false);
    }
  }, [dashboardData]);

  const handleSlideChange = (index) => {
    setSelectedSlide(index);
  };

  const handleImageLoadError = () => {
    setImageLoadError(true);
  };

  const bannerData =
    dashboardData && dashboardData.data
      ? dashboardData.data.filter((each) => each.type === "main_banner")
      : [];

  return (
    <>
      {isLoading ? (
        <Loader value={20} />
      ) : (
        <div className="study-abroad-carousel-main-container">
          <Carousel
            showThumbs={false}
            autoPlay={true}
            interval={3000}
            showArrows={true}
            selectedItem={selectedSlide}
            className="sliderrrr"
            onChange={handleSlideChange}
            style={{ color: "#196AE5", width: "100%" }}
          >
            {bannerData[0].data.map((slide, index) => {
              console.log("image", slide.image);
              return (
                <div key={index} className="study-abroad-carousel-slide">
                  <img
                    src={slide.image}
                    // alt={`Slide ${index}`}
                    style={{ width: "100%" }}
                    onError={handleImageLoadError}
                    className="study-abroad-carousel-image"
                  />
                  {imageLoadError && <img src={banner} />}
                </div>
              );
            })}
          </Carousel>
        </div>
      )}
    </>
  );
};

export default BannerCarousel;
