import { Add, Done, Edit, RotateLeft } from "@mui/icons-material";
import { Tooltip } from "@mui/material";
import {
  Button,
  CustomAutocomplete,
  CustomDrawer,
  TextInput,
} from "components/core";
import { useFormik } from "formik";
import { useFetch, useSWRFetch } from "hooks";
import { useState } from "react";
import DepartmentType from "types/department";
import MouType from "types/mou";
import { autoAddFormdata, notify } from "utils";
import * as Yup from "yup";
import { AddAdmissionDocumentDialog } from "./dialog";

type dataType = {
  data: DepartmentType[];
};
type mouType = {
  data: MouType;
};
const AddMouDrawer = ({ open, onClose, Dmutate, feeName }: any) => {
  const [openDrawer, setOpenDrawer] = useState(false);
  const { mutate: department } = useFetch();
  const { data } = useSWRFetch<dataType>(`department`);
  const { data: mou, mutate: mouMutate } = useSWRFetch<mouType>(
    open && `mou/${open}`
  );
  const [documents, setDocuments] = useState<Document[]>([]);
  const mouDetailsSchema = [
    {
      key: "1",
      name: "title",
      label: "Title*",
      initialValue: "",
      type: "text",
      validationSchema: Yup.string().required("Title is required"),
    },
    {
      key: "2",
      name: "signUnderWhom",
      label: "Sign Under Whom",
      initialValue: "",
      type: "text",
      validationSchema: Yup.string().optional(),
    },
    {
      key: "3",
      name: "signBy",
      label: "Sign By",
      initialValue: "",
      type: "text",
      validationSchema: Yup.string().optional(),
    },
    {
      key: "4",
      name: "dateOfSigning",
      label: "Date Of Signing",
      initialValue: "",
      type: "date",
      validationSchema: Yup.string().optional(),
    },
    {
      key: "5",
      name: "dateOfExpire",
      label: "Date Of Expiry",
      initialValue: "",
      type: "date",
      validationSchema: Yup.string().optional(),
    },

    {
      key: "6",
      name: "includeDepartment",
      label: "Included Department",
      initialValue: "",
      type: "autoComplete",
      validationSchema: Yup.string().optional(),
      options: data?.data?.map((data) => ({
        label: `${data?.title}`,
        value: `${data?._id}`,
        key: `${data?.title}`,
      })),
    },
    {
      key: "7",
      name: "description",
      label: "Description",
      initialValue: "",
      type: "text",
      validationSchema: Yup.string().optional(),
      // validationSchema: Yup.string()
      //   .required("Description is required")
      //   .min(5, "Minimum 5 characters required"),
      multiline: true,
      rows: 5,
    },
    // {
    //   key: "7",
    //   name: "doucmentUpload",
    //   label: "Document Upload",
    //   initialValue: "",
    //   //   validationSchema: Yup.mixed().required("Document is required!"),
    //   type: "file",
    // },
  ];

  const initialValues = mouDetailsSchema?.reduce(
    (accumulator, currentValue) => {
      accumulator[currentValue?.name] = currentValue?.initialValue;
      return accumulator;
    },
    {} as any
  );

  const validationSchema = mouDetailsSchema?.reduce(
    (accumulator, currentValue) => {
      accumulator[currentValue?.name] = currentValue?.validationSchema;
      return accumulator;
    },
    {} as any
  );
  const { mutate } = useFetch();

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: open
      ? {
          ...mou?.data,
          includeDepartment: mou?.data?.includeDepartment?._id
            ? mou?.data?.includeDepartment?._id
            : "",
          dateOfSigning: mou?.data?.dateOfSigning
            ? mou?.data?.dateOfSigning?.split("T")[0]
            : "",
          dateOfExpire: mou?.data?.dateOfExpire
            ? mou?.data?.dateOfExpire?.split("T")[0]
            : "",
          signUnderWhom: mou?.data?.signUnderWhom
            ? mou?.data?.signUnderWhom
            : "",
        }
      : initialValues,
    validationSchema: Yup.object(validationSchema),
    onSubmit: async (values) => {
      // console.log("values-->", values);

      let formData = autoAddFormdata({
        ...values,
        signUnderWhom: values?.signUnderWhom ? values?.signUnderWhom : " ",
        dateOfExpire: values?.dateOfExpire ? values?.dateOfExpire : "",
        dateOfSigning: values?.dateOfSigning ? values?.dateOfSigning : "",
        includeDepartment: values?.includeDepartment
          ? values?.includeDepartment
          : "",
      });
      feeName !== "Edit" &&
        documents?.forEach((doc: any) =>
          formData.append(Object.keys(doc)[0], Object.values(doc)[0] as any)
        );
      try {
        const response = await department({
          path: feeName === "Edit" ? `mou/${open}` : `mou/create`,
          method: feeName === "Edit" ? "PUT" : "POST",
          body: formData,
          isFormData: true,
        });
        if (response?.data?.error) {
          notify.error(response?.data?.error);
          return;
        }
        setOpenDrawer(false);
        formik?.resetForm();
        setDocuments([]);
        Dmutate();
        mouMutate();
        notify.success(response?.data?.message);
      } catch (err) {
        console.log(err);
      }
    },
  });

  return (
    <>
      <div>
        <CustomDrawer
          open={openDrawer}
          onClose={() => setOpenDrawer(false)}
          anchor="right"
          maxWidth="md"
          width="40vw"
        >
          <div className="w-full p-4 ">
            <h3 className="font-semibold tracking-wide p-4  text-theme border-b text-2xl text-center">
              {feeName} MOU
            </h3>
            <form className="grid grid-cols-12 w-full px-4 gap-4 pt-10">
              {mouDetailsSchema?.map((items: any) => (
                <>
                  {items?.type === "autoComplete" ? (
                    <div className="col-span-12 text-theme  ">
                      <CustomAutocomplete
                        label={"Choose Department"}
                        value={
                          data?.data
                            ?.filter(
                              (i) => i?._id === formik?.values[items?.name]
                            )
                            ?.map((item) => {
                              return {
                                key: item?._id,
                                label: item?.title,
                                value: item?._id,
                              };
                            })?.[0] || {
                            key: " ",
                            label: " ",
                            value: " ",
                          }
                        }
                        onChange={(e, value) => {
                          formik?.setFieldValue(
                            "includeDepartment",
                            value?.value
                          );
                        }}
                        error={Boolean(
                          formik?.touched?.includeDepartment &&
                            formik?.errors?.includedDepartment
                        )}
                        helperText={
                          formik?.touched?.includeDepartment &&
                          (formik?.errors?.includeDepartment as any)
                        }
                        options={items?.options}
                        isOptionEqualToValue={(option, value) =>
                          option?.value === value?.value
                        }
                        noOptionText="No department found"
                      />
                    </div>
                  ) : (
                    <TextInput
                      title={items?.label}
                      key={items?.key}
                      name={items?.name}
                      type={items?.type as any}
                      value={formik?.values[items?.name]}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      options={items?.options}
                      // rows={items?.rows}
                      //   size="small"
                      fullWidth
                      // multiline={items?.multiline}
                      error={Boolean(
                        formik?.touched[items?.name] &&
                          formik?.errors[items?.name]
                      )}
                      helperText={
                        formik?.touched[items?.name] &&
                        (formik?.errors[items?.name] as any)
                      }
                      styleArea={`${
                        // items?.multiline
                        //   ? "col-span-12 md:col-span-12 !w-full"
                        //   :
                        `col-span-12 ${
                          items?.name === "description" ||
                          items?.name === "title"
                            ? `md:col-span-12`
                            : `md:col-span-6`
                        } !w-full`
                      }`}
                      styleField="w-full col-span-12 overflow-hidden"
                      // inputProps={{
                      //   max:
                      //     items?.name === "dateOfSigning" &&
                      //     new Date().toISOString().split("T")[0],
                      // }}
                      multiline={items?.multiline}
                      rows={items?.rows}
                    />
                  )}
                </>
              ))}
              {feeName !== "Edit" && (
                <div className=" col-span-12 flex flex-col mt-3 justify-center items-center">
                  <AddAdmissionDocumentDialog
                    documents={documents}
                    setDocuments={setDocuments}
                  />
                </div>
              )}
            </form>
            <div className="w-full flex pt-10 gap-2 px-4 justify-end">
              <Button
                className="shadow-none"
                type="submit"
                onClick={() => formik.handleSubmit()}
                startIcon={<Done />}
                loading={formik.isSubmitting}
              >
                Save
              </Button>
              <Button
                type="reset"
                // onClick={() => formik.resetForm()}
                onClick={() => {
                  formik.resetForm();
                  setDocuments([]);
                }}
                className={"bg-red-400 shadow-none"}
                startIcon={<RotateLeft />}
              >
                Reset
              </Button>
            </div>
          </div>
        </CustomDrawer>
        {feeName === "Add" && (
          <Button
            className={"!text-2xl !shadow-none mt-4"}
            startIcon={<Add />}
            onClick={() => setOpenDrawer(true)}
          >
            Add MOU
          </Button>
        )}
      </div>
      {feeName === "Edit" && (
        <span className="cursor-pointer" onClick={() => setOpenDrawer(true)}>
          <Tooltip title="Edit MOU">
            <Edit />
          </Tooltip>
        </span>
      )}
    </>
  );
};

export default AddMouDrawer;
