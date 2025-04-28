/* eslint-disable no-unused-vars */
import { useState, useEffect, useCallback } from "react";
import {
  getAllCategories,
} from "../api/index";
import notify from "./useNotifyToast";

const useCategoryList = (isActiveOnly) => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchCategories = useCallback(async () => {
    setLoading(true);

    try {
      const data = await getAllCategories(isActiveOnly);
      console.log(data);

      if (data) {
        setCategories(data?.categories || []);
      }
    } catch (err) {
      notify("Something went wrong", "error");
    } finally {
      setLoading(false);
    }
  }, [isActiveOnly]);

  useEffect(() => {
    fetchCategories();
  }, [fetchCategories]);

  return {
    categories,
    loading,
    refetch: fetchCategories,
  };
};

export default useCategoryList;
