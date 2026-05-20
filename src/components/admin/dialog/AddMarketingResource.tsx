import { Add, Close, Done, RotateLeft } from "@mui/icons-material";
import { Avatar, FormHelperText, IconButton } from "@mui/material";
import { FileIcon } from "assets/static-icon";

import {
  Button,
  CustomDialog,
  InputField,
  TextInput,
  UploadFile,
} from "components/core";
import dayjs from "dayjs";
import { useFormik } from "formik";
import { useFetch } from "hooks";
import { useRef, useState } from "react";

import { autoAddFormdata, notify } from "utils";
import * as Yup from "yup";

const timetableSchema = [
  {
    key: 0,
    name: "photo",
    type: "file",
    initialValues: "",
  },
  {
    key: 1,
    name: "nameOfResourcePerson",
    label: "Name *",
    initialValues: "",
    type: "text",
    validationSchema: Yup.string().required("Name is required"),
  },
  {
    key: 2,
    name: "exportEmailId",
    label: "Email",
    initialValues: "",
    disabled: true,
    type: "text",
    validationSchema: Yup.string().email("Valid email is required"),
  },
  {
    key: 3,
    name: "mobileNo",
    label: "Phone Number",
    initialValues: "",
    type: "number",
    // validationSchema: Yup.string()
    //   // .required("Phone Number is required")
    //   .min(10, "Minimum 10 digits required"),
    validationSchema: Yup.number()
      .optional()
      .integer("Value must be an integer")
      .min(10, "Value must be non-negative"),
  },
  {
    key: 1,
    name: "nameOfOrganization",
    label: "Name Of Organization",
    initialValues: "",
    type: "text",
    // validationSchema: Yup.string().required("Designation is required"),
  },

  {
    key: 1,
    name: "profile",
    label: "Profile",
    initialValues: "",
    type: "text",
    // validationSchema: Yup.string().required("Profile is required"),
  },
  {
    key: "9",
    name: "subjectExport",
    label: "Subject / Expert",
    initialValue: "Industry",
    validationSchema: Yup.string().optional(),
    type: "select",
    options: [
      {
        key: 1,
        label: "Industry",
        value: "Industry",
      },
      {
        key: 2,
        label: "Start-up",
        value: "Start-Up",
      },
      {
        key: 3,
        label: "Academic",
        value: "Academic",
      },
      {
        key: 4,
        label: "NGO",
        value: "NGO",
      },
      {
        key: 5,
        label: "Corporate",
        value: "Corporate",
      },
    ],
  },
  {
    key: "9i",
    name: "organizationType",
    label: "Organization Type",
    initialValue: "SCHOOL",
    validationSchema: Yup.string().optional(),
    type: "select",
    options: [
      {
        key: 1,
        label: "School",
        value: "SCHOOL",
      },
      {
        key: 2,
        label: "College",
        value: "COLLEGE",
      },
      {
        key: 3,
        label: "Coaching Classes",
        value: "COACHING CLASSES",
      },
    ],
  },
  {
    key: "9ii",
    name: "personDesignation",
    label: "Person Designation",
    initialValue: "DIRECTOR",
    validationSchema: Yup.string().optional(),
    type: "select",
    options: [
      {
        key: 1,
        label: "Director",
        value: "DIRECTOR",
      },
      {
        key: 2,
        label: "Principal",
        value: "PRINCIPAL",
      },
      {
        key: 3,
        label: "Manager",
        value: "MANAGER",
      },
      {
        key: 4,
        label: "Teacher",
        value: "TEACHER",
      },
    ],
  },
  {
    key: 1,
    name: "addedByWhom",
    label: "Added By Whom",
    initialValues: "",
    type: "text",
    // validationSchema: Yup.string().required("Designation is required"),
  },
];

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
const AddMarketingResourcePersonDialog = ({
  mutate,
}: {
  mutate?: () => void;
}) => {
  const { mutate: addVehicle } = useFetch();
  const [openDialog, setOpenDialog] = useState(false);
  const [value, setValue] = useState("");
  const upload_picture = useRef<any>();
  const onButtonPress = () => {
    upload_picture?.current && upload_picture?.current?.click();
  };
  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: Yup.object(validationSchema),
    onSubmit: async (values) => {
      var formdata = new FormData();
      value && formdata.append("image", value);
      try {
        const response = await addVehicle({
          path: `marketing-person-resource`,
          method: "POST",
          body: autoAddFormdata({
            ...values,
          }),
          isFormData: true,
        });

        if (response?.data?.error) {
          notify.error(response?.data?.error);
          return;
        }
        setOpenDialog(false);
        setValue("");
        formik?.resetForm();
        mutate?.();
        notify.success(response?.data?.message);
      } catch (err) {
        console.log(err);
      }
    },
  });

  return (
    <div className="w-fit">
      <CustomDialog
        open={openDialog}
        onClose={() => setOpenDialog(false)}
        maxWidth="md"
      >
        <div className="w-full p-4 ">
          <h3 className="font-semibold tracking-wide p-4  text-theme border-b text-2xl text-center">
            Add Marketing Resource Person
          </h3>
          <form className="grid grid-cols-12 w-full px-4 gap-4 pt-10">
            {timetableSchema?.map((items: any, i) =>
              items?.name === "photo" ? (
                <>
                  <div className={"w-full col-span-12"}>
                    <div className="flex items-center justify-center">
                      <div className="flex relative w-32 h-32">
                        <img
                          className="w-28 bg-white h-28 rounded-full object-contain shadow-[0_8px_30px_rgb(0,0,0,0.12)]"
                          src={
                            (formik.values.photo &&
                              (typeof formik.values.photo === "string"
                                ? formik.values.photo
                                : URL.createObjectURL(
                                    formik?.values?.photo
                                  ))) ||
                            "https://www.getillustrations.com/photos/pack/3d-avatar-male_lg.png"
                            // singleUser?.data?.photoUrl === isImage
                            //   ? singleUser?.data?.photoUrl
                            //   : isImage !== singleUser?.data?.photoUrl
                            //   ? URL?.createObjectURL(isImage)
                            //   : "https://www.getillustrations.com/photos/pack/3d-avatar-male_lg.png"
                          }
                          alt="logo"
                        />
                        <div
                          className="absolute bottom-4 right-4 cursor-pointer h-8 flex items-center justify-center rounded-full w-8 text-white bg-gray-500"
                          onClick={onButtonPress}
                        >
                          <Add />
                        </div>
                      </div>
                    </div>
                    <input
                      ref={upload_picture}
                      type="file"
                      className="opacity-0"
                      onChange={(e: any) => {
                        formik.setFieldValue("photo", e.target.files[0]);
                      }}
                    />
                  </div>
                </>
              ) : (
                <TextInput
                  title={items?.label}
                  key={items?.key}
                  name={items?.name}
                  type={
                    items?.type as
                      | "number"
                      | "text"
                      | "date"
                      | "select"
                      | "file"
                      | "email"
                      | "month"
                  }
                  value={formik?.values[items?.name]}
                  onChange={formik.handleChange}
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
                  styleArea={`${"col-span-12 md:col-span-6 !w-full"}`}
                  styleField="w-full col-span-12 overflow-hidden"
                />
              )
            )}
          </form>
          <div className="w-full flex pt-10 gap-2 px-4 justify-center">
            <Button
              loading={formik.isSubmitting}
              className="shadow-none"
              type="submit"
              onClick={() => formik.handleSubmit()}
              startIcon={<Done />}
            >
              Save
            </Button>
          </div>
        </div>
      </CustomDialog>

      <Button startIcon={<Add />} onClick={() => setOpenDialog(true)}>
        Add Marketing Resource Person
      </Button>
    </div>
  );
};

export default AddMarketingResourcePersonDialog;
