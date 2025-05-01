import * as Yup from "yup";

// Reusable regex
const alphabets = /^[a-zA-Z0-9\s\-_.,!&'()]+$/;

export const productSchema = Yup.object().shape({
  name: Yup.string()
    .required("Please enter the product name")
    .min(3, "Product name must be at least 3 characters")
    .max(50, "Maximum 50 characters are allowed")
    .matches(alphabets, "Please enter a valid name")
    .test(
      "no-leading-whitespace",
      "Name cannot start with whitespace",
      (value) => !/^\s/.test(value || "")
    )
    .test(
      "no-multiple-whitespace",
      "Name cannot contain consecutive whitespaces",
      (value) => !/\s{2,}/.test(value || "")
    )
    .test(
      "not-only-whitespace",
      "Name cannot be only whitespace",
      (value) => !/^\s*$/.test(value || "")
    ),

  brand: Yup.string()
    .nullable()
    .max(50, "Maximum 50 characters are allowed")
    .test(
      "no-leading-whitespace",
      "Brand name cannot start with whitespace",
      (value) => !value || !/^\s/.test(value)
    )
    .test(
      "no-multiple-whitespace",
      "Brand name cannot contain consecutive whitespaces",
      (value) => !value || !/\s{2,}/.test(value)
    )
    .test(
      "not-only-whitespace",
      "Brand name cannot be only whitespace",
      (value) => !value || !/^\s*$/.test(value)
    ),

  description: Yup.string()
    .required("Please enter the description")
    .min(3, "Description must be at least 3 characters")
    .max(350, "Maximum 350 characters are allowed")
    .test(
      "no-leading-whitespace",
      "Description cannot start with whitespace",
      (value) => !/^\s/.test(value || "")
    ),

  highlights: Yup.string()
    .optional()
    .min(3, "Highlights must be at least 3 characters")
    .max(350, "Maximum 350 characters are allowed")
    .test(
      "no-leading-whitespace",
      "Highlights cannot start with whitespace",
      (value) => !/^\s/.test(value || "")
    ),

  warranty: Yup.string()
    .nullable()
    .max(350, "Maximum 350 characters are allowed")
    .test(
      "no-leading-whitespace",
      "Warranty cannot start with whitespace",
      (value) => !value || !/^\s/.test(value)
    ),

  SKUCode: Yup.string()
    .required("Please enter the SKU Code")
    .max(50, "Maximum 50 characters are allowed")
    .test(
      "no-leading-whitespace",
      "SKU Code cannot start with whitespace",
      (value) => !/^\s/.test(value || "")
    ),

  category: Yup.string().required("Please select a category"),

  price: Yup.number()
    .typeError("Price must be a valid number")
    .required("Please enter the price")
    .positive("Price must be greater than 0")
    .max(9999999999, "Price value is too large"), // max 10 digits

  quantity: Yup.number()
    .typeError("Quantity must be a valid number")
    .required("Please enter the quantity")
    .integer("Quantity must be an integer")
    .positive("Quantity must be greater than 0")
    .max(9999999999, "Quantity value is too large"), // max 10 digits

  discountType: Yup.string().required("Please select a discount type"),

  discount: Yup.number()
    .typeError("Discount must be a valid number")
    .required("Please enter the discount")
    .min(0, "Discount cannot be negative")
    .max(1000000000, "Discount value is too large"),
});

export const categorySchema = Yup.object().shape({
  name: Yup.string()
    .required("Please enter the category name")
    .min(3, "Category name must be at least 3 characters")
    .max(50, "Maximum 50 characters are allowed")
    .matches(alphabets, "Please enter a valid name")
    .test(
      "no-leading-whitespace",
      "Name cannot start with whitespace",
      (value) => !/^\s/.test(value || "")
    )
    .test(
      "no-multiple-whitespace",
      "Name cannot contain consecutive whitespaces",
      (value) => !/\s{2,}/.test(value || "")
    )
    .test(
      "not-only-whitespace",
      "Name cannot be only whitespace",
      (value) => !/^\s*$/.test(value || "")
    ),
  description: Yup.string()
    .required("Please enter the description")
    .min(3, "Description must be at least 3 characters")
    .max(350, "Maximum 350 characters are allowed")
    .test(
      "no-leading-whitespace",
      "Description cannot start with whitespace",
      (value) => !/^\s/.test(value || "")
    ),
});
