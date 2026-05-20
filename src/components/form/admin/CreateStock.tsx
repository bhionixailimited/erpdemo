import {
  Button,
  CustomAutocomplete,
  InputField,
  UploadFile,
} from "components/core";
import { useFormik } from "formik";
import { useFetch, useSWRFetch } from "hooks";
import { useRouter } from "next/router";
import { useState, useMemo, useDeferredValue } from "react";
import { BookCategoryType } from "types/bookcategory";
import { InventoryProductType } from "types/inventoryproduct";
import { autoAddFormdata, notify } from "utils";
import * as Yup from "yup";
import CreateStockCategory from "./CreateStockCategory";
import { Cancel, FileUpload, ResetTv, RotateLeft } from "@mui/icons-material";
import { Tooltip } from "@mui/material";
type stockType = {
  data: InventoryProductType;
};
type dataType = {
  data: BookCategoryType[];
};
const CreateStock = () => {
  const [searchTitle, setSearchTitle] = useState("");
  const searchText = useDeferredValue(searchTitle);
  const { edit, editId } = useRouter().query;
  const { data: categories } = useSWRFetch<dataType>(
    `inventory/category?perPage=20&pageNo=1` +
      (searchText ? `&searchTitle=${searchText}` : "")
  );
  const { data, mutate } = useSWRFetch<stockType>(`inventory/${editId}`);
  const { mutate: inventoryAdd } = useFetch();
  const router = useRouter();
  const InventorySchema = useMemo(() => {
    return [
      {
        key: "0",
        name: "image",
        type: "file",
        label: "Product Image",
        initialValue: "",
        validationSchema: Yup.string(),
        className: "col-span-2  ",
        // disabled: editId ? true : false,
      },
      {
        key: "1",
        name: "productName",
        type: "text",
        label: "Product Name *",
        initialValue: "",
        validationSchema: Yup.string().required("Product name is required."),
        className: "col-span-2 lg:col-span-1 ",
        // disabled: editId ? true : false,
      },
      {
        key: "2",
        name: "quantity",
        type: "number",
        label: "Product Quantity *",
        initialValue: "",
        // validationSchema: Yup.string().required(
        //   "Product quantity is required."
        // ),
        validationSchema: Yup.string()
          .matches(
            /^\d+$/,
            "quantity must contain only digits and non negative"
          )
          .min(0, "quantity")
          .required("Product quantity is required"),
        className: "col-span-2 lg:col-span-1 ",
      },
      {
        key: "3",
        name: "price",
        type: "number",
        label: "Product Price ",
        initialValue: "",
        validationSchema: Yup.string()
          .matches(
            /^\d+$/,
            "Product Price must contain only digits and non negative"
          )
          .min(0, "Product Price must have at least 10 digits"),
        className: "col-span-2 lg:col-span-1 ",
        // disabled: editId ? true : false,
      },
      {
        key: "5",
        name: "category",
        type: "autocomplete",
        label: "Product Category *",
        initialValue: "",
        validationSchema: Yup.string().required("Product category is required"),
        className: "col-span-2 lg:col-span-1 ",
        options: categories?.data
          ? categories?.data?.map((data: BookCategoryType) => ({
              label: `${data?.title}`,
              value: `${data?._id}`,
              key: `${data?._id}`,
            }))
          : [
              {
                label: "No data available",
                value: ``,
                key: ``,
              },
            ],
        // disabled: editId ? true : false,
      },
      {
        key: "3x",
        name: "measurementUnit",
        type: "text",
        label: "Measurement Unit *",
        initialValue: "",
        validationSchema: Yup.string().required("Measurement Unit is required"),
        className: "col-span-2 lg:col-span-1 ",
      },
      // {
      //   key: "3x",
      //   name: "cost",
      //   type: "number",
      //   label: "Product Cost ",
      //   initialValue: "",
      //   validationSchema: Yup.string().optional(),
      //   className: "col-span-2 lg:col-span-1 ",
      // },
      {
        key: "3xx",
        name: "brand",
        type: "text",
        label: "Brand ",
        initialValue: "",
        validationSchema: Yup.string().optional(),
        className: "col-span-2 lg:col-span-1 ",
        // disabled: editId ? true : false,
      },
      {
        key: "3xxx",
        name: "supplier",
        type: "text",
        label: "Supplier ",
        initialValue: "",
        validationSchema: Yup.string().optional(),
        className: "col-span-2 lg:col-span-1 ",
        // disabled: editId ? true : false,
      },
      {
        key: "3xxx",
        name: "challanNumber",
        type: "text",
        label: "Challan Number",
        initialValue: "",
        validationSchema: Yup.string().optional(),
        className: "col-span-2 lg:col-span-1 ",
        // disabled: editId ? true : false,
        hidden: editId ? true : false,
      },
      {
        key: "0A",
        name: "billUpload",
        type: "file",
        label: "Upload Challan Bill",
        initialValue: "",
        validationSchema: Yup.string(),
        className: "col-span-2  ",
        // disabled: editId ? true : false,
        hidden: editId ? true : false,
      },
      {
        key: "4",
        name: "description",
        type: "text",
        label: "Product Description",
        initialValue: "",
        validationSchema: Yup.string(),
        multiline: true,
        rows: 5,
        className: "col-span-2  ",
        // disabled: editId ? true : false,
      },
      {
        key: "3xxxsd",
        name: "remark",
        type: "text",
        label: "Remark ",
        initialValue: "",
        validationSchema: Yup.string().optional(),
        className: "col-span-1 ",
        // disabled: editId ? true : false,
      },
    ];
  }, [categories?.data]);

  const initialValues = InventorySchema?.reduce((accumulator, currentValue) => {
    accumulator[currentValue?.name] = currentValue.initialValue;
    return accumulator;
  }, {} as any);

  const validationSchema = InventorySchema?.reduce(
    (accumulator, currentValue) => {
      accumulator[currentValue?.name] = currentValue.validationSchema;
      return accumulator;
    },
    {} as any
  );

  const [openCategory, setOpenCategory] = useState(false);

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      ...initialValues,
      ...data?.data,
      expiryDate: data?.data?.expiryDate?.split("T")[0],
      category: data?.data?.category?._id,
      image: data?.data?.imageUrl,
      productName: data?.data?.title,
    },
    validationSchema: Yup.object(validationSchema),
    onSubmit: async (values) => {
      try {
        const response = await inventoryAdd({
          path: editId ? `inventory/update/${editId}` : `inventory/create`,
          method: editId ? "PUT" : "POST",
          body: autoAddFormdata({ ...values, invoice: values?.billUpload }),
          isFormData: true,
        });
        if (response?.data?.error) {
          notify.error(response?.data?.error);
          return;
        }

        notify.success(response?.data?.message);

        formik?.resetForm();
        formik.setFieldValue("productName", "");
        mutate();
      } catch (err) {
        console.log(err);
      }
    },
  });

  const handleMyObject = (
    arg: any,
    key: string,
    label: string,
    value: string
  ) => {
    const data = arg;

    return {
      label: data?.name ? `${data?.name}` : `${data?.title}`,
      value: `${data?._id}`,
      key: `${data?._id}`,
    };
  };
  return (
    <div className="w-full max-w-7xl mx-auto bg-white md:shadow-xl rounded-lg ">
      <CreateStockCategory
        open={openCategory}
        closeFn={() => setOpenCategory(false)}
      />
      <h3 className="font-semibold tracking-wide p-4 text-2xl border-b text-center text-theme">
        {editId ? `Edit` : `Create`} Stock
      </h3>

      <form
        className="grid grid-cols-2 gap-4 p-4"
        onSubmit={formik?.handleSubmit}
      >
        {InventorySchema?.filter((item) => !item?.hidden)?.map((item) => {
          if (item?.name === "image" && item?.type === "file") {
            return (
              <div
                className="col-span-2 flex items-center gap-4 flex-col justify-center"
                key={item?.key}
              >
                <h3 className="font-medium  tracking-wide text-base">
                  {item?.label}
                </h3>
                <UploadFile
                  outerClassName="max-w-xs"
                  imageOnly={true}
                  // disabled={item?.disabled}
                  url={
                    formik.values.image &&
                    (typeof formik.values.image === "string"
                      ? formik.values.image
                      : URL.createObjectURL(formik?.values?.image))
                  }
                  onChange={(e: any) =>
                    formik?.setFieldValue("image", e.target.files[0])
                  }
                />
              </div>
            );
          } else if (item?.name === "billUpload" && item?.type === "file") {
            return (
              <div className="col-span-2" key={item?.key}>
                <div className="flex flex-col gap-4">
                  <h3 className="font-medium tracking-wide text-base">
                    {item?.label}
                  </h3>

                  {formik.values?.billUpload ? (
                    <div className="w-full bg-theme text-center rounded px-5 pb-12 pt-2">
                      <div className="flex justify-end ">
                        <Tooltip title="Click to remove">
                          <Cancel
                            className="text-red-500"
                            onClick={() =>
                              formik.setFieldValue("billUpload", null)
                            }
                          />
                        </Tooltip>
                      </div>
                      <FileUpload className="text-white text-5xl " />
                      <h3 className="text-white  text-xl">File Uploaded</h3>
                    </div>
                  ) : (
                    <>
                      <UploadFile
                        //   uploadText={
                        //     formik.values.type && formik.values.type === "PDF"
                        //       ? "PDF Uploaded"
                        //       : "Click to upload"
                        //   }
                        url={
                          formik.values.billUpload &&
                          (typeof formik.values.billUpload === "string"
                            ? formik.values.billUpload
                            : URL.createObjectURL(formik?.values?.billUpload))
                        }
                        onChange={(e: any) =>
                          formik?.setFieldValue("billUpload", e.target.files[0])
                        }
                      />
                      <p className="mt-1 text-red-600">
                        {formik.touched.billUpload &&
                        typeof formik.errors.billUpload === "string"
                          ? formik.errors.billUpload
                          : ""}
                      </p>
                    </>
                  )}
                </div>
              </div>
            );
          } else if (item?.type === "autocomplete") {
            return (
              <div className={item?.className} key={item?.key}>
                <CustomAutocomplete
                  // disabled={item?.disabled}
                  isOptionEqualToValue={(option, value) =>
                    option?.value === value
                  }
                  error={Boolean(
                    formik?.touched[item?.name] && formik?.errors[item?.name]
                  )}
                  helperText={
                    formik?.touched[item?.name] &&
                    (formik?.errors[item?.name] as any)
                  }
                  onSearchTextChange={(e) => setSearchTitle(e?.target?.value)}
                  value={
                    categories?.data
                      ?.filter((i) => i?._id === formik?.values[item?.name])
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
                  label={item?.label}
                  onChange={(e, value) => {
                    formik?.setFieldValue(item?.name, value?.value);
                  }}
                  options={item?.options}
                  noOptionText={
                    <div className="flex flex-col gap-4">
                      <small className="text-gray-500 tracking-wide">
                        No Options
                      </small>

                      <button
                        className="btn-primary !w-fit !text-xs"
                        onClick={() =>
                          item?.name === "category"
                            ? router?.push(
                                `/panel/admin/config/set-inventory-category`
                              )
                            : ""
                        }
                      >
                        Add New Category
                      </button>
                    </div>
                  }
                />
              </div>
            );
          } else {
            return (
              <div className={item?.className} key={item?.key}>
                <InputField
                  // disabled={item?.disabled}
                  type={item?.type as any}
                  name={item?.name}
                  onChange={formik?.handleChange}
                  onBlur={formik?.handleBlur}
                  error={Boolean(
                    formik?.touched[item?.name] && formik?.errors[item?.name]
                  )}
                  helperText={
                    formik?.touched[item?.name] &&
                    (formik?.errors[item?.name] as any)
                  }
                  inputProps={{
                    min: new Date().toISOString().split("T")[0],
                  }}
                  value={formik.values[item?.name]}
                  label={item?.label}
                  multiline={item?.multiline}
                  rows={item?.rows}
                />
              </div>
            );
          }
        })}
        <div className="col-span-2 flex justify-center gap-4 mt-4">
          <Button type="submit" loading={formik?.isSubmitting}>
            {editId ? `Edit` : `Create`} Stock
          </Button>
          <Button
            type="reset"
            // onClick={() => formik.resetForm()}
            onClick={() => {
              formik.resetForm();
              // setDocuments([]);
            }}
            className={"bg-red-400 shadow-none"}
            startIcon={<RotateLeft />}
          >
            Reset
          </Button>
        </div>
      </form>
    </div>
  );
};

export default CreateStock;
