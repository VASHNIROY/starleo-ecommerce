import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import BasicCard from "../BasicCard/basiccard";
import dataNotFound from "../../Utils/datanotfound.jpg";

import "./ProductList.css";
import Loader from "../Loader/Loader";
import NotFound from "../NotFound/NotFound";

const baseUrl = import.meta.env.VITE_BASE_URL;

const ProductsList = () => {
  const { id } = useParams();

  const [productsData, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const getPoductsBody = {
    brand_id: id,
  };

  const getProductsFormData = new FormData();

  Object.entries(getPoductsBody).forEach(([key, value]) => {
    getProductsFormData.append(key, value);
  });

  const api = `${baseUrl}getProduct`;
  const options = {
    method: "POST",
    body: getProductsFormData,
  };

  const getProducts = async () => {
    try {
      setIsLoading(true);
      const response = await fetch(api, options);
      const data = await response.json();
      setProducts(data.data);
      setIsLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getProducts();
  }, [id]);

  return (
    <div className="product-list-main-container">
      {isLoading ? (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            width: "100%",
          }}
        >
          <Loader value={80} />
        </div>
      ) : (
        <>
          {productsData && productsData.length > 0 ? (
            <>
              {" "}
              {productsData.map((el) => (
                <>
                  <BasicCard item={el} />
                </>
              ))}
            </>
          ) : (
            <NotFound
              image={dataNotFound}
              title={"Data Not Found"}
              buttonText={"Go Home"}
            />
          )}
        </>
      )}
    </div>
  );
};

export default ProductsList;
