import { Add, Done } from "@mui/icons-material";
import { IconButton } from "@mui/material";
import { Button, CustomDialog, InputField, UploadFile } from "components/core";
import dayjs from "dayjs";
import { useFormik } from "formik";
import { useFetch } from "hooks";
import { useState } from "react";
import Swal from "sweetalert2";
import { KeyedMutator } from "swr";
import { handleValidFormData, notify } from "utils";
import * as Yup from "yup";

const timetableSchema = [
  {
    key: "1",
    name: "issuedQuantity",
    label: "Issued Quantity",
    initialValue: "",
    validationSchema: Yup.string().required("Issued quantity is required."),
    type: "number",
  },
  {
    key: "5",
    name: "challanNumber",
    label: "Challan Number",
    initialValue: "",
    type: "text",
    validationSchema: Yup.string().optional(),
  },
  {
    key: "3xxxsd",
    name: "remark",
    type: "text",
    label: "Remark ",
    initialValue: "",
    validationSchema: Yup.string().optional(),

    // disabled: editId ? true : false,
  },
];

const initialValues = timetableSchema?.reduce(
  (accumulator: any, currentValue) => {
    accumulator[currentValue?.name] = currentValue.initialValue;
    return accumulator;
  },
  {}
);
const validationSchema = timetableSchema?.reduce(
  (accumulator: any, currentValue) => {
    accumulator[currentValue?.name] = currentValue.validationSchema;
    return accumulator;
  },
  {}
);

const IssuedQuantityDialog = ({
  mutate,
  _id,
  quantity,
  orderStatus,
}: {
  mutate: KeyedMutator<any>;
  _id: string;
  quantity: number;
  orderStatus: string;
}) => {
  const { mutate: department } = useFetch();
  const [openDialog, setOpenDialog] = useState(false);
  const [value, setValue] = useState("");
  //   const handleDelivered = (id: string, quantity: number) => {
  //     try {
  //       Swal.fire({
  //         title: "Are you sure?",
  //         text: "You will not be able to recover it again!",
  //         icon: "warning",
  //         showCancelButton: true,
  //         confirmButtonColor: "#3085d6",
  //         cancelButtonColor: "#d33",
  //         confirmButtonText: "Yes, Change!",
  //       }).then(async (result) => {
  //         if (result.isConfirmed)
  //           new Promise(async (resolve, reject) => {
  //             const response = await department({
  //               path: `inventory/supply/${id}`,
  //               method: "PUT",
  //               body: JSON.stringify({
  //                 orderStatus: "DELIVERED",
  //                 quantity: quantity,
  //               }),
  //             });
  //             if (response?.data?.error) {
  //               notify.error(response?.data?.error);
  //               reject(response?.data?.error);
  //             }
  //             mutate && mutate();
  //             notify.success(response?.data?.message);
  //             resolve(response?.data?.message);
  //           });
  //       });
  //     } catch (err) {
  //       console.log(err);
  //     }
  //   };
  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: Yup.object(validationSchema),
    onSubmit: async (values) => {
      try {
        Swal.fire({
          title: "Are you sure?",
          text: "You will not be able to recover it again!",
          icon: "warning",
          showCancelButton: true,
          confirmButtonColor: "#3085d6",
          cancelButtonColor: "#d33",
          confirmButtonText: "Yes, Change!",
        }).then(async (result) => {
          if (result.isConfirmed)
            new Promise(async (resolve, reject) => {
              const response = await department({
                path: `inventory/supply/${_id}`,
                method: "PUT",
                body: JSON.stringify({
                  orderStatus: "DELIVERED",
                  issuedQuantity: values?.issuedQuantity,
                  challanNumber: values?.challanNumber,
                  remark: values?.remark,
                }),
              });
              if (response?.data?.error) {
                notify.error(response?.data?.error);
                reject(response?.data?.error);
              }
              mutate && mutate();
              notify.success(response?.data?.message);
              resolve(response?.data?.message);
            });
        });
      } catch (err) {
        console.log(err);
      }
    },
  });

  return (
    <div className="w-fit">
      <CustomDialog
        open={openDialog}
        onClose={() => {
          setOpenDialog(false);
          setValue("");
        }}
        maxWidth="sm"
      >
        <div className="w-full flex flex-col  ">
          {/* <h3 className="font-semibold tracking-wide p-4  text-theme border-b text-sm text-center md:text-2xl">
            Create Department
          </h3> */}
          {/* <div
            className="m-auto w-60 mt-2 justify-center "
            // style={{
            //   textAlign: "center",
            //   justifyContent: "center",
            //   display: "flex",
            //   marginTop: "2vh",
            //   marginBottom: "1vh",
            // }}
          >
            <UploadFile
              uploadText="Upload Logo"
              //   required={true}
              url={
                value &&
                (typeof value === "string" ? value : URL.createObjectURL(value))
              }
              onChange={(e: any) => setValue(e.target.files[0])}
            />
          </div> */}
          <form
            className="flex flex-col gap-4 p-4"
            onSubmit={formik?.handleSubmit}
          >
            {timetableSchema?.map((item) => (
              <InputField
                key={item?.key}
                name={item?.name}
                onChange={formik?.handleChange}
                onBlur={formik?.handleBlur}
                type={item?.type as any}
                value={formik?.values[item?.name]}
                label={item?.label}
                error={Boolean(
                  formik?.touched[item?.name] && formik?.errors[item?.name]
                )}
                helperText={
                  formik?.touched[item?.name] &&
                  (formik?.errors[item?.name] as any)
                }
              />
            ))}
            <div className="flex items-center justify-center">
              <Button className="hover:ring-theme">Delivered</Button>
            </div>
          </form>
        </div>
      </CustomDialog>

      <Button
        onClick={() => setOpenDialog(true)}
        disabled={orderStatus === "DELIVERED"}
        startIcon={<Done />}
      >
        Delivered
      </Button>
    </div>
  );
};

export default IssuedQuantityDialog;
