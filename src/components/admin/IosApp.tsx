import React from "react";
import * as Yup from "yup";
import { useFormik } from "formik";
import { Button, InputField } from "components/core";
import { Send } from "@mui/icons-material";
import { useFetch, useSWRFetch } from "hooks";
import AppUpdateType from "types/config";
import { notify } from "utils";
type Props = {
  heading?: string;
};
type dataType = {
  data: AppUpdateType;
};

const IosApp = () => {
  const { data, isValidating, mutate } =
    useSWRFetch<dataType>(`app-update?type=IOS`);

  const { mutate: update } = useFetch();
  const timetableSchema = [
    {
      key: "1",
      name: "version",
      label: "App version",
      initialValue: "",
      validationSchema: Yup.string().required("App version is required."),
      type: "text",
    },
    {
      key: "2",
      name: "title",
      label: "App update title",
      initialValue: "",
      validationSchema: Yup.string().required("App update title is required."),
      type: "text",
    },
    {
      key: "3",
      name: "message",
      label: "App update description",
      initialValue: "",
      validationSchema: Yup.string().required("Description is required."),
      type: "text",
      multiline: true,
      rows: 4,
    },
    {
      key: "4",
      name: "isDismissible",
      label: "Dismissible",
      initialValue: false,
      validationSchema: Yup.string().required("Dismissible is required."),
      type: "select",
      options: [
        {
          key: 1,
          label: "Yes",
          value: true,
        },
        {
          key: 2,
          label: "No",
          value: false,
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
      ...data?.data,
    },
    validationSchema: Yup.object(validationSchema),
    onSubmit: async (values) => {
      try {
        const response = await update({
          path: `app-update`,
          method: "POST",
          body: JSON.stringify({
            ...values,
          }),
        });

        if (response?.data?.error) {
          notify.error(response?.data?.error);
          return;
        }
        mutate();
        notify.success(response?.data?.message);
        formik?.resetForm();
      } catch (err) {
        console.log(err);
      }
    },
  });

  return (
    <div className="w-full flex flex-col shadow-2xl rounded-xl ">
      <h3 className="font-semibold tracking-wide p-4  text-theme border-b text-2xl text-center">
        {`IOS App Update`}
      </h3>

      <form
        className="flex flex-col gap-4 p-4 "
        onSubmit={formik?.handleSubmit}
      >
        {timetableSchema?.map((item) => (
          <InputField
            options={item?.options}
            key={item?.key}
            name={item?.name}
            onChange={
              item?.name === "version"
                ? (e) => {
                    formik.setFieldValue(
                      "version",
                      e.target.value.replace(/[^0-9].[^0-9].[^0-9]/, "")
                    );
                  }
                : formik?.handleChange
            }
            onBlur={formik?.handleBlur}
            type={item?.type as any}
            value={formik?.values[item?.name]}
            label={item?.label}
            multiline={item?.multiline}
            rows={item?.rows}
            error={Boolean(
              formik?.touched[item?.name] && formik?.errors[item?.name]
            )}
            helperText={
              formik?.touched[item?.name] && (formik?.errors[item?.name] as any)
            }
          />
        ))}
        <div className="flex items-center justify-center">
          <Button
            startIcon={<Send />}
            className="hover:ring-theme"
            loading={formik.isSubmitting}
          >
            Update App
          </Button>
        </div>
      </form>
    </div>
  );
};

export default IosApp;
