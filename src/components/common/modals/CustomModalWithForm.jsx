/* eslint-disable react/prop-types */
import { Button, Drawer, Flex } from 'antd';
import { Formik } from 'formik';


const CustomModalWithForm = ({
    children,
    open,
    handleCancel,
    initialValues,
    modalTitle,
    handleFormSubmit,
    validationSchema,
    reinitialise = false,
    formRefName,
    isLoading = false,
    hideFooter = false,
    isDisabled = false,
    firstBtnTxt = 'Submit',
    secondBtnTxt = 'Cancel',
    resetFormWhenClose = true,
    width = 470,
}) => {
    return (
        <Formik
            initialValues={initialValues}
            onSubmit={handleFormSubmit}
            validationSchema={validationSchema}
            enableReinitialize={reinitialise}
            innerRef={formRefName}
        >
            {formikBag => {
                const onClickSubmit = (e) => {
                    e.preventDefault();
                    formikBag.handleSubmit();
                    // if (!isLoading) {
                    //     setSubmitting(isLoading);
                    // }
                };
                return (
                    <Drawer
                        title={modalTitle}
                        open={open}
                        onClose={() => {
                            handleCancel();
                            if (resetFormWhenClose) {
                                formikBag.resetForm();
                            }
                        }}
                        closeIcon={null}
                        // destroyOnClose
                        width={width}
                        styles={{
                            body: { paddingInline: 20, paddingBlock: 16 },
                            header: { paddingInline: 20 },
                        }}
                        zIndex={20}
                        footer={[
                            !hideFooter && (
                                <Flex className="w-full " justify="flex-end" gap={10} key="">
                                    <Button
                                        key="submit"
                                        type="primary"
                                        loading={isLoading ?? formikBag.isSubmitting}
                                        disabled={isDisabled}
                                        onClick={onClickSubmit}
                                        className="px-5"
                                    >
                                        {firstBtnTxt}
                                    </Button>

                                    <Button
                                        key="back"
                                        onClick={() => {
                                            handleCancel();
                                            if (resetFormWhenClose) {
                                                formikBag.resetForm();
                                            }
                                        }}
                                        className="px-5"
                                    >
                                        {secondBtnTxt}
                                    </Button>
                                </Flex>
                            ),
                        ]}
                    >
                        {typeof children === 'function' ? children(formikBag) : children}
                    </Drawer>
                );
            }}
        </Formik>
    );
};

export default CustomModalWithForm;
