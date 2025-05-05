/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { Form } from "antd";

import TextInput from "../common/inputs/TextInput";
import TextAreaInput from "../common/inputs/TextAreaInput";
import CustomModalWithForm from "../common/modals/CustomModalWithForm";
// import FileUploadInput from "../common/inputs/FileUploadInput";
import { categorySchema } from "../../schemas";
import FileUploadInput from "../common/inputs/FileUploadInput";
const CategoryModal = ({
  open,
  handleCancel,
  data,
  handleCreateCat,
  handleUpdateCat,
}) => {
  return (
    <CustomModalWithForm
      reinitialise
      modalTitle="Category Management"
      open={open}
      validationSchema={categorySchema}
      handleCancel={handleCancel}
      handleFormSubmit={async (values) => {
        if (data && data?._id) {
          await handleUpdateCat(data._id, values);
        } else {
          await handleCreateCat(values);
        }
        handleCancel();
      }}
      initialValues={{
        _id: data?._id,
        name: data?.name || "",
        description: data?.description || "",
        image: data?.image || "",
      }}
    >
      {({ values }) => (
        <Form layout="vertical">
          <TextInput
            name="name"
            label="Category Name"
            type="text"
            placeholder="Please enter name "
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
          <FileUploadInput
            name="image"
            format="imageFormat"
            label="Upload Image"
            defaultFileName="Image"
            showFileName
            allowFileDelete
          />
        </Form>
      )}
    </CustomModalWithForm>
  );
};

export default CategoryModal;
