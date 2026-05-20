import { Close, Done, Edit } from "@mui/icons-material";
import {
  Autocomplete,
  Dialog,
  DialogContent,
  DialogTitle,
  FormControl,
  IconButton,
  TextField,
} from "@mui/material";
import { Button } from "components/core";
import { useFormik } from "formik";
import { useFetch, useSWRFetch } from "hooks";
import { useRouter } from "next/router";
import { useMemo, useRef, useState } from "react";
import { getHoursAndMinutes, notify } from "utils";
import * as Yup from "yup";

type Props = {
  item?: any;
  setSelectedData?: any;
  selectedData?: any;
  mutate?: any;
};

export default function TimeTableEditDialog({
  selectedData,
  setSelectedData,
  item,
  mutate,
}: Props) {
  const { mutate: AddT } = useFetch();
  const { batchId } = useRouter().query;
  const [openDialog, setOpenDialog] = useState(false);
  const fileRef = useRef<any>();

  const { data: subject } = useSWRFetch<{ data: any }>(
    `batch/${batchId}/teacher`
  );

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
        key: "5",
        name: "classRoom",
        label: "Class Room",
        required: false,
        initialValue: "", // You can set the initial duration value here
        type: "text",
        validationSchema: Yup.string()
          .typeError("Class Room must be a string")
          .optional(),
      },
      {
        key: "6",
        multiple: true,
        required: true,
        name: "subject",
        label: "Choose Subjects",
        initialValue: "",
        // validationSchema: Yup.string().required("Subjects is required."),
        type: "autocomplete",
        options: subject?.data?.map((item: any) => {
          return {
            key: item?.subject?._id,
            label: `${item?.subject?.title} (${item?.teacher?.displayName})`,
            value: item?.subject?._id + "-" + item?.teacher?._id,
          };
        }) || [
          {
            key: "1",
            label: "No subject",
            value: "",
          },
        ],
      },
    ],
    [subject?.data, item?.subject?._id]
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
    initialValues: item
      ? {
          startTime: getHoursAndMinutes(new Date(item?.startTime)),
          endTime: getHoursAndMinutes(new Date(item?.endTime)),
          classRoom: item?.classRoom,
          subject: {
            key: item?.subject?._id,
            label: `${item?.subject?.title} (${item?.teacher?.displayName})`,
            value: item?.subject?._id + "-" + item?.teacher?._id,
          },
        }
      : initialValues,
    validationSchema: Yup.object(validationSchema),
    onSubmit: async (values) => {
      try {
        const startHour = values?.startTime.split(":")[0];
        const startMinute = values?.startTime.split(":")[1];
        const startTime = new Date(item?.startTime);
        startTime.setHours(startHour);
        startTime.setMinutes(startMinute);
        startTime.setSeconds(0);
        const endHour = values?.endTime.split(":")[0];
        const endMinute = values?.endTime.split(":")[1];
        const endTime = new Date(item?.endTime);
        endTime.setHours(endHour);
        endTime.setMinutes(endMinute);
        endTime.setSeconds(0);
        const teacher = values?.subject?.value.split("-")[1];
        const subject = values?.subject?.value.split("-")[0];

        const response = await AddT({
          path: `edit/auto/time-table/${item?._id}`,
          method: "PUT",
          body: JSON.stringify({
            startTime: startTime,
            endTime: endTime,
            teacher: teacher,
            batch: batchId,
            subject: subject,
            credits: 1,
            classRoom: values?.classRoom,
          }),
        });
        mutate();
        if (response?.data?.error) {
          notify.error(response?.data?.error);
          return;
        }
        setOpenDialog(false);
        setSelectedData?.();
        notify.success(response?.data?.message);
        formik?.resetForm();
      } catch (err) {}
    },
  });

  return (
    <>
      <Dialog
        open={openDialog || Boolean(selectedData)}
        onClose={() => {
          setOpenDialog(false);
          setSelectedData?.();
        }}
        maxWidth="md"
      >
        <DialogTitle>
          <div className="flex items-center justify-between">
            <h1>Edit Timetable Config</h1>
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
                    item.label ? (
                      <span className="font-bold">
                        {`${item?.label}`}
                        {item?.required && (
                          <sup className="text-red-500">*</sup>
                        )}
                      </span>
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
                      sx={{ my: 1 }}
                      InputLabelProps={{
                        shrink: true,
                      }}
                      label={
                        item.label ? (
                          <span className="font-bold">
                            {`${item?.label}`}
                            {item?.required && (
                              <sup className="text-red-500">*</sup>
                            )}
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
                  defaultValue={item?.initialValue}
                />
              ) : (
                <TextField
                  sx={{ my: 1 }}
                  label={
                    item.label ? (
                      <span className="font-bold">
                        {`${item?.label}`}
                        {item?.required && (
                          <sup className="text-red-500">*</sup>
                        )}
                      </span>
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
              type="button"
              disabled={formik.isSubmitting}
              onClick={() => formik.handleSubmit()}
              startIcon={<Done />}
            >
              Save
            </Button>
            <Button
              onClick={() => setOpenDialog(false)}
              className={"bg-red-600"}
              startIcon={<Close />}
            >
              Close
            </Button>
          </div>
        </DialogContent>
      </Dialog>
      <IconButton onClick={() => setOpenDialog(true)}>
        <Edit fontSize={"small"} className="text-blue-600" />
      </IconButton>
    </>
  );
}
