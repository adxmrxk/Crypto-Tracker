import React, { useState } from 'react';
import axios from 'axios';
import { X, Loader2 } from "lucide-react";
import getDeviceInfo from "../../utils/loginTracker";
import CURRENCIES_FRONTEND from "../../utils/currenciesFrontEnd";
import CONTENT_LANGUAGES_FRONT_END from "../../utils/contentLanguagesFrontEnd";

const Countries = [
  "Canada",
  "America",
  "Mexico",
  "Brazil",
  "Argentina",
  "Colombia",
  "Chile",
  "United Kingdom",
  "Germany",
  "France",
  "Italy",
  "Spain",
  "Switzerland",
  "Portugal",
  "Netherlands",
  "Estonia",
  "Malta",
  "India",
  "Japan",
  "South Korea",
  "Singapore",
  "Hong Kong",
  "Indonesia",
  "Philippines",
  "Thailand",
  "United Arab Emirates",
  "Saudi Arabia",
  "Israel",
  "Bahrain",
  "South Africa",
  "Nigeria",
  "Kenya",
  "Ghana",
  "Central African Republic",
  "Australia",
  "New Zealand"
];

const AuthForm = ({ handleExit, onAuthSuccess }) => {
  const [isLoginMode, setIsLoginMode] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  // Form fields
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [country, setCountry] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      if (isLoginMode) {
        // Login
        const loginInfo = getDeviceInfo();

        const response = await axios.post("http://localhost:5000/api/login", {
          email,
          password,
          loginInfo
        });

        onAuthSuccess(response.data);
      } else {
        // Sign Up
        if (password !== confirmPassword) {
          setError("Passwords do not match");
          setIsLoading(false);
          return;
        }

        if (password.length < 6) {
          setError("Password must be at least 6 characters");
          setIsLoading(false);
          return;
        }

        const countryMapping = country.toUpperCase();

        const userObject = {
          email,
          username,
          gender: null,
          settings: {
            country,
            currency: CURRENCIES_FRONTEND[countryMapping],
            displayLanguage: CONTENT_LANGUAGES_FRONT_END[countryMapping],
            contentLanguage: CONTENT_LANGUAGES_FRONT_END[countryMapping],
          },
          socials: {},
          password,
        };

        const response = await axios.post("http://localhost:5000/api/users", userObject);
        const createdUser = response.data;

        // Record the initial login
        const loginInfo = getDeviceInfo();
        loginInfo.location = country || "Unknown Location";

        try {
          const loginResponse = await axios.post(
            `http://localhost:5000/api/recordLogin/${createdUser._id}`,
            { loginInfo }
          );
          onAuthSuccess(loginResponse.data);
        } catch (err) {
          onAuthSuccess(createdUser);
        }
      }
    } catch (err) {
      setError(err.response?.data?.error || "Authentication failed. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const switchMode = (mode) => {
    setIsLoginMode(mode);
    setError("");
  };

  return (
    <div className='fixed inset-0 flex items-center justify-center z-50'>
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm cursor-pointer transition-opacity duration-300"
        onClick={handleExit}
      ></div>

      {/* Modal */}
      <div className="relative w-[420px] bg-gradient-to-b from-slate-800 via-slate-850 to-slate-900 p-8 rounded-2xl shadow-2xl border border-slate-700/50 transition-all duration-300 ease-out transform">
        {/* Close Button */}
        <button
          onClick={handleExit}
          className="absolute top-4 right-4 p-1.5 text-gray-400 hover:text-white hover:bg-slate-700/50 rounded-lg transition-all duration-300 ease-out cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Toggle Tabs */}
        <div className="flex justify-center mb-6">
          <div className="flex bg-slate-900/80 rounded-full p-1 border border-slate-700/50">
            <button
              type="button"
              onClick={() => switchMode(false)}
              className={`px-6 py-2 rounded-full text-sm font-medium transition-all duration-300 ease-out cursor-pointer ${
                !isLoginMode
                  ? 'bg-gradient-to-r from-amber-500 to-orange-500 text-white shadow-lg shadow-amber-500/25'
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              Sign Up
            </button>
            <button
              type="button"
              onClick={() => switchMode(true)}
              className={`px-6 py-2 rounded-full text-sm font-medium transition-all duration-300 ease-out cursor-pointer ${
                isLoginMode
                  ? 'bg-gradient-to-r from-amber-500 to-orange-500 text-white shadow-lg shadow-amber-500/25'
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              Sign In
            </button>
          </div>
        </div>

        {/* Header */}
        <div className="text-center mb-6">
          <h2 className="text-2xl font-bold text-white transition-all duration-300">
            {isLoginMode ? 'Welcome Back' : 'Create Account'}
          </h2>
          <p className="text-gray-400 text-sm mt-1 transition-all duration-300">
            {isLoginMode ? 'Sign in to continue to your account' : 'Join the crypto community today'}
          </p>
        </div>

        {/* Error Message */}
        {error && (
          <div className="mb-4 p-3 bg-red-500/10 border border-red-500/30 rounded-xl text-red-400 text-sm text-center transition-all duration-300">
            {error}
          </div>
        )}

        {/* Form Section */}
        <form className="space-y-4" onSubmit={handleSubmit}>
          {/* Email */}
          <div>
            <input
              type="email"
              placeholder="Email Address"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3 bg-slate-900/50 border border-slate-700/50 rounded-xl text-white placeholder-gray-500 outline-none focus:border-amber-500/50 focus:ring-2 focus:ring-amber-500/20 transition-all duration-300 ease-out"
            />
          </div>

          {/* Username - Only for Sign Up */}
          <div className={`overflow-hidden transition-all duration-300 ease-out ${!isLoginMode ? 'max-h-20 opacity-100' : 'max-h-0 opacity-0'}`}>
            <input
              type="text"
              placeholder="Username"
              required={!isLoginMode}
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full px-4 py-3 bg-slate-900/50 border border-slate-700/50 rounded-xl text-white placeholder-gray-500 outline-none focus:border-amber-500/50 focus:ring-2 focus:ring-amber-500/20 transition-all duration-300 ease-out"
            />
          </div>

          {/* Country - Only for Sign Up */}
          <div className={`overflow-hidden transition-all duration-300 ease-out ${!isLoginMode ? 'max-h-20 opacity-100' : 'max-h-0 opacity-0'}`}>
            <select
              className="w-full px-4 py-3 bg-slate-900/50 border border-slate-700/50 rounded-xl text-gray-500 outline-none focus:border-amber-500/50 focus:ring-2 focus:ring-amber-500/20 transition-all duration-300 ease-out cursor-pointer"
              value={country}
              onChange={(e) => setCountry(e.target.value)}
              required={!isLoginMode}
            >
              <option value="" disabled hidden>Select Country</option>
              {Countries.map((c, index) => (
                <option key={index} className="bg-slate-800 text-white">{c}</option>
              ))}
            </select>
          </div>

          {/* Password */}
          <div>
            <input
              type="password"
              placeholder="Password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 bg-slate-900/50 border border-slate-700/50 rounded-xl text-white placeholder-gray-500 outline-none focus:border-amber-500/50 focus:ring-2 focus:ring-amber-500/20 transition-all duration-300 ease-out"
            />
          </div>

          {/* Confirm Password - Only for Sign Up */}
          <div className={`overflow-hidden transition-all duration-300 ease-out ${!isLoginMode ? 'max-h-20 opacity-100' : 'max-h-0 opacity-0'}`}>
            <input
              type="password"
              placeholder="Confirm Password"
              required={!isLoginMode}
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full px-4 py-3 bg-slate-900/50 border border-slate-700/50 rounded-xl text-white placeholder-gray-500 outline-none focus:border-amber-500/50 focus:ring-2 focus:ring-amber-500/20 transition-all duration-300 ease-out"
            />
          </div>

          {/* Forgot Password - Only for Sign In */}
          <div className={`overflow-hidden transition-all duration-300 ease-out ${isLoginMode ? 'max-h-10 opacity-100' : 'max-h-0 opacity-0'}`}>
            <div className="text-right">
              <button type="button" className="text-amber-400 text-sm hover:text-amber-300 transition-colors duration-300 cursor-pointer">
                Forgot password?
              </button>
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-3 mt-2 bg-gradient-to-r from-amber-500 to-orange-500 text-white rounded-xl text-lg font-semibold hover:from-amber-600 hover:to-orange-600 transition-all duration-300 ease-out shadow-lg shadow-amber-500/25 hover:shadow-amber-500/40 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            {isLoading ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" />
                {isLoginMode ? 'Signing In...' : 'Creating Account...'}
              </>
            ) : (
              isLoginMode ? 'Sign In' : 'Create Account'
            )}
          </button>
        </form>

        {/* Footer */}
        <p className="text-center text-gray-500 text-sm mt-6">
          {isLoginMode ? "Don't have an account? " : "Already have an account? "}
          <button
            type="button"
            onClick={() => switchMode(!isLoginMode)}
            className="text-amber-400 hover:text-amber-300 font-medium transition-colors duration-300 cursor-pointer"
          >
            {isLoginMode ? 'Sign Up' : 'Sign In'}
          </button>
        </p>
      </div>
    </div>
  );
};

export default AuthForm;
