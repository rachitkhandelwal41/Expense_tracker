import { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { Link } from "react-router-dom";
import { InputBox } from '../components/InputBox';
import { signup } from '../services/operations/authApi';

const Signup = () => {
    const[formData,setFormData]=useState({
        username:"",
        email:"",
        password:"",
    });

    const[showError,setShowError]=useState("");
    const navigate=useNavigate();
    function changeHandler(name: string, value: string) {
  setFormData((prev) => ({
    ...prev,
    [name]: value,
  }));
}

    async function handleClick(event: any) {
  event.preventDefault();
  try {
    const response = await signup(
      formData.username,
      formData.email,
      formData.password
    );

    if (response) {
      setFormData({
        username: "",
        email: "",
        password: "",
      });
      setShowError("");
      navigate("/signin");
    }
  } catch (error: any) {
    setShowError(error.message || "Something went wrong");
     alert(error.message || "Something went wrong during signup.");
  }
}

  return (
    <div className="bg-[#1c437d] h-screen w-screen">
    <div className="flex flex-col justify-center items-center h-screen ">
      <div className="text-white text-6xl font-bold ">
        Sign Up
      </div>
      <div className="relative w-80 mt-20">
  <InputBox value={formData.username} name="username" text="Username" placeholder="Enter your username" type="text" onchange={changeHandler}/>
</div>


<div className="relative w-80 mt-8">
  <InputBox 
  value={formData.email}name="email" text="Email" placeholder="Enter your Email" type="email" onchange={changeHandler}/>
</div>
<div className="relative w-80 mt-8">
  <InputBox value={formData.password} name="password" text="Password" placeholder="Enter your password" type="password" onchange={changeHandler}/>
  
</div>
<div className="w-80 mt-4 ">
  <label className="flex items-center text-white text-sm space-x-1">
    <input
      type="checkbox"
      className="accent-white ml-1 border border-white rounded"
    />
    <span>I accept the terms and conditions</span>
    <Link to="/signin">
    <label className="pl-8 cursor-pointer underline">Sign in?</label>
    </Link>

  </label>
</div>
<div className="w-80 mt-4 flex justify-center">
  <button 
  onClick={handleClick}
  className="border border-white bg-white rounded-sm text-[#1c437d] px-6 py-2 text-xl font-bold cursor-pointer" >Sign Up</button>
 
</div>
{showError && (
            <div className="font-bold text-xl text-red-900  m-2 mt-12">
              Signup Failed!
            </div>
          )}
    </div>
  </div>
);
  
};

export default Signup