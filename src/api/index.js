import { ApiClient } from "../services/config";

/* eslint-disable no-unused-vars */
export const getCategoryList = async () => {
  try {
    const resp = await ApiClient.get(`category/all`);
    const { data } = resp;
    return data;
  } catch (err) {
    return false;
  }
};

export const getProductList = async (payload) => {
  try {
    const {
      limit: itemsPerPage,
      offset: page,
      searchText,
      catIds,
      sortBy,
      isActiveOnly
    } = payload;
    const params = { itemsPerPage, page, searchText, catIds, sortBy, isActiveOnly };
    const resp = await ApiClient.get(`product/all`, { params });
    const { data } = resp;
    return data;
  } catch (err) {
    return false;
  }
};

export const createProductApi = async (payload) => {
  try {
    const resp = await ApiClient.post(`product`, payload);
    const { data } = resp;
    return data;
  } catch (err) {
    return false;
  }
};

export const updateProductApi = async (productId, payload) => {
  try {
    const resp = await ApiClient.put(`product/${productId}`, payload);
    const { data } = resp;
    return data;
  } catch (err) {
    return false;
  }
};

export const getProductDetailsApi = async (payload) => {
  try {
    const { productId } = payload;

    const resp = await ApiClient.get(`product/${productId}`);
    const { data } = resp;
    return data;
  } catch (err) {
    return false;
  }
};
