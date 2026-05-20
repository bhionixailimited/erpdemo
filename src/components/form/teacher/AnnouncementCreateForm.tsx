import { Campaign } from "@mui/icons-material";
import { Avatar } from "@mui/material";
import { AnnouncementIcon } from "assets/static-icon";
import { Button, InputField } from "components/core";
import dayjs from "dayjs";
import { useFormik } from "formik";
import { useFetch } from "hooks";
import { useRouter } from "next/router";
import { notify } from "utils";
import * as Yup from "yup";

const announcementCreateSchema = [
  {
    key: "1",
    name: "title",
    label: "Title",
    type: "text",
    initialValue: "",
    validationSchema: Yup.string().required("Title is required"),
  },
  {
    key: "2",
    name: "description",
    label: "Description",
    type: "text",
    initialValue: "",
    validationSchema: Yup.string().required("Description is required"),
    multiline: true,
    rows: 5,
  },
  {
    key: "3",
    name: "expiryTime",
    label: "Expiry Time",
    type: "date",
    initialValue: "",
    validationSchema: Yup.string().required("Expiry Date is required"),
  },
  {
    key: "4",
    name: "redirectUrl",
    label: "Redirect URL",
    type: "text",
    initialValue: "",
    validationSchema: Yup.string(),
  },
];

const initialValues = announcementCreateSchema?.reduce(
  (accumulator: any, currentValue) => {
    accumulator[currentValue?.name] = currentValue.initialValue;
    return accumulator;
  },
  {}
);
const validationSchema = announcementCreateSchema.reduce(
  (accumulator: any, currentValue) => {
    accumulator[currentValue?.name] = currentValue.validationSchema;
    return accumulator;
  },
  {}
);

const AnnouncementCreateForm = () => {
  const { mutate: announcement } = useFetch();
  const { batchId } = useRouter()?.query;
  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: Yup.object(validationSchema),
    onSubmit: async (values) => {
      try {
        const response = await announcement({
          path: `batch/${batchId}/announcement/create`,
          method: "POST",
          body: JSON.stringify({
            title: values?.title,
            description: values?.description,
            redirectUrl: values?.redirectUrl,
            expireTime: new Date(`${values?.expiryTime}`).toISOString(),
          }),
        });
        if (response?.data?.error) throw new Error(response?.data?.error);
        notify.success(response?.data?.message);
        formik?.resetForm();
      } catch (err) {
        if (err instanceof Error) {
          notify.error(err?.message);
        } else {
          notify.error("Oops! Something went wrong ");
        }
      }
    },
  });

  return (
    <section className="w-full  ">
      <div className="flex w-full  bg-white shadow-lg rounded-lg mx-auto items-start">
        <div className="w-full border-r flex flex-col ">
          <h3 className=" border-b font-medium tracking-wide p-4 flex items-center text-theme gap-4 text-lg">
            <Campaign className="text-theme" /> Announcement
          </h3>
          <form
            className="flex flex-col gap-4 p-4 "
            onSubmit={formik.handleSubmit}
          >
            {announcementCreateSchema?.map((item) => (
              <InputField
                type={item?.type as any}
                key={item?.key}
                onChange={formik?.handleChange}
                onBlur={formik?.handleBlur}
                name={item?.name}
                label={item?.label}
                error={Boolean(
                  formik?.touched[item?.name] && formik?.errors[item?.name]
                )}
                helperText={
                  formik?.touched[item?.name] &&
                  (formik?.errors[item?.name] as any)
                }
                multiline={item?.multiline}
                rows={item?.rows}
                inputProps={
                  item?.name === "expiryTime"
                    ? {
                        min: dayjs().format("YYYY-MM-DD"),
                      }
                    : undefined
                }
              />
            ))}

            <div className="w-full py-4 flex items-center justify-center">
              <Button
                loading={formik?.isSubmitting}
                className="!text-white !font-medium  rounded-md tracking-wide !capitalize !py-2 !px-4 "
              >
                Create Announcement
              </Button>
            </div>
          </form>
        </div>

        <div className="w-full hidden xl:flex flex-col max-w-[40vw] ">
          <h3 className="text-lg  font-medium tracking-wide border-b p-4">
            Device Preview
          </h3>
          <div className="w-full p-4 flex flex-col">
            <div className="w-full shadow-[rgba(50,_50,_105,_0.15)_0px_2px_5px_0px,_rgba(0,_0,_0,_0.05)_0px_1px_1px_0px] py-3 rounded-lg flex justify-between px-3 items-center">
              <div className="flex gap-2 justify-between items-start w-full">
                <div className="gap-4 flex w-full">
                  <div className="w-12 h-12 flex items-center justify-center text-theme rounded-full bg-gray-100">
                    <Avatar
                      src={AnnouncementIcon.src}
                      className="!h-12 !w-12 "
                    />
                  </div>
                  <div className="flex flex-col w-full">
                    <p className="font-semibold tracking-wide mb-4 ">
                      {formik?.values.title || "Title"}
                    </p>
                    <p className="text-sm tracking-wide w-full break-words">
                      {formik?.values?.description ||
                        `Lorem ipsum dolor sit amet consectetur adipisicing elit.
                      Quam quas ducimus laboriosam ipsum commodi deleniti
                      deserunt qui quis repudiandae eius placeat obcaecati
                      voluptates, eveniet maxime.`}
                    </p>
                    <p className="text-xm font-medium text-gray-400 mt-4 ">
                      By Admin
                    </p>
                  </div>
                </div>
                <div className="text-sm font-semibold whitespace-nowrap text-theme flex items-center">
                  {(formik?.values?.expiryTime &&
                    dayjs(formik?.values?.expiryTime).format("LLL")) ||
                    `01-01-2020 12:00 AM`}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AnnouncementCreateForm;
