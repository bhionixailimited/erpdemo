import { Close } from "@mui/icons-material";
import { Select } from "@mui/material";
import IconButton from "@mui/material/IconButton";
import {
  Button,
  CustomAutocomplete,
  CustomDialog,
  InputField,
} from "components/core";
import { useFetch, useSWRFetch } from "hooks";
import { useDeferredValue, useState } from "react";
import { KeyedMutator } from "swr";
import BatchType from "types/batch";
import { BookType } from "types/book";
import CourseType from "types/course";
import SessionType from "types/session";
import UserType from "types/user";
import { notify } from "utils";

type Props = {
  open?: boolean;
  closeFn?: () => void;
  mutate?: KeyedMutator<any>;
};
type dataType = {
  data: UserType[];
};
type sessionType = {
  data: SessionType[];
};
type courseType = {
  data: CourseType[];
};
type batchType = {
  data: BatchType[];
};
type bookType = {
  data: BookType[];
};

const IssueNewBookForm = ({ open, closeFn, mutate: mu }: Props) => {
  const [returnDate, setBookReturnDate] = useState("");
  const [returnDateError, setReturnDateError] = useState(false);
  const [studentId, setStudentId] = useState("");
  const [bookError, setBookError] = useState(false);
  const [studentError, setStudentError] = useState(false);
  const [bookId, setBookId] = useState("");
  const [searchTitle, setSearchTitle] = useState("");
  const [batchTitle, setBatchTitle] = useState("");
  const [courseId, setCourseId] = useState("");
  const [sessionId, setSessionId] = useState("");
  const [batchId, setBatchId] = useState("");
  const [bookSearchTitle, setBookSearchTitle] = useState("");
  const searchText = useDeferredValue(searchTitle);
  const bookSearchText = useDeferredValue(bookSearchTitle);
  const { mutate: leave, loading } = useFetch();
  const { data: book } = useSWRFetch<bookType>(
    `book?perPage=20&pageNo=1` +
      (bookSearchText ? `&searchTitle=${bookSearchText}` : "")
  );
  const { data: session } = useSWRFetch<sessionType>(`session`);
  const { data: course } = useSWRFetch<courseType>(`course`);
  const { data: batch } = useSWRFetch<batchType>(
    `batch?course=true&session=true&branch=true&pageNo=1&perPage=20` +
      (batchTitle ? `&searchTitle=${batchTitle}` : "") +
      (sessionId ? `&sessionId=${sessionId}` : "") +
      (courseId ? `&courseId=${courseId}` : "")
  );

  const { data, isValidating, mutate } = useSWRFetch<dataType>(
    `student?perPage=20&pageNo=1` +
      (searchText ? `&searchTitle=${searchText}` : "") +
      (batchId ? `&batchId=${batchId}` : "") +
      (sessionId ? `&session=${sessionId}` : "") +
      (courseId ? `&course=${courseId}` : "")
  );

  const resetForm = () => {
    setBatchId("");
    setBookError(false);
    setBookId("");
    setReturnDateError(false);
    setBookReturnDate("");
    setSearchTitle("");
    setSessionId("");
    setCourseId("");
    setStudentError(false);
    setStudentId("");
  };

  const handleBookError = () => {
    setBookError(!bookId);
    setStudentError(!studentId);
    setReturnDateError(!returnDate);
  };

  const handleIssueBook = async () => {
    try {
      handleBookError();

      if (!bookId || !studentId || !returnDate) return;
      const response = await leave({
        path: `library/issue-book`,
        method: "POST",
        body: JSON.stringify({
          user: studentId,
          book: bookId,
          returnDate: new Date(returnDate).toISOString(),
        }),
      });

      if (response?.data?.error) {
        notify.error(response?.data?.error);
        return;
      }
      notify.success(response?.data?.message);
      mu && mu();
      resetForm();
      closeFn && closeFn();
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <CustomDialog maxWidth="md" open={open}>
      <div className="w-full">
        <div className="relative">
          <h3 className="font-semibold tracking-wide text-2xl text-center text-theme p-4 border-b">
            Issue New Book
          </h3>
          <span className="absolute top-0 p-4 right-0">
            <IconButton
              onClick={() => {
                closeFn?.();
                resetForm();
              }}
            >
              <Close />
            </IconButton>
          </span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-1 gap-4 p-4 ">
          <div className="flex flex-col">
            <div className="flex flex-col w-full">
              <h3 className="font-medium tracking-wide">Filter student</h3>
              <div className="flex flex-wrap w-full justify-between gap-4 py-4 ">
                <InputField
                  label="Session"
                  type={"select"}
                  name="session"
                  mainClass="!gap-2 !w-full md:!w-[31%] lg:!w-[30%]"
                  onChange={(e) => setSessionId(e?.target?.value)}
                  value={sessionId}
                  options={
                    session?.data?.map((item) => {
                      return {
                        key: item?._id,
                        label: item?.title,
                        value: item?._id,
                      };
                    }) || []
                  }
                />
                <InputField
                  label="Course"
                  type={"select"}
                  name="course"
                  mainClass="!gap-2 !w-full md:!w-[31%] lg:!w-[30%]"
                  onChange={(e) => setCourseId(e?.target?.value)}
                  value={courseId}
                  options={
                    course?.data?.map((item) => {
                      return {
                        key: item?._id,
                        label: item?.title,
                        value: item?._id,
                      };
                    }) || []
                  }
                />
                <CustomAutocomplete
                  onSearchTextChange={(e) => setBatchTitle(e?.target?.value)}
                  label="Batch"
                  mainClass="!gap-2 !w-full md:!w-[31%] lg:!w-[30%]"
                  options={
                    batch?.data?.map((item) => {
                      return {
                        key: item?._id,
                        label:
                          item?.course?.title +
                          " " +
                          item?.branch?.title +
                          " " +
                          item?.session?.title,
                        value: item?._id,
                      };
                    }) || []
                  }
                  isOptionEqualToValue={(option, value) =>
                    option?.value === value?.value
                  }
                  onChange={(e, v) => setBatchId(v?.value)}
                  value={
                    batchId
                      ? {
                          key: batch?.data?.find(
                            (item) => item?._id === batchId
                          )?._id,
                          label:
                            batch?.data?.find((item) => item?._id === batchId)
                              ?.course?.title +
                            " " +
                            batch?.data?.find((item) => item?._id === batchId)
                              ?.branch?.title +
                            " " +
                            batch?.data?.find((item) => item?._id === batchId)
                              ?.session?.title,
                          value: batch?.data?.find(
                            (item) => item?._id === batchId
                          )?._id,
                        }
                      : undefined
                  }
                  noOptionText="No batch found"
                />
              </div>
            </div>
            <CustomAutocomplete
              onSearchTextChange={(e) => setSearchTitle(e?.target?.value)}
              label="Student ID*"
              options={data?.data?.map((item) => {
                return {
                  key: item?._id,
                  label:
                    item?.displayName +
                    " " +
                    (item?.academicDetails?.registrationNumber || ""),
                  value: item?._id,
                };
              })}
              isOptionEqualToValue={(option, value) =>
                option?.value === value?.value
              }
              error={studentError}
              helperText={studentError ? `please select a valid student*` : ""}
              onChange={(e, v) => setStudentId(v?.value)}
              noOptionText="No student found"
              onBlur={() => setStudentError(!studentId)}
            />
          </div>
          <div className="flex flex-col">
            <CustomAutocomplete
              onSearchTextChange={(e) => setBookSearchTitle(e?.target?.value)}
              label="Book ID*"
              options={book?.data?.map((item) => {
                return {
                  key: item?._id,
                  label: item?.title + " " + (item?.accessionNumber || ""),
                  value: item?._id,
                };
              })}
              isOptionEqualToValue={(option, value) =>
                option?.value === value?.value
              }
              onBlur={() => setBookError(!bookId)}
              error={bookError}
              helperText={bookError ? `please select a valid book*` : ""}
              onChange={(e, v) => setBookId(v?.value)}
              noOptionText="No book found"
            />
          </div>
          <div className="flex flex-col">
            <InputField
              label="Enter return date"
              type={"date"}
              name="date"
              onChange={(e) => setBookReturnDate(e?.target?.value)}
              onBlur={() => setReturnDateError(Boolean(!returnDate))}
              error={Boolean(returnDateError)}
              helperText={returnDateError ? `Provide a valid return date*` : ""}
              value={returnDate}
            />
          </div>

          <div className="flex items-center col-span-1 justify-center">
            <Button loading={loading} type="button" onClick={handleIssueBook}>
              Issue New Book
            </Button>
          </div>
        </div>
      </div>
    </CustomDialog>
  );
};

export default IssueNewBookForm;
