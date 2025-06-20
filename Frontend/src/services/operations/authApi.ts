import { apiConnector } from "../apiConnector";
const BASE_URL=import.meta.env.VITE_BASE_URL;


 export const signup = async (username: string, email: string, password: string) => {
  try {
    const response = await apiConnector("POST", `${BASE_URL}/user/signup`, {
      userData: {
        username,
        email,
        password,
      },
    });

    if (response.status !== 200) {
      throw new Error(response.data?.message || "Signup failed");
    }

    return response.data.token || "Signup successful";
  } catch (error: any) {
    const errorMessage =
      error?.response?.data?.message || error.message || "Signup failed";
    console.error("Signup error:", errorMessage);
    throw new Error(errorMessage); // Throw the specific error message
  }
};

export const signin = async (email: string, password: string) => {
  try {
    const response = await apiConnector("POST", `${BASE_URL}/user/signin`, {
      userData: {
        email,
        password,
      },
    });

    if (response.status === 200) {
      localStorage.setItem("token", response.data.token);
      return response.data.token;
    } else {
      throw new Error(response.data.message || "Login failed");
    }
  } catch (error: any) {
    const errorMessage =
      error?.response?.data?.message || error.message || "Login failed";
    console.error("Login error:", errorMessage);
    throw new Error(errorMessage); 
  }
};
