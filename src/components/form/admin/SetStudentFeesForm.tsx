import { Done, RotateLeft } from "@mui/icons-material";
import {
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
} from "@mui/material";
import { AdminAutocomplete, Button, TextInput } from "components/core";
import dayjs from "dayjs";
import { useFormik } from "formik";
import { useFetch, useSWRFetch } from "hooks";
import { useDeferredValue, useMemo, useState, useEffect } from "react";
import CourseType from "types/course";
import FeeType from "types/fee";
import SessionType from "types/session";
import UserType from "types/user";
import { Day, FinancialYear, Month, notify } from "utils";
import * as Yup from "yup";

type dataType = {
  data: SessionType[];
};
type courseType = {
  data: CourseType[];
};
type feeType = {
  data: FeeType[];
};
type studentType = {
  data: UserType[];
};

const SetStudentFeesForm = ({
  open,
  mutate: feeMutate,
  setOpenDialog,
}: any) => {
  const [selectedFeeAmount, setSelectedFeeAmount] = useState<number | null>(
    null
  );

  const [searchTitle, setSearchTitle] = useState("");
  const searchText = useDeferredValue(searchTitle);
  const [searchBatch, setSearchBatch] = useState("");
  const { mutate: feeAdd } = useFetch();
  const { data } = useSWRFetch<dataType>("session");
  const { data: course } = useSWRFetch<courseType>("course");
  const { data: feeName } = useSWRFetch<feeType>("fees");
  const [sessionId, setSessionId] = useState("");
  const [courseId, setCourseId] = useState("");
  const [batchId, setBatchId] = useState("");
  const { data: batch } = useSWRFetch<any>(
    `batch?course=true&branch=true&session=true&perPage=20&pageNo=1` +
      (searchText ? `&searchTitle=${searchText}` : "") +
      (courseId ? `&courseId=${courseId}` : "") +
      (sessionId ? `&sessionId=${sessionId}` : "")
  );
  const { data: student } = useSWRFetch<studentType>(
    batchId &&
      `batch/${batchId}/students?perPage=20&pageNo=1` +
        (searchText ? `&searchTitle=${searchText}` : "")
  );
  const [batchData, setBatchData] = useState<any>({
    key: "",
    label: "",
    value: "",
  });

  const timetableSchema = useMemo(() => {
    return [
      {
        key: "1A",
        name: "session",
        label: "Session *",
        initialValue: "",
        type: "select",
        validationSchema: Yup.string().optional(),
        options: data?.data?.length
          ? data?.data?.map((data) => ({
              label: `${data?.title}`,
              value: `${data?._id}`,
              key: `${data?.title}`,
            }))
          : [
              {
                label: "No Session Found",
                value: "",
                key: "",
              },
            ],
      },
      // {
      //   key: "1h",
      //   name: "sessionEndYear",
      //   label: "Session End Year *",
      //   initialValue: "",
      //   validationSchema: Yup.string().required("Session end year is required."),
      //   type: "select",
      //   options: FinancialYear,
      // },
      {
        key: "2A",
        name: "courseName",
        label: "Choose Course *",
        initialValue: "",
        type: "select",
        validationSchema: Yup.string().optional(),
        options: course?.data?.length
          ? course?.data?.map((data) => ({
              label: `${data?.title}`,
              value: `${data?._id}`,
              key: `${data?.title}`,
            }))
          : [
              {
                label: "No Course Found",
                value: "",
                key: "",
              },
            ],
      },
      {
        key: "3A",
        name: "batch",
        label: "Choose Batch *",
        initialValue: "",
        type: "autocomplete",
        validationSchema: Yup.string().required("Batch is required"),
        options: batch?.data?.length
          ? batch?.data?.map((data: any) => ({
              label: `${data?.course?.title} ${data?.branch?.title || ""} (${
                data?.session?.title
              })`,
              value: `${data?._id}`,
              key: `${data?._id}`,
              course: data?.course?._id,
              branch: data?.branch?._id,
              session: data?.session?._id,
            }))
          : [
              {
                label: "No Batch Found",
                value: "",
                key: "",
              },
            ],
      },
      {
        key: "4A",
        name: "nameOfFee",
        label: "Name Of Fee *",
        initialValue: "",
        validationSchema: Yup.string().required("Mode of payment is required."),
        type: "select",
        options: feeName?.data?.length
          ? feeName?.data?.map((data) => ({
              label: `${data?.title}`,
              value: `${data?._id}`,
              key: `${data?.title}`,
            }))
          : [
              {
                label: "No Fee Name Found",
                value: "",
                key: "",
              },
            ],
      },
      {
        key: "5A",
        name: "amount",
        label: "Enter Amount * (Discounted Amount)",
        initialValue: "",
        // initialValue: {selectedFeeAmount !== null ? selectedFeeAmount.toString() : ""},
        validationSchema: Yup.string().required("Amount is required."),
        type: "text",
      },
      {
        key: "6A",
        name: "user",
        label: "Choose Student",
        initialValue: "",
        type: "autocomplete",
        validationSchema: Yup.string().optional(),
        options: student?.data?.length
          ? student?.data?.map((data) => ({
              label: `${data?.user?.displayName} (${data?.user?.email})`,
              value: `${data?.user?._id}`,
              key: `${data?._id}`,
            }))
          : [
              {
                label: "No Student Found",
                value: "",
                key: "",
              },
            ],
      },
      {
        key: "7A",
        name: "typeOfFee",
        label: "Session Start Year *",
        initialValue: "ONETIME",
      },
    ];
  }, [data?.data, course?.data, feeName?.data, batch?.data, student?.data]);

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
    initialValues: {
      ...initialValues,
    },
    validationSchema: Yup.object(validationSchema),
    onSubmit: async (values) => {
      const setStartMonth = new Date().setMonth(Number(values?.startMonth));
      const setEndMonth = new Date().setMonth(Number(values?.endMonth));
      const setStartDay = new Date().setDate(Number(values?.startDay));
      const setEndDay = new Date().setDate(Number(values?.endDay));

      try {
        const response = await feeAdd({
          path: `student-fee/create`,
          method: "POST",
          body: JSON.stringify({
            ...values,
            feeType: values?.typeOfFee,
            fees: values?.nameOfFee,
            user: values?.user
              ? values?.user
              : student?.data?.map((item) => item?.user?._id),
            startDate:
              values?.typeOfFee === "ONETIME"
                ? new Date(values?.startDate).toISOString()
                : new Date(
                    new Date().getFullYear(),
                    new Date(setStartMonth).getMonth(),
                    new Date(setStartDay).getDate(),
                    new Date().getHours(),
                    new Date().getMinutes()
                  ).toISOString(),
            endDate:
              values?.typeOfFee === "ONETIME"
                ? new Date(values?.endDate).toISOString()
                : new Date(
                    new Date().getFullYear(),
                    new Date(setEndMonth).getMonth(),
                    new Date(setEndDay).getDate(),
                    new Date().getHours(),
                    new Date().getMinutes()
                  ).toISOString(),
          }),
        });

        if (response?.data?.error) {
          notify.error(response?.data?.error);
          return;
        }
        feeMutate && feeMutate();
        notify.success(response?.data?.message);
        setOpenDialog(false);
        formik?.resetForm();
        formik?.setFieldValue("startDate", "");
        formik?.setFieldValue("endDate", "");
      } catch (err) {
        console.log(err);
      }
    },
  });

  useEffect(() => {
    if (formik.values.nameOfFee) {
      const selectedFee = feeName?.data?.find(
        (fee) => fee._id === formik.values.nameOfFee
      );
      if (selectedFee) {
        setSelectedFeeAmount(selectedFee.amount);
        // formik.setFieldValue("amount", selectedFee.amount.toString());
      }
    }
  }, [formik.values.nameOfFee, feeName?.data]);

  return (
    <div className="w-full pb-4">
      <form
        className="grid grid-cols-12 w-full p-4 gap-4 "
        onSubmit={formik?.handleSubmit}
      >
        {timetableSchema?.map((items) =>
          items?.type === "autocomplete" ? (
            <div
              className="col-span-12 md:col-span-12 w-full "
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
                onSearchTextChange={(e) => setSearchTitle(e?.target?.value)}
                onChange={(e, value) => {
                  formik?.setFieldValue(items?.name, value?.value);
                  if (items?.name === "batch") {
                    setBatchData(value);
                    setCourseId(value?.course);
                    setSessionId(value?.session);
                    setBatchId(value?.value);
                  }
                }}
                noOptionText={
                  <div className="w-full flex flex-col gap-2">
                    <small className="tracking-wide">No options found</small>
                  </div>
                }
                options={items?.options}
                value={items?.name === "batch" ? batchData : undefined}
              />
            </div>
          ) : items?.name === "typeOfFee" ? (
            <div className="!w-full col-span-12" key={items?.key}>
              <FormControl>
                <FormLabel
                  id="demo-row-radio-buttons-group-label"
                  className="!text-theme text-wider font-medium pb-2"
                >
                  Which Type Of Fee You Want Set?
                </FormLabel>
                <RadioGroup
                  name="row-radio-buttons-group"
                  defaultValue="ONETIME"
                  row
                  onChange={(e) =>
                    formik.setFieldValue("typeOfFee", e.target.value)
                  }
                >
                  <FormControlLabel
                    className="text-theme text-wider font-medium"
                    value="RECURRING"
                    control={<Radio />}
                    label="RECURRING"
                  />
                  <FormControlLabel
                    className="text-theme text-wider font-medium"
                    value="ONETIME"
                    control={<Radio />}
                    label="ONETIME"
                  />
                </RadioGroup>
              </FormControl>
              {formik?.values?.typeOfFee === "ONETIME" && (
                <div className="grid grid-cols-12 w-full  gap-4">
                  <TextInput
                    title={"Start Date *"}
                    name={"startDate"}
                    type={"date"}
                    inputProps={{
                      min: dayjs().format("YYYY-MM-DD"),
                    }}
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
                  />
                  <TextInput
                    title={"End Date *"}
                    name={"endDate"}
                    type={"date"}
                    value={formik?.values["endDate"]}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    size="small"
                    fullWidth
                    error={Boolean(
                      formik?.touched["endDate"] && formik?.errors["endDate"]
                    )}
                    inputProps={{
                      min: dayjs(formik?.values?.startDate)
                        .add(1, "day")
                        .format("YYYY-MM-DD"),
                    }}
                    helperText={
                      formik?.touched["endDate"] &&
                      (formik?.errors["endDate"] as any)
                    }
                    styleArea={"col-span-12 md:col-span-6 !w-full"}
                    styleField="w-full col-span-12 overflow-hidden"
                  />
                </div>
              )}
              {formik?.values?.typeOfFee === "RECURRING" && (
                <div className="grid grid-cols-12 w-full  gap-4">
                  <>
                    <TextInput
                      title={"Start Day"}
                      name={"startDay"}
                      type={"select"}
                      options={Day}
                      value={formik?.values["startDay"]}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      size="small"
                      fullWidth
                      error={Boolean(
                        formik?.touched["startDay"] &&
                          formik?.errors["startDay"]
                      )}
                      helperText={
                        formik?.touched["startDay"] &&
                        (formik?.errors["startDay"] as any)
                      }
                      styleArea={"col-span-12 md:col-span-3  !w-full"}
                      styleField="w-full col-span-12 overflow-hidden"
                    />{" "}
                    <TextInput
                      title={"Start Month"}
                      name={"startMonth"}
                      type={"select"}
                      options={Month}
                      value={formik?.values["startMonth"]}
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
                      styleArea={"col-span-12 md:col-span-3 !w-full"}
                      styleField="w-full col-span-12 overflow-hidden"
                    />
                    <TextInput
                      title={"End Day"}
                      name={"endDay"}
                      type={"select"}
                      options={Day}
                      value={formik?.values["endDay"]}
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
                      styleArea={"col-span-12 md:col-span-3  !w-full"}
                      styleField="w-full col-span-12 overflow-hidden"
                    />{" "}
                    <TextInput
                      title={"End Month"}
                      name={"endMonth"}
                      type={"select"}
                      options={Month}
                      value={formik?.values["endMonth"]}
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
                      styleArea={"col-span-12 md:col-span-3 !w-full"}
                      styleField="w-full col-span-12 overflow-hidden"
                    />
                  </>
                </div>
              )}
            </div>
          ) : (
            <>
              <TextInput
                title={items?.label}
                key={items?.key}
                name={items?.name}
                type={items?.type as any}
                value={formik?.values[items?.name]}
                onChange={(e) => {
                  formik.handleChange(e);
                  if (items?.name === "courseName") {
                    setCourseId(e.target.value);
                  } else if (items?.name === "session") {
                    setSessionId(e.target.value);
                  } else if (items?.name === "batch") {
                    setBatchId(e.target.value);
                  }
                }}
                onBlur={formik.handleBlur}
                options={items?.options}
                size="small"
                fullWidth
                error={Boolean(
                  formik?.touched[items?.name] && formik?.errors[items?.name]
                )}
                helperText={
                  formik?.touched[items?.name] &&
                  (formik?.errors[items?.name] as any)
                }
                styleArea={`${
                  items?.name === "sessionStartYear"
                    ? "col-span-12 md:col-span-6 !w-full"
                    : items?.name === "sessionEndYear"
                    ? "col-span-12 md:col-span-6 !w-full"
                    : "col-span-12 md:col-span-12 !w-full"
                }`}
                styleField="w-full col-span-12 overflow-hidden"
              />
              {items?.name === "nameOfFee" && formik.values.nameOfFee && (
                <TextInput
                  title="Price Before Discount"
                  key="priceBeforeDiscount"
                  name="priceBeforeDiscount"
                  type="text"
                  value={selectedFeeAmount}
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
                  disabled
                />
              )}
            </>
          )
        )}
      </form>
      <div className="w-full flex pt-10 gap-2 px-4 justify-end">
        <Button
          className="shadow-none"
          type="submit"
          onClick={() => formik.handleSubmit()}
          startIcon={<Done />}
          loading={formik?.isSubmitting}
        >
          Save
        </Button>
        <Button
          type="reset"
          onClick={() => formik.resetForm()}
          className={"bg-red-400 shadow-none"}
          startIcon={<RotateLeft />}
        >
          Reset
        </Button>
      </div>
    </div>
  );
};

export default SetStudentFeesForm;
