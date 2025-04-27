/* eslint-disable no-unused-vars */
import { useState, useEffect, useCallback } from "react";
import { getCategoryList } from "../api/index";
import notify from "./useNotifyToast";

const useCategory = () => {
  const [categories, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchProducts = useCallback(async () => {
    setLoading(true);

    try {
      const data = await getCategoryList();
      if (data) {
        setProducts(data?.categories || []);
      }
    } catch (err) {
      notify("Something went wrong", "error");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  return {
    categories,
    loading,
    refetch: fetchProducts,
  };
};

export default useCategory;
