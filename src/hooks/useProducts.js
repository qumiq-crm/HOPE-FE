/* eslint-disable no-unused-vars */
import { useState, useEffect, useCallback } from "react";
import {
  createProductApi,
  getProductList,
  updateProductApi,
} from "../api/index";
import notify from "./useNotifyToast";

const useProduct = (filters) => {
  const [products, setProducts] = useState([]);
  const [totalCount, setTotalCount] = useState(0);
  const [loading, setLoading] = useState(false);

  const fetchProducts = useCallback(async () => {
    setLoading(true);

    try {
      const data = await getProductList(filters);
      if (data) {
        setProducts(data?.products || []);
        setTotalCount(data?.totalCount || 0);
      }
    } catch (err) {
      notify("Something went wrong", "error");
    } finally {
      setLoading(false);
    }
  }, [filters]);

  const createProduct = async (productData) => {
    setLoading(true);
    try {
      const data = await createProductApi(productData);
      if (data) {
        fetchProducts();
        notify("Product created successfully!", "success");
      }
      return data;
    } catch (error) {
      const errorMessage =
        error?.response?.data?.message || "Failed to create product";
      notify(errorMessage, "error");
    } finally {
      setLoading(false);
    }
  };

  const updateProduct = async (id, productData) => {
    setLoading(true);
    try {
      const data = await updateProductApi(id, productData);
      if (data) {
        fetchProducts();
        notify("Product created successfully!", "success");
      }
      return data;
    } catch (error) {
      const errorMessage =
        error?.response?.data?.message || "Failed to create product";
      notify(errorMessage, "error");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  return {
    products,
    totalCount,
    loading,
    refetch: fetchProducts,
    handleCreatePrd: createProduct,
    handleUpdatePrd: updateProduct,
  };
};

export default useProduct;
