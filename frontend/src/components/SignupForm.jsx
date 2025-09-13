import React, { useState } from "react";
import { z } from "zod";
import toast from "react-hot-toast";
import axios from "axios";
import { useDispatch } from "react-redux";
import { setActiveTab } from "../features/auth/AuthSlice";

// ✅ Zod schema with role included
const signupSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email"),
  password: z.string().min(6, "Password must be at least 6 characters"),
  role: z.enum(["school", "admin"], {
    errorMap: () => ({ message: "Role must be School or Admin" }),
  }),
});

// const BACKEND_URL = import.meta.env.VITE_API_URL; // !!!!!!!!!! WARNING : UNCOMMENT THIS AND THEN RUN WHEN RUNNING ON LOCALHOST !!!!!!!!!!!
const BACKEND_URL = "https://paybridge-39eo.onrender.com"; // !!!!!!!!!! WARNING : COMMENT THIS AND THEN RUN WHEN NOT RUNNING ON LOCALHOST !!!!!!!!!!!

const SignupForm = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("school"); // default role = school
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  const handleSignup = async (e) => {
    e.preventDefault();
    const data = { name, email, password, role };

    const result = signupSchema.safeParse(data);
    if (!result.success) {
      toast.error(result.error.errors[0].message);
      return;
    }

    try {
      setLoading(true);
      await axios.post(`${BACKEND_URL}/auth/signup`, data);
      toast.success("Signup successful! Now Login");
      dispatch(setActiveTab("login"));
    } catch (err) {
      toast.error(err.response?.data?.message || "Signup failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form className="space-y-5" onSubmit={handleSignup}>
      {/* Name */}
      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
          Name
        </label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Your Name"
          className="w-full mt-1 px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 
                     bg-gray-50 dark:bg-gray-700 text-gray-800 dark:text-gray-200 
                     focus:ring-2 focus:ring-blue-500 outline-none"
        />
      </div>

      {/* Email */}
      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
          Email
        </label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="you@example.com"
          className="w-full mt-1 px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 
                     bg-gray-50 dark:bg-gray-700 text-gray-800 dark:text-gray-200 
                     focus:ring-2 focus:ring-blue-500 outline-none"
        />
      </div>

      {/* Password */}
      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
          Password
        </label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="••••••••"
          className="w-full mt-1 px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 
                     bg-gray-50 dark:bg-gray-700 text-gray-800 dark:text-gray-200 
                     focus:ring-2 focus:ring-blue-500 outline-none"
        />
      </div>

      {/* Role Dropdown */}
      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
          Role
        </label>
        <select
          value={role}
          onChange={(e) => setRole(e.target.value)}
          className="w-full mt-1 px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 
                     bg-gray-50 dark:bg-gray-700 text-gray-800 dark:text-gray-200 
                     focus:ring-2 focus:ring-blue-500 outline-none">
          <option value="school">School</option>
          <option value="admin">Admin</option>
        </select>
      </div>

      {/* Submit button */}
      <button
        type="submit"
        disabled={loading}
        className={`w-full py-2 px-4 rounded-lg shadow-md transition-colors duration-200 ${
          loading
            ? "bg-blue-400 cursor-not-allowed"
            : "bg-blue-600 hover:bg-blue-700 text-white"
        }`}>
        {loading ? (
          <div className="flex items-center justify-center gap-2">
            <svg
              className="animate-spin h-5 w-5 text-white"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24">
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"></circle>
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8v4l3-3-3-3v4a8 8 0 000 16v-4l-3 3 3 3v-4a8 8 0 01-8-8z"></path>
            </svg>
            Signing up...
          </div>
        ) : (
          "Sign Up"
        )}
      </button>
    </form>
  );
};

export default SignupForm;
