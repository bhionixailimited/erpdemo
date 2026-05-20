import { ArrowRightAlt, ExitToApp } from "@mui/icons-material";
import { Button, InputField } from "components/core";
import { useFormik } from "formik";
import { useApplyAuth, useFetch } from "hooks";
import { useRouter } from "next/router";
import { useMemo } from "react";
import { COUNTRIES, notify } from "utils";
import * as Yup from "yup";

const ParentDetails = ({
  setActiveStep,
}: {
  setActiveStep?: (arg: any) => void;
}) => {
  const { mutate } = useFetch();
  const { user, revalidation } = useApplyAuth();
  const router = useRouter();

  const initialValues = useMemo(() => {
    return {
      fatherTitle: user?.fatherTitle || "",
      fatherName: user?.fatherName || "",
      motherTitle: user?.motherTitle || "",
      motherName: user?.motherName || "",
      guardianName: user?.guardianName || "",
      guardianEmail: user?.guardianEmail || "",
      guardianMobileNumber: user?.guardianMobileNumber || "",
      guardianRelation: user?.guardianRelationWithCandidate || "",
      guardianCountry: user?.guardianCountry || "",
      guardianAddressOne: user?.guardianAddressLine1 || "",
      guardianAddressTwo: user?.guardianAddressLine2 || "",
      guardianPincode: user?.guardianPinCode || "",
      guardianMobileNumberCode: user?.guardianMobileCountryCode || "91",
      saveAndExit: "false",
    };
  }, [user?._id]);

  const validationSchema = Yup.object({
    fatherTitle: Yup.string().required("Title is required"),
    fatherName: Yup.string().required("Name is required"),
    motherTitle: Yup.string().required("Title is required"),
    motherName: Yup.string().required("Name is required"),
    guardianName: Yup.string().optional(),
    guardianEmail: Yup.string().optional(),
    guardianMobileNumber: Yup.string().optional(),
    guardianRelation: Yup.string().optional(),
    guardianCountry: Yup.string().required("Country is required"),
    guardianAddressOne: Yup.string().required("Address Line 1 is required"),
    guardianPincode: Yup.string().required("Pincode is required"),
    guardianAddressTwo: Yup.string().optional(),
    guardianMobileNumberCode: Yup.string().required(
      "Mobile Number Code is required"
    ),
    saveAndExit: Yup.string().optional(),
  });

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: async (values) => {
      try {
        const body = {
          fatherTitle: values?.fatherTitle,
          fatherName: values?.fatherName,
          motherTitle: values?.motherTitle,
          motherName: values?.motherName,
          guardianName: values?.guardianName,
          guardianEmail: values?.guardianEmail,
          guardianMobileCountryCode: values?.guardianMobileNumberCode,
          guardianMobileNumber: values?.guardianMobileNumber,
          guardianRelationWithCandidate: values?.guardianRelation,
          guardianCountry: values?.guardianCountry,
          guardianAddressLine1: values?.fatherTitle,
          guardianAddressLine2: values?.guardianAddressTwo,
          guardianPinCode: values?.guardianPincode,
          isParentDetailsSubmitted: true,
        };

        const response = await mutate({
          path: `registration/${user?._id}`,
          method: "PUT",
          body: JSON.stringify(body),
        });
        if (response?.data?.error) throw new Error(response?.data?.error);
        notify.success(response?.data?.message);
        revalidation();
        if (values?.saveAndExit === "true") {
          return router.push("/apply");
        } else {
          setActiveStep?.((prev: number) => prev + 1);
        }
        // setActiveStep?.((prev: number) => prev + 1);
      } catch (error) {
        notify.error(
          error instanceof Error ? error.message : "Something went wrong"
        );
      }
    },
  });
  // console.log("formik:", formik);
  return (
    <section className="w-full bg-white">
      <div className="w-full main-container">
        <div className="flex flex-col mt-8 gap-4 w-full">
          <h3 className="font-medium uppercase tracking-wide text-lg">
            FATHER{"'"}S DETAILS
          </h3>
          <div className="bg-theme/5 rounded-md shadow-md shadow-gray-400 w-full p-4 flex flex-col gap-4 md:flex-row ">
            <div className="flex flex-col w-full gap-2">
              <h3 className="font-medium tracking-wide text-sm">
                Father{"'"}s Title *
              </h3>
              <InputField
                className="bg-white"
                size="small"
                type="select"
                fullWidth
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.fatherTitle}
                name="fatherTitle"
                error={
                  formik.touched?.fatherTitle &&
                  Boolean(formik.errors?.fatherTitle)
                }
                helperText={
                  (formik.touched.fatherTitle && formik.errors.fatherTitle) ||
                  ""
                }
                options={[
                  { key: "1", label: "Shri", value: "Shri" },
                  { key: "2", label: "Smt.", value: "Smt." },
                  { key: "3", label: "Dr.", value: "Dr." },
                  { key: "4", label: "Lt.", value: "Lt." },
                  { key: "5", label: "Col.", value: "Col." },
                  { key: "6", label: "Capt.", value: "Capt." },
                  { key: "7", label: "Prof.", value: "Prof." },
                  { key: "8", label: "Justice", value: "Justice" },
                  {
                    key: "9",
                    label: "His/Her Excellency",
                    value: "His/Her Excellency",
                  },
                  {
                    key: "10",
                    label: "His/Her Highness",
                    value: "His/Her Highness",
                  },
                ]}
              />
            </div>
            <div className="flex flex-col w-full gap-2">
              <h3 className="font-medium tracking-wide text-sm">
                Father{"'"}s Name *
              </h3>
              <InputField
                className="bg-white"
                type="text"
                size="small"
                fullWidth
                name="fatherName"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.fatherName}
                error={
                  formik.touched?.fatherName &&
                  Boolean(formik.errors?.fatherName)
                }
                helperText={
                  (formik.touched?.fatherName && formik.errors?.fatherName) ||
                  ""
                }
              />
            </div>
          </div>
          <div className="w-full border-b-2 border-gray-400 border-dashed h-[1px] "></div>
        </div>
        <div className="flex flex-col mt-8 gap-4 w-full">
          <h3 className="font-medium uppercase tracking-wide text-lg">
            MOTHER{"'"}S DETAILS
          </h3>
          <div className="bg-theme/5 rounded-md shadow-md shadow-gray-400 w-full p-4 flex flex-col gap-4 md:flex-row ">
            <div className="flex flex-col w-full gap-2">
              <h3 className="font-medium tracking-wide text-sm">
                Mother{"'"}s Title *
              </h3>
              <InputField
                className="bg-white"
                size="small"
                type="select"
                fullWidth
                name="motherTitle"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.motherTitle}
                error={
                  formik.touched?.motherTitle &&
                  Boolean(formik.errors?.motherTitle)
                }
                helperText={
                  (formik.touched?.motherTitle && formik.errors?.motherTitle) ||
                  ""
                }
                options={[
                  { key: "1", label: "Shri", value: "Shri" },
                  { key: "2", label: "Smt.", value: "Smt." },
                  { key: "3", label: "Dr.", value: "Dr." },
                  { key: "4", label: "Lt.", value: "Lt." },
                  { key: "5", label: "Col.", value: "Col." },
                  { key: "6", label: "Capt.", value: "Capt." },
                  { key: "7", label: "Prof.", value: "Prof." },
                  { key: "8", label: "Justice", value: "Justice" },
                  {
                    key: "9",
                    label: "His/Her Excellency",
                    value: "His/Her Excellency",
                  },
                  {
                    key: "10",
                    label: "His/Her Highness",
                    value: "His/Her Highness",
                  },
                ]}
              />
            </div>
            <div className="flex flex-col w-full gap-2">
              <h3 className="font-medium tracking-wide text-sm">
                Mother{"'"}s Name *
              </h3>
              <InputField
                className="bg-white"
                type="text"
                size="small"
                fullWidth
                name="motherName"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.motherName}
                error={
                  formik.touched?.motherName &&
                  Boolean(formik.errors?.motherName)
                }
                helperText={
                  (formik.touched?.motherName && formik.errors?.motherName) ||
                  ""
                }
              />
            </div>
          </div>
          <div className="w-full border-b-2 border-gray-400 border-dashed h-[1px] "></div>
        </div>
        <div className="flex flex-col mt-8 gap-4 w-full">
          <h3 className="font-medium uppercase tracking-wide text-lg">
            GUARDIAN DETAILS
          </h3>
          <div className="bg-theme/5 rounded-md shadow-md shadow-gray-400 w-full p-4  gap-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3  ">
            <div className="flex flex-col w-full gap-2">
              <h3 className="font-medium tracking-wide text-sm">
                Guardian Name
              </h3>
              <InputField
                className="bg-white"
                size="small"
                type="text"
                fullWidth
                name="guardianName"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.guardianName}
                error={
                  formik.touched?.guardianName &&
                  Boolean(formik.errors?.guardianName)
                }
                helperText={
                  (formik.touched?.guardianName &&
                    formik.errors?.guardianName) ||
                  ""
                }
              />
            </div>
            <div className="flex flex-col w-full gap-2">
              <h3 className="font-medium tracking-wide text-sm">
                Guardian Email
              </h3>
              <InputField
                className="bg-white"
                type="text"
                size="small"
                name="guardianEmail"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.guardianEmail}
                error={
                  formik.touched?.guardianEmail &&
                  Boolean(formik.errors?.guardianEmail)
                }
                helperText={
                  (formik.touched?.guardianEmail &&
                    formik.errors?.guardianEmail) ||
                  ""
                }
                fullWidth
              />
            </div>
            <div className="flex flex-col w-full gap-2">
              <h3 className="font-medium tracking-wide text-sm">
                Guardian Mobile Number
              </h3>
              <div className="flex items-center w-full">
                <InputField
                  className="bg-white w-full"
                  type="select"
                  size="small"
                  mainClass="!w-24"
                  name="guardianMobileNumberCode"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.guardianMobileNumberCode}
                  error={
                    formik.touched?.guardianMobileNumberCode &&
                    Boolean(formik.errors?.guardianMobileNumberCode)
                  }
                  helperText={
                    (formik.touched?.guardianMobileNumberCode &&
                      formik.errors?.guardianMobileNumberCode) ||
                    ""
                  }
                  options={COUNTRIES?.map((item) => {
                    return {
                      key: item?.code,
                      label: `+${item?.phone}`,
                      value: item?.phone,
                    };
                  })}
                />
                <InputField
                  className="bg-white"
                  type="text"
                  size="small"
                  fullWidth
                  name="guardianMobileNumber"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.guardianMobileNumber}
                  error={
                    formik.touched?.guardianMobileNumber &&
                    Boolean(formik.errors?.guardianMobileNumber)
                  }
                  helperText={
                    (formik.touched?.guardianMobileNumber &&
                      formik.errors?.guardianMobileNumber) ||
                    ""
                  }
                />
              </div>
            </div>
            <div className="flex flex-col w-full gap-2">
              <h3 className="font-medium tracking-wide text-sm">
                Relation with candidate
              </h3>
              <InputField
                className="bg-white"
                type="select"
                size="small"
                fullWidth
                name="guardianRelation"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.guardianRelation}
                error={
                  formik.touched?.guardianRelation &&
                  Boolean(formik.errors?.guardianRelation)
                }
                helperText={
                  (formik.touched?.guardianRelation &&
                    formik.errors?.guardianRelation) ||
                  ""
                }
                options={[
                  {
                    key: "1",
                    label: "Father",
                    value: "Father",
                  },
                  {
                    key: "2",
                    label: "Mother",
                    value: "Mother",
                  },
                  {
                    key: "3",
                    label: "Step father",
                    value: "Step father",
                  },
                  {
                    key: "4",
                    label: "Step mother",
                    value: "Step mother",
                  },
                  {
                    key: "5",
                    label: "Grand parent",
                    value: "Grand parent",
                  },
                  {
                    key: "6",
                    label: "Uncle/Aunt",
                    value: "Uncle/Aunt",
                  },
                  {
                    key: "7",
                    label: "Legal Guardian",
                    value: "Legal Guardian",
                  },
                  {
                    key: "8",
                    label: "Siblings",
                    value: "Siblings",
                  },
                  {
                    key: "9",
                    label: "Other",
                    value: "Other",
                  },
                ]}
              />
            </div>
          </div>
        </div>
        <div className="flex flex-col mt-8 gap-4 w-full">
          <h3 className="font-medium uppercase tracking-wide text-lg">
            GUARDIAN ADDRESS
          </h3>
          <div className="bg-theme/5 rounded-md shadow-md shadow-gray-400 w-full p-4  gap-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3  ">
            <div className="flex flex-col w-full gap-2">
              <h3 className="font-medium tracking-wide text-sm">Country *</h3>
              <InputField
                className="bg-white"
                size="small"
                type="select"
                name="guardianCountry"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.guardianCountry}
                fullWidth
                error={
                  formik.touched?.guardianCountry &&
                  Boolean(formik.errors?.guardianCountry)
                }
                helperText={
                  (formik.touched?.guardianCountry &&
                    formik.errors?.guardianCountry) ||
                  ""
                }
                options={COUNTRIES?.map((item) => {
                  return {
                    key: item?.code,
                    label: item?.label,
                    value: item?.label,
                  };
                })}
              />
            </div>
            <div className="flex flex-col w-full gap-2">
              <h3 className="font-medium tracking-wide text-sm">
                Address Lane 1 *
              </h3>
              <InputField
                className="bg-white"
                type="text"
                size="small"
                name="guardianAddressOne"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.guardianAddressOne}
                error={
                  formik.touched?.guardianAddressOne &&
                  Boolean(formik.errors?.guardianAddressOne)
                }
                helperText={
                  (formik.touched?.guardianAddressOne &&
                    formik.errors?.guardianAddressOne) ||
                  ""
                }
                fullWidth
              />
            </div>
            <div className="flex flex-col w-full gap-2">
              <h3 className="font-medium tracking-wide text-sm">
                Address Lane 2
              </h3>
              <InputField
                className="bg-white"
                type="text"
                size="small"
                fullWidth
                name="guardianAddressTwo"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.guardianAddressTwo}
                error={
                  formik.touched?.guardianAddressTwo &&
                  Boolean(formik.errors?.guardianAddressTwo)
                }
                helperText={
                  (formik.touched?.guardianAddressTwo &&
                    formik.errors?.guardianAddressTwo) ||
                  ""
                }
              />
            </div>
            <div className="flex flex-col w-full gap-2">
              <h3 className="font-medium tracking-wide text-sm">Pincode *</h3>
              <InputField
                className="bg-white"
                type="text"
                size="small"
                fullWidth
                name="guardianPincode"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.guardianPincode}
                error={
                  formik.touched?.guardianPincode &&
                  Boolean(formik.errors?.guardianPincode)
                }
                helperText={
                  (formik.touched?.guardianPincode &&
                    formik.errors?.guardianPincode) ||
                  ""
                }
              />
            </div>
          </div>
        </div>
        <div className="w-full bg-theme/5 rounded-md shadow-md shadow-gray-400 mt-10  p-4 flex items-center gap-4 justify-between">
          <Button
            type="submit"
            onClick={() => {
              formik?.setFieldValue("saveAndExit", "true");
              formik?.handleSubmit();
            }}
            startIcon={<ExitToApp />}
          >
            Save and Exit
          </Button>
          <Button
            type="submit"
            disabled={formik.isSubmitting}
            endIcon={<ArrowRightAlt />}
            onClick={() => {
              formik?.setFieldValue("saveAndExit", "false");
              formik?.handleSubmit();
            }}
          >
            {formik.isSubmitting ? "Loading..." : "Next"}
          </Button>
        </div>
      </div>
    </section>
  );
};

export default ParentDetails;
