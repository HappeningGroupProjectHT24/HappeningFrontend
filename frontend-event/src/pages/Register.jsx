import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Register = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmpassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();
  const apiBaseURL = "https://happeningevent.azurewebsites.net/api/Auth/";

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      const response = await axios.post(`${apiBaseURL}register`, {
        userName: username,
        email: email,
        password: password,
        confirmPassword: confirmpassword,
      });
      alert(
        "Registrering lyckades! Vänligen kolla din mejl och bekräfta konto"
      );
      navigate("/login");
    } catch (error) {
      setError(
        "Registreringen misslyckades. Email eller användarnamn upptaget."
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-BrightOrange px-4 py-6 sm:px-6 lg:px-8">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md bg-white p-8 rounded-lg shadow-xl"
      >
        <h2 className="mb-6 text-3xl font-bebas text-center text-Purple">
          Registrera
        </h2>
        {error && (
          <div className="mb-4 text-sm text-center text-red-600">{error}</div>
        )}
        <div className="mb-4">
          <label className="block mb-2 text-sm font-medium text-gray-700">
            Användarnamn
          </label>
          <input
            type="text"
            placeholder="Ange ditt användarnamn"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-Purple"
          />
        </div>
        <div className="mb-4">
          <label className="block mb-2 text-sm font-medium text-gray-700">
            Email
          </label>
          <input
            type="email"
            placeholder="Ange din email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-Purple"
          />
        </div>
        <div className="mb-4">
          <label className="block mb-2 text-sm font-medium text-gray-700">
            Lösenord
          </label>
          <input
            type="password"
            placeholder="Ange ditt lösenord"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-Purple"
          />
        </div>
        <div className="mb-6">
          <label className="block mb-2 text-sm font-medium text-gray-700">
            Bekräfta lösenord
          </label>
          <input
            type="password"
            placeholder="Bekräfta ditt lösenord"
            value={confirmpassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-Purple"
          />
        </div>
        <button
          type="submit"
          disabled={isLoading}
          className={`w-full py-2 text-white rounded-lg ${
            isLoading
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-Purple hover:bg-opacity-90"
          }`}
        >
          {isLoading ? "Registrerar..." : "Register"}
        </button>
        <div className="mt-4 text-center">
          <button
            type="button"
            onClick={() => navigate("/login")}
            className="text-Purple underline hover:text-PurpleDark"
          >
            Har du redan ett konto? Logga in här
          </button>
        </div>
      </form>
    </div>
  );
};

export default Register;
