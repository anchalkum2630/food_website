import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import instance from "../utils/axios.js";
import { useViewContext } from "../Context/Context_view.jsx";

function GoogleCallback() {
  const navigate = useNavigate();
  const { setLogged ,fetchFavourites} = useViewContext();

  useEffect(() => {
    const fetchAccessToken = async () => {
      try {
        // Make a request to backend to get new access token using the refresh token (set in cookie)
        const response = await instance.get("/api/auth/refresh_token", {
          withCredentials: true, // Send cookies including refresh token
        });

        const accessToken = response.data.accessToken;
        // fetchFavourites();
        setLogged(true);
        console.log(accessToken)
        // localStorage.setItem("accessToken", accessToken);
        instance.defaults.headers.common["Authorization"] = `Bearer ${accessToken}`;
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
