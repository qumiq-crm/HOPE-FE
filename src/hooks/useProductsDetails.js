/* eslint-disable no-unused-vars */
import { useState, useEffect, useCallback } from "react";
import { getProductDetailsApi } from "../api/index";
import notify from "./useNotifyToast";

const useProductDetails = ({ productId }) => {
  const [product, setProduct] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchProductDetails = useCallback(async () => {
    setLoading(true);
    const payload = {
      productId,
    };

    try {
      const data = await getProductDetailsApi(payload);
      if (data) {
        setProduct(data);
      }
    } catch (err) {
      notify("Something went wrong", "error");
    } finally {
      setLoading(false);
    }
  }, [productId]);

  useEffect(() => {
    fetchProductDetails();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return {
    product,
    loading,
    refetch: fetchProductDetails,
  };
};

export default useProductDetails;
