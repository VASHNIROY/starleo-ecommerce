import { useEffect, useState } from "react";
import "./CategoryItem.css";
import { useNavigate } from "react-router";
import Loader from "../../Components/Loader/Loader";
import NotFound from "../../Components/NotFound/NotFound";
import notfound from "../../Utils/datanotfound.jpg";

const baseUrl = import.meta.env.VITE_BASE_URL;

const CategoryItem = ({ categoryId }) => {
  const [productsList, setProductsList] = useState([]);
  const [isLoading, setLoading] = useState(true);
  const navigate = useNavigate();

  const [noData, setError] = useState(false);

  const categoryItemData = {
    vendor_id: "4d513d3d",
    category_id: categoryId,
  };

  useEffect(() => {
    getCategoryItems();
  }, [categoryId]);

  const getCategoryItems = async () => {
    const formData = new FormData();
    Object.entries(categoryItemData).forEach(([key, value]) => {
      formData.append(key, value);
    });

    const api = `${baseUrl}getProduct`;
    const options = {
      method: "POST",
      body: formData,
    };

    try {
      const response = await fetch(api, options);
      const data = await response.json();
      if (data.status) {
        setProductsList(data.data);
        setLoading(false);
        setError(false);
      } else {
        setError(true);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="category-item-main-container">
      {noData ? (
        <NotFound image={notfound} title={"Data Not Found"} />
      ) : (
        <>
          {" "}
          {isLoading ? (
            <div className="category-loader-container">
              <Loader value={50} />
            </div>
          ) : (
            <>
              {productsList.map((el) => (
                <div
                  key={el.id}
                  className="category-item-card"
                  onClick={() => navigate(`/product/${el.id}`)}
                >
                  <img src={el.home_image} className="category-item-image" />
                  <p className="category-item-name">{el.name}</p>
                </div>
              ))}
            </>
          )}
        </>
      )}
    </div>
  );
};

export default CategoryItem;
