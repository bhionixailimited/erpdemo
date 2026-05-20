import { Add } from "@mui/icons-material";
import { IconButton } from "@mui/material";
import {
  AdminAutocomplete,
  Button,
  CustomDialog,
  InputField,
} from "components/core";
import dayjs from "dayjs";
import { useFormik } from "formik";
import { useFetch, useSWRFetch } from "hooks";
import { useRouter } from "next/router";
import { useDeferredValue, useMemo, useState } from "react";
import SubjectType from "types/subject";
import UserType from "types/user";
import { notify } from "utils";
import * as Yup from "yup";
type SubjectDataType = {
  data: SubjectType[];
};
type dataType = {
  data: UserType[];
};
const AddTimetableDrawer = ({
  day,
  handleRefetch,
  selectBatchSectionName,
}: any) => {
  const [searchTitle, setSearchTitle] = useState("");
  const searchText = useDeferredValue(searchTitle);
  const { batchId } = useRouter().query;
  const { mutate: AddT } = useFetch();
  const { data: subject } = useSWRFetch<SubjectDataType>(
    `subject?perPage=20&pageNo=1` +
      (searchText ? `&searchTitle=${searchText}` : "")
  );
  const { data } = useSWRFetch<dataType>(
    `user?role=TEACHER&perPage=20&pageNo=1` +
      (searchText ? `&searchTitle=${searchText}` : "")
  );
  const timetableSchema = useMemo(() => {
    return [
      {
        key: "1",
        name: "startTime",
        label: "Start Time *",
        initialValue: dayjs(),
        validationSchema: Yup.string().required("Start Time is required."),
        type: "time",
      },
      {
        key: "2",
        name: "endTime",
        label: "End Time *",
        initialValue: dayjs(),
        validationSchema: Yup.string().required("End Time is required."),
        type: "time",
      },
      {
        key: "3",
        name: "subject",
        label: "Choose Subject *",
        initialValue: "",
        validationSchema: Yup.string().required("Subject is required."),
        type: "select",
        options: subject?.data?.map((item) => {
          return {
            key: item?._id,
            label: item?.title,
            value: item?._id,
          };
        }) || [
          {
            key: "1",
            label: "No subject",
            value: "",
          },
        ],
      },
      {
        key: "4",
        name: "teacher",
        label: "Assign Teacher *",
        initialValue: "",
        validationSchema: Yup.string().required("Teacher is required."),
        type: "autocomplete",
        options: data?.data?.map((data: any) => ({
          label: `${data?.displayName} (${data?.email})`,
          value: `${data?._id}`,
          key: `${data?._id}`,
        })),
      },
      {
        key: "cxv1",
        name: "classRoom",
        label: "Enter Class Room ",
        initialValue: "",
        // validationSchema: Yup.string().required("Class room is required."),
        type: "text",
      },
    ];
  }, [data?.data, subject?.data]);

  const initialValues = timetableSchema?.reduce(
    (accumulator: any, currentValue) => {
      accumulator[currentValue?.name] = currentValue.initialValue;
      return accumulator;
    },
    {}
  );
  const validationSchema = timetableSchema.reduce(
    (accumulator: any, currentValue) => {
      accumulator[currentValue?.name] = currentValue.validationSchema;
      return accumulator;
    },
    {}
  );
  const [openDialog, setOpenDialog] = useState(false);

  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: Yup.object(validationSchema),
    onSubmit: async (values) => {
      try {
        const response = await AddT({
          path: `batch/timetable/${batchId}`,
          method: "POST",
          body: JSON.stringify({
            ...values,
            startTime: new Date(
              new Date().getFullYear(),
              new Date(
                new Date().setDate(
                  new Date().getDate() + (day - new Date().getDay())
                )
              ).getMonth(),
              new Date(
                new Date().setDate(
                  new Date().getDate() + (day - new Date().getDay())
                )
              ).getDate(),
              Number(`${values?.startTime}`.split(":")[0]),
              Number(`${values?.startTime}`.split(":")[1])
            ).toISOString(),
            endTime: new Date(
              new Date().getFullYear(),
              new Date(
                new Date().setDate(
                  new Date().getDate() + (day - new Date().getDay())
                )
              ).getMonth(),
              new Date(
                new Date().setDate(
                  new Date().getDate() + (day - new Date().getDay())
                )
              ).getDate(),
              Number(`${values?.endTime}`.split(":")[0]),
              Number(`${values?.endTime}`.split(":")[1])
            ).toISOString(),
            section: selectBatchSectionName,
          }),
        });

        if (response?.data?.error) {
          notify.error(response?.data?.error);
          return;
        }
        setOpenDialog(false);
        handleRefetch?.();
        notify.success(response?.data?.message);
        formik?.resetForm();
      } catch (err) {
        console.log(err);
      }
    },
  });

  return (
    <div className="w-fit">
      <CustomDialog open={openDialog} onClose={() => setOpenDialog(false)}>
        <div className="w-full flex flex-col  ">
          <h3 className="font-semibold tracking-wide p-4  text-theme border-b text-2xl text-center">
            Create Timetable
          </h3>

          <form
            className="flex flex-col gap-4 p-4 "
            onSubmit={formik?.handleSubmit}
          >
            {timetableSchema?.map((item) =>
              item?.type === "autocomplete" ? (
                <div
                  className="col-span-12 md:col-span-6 w-full"
                  key={item?.key}
                >
                  <AdminAutocomplete
                    className="!text-black !mb-2 "
                    textClassName="!bg-gray-50"
                    size={"medium"}
                    label={item?.label}
                    isOptionEqualToValue={(option, value) =>
                      option?.value === value?.value
                    }
                    onChange={(e, value) => {
                      formik?.setFieldValue(item?.name, value?.value);
                    }}
                    onSearchTextChange={(e) => setSearchTitle(e?.target?.value)}
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
                    options={item?.options}
                  />
                </div>
              ) : (
                <InputField
                  key={item?.key}
                  name={item?.name}
                  onChange={formik?.handleChange}
                  onBlur={formik?.handleBlur}
                  options={item?.options}
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
              )
            )}
            <div className="flex items-center justify-center">
              <Button
                className="hover:ring-theme"
                loading={formik.isSubmitting}
              >
                Create Timetable
              </Button>
            </div>
          </form>
        </div>
      </CustomDialog>

      <IconButton onClick={() => setOpenDialog(true)}>
        <Add className="text-white text-4xl" />
      </IconButton>
    </div>
  );
};

export default AddTimetableDrawer;
