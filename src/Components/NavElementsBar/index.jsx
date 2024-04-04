import "./index.css";
import { RxHamburgerMenu } from "react-icons/rx";
import { FaRegHeart } from "react-icons/fa";
import { RiShoppingCart2Line } from "react-icons/ri";
import Badge from "@mui/material/Badge";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import { Scrollbars } from "react-custom-scrollbars";
import { useEffect, useState } from "react";
import { SlideDown } from "react-slidedown";
import "react-slidedown/lib/slidedown.css";
import { CgProfile } from "react-icons/cg";
import { useAppContext } from "../../Context/index.jsx";
import CategorySlider from "../CategorySlider/categorySlider.jsx";
import Popup from "reactjs-popup";
import CartPopup from "../../Pages/CartPopup/index.jsx";
import CategoryItem from "../CategoryItem/CategoryItem.jsx";
import Profiledropdown from "../Profiledropdown/Profiledropdown.jsx";
import { useNavigate, useLocation } from "react-router";
import CustomSlider from "../customSlider/customslider.jsx";
import Cookies from "js-cookie";

export const NavElementsBar = () => {
  const userid = Cookies.get("userid");

  const [isCategoryTrue, setIsCateogrytrue] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const [isShowbyCategoryTrue, setShowbyCategoryTrue] = useState(false);

  const [isShowbyBrandTrue, setShowbyBrandTrue] = useState(false);
  const [wishListCount, setWishlistCount] = useState(0);

  const [count, setCount] = useState(0);
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  const {
    categoryList,
    wishList,
    cartDetails,
    fetchWishlist,
    FetchCartDetails,
    FetchDashboardData,
  } = useAppContext();

  const logOutUser = async () => {
    Cookies.remove("userid");
    await FetchDashboardData();
    setCount(0);
    setWishlistCount(0);
  };

  useEffect(() => {
    fetchWishlist();
    FetchCartDetails();
    if (location.pathname === "/login") {
      setCount(0);
      setWishlistCount(0);
    }
  }, [location.pathname]);

  useEffect(() => {
    if (userid) {
      if (cartDetails.data && Array.isArray(cartDetails.data) && userid) {
        setCount(cartDetails.data.length);
      }
    }
  }, [cartDetails.data, userid]);

  useEffect(() => {
    if (userid) {
      if (wishList && Array.isArray(wishList)) {
        setWishlistCount(wishList.length);
      } else if (wishList === undefined) {
        setWishlistCount(0);
      }
    }
  }, [wishList, userid]);

  const initialActiveElId =
    categoryList && categoryList.length > 0 ? categoryList[0].category_id : "";

  console.log(initialActiveElId, "initialActiveElId");

  const [activeElId, setActivedropEle] = useState(initialActiveElId);

  const handleMouseMove = (e) => {
    const mouseX = e.clientX;
    const mouseY = e.clientY;

    const containerX = e.currentTarget.getBoundingClientRect().left;
    const containerY = e.currentTarget.getBoundingClientRect().top;

    const distanceX = mouseX - containerX;
    const distanceY = mouseY - containerY;

    if (
      distanceY > 0 &&
      distanceX >= 0 &&
      distanceX <= e.currentTarget.offsetWidth
    ) {
      setIsCateogrytrue(true);
    } else {
      setIsCateogrytrue(false);
    }
  };

  const handleCategoryCarouselMouseMove = (e) => {
    const mouseX = e.clientX;
    const mouseY = e.clientY;

    const containerX = e.currentTarget.getBoundingClientRect().left;
    const containerY = e.currentTarget.getBoundingClientRect().top;

    const distanceX = mouseX - containerX;
    const distanceY = mouseY - containerY;

    if (
      distanceY > 0 &&
      distanceX >= 0 &&
      distanceX <= e.currentTarget.offsetWidth
    ) {
      setShowbyCategoryTrue(true);
    } else {
      setShowbyCategoryTrue(false);
    }
  };

  const handleBrandCarouselMouseMove = (e) => {
    const mouseX = e.clientX;
    const mouseY = e.clientY;

    const containerX = e.currentTarget.getBoundingClientRect().left;
    const containerY = e.currentTarget.getBoundingClientRect().top;

    const distanceX = mouseX - containerX;
    const distanceY = mouseY - containerY;

    if (
      distanceY > 0 &&
      distanceX >= 0 &&
      distanceX <= e.currentTarget.offsetWidth
    ) {
      setShowbyBrandTrue(true);
    } else {
      setShowbyBrandTrue(false);
    }
  };

  function showCategoriesDropdown() {
    return (
      <>
        <SlideDown
          className="nav-dropdown-main-container"
          onMouseLeave={() => setIsCateogrytrue(false)}
        >
          <Scrollbars style={{ width: 300, height: 480 }}>
            <ul className="nav-dropdown-ul-container">
              {categoryList.map((each) => {
                return (
                  <li
                    key={each.category_id}
                    onClick={() => setActivedropEle(each.category_id)}
                    className={`${
                      activeElId === each.category_id
                        ? "nav-dropdown-li-active"
                        : ""
                    }`}
                  >
                    {each.name}
                  </li>
                );
              })}
            </ul>
          </Scrollbars>
          <div className="nav-dropdown-side-container">
            <CategoryItem categoryId={activeElId} />
          </div>
        </SlideDown>
      </>
    );
  }

  function showCategoryCarousel() {
    return (
      <SlideDown
        className="nav-dropdown-shop-by-container"
        onMouseLeave={() => setShowbyCategoryTrue(false)}
      >
        <CategorySlider />
      </SlideDown>
    );
  }

  function showByBrandCarousel() {
    return (
      <SlideDown
        className="nav-dropdown-shop-by-container"
        onMouseLeave={() => setShowbyBrandTrue(false)}
      >
        <CustomSlider />
      </SlideDown>
    );
  }

  const handleCloseClick = () => {
    setIsPopupOpen(false);
  };

  return (
    <>
      <div className="navbar-ele">
        <div className="nav-ele-bar-main-container">
          <button
            className={`nav-ele-btn ${
              isCategoryTrue ? "nav-ele-btn-active" : ""
            }`}
            onMouseLeave={handleMouseMove}
            onMouseEnter={() => {
              if (categoryList && categoryList.length > 0) {
                setIsCateogrytrue(true);
              }
            }}
          >
            <RxHamburgerMenu />
            All Categories
          </button>
          <ul className="nav-ele-bar-ul-container">
            <li className="nav-ele-bar-li-ele" onClick={() => navigate("/")}>
              Home
            </li>
            <li
              className="nav-ele-bar-li-ele"
              onMouseLeave={handleBrandCarouselMouseMove}
              onClick={() => showByBrandCarousel(!isCategoryTrue)}
              onMouseEnter={() => setShowbyBrandTrue(true)}
            >
              Shop By Brand
            </li>
            <li
              className="nav-ele-bar-li-ele"
              onMouseLeave={handleCategoryCarouselMouseMove}
              onClick={() => showCategoryCarousel(!isCategoryTrue)}
              onMouseEnter={() => setShowbyCategoryTrue(true)}
            >
              Shop By Category
            </li>
            <li className="nav-ele-bar-li-ele">
              <a
                href="https://app.starleoo.com/grocery"
                style={{ color: "black", textDecoration: "none" }}
              >
                Groceries
              </a>
            </li>
            <li className="nav-ele-bar-li-ele">Shop</li>
            <li className="nav-ele-bar-li-ele">Elements</li>
            <li className="nav-ele-bar-li-ele">Features</li>
          </ul>
          <ul className="nav-ele-bar-icons-ul-container">
            <li>
              <Tooltip title="Wishlist">
                <IconButton>
                  <Badge badgeContent={wishListCount} color="primary">
                    <FaRegHeart
                      className="nav-ele-bar-icon"
                      onClick={() => navigate("/wishlist")}
                    />
                  </Badge>
                </IconButton>
              </Tooltip>
            </li>
            <li>
              <Popup
                closeOnDocumentClick={true}
                open={isPopupOpen}
                onClose={handleCloseClick}
                contentStyle={{
                  width: "350px",
                  padding: "5px",
                }}
                trigger={
                  <Tooltip title="Cart">
                    <IconButton>
                      {count > 0 ? (
                        <Badge badgeContent={count} color="primary">
                          <RiShoppingCart2Line className="nav-ele-bar-icon" />
                        </Badge>
                      ) : (
                        <RiShoppingCart2Line className="nav-ele-bar-icon" />
                      )}
                    </IconButton>
                  </Tooltip>
                }
                position="bottom right"
              >
                <CartPopup onClose={handleCloseClick} />
              </Popup>
            </li>
            <li>
              {userid ? (
                <Popup
                  closeOnDocumentClick={true}
                  open={isPopupOpen}
                  onClose={handleCloseClick}
                  contentStyle={{
                    // width: "250px",
                    padding: "5px",
                  }}
                  trigger={
                    <Tooltip title="profile">
                      <IconButton>
                        <CgProfile className="nav-ele-bar-icon" />
                      </IconButton>
                    </Tooltip>
                  }
                  position="bottom right"
                >
                  <Profiledropdown
                    handleLogout={logOutUser}
                    onClose={handleCloseClick}
                  />
                </Popup>
              ) : (
                <button
                  className="nav-login-page-button"
                  onClick={() => navigate("/login")}
                >
                  Login
                </button>
              )}
            </li>
          </ul>
        </div>
        <hr className="navbar-ele-hr-line" />
      </div>

      {isCategoryTrue && showCategoriesDropdown()}
      {isShowbyCategoryTrue && showCategoryCarousel()}
      {isShowbyBrandTrue && showByBrandCarousel()}
    </>
  );
};

export default NavElementsBar;
