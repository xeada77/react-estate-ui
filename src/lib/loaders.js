import apiRequest from "./apiRequest";
import { defer } from "react-router-dom";

export const singlePageLoader = async ({ request, params }) => {
  try {
    const res = await apiRequest.get("/posts/" + params.id);
    //console.log(res.data);
    return res.data;
  } catch (err) {
    return {
      error: { message: "Something went Wrong!" },
    };
  }
};

export const listPageLoader = async ({ request, params }) => {
  try {
    //console.log(params);
    const query = request.url.split("?")[1];
    const postPromise = apiRequest.get("/posts?" + query);
    return defer({
      postResponse: postPromise,
    });
  } catch (error) {
    return {
      error: { message: "Something went Wrong!" },
    };
  }
};
