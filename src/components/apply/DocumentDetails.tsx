import { ArrowRightAlt, ExitToApp, Preview } from "@mui/icons-material";
import { Checkbox, FormHelperText } from "@mui/material";
import { Button, InputField } from "components/core";
import dayjs from "dayjs";
import { useFormik } from "formik";
import { useApplyAuth, useFetch } from "hooks";
import { useMemo } from "react";
import { autoAddFormdata, notify } from "utils";
import * as Yup from "yup";
const DocumentDetails = ({
  setActiveStep,
}: {
  setActiveStep?: (arg: any) => void;
}) => {
  const { mutate } = useFetch();
  const { user, revalidation } = useApplyAuth();
  // console.log("user:-->", user?.clickAgree);
  const initialValues = useMemo(() => {
    return {
      uploadPhoto: "",
      uploadSignature: "",
      parentPhoto: "",
      parentSignature: "",
      xMarkSheet: "",
      xiiMarkSheet: "",
      uploadAadhar: "",
      graduationMarkSheet: "",
      pgResult: "",
      entranceExamScoreboard: [],
      applicantName: user?.applicantName || "",
      parentName: user?.applicantParentName || "",
      date: user?.dateOfApplication
        ? new Date(user?.dateOfApplication as any).toISOString().slice(0, 10)
        : "",
      clickAgree: user?.clickAgree || "",
      isSubmitting: false,
    };
  }, [user?._id]);

  const validationSchema = Yup.object({
    uploadPhoto: Yup.string().required("Passport size photo is required"),
    uploadSignature: Yup.string().required("Signature is required"),
    parentPhoto: Yup.string().required(
      "Parent passport size photo is required"
    ),
    parentSignature: Yup.string().required("Parent signature is required"),
    xMarkSheet: Yup.string().required("X mark sheet is required"),
    xiiMarkSheet: Yup.string().required("XII mark sheet is required"),
    uploadAadhar: Yup.string().required("Aadhar card is required"),
    graduationMarkSheet: Yup.string().required(
      "Graduation mark sheet is required"
    ),
    pgResult: Yup.string().required("PG result is required"),
    // entranceExamScoreboard: Yup.string().required(
    //   "Entrance exam scoreboard is required"
    // ),
    entranceExamScoreboard: Yup.array()
      .min(
        3,
        "Please upload at least  1 to 3 files for the Entrance Exam Scoreboard"
      )
      .required("Entrance Exam Scoreboard is required"),
    applicantName: Yup.string().required("Applicant name is required"),
    parentName: Yup.string().required("Parent name is required"),
    date: Yup.string().required("Date is required"),
    // clickAgree: Yup.string().required("Please mark the application"),
    clickAgree: Yup.string()
      .oneOf(["true"], "Please agree to the declaration")
      .required("Please agree to the declaration"),
    isSubmitting: Yup.boolean().optional(),
  });

  const handleFileChange = (e: any, fieldName: any) => {
    const files = e.target.files;
    const fileArray = files ? Array.from(files) : [];

    if (fileArray.length > 3) {
      // Limit the number of selected files to 3
      notify.error("You can select up to 3 files only.");
      return;
    }

    formik.setFieldValue(fieldName, fileArray);
  };
  const formik = useFormik({
    initialValues,
    validationSchema,
    enableReinitialize: true,
    onSubmit: async (values) => {
      console.log(values);
      // return;
      try {
        const body = {
          pgResult: values?.pgResult, //1
          graduationMarkSheet: values?.graduationMarkSheet, //2
          aadharCard: values?.uploadAadhar, //3
          xiithMarkSheet: values?.xiiMarkSheet, //4
          xthMarkSheet: values?.xMarkSheet, //5
          parentSignature: values?.parentSignature, //6
          parentImage: values?.parentPhoto, //7
          signatureImage: values?.uploadSignature, //8
          passportPhoto: values?.uploadPhoto, //9
          // entranceExamResult: values?.entranceExamScoreboard, //10
          entranceExamResult: Array.from(values?.entranceExamScoreboard), //10
          dateOfApplication: values?.date, //11
          applicantParentName: values?.parentName, //12
          applicantName: values?.applicantName, //13
          clickAgree: values?.clickAgree,
          isDocumentsSubmitted: true,
        };

        const response = await mutate({
          path: `registration/${user?._id}`,
          method: "PUT",
          body: autoAddFormdata(body),
          isFormData: true,
        });

        let submitresponse;

        if (values?.isSubmitting) {
          submitresponse = await mutate({
            path: `registration/submit`,
            method: "POST",
            isFormData: true,
          });
        }

        if (response?.data?.error) throw new Error(response?.data?.error);
        if (submitresponse?.data?.error)
          throw new Error(submitresponse?.data?.error);
        notify.success("Registration successfully submitted");
        revalidation();
        // setActiveStep?.((prev: number) => prev + 1);
      } catch (error) {
        notify.error(
          error instanceof Error ? error.message : "Something went wrong"
        );
      }

      // setActiveStep?.((prev: number) => prev + 1);
    },
  });
  const handleClickAgree = () => {
    if (formik?.values?.clickAgree === "true") {
      formik?.setFieldValue("clickAgree", "false");
    } else {
      formik?.setFieldValue("clickAgree", "true");
    }
  };
  console.log("formik docu:", formik);
  return (
    <section className="w-full bg-white">
      <div className="w-full main-container">
        <div className="flex flex-col mt-8 gap-4 w-full">
          <h3 className="font-medium uppercase tracking-wide text-lg">
            UPLOAD FILES
          </h3>
        </div>
        <form onSubmit={formik.handleSubmit}>
          <div className="bg-theme/5 rounded-md shadow-md shadow-gray-400 w-full p-4  gap-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3  ">
            <div className="flex flex-col w-full gap-2">
              <h3 className="font-medium tracking-wide text-sm">
                Upload Your Passport Size Photo*
              </h3>
              <InputField
                className="bg-white"
                size="small"
                type="native-file"
                fullWidth
                name="uploadPhoto"
                inputProps={{
                  accept: "image/png, image/gif, image/jpeg",
                }}
                // onChange={formik.handleChange}
                onChange={(e) =>
                  formik.setFieldValue("uploadPhoto", e?.target?.files?.[0])
                }
                onBlur={formik.handleBlur}
                error={
                  formik.touched.uploadPhoto &&
                  Boolean(formik.errors.uploadPhoto)
                }
                helperText={
                  (formik.touched.uploadPhoto && formik.errors.uploadPhoto) ||
                  ""
                }
              />
            </div>
            <div className="flex flex-col w-full gap-2">
              <h3 className="font-medium tracking-wide text-sm">
                Upload Your Signature*
              </h3>
              <InputField
                className="bg-white"
                size="small"
                type="native-file"
                fullWidth
                name="uploadSignature"
                inputProps={{
                  accept: "image/png, image/gif, image/jpeg",
                }}
                onChange={(e) =>
                  formik.setFieldValue("uploadSignature", e?.target?.files?.[0])
                }
                onBlur={formik.handleBlur}
                // value={formik.values.uploadSignature}
                error={
                  formik.touched.uploadSignature &&
                  Boolean(formik.errors.uploadSignature)
                }
                helperText={
                  (formik.touched.uploadSignature &&
                    formik.errors.uploadSignature) ||
                  ""
                }
              />
            </div>
            <div className="flex flex-col w-full gap-2">
              <h3 className="font-medium tracking-wide text-sm">
                Parents Photograph*
              </h3>
              <InputField
                className="bg-white"
                size="small"
                type="native-file"
                fullWidth
                name="parentPhoto"
                inputProps={{
                  accept: "image/png, image/gif, image/jpeg",
                }}
                onChange={(e) =>
                  formik.setFieldValue("parentPhoto", e?.target?.files?.[0])
                }
                onBlur={formik.handleBlur}
                // value={formik.values.parentPhoto}
                error={
                  formik.touched.parentPhoto &&
                  Boolean(formik.errors.parentPhoto)
                }
                helperText={
                  (formik.touched.parentPhoto && formik.errors.parentPhoto) ||
                  ""
                }
              />
            </div>
            <div className="flex flex-col w-full gap-2">
              <h3 className="font-medium tracking-wide text-sm">
                Parents Signature*
              </h3>
              <InputField
                className="bg-white"
                size="small"
                type="native-file"
                fullWidth
                name="parentSignature"
                inputProps={{
                  accept: "image/png, image/gif, image/jpeg",
                }}
                onChange={(e) =>
                  formik.setFieldValue("parentSignature", e?.target?.files?.[0])
                }
                onBlur={formik.handleBlur}
                // value={formik.values.parentSignature}
                error={
                  formik.touched.parentSignature &&
                  Boolean(formik.errors.parentSignature)
                }
                helperText={
                  (formik.touched.parentSignature &&
                    formik.errors.parentSignature) ||
                  ""
                }
              />
            </div>
            <div className="flex flex-col w-full gap-2">
              <h3 className="font-medium tracking-wide text-sm">
                Upload Your Xth Marksheet*
              </h3>
              <InputField
                className="bg-white"
                size="small"
                type="native-file"
                fullWidth
                name="xMarkSheet"
                inputProps={{
                  accept: "image/png, image/gif, image/jpeg",
                }}
                onChange={(e) =>
                  formik.setFieldValue("xMarkSheet", e?.target?.files?.[0])
                }
                onBlur={formik.handleBlur}
                // value={formik.values.xMarkSheet}
                error={
                  formik.touched.xMarkSheet && Boolean(formik.errors.xMarkSheet)
                }
                helperText={
                  (formik.touched.xMarkSheet && formik.errors.xMarkSheet) || ""
                }
              />
            </div>
            <div className="flex flex-col w-full gap-2">
              <h3 className="font-medium tracking-wide text-sm">
                Upload Your XII Marksheet*
              </h3>
              <InputField
                className="bg-white"
                size="small"
                type="native-file"
                fullWidth
                name="xiiMarkSheet"
                inputProps={{
                  accept: "image/png, image/gif, image/jpeg",
                }}
                onChange={(e) =>
                  formik.setFieldValue("xiiMarkSheet", e?.target?.files?.[0])
                }
                onBlur={formik.handleBlur}
                // value={formik.values.xiiMarkSheet}
                error={
                  formik.touched.xiiMarkSheet &&
                  Boolean(formik.errors.xiiMarkSheet)
                }
                helperText={
                  (formik.touched.xiiMarkSheet && formik.errors.xiiMarkSheet) ||
                  ""
                }
              />
            </div>
            <div className="flex flex-col w-full gap-2">
              <h3 className="font-medium tracking-wide text-sm">
                Upload Your Aadhar Card*
              </h3>
              <InputField
                className="bg-white"
                size="small"
                type="native-file"
                fullWidth
                name="uploadAadhar"
                inputProps={{
                  accept: "image/png, image/gif, image/jpeg",
                }}
                onChange={(e) =>
                  formik.setFieldValue("uploadAadhar", e?.target?.files?.[0])
                }
                onBlur={formik.handleBlur}
                // value={formik.values.uploadAadhar}
                error={
                  formik.touched.uploadAadhar &&
                  Boolean(formik.errors.uploadAadhar)
                }
                helperText={
                  (formik.touched.uploadAadhar && formik.errors.uploadAadhar) ||
                  ""
                }
              />
            </div>
            <div className="flex flex-col w-full gap-2">
              <h3 className="font-medium tracking-wide text-sm">
                Upload Your Graduation Marksheet*
              </h3>
              <InputField
                className="bg-white"
                size="small"
                type="native-file"
                fullWidth
                name="graduationMarkSheet"
                inputProps={{
                  accept: "image/png, image/gif, image/jpeg",
                }}
                onBlur={formik.handleBlur}
                onChange={(e) =>
                  formik.setFieldValue(
                    "graduationMarkSheet",
                    e?.target?.files?.[0]
                  )
                }
                // value={formik.values.graduationMarkSheet}
                error={
                  formik.touched.graduationMarkSheet &&
                  Boolean(formik.errors.graduationMarkSheet)
                }
                helperText={
                  (formik.touched.graduationMarkSheet &&
                    formik.errors.graduationMarkSheet) ||
                  ""
                }
              />
            </div>
            <div className="flex flex-col w-full gap-2">
              <h3 className="font-medium tracking-wide text-sm">
                Upload Your PG Result*
              </h3>
              <InputField
                className="bg-white"
                size="small"
                type="native-file"
                fullWidth
                name="pgResult"
                inputProps={{
                  accept: "image/png, image/gif, image/jpeg",
                }}
                onChange={(e) =>
                  formik.setFieldValue("pgResult", e?.target?.files?.[0])
                }
                onBlur={formik.handleBlur}
                // value={formik.values.pgResult}
                error={
                  formik.touched.pgResult && Boolean(formik.errors.pgResult)
                }
                helperText={
                  (formik.touched.pgResult && formik.errors.pgResult) || ""
                }
              />
            </div>
            <div className="flex flex-col w-full gap-2">
              <h3 className="font-medium tracking-wide text-sm">
                Upload Your Entrance Exam Scoreboard*
              </h3>
              <InputField
                className="bg-white"
                size="small"
                type="native-file"
                fullWidth
                name="entranceExamScoreboard"
                inputProps={{
                  accept: "image/png, image/gif, image/jpeg",
                  multiple: true,
                }}
                // onChange={(e) => {
                //   const files = e?.target?.files;
                //   formik.setFieldValue(
                //     "entranceExamScoreboard",
                //     files ? Array.from(files) : []
                //   );
                // }}
                onChange={(e) => handleFileChange(e, "entranceExamScoreboard")}
                onBlur={formik.handleBlur}
                error={
                  formik.touched.entranceExamScoreboard &&
                  Boolean(formik.errors.entranceExamScoreboard)
                }
                helperText={
                  String(
                    formik.touched.entranceExamScoreboard &&
                      formik.errors.entranceExamScoreboard
                  ) || ""
                }
              />
            </div>
          </div>
          <div className="flex flex-col mt-8 gap-4 w-full">
            <h3 className="font-medium uppercase tracking-wide text-lg">
              DECLARATION
            </h3>
            <div className="bg-theme/5 rounded-md shadow-md shadow-gray-400 w-full p-4  gap-4 grid grid-cols-2  ">
              <div className="flex flex-col w-full col-span-2 gap-2">
                <h3 className="font-medium tracking-wide text-sm">
                  I hereby declare that the entries made by me in the
                  Application Form are complete and true to the best of my
                  knowledge, belief and information. I acknowledge that the
                  college has the authority for taking punitive actions against
                  me for violation or non-compliance of the same *
                </h3>
                <div className="w-full flex items-center">
                  {/* {console.log(formik?.values?.clickAgree === "true")} */}
                  <Checkbox
                    // defaultChecked
                    checked={formik?.values?.clickAgree === "true"}
                    onClick={handleClickAgree}
                  />
                  <small>I Agree</small>
                </div>
                <p className="-mt-3">
                  {formik?.touched?.clickAgree &&
                    formik?.errors?.clickAgree && (
                      <FormHelperText error={true}>
                        {formik?.errors?.clickAgree}
                      </FormHelperText>
                    )}
                </p>
              </div>
              <div className="flex flex-col col-span-2 md:col-span-1 w-full gap-2">
                <h3 className="font-medium tracking-wide text-sm">
                  Applicant Name *
                </h3>
                <InputField
                  className="bg-white"
                  type="text"
                  size="small"
                  name="applicantName"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.applicantName}
                  fullWidth
                  error={
                    formik.touched.applicantName &&
                    Boolean(formik.errors.applicantName)
                  }
                  helperText={
                    (formik.touched.applicantName &&
                      formik.errors.applicantName) ||
                    ""
                  }
                />
              </div>
              <div className="flex flex-col col-span-2 md:col-span-1 w-full gap-2">
                <h3 className="font-medium tracking-wide text-sm">
                  Parent Name *
                </h3>
                <InputField
                  className="bg-white"
                  type="text"
                  size="small"
                  fullWidth
                  name="parentName"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.parentName}
                  error={
                    formik.touched.parentName &&
                    Boolean(formik.errors.parentName)
                  }
                  helperText={
                    (formik.touched.parentName && formik.errors.parentName) ||
                    ""
                  }
                />
              </div>
              <div className="flex flex-col col-span-2 md:col-span-1 w-full gap-2">
                <h3 className="font-medium tracking-wide text-sm">Date *</h3>
                <InputField
                  className="bg-white"
                  type="date"
                  size="small"
                  fullWidth
                  name="date"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.date}
                  error={formik.touched.date && Boolean(formik.errors.date)}
                  helperText={(formik.touched.date && formik.errors.date) || ""}
                />
              </div>
            </div>
          </div>
          <div className="w-full bg-theme/5 rounded-md shadow-md shadow-gray-400 mt-10  p-4 flex items-center gap-4 justify-between">
            <div className="flex items-center gap-4">
              <Button
                onClick={() => setActiveStep?.((prev: number) => prev - 1)}
              >
                Back
              </Button>
              <Button
                disabled={formik.isSubmitting}
                onClick={() => formik?.handleSubmit()}
              >
                Save and Exit
              </Button>
            </div>
            <div className="flex items-center gap-4">
              <Button>Preview</Button>

              <Button
                type="button"
                disabled={formik.isSubmitting}
                onClick={() => {
                  formik.setFieldValue("isSubmitting", true);
                  formik?.handleSubmit();
                }}
              >
                {formik.isSubmitting ? "Loading..." : "Submit Application"}
              </Button>
            </div>
          </div>
        </form>
      </div>
    </section>
  );
};

export default DocumentDetails;
