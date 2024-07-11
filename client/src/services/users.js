const { axiosInstance } = require("./index");

//register a new user

export const RegisterUser = async (payload) => {
  try {
    const response = await axiosInstance.post("/api/users/register", payload);
    return response.data;
  } catch (error) {
    return error.response;
  }
};

//login user
export const LoginUser = async (payload) => {
  try {
    const response = await axiosInstance.post("/api/users/login", payload);
    return response.data;
  } catch (error) {
    return error.response;
  }
};

//get current user

export const GetCurrentUser = async () => {
  try {
    console.log("get current user");
    const response = await axiosInstance.get("/api/users/get-current-user");
    console.log("get current user 2");
    return response.data;
  } catch (error) {
    return error.response;
  }
};
