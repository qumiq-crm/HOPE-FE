/* eslint-disable no-unused-vars */
import { useState } from "react";
import notify from "./useNotifyToast";
import { authenticateAdmin } from "../api";
import { useNavigate } from "react-router-dom";
import { paths } from "../routes/paths";

const useAuth = (filters) => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const authAdmin = async (password) => {
    setLoading(true);
    try {
      const data = await authenticateAdmin({ password });
      if (data) {
        localStorage.setItem("token", data?.token);
        notify("Admin login successfull", "success");
      }
      return data;
    } catch (error) {
      const errorMessage = error?.response?.data?.message || "Failed to login";
      notify(errorMessage, "error");
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    setLoading(true);
    try {
      localStorage.clear();
      navigate(paths.dashboard.home);
      notify("Admin logged out!", "success");
    } catch (error) {
      const errorMessage = error?.response?.data?.message || "Failed to logout";
      notify(errorMessage, "error");
    } finally {
      setLoading(false);
    }
  };

  return {
    loading,
    handleAuth: authAdmin,
    handleLogout,
  };
};

export default useAuth;
