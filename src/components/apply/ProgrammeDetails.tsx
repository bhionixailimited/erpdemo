import { ArrowRightAlt, ExitToApp, Preview } from "@mui/icons-material";
import { FormHelperText } from "@mui/material";
import { Button, InputField } from "components/core";
import { useFormik } from "formik";
import { useApplyAuth, useFetch, useSWRFetch } from "hooks";
import { useRouter } from "next/router";
import { useMemo } from "react";
import { IProgramme } from "types/programme";
import { IRegistration } from "types/registeredUser";
import { COUNTRIES, notify } from "utils";
import * as Yup from "yup";

const ProgrammeDetails = ({
  setActiveStep,
}: {
  setActiveStep?: (arg: any) => void;
}) => {
  const { data: programme } = useSWRFetch<{ data: IProgramme[] }>("programme");
  const { mutate } = useFetch();
  const { user, revalidation } = useApplyAuth();
  const router = useRouter();

  const initialValues = useMemo(() => {
    return {
      year: user?.programmeYear || "",
      title: user?.studentTitle || "",
      firstName: user?.studentFirstName || "",
      middleName: user?.studentMiddleName || "",
      lastName: user?.studentLastName || "",
      email: user?.email || "",
      mobileNumber: user?.studentPhoneNumber || "",
      dateOfBirth: user?.studentDateOfBirth
        ? user?.studentDateOfBirth?.split("T")?.[0]
        : "",
      gender: user?.studentGender || "",
      nationality: user?.studentNationality || "",
      bloodGroup: user?.studentBloodGroup || "",
      differentlyAble:
        typeof user?.isDifferentlyAble !== "undefined" ? "YES" : "NO" || "",
      motherTongue: user?.studentMotherTongue || "",
      religion: user?.studentReligion || "",
      medium: user?.studentStudyMedium || "",
      hostelRequired:
        typeof user?.isHostelRequired !== "undefined" ? "YES" : "NO" || "",
      transportRequired:
        typeof user?.isTransportRequired !== "undefined" ? "YES" : "NO" || "",
      programme: user?.programme?._id || "",
      countryCode: user?.countryCode || "91",
      saveAndExit: "false",
    };
  }, [user?._id, programme?.data?.length]);

  const validationSchema = Yup.object({
    programme: Yup.string().required("Programme is required"),
    year: Yup.string().required("Year is required"),
    title: Yup.string().required("Title is required"),
    firstName: Yup.string().required("First name is required"),
    middleName: Yup.string().optional(),
    lastName: Yup.string().required("Last name is required"),
    email: Yup.string().email("Invalid email").required("Email is required"),
    mobileNumber: Yup.string().required("Mobile number is required"),
    dateOfBirth: Yup.string().required("Date of birth is required"),
    gender: Yup.string().required("Gender is required"),
    nationality: Yup.string().required("Nationality is required"),
    bloodGroup: Yup.string().required("Blood group is required"),
    differentlyAble: Yup.string().required("This field is required"),
    motherTongue: Yup.string().required("Mother Tongue is required"),
    religion: Yup.string().required("Religion is required"),
    medium: Yup.string().required("Medium is required"),
    hostelRequired: Yup.string().required("This field is required"),
    transportRequired: Yup.string().required("This field is required"),
    saveAndExit: Yup.string().optional(),
  });

  const formik = useFormik({
    initialValues,
    validationSchema,
    enableReinitialize: true,
    onSubmit: async (values) => {
      try {
        const body = {
          programme: values?.programme,
          programmeYear: values?.year,
          studentTitle: values?.title,
          studentFirstName: values?.firstName,
          studentMiddleName: values?.middleName,
          studentLastName: values?.lastName,
          studentPhoneNumber: values?.mobileNumber,
          countryCode: values?.countryCode,
          studentDateOfBirth: values?.dateOfBirth
            ? new Date(values?.dateOfBirth)
            : undefined,
          studentGender: values?.gender,
          studentNationality: values?.nationality,
          studentBloodGroup: values?.bloodGroup,
          isDifferentlyAble: values?.differentlyAble === "YES",
          studentMotherTongue: values?.motherTongue,
          studentReligion: values?.religion,
          studentStudyMedium: values?.medium,
          isHostelRequired: values?.hostelRequired === "YES",
          isTransportRequired: values?.transportRequired === "YES",
          isApplicationAndProgrammeSubmitted: true,
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
            BASIC DETAILS
          </h3>
          <div className="bg-theme/5 rounded-md shadow-md shadow-gray-400 w-full p-4 flex flex-col gap-4 md:flex-row ">
            <div className="flex flex-col w-full gap-2">
              <h3 className="font-medium tracking-wide text-sm">
                Programmes *
              </h3>
              <InputField
                className="bg-white"
                size="small"
                type="select"
                fullWidth
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.programme}
                name="programme"
                options={programme?.data?.map((programme) => ({
                  key: programme._id,
                  label: programme.title,
                  value: programme._id,
                }))}
              />
              <p className="mt-1">
                {formik?.touched?.programme && formik?.errors?.programme && (
                  <FormHelperText error={true}>
                    {formik?.errors?.programme}
                  </FormHelperText>
                )}
              </p>
            </div>
            <div className="flex flex-col w-full gap-2">
              <h3 className="font-medium tracking-wide text-sm">Year *</h3>
              <InputField
                className="bg-white"
                type="select"
                size="small"
                fullWidth
                name="year"
                disabled={!formik.values.programme}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.year}
                options={
                  formik?.values?.programme
                    ? programme?.data
                        ?.find(
                          (programme) =>
                            programme?._id === formik?.values?.programme
                        )
                        ?.variant?.map((variant) => ({
                          key: variant,
                          label: variant,
                          value: variant,
                        }))
                    : []
                }
              />
              <p className="mt-1">
                {formik?.touched?.year && formik?.errors?.year && (
                  <FormHelperText error={true}>
                    {formik?.errors?.year}
                  </FormHelperText>
                )}
              </p>
            </div>
          </div>
          <div className="w-full border-b-2 border-gray-400 border-dashed h-[1px] "></div>
        </div>
        <div className="flex flex-col mt-8 gap-4 w-full">
          <h3 className="font-medium uppercase tracking-wide text-lg">
            PERSONAL DETAILS
          </h3>
          <div className="bg-theme/5 rounded-md shadow-md shadow-gray-400 w-full p-4  gap-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 ">
            <div className="flex flex-col w-full gap-2">
              <h3 className="font-medium tracking-wide text-sm">Title *</h3>
              <InputField
                className="bg-white"
                size="small"
                type="select"
                fullWidth
                name="title"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.title}
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
              <p className="mt-1">
                {formik?.touched?.title && formik?.errors?.title && (
                  <FormHelperText error={true}>
                    {formik?.errors?.title}
                  </FormHelperText>
                )}
              </p>
            </div>
            <div className="flex flex-col w-full gap-2">
              <h3 className="font-medium tracking-wide text-sm">
                First Name *
              </h3>
              <InputField
                className="bg-white"
                type="text"
                size="small"
                name="firstName"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.firstName}
                fullWidth
              />
              <p className="mt-1">
                {formik?.touched?.firstName && formik?.errors?.firstName && (
                  <FormHelperText error={true}>
                    {formik?.errors?.firstName}
                  </FormHelperText>
                )}
              </p>
            </div>
            <div className="flex flex-col w-full gap-2">
              <h3 className="font-medium tracking-wide text-sm">
                Middle Name{" "}
              </h3>
              <InputField
                className="bg-white"
                type="text"
                size="small"
                fullWidth
                name="middleName"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.middleName}
              />
              <p className="mt-1">
                {formik?.touched?.middleName && formik?.errors?.middleName && (
                  <FormHelperText error={true}>
                    {formik?.errors?.middleName}
                  </FormHelperText>
                )}
              </p>
            </div>
            <div className="flex flex-col w-full gap-2">
              <h3 className="font-medium tracking-wide text-sm">Last Name *</h3>
              <InputField
                className="bg-white"
                type="text"
                size="small"
                fullWidth
                name="lastName"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.lastName}
              />
              <p className="mt-1">
                {formik?.touched?.lastName && formik?.errors?.lastName && (
                  <FormHelperText error={true}>
                    {formik?.errors?.lastName}
                  </FormHelperText>
                )}
              </p>
            </div>
            <div className="flex flex-col w-full gap-2">
              <h3 className="font-medium tracking-wide text-sm">
                Email Address *
              </h3>
              <InputField
                className="bg-white"
                type="email"
                size="small"
                fullWidth
                name="email"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.email}
                disabled
              />
              <p className="mt-1">
                {formik?.touched?.email && formik?.errors?.email && (
                  <FormHelperText error={true}>
                    {formik?.errors?.email}
                  </FormHelperText>
                )}
              </p>
            </div>

            <div className="flex flex-col w-full gap-2">
              <h3 className="font-medium tracking-wide text-sm">
                Phone Number *
              </h3>
              <div className="flex items-center w-full">
                <InputField
                  className="bg-white w-full"
                  type="select"
                  size="small"
                  mainClass="!w-24"
                  name="countryCode"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.countryCode}
                  error={
                    formik.touched?.countryCode &&
                    Boolean(formik.errors?.countryCode)
                  }
                  helperText={
                    (formik.touched?.countryCode &&
                      formik.errors?.countryCode) ||
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
                  name="mobileNumber"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.mobileNumber}
                  error={
                    formik.touched?.mobileNumber &&
                    Boolean(formik.errors?.mobileNumber)
                  }
                  helperText={
                    (formik.touched?.mobileNumber &&
                      formik.errors?.mobileNumber) ||
                    ""
                  }
                />
                <p className="mt-1">
                  {formik?.touched?.mobileNumber &&
                    formik?.errors?.mobileNumber && (
                      <FormHelperText error={true}>
                        {formik?.errors?.mobileNumber}
                      </FormHelperText>
                    )}
                </p>
              </div>
            </div>
            <div className="flex flex-col w-full gap-2">
              <h3 className="font-medium tracking-wide text-sm">
                Date Of Birth *
              </h3>
              <InputField
                className="bg-white"
                type="date"
                size="small"
                fullWidth
                name="dateOfBirth"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.dateOfBirth}
              />
              <p className="mt-1">
                {formik?.touched?.dateOfBirth &&
                  formik?.errors?.dateOfBirth && (
                    <FormHelperText error={true}>
                      {formik?.errors?.dateOfBirth}
                    </FormHelperText>
                  )}
              </p>
            </div>
            <div className="flex flex-col w-full gap-2">
              <h3 className="font-medium tracking-wide text-sm">Gender *</h3>
              <InputField
                className="bg-white"
                type="select"
                size="small"
                fullWidth
                name="gender"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.gender}
                options={[
                  {
                    value: "MALE",
                    label: "Male",
                    key: "1",
                  },
                  {
                    value: "FEMALE",
                    label: "Female",
                    key: "2",
                  },
                  {
                    value: "OTHER",
                    label: "Other",
                    key: "3",
                  },
                ]}
              />
              <p className="mt-1">
                {formik?.touched?.gender && formik?.errors?.gender && (
                  <FormHelperText error={true}>
                    {formik?.errors?.gender}
                  </FormHelperText>
                )}
              </p>
            </div>
            <div className="flex flex-col w-full gap-2">
              <h3 className="font-medium tracking-wide text-sm">
                Nationality *
              </h3>
              <InputField
                className="bg-white"
                type="select"
                size="small"
                fullWidth
                name="nationality"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.nationality}
                options={COUNTRIES?.map((item) => ({
                  value: item.label,
                  label: item.label,
                  key: item.label,
                }))}
              />
              <p className="mt-1">
                {formik?.touched?.nationality &&
                  formik?.errors?.nationality && (
                    <FormHelperText error={true}>
                      {formik?.errors?.nationality}
                    </FormHelperText>
                  )}
              </p>
            </div>
            <div className="flex flex-col w-full gap-2">
              <h3 className="font-medium tracking-wide text-sm">
                Blood Group *
              </h3>
              <InputField
                className="bg-white"
                type="select"
                size="small"
                fullWidth
                name="bloodGroup"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.bloodGroup}
                options={[
                  { key: "1", label: "A+", value: "A+" },
                  { key: "2", label: "A-", value: "A-" },
                  { key: "3", label: "B+", value: "B+" },
                  { key: "4", label: "B-", value: "B-" },
                  { key: "5", label: "AB+", value: "AB+" },
                  { key: "6", label: "AB-", value: "AB-" },
                  { key: "7", label: "O+", value: "O+" },
                  { key: "8", label: "O-", value: "O-" },
                ]}
              />
              <p className="mt-1">
                {formik?.touched?.bloodGroup && formik?.errors?.bloodGroup && (
                  <FormHelperText error={true}>
                    {formik?.errors?.bloodGroup}
                  </FormHelperText>
                )}
              </p>
            </div>
            <div className="flex flex-col w-full gap-2">
              <h3 className="font-medium tracking-wide text-sm">
                Are You Differently Abled? *
              </h3>
              <InputField
                className="bg-white"
                type="select"
                size="small"
                fullWidth
                name="differentlyAble"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.differentlyAble}
                options={[
                  {
                    value: "YES",
                    label: "Yes",
                    key: "1",
                  },
                  {
                    value: "NO",
                    label: "No",
                    key: "2",
                  },
                ]}
              />
              <p className="mt-1">
                {formik?.touched?.differentlyAble &&
                  formik?.errors?.differentlyAble && (
                    <FormHelperText error={true}>
                      {formik?.errors?.differentlyAble}
                    </FormHelperText>
                  )}
              </p>
            </div>
            <div className="flex flex-col w-full gap-2">
              <h3 className="font-medium tracking-wide text-sm">
                Mother Tongue *
              </h3>
              <InputField
                className="bg-white"
                type="select"
                size="small"
                fullWidth
                name="motherTongue"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.motherTongue}
                options={[
                  { key: "1", label: "Hindi", value: "Hindi" },
                  { key: "2", label: "Bengali", value: "Bengali" },
                  { key: "3", label: "Telugu", value: "Telugu" },
                  { key: "4", label: "Marathi", value: "Marathi" },
                  { key: "5", label: "Tamil", value: "Tamil" },
                  { key: "6", label: "Urdu", value: "Urdu" },
                  { key: "7", label: "Gujarati", value: "Gujarati" },
                  { key: "8", label: "Kannada", value: "Kannada" },
                  { key: "9", label: "Odia", value: "Odia" },
                  { key: "10", label: "Punjabi", value: "Punjabi" },
                  { key: "11", label: "Malayalam", value: "Malayalam" },
                  { key: "12", label: "Assamese", value: "Assamese" },
                  { key: "13", label: "Maithili", value: "Maithili" },
                  { key: "14", label: "Santali", value: "Santali" },
                  { key: "15", label: "Kashmiri", value: "Kashmiri" },
                ]}
              />
              <p className="mt-1">
                {formik?.touched?.motherTongue &&
                  formik?.errors?.motherTongue && (
                    <FormHelperText error={true}>
                      {formik?.errors?.motherTongue}
                    </FormHelperText>
                  )}
              </p>
            </div>
            <div className="flex flex-col w-full gap-2">
              <h3 className="font-medium tracking-wide text-sm">Religion *</h3>
              <InputField
                className="bg-white"
                type="select"
                size="small"
                fullWidth
                name="religion"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.religion}
                options={[
                  { key: "1", label: "Hinduism", value: "Hinduism" },
                  { key: "2", label: "Islam", value: "Islam" },
                  { key: "3", label: "Christianity", value: "Christianity" },
                  { key: "4", label: "Sikhism", value: "Sikhism" },
                  { key: "5", label: "Buddhism", value: "Buddhism" },
                  { key: "6", label: "Jainism", value: "Jainism" },
                  {
                    key: "7",
                    label: "Zoroastrianism",
                    value: "Zoroastrianism",
                  },
                  { key: "8", label: "Judaism", value: "Judaism" },
                ]}
              />
              <p className="mt-1">
                {formik?.touched?.religion && formik?.errors?.religion && (
                  <FormHelperText error={true}>
                    {formik?.errors?.religion}
                  </FormHelperText>
                )}
              </p>
            </div>
            <div className="flex flex-col w-full gap-2">
              <h3 className="font-medium tracking-wide text-sm">Medium *</h3>
              <InputField
                className="bg-white"
                type="select"
                size="small"
                fullWidth
                name="medium"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.medium}
                options={[
                  {
                    value: "Hindi",
                    label: "Hindi",
                    key: "1",
                  },
                  {
                    value: "English",
                    label: "English",
                    key: "2",
                  },
                  {
                    value: "Other",
                    label: "Other",
                    key: "3",
                  },
                ]}
              />
              <p className="mt-1">
                {formik?.touched?.medium && formik?.errors?.medium && (
                  <FormHelperText error={true}>
                    {formik?.errors?.medium}
                  </FormHelperText>
                )}
              </p>
            </div>
            <div className="flex flex-col w-full gap-2">
              <h3 className="font-medium tracking-wide text-sm">
                Hostel Required *
              </h3>
              <InputField
                className="bg-white"
                type="select"
                size="small"
                fullWidth
                name="hostelRequired"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.hostelRequired}
                options={[
                  {
                    value: "YES",
                    label: "Yes",
                    key: "1",
                  },
                  {
                    value: "NO",
                    label: "No",
                    key: "2",
                  },
                ]}
              />
              <p className="mt-1">
                {formik?.touched?.hostelRequired &&
                  formik?.errors?.hostelRequired && (
                    <FormHelperText error={true}>
                      {formik?.errors?.hostelRequired}
                    </FormHelperText>
                  )}
              </p>
            </div>
            <div className="flex flex-col w-full gap-2">
              <h3 className="font-medium tracking-wide text-sm">
                Transport Required *
              </h3>
              <InputField
                className="bg-white"
                type="select"
                size="small"
                fullWidth
                name="transportRequired"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.transportRequired}
                options={[
                  {
                    value: "YES",
                    label: "Yes",
                    key: "1",
                  },
                  {
                    value: "NO",
                    label: "No",
                    key: "2",
                  },
                ]}
              />
              <p className="mt-1">
                {formik?.touched?.transportRequired &&
                  formik?.errors?.transportRequired && (
                    <FormHelperText error={true}>
                      {formik?.errors?.transportRequired}
                    </FormHelperText>
                  )}
              </p>
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
            {formik.isSubmitting ? "Loading..." : "Make Payment"}
          </Button>
        </div>
      </div>
    </section>
  );
};

export default ProgrammeDetails;
