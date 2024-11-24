// import { UserAuthForm } from "./login-auth-form"


// export default function LoginAuthenticationPage() {
//   return (
//     <>

//       <div className="container relative hidden min-h-screen grid-cols-[2fr_1fr] lg:grid lg:max-w-none lg:px-0 bg-[#08080B]">
//         {/* Left section */}
//         <div className="relative hidden h-full flex-col bg-muted p-10 text-white dark:border-r lg:flex">
//           <div className="absolute inset-0 bg-zinc-900" />
//           <div className="relative z-20 flex items-center text-lg font-medium">
//             <svg
//               xmlns="http://www.w3.org/2000/svg"
//               viewBox="0 0 24 24"
//               fill="none"
//               stroke="currentColor"
//               strokeWidth="2"
//               strokeLinecap="round"
//               strokeLinejoin="round"
//               className="mr-2 h-6 w-6"
//             >
//               <path d="M15 6v12a3 3 0 1 0 3-3H6a3 3 0 1 0 3 3V6a3 3 0 1 0-3 3h12a3 3 0 1 0-3-3" />
//             </svg>
//         True Beacon
//           </div>
//           <div className="relative z-20 mt-auto">
//             <blockquote className="space-y-2">
//               <p className="text-lg">
//               We are trying to disrupt the asset management space by being a transparent, client-aligned and performance driven investment firm.
//               </p>
//               <footer className="text-sm">Nikhil Kamath</footer>
//               <footer className="text-sm">Co-Founder at True Beacon</footer>
//             </blockquote>
//           </div>
//         </div>
//         {/* Right section */}
//         <div className="lg:p-8">
//           <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
//             <div className="flex flex-col space-y-2 text-center">
//               <h1 className="text-2xl font-semibold tracking-tight text-white">
//                 Login to account
//               </h1>
//               <p className="text-sm text-muted-foreground">
//                 Enter your email below to create your account
//               </p>
//             </div>
//             <UserAuthForm />

//           </div>
//         </div>
//       </div>
//     </>
//   )
// }



// App.js
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

  const { username,login } = useAuth();
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
      </div>
    
      <div className="text-red-700">{error}</div>
    </div>
    
    </>

  );
}

export default LoginAuthenticationPage;
