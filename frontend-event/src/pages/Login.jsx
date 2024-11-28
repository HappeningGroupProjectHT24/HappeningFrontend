import React, { useState } from "react";
import Register from "./Register";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import axios from "axios";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [view, setView] = useState("login");

  const navigate = useNavigate();
  const apiBaseURL = "https://happeningevent.azurewebsites.net/api/Auth/";

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      const response = await axios.post(`${apiBaseURL}login`, {
        userName: username,
        password: password,
      });
      const token = response.data.token;
      localStorage.setItem("token", token);

      const decodedToken = jwtDecode(token);
      const roleKey =
        "http://schemas.microsoft.com/ws/2008/06/identity/claims/role";
      const userRole = decodedToken[roleKey];

      if (userRole === "Admin") {
        navigate("/admin");
      } else if (userRole === "User") {
        navigate("/user/");
      } else {
        setError("Okänd roll");
      }
    } catch (error) {
      setError("Ogiltigt användarnamn eller lösenord");
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleLogin = () => {
    window.location.href = `${apiBaseURL}google-login`;
    navigate("/user/");
  };

  const handleRegisterView = () => setView("register");

  return (
    <div className="flex items-center justify-center min-h-screen bg-BrightOrange px-4 py-6 sm:px-6 lg:px-8">
      {view === "login" && (
        <form
          onSubmit={handleSubmit}
          className="w-full max-w-md bg-white p-8 rounded-lg shadow-xl"
        >
          <h2 className="mb-6 text-3xl font-bebas text-center text-BloodOrange">
            Login
          </h2>
          <div className="mb-4">
            <input
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-BloodOrange"
            />
          </div>
          <div className="mb-6">
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-BloodOrange"
            />
          </div>
          <button
            type="submit"
            disabled={isLoading}
            className={`w-full py-2 mb-4 text-white rounded-lg ${isLoading ? "bg-gray-400" : "bg-BloodOrange hover:bg-opacity-90"
              }`}
          >
            {isLoading ? "Loggar in..." : "Login"}
          </button>
          {error && <p className="mb-4 text-center text-red-600">{error}</p>}
          <div className="flex justify-between mb-4 text-sm">
            <button
              type="button"
              onClick={handleRegisterView}
              className="text-Purple hover:underline"
            >
              Registrera
            </button>
          </div>
          <button
            type="button"
            onClick={handleGoogleLogin}
            className="w-full px-4 py-2 text-Purple border border-Purple rounded-lg hover:bg-Purple hover:text-white"
          >
            Logga in med Google
          </button>
        </form>
      )}

      {view === "register" && <Register />}
    </div>
  );
};

export default Login;
