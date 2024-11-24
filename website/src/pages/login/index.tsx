import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { API_ENDPOINTS } from "@/const";
import { useAuth } from "@/context/AuthProvider";
import { basicAxios } from "@/services/basicAxios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function LoginAuthenticationPage() {
  const [isRegister, setIsRegister] = useState(false);
  const navigate = useNavigate();
  // useAuth();

  // const { username,login } = useAuth();
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    name: "",
  });

  const [error, setError] = useState("");

  const handleInputChange = (e) => {
    // console.log(e.target);

    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isRegister) {
      const body = {
        username: formData.username,
        password: formData.password,
        name: formData.name,
      };
      if (formData.password.length < 8) {
        setError('Password must be at least 8 characters long.');
        return;
      }
      const res = await basicAxios(API_ENDPOINTS.REGISTER, body, undefined, "POST");
      if (res.data["access_token"]) {
        setIsRegister(false); 
        localStorage.setItem("access_token", res.data["access_token"]);
        navigate("/");
      } else {
        setError('Username already exists. Try again with a different username.');
      }

    } else {
      console.log("Login data:", {
        username: formData.username,
        password: formData.password,
      });

      const body = {
        username: formData.username,
        password: formData.password,
      };
      const res = await basicAxios(API_ENDPOINTS.LOGIN, body, undefined, "POST");
      console.log(res.data["access_token"]);
      if(res.data["access_token"]) {
        localStorage.setItem("access_token", res.data["access_token"]);
        navigate("/");
      }else {
        setError('Invalid username or password');
      }
    }
  };

  return (
    <><div className="min-h-screen bg-black flex items-center justify-center flex-col">
      <div className="w-full max-w-md bg-[#141415] border-input border rounded-2xl shadow-md p-6">
        <h2 className="text-2xl font-bold text-center mb-6 text-white">
          {isRegister ? "Register" : "Login"}
        </h2>
        <form onSubmit={handleSubmit}>
          {isRegister && (
            <div className="mb-4">
              <label className="block text-white text-sm font-bold mb-2">
                Name
              </label>
              <Input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border rounded-lg text-white"
                required />
            </div>
          )}
          <div className="mb-4">
            <label className="block text-white  text-sm font-bold mb-2">
              Username
            </label>
            <Input
              type="text"
              name="username"
              value={formData.username}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border rounded-lg text-white"
              required />
          </div>
          <div className="mb-6">
            <label className="block text-white  text-sm font-bold mb-2">
              Password
            </label>
            <Input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border rounded-lg border-input text-white"
              required />
          </div>
          <button
            type="submit"
            className="w-full bg-green-500 text-white font-bold py-2 px-4 rounded-lg hover:bg-blue-600 transition"
          >
            {isRegister ? "Register" : "Login"}
          </button>
        </form>
        <p className="text-sm text-center mt-4 text-white ">
          {isRegister ? "Already have an account?" : "Don't have an account?"}{" "}
          <button
            className="text-green-500 font-bold hover:underline"
            onClick={() => setIsRegister(!isRegister)}
          >
            {isRegister ? "Login" : "Register"}
          </button>


        </p>
        <p className="text-sm text-center mt-4 text-white ">
          Use username: <span className="text-green-500">ayush0000ayush</span> and password: <span className="text-green-500">ayushayush</span> to login.
        </p>
      </div>
    
      <div className="text-red-700">{error}</div>
    </div>
    
    </>

  );
}

export default LoginAuthenticationPage;
