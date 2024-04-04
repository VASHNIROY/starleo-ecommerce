import { ConvertObjectToFormData } from "../convertobj";

// import axios from "axios";
const baseUrl = import.meta.env.VITE_BASE_URL;

export const postData = async (endpoint, data) => {
  console.log("endpoint", endpoint);
  const bodyData = ConvertObjectToFormData(data);

  try {
    const url = `${baseUrl}${endpoint}`;
    console.log("url", url);

    const response = await fetch(url, {
      method: "POST",
      body: bodyData,
    });

    // Rename the variable responseData to avoid conflict with the function parameter
    const responseData = await response.json();
    if (response.ok) {
      // Toast.fire({
      //   icon: "success",
      //   title: responseData.message,
      // });
      console.log(responseData, "responseData", endpoint);
    } else {
      console.log(responseData, "responseData");
    }
    return { responseData, response };
  } catch (error) {
    console.error("Error posting data:", error);
    throw error;
  }
};
