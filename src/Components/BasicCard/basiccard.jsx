/* eslint-disable react/prop-types */
import "./basiccard.css";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import { MdOutlineShoppingCart } from "react-icons/md";
import { Link, useNavigate } from "react-router-dom";

// import { Rating } from "react-simple-star-rating";
import "../MedicineCard/medicinecard.css";
import { useAppContext } from "../../Context";
import { RotatingLines } from "react-loader-spinner";
import { useState } from "react";
import Cookies from "js-cookie";
import { BsCheckLg } from "react-icons/bs";
const baseUrl = import.meta.env.VITE_BASE_URL;

const BasicCard = ({ item, addWishClicked }) => {
  const { addToWishlist, FetchCartDetails } = useAppContext();

  const [isAdded, setIsAddedToCart] = useState(false);
  const {
    id,
    wishlist_status,
    home_image,
    name,
    unit_mrp,
    unit_sales_price,
    unit_details,
    product_type,
  } = item;

  const userid = Cookies.get("userid");

  const navigate = useNavigate();

  const [addingToWishlist, setAddingToWishlist] = useState(false);
  const addToWish = async () => {
    if (userid) {
      setAddingToWishlist(true);
      await addToWishlist(id);
      await addWishClicked();
      setAddingToWishlist(false);
    } else {
      navigate("/login");
    }
  };

  const addToCart = async () => {
    if (userid) {
      const addToCartBody = {
        vendor_id: "4d544d3d",
        user_id: userid,
        product_id: id,
        unit: unit_details[0].unit,
        unit_id: unit_details[0].unit_id,
        unit_value: unit_details[0].unit_value,
        type: "add",
        product_type: product_type,
        cart_type: "ecommerce",
      };
      const addToCartformData = new FormData();

      Object.entries(addToCartBody).forEach(([key, value]) => {
        addToCartformData.append(key, value);
      });
      const api = `${baseUrl}addToCart`;
      const options = {
        method: "POST",
        body: addToCartformData,
      };

      try {
        const response = await fetch(api, options);
        const data = await response.json();
        FetchCartDetails();
        setIsAddedToCart(true);
        console.log(data, "from basic card");
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    } else {
      navigate("/login");
    }
  };

  return (
    <div className="medicines-cards-mini-container" key={id}>
      <div
        className="medicines-cards-main-category-container"
        style={{ height: "490px", width: "275px" }}
      >
        <div className="medicines-cards-sub-category-container">
          <div className="medicines-cards-new-buttons">
            <button className="medicines-cards-button">Sales</button>
          </div>
        </div>
        <div className="medicines-cards-icons-container">
          <div className="medicines-cards-icons">
            {wishlist_status === 1 ? (
              <>
                {addingToWishlist ? (
                  <RotatingLines
                    visible={true}
                    height="20"
                    width="20"
                    strokeWidth="5"
                    animationDuration="0.75"
                    ariaLabel="rotating-lines-loading"
                    wrapperStyle={{}}
                    wrapperClass=""
                  />
                ) : (
                  <FaHeart color="#ef233c" onClick={() => addToWish()} />
                )}
              </>
            ) : (
              <FaRegHeart onClick={() => addToWish()} />
            )}
          </div>
        </div>
        <div className="medicines-cards-image-container">
          <img
            className="medicines-cards-image"
            style={{ height: "250px", width: "250px" }}
            src={home_image}
            alt={home_image}
          />
        </div>
        <Link className="basic-card-link" to={`/product/${id}`}>
          <div className="p-2">
            {/* <h5 className="medicines-cards-heading">{items.category}</h5> */}
            <h2
              className="medicines-cards-paragraph"
              style={{ width: "200px" }}
            >
              {name}
            </h2>
            {/* <Rating size={25} initialValue={items.rating} /> */}
            <p className="medicines-cards-price">
              {unit_mrp && (
                <span style={{ textDecoration: "line-through", color: "gray" }}>
                  {unit_mrp}
                </span>
              )}{" "}
              {unit_sales_price}
            </p>
          </div>
        </Link>
        <div>
          {" "}
          {isAdded ? (
            <button className="medicines-added-to-cart-button">
              <BsCheckLg /> Added To Cart
            </button>
          ) : (
            <button
              className="medicines-cards-cart-button"
              onClick={() => addToCart()}
            >
              {" "}
              <MdOutlineShoppingCart />
              Add to Cart
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default BasicCard;
