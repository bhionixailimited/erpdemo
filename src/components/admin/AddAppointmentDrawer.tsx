import { Add, Done, RotateLeft } from "@mui/icons-material";
import { Button, CustomDrawer, TextInput } from "components/core";
import { useAuth, useFetch, useSWRFetch } from "hooks";
import { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { notify } from "utils";
import DepartmentType from "types/department";
import AppointmentType from "types/appointment";

type dataType = {
  data: DepartmentType[];
};

type appointmentType = {
  data: AppointmentType;
};
const AddAppointmentDrawer = ({ open, onClose, Dmutate, feeName }: any) => {
  const [openDrawer, setOpenDrawer] = useState(false);
  const { data: appointment, mutate: appointmentMutate } =
    useSWRFetch<appointmentType>(`appointment`);
  const { user } = useAuth();

  const appointmentDetailsSchema = [
    {
      key: "1",
      name: "name",
      label: "Name *",
      initialValue: "",
      type: "text",
      validationSchema: Yup.string().required("Name is required"),
    },
    {
      key: "2",
      name: "phoneNumber",
      label: "Phone Number *",
      initialValue: "",
      type: "number",
      validationSchema: Yup.string().required("Phone Number is required"),
    },
    {
      key: "3",
      name: "whomToMeet",
      label: "Whom to meet *",
      initialValue: "",
      type: "text",
      validationSchema: Yup.string().required("Whom to meet is required"),
    },
    {
      key: "4",
      name: "timeOfAppointment",
      label: "Time of appointment *",
      initialValue: "",
      type: "date",
      validationSchema: Yup.string().required("Appointment date is required"),
    },
    {
      key: "5",
      name: "passType",
      label: "Pass Type *",
      initialValue: "",
      type: "select",
      validationSchema: Yup.string().required("Pass Type is required"),
      options: [
        { key: "03", label: "Normal", value: "Normal" },
        {
          key: "01",
          label: "Inventory Gate Pass",
          value: "InventoryGatePass",
        },
        {
          key: "02",
          label: "Admission Gate Pass",
          value: "AdmissionGatePass",
        },
      ],
    },
    {
      key: "6",
      name: "reason",
      label: "Reason *",
      initialValue: "",
      type: "text",
      validationSchema: Yup.string().required("Reason is required"),
      multiline: true,
      rows: 3,
    },
  ];

  const initialValues = appointmentDetailsSchema?.reduce(
    (accumulator, currentValue) => {
      accumulator[currentValue?.name] = currentValue?.initialValue;
      return accumulator;
    },
    {} as any
  );

  const validationSchema = appointmentDetailsSchema?.reduce(
    (accumulator, currentValue) => {
      accumulator[currentValue?.name] = currentValue?.validationSchema;
      return accumulator;
    },
    {} as any
  );
  const { mutate } = useFetch();

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: open
      ? {
          ...appointment?.data,
          name: appointment?.data?.name,
          phoneNumber: appointment?.data?.phoneNumber,
          whomToMeet: appointment?.data?.whomToMeet,
          timeOfAppointment:
            appointment?.data?.timeOfAppointment?.split("T")[0],
          passType: appointment?.data?.passType,
          reason: appointment?.data?.reason,
        }
      : initialValues,
    validationSchema: Yup.object(validationSchema),
    onSubmit: async (values) => {
      // console.log(values);
      try {
        const response = await mutate({
          path: "appointment",
          method: "POST",
          body: JSON.stringify({
            ...values,
            instituteId: user?.instituteId?._id || user?.instituteId,
            timeOfAppointment: new Date(
              values?.timeOfAppointment
            )?.toISOString(),
          }),
        });
        if (response?.status !== 200) throw new Error(response?.data?.message);
        notify.success(response?.data?.message);
        formik?.resetForm();
        setOpenDrawer(false);
        Dmutate();
      } catch (err) {
        if (err instanceof Error) notify.error(err.message);
        notify.error("Something went wrong");
      }
    },
  });

  return (
    <>
      <div>
        <CustomDrawer
          open={openDrawer}
          onClose={() => setOpenDrawer(false)}
          anchor="right"
          maxWidth="md"
          width="40vw"
        >
          <div className="w-full p-4 ">
            <h3 className="font-semibold tracking-wide p-4  text-theme border-b text-2xl text-center">
              {feeName} Appointment
            </h3>
            <form className="grid grid-cols-12 w-full px-4 gap-4 pt-10">
              {appointmentDetailsSchema?.map((items: any) => (
                <>
                  <TextInput
                    title={items?.label}
                    key={items?.key}
                    name={items?.name}
                    type={items?.type as any}
                    value={formik?.values[items?.name]}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    options={items?.options}
                    fullWidth
                    error={Boolean(
                      formik?.touched[items?.name] &&
                        formik?.errors[items?.name]
                    )}
                    helperText={
                      formik?.touched[items?.name] &&
                      (formik?.errors[items?.name] as any)
                    }
                    styleArea={`${`col-span-12 ${
                      items?.name === "reason" || items?.name === "passType"
                        ? `md:col-span-12`
                        : `md:col-span-6`
                    } !w-full`}`}
                    styleField="w-full col-span-12 overflow-hidden"
                    // inputProps={{
                    //   min: new Date().toISOString().split("T")[0],
                    // }}
                    multiline={items?.multiline}
                    rows={items?.rows}
                  />
                </>
              ))}
              {/* {feeName !== "Edit" && (
                <div className=" col-span-12 flex flex-col mt-3 justify-center items-center">
                  <AddAdmissionDocumentDialog
                    documents={documents}
                    setDocuments={setDocuments}
                  />
                </div>
              )} */}
            </form>
            <div className="w-full flex pt-10 gap-2 px-4 justify-end">
              <Button
                className="shadow-none"
                type="submit"
                onClick={() => formik.handleSubmit()}
                startIcon={<Done />}
                loading={formik.isSubmitting}
                // disabled
              >
                Save
              </Button>
              <Button
                type="reset"
                onClick={() => {
                  formik.resetForm();
                }}
                className={"bg-red-400 shadow-none"}
                startIcon={<RotateLeft />}
              >
                Reset
              </Button>
            </div>
          </div>
        </CustomDrawer>
        {feeName === "Add" && (
          <Button
            className={"!text-2xl !shadow-none mt-4"}
            startIcon={<Add />}
            onClick={() => setOpenDrawer(true)}
            // disabled
          >
            Add Appointment
          </Button>
        )}
      </div>
    </>
  );
};

export default AddAppointmentDrawer;
