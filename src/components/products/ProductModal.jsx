/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { Form, Skeleton } from "antd";

import TextInput from "../common/inputs/TextInput";
import TextAreaInput from "../common/inputs/TextAreaInput";
import SelectInput from "../common/inputs/SelectInput";
import CustomModalWithForm from "../common/modals/CustomModalWithForm";
// import FileUploadInput from "../common/inputs/FileUploadInput";
import { productSchema } from "../../schemas";
import FileUploadInput from "../common/inputs/FileUploadInput";
const ProductModal = ({
  open,
  handleCancel,
  data,
  categoryData,
  productImages,
  handleCreatePrd,
  handleUpdatePrd,
}) => {
  return (
    <CustomModalWithForm
      reinitialise
      modalTitle="Product Management"
      open={open}
      validationSchema={productSchema}
      handleCancel={handleCancel}
      handleFormSubmit={async (values) => {
        if (data && data._id) {
          await handleUpdatePrd(data._id, values);
        } else {
          await handleCreatePrd(values);
        }
        handleCancel();
      }}
      initialValues={{
        _id: data?._id,
        name: data?.name || "",
        brand: data?.brand || "",
        description: data?.description || "",
        images: data?.images || [],
        highlights: data?.highlights || "",
        warranty: data?.warranty || "",
        SKUCode: data?.SKUCode || "",
        price: !isNaN(data?.price) ? `${data?.price}` : "",
        category: data?.category?._id?.toString() || "",
        quantity: data?.quantity || "",
        discountType: data?.discountType,
        discount:
          data?.discount && Number(data?.discount) >= 0
            ? `${data?.discount}`
            : "",
        productImage1: data?.images[0] || "",
        productImage2: data?.images[1] || "",
        productImage3: data?.images[2] || "",
        productImageFormat1: "",
        productImageFormat2: "",
        productImageFormat3: "",
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
            allowAlphabetsAndSpaceOnly
          />
          <TextInput
            name="brand"
            label="Brand Name (Optional)"
            type="text"
            placeholder="Please enter brand "
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
          <TextInput
            name="highlights"
            label="Highlights"
            placeholder="Please enter highlights"
            maxLength={50}
          />
          <TextAreaInput
            name="warranty"
            label="Warranty (Optional)"
            placeholder="Please enter warranty"
            maxLength={350}
          />
          <TextInput
            name="SKUCode"
            label="SKU Code (Optional)"
            type="text"
            placeholder="Please enter SKU Code "
            classes=" rounded-sm"
            maxLength={50}
          />
          {categoryData ? (
            <SelectInput
              isRequired
              name="category"
              options={categoryData.map((cat) => ({
                label: cat?.name,
                value: cat?._id,
              }))}
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
            options={[
              { value: "PERCENTAGE", label: "Percentage" },
              { value: "FLAT", label: "Flat" },
            ]}
            placeholder="Please select a discount type"
            label="Discount type (Optional)"
          />
          <TextInput
            allowTwoDecimalsOnly
            name="discount"
            label="Discount (Optional)"
            type="text"
            placeholder="Please enter discount  "
            classes=" rounded-sm"
            maxLength={10}
          />
          <FileUploadInput
            name="productImage1"
            format="productImageFormat1"
            label="Upload Image 1"
            defaultFileName="Image-1"
            showFileName
            allowFileDelete
          />
          <FileUploadInput
            name="productImage2"
            format="productImageFormat2"
            label="Upload Image 2"
            defaultFileName="Image-2"
            showFileName
            allowFileDelete
          />
          <FileUploadInput
            name="productImage3"
            format="productImageFormat3"
            label="Upload Image 3"
            defaultFileName="Image-3"
            showFileName
            allowFileDelete
          />
        </Form>
      )}
    </CustomModalWithForm>
  );
};

export default ProductModal;
