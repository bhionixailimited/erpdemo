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
import { useDeferredValue, useMemo, useState } from "react";
import UserType from "types/user";
import { notify } from "utils";
import * as Yup from "yup";
type dataType = {
  data: UserType[];
};
const EditLeaveManagementDrawer = ({ open, onClose, mutate }: any) => {
  const [searchTitle, setSearchTitle] = useState("");
  const searchText = useDeferredValue(searchTitle);
  const { mutate: leave } = useFetch();
  const { data: Employee, isValidating } = useSWRFetch<dataType>(
    `user?role=TEACHER&role=STAFF` +
      (searchText ? `&searchTitle=${searchText}` : "")
  );

  const [openDrawer, setOpenDrawer] = useState(false);
  const handleMyObject = (
    arg: any,
    key: string,
    label: string,
    value: string
  ) => {
    const data = arg;

    return {
      label: `${data?.displayName} (${data?.email})`,
      value: `${data?._id}`,
      key: `${data?._id}`,
    };
  };
  const timetableSchema = useMemo(() => {
    return [
      {
        key: "1",
        name: "staff",
        label: "Choose Employee *",
        initialValue: "",
        validationSchema: Yup.string().required("Employee name is required."),
        type: "autocomplete",
        options: Employee?.data?.map((data: any) => ({
          label: `${data?.displayName} (${data?.email})`,
          value: `${data?._id}`,
          key: `${data?._id}`,
        })),
      },
      {
        key: "1.55",
        name: "leaveCode",
        label: "Choose Leave Code *",
        initialValue: "",
        validationSchema: Yup.string().required("Leave Code is required."),
        type: "select",
        options: [
          {
            label: "Medical Leave",
            value: "SICK_LEAVE",
            key: "1",
          },
          {
            label: "Casual Leave",
            value: "CASUAL_LEAVE",
            key: "2",
          },
          {
            label: "Other",
            value: "OTHER",
            key: "25",
          },
        ],
      },
      {
        key: "1hgfhg",
        name: "typeOfLeave",
        label: "Session Start Year *",
        initialValue: "HALF_DAY",
      },

      {
        key: "2hj",
        name: "reason",
        label: "Reason",
        initialValue: "",
        validationSchema: Yup.string().required("Reason is required."),
        type: "text",
        multiline: true,
        rows: 3,
      },
    ];
  }, [Employee?.data]);
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
    enableReinitialize: true,
    initialValues: {
      ...initialValues,
      typeOfLeave: open?.leaveType,
      staff: open?.staff?._id,
      reason: open?.reason,
      leaveCode: open?.leaveCode,
      oneDayLeave: open?.leaveDate.split("T")[0],
      halfDayLeave: open?.leaveDate.split("T")[0],
      halfType: open?.additionalLeaveInfo,
      startDate: open?.leaveDate.split("T")[0],
      endDate: open?.expectedJoiningDate?.split("T")[0],
    },
    validationSchema: Yup.object(validationSchema),
    onSubmit: async (values) => {
      let leaveValues = {};
      if (values?.typeOfLeave === "HALF_DAY") {
        leaveValues = {
          leaveDate: new Date(values?.halfDayLeave).toISOString(),
          leaveType: values?.typeOfLeave,
          leaveCode: values?.leaveCode,
          staff: values?.staff,
          additionalLeaveInfo: values?.halfType,
          reason: values?.reason,
        };
      }
      if (values?.typeOfLeave === "FULL_DAY") {
        leaveValues = {
          leaveDate: new Date(values?.oneDayLeave).toISOString(),
          leaveType: values?.typeOfLeave,
          leaveCode: values?.leaveCode,
          staff: values?.staff,
          reason: values?.reason,
        };
      }
      if (values?.typeOfLeave === "MULTIPLE_DAY") {
        leaveValues = {
          leaveDate: new Date(values?.startDate).toISOString(),
          expectedJoiningDate: new Date(values?.endDate).toISOString(),
          leaveType: values?.typeOfLeave,
          leaveCode: values?.leaveCode,
          staff: values?.staff,
          reason: values?.reason,
        };
      }
      try {
        const response = await leave({
          path: `staff/leave/edit/${open?._id}`,
          method: "PUT",
          body: JSON.stringify(leaveValues),
        });

        if (response?.data?.error) {
          notify.error(response?.data?.error);
          return;
        }

        notify.success(response?.data?.message);
        mutate && mutate.current && mutate.current.onQueryChange();
        setOpenDrawer(false);
        formik?.resetForm();
      } catch (err) {
        console.log(err);
      }
    },
  });

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
          <div className="flex items-center justify-between p-4 border-b mt-14 md:mt-0">
            <div className="flex items-center text-slate-700 font-semibold text-xl gap-1 uppercase">
              <Edit className="h-8 w-8" />
              <h3 className="tracking-wide text-center">
                Edit Leave Management Details
              </h3>
            </div>
          </div>
          <form className="grid grid-cols-12 w-full px-4 gap-4 py-5">
            {timetableSchema?.map((items) =>
              items?.type === "autocomplete" ? (
                <div
                  className="col-span-12 md:col-span-12 w-full"
                  key={items?.key}
                >
                  <AdminAutocomplete
                    className=" !mb-2 "
                    textClassName="!bg-gray-50"
                    size={"small"}
                    label={items?.label}
                    isOptionEqualToValue={(option, value) =>
                      option?.value === value?.value
                    }
                    disabled={true}
                    onSearchTextChange={(e) => setSearchTitle(e.target.value)}
                    onChange={(e, value) => {
                      formik?.setFieldValue(items?.name, value?.value);
                    }}
                    value={
                      Employee?.data
                        ?.filter((i) => i?._id === formik?.values[items?.name])
                        ?.map((item) => {
                          return {
                            key: item?._id,
                            label: `${item?.displayName} (${item?.email})`,
                            value: item?._id,
                          };
                        })?.[0] || {
                        key: " ",
                        label: " ",
                        value: " ",
                      }
                    }
                    // value={batchData}
                    noOptionText={
                      <div className="w-full flex flex-col gap-2">
                        <small className="tracking-wide">
                          No options found
                        </small>
                        {/* <div
                        className="font-medium tracking-wide text-xs hover:bg-theme/90 transition-all duration-300 ease-in-out scale-100 hover:scale-95 text-white bg-theme px-2 py-1 rounded-md shadow-lg  w-fit cursor-pointer"
                        onClick={() =>
                          router.push("/panel/admin/batch/create")
                        }
                      >
                        Add New {item?.label.slice(0, -1)}
                      </div> */}
                      </div>
                    }
                    options={items?.options}
                  />
                </div>
              ) : items?.name === "typeOfLeave" ? (
                <div className="!w-full col-span-12" key={items?.key}>
                  <FormControl>
                    <FormLabel
                      id="demo-row-radio-buttons-group-label"
                      className="!text-theme text-wider font-medium pb-2"
                    >
                      Type Of Leave *
                    </FormLabel>
                    <RadioGroup
                      name="row-radio-buttons-group"
                      defaultValue="HALF_DAY"
                      value={formik?.values?.typeOfLeave}
                      row
                      onChange={(e) => {
                        formik.setFieldValue("typeOfLeave", e.target.value);
                      }}
                    >
                      <FormControlLabel
                        className="text-theme text-wider font-medium"
                        value="HALF_DAY"
                        control={<Radio />}
                        label="Half Day"
                      />
                      <FormControlLabel
                        className="text-theme text-wider font-medium"
                        value="FULL_DAY"
                        control={<Radio />}
                        label="Full Day"
                      />
                      <FormControlLabel
                        className="text-theme text-wider font-medium"
                        value="MULTIPLE_DAY"
                        control={<Radio />}
                        label="Multiple"
                      />
                    </RadioGroup>
                  </FormControl>
                  {formik?.values?.typeOfLeave === "MULTIPLE_DAY" && (
                    <div className="grid grid-cols-12 w-full  gap-4">
                      <TextInput
                        title={"Start Date"}
                        name={"startDate"}
                        type={"date"}
                        value={formik?.values["startDate"]}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        size="small"
                        fullWidth
                        error={Boolean(
                          formik?.touched["startDate"] &&
                            formik?.errors["startDate"]
                        )}
                        helperText={
                          formik?.touched["startDate"] &&
                          (formik?.errors["startDate"] as any)
                        }
                        styleArea={"col-span-12 md:col-span-6 !w-full"}
                        styleField="w-full col-span-12 overflow-hidden"
                        inputProps={{
                          min: new Date().toISOString().split("T")[0],
                        }}
                      />
                      <TextInput
                        title={"End Date"}
                        name={"endDate"}
                        type={"date"}
                        value={formik?.values["endDate"]}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        size="small"
                        fullWidth
                        error={Boolean(
                          formik?.touched[items?.name] &&
                            formik?.errors[items?.name]
                        )}
                        helperText={
                          formik?.touched[items?.name] &&
                          (formik?.errors[items?.name] as any)
                        }
                        styleArea={"col-span-12 md:col-span-6 !w-full"}
                        styleField="w-full col-span-12 overflow-hidden"
                        inputProps={{
                          min: new Date().toISOString().split("T")[0],
                        }}
                      />
                    </div>
                  )}
                  {formik?.values?.typeOfLeave === "FULL_DAY" && (
                    <div className="grid grid-cols-12 w-full  gap-4">
                      <>
                        <TextInput
                          title={"Choose Date"}
                          name={"oneDayLeave"}
                          type={"date"}
                          value={formik?.values["oneDayLeave"]}
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                          size="small"
                          fullWidth
                          error={Boolean(
                            formik?.touched[items?.name] &&
                              formik?.errors[items?.name]
                          )}
                          helperText={
                            formik?.touched[items?.name] &&
                            (formik?.errors[items?.name] as any)
                          }
                          styleArea={"col-span-12 md:col-span-6  !w-full"}
                          styleField="w-full col-span-12 overflow-hidden"
                          inputProps={{
                            min: new Date().toISOString().split("T")[0],
                          }}
                        />
                      </>
                    </div>
                  )}
                  {formik?.values?.typeOfLeave === "HALF_DAY" && (
                    <div className="grid grid-cols-12 w-full  gap-4">
                      <>
                        <TextInput
                          title={"Choose Date"}
                          name={"halfDayLeave"}
                          type={"date"}
                          value={formik?.values["halfDayLeave"]}
                          onChange={(e) =>
                            formik.setFieldValue("halfDayLeave", e.target.value)
                          }
                          onBlur={formik.handleBlur}
                          size="small"
                          fullWidth
                          error={Boolean(
                            formik?.touched[items?.name] &&
                              formik?.errors[items?.name]
                          )}
                          helperText={
                            formik?.touched[items?.name] &&
                            (formik?.errors[items?.name] as any)
                          }
                          styleArea={"col-span-6  !w-full"}
                          styleField="w-full col-span-12 overflow-hidden"
                          inputProps={{
                            min: new Date().toISOString().split("T")[0],
                          }}
                        />
                      </>
                    </div>
                  )}
                  {formik?.values?.typeOfLeave === "HALF_DAY" &&
                    formik?.values?.halfDayLeave && (
                      <div className="w-full  gap-4">
                        <>
                          <FormControl>
                            <RadioGroup
                              className="mt-2"
                              name="row-radio-buttons-group"
                              // defaultValue="onetime"
                              value={formik?.values?.halfType}
                              row
                              onChange={(e) =>
                                formik.setFieldValue("halfType", e.target.value)
                              }
                            >
                              <FormControlLabel
                                className="text-theme text-wider font-medium"
                                value="firstHalf"
                                control={<Radio />}
                                label="First Half"
                              />
                              <FormControlLabel
                                className="text-theme text-wider font-medium"
                                value="secondHalf"
                                control={<Radio />}
                                label="Second Half"
                              />
                            </RadioGroup>
                          </FormControl>
                        </>
                      </div>
                    )}
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
                  rows={items?.rows}
                  size="small"
                  fullWidth
                  multiline={items?.multiline}
                  error={Boolean(
                    formik?.touched[items?.name] && formik?.errors[items?.name]
                  )}
                  helperText={
                    formik?.touched[items?.name] &&
                    (formik?.errors[items?.name] as any)
                  }
                  styleArea={`${
                    items?.multiline
                      ? "col-span-12 md:col-span-12 !w-full"
                      : "col-span-12 md:col-span-12 !w-full"
                  }`}
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
      </CustomDrawer>
      <Tooltip title="Edit Leave Details">
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

export default EditLeaveManagementDrawer;
