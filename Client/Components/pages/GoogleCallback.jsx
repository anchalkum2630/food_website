import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "./axios";

function GoogleCallback() {
  const navigate = useNavigate();

  useEffect(() => {
    const fetchAccessToken = async () => {
      try {
        // Make a request to backend to get new access token using the refresh token (set in cookie)
        const response = await axios.get("http://localhost:5000/api/auth/refresh_token", {
          withCredentials: true, // Send cookies including refresh token
        });

        const accessToken = response.data.accessToken;
        axios.defaults.headers.common["Authorization"] = `Bearer ${accessToken}`;
        navigate("/");
      } catch (err) {
        console.error("Failed to get access token", err);
        navigate("/login"); // or handle failure appropriately
      }
    };

    fetchAccessToken();
  }, [navigate]);

  return <div>Redirecting...</div>;
}

export default GoogleCallback;
