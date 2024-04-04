import { useEffect, useState } from "react";
import { useAppContext } from "../../Context";
import Loader from "../Loader/Loader";
import BasicCard from "../BasicCard/basiccard";
import "./recentlyViewedProducts.css";

function RecentlyViewedProducts() {
  const { dashboardData } = useAppContext();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(false);
  }, []);

  const recentlyViewedProducts =
    dashboardData && dashboardData.data
      ? dashboardData.data.filter((each) => each.type === "recently_viewed")
      : [];

  console.log("recently products", recentlyViewedProducts);

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <div className="recently-viewed-main-container">
          {recentlyViewedProducts &&
          recentlyViewedProducts[0]?.data.length > 0 ? (
            <div className="recently-viewed-mini-container">
              <div className="medicines-categories-container">
                <h1 className="medicines-categories-heading">
                  Recently Viewed Products
                </h1>
              </div>
              <div className="recently-viewed-cards-container">
                {recentlyViewedProducts[0].data.map((el) => (
                  <BasicCard key={el.id} item={el} />
                ))}
              </div>
            </div>
          ) : null}
        </div>
      )}
    </>
  );
}

export default RecentlyViewedProducts;
