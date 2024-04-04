// import { Rating } from "react-simple-star-rating";
import "./sponsoredProducts.css";
import { useAppContext } from "../../Context";
import { useEffect, useState } from "react";
import Loader from "../Loader/Loader";
import { useNavigate } from "react-router-dom";

// checked rendering
function SponsoredProducts() {
  const { dashboardData } = useAppContext();

  const navigate = useNavigate();

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (dashboardData && dashboardData.data) {
      setIsLoading(false);
    }
  }, [dashboardData]);

  //console.log("called  in sponsored products");

  const sponsoredProducts =
    dashboardData && dashboardData.data
      ? dashboardData.data.filter((each) => each.type === "product1")
      : [];
  function renderSponsoredProducts() {
    return (
      <>
        {isLoading ? (
          <Loader value={40} />
        ) : (
          <>
            <h1 className="medicine-curosal-main-heading">
              Sponsored Products
            </h1>

            <div className="medicine-curosal-main-container">
              <div className="medicine-curosal-mini-container">
                <div className="medicine-curosal-sub-container">
                  {sponsoredProducts[0].data.map((item) => (
                    <div
                      key={item.id}
                      className="medicine-cursoal-row1-container"
                      onClick={() => navigate(`/product/${item.id}`)}
                    >
                      <img
                        src={item.home_image}
                        alt={item.name}
                        className="medcine-cursal-image"
                      />
                      <div className="medicine-curosal-content-container">
                        {/* <Rating size={25} initialValue={item.rating} /> */}
                        <h5 className="medicine-curosal-heading">
                          {item.name}
                        </h5>
                        <p className="medicine-curosal-price">
                          <span
                            style={{
                              textDecoration: "line-through",
                              color: "gray",
                            }}
                          >
                            {item.unit_mrp}
                          </span>{" "}
                          {item.unit_sales_price}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </>
        )}
      </>
    );
  }

  return (
    <>
      {sponsoredProducts &&
        sponsoredProducts[0].data.length > 0 &&
        renderSponsoredProducts()}
    </>
  );
}

export default SponsoredProducts;
