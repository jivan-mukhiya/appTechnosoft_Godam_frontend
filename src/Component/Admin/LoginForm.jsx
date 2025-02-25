/* eslint-disable react/prop-types */

// import { useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import Button from "../Common/Button";
import FormUtils from "../Utils/FormUtils";

function LoginForm({ onLoginSuccess }) {
  const [user, setUser] = useState({
    username: "",
    password: "",
  });

  const [error, setError] = useState(""); // State to store error message
  // const navigate = useNavigate(); // useNavigate hook

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(""); // Clear any previous errors

    try {
      // Send POST request to your API endpoint for login
      const response = await axios.post("http://localhost:9000/user/login", user);

      // Check if the response contains user data (successful login)
      if (response.data.userRole && response.data) {
        console.log("Login successful");
        const { userRole, username, password } = response.data;// Assuming API returns role only
       // Store the necessary data in localStorage
       localStorage.setItem("role", userRole);
       localStorage.setItem("username", username); // Store username if needed
       localStorage.setItem("password", password); // Store password if needed
        onLoginSuccess(userRole);  // Notify parent component about successful login
       
      } else {  
        setError("Invalid credentials"); // Show error if login fails
        
      }
    } catch (err) {
      setError("Error logging in. Please try again later."); // Handle API errors
      console.error(err);
    }
  };

  return (
    <div className="flex items-center justify-center p-8 h-screen bg-gray-100">
      <div className="bg-white shadow-md rounded-lg p-8 w-full max-w-md">
        <h2 className="text-2xl font-bold text-gray-800 text-center mb-6">Login</h2>

        {/* Display error message */}
        {error && <p className="text-red-500 mb-4">{error}</p>}

        <form onSubmit={handleSubmit}>
          {/* Username Input */}
          <FormUtils
            htmlFor="username"
            tagName="Username/Email"
            name="username"
            type="text"
            id="username"
            placeholder="Enter your Username"
            onChange={handleInputChange}
            value={user.username}
          />

          {/* Password Input */}
          <FormUtils
            htmlFor="password"
            tagName="Password"
            name="password"
            type="password"
            id="password"
            placeholder="Enter Password"
            onChange={handleInputChange}
            value={user.password}
          />

          {/* Submit Button */}
          <Button name="Login" type="submit"
          className="w-full bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-4 rounded-md transition duration-200"
          />
        </form>
      </div>
    </div>
  );
}

export default LoginForm;
  