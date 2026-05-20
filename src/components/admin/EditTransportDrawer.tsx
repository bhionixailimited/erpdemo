import {
  Add,
  Done,
  Edit,
  ManageAccounts,
  Money,
  RotateLeft,
} from "@mui/icons-material";
import {
  FormControl,
  FormControlLabel,
  Radio,
  RadioGroup,
  FormLabel,
  Avatar,
  Tooltip,
} from "@mui/material";
import {
  AdminAutocomplete,
  Button,
  CustomDrawer,
  ImageField,
  InputField,
  TextInput,
  UploadFile,
} from "components/core";

import STATES from "configs/state";
import { useFormik } from "formik";
import { useFetch, useSWRFetch } from "hooks";
import { useRouter } from "next/router";
import { useState, useMemo, useDeferredValue, useEffect } from "react";
import UserType from "types/user";
import { getHoursAndMinutes, notify } from "utils";
import * as Yup from "yup";

type dataType = {
  data: UserType[];
};
const EditTransportDrawer = ({ open, onClose, mutate }: any) => {
  const [searchTitle, setSearchTitle] = useState("");
  const [teacherInCharge, setTeacherIncharge] = useState({
    key: "",
    label: "",
    value: "",
  });
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
  // console.log("teachers", teachers);
  const router = useRouter();
  const [openDrawer, setOpenDrawer] = useState(false);
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
        key: "1sw",
        name: "startTime",
        label: "From Time *",
        initialValue: "",
        validationSchema: Yup.string().required("From time is required."),
        type: "time",
      },

      {
        key: "2",
        name: "vehicle",
        label: "Vehicle Number *",
        initialValue: "",
        validationSchema: Yup.string().required("Vehicle number is required."),
        type: "autocomplete",
        options: vehicles?.data?.map((data: any) => ({
          label: `${data?.vehicleName}  ( ${data?.vehicleNumber} )`,
          value: `${data?._id}`,
          key: `${data?.vehicleName}`,
        })),
      },
      {
        key: "2",
        name: "driver",
        label: "Driver Name *",
        initialValue: "",
        validationSchema: Yup.string().required("Driver name is required."),
        type: "autocomplete",
        options: [
          ...[
            drivers?.data &&
              drivers?.data?.map((data: any) => ({
                label: `${data?.name} ( ${data?.phoneNumber} )`,
                value: `${data?._id}`,
                key: `${data?.name}`,
              })),
          ].flat(),
        ],
      },
      {
        key: "2fd",
        name: "inCharge",
        label: "Teacher In Charge",
        initialValue: "",
        validationSchema: Yup.string().optional(),
        type: "autocomplete",
        options: teachers?.data?.map((data: any) => ({
          label: `${data?.displayName}   ( ${data?.email} )`,
          value: `${data?._id}`,
          key: `${data?.email}`,
        })),
      },
      {
        key: "15",
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

  useEffect(() => {
    if (!open?.inCharge?._id) return;

    let data = teachers?.data?.find(
      (item) => item?._id === open?.inCharge?._id
    );

    setTeacherIncharge({
      label: `${data?.displayName}   ( ${data?.email} )`,
      value: `${data?._id}`,
      key: `${data?.email}`,
    });
  }, [open?.inCharge?._id]);

  const formik = useFormik({
    initialValues: open?._id
      ? {
          startFrom: open?.startFrom,
          startTime: getHoursAndMinutes(new Date(open?.startTime)),
          vehicle: open?.vehicle?._id,
          driver: open?.driver?._id,
          inCharge: open?.inCharge?._id,
          price: open?.price,
        }
      : initialValues,
    validationSchema: Yup.object(validationSchema),
    onSubmit: async (values) => {
      // console.log("-->", values);
      // return;
      try {
        let body = {
          ...values,
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
          path: `transport/update/${open?._id}`,
          method: "PUT",
          body: JSON.stringify(body),
        });

        if (response?.data?.error) {
          notify.error(response?.data?.error);
          return;
        }
        setOpenDrawer(false);
        notify.success(response?.data?.message);
        mutate();
        formik?.resetForm();
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
      key: data?._id,
      label: `${data?.vehicleName}  ( ${data?.vehicleNumber} )`,
      value: data?._id,
    };
  };
  const handleDriverObject = (
    arg: any,
    key: string,
    label: string,
    value: string
  ) => {
    const data = arg;

    return {
      key: data?._id,
      label: `${data?.name} ( ${data?.phoneNumber} )`,
      value: data?._id,
    };
  };

  return (
    <div>
      <CustomDrawer
        open={openDrawer}
        onClose={() => setOpenDrawer(false)}
        anchor="right"
        maxWidth="md"
        width="40vw"
      >
        <div className="w-full">
          <div className="flex items-center justify-between p-4 border-b ">
            <div className="flex items-center text-slate-700 font-semibold text-xl gap-1 uppercase">
              <Edit className="h-8 w-8" />
              <h3 className="tracking-wide text-center">
                Edit Transport Details
              </h3>
            </div>
          </div>
          <form className="grid grid-cols-12 w-full px-4 gap-4 pt-6">
            {timetableSchema?.map((items) =>
              items?.type === "autocomplete" ? (
                <div
                  className="col-span-12 md:col-span-12 w-full"
                  key={items?.key}
                >
                  <AdminAutocomplete
                    size={"medium"}
                    label={items?.label}
                    isOptionEqualToValue={(option, value) =>
                      option?.value === value?.value
                    }
                    onSearchTextChange={(e) => setSearchTitle(e?.target?.value)}
                    value={
                      // items?.name === "vehicle" && {
                      //   label: `${
                      //     vehicles?.data?.find(
                      //       (value: any) =>
                      //         value?._id === formik.values?.vehicle
                      //     )?.vehicleName
                      //   }  ( ${
                      //     vehicles?.data?.find(
                      //       (value: any) =>
                      //         value?._id === formik.values?.vehicle
                      //     )?.vehicleNumber
                      //   } )`,
                      //   value: vehicles?.data?.find(
                      //     (value: any) => value?._id === formik.values?.vehicle
                      //   )?._id,
                      //   key: vehicles?.data?.find(
                      //     (value: any) => value?._id === formik.values?.vehicle
                      //   )?._id,
                      // }
                      (items?.name === "vehicle" &&
                        handleMyObject(
                          vehicles?.data?.find(
                            (value: any) =>
                              value?._id === formik?.values?.vehicle
                          ),
                          "key",
                          "label",
                          "value"
                        )) ||
                      (items?.name === "driver" &&
                        handleDriverObject(
                          drivers?.data?.find(
                            (value: any) =>
                              value?._id === formik?.values?.driver
                          ),
                          "key",
                          "label",
                          "value"
                        )) ||
                      (items?.name === "inCharge" && teacherInCharge) || {
                        key: " ",
                        label: " ",
                        value: " ",
                      }
                    }
                    onChange={(e, value) => {
                      formik?.setFieldValue(items?.name, value?.value);
                      items?.name === "inCharge" && setTeacherIncharge(value);
                    }}
                    noOptionText={
                      <div className="w-full flex flex-col gap-2">
                        <small className="tracking-wide">
                          No options found
                        </small>
                        <div
                          className="font-medium tracking-wide text-xs hover:bg-theme/90 transition-all duration-300 ease-in-out scale-100 hover:scale-95 text-white bg-theme px-2 py-1 rounded-md shadow-lg  w-fit cursor-pointer"
                          onClick={() =>
                            router.push("/panel/admin/transport/manage-vehicle")
                          }
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
          <div className="w-full flex pt-10 gap-2 px-4 py-5 justify-end">
            <Button
              loading={formik.isSubmitting}
              className="shadow-none"
              type="submit"
              onClick={() => formik.handleSubmit()}
              startIcon={<Done />}
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
      </CustomDrawer>
      <Tooltip title="Edit Transport Details">
        <Avatar
          variant="rounded"
          onClick={() => setOpenDrawer(true)}
          className="!mr-1 !cursor-pointer !bg-gray-700 !p-0"
        >
          <Edit className="!p-0" />
        </Avatar>
      </Tooltip>
    </div>
  );
};

export default EditTransportDrawer;
