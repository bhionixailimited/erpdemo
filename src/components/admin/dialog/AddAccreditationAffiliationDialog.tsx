import { Add, Done, RotateLeft } from "@mui/icons-material";
import {
  Autocomplete,
  Dialog,
  DialogContent,
  DialogTitle,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import { Button, TextInput } from "components/core";
import { useFormik } from "formik";
import { useSWRFetch } from "hooks";
import { useMemo, useRef, useState } from "react";
import { InstituteType } from "types/institute";
import * as Yup from "yup";
import { useAuth, useFetch } from "hooks";
import { notify } from "utils";

type Props = {
  setSelectedData?: any;
  selectedData?: any;
  accreditationMutate: any;
};

export default function AddAccreditationAffiliationDialog({
  selectedData,
  setSelectedData,
  accreditationMutate,
}: Props) {
  const [openDialog, setOpenDialog] = useState(false);
  const fileRef = useRef<any>();
  const { data: institute } = useSWRFetch<{ data: InstituteType[] }>(
    `institute`
  );
  const { data: accreditationData } = useSWRFetch<{ data: any }>(
    selectedData ? `accreditation/${selectedData}` : undefined
  );

  const formSchema = useMemo(
    () => [
      {
        key: "1",
        name: "type",
        label: "Choose",
        initialValue: "ACCREDITATION",
        type: "select", // Change the type to "select" for dropdown
        options: [
          { value: "ACCREDITATION", label: "ACCREDITATION" },
          { value: "AFFILIATION", label: "AFFILIATION" },
        ],
      },
      // {
      //   key: "2",
      //   name: "instituteName",
      //   label: "Name of Institute *",
      //   // initialValue: [],
      //   validationSchema: Yup.string().required(
      //     "Name of institute is required."
      //   ),
      //   type: "autocomplete",
      //   options:
      //     institute?.data?.map((item) => {
      //       return {
      //         key: item?._id,
      //         label: item?.instituteName,
      //         value: item?._id,
      //       };
      //     }) || [],
      // },

      {
        key: "3",
        name: "societyName",
        label: "Name of Society",
        initialValue: "PODDAR_TRUST",
        type: "select", // Change the type to "select" for dropdown
        options: [
          { value: "PODDAR_TRUST", label: "PODDAR TRUST" },
          { value: "PODDAR_SANSTHAN", label: "PODDAR SANSTHAN" },
          { value: "CAER", label: "CAER" },
        ],
      },

      {
        key: "4",
        name: "approvalAuthority",
        label: "Approval Authority",
        initialValue: "",
        type: "text",
      },
      {
        key: "5",
        name: "approvalLetterReference",
        label: "Accreditation Approval Letter Reference",
        initialValue: "",
        type: "text",
      },
      {
        key: "6",
        name: "approvalLetterDate",
        label: "Accreditation Approval Date",
        initialValue: "",
        type: "date",
      },
      {
        key: "7",
        name: "session",
        label: "Session",
        initialValue: "",
        type: "text",
      },
      {
        key: "8",
        name: "course",
        label: "Course",
        initialValue: "",
        type: "text",
      },
      {
        key: "9",
        name: "numberOfSeatsApproval",
        label: "Number of Seats Approval",
        initialValue: "",
        validationSchema: Yup.number()
          .optional()
          .integer("Value must be an integer")
          .min(0, "Value must be non-negative"),
        type: "number",
      },
      // {
      //   key: "10",
      //   name: "otherCertificate",
      //   label: "Click Here To Upload Certificates",
      //   initialValue: [],
      //   type: "file", // Change the type to "file" for multiple files
      // },
    ],
    [institute?.data]
  );
  const initialValues = formSchema?.reduce((accumulator: any, currentValue) => {
    accumulator[currentValue?.name] = currentValue.initialValue;
    return accumulator;
  }, {});

  const validationSchema = formSchema?.reduce(
    (accumulator: any, currentValue) => {
      accumulator[currentValue?.name] = currentValue.validationSchema;
      return accumulator;
    },
    {}
  );
  const { mutate } = useFetch();
  const { user } = useAuth();
  const formik = useFormik({
    enableReinitialize: true,
    initialValues: selectedData
      ? {
          // instituteName: accreditationData?.data?.instituteId,
          societyName: accreditationData?.data?.nameOfSociety,
          approvalAuthority: accreditationData?.data?.approveAuthority,
          approvalLetterDate:
            accreditationData?.data?.accreditationApprovalLetterDate?.split(
              "T"
            )[0],
          approvalLetterReference:
            accreditationData?.data?.accreditationApprovalLetter,
          session: accreditationData?.data?.session,
          course: accreditationData?.data?.course,
          numberOfSeatsApproval: accreditationData?.data?.noSeatsApproval,
          type: accreditationData?.data?.type,
        }
      : initialValues,
    validationSchema: Yup.object(validationSchema),
    onSubmit: async (values) => {
      try {
        const formData = new FormData();

        formData.append(
          "instituteId",
          user?.instituteId?._id ? user?.instituteId?._id : ""
        );

        values?.societyName &&
          formData.append("nameOfSociety", values.societyName);

        formData.append(
          "approveAuthority",
          values.approvalAuthority ? values.approvalAuthority : ""
        );

        formData.append(
          "accreditationApprovalLetterDate",
          values?.approvalLetterDate ? values?.approvalLetterDate : ""
        );

        formData.append(
          "accreditationApprovalLetter",
          values?.approvalLetterReference ? values?.approvalLetterReference : ""
        );

        formData.append("course", values?.course ? values?.course : "");

        formData.append("session", values?.session ? values?.session : "");
        values?.type && formData.append("type", values?.type);

        formData.append(
          "noSeatsApproval",
          values?.numberOfSeatsApproval ? values?.numberOfSeatsApproval : 0
        );
        // if (values?.otherCertificate) {
        //   for (const iterator of values?.otherCertificate) {
        //     formData.append("document", iterator);
        //   }
        // }

        // formData.append("session",values.)

        const response = await mutate({
          path: selectedData
            ? `accreditation/${selectedData}`
            : "accreditation",
          method: selectedData ? "PUT" : "POST",
          isFormData: true,
          body: formData,
        });
        if (response?.status !== 200) throw new Error(response?.data?.message);

        notify.success(response?.data?.message);
        formik?.resetForm();
        // Handle form submission here
        // mute list will here
        accreditationMutate?.();
        setSelectedData?.();
        setOpenDialog(false);
      } catch (err) {
        console.error(err);
      }
    },
  });

  return (
    <div className="w-fit">
      <Dialog
        open={openDialog || Boolean(selectedData)}
        onClose={() => {
          setOpenDialog(false);
          setSelectedData?.();
        }}
        maxWidth="md"
      >
        <DialogTitle>Add Accreditation / Affiliation</DialogTitle>
        <DialogContent>
          <div className="w-full p-4">
            {" "}
            <form className="grid grid-cols-12 w-full px-2 gap-4 pt-5">
              {formSchema?.map((item) =>
                // Check the condition to decide whether to render the field or not
                item.type === "file" ? (
                  selectedData ? (
                    <></>
                  ) : (
                    <div className="col-span-12">
                      <FormControl fullWidth key={item.key} sx={{ my: 1 }}>
                        <Button
                          type="button"
                          className={"bg-green-700"}
                          onClick={() => fileRef.current?.click?.()}
                        >
                          {formik?.values?.["otherCertificate"]?.length
                            ? "File Added"
                            : item?.label}
                          <input
                            ref={fileRef}
                            hidden
                            name={item.name}
                            type={item.type}
                            onChange={(event) =>
                              formik.setFieldValue(
                                "otherCertificate",
                                event.target.files
                              )
                            }
                            multiple
                          />
                        </Button>
                      </FormControl>
                    </div>
                  )
                ) : item.type === "autocomplete" ? ( // Add a condition for Autocomplete type
                  <div className="col-span-6">
                    {" "}
                    <p className={`text-theme text-wider font-medium `}>
                      {item?.label}
                    </p>
                    <Autocomplete
                      key={item.key}
                      id={item.name}
                      options={item.options || []}
                      getOptionLabel={(option) => option.label}
                      value={
                        institute?.data
                          ?.filter((i) => i?._id === formik?.values[item?.name])
                          ?.map((item) => {
                            return {
                              key: item?._id,
                              label: item?.instituteName,
                              value: item?._id,
                            };
                          })?.[0] || {
                          key: " ",
                          label: " ",
                          value: " ",
                        }
                      }
                      // value={formik.values[item.name] || " "}
                      onChange={(_, newValue) => {
                        formik.setFieldValue(item.name, newValue?.value);
                      }}
                      className="w-full"
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          sx={{ my: 1 }}
                          // label={item.label}
                          error={Boolean(
                            formik.touched[item.name] &&
                              formik.errors[item.name]
                          )}
                          helperText={
                            formik.touched[item.name] &&
                            (formik.errors[item.name] as any)
                          }
                          size="small"
                        />
                      )}
                    />
                  </div>
                ) : (
                  <TextInput
                    title={item?.label}
                    key={item?.key}
                    name={item?.name}
                    type={item?.type as any}
                    value={formik?.values[item?.name] || undefined}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    options={item?.options}
                    // rows={item?.rows}
                    size="small"
                    // disabled={item?.disabled}
                    fullWidth
                    // multiline={item?.multiline}
                    error={Boolean(
                      formik?.touched[item?.name] && formik?.errors[item?.name]
                    )}
                    helperText={
                      formik?.touched[item?.name] &&
                      (formik?.errors[item?.name] as any)
                    }
                    styleArea={`${"col-span-12 md:col-span-6 !w-full"}`}
                    styleField="w-full col-span-12 overflow-hidden"
                  />
                )
              )}
            </form>
            <div className="w-full flex pt-10 gap-2 px-4 justify-end">
              <Button
                disabled={formik.isSubmitting}
                loading={formik.isSubmitting}
                onClick={() => formik.handleSubmit()}
                startIcon={<Done />}
              >
                Save
              </Button>
              {/* <Button
                onClick={() => formik.resetForm()}
                className={"bg-red-400"}
                startIcon={<RotateLeft />}
              >
                Reset
              </Button> */}
            </div>
          </div>
        </DialogContent>
      </Dialog>

      <Button startIcon={<Add />} onClick={() => setOpenDialog(true)}>
        Add Accreditation / Affiliation
      </Button>
    </div>
  );
}
