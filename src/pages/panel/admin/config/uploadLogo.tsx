import { CloudUpload, Delete } from "@mui/icons-material";
import { Skeleton } from "@mui/material";
import { AdminApp } from "components/admin";
import { Button, UploadFile } from "components/core";
import { useFormik } from "formik";
import { useFetch, useSWRFetch, withProtectedAdmin } from "hooks";
import { PrivateLayout } from "layouts";
import React from "react";
import { useState } from "react";
import Swal from "sweetalert2";
import { mutate } from "swr";
import { autoAddFormdata, notify } from "utils";
import * as Yup from "yup";
type dataType = {
  data: {
    logoUrl: string;
  };
};
const materialFormSchema = [
  {
    key: "4",
    type: "logo",
    name: "file",
    initialValue: "",
    label: "Upload File",
    validationSchema: Yup.string(),
  },
];

const initialValues = materialFormSchema?.reduce(
  (accumulator: any, currentValue: any) => {
    accumulator[currentValue.name] = currentValue.initialValue;
    return accumulator;
  },
  {} as { [key: string]: string }
);

const validationSchema = materialFormSchema?.reduce(
  (accumulator: any, currentValue: any) => {
    accumulator[currentValue.name] = currentValue.validationSchema;
    return accumulator;
  },
  {} as { [key: string]: string }
);
const UploadLogo = () => {
  const [value, setValue] = useState("");
  const { data, mutate, isValidating } = useSWRFetch<dataType>(`logo`);

  const { mutate: material, loading } = useFetch();
  const handleDelete = async () => {
    try {
      Swal.fire({
        title: "Are you sure?",
        text: "You will not be able to recover it again!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!",
      }).then(async (result) => {
        if (result.isConfirmed) {
          const response = await material({
            path: `logo/delete`,
            method: "DELETE",
          });

          if (response?.data?.error) {
            notify.error(response?.data?.error);
          }
          formik?.resetForm();
          mutate();
          notify.success(response?.data?.message);
        }
      });
    } catch (err) {
      console.log(err);
    }
  };
  const formik = useFormik({
    enableReinitialize: true,
    initialValues: { ...initialValues, logo: data?.data?.logoUrl },
    validationSchema: Yup.object(validationSchema),
    onSubmit: async (values) => {
      try {
        const response = await material({
          path: `logo/create`,
          method: "POST",
          body: autoAddFormdata(values),
          isFormData: true,
        });
        if (response?.data?.error) throw new Error(response?.data?.error);
        formik?.resetForm();
        mutate();
        notify.success(response?.data?.message);
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
    <PrivateLayout title="Config | Admin App">
      <section className="w-full md:p-4">
        <div className="flex flex-col  gap-6 md:px-6">
          <div className="w-full">
            <div className="w-full md:w-6/12 m-auto md:shadow-lg p-4 gap-4 rounded mt-10">
              <h2 className="text-center text-3xl text-theme font-bold">
                Upload Your Logo
              </h2>
              {/* <div
                className="m-auto   mt-2 justify-center "
                // style={{
                //   textAlign: "center",
                //   justifyContent: "center",
                //   display: "flex",
                //   marginTop: "2vh",
                //   marginBottom: "1vh",
                // }}
              >
                <UploadFile
                  width={300}
                  height={300}
                  //   uploadText="Upload Logo"
                  //   required={true}
                  value={value}
                  onChange={setValue}
                />
              </div> */}
              <form onSubmit={formik?.handleSubmit} className="w-full mt-7  ">
                {materialFormSchema?.map((item) => {
                  return (
                    <div className="flex flex-col gap-4" key={item?.key}>
                      {isValidating ? (
                        <div className="w-full">
                          <Skeleton
                            variant="rectangular"
                            height={300}
                            // width={300}
                          />
                        </div>
                      ) : (
                        <UploadFile
                          width={300}
                          height={300}
                          className="!object-contain"
                          url={
                            formik.values.logo &&
                            (typeof formik.values.logo === "string"
                              ? formik.values.logo
                              : URL.createObjectURL(formik?.values?.logo))
                          }
                          onChange={(e: any) =>
                            formik?.setFieldValue("logo", e.target.files[0])
                          }
                        />
                      )}
                    </div>
                  );
                })}

                <div className="flex  items-center justify-center my-4 text-center w-full gap-2">
                  <Button
                    loading={formik.isSubmitting}
                    startIcon={<CloudUpload />}
                    className="hover:ring-theme w-full md:w-3/12 text-center"
                  >
                    Upload
                  </Button>
                  <Button
                    type="button"
                    onClick={() => handleDelete()}
                    disabled={!data?.data.logoUrl}
                    // loading={loading}
                    startIcon={<Delete />}
                    className="bg-red-500 hover:ring-white  w-full md:w-3/12 text-center"
                  >
                    Delete
                  </Button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
    </PrivateLayout>
  );
};

export default withProtectedAdmin(UploadLogo);
