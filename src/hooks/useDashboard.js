/* eslint-disable no-unused-vars */
import { useState, useEffect, useCallback } from "react";
import {
  getAllCategories,
  getDashDetails,
} from "../api/index";
import notify from "./useNotifyToast";

const useDashboard = () => {
  const [categories, setCategories] = useState([]);
  const [newArrivals, setNewArrivals] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchCategories = useCallback(async () => {
    setLoading(true);

    try {
      const data = await getDashDetails();

      if (data) {
        setCategories(data?.categories || []);
        setNewArrivals(data?.products || []);
      }
    } catch (err) {
      notify("Something went wrong", "error");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchCategories();
  }, [fetchCategories]);

  return {
    categories,
    newArrivals,
    loading,
  };
};

export default useDashboard;
