import toast from "react-hot-toast";

/**
 * @param {string} message
 * @param {'error' | 'success'} type
 */
const notify = (message, type) =>
  toast[type](message || "", { position: "top-right" });

export default notify;
