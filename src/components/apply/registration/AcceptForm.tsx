import { Close } from "@mui/icons-material";
import {
  Button,
  Container,
  Drawer,
  FormControl,
  FormHelperText,
  MenuItem,
  Select,
} from "@mui/material";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useFetch, useSWRFetch } from "hooks";
import { useMemo, useState } from "react";
import { notify } from "utils";

type Props = {
  open?: boolean | any;
  onClose: () => void;
  data: any;
  // setAcceptData: any;
  //   mutate: () => void;
};

const AcceptForm = ({ open, onClose, data }: Props) => {
  const [selectedMethod, setSelectedMethod] = useState();
  const { mutate } = useFetch();

  const handleMethodChange = (method: any) => {
    setSelectedMethod(method);
  };
  const [isInstituteId, setIsInstituteId] = useState<string>("");
  const {
    data: instituteData,
    isValidating,
    mutate: userMutate,
  } = useSWRFetch<any>(`institute`);
  const {
    data: courseData,
    isValidating: validatingCourse,
    mutate: mutateCourse,
  } = useSWRFetch<any>(`course?instituteId=${isInstituteId}`);

  const {
    data: sessionData,
    isValidating: validatingSession,
    mutate: mutateSession,
  } = useSWRFetch<any>(`session?instituteId=${isInstituteId}`);

  const initialValues = useMemo(() => {
    return {
      instituteId: "",
      courseName: "",
      branchName: "",
      session: "",
    };
  }, []);
  const validationSchema = Yup.object({
    instituteId: Yup.string().optional(),
    courseName: Yup.string().optional(),
    branchName: Yup.string().optional(),
    session: Yup.string().optional(),
  });
  const formik = useFormik({
    initialValues,
    validationSchema,
    enableReinitialize: true,
    onSubmit: async (values) => {
      // console.log(values);
      // return;
      try {
        const body = {
          instituteId: values?.instituteId,
          course: values?.courseName,
          branch: values?.branchName,
          session: values?.session,
        };

        const response = await mutate({
          path: `registration/change-status/${data?.data?._id}`,
          method: "POST",
          body: JSON.stringify(body),
        });
        if (response?.data?.error) throw new Error(response?.data?.error);
        notify.success(response?.data?.message);
        // revalidation();
        // setActiveStep?.((prev: number) => prev + 1);
      } catch (error) {
        notify.error(
          error instanceof Error ? error.message : "Something went wrong"
        );
      }
    },
  });

  const {
    data: branchData,
    isValidating: validatingBranch,
    mutate: mutateBranch,
  } = useSWRFetch<any>(
    `branch?instituteId=${isInstituteId}` +
      (formik?.values?.courseName
        ? `&course=${formik?.values?.courseName}`
        : "")
  );

  return (
    <Drawer anchor="right" open={open} onClose={() => onClose && onClose()}>
      <Container
        style={{
          width: "30vw",
          marginTop: "3vh",
        }}
      >
        <div className="w-full flex items-center">
          <div
            className="basis-[20%] cursor-pointer"
            onClick={() => onClose && onClose()}
          >
            <Close className="text-3xl" />
          </div>
          <div className="basis-[80%] text-center mr-20">
            <h1 className="text-3xl font-bold text-primary">Details</h1>
          </div>
        </div>
        <form onSubmit={formik.handleSubmit}>
          <section className="mt-16">
            <FormControl className="mb-4" fullWidth>
              <label className="text-xl font-semibold text-primary">
                Institute Name
              </label>

              <Select>
                {instituteData?.data?.map((item: any) => (
                  <MenuItem
                    key={item?._id}
                    value={item?.instituteName}
                    onClick={() => {
                      formik.setFieldValue("instituteId", item?._id);
                      setIsInstituteId(item?._id);
                    }}
                  >
                    {item?.instituteName}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <p>
              {" "}
              {formik?.touched?.instituteId && formik?.errors?.instituteId && (
                <FormHelperText error={true}>
                  {formik?.errors?.instituteId}
                </FormHelperText>
              )}
            </p>

            <FormControl className="mb-4" fullWidth>
              <label className="text-xl font-semibold text-primary">
                Course Name
              </label>
              <Select
                value={formik?.values?.courseName}
                onChange={(e) =>
                  formik.setFieldValue("courseName", e.target.value)
                }
              >
                {courseData?.data?.map((item: any) => (
                  <MenuItem key={item?._id} value={item?._id}>
                    {item?.title}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <p>
              {" "}
              {formik?.touched?.courseName && formik?.errors?.courseName && (
                <FormHelperText error={true}>
                  {formik?.errors?.courseName}
                </FormHelperText>
              )}
            </p>

            <FormControl className="mb-4" fullWidth>
              <label className="text-xl font-semibold text-primary">
                Branch Name
              </label>
              <Select
                value={formik?.values?.branchName}
                onChange={(e) =>
                  formik.setFieldValue("branchName", e.target.value)
                }
              >
                {branchData?.data?.map((item: any) => (
                  <MenuItem key={item?._id} value={item?._id}>
                    {item?.title}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <p>
              {" "}
              {formik?.touched?.branchName && formik?.errors?.branchName && (
                <FormHelperText error={true}>
                  {formik?.errors?.branchName}
                </FormHelperText>
              )}
            </p>

            <FormControl className="mb-4" fullWidth>
              <label className="text-xl font-semibold text-primary">
                Session
              </label>
              <Select
                value={formik?.values?.session}
                onChange={(e) =>
                  formik.setFieldValue("session", e.target.value)
                }
              >
                {sessionData?.data?.map((item: any) => (
                  <MenuItem key={item?._id} value={item?._id}>
                    {item?.title}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <p>
              {" "}
              {formik?.touched?.session && formik?.errors?.session && (
                <FormHelperText error={true}>
                  {formik?.errors?.session}
                </FormHelperText>
              )}
            </p>
            <div className="mt-6">
              <Button
                variant="contained"
                size="large"
                style={{ backgroundColor: "green" }}
                type="submit"
              >
                {formik.isSubmitting ? "LOADING..." : "SAVE"}
              </Button>
            </div>
          </section>
        </form>
      </Container>
    </Drawer>
  );
};

export default AcceptForm;
