import { Add, Done, RotateLeft } from "@mui/icons-material";
import {
  AdminAutocomplete,
  Button,
  CustomDialog,
  TextInput,
} from "components/core";
import { useFormik } from "formik";
import { useFetch, useSWRFetch } from "hooks";
import { useRouter } from "next/router";
import { useState, useMemo, useDeferredValue } from "react";
import { KeyedMutator } from "swr";
import SubjectType from "types/subject";
import UserType from "types/user";
import { notify } from "utils";
import * as Yup from "yup";

type Props = {
  feeName?: string;
  designation?: SubjectType;
  Dmutate: KeyedMutator<any>;
};
type SubjectDataType = {
  data: SubjectType[];
};
type dataType = {
  data: UserType[];
};
const AssignTeacherDialog = ({ feeName, designation, Dmutate }: Props) => {
  const [searchTitle, setSearchTitle] = useState("");

  const searchText = useDeferredValue(searchTitle);

  const { batchId } = useRouter().query;
  const { data: subject } = useSWRFetch<SubjectDataType>("subject");
  const { data } = useSWRFetch<dataType>(
    "user?role=TEACHER&perPage=20&pageNo=1" +
      (searchText ? `&searchTitle=${searchText}` : "")
  );
  const timetableSchema = useMemo(() => {
    return [
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
            label: `${item?.title}`,
            // +
            // "  " +
            // `(${item?.isTheory ? "Theory" : "Lab"})`,
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
    ];
  }, [data?.data, subject?.data]);

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
  const [openDialog, setOpenDialog] = useState(false);
  const { mutate } = useFetch();
  const formik = useFormik({
    enableReinitialize: true,
    initialValues: designation?._id
      ? {
          title: designation?.title,
          subjectCode: designation?.subjectCode,
        }
      : initialValues,
    validationSchema: Yup.object(validationSchema),
    onSubmit: async (values) => {
      try {
        const response = await mutate({
          path: `batch/${batchId}/assign-teacher`,
          method: "POST",
          body: JSON.stringify({
            ...values,
          }),
        });
        if (response?.data?.error) {
          notify.error(response?.data?.error);
          return;
        }
        setOpenDialog(false);
        Dmutate();
        notify.success(response?.data?.message);
        formik?.resetForm();
      } catch (err) {
        console.log(err);
      }
    },
  });

  return (
    <>
      <div className="w-fit">
        <CustomDialog
          open={openDialog}
          onClose={() => setOpenDialog(false)}
          maxWidth="sm"
        >
          <div className="w-full p-4 ">
            <h3 className="font-semibold tracking-wide p-4  text-theme border-b text-2xl text-center">
              Assign Teacher
            </h3>
            <form className="grid grid-cols-12 w-full px-4 gap-4 pt-10">
              {timetableSchema?.map((items) =>
                items?.type === "autocomplete" ? (
                  <div
                    className="col-span-12 md:col-span-12 w-full"
                    key={items?.key}
                  >
                    <AdminAutocomplete
                      className="!text-black !mb-2 "
                      textClassName="!bg-gray-50"
                      size={"medium"}
                      label={items?.label}
                      isOptionEqualToValue={(option, value) =>
                        option?.value === value?.value
                      }
                      onChange={(e, value) => {
                        formik?.setFieldValue(items?.name, value?.value);
                      }}
                      onSearchTextChange={(e) =>
                        setSearchTitle(e?.target?.value)
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
                    //   rows={items?.rows}
                    size="medium"
                    fullWidth
                    //   multiline={items?.multiline}
                    error={Boolean(
                      formik?.touched[items?.name] &&
                        formik?.errors[items?.name]
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
                loading={formik?.isSubmitting}
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
        </CustomDialog>

        <Button
          startIcon={<Add />}
          className="!shadow-none"
          onClick={() => setOpenDialog(true)}
        >
          Assign Teacher
        </Button>
      </div>
    </>
  );
};

export default AssignTeacherDialog;
