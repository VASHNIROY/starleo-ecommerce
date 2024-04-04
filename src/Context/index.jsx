import { createContext, useContext, useState, useEffect } from "react";
import PropTypes from "prop-types";
import Cookies from "js-cookie";
import { postData } from "../CustomAPIs/customposthook";

const AppContext = createContext();

export const useAppContext = () => useContext(AppContext);

export const AppProvider = ({ children }) => {
  const [categoryList, setCategoryList] = useState([]);
  const [brandList, setBrandList] = useState([]);
  const [serverCartCount, setServerCartCount] = useState();
  // const [featuredProductsList, setFeaturedProductsList] = useState([]);
  // const [sponsoredProducts, setSponsoredProducts] = useState([]);
  const [productId, setProductId] = useState(null);
  // const [bannerData, setBannerData] = useState([]);
  const [cartDetails, setCartDetails] = useState([]);
  const [wishList, setWishList] = useState([]);
  const [dashboardData, setDashboardData] = useState([]);

  const [productData, SetProductDetails] = useState({
    productDetails: {},
    similarProducts: [],
  });

  const userid = Cookies.get("userid");

  useEffect(() => {
    FetchCartCountdata();
    fetchWishlist();
    FetchDashboardData();
    FetchCategorydata();
    getBrandData();
    // FetchSponsoredProductsdata();
    FetchCartDetails();
    // FetchFeaturedProductsdata();
    // FetchBannerCarouseldata();
  }, []);

  useEffect(() => {
    if (productId !== null) {
      FetchProductDetailsData();
    }
  }, [productId]);

  const dashboardBodyData = {
    dashboard_type: "ecommerce",
    ...(userid && { user_id: userid }),
  };

  const FetchDashboardData = async () => {
    try {
      const { responseData } = await postData("dashboard", dashboardBodyData);
      console.log("all data", responseData);
      setDashboardData(responseData);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const FetchProductDetailsData = async () => {
    const getProductBody = {
      user_id: userid,
      product_id: productId,
    };

    try {
      const { responseData } = await postData(
        "getProductDetails",
        getProductBody
      );

      const productDetails = responseData.data;

      const similarProducts = responseData.similar_product;

      SetProductDetails({ productDetails, similarProducts });
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const FetchCartCountdata = async () => {
    const cartCountBody = {
      vendor_id: "4d544d3d",
      user_id: userid,
      cart_type: "ecommerce",
    };

    try {
      const { responseData } = await postData("getCartCount", cartCountBody);

      const count = responseData.data.count;
      setServerCartCount(count);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const fetchWishlist = async () => {
    const userid = Cookies.get("userid");
    const getWishlistData = {
      user_id: userid,
    };

    try {
      const { responseData } = await postData("wishList", getWishlistData);

      const wishlist = responseData.data;

      setWishList(wishlist);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  // const FetchFeaturedProductsdata = async () => {
  //   try {
  //     const { responseData } = await postData("dashboard", dashboardBodyData);

  //     const featuredProducts = responseData.data.filter(
  //       (each) => each.type === "product"
  //     );

  //     setFeaturedProductsList(featuredProducts[0].data);
  //   } catch (error) {
  //     console.error("Error fetching data:", error);
  //   }
  // };

  const FetchCategorydata = async () => {
    try {
      const { responseData } = await postData("dashboard", dashboardBodyData);

      const categorysList = responseData.data.filter(
        (each) => each.type === "category_list"
      );

      setCategoryList(categorysList[0].data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const getBrandData = async () => {
    const getBrandBody = {
      dashboard_type: "ecommerce",
    };

    try {
      const { responseData } = await postData("getBrand", getBrandBody);

      setBrandList(responseData.data);
    } catch (error) {
      console.log(error);
    }
  };

  // const FetchSponsoredProductsdata = async () => {
  //   try {
  //     const { responseData } = await postData("dashboard", dashboardBodyData);

  //     const setSponsoredProductsList = responseData.data.filter(
  //       (each) => each.type === "product1"
  //     );

  //     setSponsoredProducts(setSponsoredProductsList[0].data);
  //   } catch (error) {
  //     console.error("Error fetching data:", error);
  //   }
  // };

  const FetchCartDetails = async () => {
    const cartBodyData = {
      user_id: userid,
      cart_type: "ecommerce",
    };

    try {
      const { responseData } = await postData("viewCart", cartBodyData);

      setCartDetails(responseData);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  // const FetchBannerCarouseldata = async () => {
  //   try {
  //     const { responseData } = await postData("dashboard", dashboardBodyData);

  //     const bannerData = responseData.data.filter(
  //       (each) => each.type === "banner"
  //     );
  //     setBannerData(bannerData[0].data);
  //   } catch (error) {
  //     console.error("Error fetching data:", error);
  //   }
  // };

  const setproductid = (id) => {
    setProductId(id);
  };

  const addToWishlist = async (id) => {
    const wishlistBody = {
      user_id: userid,
      product_id: id,
    };

    try {
      const { responseData } = await postData("addToWishList", wishlistBody);
      await fetchWishlist();

      return responseData;
    } catch (error) {
      console.log(error);
    }
  };

  AppProvider.propTypes = {
    children: PropTypes.node,
  };

  return (
    <AppContext.Provider
      value={{
        categoryList,
        serverCartCount,
        // sponsoredProducts,
        setproductid,
        productData,
        // bannerData,
        FetchCartDetails,
        cartDetails,
        wishList,
        addToWishlist,
        fetchWishlist,
        // FetchFeaturedProductsdata,
        brandList,
        dashboardData,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
