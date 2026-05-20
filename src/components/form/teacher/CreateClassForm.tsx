import { Button, InputField } from "components/core";
import dayjs from "dayjs";
import { useFormik } from "formik";
import { useAuth, useFetch, useSWRFetch } from "hooks";
import { useMemo } from "react";
import SubjectType from "types/subject";
import { notify } from "utils";
import * as Yup from "yup";

type BatchDataType = {
  data: {
    batch: any;
    _id: string;
    subject: SubjectType[];
  }[];
};

const CreateClassForm = ({ reload }: { reload?: () => void }) => {
  const { data: batch, isValidating: batchLoading } =
    useSWRFetch<BatchDataType>(`batch/teacher`);

  const createClassSchema = useMemo(() => {
    return [
      {
        key: "3",
        name: "batch",
        initialValue: "",
        validationSchema: Yup.string().required("Batch is required"),
        label: "Batch",
        type: "select",
        options:
          batch?.data?.flatMap((item) => {
            return item?.subject?.map((inner) => {
              return {
                key: `${item?.batch?._id}-${inner?._id}`,
                label: `${item?.batch?.course?.title}-${item?.batch?.branch?.title}-${item?.batch?.session?.title} (${inner?.title}) `,
                value: `${item?.batch?._id}-${inner?._id}`,
              };
            });
          }) || [],
      },
      {
        key: "5",
        name: "startTime",
        initialValue: "",
        validationSchema: Yup.string().required("Class start time is required"),
        label: "Start Time",
        type: "datetime-local",
      },
      {
        key: "6",
        name: "endTime",
        initialValue: "",
        validationSchema: Yup.string().required("Class end time required."),
        label: "End Time",
        type: "datetime-local",
      },
    ];
  }, [batch?.data?.length]);

  const initialValues = useMemo(() => {
    return createClassSchema?.reduce((accumulator: any, currentValue: any) => {
      accumulator[currentValue.name] = currentValue.initialValue;
      return accumulator;
    }, {} as { [key: string]: string });
  }, [createClassSchema]);

  const validationSchema = useMemo(() => {
    return createClassSchema?.reduce((accumulator: any, currentValue: any) => {
      accumulator[currentValue.name] = currentValue.validationSchema;
      return accumulator;
    }, {} as { [key: string]: string });
  }, [createClassSchema]);

  const { mutate } = useFetch();

  const { user } = useAuth();

  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: Yup.object(validationSchema),
    enableReinitialize: true,
    onSubmit: async (values) => {
      try {
        const data = {
          subject: values?.batch?.split("-")[1],
          teacher: user?._id,
          startTime: new Date(values?.startTime).toISOString(),
          endTime: new Date(values?.endTime).toISOString(),
          credits: "1",
          type: "ONLINE",
          batch: values?.batch?.split("-")[0],
        };

        const response = await mutate({
          path: `class/create`,
          method: "POST",
          body: JSON.stringify(data),
        });

        if (response?.status !== 200) throw new Error(response?.data);

        reload?.();

        notify.success(response?.data?.message);
        formik.resetForm();
      } catch (error) {
        if (error instanceof Error) {
          notify.error(error.message);
        } else {
          notify.error("Unknown error occurred.");
        }
      }
    },
  });

  return (
    <form className="flex flex-col gap-4 p-4 " onSubmit={formik?.handleSubmit}>
      {createClassSchema?.map((item, index) => (
        <div className="w-full" key={index}>
          <InputField
            label={item?.label}
            type={item?.type as any}
            onChange={formik?.handleChange}
            onBlur={formik?.handleBlur}
            name={item?.name}
            value={formik?.values[item?.name]}
            className={"!h-12"}
            options={item?.options}
            inputProps={
              item?.name === "startTime"
                ? {
                    min: dayjs().format("YYYY-MM-DDThh:mm"),
                  }
                : item?.name === "endTime"
                ? {
                    min: formik?.values?.startTime
                      ? dayjs(formik?.values?.startTime).format(
                          "YYYY-MM-DDThh:mm"
                        )
                      : dayjs().format("YYYY-MM-DDThh:mm"),
                  }
                : {}
            }
            error={Boolean(
              formik?.touched[item?.name] && formik?.errors[item?.name]
            )}
            helperText={
              formik?.touched[item?.name] && (formik?.errors[item?.name] as any)
            }
          />
        </div>
      ))}
      <div className="w-full flex items-center justify-center">
        <Button className="hover:ring-theme">Create Class</Button>
      </div>
    </form>
  );
};

export default CreateClassForm;
