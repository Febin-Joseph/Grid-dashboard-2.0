import {
  createContext,
  useState,
  useContext,
  useEffect
} from "react";
import axios from "axios";
import Cookies from "js-cookie";

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const getCsrfToken = async () => {
    try {
      const response = await axios.get("https://grid-dashboard-2-0-lj39.vercel.app/api/csrf-token", { withCredentials: true });
      axios.defaults.headers.common["X-CSRF-Token"] = response.data.csrfToken;
    } catch (error) {
      console.error("Failed to fetch CSRF token:", error);
    }
  }

  useEffect(() => {
    const initializeAuth = async () => {
      const token = Cookies.get("token");
      const userData = Cookies.get("user");

      if (token && userData) {
        setUser(JSON.parse(userData));
        axios.defaults.headers.common["Authorization"] = `Bearer ${token}`
        await getCsrfToken();
      }

      setLoading(false);
    }

    initializeAuth();
  }, []);

  const login = async (email, password) => {
    try {
      const response = await axios.post("https://grid-dashboard-2-0-lj39.vercel.app/api/auth/login", { email, password });
      const { token, user } = response.data;

      Cookies.set("token", token, { expires: 7 });
      Cookies.set("user", JSON.stringify(user), { expires: 7 });
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`

      setUser(user);
      return { success: true }
    } catch (error) {
      return {
        success: false,
        message: error.response?.data?.message || "Login failed",
      }
    }
  }

  const logout = () => {
    Cookies.remove("token");
    Cookies.remove("user");
    delete axios.defaults.headers.common["Authorization"];
    setUser(null);
  }

  const value = {
    user,
    login,
    logout,
    loading,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}