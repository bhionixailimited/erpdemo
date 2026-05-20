import {
  Add,
  DocumentScanner,
  Done,
  Edit,
  ManageAccounts,
  RotateLeft,
} from "@mui/icons-material";
import {
  FormControl,
  FormControlLabel,
  Radio,
  RadioGroup,
  FormLabel,
  Tooltip,
} from "@mui/material";
import {
  Button,
  CustomAutocomplete,
  CustomDrawer,
  Empty,
  ImageField,
  InputField,
  TextInput,
  UploadFile,
} from "components/core";
import { useCurrency, useFetch, useSWRFetch } from "hooks";
import React, { useRef, useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import STATES from "configs/state";
import { FinancialYear, autoAddFormdata, notify } from "utils";
import CourseType from "types/course";
import DepartmentType from "types/department";
import {
  AddAdmissionDocumentDialog,
  AddEventDocumentDialog,
  AddMouDocumentDialog,
} from "./dialog";
import MouType from "types/mou";
import { MaterialSkeleton } from "./skeleton";
import { MouDocumentCard, StudentCertificate } from "components/cards";
import { EventType } from "types/event";

type dataType = {
  data: DepartmentType[];
};
type mouType = {
  data: EventType;
};
const MouDocumentDrawer = ({ open, onClose, Dmutate, feeName }: any) => {
  const [openDrawer, setOpenDrawer] = useState(false);
  const { mutate: department } = useFetch();
  const { data } = useSWRFetch<dataType>(`department`);
  const {
    data: mou,
    mutate: mouMutate,
    isValidating,
  } = useSWRFetch<mouType>(open && `event/${open}`);
  // console.log(mou);
  const { mutate } = useFetch();

  //   const formik = useFormik({
  //     enableReinitialize: true,
  //     initialValues: open
  //       ? {
  //           ...mou?.data,
  //           includeDepartment: mou?.data?.includeDepartment?._id,
  //           dateOfSigning: mou?.data?.dateOfSigning?.split("T")[0],
  //         }
  //       : initialValues,
  //     validationSchema: Yup.object(validationSchema),
  //     onSubmit: async (values) => {
  //       let formData = autoAddFormdata({
  //         ...values,
  //       });
  //       feeName !== "Edit" &&
  //         documents?.forEach((doc: any) =>
  //           formData.append(Object.keys(doc)[0], Object.values(doc)[0] as any)
  //         );
  //       try {
  //         const response = await department({
  //           path: feeName === "Edit" ? `mou/${open}` : `mou/create`,
  //           method: feeName === "Edit" ? "PUT" : "POST",
  //           body: formData,
  //           isFormData: true,
  //         });
  //         if (response?.data?.error) {
  //           notify.error(response?.data?.error);
  //           return;
  //         }
  //         setOpenDrawer(false);
  //         formik?.resetForm();
  //         Dmutate();
  //         mouMutate();
  //         notify.success(response?.data?.message);
  //       } catch (err) {
  //         console.log(err);
  //       }
  //     },
  //   });

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
            <div className="flex justify-between font-semibold tracking-wide p-2 text-theme border-b text-2xl text-center">
              <h3 className="">View Documents</h3>
              <AddEventDocumentDialog
                Dmutate={Dmutate}
                mouId={open}
                cardMutate={mouMutate}
              />
            </div>
            <div className="w-full p-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2 gap-4">
              {isValidating ? (
                <MaterialSkeleton i={7} />
              ) : mou?.data && mou?.data?.docs?.length > 0 ? (
                mou?.data?.docs?.map((item) => (
                  <MouDocumentCard
                    _id={item?._id}
                    img={item?.url}
                    key={item?._id}
                    forWhom="EVENT"
                    // type={item?.type}
                    testName={item?.title}
                    // cgpa={item?.sgpa}
                    // examDate={item?.createdAt}
                    // resultType={item?.issuedBy?.displayName}
                    // percentage={item?.issuedBy?.email}
                    Dmutate={Dmutate}
                    cardMutate={mouMutate}
                    mainId={open}
                  />
                ))
              ) : (
                <div className="col-span-12">
                  <Empty title="No Document Found" />
                </div>
              )}
            </div>
          </div>
        </CustomDrawer>
      </div>

      <span className="cursor-pointer" onClick={() => setOpenDrawer(true)}>
        <Tooltip title="View Documents">
          <DocumentScanner />
        </Tooltip>
      </span>
    </>
  );
};

export default MouDocumentDrawer;
