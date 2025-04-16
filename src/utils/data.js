export const getFileExtensionFromUrl = (url) => {
  try {
    // Extract the part after the last dot in the URL
    const parts = typeof url === "string" ? url.split(".") : [];
    const extension = parts.length > 1 ? parts.pop() : "";
    // Check if it contains a file extension (ignore fragments and queries)
    return extension ? extension.split("?")[0] : "";
  } catch (error) {
    // Log or handle the error if needed
    console.error("Error extracting file extension:", error);
    return "";
  }
};
