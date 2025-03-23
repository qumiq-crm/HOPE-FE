/* eslint-disable no-unused-vars */
export const useLocalStore = () => {
  const itemsList = {
    token: "token",
    cart: "cart-data",
    orders: "orders-list",
  };
  const setData = (key, data) => {
    let processedData;
    if (typeof data === "object") {
      processedData = JSON.stringify(data);
    } else {
      processedData = data;
    }

    localStorage.setItem(key, processedData);
  };

  const getData = (key) => {
    const data = localStorage.getItem(key);

    if (!data) {
      return null;
    }

    try {
      return JSON.parse(data);
    } catch (error) {
      return data;
    }
  };

  return { setData, getData, itemsList };
};
