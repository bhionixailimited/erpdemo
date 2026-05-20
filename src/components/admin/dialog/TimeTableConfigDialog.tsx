import {
  Add,
  Close,
  Done,
  Remove,
  RotateLeft,
  Settings,
} from "@mui/icons-material";
import {
  Autocomplete,
  Dialog,
  DialogContent,
  DialogTitle,
  FormControl,
  FormHelperText,
  IconButton,
  TextField,
} from "@mui/material";
import { Button } from "components/core";
import { useFormik } from "formik";
import { dayOfWeekToValue } from "helper/DayGet";
import { useFetch, useSWRFetch } from "hooks";
import { useRouter } from "next/router";
import { useMemo, useRef, useState } from "react";
import { notify } from "utils";
import * as Yup from "yup";

type Props = {
  setSelectedData?: any;
  selectedData?: any;
  mutate?: any;
  selectBatchSectionName: string;
};

export default function TimeTableConfigDialog({
  selectedData,
  setSelectedData,
  mutate,
  selectBatchSectionName,
}: Props) {
  const { mutate: AddT } = useFetch();
  const { batchId } = useRouter().query;
  const [openDialog, setOpenDialog] = useState(false);
  const fileRef = useRef<any>();
  const { data: subject } = useSWRFetch<{ data: any }>(
    `batch/${batchId}/teacher`
  );
  const days = [
    { key: "01", label: "Monday", value: 2 },
    {
      key: "02",
      label: "Tuesday",
      value: 3,
    },
    {
      key: "03",
      label: "Wednesday",
      value: 4,
    },
    {
      key: "04",
      label: "Thursday",
      value: 5,
    },
    {
      key: "05",
      label: "Friday",
      value: 6,
    },
    {
      key: "06",
      label: "Saturday",
      value: 7,
    },
  ];
  const formSchema = useMemo(
    () => [
      {
        key: "1",
        name: "startTime",
        label: "Start Time",
        required: true,
        initialValue: null, // You can set the initial time value here as null
        type: "time", // Use "time" for time input
        validationSchema: Yup.string()
          .nullable()
          .required("Start Time is required")
          .test(
            "is-valid-startTime",
            "Start Time must be smaller than End Time",
            function (value) {
              const endTime = this.parent.endTime;
              if (!value || !endTime) return true; // Skip validation if not all values are available
              const startTime = parseInt(value.replace(":", ""), 10);
              const end = parseInt(endTime.replace(":", ""), 10);
              return startTime < end;
            }
          ),
      },
      {
        key: "2",
        name: "endTime",
        label: "End Time",
        required: true,
        initialValue: null, // You can set the initial time value here as null
        type: "time", // Use "time" for time input
        validationSchema: Yup.string()
          .nullable()
          .required("End Time is required")
          .test(
            "is-valid-endTime",
            "End Time must be greater than Start Time",
            function (value) {
              const startTime = this.parent.startTime;
              if (!value || !startTime) return true; // Skip validation if not all values are available
              const endTime = parseInt(value.replace(":", ""), 10);
              const start = parseInt(startTime.replace(":", ""), 10);
              return endTime > start;
            }
          ),
      },
      {
        key: "3",
        name: "lunchStartTime",
        label: "Lunch Start Time",
        required: true,
        initialValue: null, // You can set the initial time value here as null
        type: "time", // Use "time" for time input
        validationSchema: Yup.string()
          .nullable()
          .required("Lunch Start Time is required")
          .test(
            "is-valid-lunchStartTime",
            "Lunch Start Time must be smaller than Lunch End Time",
            function (value) {
              const lunchEndTime = this.parent.lunchEndTime;
              if (!value || !lunchEndTime) return true; // Skip validation if not all values are available
              const startTime = parseInt(value.replace(":", ""), 10);
              const end = parseInt(lunchEndTime.replace(":", ""), 10);
              return startTime < end;
            }
          ),
      },
      {
        key: "4",
        name: "lunchEndTime",
        label: "Lunch End Time",
        required: true,
        initialValue: null, // You can set the initial time value here as null
        type: "time", // Use "time" for time input
        validationSchema: Yup.string()
          .nullable()
          .required("Lunch End Time is required")
          .test(
            "is-valid-lunchEndTime",
            "Lunch End Time must be greater than Lunch Start Time",
            function (value) {
              const lunchStartTime = this.parent.lunchStartTime;
              if (!value || !lunchStartTime) return true; // Skip validation if not all values are available
              const endTime = parseInt(value.replace(":", ""), 10);
              const start = parseInt(lunchStartTime.replace(":", ""), 10);
              return endTime > start;
            }
          ),
      },
      {
        key: "5",
        name: "theoryDuration",
        label: "Duration of Theory (in mins)",
        required: true,
        initialValue: "", // You can set the initial duration value here
        type: "number",
        validationSchema: Yup.number()
          .typeError("Duration must be a number")
          .required("Duration (in mins) is required")
          .positive("Duration must be a positive number")
          .integer("Duration must be an integer"),
      },
      {
        key: "6",
        multiple: true,
        required: true,
        name: "theorySubject",
        label: "Choose Theory Subjects *",
        initialValue: [],
        validationSchema: Yup.array().required("Theory Subject is required."),
        type: "subject",
        options: subject?.data?.map((item: any) => {
          return {
            key: item?.subject?._id,
            label: item?.subject?.title,
            value: item?._id,
            new: item,
          };
        }) || [
          {
            key: "1",
            label: "No Theory Subject",
            value: "",
          },
        ],
      },
      // --------------------------
      {
        key: "7",
        name: "labDuration",
        label: "Duration Of Lab (in mins)",
        required: false,
        initialValue: "", // You can set the initial duration value here
        type: "number",
        validationSchema: Yup.number()
          .typeError("Duration must be a number")
          // .required("Duration (in mins) is required")
          .positive("Duration must be a positive number")
          .integer("Duration must be an integer")
          .optional(),
      },
      {
        key: "8",
        multiple: true,
        required: false,
        name: "labSubject",
        label: "Choose Lab Subjects",
        initialValue: [],
        // validationSchema: Yup.array().required("Lab Subject is required."),
        validationSchema: Yup.array().optional(),

        type: "subject",
        options: subject?.data?.map((item: any) => {
          return {
            key: item?.subject?._id,
            label: item?.subject?.title,
            //  +
            // ` (${item?.subject?.isTheory ? "Theory" : "Lab"})`,
            value: item?._id,
            new: item,
          };
        }) || [
          {
            key: "1",
            label: "No Lab Subject",
            value: "",
          },
        ],
      },
      {
        key: "9",
        multiple: true,
        required: true,
        name: "days",
        label: "Choose Days",
        initialValue: days || [],
        validationSchema: Yup.array().required("Days are required."),
        type: "autocomplete",
        options: days, //declared days
      },
      // {
      //   key: "7",
      //   name: "credits",
      //   label: "Class Credits",
      //   required: false,
      //   initialValue: "", // You can set the initial duration value here
      //   type: "number",
      //   validationSchema: Yup.number().optional(),
      // },
    ],
    [subject?.data]
  );

  const initialValues = formSchema?.reduce((accumulator: any, currentValue) => {
    accumulator[currentValue?.name] = currentValue.initialValue;
    return accumulator;
  }, {});

  const validationSchema = formSchema?.reduce(
    (accumulator: any, currentValue) => {
      accumulator[currentValue?.name] = currentValue.validationSchema;
      return accumulator;
    },
    {}
  );

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: selectedData || initialValues,
    validationSchema: Yup.object(validationSchema),
    onSubmit: async (values) => {
      // console.log("values-->", values);
      // return;
      try {
        // Handle form submission here

        const day = dayOfWeekToValue("tuesday");
        const startTimeHour = values?.startTime.split(":")[0];
        const startTimeMinute = values?.startTime.split(":")[1];
        const convertedStartTime = new Date(day);

        convertedStartTime.setHours(startTimeHour);
        convertedStartTime.setMinutes(startTimeMinute);
        convertedStartTime.setSeconds(0);

        const endTimeHour = values?.endTime.split(":")[0];
        const endTimeMinute = values?.endTime.split(":")[1];

        const convertedEndTime = new Date(day);
        convertedEndTime.setHours(endTimeHour);
        convertedEndTime.setMinutes(endTimeMinute);
        convertedEndTime.setSeconds(0);
        const lunchStartTimeHour = values?.lunchStartTime.split(":")[0];
        const lunchStartTimeMinute = values?.lunchStartTime.split(":")[1];
        const convertedLunchStartTime = new Date(day);
        convertedLunchStartTime.setHours(lunchStartTimeHour);
        convertedLunchStartTime.setMinutes(lunchStartTimeMinute);
        convertedLunchStartTime.setSeconds(0);

        const lunchEndTimeHour = values?.lunchEndTime.split(":")[0];
        const lunchEndTimeMinute = values?.lunchEndTime.split(":")[1];
        const convertedLunchEndTime = new Date(day);
        convertedLunchEndTime.setHours(lunchEndTimeHour);
        convertedLunchEndTime.setMinutes(lunchEndTimeMinute);
        convertedLunchEndTime.setSeconds(0);
        const timetableConfig = {
          startTime: convertedStartTime,
          endTime: convertedEndTime,
          batch: batchId,
          lunchStartTime: convertedLunchStartTime,
          lunchEndTime: convertedLunchEndTime,
          theoryDuration: values?.theoryDuration, //theory duration
          labDuration:
            values?.labDuration !== "" ? values?.labDuration : undefined, //Lab duration
          theorySubject: values?.theorySubject?.map((el: any) => {
            return {
              subject: el?.subject?.value,
              classCount: el?.classCount,
            };
          }), //theory subject map
          labSubject: values?.labSubject?.map((el: any) => {
            return {
              subject: el?.subject?.value,
              classCount: el?.classCount,
            };
          }), //Lab subject map
          days: values?.days?.map((el: any) => el?.value),
          // credits: values?.credits,
          section: selectBatchSectionName,
        };

        const response = await AddT({
          path: `batch/auto/time-table`,
          method: "POST",
          body: JSON.stringify({
            ...timetableConfig,
          }),
        });
        mutate();
        if (response?.data?.error) {
          notify.error(response?.data?.error);
          return;
        }
        setOpenDialog(false);
        setSelectedData?.();
        notify?.success(response?.data?.message);
        formik?.resetForm();
      } catch (err) {
        console.log(err);
      }
    },
  });

  return (
    <div className="w-fit">
      <Dialog
        open={openDialog || Boolean(selectedData)}
        onClose={() => {
          setOpenDialog(false);
          setSelectedData?.();
        }}
        maxWidth="sm"
      >
        <DialogTitle>
          <div className="flex items-center justify-between">
            <h1>Add Timetable Config</h1>
          </div>
        </DialogTitle>
        <DialogContent>
          <form className="w-full px-4 gap-4">
            {formSchema?.map((item) =>
              // Check the condition to decide whether to render the field or not
              item.type === "file" ? (
                <FormControl fullWidth key={item.key} sx={{ my: 1 }}>
                  <Button
                    type="button"
                    className={"bg-green-700"}
                    onClick={() => fileRef.current?.click?.()}
                  >
                    {item.label}

                    <input
                      ref={fileRef}
                      hidden
                      name={item.name}
                      type={item.type}
                      onChange={(event) =>
                        formik.setFieldValue(
                          "otherCertificate",
                          event.target.files
                        )
                      }
                      multiple
                    />
                  </Button>
                </FormControl>
              ) : item.type === "time" ? (
                <TextField
                  variant="outlined"
                  InputLabelProps={{
                    shrink: true,
                  }}
                  sx={{ my: 1 }}
                  label={
                    item?.label && item?.required === true ? (
                      <span className="font-bold">
                        {`${item?.label}`}
                        <sup className="text-red-500">*</sup>
                      </span>
                    ) : item?.label && item?.required === false ? (
                      <span>{item?.label}</span>
                    ) : (
                      ""
                    )
                  }
                  key={item.key}
                  name={item.name}
                  type={"time"}
                  value={formik?.values[item.name]}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  fullWidth
                  error={Boolean(
                    formik?.touched[item.name] && formik?.errors[item.name]
                  )}
                  helperText={
                    formik?.touched[item.name] &&
                    (formik?.errors[item.name] as any)
                  }
                />
              ) : item.type === "autocomplete" ? ( // Add a condition for Autocomplete type
                <Autocomplete
                  key={item.key}
                  multiple // Enable multiple selection
                  id={item.name}
                  options={item.options || []}
                  getOptionLabel={(option) => option.label}
                  value={formik.values[item.name]}
                  onChange={(_, newValue) => {
                    formik.setFieldValue(item.name, newValue);
                  }}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      className="!max-w-2xl"
                      sx={{ my: 1 }}
                      InputLabelProps={{
                        shrink: true,
                      }}
                      label={
                        item.label && item?.required ? (
                          <span className="font-bold">
                            {`${item?.label}`}
                            <sup className="text-red-500">*</sup>
                          </span>
                        ) : item?.label && item?.required === false ? (
                          <span className="text-gray-500 font-bold">
                            {item?.label}
                          </span>
                        ) : (
                          ""
                        )
                      }
                      error={Boolean(
                        formik.touched[item.name] && formik.errors[item.name]
                      )}
                      helperText={
                        formik.touched[item.name] &&
                        (formik.errors[item.name] as any)
                      }
                    />
                  )}
                />
              ) : item.type === "subject" ? (
                <>
                  <AddSubject
                    options={item.options}
                    values={formik.values[item.name]}
                    onChange={(value: any) => {
                      formik?.setFieldValue(
                        item?.name,
                        formik?.values[item?.name]?.length
                          ? [...formik?.values[item?.name], value]
                          : [value]
                      );
                    }}
                    helperText={
                      formik.touched[item.name] &&
                      (formik.errors[item.name] as any)
                    }
                    error={Boolean(
                      formik.touched[item.name] && formik.errors[item.name]
                    )}
                    totalDays={formik?.values?.days?.length}
                    label={item?.label}
                  />

                  <div className="flex flex-wrap gap-2 mb-4">
                    {formik?.values[item?.name]?.map(
                      (inner: any, innerIndex: number) => (
                        <div
                          className="flex items-center gap-2 rounded-full bg-gray-200 font-medium text-xs px-4 "
                          key={innerIndex + `${Date.now()}`}
                        >
                          {inner?.subject?.label} ({inner?.classCount})
                          <IconButton
                            onClick={() =>
                              formik?.setFieldValue(
                                item?.name,
                                formik?.values[item?.name]?.filter(
                                  (superInner: any, superInnerIndex: number) =>
                                    superInnerIndex !== innerIndex
                                )
                              )
                            }
                          >
                            <Close />
                          </IconButton>
                        </div>
                      )
                    )}
                  </div>
                </>
              ) : (
                <TextField
                  sx={{ my: 1 }}
                  label={
                    item?.label && item?.required === true ? (
                      <span className="font-bold">
                        {`${item?.label}`}
                        <sup className="text-red-500">*</sup>
                      </span>
                    ) : item?.label && item?.required === false ? (
                      <span className="font-bold">{item?.label}</span>
                    ) : (
                      ""
                    )
                  }
                  InputLabelProps={{
                    shrink: true,
                  }}
                  key={item.key}
                  name={item.name}
                  type={item.type as "text"}
                  value={formik?.values[item.name]}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  fullWidth
                  error={Boolean(
                    formik?.touched[item.name] && formik?.errors[item.name]
                  )}
                  helperText={
                    formik?.touched[item.name] &&
                    (formik?.errors[item.name] as any)
                  }
                />
              )
            )}
          </form>
          <div className="w-full flex pt-10 gap-2 px-4 justify-end">
            <Button
              disabled={formik.isSubmitting}
              onClick={() => formik.handleSubmit()}
              startIcon={<Done />}
            >
              Save
            </Button>
            <Button
              onClick={() => formik.resetForm()}
              className={"bg-red-400"}
              startIcon={<RotateLeft />}
            >
              Reset
            </Button>
          </div>
        </DialogContent>
      </Dialog>
      <IconButton onClick={() => setOpenDialog(true)}>
        <Settings />
      </IconButton>
    </div>
  );
}

const AddSubject = ({
  options,
  onChange,
  helperText,
  error,
  totalDays = 0,
  label,
}: any) => {
  const [open, setOpen] = useState(false);

  const [classCount, setClassCount] = useState(1);
  const [autoCompleteValue, setAutoCompleteValue] = useState();
  const [autoCompleteError, setAutoCompleteError] = useState("");

  return (
    <div className="w-full">
      <Dialog
        open={open}
        onClose={() => setOpen(false)}
        fullWidth
        maxWidth="sm"
      >
        <div className="w-full flex flex-col items-center justify-center px-4 ">
          <h3 className="font-semibold tracking-wide text-theme text-xl text-center py-4 ">
            Add Subject
          </h3>
          <Autocomplete
            fullWidth
            options={options || []}
            getOptionLabel={(option: any) => option?.label}
            value={autoCompleteValue}
            onChange={(e, v) => {
              setAutoCompleteValue(v);
              setAutoCompleteError("");
            }}
            renderInput={(params) => (
              <TextField
                {...params}
                className="!max-w-2xl"
                sx={{ my: 1 }}
                InputLabelProps={{
                  shrink: true,
                }}
                error={error}
                helperText={helperText}
              />
            )}
          />
          {autoCompleteError ? (
            <FormHelperText error>{autoCompleteError}</FormHelperText>
          ) : null}

          <div className="flex items-center justify-center gap-4 ">
            <IconButton
              onClick={() =>
                setClassCount((prev) => (prev <= 1 ? prev : prev - 1))
              }
            >
              <Remove />
            </IconButton>
            <div className="border h-10  w-20 rounded-md flex items-center justify-center ">
              {classCount}
            </div>
            <IconButton
              onClick={() =>
                setClassCount((prev) => (prev >= totalDays ? prev : prev + 1))
              }
            >
              <Add />
            </IconButton>
          </div>
          <Button
            onClick={() => {
              if (!autoCompleteValue)
                return setAutoCompleteError("This field is required *");
              onChange({
                subject: autoCompleteValue,
                classCount: classCount,
              });
              setOpen(false);
              setAutoCompleteValue(undefined);
              setClassCount(1);
              setAutoCompleteError("");
            }}
            className="!my-4 "
            type="button"
            endIcon={<Add />}
          >
            Add
          </Button>
        </div>
      </Dialog>
      <small className="text-xs font-semibold text-gray-700/80">{label}</small>
      <Button
        onClick={() => setOpen(true)}
        className="!w-full !my-4 "
        type="button"
        endIcon={<Add />}
      >
        Add
      </Button>
      {error && <FormHelperText error>{helperText}</FormHelperText>}
    </div>
  );
};
