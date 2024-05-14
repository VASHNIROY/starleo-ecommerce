import "./navbar.css";
import { RxHamburgerMenu } from "react-icons/rx";
import { CiSearch } from "react-icons/ci";
import { useState } from "react";
import Popup from "reactjs-popup";
import { AiOutlineClose } from "react-icons/ai";
import { useMediaQuery } from "@material-ui/core";
import { MdWifiCalling3 } from "react-icons/md";
import { Link } from "react-router-dom";

import "reactjs-popup/dist/index.css";
import Sidebar from "./Sidebar/sidebar";
import NavElementsBar from "../NavElementsBar";
import logo from "../../Utils/logo.png";
import { useNavigate } from "react-router";
import SlideDown from "react-slidedown";
import SearchItem from "../SearchItem/SearchItem";
import Scrollbars from "react-custom-scrollbars";

const baseUrl = import.meta.env.VITE_BASE_URL;

const Navbar = () => {
  const [isPopupOpen, setPopup] = useState(false);
  const [isMenuopen, setMenubar] = useState(false);
  const [searchResults, setSearchResults] = useState([]);
  const isMobileScreen = useMediaQuery("(max-width: 800px)");
  const [searchValue, setSearchValue] = useState("");
  const isWebScreen = useMediaQuery("(min-width: 801px)");
  const navigate = useNavigate();

  const getSearchData = async (event) => {
    const inputValue = event.target.value;
    setSearchValue(inputValue);
    const searchBody = {
      text: inputValue,
      cart_type: "ecommerce",
    };

    const searchFormData = new FormData();

    Object.entries(searchBody).forEach(([key, value]) => {
      searchFormData.append(key, value);
    });

    const api = `${baseUrl}searchData`;
    const options = {
      method: "POST",
      body: searchFormData,
    };

    try {
      const response = await fetch(api, options);
      const data = await response.json();
      setSearchResults(data.data);
    } catch (error) {
      console.log(error);
    }
  };

  const emptySearch = () => {
    setSearchValue("");
    console.log("empty search called ");
  };

  return (
    <>
      {isMobileScreen && (
        <div
          style={{ display: "flex", width: "100%", justifyContent: "center" }}
        >
          {isMenuopen && (
            <Sidebar setMenuOpen={setMenubar} isMenuopen={isMenuopen} />
          )}
          <div className="mbl-navbar-main-container">
            <div className="mbl-navbar-logo" onClick={() => navigate("/")}>
              <Link to="/">
                <img src={logo} className="navbar-logo" />
              </Link>
              <div className="navbar-logo-content-container">
                <p style={{ margin: 0 }}>Bachat Guruu</p>
                <p style={{ margin: 0 }}>ISSE SASTA AUR KAHAN</p>
              </div>
            </div>
            <div className="mbl-navbar-icons-container">
              <CiSearch
                className="mbl-navbar-icons"
                onClick={() => setPopup(!isPopupOpen)}
              />
              <RxHamburgerMenu
                className="mbl-navbar-icons"
                onClick={() => setMenubar(!isMenuopen)}
              />
            </div>

            <Popup
              open={isPopupOpen}
              overlayStyle={{ backgroundColor: "rgba(0,0,0,0.8)" }}
              contentStyle={{
                background: "transparent",
                border: "none",
                color: "white",
                display: "flex",
                flexDirection: "column",
                justifyContent: "flex-start",
                alignItems: "center",
                height: "90%",
                width: "100%",
              }}
            >
              <div className="mbl-search-close-popup-icon-container">
                <AiOutlineClose
                  className="mbl-search-close-popup-icon"
                  onClick={() => setPopup(!isPopupOpen)}
                />
              </div>
              <div className="mbl-search-modal">
                <input
                  className="mbl-category-search"
                  placeholder="What are you looking for ?"
                  style={{ padding: "20px" }}
                  type="search"
                  value={searchValue}
                  onChange={(event) => getSearchData(event)}
                />
                {/* <button className="mbl-search-btn">Search</button> */}
              </div>
              {searchResults && searchValue && (
                <SlideDown className="navbar-search-slide-down-container">
                  <Scrollbars>
                    {searchResults.map((el) => (
                      <>
                        <SearchItem
                          details={el}
                          emptySearch={emptySearch}
                          key={el.id}
                        />
                      </>
                    ))}
                  </Scrollbars>
                </SlideDown>
              )}
            </Popup>
          </div>
        </div>
      )}
      {isWebScreen && (
        <div className="navbar">
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              width: "100%",
              backgroundColor: "black",
              color: "white",
            }}
          >
            <div className="navbar-main-container">
              <div
                className="navbar-logo-container"
                onClick={() => navigate("/")}
              >
                <Link to="/">
                  {" "}
                  <img src={logo} className="navbar-logo" />
                </Link>
                <div className="navbar-logo-content-container">
                  <p style={{ margin: 0 }}>Star Leoo</p>
                  <p style={{ margin: 0 }}>Lets Enjoy Online Offers</p>
                </div>
              </div>
              <div className="search-bar-container">
                <div className="navbar-icons-container">
                  <input
                    className="category-search"
                    type="search"
                    placeholder="What are you looking for ?"
                    value={searchValue}
                    onChange={(event) => getSearchData(event)}
                  />
                  <div className="navbar-search-icon-container">
                    <CiSearch className="navbar-icons" />
                  </div>
                </div>
              </div>
              <div className="contact-details-container">
                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <MdWifiCalling3 className="navbar-contact-icon" />
                </div>
                <div>
                  <p className="navbar-contact-details-para">Service Support</p>
                  <p className="navbar-contact-details-para">8688266929</p>
                </div>
              </div>
            </div>
            {searchValue && (
              <SlideDown className="navbar-search-slide-down-container">
                <Scrollbars>
                  {searchResults && searchResults.length > 0 ? (
                    <>
                      {searchResults.map((el) => (
                        <>
                          <SearchItem details={el} emptySearch={emptySearch} />
                        </>
                      ))}
                    </>
                  ) : (
                    <p style={{ textAlign: "center" }}>No Results Found</p>
                  )}
                </Scrollbars>
              </SlideDown>
            )}
          </div>
          <hr className="navbar-hr-line" />
          <NavElementsBar />
        </div>
      )}
    </>
  );
};

export default Navbar;
