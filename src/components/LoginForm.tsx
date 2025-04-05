import React, {useState} from 'react'
import { motion } from "framer-motion";
import { auth } from "../config/firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from "react-router-dom";

const LoginForm = () => {

    const navigate = useNavigate();
    const [formData, setFormData] = useState({
      email: "",
      password: "",
    });
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);
  
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    };
  
    const handleSubmit = async (e: React.FormEvent) => {
      e.preventDefault();
      setError(null);
      setLoading(true);
  
      try {
          //Email & Password Login
          await signInWithEmailAndPassword(
            auth,
            formData.email,
            formData.password
          );
          localStorage.setItem("isAdmin", "false");
          alert("Logged In successfully!")
          // console.log("User created:", userCredential.user);
          navigate("/");
      } catch (error: any) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };
  return (
    <motion.form
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        onSubmit={handleSubmit}
        className="space-y-4"
      >
       
        <div>
          <label className="block text-green-300 font-medium">Email</label>
          <input
            type="email"
            name="email"
            placeholder="Enter your email"
            value={formData.email}
            onChange={handleInputChange}
            required
            className="w-full p-3 border rounded-lg bg-gray-900 text-green-200 focus:outline-none focus:ring-2 focus:ring-green-400 transition"
          />
        </div>

        <div>
          <label className="block text-green-300 font-medium">Password</label>
          <input
            type="password"
            name="password"
            placeholder="Enter your password"
            value={formData.password}
            onChange={handleInputChange}
            required
            className="w-full p-3 border rounded-lg bg-gray-900 text-green-200 focus:outline-none focus:ring-2 focus:ring-green-400 transition"
          />
        </div>

        <motion.button
          whileHover={{ scale: 1.05 }}
          type="submit"
          className="w-full bg-blue-600 text-white py-3 rounded-lg font-medium transition shadow-lg hover:shadow-xl"
        >
          {loading ? "Logging In..." : "Login"}
        </motion.button>
        {error && <p style={{ color: "red" }}>{error}</p>}
      </motion.form>
  )
}

export default LoginForm
