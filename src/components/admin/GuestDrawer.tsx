import {
  Add,
  Delete,
  DocumentScanner,
  Done,
  Edit,
  ManageAccounts,
  Person,
  RotateLeft,
} from "@mui/icons-material";
import {
  FormControl,
  FormControlLabel,
  Radio,
  RadioGroup,
  FormLabel,
  Tooltip,
  IconButton,
  Avatar,
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
  AddEventGuestDialog,
  AddMouDocumentDialog,
} from "./dialog";
import MouType from "types/mou";
import { MaterialSkeleton } from "./skeleton";
import { MouDocumentCard, StudentCertificate } from "components/cards";
import { EventType, GuestType } from "types/event";

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
  const handleRemoveGuest = async (id: string) => {
    let guests = mou?.data?.guests?.filter((guest) => id !== guest?._id);
    // console.log(guests);

    let formData = new FormData();
    formData.append(`guests`, JSON.stringify(guests));

    try {
      const response = await mutate({
        path: `event/${open}`,
        method: "PUT",
        body: formData,
        isFormData: true,
      });
      if (response?.data?.error) throw new Error(response?.data?.error);

      Dmutate();
      mouMutate();
      notify.success(`Guest deleted successfully`);
    } catch (err) {
      if (err instanceof Error) {
        notify.error(err?.message);
      } else {
        notify.error("Oops! Something went wrong ");
      }
    }
  };
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
              <h3 className="">View Guests</h3>
              <AddEventGuestDialog
                Dmutate={Dmutate}
                mouId={open}
                cardMutate={mouMutate}
              />
            </div>
            <div className="w-full p-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2 gap-4">
              {isValidating ? (
                <MaterialSkeleton i={7} />
              ) : mou?.data && mou?.data?.guests?.length > 0 ? (
                <div className="mb-4 w-full col-span-12">
                  {mou?.data?.guests?.map((item: GuestType, index: number) => (
                    <div
                      key={index}
                      className="bg-indigo-100 my-2 p-2 text-md font-semibold rounded-md justify-between flex flex-wrap"
                    >
                      <div className="flex items-center">
                        <Avatar
                          variant="rounded"
                          className="!h-16 !w-16"
                          src={
                            "https://cdn-icons-png.flaticon.com/128/3417/3417894.png"
                          }
                        />
                        <div className="ml-5">
                          <p className="text-theme">
                            {item.name} {/* Display the name */}
                          </p>
                          <p className="text-gray-600">
                            {item.phoneNumber} {/* Display the phoneNumber */}
                          </p>
                          <p className="text-gray-600">
                            {item.position} {/* Display the position */}
                          </p>
                        </div>
                      </div>
                      <IconButton
                        className="hover:!bg-indigo-100"
                        onClick={() => {
                          handleRemoveGuest(item?._id);
                        }}
                      >
                        <Delete className="text-red-500" />
                      </IconButton>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="col-span-12">
                  <Empty title="No Guest Found" />
                </div>
              )}
            </div>
          </div>
        </CustomDrawer>
      </div>

      <span className="cursor-pointer" onClick={() => setOpenDrawer(true)}>
        <Tooltip title="View Guests">
          <Person />
        </Tooltip>
      </span>
    </>
  );
};

export default MouDocumentDrawer;
