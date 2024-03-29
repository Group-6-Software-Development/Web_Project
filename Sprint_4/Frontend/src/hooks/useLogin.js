import { useNavigate } from "react-router-dom";

export default function useLogin() {
  const navigate = useNavigate();
  const API_URL = "https://stackconnectbe.onrender.com/user/login";

  const login = async (email, password) => {
    try {
      const response = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      if (response.ok) {
        const user = await response.json();

        localStorage.setItem("token", user.token);
        localStorage.setItem("user", JSON.stringify(user));

        console.log("User logged in successfully!");

        navigate("/jobs");
      } else {
        const error = await response.json();

        alert(error.message);
        console.error("Signup failed");
      }
    } catch (err) {
      console.error(err);
      console.log(err.message);
    }
  };

  return { login };
}
