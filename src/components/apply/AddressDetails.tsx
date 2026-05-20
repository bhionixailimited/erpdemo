import { ArrowRightAlt, ExitToApp, Preview } from "@mui/icons-material";
import { Checkbox, FormHelperText } from "@mui/material";
import { Button, InputField } from "components/core";
import STATES from "configs/state";
import { useFormik } from "formik";
import { useApplyAuth, useFetch } from "hooks";
import { useRouter } from "next/router";
import { useMemo } from "react";
import { COUNTRIES, notify } from "utils";
import * as Yup from "yup";

const AddressDetails = ({
  setActiveStep,
}: {
  setActiveStep?: (arg: any) => void;
}) => {
  const { mutate } = useFetch();
  const { user, revalidation } = useApplyAuth();
  const router = useRouter();

  const initialValues = useMemo(() => {
    return {
      presentCountry: user?.studentCurrentCountry || "",
      presentState: user?.studentCurrentState || "",
      presentDistrict: user?.studentCurrentDistrict || "",
      presentCity: user?.studentCurrentCity || "",
      presentAddressOne: user?.studentCurrentAddressLine1 || "",
      presentAddressTwo: user?.studentCurrentAddressLine2 || "",
      presentPinCode: user?.studentCurrentAddressPinCode || "",
      isPermanentAddressSame:
        user?.studentCurrentAddressLine1 === user?.studentPermanentAddressLine1,
      permanentCountry: user?.studentPermanentCountry || "",
      permanentState: user?.studentPermanentState || "",
      permanentDistrict: user?.studentPermanentDistrict || "",
      permanentCity: user?.studentPermanentCity || "",
      permanentAddressOne: user?.studentPermanentAddressLine1 || "",
      permanentAddressTwo: user?.studentPermanentAddressLine2 || "",
      permanentPinCode: user?.studentPermanentAddressPinCode || "",
      saveAndExit: "false",
    };
  }, [user?._id]);

  const validationSchema = Yup.object({
    presentCountry: Yup.string().required("Country is required"),
    presentState: Yup.string().required("State is required"),
    presentDistrict: Yup.string().required("District is required"),
    presentCity: Yup.string(),
    presentAddressOne: Yup.string().required("Address is required"),
    presentAddressTwo: Yup.string(),
    presentPinCode: Yup.string().required("Pincode is required"),
    isPermanentAddressSame: Yup.boolean().required("This field is required"),
    permanentCountry: Yup.string().when("isPermanentAddressSame", {
      is: false,
      then: Yup.string().required("Country is required"),
    }),
    permanentState: Yup.string().when("isPermanentAddressSame", {
      is: false,
      then: Yup.string().required("State is required"),
    }),
    permanentDistrict: Yup.string().when("isPermanentAddressSame", {
      is: false,
      then: Yup.string().required("District is required"),
    }),
    permanentPinCode: Yup.string().when("isPermanentAddressSame", {
      is: false,
      then: Yup.string().required("Pincode is required"),
    }),
    permanentAddressOne: Yup.string().when("isPermanentAddressSame", {
      is: false,
      then: Yup.string().required("Address is required"),
    }),
    permanentAddressTwo: Yup.string().optional(),
    permanentCity: Yup.string().optional(),
    saveAndExit: Yup.string().optional(),
  });

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: async (values) => {
      try {
        const body = {
          studentCurrentCountry: values?.presentCountry,
          studentCurrentState: values?.presentState,
          studentCurrentDistrict: values?.presentDistrict,
          studentCurrentCity: values?.presentCity,
          studentCurrentAddressLine1: values?.presentAddressOne,
          studentCurrentAddressLine2: values?.presentAddressTwo,
          studentCurrentAddressPinCode: values?.presentPinCode,
          studentPermanentCountry: values?.isPermanentAddressSame
            ? values?.presentCountry
            : values?.permanentCountry,
          studentPermanentState: values?.isPermanentAddressSame
            ? values?.presentState
            : values?.permanentState,
          studentPermanentDistrict: values?.isPermanentAddressSame
            ? values?.presentDistrict
            : values?.permanentDistrict,
          studentPermanentCity: values?.isPermanentAddressSame
            ? values?.presentCity
            : values?.permanentCity,
          studentPermanentAddressLine1: values?.isPermanentAddressSame
            ? values?.presentAddressOne
            : values?.permanentAddressOne,
          studentPermanentAddressLine2: values?.isPermanentAddressSame
            ? values?.presentAddressTwo
            : values?.permanentAddressTwo,
          studentPermanentAddressPinCode: values?.isPermanentAddressSame
            ? values?.presentPinCode
            : values?.permanentPinCode,
          isAddressDetailsSubmitted: true,
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
        // setActiveStep?.((prev: number) => prev + 1);
      } catch (error) {
        notify.error(
          error instanceof Error ? error.message : "Something went wrong"
        );
      }
    },
  });
  // console.log("address formik:", formik);

  return (
    <section className="w-full bg-white">
      <div className="w-full main-container">
        <div className="flex flex-col mt-8 gap-4 w-full">
          <h3 className="font-medium uppercase tracking-wide text-lg">
            ADDRESS FOR CORRESPONDENCE
          </h3>
          <div className="bg-theme/5 rounded-md shadow-md shadow-gray-400 w-full p-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4  ">
            <div className="flex flex-col w-full gap-2">
              <h3 className="font-medium tracking-wide text-sm">Country *</h3>
              <InputField
                className="bg-white"
                size="small"
                type="select"
                fullWidth
                name="presentCountry"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.presentCountry}
                error={
                  formik.touched?.presentCountry &&
                  Boolean(formik.errors?.presentCountry)
                }
                helperText={
                  (formik.touched?.presentCountry &&
                    formik.errors?.presentCountry) ||
                  ""
                }
                options={COUNTRIES?.map((item) => {
                  return {
                    key: item?.code,
                    label: item?.label,
                    value: item?.label,
                  };
                })}
              />
            </div>
            <div className="flex flex-col w-full gap-2">
              <h3 className="font-medium tracking-wide text-sm">State *</h3>
              <InputField
                className="bg-white"
                type="select"
                size="small"
                fullWidth
                name="presentState"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.presentState}
                error={
                  formik.touched?.presentState &&
                  Boolean(formik.errors?.presentState)
                }
                helperText={
                  (formik.touched?.presentState &&
                    formik.errors?.presentState) ||
                  ""
                }
                options={STATES.map((item) => {
                  return {
                    key: item?.state,
                    label: item.state,
                    value: item.state,
                  };
                })}
              />
            </div>
            <div className="flex flex-col w-full gap-2">
              <h3 className="font-medium tracking-wide text-sm">District *</h3>
              <InputField
                className="bg-white"
                type="select"
                size="small"
                fullWidth
                name="presentDistrict"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.presentDistrict}
                error={
                  formik.touched?.presentDistrict &&
                  Boolean(formik.errors?.presentDistrict)
                }
                helperText={
                  (formik.touched?.presentDistrict &&
                    formik.errors?.presentDistrict) ||
                  ""
                }
                options={STATES?.find((item) => {
                  return item?.state === formik.values.presentState;
                })?.districts?.map((item) => {
                  return {
                    key: item,
                    label: item,
                    value: item,
                  };
                })}
              />
            </div>
            <div className="flex flex-col w-full gap-2">
              <h3 className="font-medium tracking-wide text-sm">City </h3>
              <InputField
                className="bg-white"
                type="select"
                size="small"
                fullWidth
                name="presentCity"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.presentCity}
                error={
                  formik.touched?.presentCity &&
                  Boolean(formik.errors?.presentCity)
                }
                helperText={
                  (formik.touched?.presentCity && formik.errors?.presentCity) ||
                  ""
                }
                options={STATES?.find((item) => {
                  return item?.state === formik.values.presentState;
                })?.districts?.map((item) => {
                  return {
                    key: item,
                    label: item,
                    value: item,
                  };
                })}
              />
            </div>
            <div className="flex flex-col w-full gap-2">
              <h3 className="font-medium tracking-wide text-sm">
                Address Line 1 *
              </h3>
              <InputField
                className="bg-white"
                type="text"
                size="small"
                fullWidth
                name="presentAddressOne"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.presentAddressOne}
                error={
                  formik.touched?.presentAddressOne &&
                  Boolean(formik.errors?.presentAddressOne)
                }
                helperText={
                  (formik.touched?.presentAddressOne &&
                    formik.errors?.presentAddressOne) ||
                  ""
                }
              />
            </div>
            <div className="flex flex-col w-full gap-2">
              <h3 className="font-medium tracking-wide text-sm">
                Address Line 2
              </h3>
              <InputField
                className="bg-white"
                type="text"
                size="small"
                fullWidth
                name="presentAddressTwo"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.presentAddressTwo}
                error={
                  formik.touched?.presentAddressTwo &&
                  Boolean(formik.errors?.presentAddressTwo)
                }
                helperText={
                  (formik.touched?.presentAddressTwo &&
                    formik.errors?.presentAddressTwo) ||
                  ""
                }
              />
            </div>
            <div className="flex flex-col w-full gap-2">
              <h3 className="font-medium tracking-wide text-sm">Pincode *</h3>
              <InputField
                className="bg-white"
                type="number"
                size="small"
                fullWidth
                name="presentPinCode"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.presentPinCode}
                error={
                  formik.touched?.presentPinCode &&
                  Boolean(formik.errors?.presentPinCode)
                }
                helperText={
                  (formik.touched?.presentPinCode &&
                    formik.errors?.presentPinCode) ||
                  ""
                }
              />
            </div>
            <div className=" col-span-3 flex flex-col w-full gap-2">
              <h3 className="font-medium tracking-wide text-sm">
                Is Permanent Address Same As Address For Communication?*
              </h3>
              <div className="flex items-center gap-4">
                <span className="flex items-center">
                  <Checkbox
                    checked={
                      String(formik?.values?.isPermanentAddressSame) === "true"
                    }
                    onClick={() =>
                      formik.setFieldValue("isPermanentAddressSame", true)
                    }
                  />
                  <small>Yes</small>
                </span>
                <span className="flex items-center">
                  <Checkbox
                    checked={
                      String(formik?.values?.isPermanentAddressSame) === "false"
                    }
                    onClick={() =>
                      formik.setFieldValue("isPermanentAddressSame", false)
                    }
                  />
                  <small>No</small>
                </span>
              </div>
              {formik?.touched?.isPermanentAddressSame &&
                formik?.errors?.isPermanentAddressSame && (
                  <FormHelperText error>This field is required</FormHelperText>
                )}
            </div>
          </div>
        </div>
        {String(formik?.values?.isPermanentAddressSame) === "false" && (
          <div className="flex flex-col mt-8 gap-4 w-full">
            <h3 className="font-medium uppercase tracking-wide text-lg">
              PERMANENT ADDRESS
            </h3>
            <div className="bg-theme/5 rounded-md shadow-md shadow-gray-400 w-full p-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4  ">
              <div className="flex flex-col w-full gap-2">
                <h3 className="font-medium tracking-wide text-sm">Country *</h3>
                <InputField
                  className="bg-white"
                  size="small"
                  type="select"
                  fullWidth
                  name="permanentCountry"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.permanentCountry}
                  error={
                    formik.touched?.permanentCountry &&
                    Boolean(formik.errors?.permanentCountry)
                  }
                  helperText={
                    (formik.touched?.permanentCountry &&
                      formik.errors?.permanentCountry) ||
                    ""
                  }
                  options={COUNTRIES?.map((item) => {
                    return {
                      key: item?.code,
                      label: item?.label,
                      value: item?.label,
                    };
                  })}
                />
              </div>
              <div className="flex flex-col w-full gap-2">
                <h3 className="font-medium tracking-wide text-sm">State *</h3>
                <InputField
                  className="bg-white"
                  type="select"
                  size="small"
                  fullWidth
                  name="permanentState"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.permanentState}
                  error={
                    formik.touched?.permanentState &&
                    Boolean(formik.errors?.permanentState)
                  }
                  helperText={
                    (formik.touched?.permanentState &&
                      formik.errors?.permanentState) ||
                    ""
                  }
                  options={STATES.map((item) => {
                    return {
                      key: item?.state,
                      label: item.state,
                      value: item.state,
                    };
                  })}
                />
              </div>
              <div className="flex flex-col w-full gap-2">
                <h3 className="font-medium tracking-wide text-sm">
                  District *
                </h3>
                <InputField
                  className="bg-white"
                  type="select"
                  size="small"
                  fullWidth
                  name="permanentDistrict"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.permanentDistrict}
                  error={
                    formik.touched?.permanentDistrict &&
                    Boolean(formik.errors?.permanentDistrict)
                  }
                  helperText={
                    (formik.touched?.permanentDistrict &&
                      formik.errors?.permanentDistrict) ||
                    ""
                  }
                  options={STATES?.find((item) => {
                    return item?.state === formik.values.presentState;
                  })?.districts?.map((item) => {
                    return {
                      key: item,
                      label: item,
                      value: item,
                    };
                  })}
                />
              </div>
              <div className="flex flex-col w-full gap-2">
                <h3 className="font-medium tracking-wide text-sm">City *</h3>
                <InputField
                  className="bg-white"
                  type="select"
                  size="small"
                  fullWidth
                  name="permanentCity"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.permanentCity}
                  error={
                    formik.touched?.permanentCity &&
                    Boolean(formik.errors?.permanentCity)
                  }
                  helperText={
                    (formik.touched?.permanentCity &&
                      formik.errors?.permanentCity) ||
                    ""
                  }
                  options={STATES?.find((item) => {
                    return item?.state === formik.values.permanentState;
                  })?.districts?.map((item) => {
                    return {
                      key: item,
                      label: item,
                      value: item,
                    };
                  })}
                />
              </div>
              <div className="flex flex-col w-full gap-2">
                <h3 className="font-medium tracking-wide text-sm">
                  Address Line 1 *
                </h3>
                <InputField
                  className="bg-white"
                  type="text"
                  size="small"
                  fullWidth
                  name="permanentAddressOne"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.permanentAddressOne}
                  error={
                    formik.touched?.permanentAddressOne &&
                    Boolean(formik.errors?.permanentAddressOne)
                  }
                  helperText={
                    (formik.touched?.permanentAddressOne &&
                      formik.errors?.permanentAddressOne) ||
                    ""
                  }
                />
              </div>
              <div className="flex flex-col w-full gap-2">
                <h3 className="font-medium tracking-wide text-sm">
                  Address Line 2
                </h3>
                <InputField
                  className="bg-white"
                  type="text"
                  size="small"
                  fullWidth
                  name="permanentAddressTwo"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.permanentAddressTwo}
                  error={
                    formik.touched?.permanentAddressTwo &&
                    Boolean(formik.errors?.permanentAddressTwo)
                  }
                  helperText={
                    (formik.touched?.permanentAddressTwo &&
                      formik.errors?.permanentAddressTwo) ||
                    ""
                  }
                />
              </div>
              <div className="flex flex-col w-full gap-2">
                <h3 className="font-medium tracking-wide text-sm">Pincode *</h3>
                <InputField
                  className="bg-white"
                  type="number"
                  size="small"
                  fullWidth
                  name="permanentPinCode"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.permanentPinCode}
                  error={
                    formik.touched?.permanentPinCode &&
                    Boolean(formik.errors?.permanentPinCode)
                  }
                  helperText={
                    (formik.touched?.permanentPinCode &&
                      formik.errors?.permanentPinCode) ||
                    ""
                  }
                />
              </div>
            </div>
          </div>
        )}

        <div className="w-full bg-theme/5 rounded-md shadow-md shadow-gray-400 mt-10  p-4 flex items-center gap-4 justify-between">
          <Button
            type="submit"
            onClick={() => {
              formik.setFieldValue("saveAndExit", "true");
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
            {formik.isSubmitting ? "Loading..." : "Next"}
          </Button>
        </div>
      </div>
    </section>
  );
};

export default AddressDetails;
