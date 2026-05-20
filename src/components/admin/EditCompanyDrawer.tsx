import { Done, Edit, RotateLeft } from "@mui/icons-material";
import { Tooltip } from "@mui/material";
import { Button, CustomDrawer, TextInput, UploadFile } from "components/core";
import { useFetch, useSWRFetch } from "hooks";
import { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { autoAddFormdata, notify } from "utils";
import DepartmentType from "types/department";
import CompanyType from "types/company";
// import { CompanyType } from "types/company";

type dataType = {
  data: DepartmentType[];
};
type companyType = {
  data: CompanyType[];
};
const EditCompanyDrawer = ({ open, onClose, Dmutate, feeName }: any) => {
  const [openDrawer, setOpenDrawer] = useState(false);
  const { mutate: companyData } = useFetch();
  const { data: company, mutate: companyMutate } = useSWRFetch<companyType>(
    open && `placement/company?companyId=${open}`
  );
  //   console.log(open);
  //   console.log(company);
  const companyDetailsSchema = [
    {
      key: "0",
      name: "icon",
      type: "file",
      initialValue: "",
    },
    {
      key: "1",
      name: "name",
      label: "Company Name *",
      initialValue: "",
      type: "text",
      validationSchema: Yup.string().required("Name is required"),
    },
    {
      key: "2",
      name: "phoneNumber",
      label: "Phone Number ",
      initialValue: "",
      type: "number",
      validationSchema: Yup.string().optional(),
    },
    {
      key: "3",
      name: "industry",
      label: "Industry",
      initialValue: "",
      type: "text",
      validationSchema: Yup.string().optional(),
    },
    {
      key: "4",
      name: "branch",
      label: "Branch",
      initialValue: "",
      type: "text",
      validationSchema: Yup.string().optional(),
    },
    // {
    //   key: "1",
    //   name: "companyRepresentative",
    //   label: "Company Representative",
    //   initialValue: "",
    //   type: "text",
    //   validationSchema: Yup.string().optional(),
    // },
    {
      key: "5",
      name: "address",
      label: "Address ",
      initialValue: "",
      type: "text",
      validationSchema: Yup.string().optional(),
      multiline: true,
      rows: 3,
    },
    {
      key: "6",
      name: "description",
      label: "Description ",
      initialValue: "",
      type: "text",
      validationSchema: Yup.string().optional(),
      multiline: true,
      rows: 3,
    },
  ];

  const initialValues = companyDetailsSchema?.reduce(
    (accumulator, currentValue) => {
      accumulator[currentValue?.name] = currentValue?.initialValue;
      return accumulator;
    },
    {} as any
  );

  const validationSchema = companyDetailsSchema?.reduce(
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
          ...company?.data?.[0],
          icon: company?.data?.[0]?.iconUrl,
        }
      : initialValues,
    validationSchema: Yup.object(validationSchema),
    onSubmit: async (values) => {
      console.log(values);
      // return;
      let formData = autoAddFormdata({
        ...values,
      });

      try {
        const response = await companyData({
          path:
            feeName === "Edit" ? `placement/company/${open}` : `company/create`,
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
        Dmutate();
        companyMutate();
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
              {feeName} Company
            </h3>
            <form className="grid grid-cols-12 w-full px-4 gap-4 pt-10">
              {companyDetailsSchema?.map((items: any, index) =>
                items?.name === "icon" ? (
                  <div className="col-span-12" key={index}>
                    <div
                      className="!w-full"
                      style={{
                        textAlign: "center",
                        justifyContent: "center",
                        display: "flex",
                        marginTop: "2vh",
                      }}
                    ></div>

                    <UploadFile
                      width={250}
                      height={200}
                      onChange={(e: any) =>
                        formik?.setFieldValue(items?.name, e?.target?.files[0])
                      }
                      url={
                        formik?.values[items?.name] &&
                        (typeof formik?.values[items?.name] === "string"
                          ? formik?.values[items?.name]
                          : URL.createObjectURL(formik?.values[items?.name]))
                      }
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
                    fullWidth
                    error={Boolean(
                      formik?.touched[items?.name] &&
                        formik?.errors[items?.name]
                    )}
                    helperText={
                      formik?.touched[items?.name] &&
                      (formik?.errors[items?.name] as any)
                    }
                    styleArea={`${`col-span-12 ${
                      items?.name === "address" || items?.name === "description"
                        ? `md:col-span-12`
                        : `md:col-span-6`
                    } !w-full`}`}
                    styleField="w-full col-span-12 overflow-hidden"
                    inputProps={{
                      min: new Date().toISOString().split("T")[0],
                    }}
                    multiline={items?.multiline}
                    rows={items?.rows}
                  />
                )
              )}
              {/* {companyDetailsSchema?.map((items: any) => (
                <>
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
                        items?.name === "address"
                          ? `md:col-span-12`
                          : `md:col-span-6`
                      } !w-full`
                    }`}
                    styleField="w-full col-span-12 overflow-hidden"
                    //   inputProps={{
                    //     max: new Date().toISOString().split("T")[0],
                    //   }}
                    multiline={items?.multiline}
                    rows={items?.rows}
                  />
                </>
              ))} */}
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
                }}
                className={"bg-red-400 shadow-none"}
                startIcon={<RotateLeft />}
              >
                Reset
              </Button>
            </div>
          </div>
        </CustomDrawer>
        {/* {feeName === "Add" && (
          <Button
            className={"!text-2xl !shadow-none mt-4"}
            startIcon={<Add />}
            onClick={() => setOpenDrawer(true)}
          >
            Add Company
          </Button>
        )} */}
      </div>
      {feeName === "Edit" && (
        <span
          className="bg-gradient-to-r from-transparent cursor-pointer text-white to-blue-500  px-8 h-full  flex items-center justify-center rounded-tl-lg  "
          onClick={() => setOpenDrawer(true)}
        >
          <Tooltip title="Edit Company">
            <Edit />
          </Tooltip>
        </span>
      )}
    </>
  );
};

export default EditCompanyDrawer;
