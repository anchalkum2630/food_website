import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const GoogleCallback = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const accessToken = urlParams.get("accessToken");

    if (accessToken) {
      console.log("Got access token:", accessToken);

      // 1. Save accessToken to localStorage
      localStorage.setItem("accessToken", accessToken);

      // 2. Redirect to homepage (or dashboard)
      navigate("/");
    } else {
      const savedToken = localStorage.getItem("accessToken");

      if (savedToken) {
        console.log("Already have saved token.");
        navigate("/");
      } else {
        console.log("No token found, redirecting to SignIn");
        navigate("/SignIn");
      }
    }
  }, []);

  return (
    <div className="flex justify-center items-center h-screen">
      <h1>Logging you in...</h1>
    </div>
  );
};

export default GoogleCallback;
