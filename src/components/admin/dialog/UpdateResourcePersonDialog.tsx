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
import { useFetch, useSWRFetch } from "hooks";
import { useRef, useState } from "react";
import RESOURCE_PERSON_TYPE from "types/resourcePerson";

import { autoAddFormdata, notify } from "utils";
import * as Yup from "yup";
interface Props {
  open: boolean;
  resourcePersonId?: string;
  handleClose: () => void;
  mainMutate?: () => void;
}

const UpdateResourcePersonDialog = ({
  open,
  handleClose,
  resourcePersonId,
  mainMutate,
}: Props) => {
  const { mutate: addVehicle } = useFetch();
  const [openDialog, setOpenDialog] = useState(false);
  const [value, setValue] = useState("");
  const upload_picture = useRef<any>();
  const onButtonPress = () => {
    upload_picture?.current && upload_picture?.current?.click();
  };
  const { data, isValidating, mutate } = useSWRFetch<any>(
    `person-resource/${resourcePersonId}`
  );
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
      validationSchema: Yup.string().email("Email is required"),
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
        .integer("Value must be an integer")
        .min(10, "Minimum 10 digits required and non negative")
        .optional(),
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
      name: "designation",
      label: "Designation",
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
          value: "INDUSTRY",
          label: "Industry",
        },
        {
          key: 2,
          value: "START-UP",
          label: "Start-Up",
        },
        {
          key: 3,
          value: "ACADEMIC",
          label: "Academic",
        },
        {
          key: 4,
          value: "NGO",
          label: "NGO",
        },
        {
          key: 5,
          value: "CORPORATE",
          label: "Corporate",
        },
      ],
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
  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      ...initialValues,
      nameOfResourcePerson: data?.data?.nameOfResourcePerson
        ? data?.data?.nameOfResourcePerson
        : "",
      designation: data?.data?.designation ? data?.data?.designation : "",
      nameOfOrganization: data?.data?.nameOfOrganization
        ? data?.data?.nameOfOrganization
        : "",
      subjectExport: data?.data?.subjectExport ? data?.data?.subjectExport : "",
      exportEmailId: data?.data?.exportEmailId ? data?.data?.exportEmailId : "",
      mobileNo: data?.data?.mobileNo ? data?.data?.mobileNo : "",
      profile: data?.data?.profile ? data?.data?.profile : "",
      photo: data?.data?.photoUrl ? data?.data?.photoUrl : "",
    },
    validationSchema: Yup.object(validationSchema),
    onSubmit: async (values) => {
      var formdata = new FormData();
      formdata.append("nameOfResourcePerson", values?.nameOfResourcePerson);
      formdata.append("designation", values?.designation);
      formdata.append("nameOfOrganization", values?.nameOfOrganization);
      formdata.append("subjectExport", values?.subjectExport);
      formdata.append("exportEmailId", values?.exportEmailId);
      formdata.append("mobileNo", values?.mobileNo);
      formdata.append("profile", values?.profile);
      formdata.append("photo", values?.photo);

      try {
        const response = await addVehicle({
          path: `person-resource/${resourcePersonId}`,
          method: "PUT",
          body: formdata,
          isFormData: true,
        });

        if (response?.data?.error) {
          notify.error(response?.data?.error);
          return;
        }
        setOpenDialog(false);
        setValue("");
        formik?.resetForm();
        mainMutate?.();
        notify.success(response?.data?.message);
      } catch (err) {
        console.log(err);
      }
    },
  });
  return (
    <div className="w-fit">
      <CustomDialog open={open} onClose={handleClose} maxWidth="md">
        <div className="w-full p-4 ">
          <h3 className="font-semibold tracking-wide p-4  text-theme border-b text-2xl text-center">
            Update Resource Person
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
          <div className="w-full flex pt-10 gap-2 px-4 justify-end">
            <Button
              loading={formik.isSubmitting}
              className="shadow-none"
              type="submit"
              onClick={() => formik.handleSubmit()}
              startIcon={<Done />}
            >
              Update
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
    </div>
  );
};

export default UpdateResourcePersonDialog;
