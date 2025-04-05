/* eslint-disable react/prop-types */
import { Form, Skeleton } from "antd";

import SelectInput from "@components/atomic/inputs/SelectInput";
import TextAreaInput from "@components/atomic/inputs/TextAreaInput";
import TextInput from "@components/atomic/inputs/TextInput";
import CustomModalWithForm from "@components/molecular/modals/CustomModalWithForm";

import AddVendorDetails from "./AddVendorDetails";
import ProductSchema from "../../schema/ProductSchema";
const ProductModal = ({
  open,
  handleCancel,
  data,
  categoryData,
  vendorData,
  productImages,
}) => {


  return (
    <CustomModalWithForm
      reinitialise
      modalTitle="Product Management"
      open={open}
      validationSchema={ProductSchema}
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
        categoryId: data?.categoryId.toString() || "",
        priceExcludedVat: "",
        quantity: data?.quantity || "",
        discountType: data?.discountType || "",
        discount: data?.discount || "",
        vatType: data?.vatType || "",
        productImage1: data?.productImage || "",
        productImage2: "",
        productImage3: "",
        VAT: data?.VAT || "",
        productImageFormat1: productImages?.productImage1,
        productImageFormat2: productImages?.productImage2,
        productImageFormat3: productImages?.productImage3,
        vendors:
          data?.vendors && data?.vendors.length > 0
            ? data?.vendors
            : [
                {
                  id: "",
                  price: "",
                  name: "",
                },
              ],
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
            name="priceExcludedVat"
            label="Price (Excluded VAT)"
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
          <SelectInput
            name="vatType"
            isRequired
            options={[
              { value: "PERCENTAGE", label: "Percentage" },
              { value: "CUSTOM", label: "Flat" },
            ]}
            placeholder="Please select a VAT type"
            label="VAT type"
          />
          <TextInput
            allowTwoDecimalsOnly
            name="VAT"
            label="VAT "
            type="text"
            placeholder="Please enter VAT"
            isRequired
            maxLength={10}
          />
          <AddVendorDetails values={values.vendors} vendorData={vendorData} />
          {/* <CustomFileUploadInput
            existingFileUrl={productImages?.productImage1}
            label="Product Image 1"
            name="productImage1"
            setFile={setFile}
            format="format1"
            showNotification
            showFileName
          />

          <CustomFileUploadInput
            existingFileUrl={productImages?.productImage2}
            label="Product Image 2"
            name="productImage2"
            setFile={setFile}
            format="format2"
            showNotification
            showFileName
          />

          <CustomFileUploadInput
            existingFileUrl={productImages?.productImage3}
            label="Product Image 3"
            name="productImage3"
            setFile={setFile}
            format="format3"
            showNotification
            showFileName
          /> */}
        </Form>
      )}
    </CustomModalWithForm>
  );
};

export default ProductModal;
