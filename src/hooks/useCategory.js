/* eslint-disable no-unused-vars */
import { useState, useEffect, useCallback } from "react";
import {
  createCategoryApi,
  getCategoryList,
  updateCategoryApi,
} from "../api/index";
import notify from "./useNotifyToast";

const useCategory = (filters) => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchCategories = useCallback(async () => {
    setLoading(true);

    try {
      const data = await getCategoryList(filters);
      console.log(data);

      if (data) {
        setCategories(data?.categories || []);
      }
    } catch (err) {
      notify("Something went wrong", "error");
    } finally {
      setLoading(false);
    }
  }, [filters]);

  const updateCategory = async (id, categoryData) => {
    setLoading(true);
    try {
      const data = await updateCategoryApi(id, categoryData);
      if (data) {
        fetchCategories();
        notify("Category created successfully!", "success");
      }
      return data;
    } catch (error) {
      const errorMessage =
        error?.response?.data?.message || "Failed to create category";
      notify(errorMessage, "error");
    } finally {
      setLoading(false);
    }
  };

  const createCategory = async (categoryData) => {
    setLoading(true);
    try {
      const data = await createCategoryApi(categoryData);
      if (data) {
        fetchCategories();
        notify("Category created successfully!", "success");
      }
      return data;
    } catch (error) {
      const errorMessage =
        error?.response?.data?.message || "Failed to create category";
      notify(errorMessage, "error");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, [fetchCategories]);

  return {
    categories,
    loading,
    refetch: fetchCategories,
    handleUpdateCat: updateCategory,
    handleCreateCat: createCategory,
  };
};

export default useCategory;
