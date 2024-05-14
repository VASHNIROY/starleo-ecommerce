import "./footer.css";
import { useMediaQuery } from "@material-ui/core";
import { FaFacebookF } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { FaLinkedin } from "react-icons/fa";
import { FaYoutube } from "react-icons/fa";
import { CiMail } from "react-icons/ci";
import { useNavigate } from "react-router";
import { Link } from "react-router-dom";
import logo from "../../Utils/logo.png";
import { MdWifiCalling3 } from "react-icons/md";

const Footer = () => {
  const isMobileScreen = useMediaQuery("(max-width: 1250px)");
  const navigate = useNavigate();
  return (
    <div className="footer-master-container mt-5 pb-5">
      <div
        className={`${
          isMobileScreen ? "mbl-footer-main-contaier" : "footer-main-contaier"
        }`}
      >
        <div className="footer-address-help-container">
          <div className="footer-address-container">
            <div
              className="mbl-navbar-logo mbl-footer-logo"
              onClick={() => navigate("/")}
            >
              <Link to="/">
                <img src={logo} className="navbar-logo" />
              </Link>
              <div className="navbar-logo-content-container">
                <h6
                  style={{
                    margin: 0,
                    fontWeight: "bold",
                    marginTop: "6%",
                  }}
                >
                  BACHAT GURUU
                </h6>

                <p style={{ margin: 0 }}>Isse Sasta Aur Kahan</p>
              </div>
            </div>
            <div className="">
              <p
                style={{
                  fontSize: "12px",
                }}
              >
                Star leoo is a platform where every individual can visit and
                grab the most convenient deals for Customised gifts, Electronics
                and much more. And we allow vendors to onboard their products at
                our platform.
              </p>
            </div>
            <div className="footer-social-icons-container">
              <Link
                to={"https://www.facebook.com/profile.php?id=61559051203541"}
                target="_blank"
              >
                {" "}
                <FaFacebookF />
              </Link>
              <Link
                to={"https://www.instagram.com/starleoo2024/"}
                target="_blank"
              >
                <FaInstagram />
              </Link>
              <Link to={"https://twitter.com/starleoo786"} target="_blank">
                <FaXTwitter />
              </Link>
              <Link
                to={"https://www.linkedin.com/in/star-leoo-751ab8303/"}
                target="_blank"
              >
                <FaLinkedin />
              </Link>
              <Link
                to={
                  "https://youtube.com/@StarLeoo.LetsEnjoyOnlineOffers?si=WGiMksln3oB4IMmG"
                }
                target="_blank"
              >
                <FaYoutube />
              </Link>
            </div>
          </div>
          <hr className="footer-hr-line" />
          <div className="footer-help-main-container">
            <div className="footer-vertical-line"></div>

            <div className="footer-help-container">
              <p className="footer-side-headings">Address</p>
              <p style={{ marginBottom: 0 }}>17-6-732, Dabeerpura,</p>
              <p style={{ marginBottom: 0 }}>Hyderabad, Telangana,</p>
              <p style={{ marginBottom: 0 }}>India - 500023.</p>

              <div className="contact-details-container">
                <div>
                  <MdWifiCalling3 />
                </div>
                <h5
                  className="footer-side-headings"
                  style={{
                    fontWeight: "bold",
                    marginTop: "6%",
                  }}
                >
                  8688266929
                </h5>
              </div>

              {/* <span>Monday - Friday: 9:00 - 20:00</span>
              <p>Saturday: 9:00 - 15:00</p> */}
              <div className="footer-mail-contianer">
                <CiMail />
                <p
                  style={{ margin: 0, marginLeft: "10px" }}
                  className="footer-side-headings"
                >
                  mohdshanawaz152@gmail.com
                </p>
              </div>
            </div>
          </div>
        </div>
        <hr className="footer-info-acc-hr-line" />
        <div className="footer-info-acc-container">
          <div className="footer-info-acc-mini-container">
            <p className="footer-side-headings">Information</p>
            <ul className="footer-info-acc-ul-container">
              <li
                className="footer-route-link"
                // onClick={() => navigate("/about-us")}
              >
                About Us
              </li>
              <li>Delivery Information</li>
              <li>Privacy Policy</li>
              <li>Sales</li>
              <li>Terms & Conditions</li>
            </ul>
          </div>

          <div className="footer-info-acc-mini-container">
            <p className="footer-side-headings">Account</p>
            <ul className="footer-info-acc-ul-container">
              <li>Dashboard</li>
              <li onClick={() => navigate("/orderlist")}>My Orders</li>
              <li>Account Details</li>
              <li>Returns</li>
              <li onClick={() => navigate("/wishlist")}>Wishlist</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
