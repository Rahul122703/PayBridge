import React, { useState } from "react";
import { z } from "zod";
import toast from "react-hot-toast";
import axios from "axios";

import { useDispatch } from "react-redux";

import { login } from "../features/auth/AuthSlice";

const loginSchema = z.object({
  email: z.string().email("Invalid email"),
  password: z.string().min(6, "Password must be at least 4 characters"),
});

const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const handleLogin = async (e) => {
    e.preventDefault();
    const data = { email, password };

    const result = loginSchema.safeParse(data);
    if (!result.success) return toast.error(result.error.errors[0].message);

    try {
      const res = await axios.post("http://localhost:8080/auth/login", data);

      if (res.data.success) {
        toast.success("Login successful!");

        dispatch(
          login({
            name: res.data.name,
            email: res.data.email,
            token: res.data.jwtToken,
          })
        );

        console.log("User stored in Redux:", res.data);
      }
    } catch (err) {
      console.log(err);
      toast.error(err.response?.data?.message || "Login failed");
    }
  };

  return (
    <form className="space-y-5" onSubmit={handleLogin}>
      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
          Email
        </label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="you@example.com"
          className="w-full mt-1 px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-gray-800 dark:text-gray-200 focus:ring-2 focus:ring-blue-500 outline-none"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
          Password
        </label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="••••••••"
          className="w-full mt-1 px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-gray-800 dark:text-gray-200 focus:ring-2 focus:ring-blue-500 outline-none"
        />
      </div>
      <button
        type="submit"
        className="w-full py-2 px-4 bg-blue-600 hover:bg-blue-700 text-white rounded-lg shadow-md transition-colors duration-200">
        Login
      </button>
    </form>
  );
};

export default LoginForm;
