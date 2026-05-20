import { Close } from "@mui/icons-material";
import IconButton from "@mui/material/IconButton";
import {
  AdminAutocomplete,
  Button,
  CustomAutocomplete,
  CustomDialog,
  InputField,
} from "components/core";
import { useFormik } from "formik";
import { useSWRFetch } from "hooks";
import { useRouter } from "next/router";
import { useDeferredValue, useState } from "react";
import BatchType from "types/batch";
import CourseType from "types/course";
import SessionType from "types/session";
import UserType from "types/user";
import * as Yup from "yup";

type Props = {
  open: boolean;
  closeFn: () => void;
};
type dataType = {
  data: UserType[];
};

type sessionType = {
  data: SessionType[];
};
type courseType = {
  data: CourseType[];
};
type batchType = {
  data: BatchType[];
};

const ReturnBook = ({ open, closeFn }: Props) => {
  const [searchTitle, setSearchTitle] = useState("");
  const [batchTitle, setBatchTitle] = useState("");
  const [courseId, setCourseId] = useState("");
  const [sessionId, setSessionId] = useState("");
  const [batchId, setBatchId] = useState("");
  const searchText = useDeferredValue(searchTitle);
  const { data, isValidating, mutate } = useSWRFetch<dataType>(
    `student?perPage=20&pageNo=1` +
      (searchText ? `&searchTitle=${searchText}` : "") +
      (batchId ? `&batchId=${batchId}` : "") +
      (sessionId ? `&session=${sessionId}` : "") +
      (courseId ? `&course=${courseId}` : "")
  );
  const { data: session } = useSWRFetch<sessionType>(`session`);
  const { data: course } = useSWRFetch<courseType>(`course`);
  const { data: batch } = useSWRFetch<batchType>(
    `batch?course=true&session=true&branch=true&pageNo=1&perPage=20` +
      (batchTitle ? `&searchTitle=${batchTitle}` : "") +
      (sessionId ? `&sessionId=${sessionId}` : "") +
      (courseId ? `&courseId=${courseId}` : "")
  );
  const returnSchema = [
    {
      key: "1",
      name: "user",
      label: "Student Id",
      type: "autocomplete",
      initialValue: "",
      validationSchema: Yup.string().required("Student id is required."),
    },
    {
      key: "2",
      name: "libraryId",
      label: "Enter Library Card Id",
      initialValue: "",
      validationSchema: Yup.string().when("user", {
        is: "",
        then: Yup.string().required("Student Id or Library Id is required."),
        otherwise: Yup.string(),
      }),
      type: "text",
    },
  ];
  const initialValues = returnSchema?.reduce((accumulator, currentValue) => {
    accumulator[currentValue?.name] = currentValue.initialValue;
    return accumulator;
  }, {} as any);

  const validationSchema = returnSchema?.reduce((accumulator, currentValue) => {
    accumulator[currentValue?.name] = currentValue.validationSchema;
    return accumulator;
  }, {} as any);
  const { push } = useRouter();
  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: Yup.object(validationSchema),
    onSubmit: (values) => {
      try {
        push(`/panel/admin/library/student/${values?.user}`);
      } catch (error) {}
    },
  });

  const resetForm = () => {
    setBatchId("");
    setSearchTitle("");
    setSessionId("");
    setCourseId("");
  };

  return (
    <CustomDialog open={open} maxWidth="sm">
      <div className="w-full ">
        <div className="w-full relative">
          <h3 className="font-semibold tracking-wide p-4 text-center text-xl text-theme border-b w-full ">
            Return Books
          </h3>

          <span className="absolute top-0 right-0 p-4">
            <IconButton
              onClick={() => {
                closeFn?.();
                resetForm();
              }}
            >
              <Close />
            </IconButton>
          </span>
        </div>

        <div className="flex flex-col w-full">
          <h3 className="font-medium tracking-wide pt-4 px-4">
            Filter student
          </h3>
          <div className="flex flex-wrap w-full justify-between gap-4 p-4 ">
            <InputField
              label="Session"
              type={"select"}
              name="session"
              mainClass="!gap-2 !w-full md:!w-[31%] lg:!w-[30%]"
              onChange={(e) => setSessionId(e?.target?.value)}
              value={sessionId}
              options={
                session?.data?.map((item) => {
                  return {
                    key: item?._id,
                    label: item?.title,
                    value: item?._id,
                  };
                }) || []
              }
            />
            <InputField
              label="Course"
              type={"select"}
              name="course"
              mainClass="!gap-2 !w-full md:!w-[31%] lg:!w-[30%]"
              onChange={(e) => setCourseId(e?.target?.value)}
              value={courseId}
              options={
                course?.data?.map((item) => {
                  return {
                    key: item?._id,
                    label: item?.title,
                    value: item?._id,
                  };
                }) || []
              }
            />
            <CustomAutocomplete
              onSearchTextChange={(e) => setBatchTitle(e?.target?.value)}
              label="Batch"
              mainClass="!gap-2 !w-full md:!w-[31%] lg:!w-[30%]"
              options={
                batch?.data?.map((item) => {
                  return {
                    key: item?._id,
                    label:
                      item?.course?.title +
                      " " +
                      item?.branch?.title +
                      " " +
                      item?.session?.title,
                    value: item?._id,
                  };
                }) || []
              }
              isOptionEqualToValue={(option, value) =>
                option?.value === value?.value
              }
              onChange={(e, v) => setBatchId(v?.value)}
              value={
                batchId
                  ? {
                      key: batch?.data?.find((item) => item?._id === batchId)
                        ?._id,
                      label:
                        batch?.data?.find((item) => item?._id === batchId)
                          ?.course?.title +
                        " " +
                        batch?.data?.find((item) => item?._id === batchId)
                          ?.branch?.title +
                        " " +
                        batch?.data?.find((item) => item?._id === batchId)
                          ?.session?.title,
                      value: batch?.data?.find((item) => item?._id === batchId)
                        ?._id,
                    }
                  : undefined
              }
              noOptionText="No batch found"
            />
          </div>
        </div>

        <form
          onSubmit={formik?.handleSubmit}
          className="w-full p-4 flex flex-col"
        >
          <CustomAutocomplete
            label={"Enter student "}
            onSearchTextChange={(e) => setSearchTitle(e?.target?.value)}
            onChange={(e, value) => {
              formik?.setFieldValue("user", value?.value);
            }}
            error={Boolean(formik?.touched?.user && formik?.errors?.user)}
            helperText={formik?.touched?.user && (formik?.errors?.user as any)}
            options={data?.data?.map((data) => ({
              label: `${data?.displayName}    ${
                data?.academicDetails?.registrationNumber || ""
              } `,
              value: `${data?._id}`,
              key: `${data?.email}`,
            }))}
            isOptionEqualToValue={(option, value) =>
              option?.value === value?.value
            }
            noOptionText="No Students found"
          />
          {/* <div className="flex items-center gap-4 my-8">
            <span className="flex items-center h-[1px] w-full bg-gray-900/50 "></span>
            <h3 className="font-medium tracking-wide">Or</h3>
            <span className="flex items-center h-[1px] w-full bg-gray-900/50 "></span>
          </div>
          <InputField
            type="text"
            label={"Enter library card"}
            name="libraryId"
            onChange={formik?.handleChange}
            onBlur={formik?.handleBlur}
            error={Boolean(
              formik?.touched?.libraryId && formik?.errors?.libraryId
            )}
            helperText={
              formik?.touched?.libraryId && (formik?.errors?.libraryId as any)
            }
          /> */}
          <div className="flex w-full justify-end pt-8">
            <Button type="submit">Search</Button>
          </div>
        </form>
      </div>
    </CustomDialog>
  );
};

export default ReturnBook;
