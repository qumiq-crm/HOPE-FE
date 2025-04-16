/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { Form, Skeleton } from "antd";

import TextInput from "../common/inputs/TextInput";
import TextAreaInput from "../common/inputs/TextAreaInput";
import SelectInput from "../common/inputs/SelectInput";
import CustomModalWithForm from "../common/modals/CustomModalWithForm";
import FileUploadInput from "../common/inputs/FileUploadInput";
const ProductModal = ({
  open,
  handleCancel,
  data,
  categoryData,
  productImages,
}) => {
  return (
    <CustomModalWithForm
      reinitialise
      modalTitle="Product Management"
      open={open}
      // validationSchema={ProductSchema}
      handleCancel={handleCancel}
      handleFormSubmit={async () => {}}
      initialValues={{
        id: data?.id || "",
        name: data?.name || "",
        brand: data?.brand || "",
        description: data?.description || "",
        highlights: data?.highlights || "",
        warranty: data?.warranty || "",
        SKUCode: data?.SKUCode || "",
        price: data?.price || "",
        categoryId: data?.categoryId.toString() || "",
        quantity: data?.quantity || "",
        discountType: data?.discountType || "",
        discount: data?.discount || "",
        productImage1: data?.productImage || "",
        productImage2: "",
        productImage3: "",
        productImageFormat1: productImages?.productImage1,
        productImageFormat2: productImages?.productImage2,
        productImageFormat3: productImages?.productImage3,
      }}
    >
      {({ values }) => (
        <Form layout="vertical">
          <TextInput
            name="name"
            label="Product Name"
            type="text"
            placeholder="Please enter name "
            isRequired
            classes=" rounded-sm"
            maxLength={50}
            // allowedInputKeys={value => value.replace(/^(?=.*[a-zA-Z0-9])[a-zA-Z0-9\s!@#$%^&*()\-_=+[\]{};:'",.<>?/|`~]*$/, '')}
          />
          <TextInput
            name="brand"
            label="Brand Name"
            type="text"
            placeholder="Please enter brand "
            isRequired
            classes=" rounded-sm"
            maxLength={50}
          />
          <TextAreaInput
            name="description"
            label="Description"
            placeholder="Please enter description"
            isRequired
            maxLength={350}
          />
          <TextAreaInput
            name="highlights"
            label="Highlights"
            placeholder="Please enter highlights"
            isRequired
            maxLength={350}
          />
          <TextAreaInput
            name="warranty"
            label="Warranty"
            placeholder="Please enter warranty"
            maxLength={350}
          />
          <TextInput
            name="SKUCode"
            label="SKU Code"
            type="text"
            placeholder="Please enter SKU Code "
            classes=" rounded-sm"
            maxLength={50}
          />
          {categoryData ? (
            <SelectInput
              isRequired
              name="categoryId"
              options={categoryData}
              placeholder="Please select a category"
              label="Category"
            />
          ) : (
            <Skeleton.Input active block />
          )}
          <TextInput
            allowTwoDecimalsOnly
            name="price"
            label="Price"
            type="text"
            placeholder="Please enter amount"
            isRequired
            classes=" rounded-sm"
            maxLength={10}
          />
          <TextInput
            allowNumbersOnly
            name="quantity"
            label="Quantity"
            type="text"
            placeholder="Please enter quantity"
            isRequired
            classes=" rounded-sm"
            maxLength={10}
          />
          <SelectInput
            name="discountType"
            isRequired
            options={[
              { value: "PERCENTAGE", label: "Percentage" },
              { value: "FLAT", label: "Flat" },
            ]}
            placeholder="Please select a discount type"
            label="Discount type"
          />
          <TextInput
            allowTwoDecimalsOnly
            name="discount"
            label="Discount"
            type="text"
            placeholder="Please enter discount  "
            isRequired
            classes=" rounded-sm"
            maxLength={10}
          />
          <FileUploadInput
            name="productImage1"
            format="productImageFormat1"
            label="Upload Image 1"
            showFileName
            allowFileDelete
          />
          <FileUploadInput
            name="productImage2"
            format="productImageFormat2"
            label="Upload Image 2"
            showFileName
            allowFileDelete
          />
          <FileUploadInput
            name="productImage3"
            format="productImageFormat3"
            label="Upload Image 3"
            showFileName
            allowFileDelete
          />
        </Form>
      )}
    </CustomModalWithForm>
  );
};

export default ProductModal;
