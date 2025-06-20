import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { useSetRecoilState } from "recoil";
import { InputBox } from "../components/InputBox";
import { signin } from "../services/operations/authApi";
import { tokenAtom } from "../store/atoms";

export const Signin = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate();
  const setToken = useSetRecoilState(tokenAtom);

   function changeHandler(name: string, value: string) {
  setFormData((prev) => ({
    ...prev,
    [name]: value,
  }));
}

  async function handleClick() {
    try {
      const token = await signin(formData.email, formData.password);
      if (token) {
        setToken(token);
        setFormData({
          email: "",
          password: "",
        });

        navigate("/dashboard");
      }
    } catch (error: any) {
      alert(error.message || "Login failed. Try again.");
    }
  }

  return (
    <div className="bg-[#1c437d] h-screen w-screen">
      <div className="flex flex-col justify-center items-center h-screen">
        <div className="text-white text-6xl font-bold">Sign In</div>

        <div className="relative w-80 mt-16">
          <InputBox  value={formData.email}
            name="email"
            text="Email"
            placeholder="Enter your Email"
            type="email"
            onchange={changeHandler}
          />
        </div>
        <div className="relative w-80 mt-8">
          <InputBox value={formData.password}
            name="password"
            text="Password"
            placeholder="Enter your password"
            type="password"
            onchange={changeHandler}
          />
        </div>
        <div className="w-80 mt-4">
          <label className="flex items-center text-white text-sm space-x-1">
            <span>Not a user?</span>
            <Link to="/signup">
              <label className="pl-1 cursor-pointer underline">Sign Up</label>
            </Link>
          </label>
        </div>
        <div className="w-80 mt-8 flex justify-center">
          <button
            onClick={handleClick}
            className="border border-white bg-white rounded-sm text-[#1c437d] px-6 py-2 text-xl font-bold cursor-pointer"
          >
            Sign In
          </button>
        </div>
      </div>
    </div>
  );
};
