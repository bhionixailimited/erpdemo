import {
  Add,
  ArrowBack,
  Article,
  Delete,
  Done,
  RotateLeft,
  SkipNext,
} from "@mui/icons-material";
import { LoadingButton } from "@mui/lab";
import {
  InputField,
  PhotoUpload,
  TextInput,
  AdminAutocomplete,
  Button,
  Empty,
} from "components/core";
import { useFormik } from "formik";
import { useEffect, useMemo, useState } from "react";
import {
  FinancialYear,
  autoAddFormdata,
  handleValidFormData,
  notify,
} from "utils";
import * as Yup from "yup";
import { IconButton } from "@mui/material";
import { useFetch, useSWRFetch } from "hooks";
import SessionType from "types/session";
import CourseType from "types/course";
import BranchType from "types/branch";
import { useRouter } from "next/router";
import BatchType from "types/batch";
import Swal from "sweetalert2";
import {
  AddAdmissionDocumentDialog,
  AddStudentDocumentDialog,
} from "../dialog";
type dataType = {
  data: SessionType[];
};
type courseType = {
  data: CourseType[];
};
type branchType = {
  data: BranchType[];
};
type batchType = {
  data: BatchType[];
};
type singleBatchType = {
  data: BatchType;
};
export interface Document {
  [key: string]: File;
}
const ClassDetails = ({ handleNext, handleBack }: any) => {
  const { query, push } = useRouter();
  const { mutate: registration } = useFetch();
  const [documents, setDocuments] = useState<Document[]>([]);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    try {
      setLoading(true);
      Swal.fire({
        title: "Are you sure?",
        text: "You added the data correctly!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, Add!",
      }).then(async (result) => {
        if (result.isConfirmed)
          new Promise(async (resolve, reject) => {
            const formdata = new FormData();
            documents?.forEach((doc: any) =>
              formdata.append(Object.keys(doc)[0], Object.values(doc)[0] as any)
            );
            const response = await registration({
              path: `student/academic/${query?.userDocs}`,
              method: "POST",
              body: formdata,
              isFormData: true,
            });

            if (response?.data?.error) {
              notify.error(response?.data?.error);
              reject(response?.data?.error);
              setLoading(false);
              return;
            }

            notify.success(" Documents Added Successfully");
            resolve(response?.data?.message);
            setLoading(false);

            push(
              {
                pathname: "/panel/admin/admission/request",
              },
              undefined,
              {
                shallow: true,
              }
            );
          });
        setLoading(false);
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="max-w-xl m-auto ">
      {" "}
      <form className="flex flex-col m-auto  justify-center items-center w-full px-4 gap-4 pt-10">
        <AddStudentDocumentDialog
          documents={documents}
          setDocuments={setDocuments}
        />
        <div className="mb-4 w-full ">
          {documents?.length ? (
            documents?.map((item: Document, index: number) => (
              <div
                key={index}
                className="bg-indigo-100 my-2 mb-3 p-2 text-md font-semibold rounded-md justify-between flex flex-wrap mt-4"
              >
                <p className="mt-2 text-theme ">
                  <Article className="!text-3xl" />{" "}
                  {Object.keys(item)?.map((key: string) => (
                    <span key={key}>{key}</span>
                  ))}
                </p>
                <IconButton
                  onClick={() => {
                    setDocuments((prevState: any) =>
                      prevState.filter(
                        (item2: any) => !(Object?.keys(item)[0] in item2)
                      )
                    );
                  }}
                >
                  <Delete className="text-red-500" />
                </IconButton>
              </div>
            ))
          ) : (
            <Empty title="No Document Added" />
          )}
        </div>
      </form>
      <div className="flex w-full gap-2 mt-8 justify-end px-4">
        <div className="text-end">
          {/* <Button
            className="!bg-sky-600 hover:!ring-sky-600"
            type="reset"
            onClick={() => {
              router.push(`/panel/admin/student`);
            }}
            startIcon={<SkipNext sx={{ color: "snow" }} />}
          >
            Complete
          </Button> */}
        </div>
        <div className="text-end">
          <Button
            className="!bg-themeSecondary"
            type="reset"
            onClick={() => {
              setDocuments([]);
            }}
            startIcon={<RotateLeft sx={{ color: "snow" }} />}
          >
            Reset
          </Button>
        </div>
        <div className="text-end">
          <Button
            type="submit"
            onClick={handleSubmit}
            // disabled={!documents?.length}
            loading={loading}
            startIcon={<Done />}
          >
            Complete
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ClassDetails;
