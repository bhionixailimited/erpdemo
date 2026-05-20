import { Add, Done, Edit, RotateLeft } from "@mui/icons-material";
import { Tooltip } from "@mui/material";
import {
  Button,
  CustomAutocomplete,
  CustomDrawer,
  TextInput,
} from "components/core";
import { useFetch, useSWRFetch } from "hooks";
import { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { autoAddFormdata, notify } from "utils";
import DepartmentType from "types/department";
import { AddAdmissionDocumentDialog, AddGuestDialog } from "./dialog";
import { EventType, GuestType } from "types/event";

type dataType = {
  data: DepartmentType[];
};
type eventType = {
  data: EventType;
};
const AddEventDrawer = ({
  open,
  onClose,
  Dmutate,
  feeName,
  eventType,
}: any) => {
  const [openDrawer, setOpenDrawer] = useState(false);
  const { mutate: department } = useFetch();
  const { data } = useSWRFetch<dataType>(`department`);
  const { data: mou, mutate: mouMutate } = useSWRFetch<eventType>(
    open && `event/${open}`
  );

  const [documents, setDocuments] = useState<Document[]>([]);
  const [guests, setGuests] = useState<GuestType[]>([]);
  const mouDetailsSchema = [
    {
      key: "1",
      name: "title",
      label: "Title*",
      initialValue: "",
      type: "text",
      validationSchema: Yup.string().required("Title is required"),
    },
    {
      key: "6",
      name: "description",
      label: "Description",
      initialValue: "",
      type: "text",
      validationSchema: Yup.string().optional(),
      multiline: true,
      rows: 5,
    },
    {
      key: "2",
      name: "eventDate",
      label: "Event Date",
      initialValue: "",
      type: "date",
      validationSchema: Yup.date().optional(),
    },

    {
      key: "3",
      name: "venue",
      label: "Venue",
      initialValue: "",
      type: "text",
      validationSchema: Yup.string().optional(),
    },
  ];

  const initialValues = mouDetailsSchema?.reduce(
    (accumulator, currentValue) => {
      accumulator[currentValue?.name] = currentValue?.initialValue;
      return accumulator;
    },
    {} as any
  );

  const validationSchema = mouDetailsSchema?.reduce(
    (accumulator, currentValue) => {
      accumulator[currentValue?.name] = currentValue?.validationSchema;
      return accumulator;
    },
    {} as any
  );

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: open
      ? {
          ...mou?.data,
          // includeDepartment: mou?.data?.includeDepartment?._id,
          eventDate: mou?.data?.eventDate?.split("T")[0],
        }
      : initialValues,
    validationSchema: Yup.object(validationSchema),
    onSubmit: async (values) => {
      let formData = autoAddFormdata({
        ...values,
        title: values?.title,
        description: values?.description && values?.description,
        venue: values?.venue && values?.venue,
        eventDate:
          values?.eventDate && new Date(values?.eventDate).toISOString(),
        eventType: eventType,
      });
      formData.delete("guests");
      feeName !== "Edit" &&
        guests?.length &&
        formData.append(`guests`, JSON.stringify(guests));

      feeName !== "Edit" &&
        documents?.forEach((doc: any) =>
          formData.append(Object.keys(doc)[0], Object.values(doc)[0] as any)
        );
      try {
        const response = await department({
          path: feeName === "Edit" ? `event/${open}` : `event/create`,
          method: feeName === "Edit" ? "PUT" : "POST",
          body: formData,
          isFormData: true,
        });
        if (response?.data?.error) {
          notify.error(response?.data?.error);
          return;
        }
        setOpenDrawer(false);
        formik?.resetForm();
        Dmutate();
        mouMutate();
        setDocuments([]);
        setGuests([]);
        notify.success(response?.data?.message);
      } catch (err) {
        console.log(err);
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
              {feeName} Event
            </h3>
            <form className="grid grid-cols-12 w-full px-4 gap-4 pt-10">
              {mouDetailsSchema?.map((items: any) => (
                <>
                  {items?.type === "autoComplete" ? (
                    <div className="col-span-12 text-theme  ">
                      <CustomAutocomplete
                        label={"Choose Department*"}
                        value={
                          data?.data
                            ?.filter(
                              (i) => i?._id === formik?.values[items?.name]
                            )
                            ?.map((item) => {
                              return {
                                key: item?._id,
                                label: item?.title,
                                value: item?._id,
                              };
                            })?.[0] || {
                            key: " ",
                            label: " ",
                            value: " ",
                          }
                        }
                        onChange={(e, value) => {
                          formik?.setFieldValue(
                            "includeDepartment",
                            value?.value
                          );
                        }}
                        error={Boolean(
                          formik?.touched?.includeDepartment &&
                            formik?.errors?.includedDepartment
                        )}
                        helperText={
                          formik?.touched?.includeDepartment &&
                          (formik?.errors?.includeDepartment as any)
                        }
                        options={items?.options}
                        isOptionEqualToValue={(option, value) =>
                          option?.value === value?.value
                        }
                        noOptionText="No departnment found"
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
                      // rows={items?.rows}
                      //   size="small"
                      fullWidth
                      // multiline={items?.multiline}
                      error={Boolean(
                        formik?.touched[items?.name] &&
                          formik?.errors[items?.name]
                      )}
                      helperText={
                        formik?.touched[items?.name] &&
                        (formik?.errors[items?.name] as any)
                      }
                      styleArea={`${
                        // items?.multiline
                        //   ? "col-span-12 md:col-span-12 !w-full"
                        //   :
                        `col-span-12 ${
                          items?.name === "description"
                            ? `md:col-span-12`
                            : `md:col-span-12`
                        } !w-full`
                      }`}
                      styleField="w-full col-span-12 overflow-hidden"
                      // inputProps={{
                      //   min: new Date().toISOString().split("T")[0],
                      // }}
                      multiline={items?.multiline}
                      rows={items?.rows}
                    />
                  )}
                </>
              ))}
              {feeName !== "Edit" && (
                <div className=" col-span-12 flex gap-4 mt-3 justify-center items-center">
                  <AddGuestDialog documents={guests} setDocuments={setGuests} />
                  <AddAdmissionDocumentDialog
                    documents={documents}
                    setDocuments={setDocuments}
                  />
                </div>
              )}
            </form>
            <div className="w-full flex pt-10 gap-2 px-4 justify-end">
              <Button
                className="shadow-none"
                type="submit"
                onClick={() => formik.handleSubmit()}
                startIcon={<Done />}
                loading={formik.isSubmitting}
              >
                Save
              </Button>
              <Button
                type="reset"
                // onClick={() => formik.resetForm()}
                onClick={() => {
                  formik.resetForm();
                  // Manually reset the "description" and "eventDate" fields
                  formik.setFieldValue(
                    "description",
                    initialValues.description
                  );
                  formik.setFieldValue("eventDate", initialValues.eventDate);
                  formik.setFieldValue("venue", initialValues.venue);
                  setDocuments([]);
                  setGuests([]);
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
            className={"!text-xl !shadow-none mt-3"}
            startIcon={<Add />}
            onClick={() => setOpenDrawer(true)}
          >
            Add Event
          </Button>
        )}
      </div>
      {feeName === "Edit" && (
        <span className="cursor-pointer" onClick={() => setOpenDrawer(true)}>
          <Tooltip title="Edit Event">
            <Edit />
          </Tooltip>
        </span>
      )}
    </>
  );
};

export default AddEventDrawer;
