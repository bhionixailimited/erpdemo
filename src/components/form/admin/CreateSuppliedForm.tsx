import { Close } from "@mui/icons-material";
import { IconButton } from "@mui/material";
import {
  Button,
  CustomAutocomplete,
  CustomDialog,
  InputField,
} from "components/core";
import { useFormik } from "formik";
import { useAuth, useFetch, useSWRFetch } from "hooks";
import { useDeferredValue, useMemo, useState } from "react";
import { KeyedMutator } from "swr";
import DepartmentType from "types/department";
import { InstituteType } from "types/institute";
import { InventoryProductType } from "types/inventoryproduct";
import UserType from "types/user";
import { notify } from "utils";
import * as Yup from "yup";
type dataType = {
  data: InventoryProductType[];
};
type departmentType = {
  data: DepartmentType[];
};

type OtherUserDataType = {
  data: UserType[];
};
type instituteData = {
  data: InstituteType[];
};

const CreateSupplied = ({
  mutate,
  userType,
  isSelf,
  exportType,
}: {
  mutate: KeyedMutator<any>;
  userType?: string;
  isSelf?: boolean;
  exportType?: "REQUEST" | "ALL";
}) => {
  const { user } = useAuth();
  const [searchTitle, setSearchTitle] = useState("");
  const searchText = useDeferredValue(searchTitle);
  const [selectedInstitute, setSelectedInstitute] = useState("");
  const { mutate: supplied } = useFetch();
  const { data: department } = useSWRFetch<dataType>(
    `department?perPage=30&pageNo=1` +
      (searchText ? `&searchTitle=${searchText}` : "") +
      (exportType !== "REQUEST" && selectedInstitute
        ? `&instituteId=${selectedInstitute}`
        : "")
  );
  const { data, isValidating, error } = useSWRFetch<dataType>(
    `inventory?perPage=20&pageNo=1` +
      (searchText ? `&searchTitle=${searchText}` : "") +
      (isSelf && selectedInstitute ? `&instituteId=${selectedInstitute}` : "")
  );
  //role=STUDENT&   ----if needed for role is student
  const { data: otherUsers } = useSWRFetch<OtherUserDataType>(
    `user?role=STAFF&role=TEACHER&perPage=10&pageNo=1${
      searchTitle ? `&searchTitle=${searchTitle}` : ""
    }` +
      (exportType !== "REQUEST" && selectedInstitute
        ? `&instituteId=${selectedInstitute}`
        : "")
  );

  const { data: instituteData } = useSWRFetch<instituteData>(`institute`);

  const [products, setProducts] = useState([
    {
      product: "",
      [userType === "STAFF" ? "requestQuantity" : "issuedQuantity"]: "",
    },
  ]);

  const addProduct = () => {
    setProducts([
      ...products,
      {
        product: "",
        [userType === "STAFF" ? "requestQuantity" : "issuedQuantity"]: "",
      },
    ]);
  };

  const removeProduct = (index: number) => {
    const updatedProducts = [...products];
    updatedProducts.splice(index, 1);
    setProducts(updatedProducts);
  };

  const createSupplySchema = useMemo(() => {
    return [
      {
        key: "5",
        name: "college",
        label: "Choose Institute",
        initialValue: "",
        type: "autocomplete",
        validationSchema:
          exportType === "REQUEST"
            ? Yup.string().required("Institute type is required*")
            : Yup.string().optional().nullable(),
        // validationSchema:
        //   exportType === "REQUEST"
        //     ? Yup.string().required("Institute type is required*")
        //     : Yup.string().optional().nullable(),
        options: instituteData?.data?.map((data) => ({
          label: `${data?.instituteName}`,
          value: `${data?._id}`,
          key: `${data?.instituteName}`,
        })),
        className: "w-full col-span-2 lg:col-span-1 rounded-md",
        // hidden: exportType !== "REQUEST",
      },

      // {
      //   key: "1",
      //   name: "product",
      //   label: "Choose Product",
      //   initialValue: "",
      //   validationSchema: Yup.string().required("Product is required*"),
      //   type: "autocomplete",
      //   options: data?.data?.map((data: InventoryProductType) => ({
      //     label: `${data?.title}`,
      //     value: `${data?._id}`,
      //     key: `${data?._id}`,
      //   })),
      //   className: "w-full col-span-2 lg:col-span-1 rounded-md ",
      // },
      {
        key: "2",
        name: "consumer",
        label: "Staff",
        initialValue: "",
        validationSchema: Yup.string().optional(),
        type: "autocomplete",
        options: otherUsers?.data?.map((data: UserType) => ({
          label: `${data?.displayName}`,
          value: `${data?._id}`,
          key: `${data?._id}`,
        })),
        className: "w-full col-span-2 lg:col-span-1 rounded-md ",
      },
      // {
      //   key: "4",
      //   type: "number",
      //   name: userType === "STAFF" ? "requestQuantity" : "issuedQuantity",
      //   label: userType === "STAFF" ? "Request Quantity" : "Issued Quantity",
      //   initialValue: "",
      //   validationSchema: Yup.string().required("Quantity is required"),
      //   className: "w-full col-span-2 lg:col-span-1 rounded-md",
      // },
      {
        key: "5",
        name: "department",
        label: "Purchased Department",
        initialValue: "",
        type: "autocomplete",
        validationSchema: Yup.string().optional(),
        options: department?.data?.map((data) => ({
          label: `${data?.title}`,
          value: `${data?._id}`,
          key: `${data?.title}`,
        })),
        className: "w-full col-span-2 lg:col-span-1 rounded-md",
      },
      {
        key: "5",
        name: "challanNumber",
        label: "Challan Number",
        initialValue: "",
        type: "text",
        validationSchema: Yup.string().optional(),
        className: "w-full col-span-2 lg:col-span-1 rounded-md",
      },
      {
        key: "3xxxsd",
        name: "remark",
        type: "text",
        label: "Remark ",
        initialValue: "",
        validationSchema: Yup.string().optional(),
        className: "w-full  col-span-2 rounded-md ",
        // disabled: editId ? true : false,
      },
    ];
  }, [
    data?.data,
    department?.data,
    otherUsers?.data,
    instituteData?.data,
    exportType,
  ]);

  const initialValues = createSupplySchema?.reduce(
    (accumulator, currentValue) => {
      accumulator[currentValue?.name] = currentValue.initialValue;
      return accumulator;
    },
    {} as any
  );

  const validationSchema = createSupplySchema?.reduce(
    (accumulator, currentValue) => {
      accumulator[currentValue?.name] = currentValue.validationSchema;
      return accumulator;
    },
    {} as any
  );

  const [openDialog, setOpenDialog] = useState(false);

  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: Yup.object(validationSchema),
    onSubmit: async (values) => {
      const requestBody = {
        ...values,
        college: user?.instituteId?._id,
        orderStatus: userType === "STAFF" ? `ORDER_REQUEST` : `DELIVERED`,
      };

      // Remove "department" if it's empty or undefined
      if (!requestBody.department) {
        delete requestBody.department;
      }
      if (!requestBody.consumer) {
        delete requestBody.consumer;
      }
      if (!requestBody.requestQuantity) {
        delete requestBody.requestQuantity;
      }
      if (!requestBody.issuedQuantity) {
        delete requestBody.issuedQuantity;
      }
      if (!requestBody.challanNumber) {
        delete requestBody.challanNumber;
      }
      if (!requestBody.remark) {
        delete requestBody.remark;
      }
      try {
        const response = await supplied({
          path: `inventory/supply/create`,
          method: "POST",
          body: JSON.stringify({
            ...requestBody,
            product: products?.filter((item) => item?.product),
            orderStatus: userType === "STAFF" ? `ORDER_REQUEST` : `DELIVERED`,
            college: isSelf
              ? user?.institute || user?.instituteId?._id
              : selectedInstitute,
          }),
        });

        if (response?.data?.error) {
          notify.error(response?.data?.error);
          return;
        }
        setOpenDialog(false);
        mutate();
        notify.success(response?.data?.message);
        formik?.resetForm();
        setProducts([
          {
            product: "",
            [userType === "STAFF" ? "requestQuantity" : "issuedQuantity"]: "",
          },
        ]);
        setSelectedInstitute("");
      } catch (err) {
        console.log(err);
      }
    },
  });

  return (
    <div>
      <Button onClick={() => setOpenDialog(true)}>Supply Request</Button>
      <CustomDialog
        open={openDialog}
        onClose={() => setOpenDialog(false)}
        maxWidth="md"
      >
        <div className="w-full">
          <div className="relative w-full">
            <h3 className="font-semibold tracking-wide text-2xl text-center text-theme border-b p-4">
              Request Supply
            </h3>
            <span
              className="absolute right-0 top-0 p-4 "
              onClick={() => setOpenDialog(false)}
            >
              <IconButton>
                <Close />
              </IconButton>
            </span>
          </div>
          <form
            onSubmit={formik?.handleSubmit}
            className="flex flex-col gap-4 p-4"
          >
            <div className="grid grid-cols-2 gap-4  h-fit w-full  ">
              {createSupplySchema
                // ?.filter((item) => !item?.hidden)
                ?.map((item) => {
                  if (item?.type === "autocomplete") {
                    return (
                      <div className={item?.className} key={item?.key}>
                        <CustomAutocomplete
                          isOptionEqualToValue={(option, value) =>
                            option?.value === value
                          }
                          onSearchTextChange={(e) =>
                            setSearchTitle(e?.target?.value)
                          }
                          label={item?.label}
                          onBlur={() => setSearchTitle("")}
                          onChange={(e, value) => {
                            formik?.setFieldValue(item?.name, value?.value);
                            if (item?.name === "college") {
                              setSelectedInstitute(value?.value);
                            }
                            setSearchTitle("");
                          }}
                          options={item?.options}
                          // value={
                          //   formik?.values[item?.name] ? formik?.values[item?.name] : ""
                          // }
                          noOptionText={
                            <div className="flex flex-col gap-4">
                              <small className="text-gray-500 tracking-wide">
                                No Options
                              </small>
                            </div>
                          }
                          error={Boolean(
                            formik?.touched[item?.name] &&
                              formik?.errors[item?.name]
                          )}
                          helperText={
                            formik?.touched[item?.name] &&
                            (formik?.errors[item?.name] as any)
                          }
                        />
                      </div>
                    );
                  } else if (item?.name === "challanNumber") {
                    if (exportType === "REQUEST") {
                      return null;
                    } else {
                      return (
                        <div className={item?.className} key={item?.key}>
                          <InputField
                            type={item?.type as any}
                            name={item?.name}
                            onChange={formik?.handleChange}
                            onBlur={formik?.handleBlur}
                            error={Boolean(
                              formik?.touched[item?.name] &&
                                formik?.errors[item?.name]
                            )}
                            label={item?.label}
                            helperText={
                              formik?.touched[item?.name] &&
                              (formik?.errors[item?.name] as any)
                            }
                          />
                        </div>
                      );
                    }
                  } else if (item?.name === "remark") {
                    if (exportType === "REQUEST") {
                      return null;
                    } else {
                      return (
                        <div className={item?.className} key={item?.key}>
                          <InputField
                            type={item?.type as any}
                            name={item?.name}
                            onChange={formik?.handleChange}
                            onBlur={formik?.handleBlur}
                            error={Boolean(
                              formik?.touched[item?.name] &&
                                formik?.errors[item?.name]
                            )}
                            label={item?.label}
                            helperText={
                              formik?.touched[item?.name] &&
                              (formik?.errors[item?.name] as any)
                            }
                          />
                        </div>
                      );
                    }
                  } else {
                    return (
                      <div className={item?.className} key={item?.key}>
                        <InputField
                          type={item?.type as any}
                          name={item?.name}
                          onChange={formik?.handleChange}
                          onBlur={formik?.handleBlur}
                          error={Boolean(
                            formik?.touched[item?.name] &&
                              formik?.errors[item?.name]
                          )}
                          label={item?.label}
                          helperText={
                            formik?.touched[item?.name] &&
                            (formik?.errors[item?.name] as any)
                          }
                        />
                      </div>
                    );
                  }
                })}
            </div>
            <div className="grid grid-cols-1 gap-4  h-fit w-full">
              {products?.map((product, index) => (
                <div
                  key={index}
                  className="w-full col-span-2 lg:col-span-1 rounded-md"
                >
                  <div className="flex justify-between j items-center gap-2">
                    <CustomAutocomplete
                      onSearchTextChange={(e) =>
                        setSearchTitle(e?.target?.value)
                      }
                      label="Product*"
                      options={data?.data?.map(
                        (data: InventoryProductType) => ({
                          label: `${data?.title}`,
                          value: `${data?._id}`,
                          key: `${data?._id}`,
                        })
                      )}
                      // value={
                      //   formik?.values[item?.name] ? formik?.values[item?.name] : ""
                      // }
                      noOptionText={
                        <div className="flex flex-col gap-4">
                          <small className="text-gray-500 tracking-wide">
                            No Options
                          </small>
                        </div>
                      }
                      // ... existing autocomplete props ...
                      onChange={(e, value) => {
                        // Clone the current products array
                        const updatedProducts = [...products];
                        // Update the product at the specified index
                        updatedProducts[index].product = value?.value;
                        // Update the state
                        setProducts(updatedProducts);
                      }}
                    />
                    <InputField
                      type="number"
                      name={`products[${index}].[${
                        userType === "STAFF"
                          ? "requestQuantity"
                          : "issuedQuantity"
                      }]`}
                      onChange={(e) => {
                        const inputValue = e.target.value;
                        if (
                          inputValue === "" ||
                          (inputValue > 0 && !isNaN(inputValue))
                        ) {
                          // Only allow positive numbers or an empty string (clear the field)
                          e.target.value = inputValue;
                        } else {
                          // Prevent input of negative numbers and non-numeric characters
                          e.target.value = ""; // Clear the field
                        }
                        // Clone the current products array
                        const updatedProducts = [...products];
                        // Update the quantity at the specified index based on userType
                        updatedProducts[index][
                          userType === "STAFF"
                            ? "requestQuantity"
                            : "issuedQuantity"
                        ] = e.target.value;
                        // Update the state
                        setProducts(updatedProducts);
                      }}
                      label={
                        userType === "STAFF"
                          ? "Request Quantity*"
                          : "Issued Quantity*"
                      }

                      // ... other input field props ...
                    />

                    <Close
                      onClick={() => removeProduct(index)}
                      className="mt-5 cursor-pointer"
                    />
                  </div>
                </div>
              ))}
            </div>
            <div className="col-span-2 flex justify-center mt-4">
              <Button type="button" onClick={addProduct}>
                Choose Product
              </Button>
            </div>
            <div className="col-span-2 flex justify-center mt-4">
              <Button
                type="submit"
                loading={formik?.isSubmitting}
                disabled={
                  products?.some(
                    (item) =>
                      !item[
                        userType === "STAFF"
                          ? "requestQuantity"
                          : "issuedQuantity"
                      ]
                  ) ||
                  products?.some((item) => !item?.product) ||
                  products?.some(
                    (item) =>
                      Number(
                        item[
                          userType === "STAFF"
                            ? "requestQuantity"
                            : "issuedQuantity"
                        ]
                      ) === 0
                  )
                }
              >
                Request Supply
              </Button>
            </div>
          </form>
        </div>
      </CustomDialog>
    </div>
  );
};

export default CreateSupplied;
