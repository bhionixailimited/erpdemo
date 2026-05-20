import { Add, Done, RotateLeft } from "@mui/icons-material";
import {
  FormControl,
  FormControlLabel,
  FormLabel,
  IconButton,
  Radio,
  RadioGroup,
} from "@mui/material";
import {
  AdminAutocomplete,
  Button,
  CustomDialog,
  InputField,
  TextInput,
  UploadFile,
} from "components/core";
import dayjs from "dayjs";
import { useFormik } from "formik";
import { useFetch, useSWRFetch } from "hooks";
import { Router, useRouter } from "next/router";
import { useDeferredValue, useMemo, useState } from "react";
import UserType from "types/user";
import { notify } from "utils";
import * as Yup from "yup";
type dataType = {
  data: UserType[];
};
const AddTransportDialog = ({ mutate }: any) => {
  const [searchTitle, setSearchTitle] = useState("");
  const searchText = useDeferredValue(searchTitle);
  const { mutate: transport } = useFetch();
  const { data: vehicles } = useSWRFetch<any>(
    `vehicle?perPage=20&pageNo=1` +
      (searchText ? `&searchTitle=${searchText}` : "")
  );
  const { data: drivers } = useSWRFetch<any>(
    `driver?perPage=20&pageNo=1` +
      (searchText ? `&searchTitle=${searchText}` : "")
  );
  const { data: teachers } = useSWRFetch<dataType>(
    `user?role=TEACHER&perPage=20&pageNo=1` +
      (searchText ? `&searchTitle=${searchText}` : "")
  );
  const [openDialog, setOpenDialog] = useState(false);
  const [value, setValue] = useState("");
  const timetableSchema = useMemo(() => {
    return [
      {
        key: "1",
        name: "startFrom",
        label: "Route Name *",
        initialValue: "",
        validationSchema: Yup.string().required("Route name is required."),
        type: "text",
      },
      {
        key: "2",
        name: "startTime",
        label: "From Time *",
        initialValue: "",
        validationSchema: Yup.string().required("From time is required."),
        type: "time",
      },

      {
        key: "3",
        name: "vehicle",
        label: "Vehicle Number *",
        initialValue: "",
        validationSchema: Yup.string().required("Vehicle number is required."),
        type: "autocomplete",
        options: vehicles?.data?.map((data: any) => ({
          label: `${data?.vehicleName}     ( ${data?.vehicleNumber} )`,
          value: `${data?._id}`,
          key: `${data?.vehicleName}`,
        })),
      },
      {
        key: "4",
        name: "driver",
        label: "Driver Name *",
        initialValue: "",
        validationSchema: Yup.string().required("Driver name is required."),
        type: "autocomplete",
        options: drivers?.data?.map((data: any) => ({
          label: `${data?.name}     ( ${data?.phoneNumber} )`,
          value: `${data?._id}`,
          key: `${data?.name}`,
        })),
      },
      {
        key: "5",
        name: "inCharge",
        label: "Teacher In Charge ",
        initialValue: "",
        validationSchema: Yup.string().optional(),
        type: "autocomplete",
        options: teachers?.data?.map((data: any) => ({
          label: `${data?.displayName}     ( ${data?.email} )`,
          value: `${data?._id}`,
          key: `${data?.email}`,
        })),
      },

      {
        key: "6",
        name: "price",
        label: "Price",
        initialValue: "",
        validationSchema: Yup.string().optional(),
        type: "number",
      },
    ];
  }, [drivers?.data, teachers?.data, vehicles?.data]);

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
  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: Yup.object(validationSchema),
    onSubmit: async (values) => {
      try {
        let body = {
          startFrom: values?.startFrom,
          vehicle: values?.vehicle,
          driver: values?.driver,
          inCharge: values?.inCharge || undefined,
          price: values?.price,
          startTime: new Date(
            new Date().getFullYear(),
            new Date().getMonth(),
            new Date().getDate(),
            Number(`${values?.startTime}`.split(":")[0]),
            Number(`${values?.startTime}`.split(":")[1])
          ).toISOString(),
        };

        if (!values?.price) delete body.price;

        const response = await transport({
          path: `transport/create`,
          method: "POST",
          body: JSON.stringify(body),
        });

        if (response?.data?.error) {
          notify.error(response?.data?.error);
          return;
        }
        setOpenDialog(false);
        notify.success(response?.data?.message);
        mutate();
        formik?.resetForm();
      } catch (err) {
        console.log(err);
      }
    },
  });
  const router = useRouter();
  return (
    <div className="w-fit">
      <CustomDialog
        open={openDialog}
        onClose={() => setOpenDialog(false)}
        maxWidth="sm"
      >
        <div className="w-full p-4 ">
          <h3 className="font-semibold tracking-wide p-4  text-theme border-b text-2xl text-center">
            Add New Transport
          </h3>
          <form className="grid grid-cols-12 w-full px-4 gap-4 pt-10">
            {timetableSchema?.map((items) =>
              items?.type === "autocomplete" ? (
                <div
                  className="col-span-12 md:col-span-12 w-full"
                  key={items?.key}
                >
                  <AdminAutocomplete
                    size="small"
                    label={items?.label}
                    isOptionEqualToValue={(option, value) =>
                      option?.value === value?.value
                    }
                    onSearchTextChange={(e) => setSearchTitle(e?.target?.value)}
                    onChange={(e, value) =>
                      formik?.setFieldValue(items?.name, value?.value)
                    }
                    error={Boolean(
                      formik?.touched[items?.name] &&
                        formik?.errors[items?.name]
                    )}
                    helperText={
                      formik?.touched[items?.name] &&
                      (formik?.errors[items?.name] as any)
                    }
                    noOptionText={
                      <div className="w-full flex flex-col gap-2">
                        <small className="tracking-wide">
                          No options found
                        </small>
                        <div
                          className="font-medium tracking-wide text-xs hover:bg-theme/90 transition-all duration-300 ease-in-out scale-100 hover:scale-95 text-white bg-theme px-2 py-1 rounded-md shadow-lg  w-fit cursor-pointer"
                          onClick={() => {
                            if (items?.name === "vehicle") {
                              router.push(
                                "/panel/admin/transport/manage-vehicle"
                              );
                            } else if (items?.name === "driver") {
                              router.push(
                                "/panel/admin/transport/manage-drivers"
                              );
                            } else if (items?.name === "inCharge") {
                              router.push("/panel/admin/staff/register");
                            }
                          }}
                        >
                          Add New {items?.label.slice(0, -1)}
                        </div>
                      </div>
                    }
                    options={items?.options}
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
                  size="small"
                  fullWidth
                  error={Boolean(
                    formik?.touched[items?.name] && formik?.errors[items?.name]
                  )}
                  helperText={
                    formik?.touched[items?.name] &&
                    (formik?.errors[items?.name] as any)
                  }
                  styleArea={`${"col-span-12 md:col-span-12 !w-full"}`}
                  styleField="w-full col-span-12 overflow-hidden"
                />
              )
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
              onClick={() => formik.resetForm()}
              className={"bg-red-400 shadow-none"}
              startIcon={<RotateLeft />}
            >
              Reset
            </Button>
          </div>
        </div>
      </CustomDialog>

      <Button startIcon={<Add />} onClick={() => setOpenDialog(true)}>
        Add New Transport
      </Button>
    </div>
  );
};

export default AddTransportDialog;
