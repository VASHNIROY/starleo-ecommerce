import FeaturedProducts from "../Components/FeaturedProducts/featuredproducts";
import Layout from "../Components/Layout/layout";
// import MedicineCard from "../Components/MedicineCard/medicineCard";
import RecentlyViewedProducts from "../Components/RecentlyViewedProducts/recentlyViewedProducts";
import NewSeltterBanner from "../Components/NewSeltterBanner";
import OfferCards from "../Components/OfferCards";
import CategorySlider from "../Components/CategorySlider/categorySlider";
import SponsoredProducts from "../Components/SponsoredProducts/sponsoredProducts";
import AdvertBanner from "../Components/AdvertisingBanner/advertBanner";
import BannerCarousel from "../Components/BannerCarousel/bannerCarousel";
import Loader from "../Components/Loader/Loader";
import { useEffect, useState } from "react";
import { useAppContext } from "../Context";
const HomePage = () => {
  const [isLoading, setIsLoading] = useState(true);

  const { fetchWishlist, FetchCartDetails } = useAppContext();

  const disableLoader = () => {
    const timeout = setTimeout(() => {
      setIsLoading(false);
    }, 1000);
    return () => clearTimeout(timeout);
  };

  useEffect(() => {
    fetchWishlist();
    FetchCartDetails();
    disableLoader();
  }, []);

  console.log("homepage");

  return (
    <>
      {isLoading ? (
        <Loader value={75} />
      ) : (
        <>
          <BannerCarousel />
          <FeaturedProducts />
          <CategorySlider />
          <NewSeltterBanner />
          <OfferCards />

          <Layout
            title={"ALl Products - Best offers "}
            style={{ width: "100%" }}
          >
            {/* <MedicineCard /> */}
            <SponsoredProducts />
            <RecentlyViewedProducts />
          </Layout>
          <AdvertBanner />
        </>
      )}
    </>
  );
};

export default HomePage;
