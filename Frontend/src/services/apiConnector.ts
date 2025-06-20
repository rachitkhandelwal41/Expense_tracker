import axios from "axios";

export const apiConnector = async (
  method: "GET" | "POST" | "PUT" | "DELETE",
  url: string,
  body: any = {},
  customHeaders: any = {}
) => {
  const token = localStorage.getItem("token");

  try {
    const config = {
      method,
      url,
      headers: {
        "Content-Type": "application/json",
        ...(token && { Authorization: token }),
        ...customHeaders,
      },
      ...(method !== "GET" && { data: body }),
    };

    const response = await axios(config);
    return response;
  } catch (error:unknown) {
    console.error("API error:");
    throw error;
  }
};
