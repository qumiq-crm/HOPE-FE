import { ApiClient } from "../services/config";

/* eslint-disable no-unused-vars */
export const getCategoryList = async (payload) => {
  try {
    const {
      limit: itemsPerPage,
      offset: page,
      searchText,
      isActiveOnly,
    } = payload;
    const params = { itemsPerPage, page, searchText, isActiveOnly };
    const resp = await ApiClient.get(`category/all`, { params });
    const { data } = resp;
    return data;
  } catch (err) {
    return false;
  }
};

export const getAllCategories = async (isActiveOnly) => {
  try {
    const resp = await ApiClient.get(`category/list`, {
      params: { isActiveOnly },
    });
    const { data } = resp;
    return data;
  } catch (err) {
    return false;
  }
};

export const getDashDetails = async () => {
  try {
    const resp = await ApiClient.get(`product/dashboard`);
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
      selectedCat,
      sortBy,
      isActiveOnly,
    } = payload;
    const params = {
      itemsPerPage,
      page,
      searchText,
      selectedCat,
      sortBy,
      isActiveOnly,
    };
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

export const authenticateAdmin = async (payload) => {
  try {
    const resp = await ApiClient.post(`user/auth`, payload);
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
export const updateProductStatusApi = async (productId, payload) => {
  try {
    const resp = await ApiClient.patch(`product/${productId}/status`, payload);
    const { data } = resp;
    return data;
  } catch (err) {
    return false;
  }
};

export const createCategoryApi = async (payload) => {
  try {
    const resp = await ApiClient.post(`category`, payload);
    const { data } = resp;
    return data;
  } catch (err) {
    return false;
  }
};

export const updateCategoryApi = async (categoryId, payload) => {
  try {
    const resp = await ApiClient.put(`category/${categoryId}`, payload);
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
