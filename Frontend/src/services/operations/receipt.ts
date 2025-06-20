import { apiConnector } from "../apiConnector";


const BASE_URL=import.meta.env.VITE_BASE_URL;


 export const create = async (
  amount: number,
  category: string,
  date: string,
  paymentMethod: string,
  description: string,
  notes: string
) => {
  try {
    const response = await apiConnector("POST", `${BASE_URL}/user/expense/create`, {
      amount,
      category,
      date,
      paymentMethod,
      description,
      notes,
    });

    if (response.status === 201) {
     console.log('Created');
     return response;
    }else{
         throw new Error(response.data?.message || "Creation failed");
    }
  } catch (error: any) {
    const errorMessage =
      error?.response?.data?.message || error.message || "Creation failed";
    console.error("Creation error:", errorMessage);
    throw new Error(errorMessage);
  }
};

export const getAllExpenses = async () => {
  return await apiConnector("GET", `${BASE_URL}/user/expense/all`);
};

export const deleteExpense = async (id: string) => {
  return await apiConnector("DELETE", `${BASE_URL}/user/expense/delete/${id}`);
};

export const updateExpense = async (id: string, updatedData: any) => {
  return await apiConnector("PUT", `${BASE_URL}/user/expense/update/${id}`, updatedData);
};
