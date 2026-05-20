import {
  CalendarToday,
  Delete,
  DesignServices,
  MenuBookRounded,
  Numbers,
  People,
  Publish,
  Subject,
  ViewStreamOutlined,
} from "@mui/icons-material";
import { Skeleton } from "@mui/material";
import { ICONS } from "assets";
import { Button } from "components/core";
import dayjs from "dayjs";
import { useFetch, useSWRFetch } from "hooks";
import { useRouter } from "next/router";
import Swal from "sweetalert2";
import ExamType from "types/exam";
import SubjectType from "types/subject";
import UserType from "types/user";
import { notify } from "utils";

type AllExamType = {
  data: ExamType;
};

const ExamDetails = ({ create = true }: { create?: boolean }) => {
  const { query, push } = useRouter();

  const { examId } = query;

  const { data, isValidating, mutate } = useSWRFetch<AllExamType>(
    examId && `exam/${examId}`
  );

  const { mutate: exam, loading } = useFetch();
  const handlePublish = () => {
    try {
      Swal.fire({
        title: "Are you sure?",
        text: "You will not be able to recover it again!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, Publish it!",
      }).then(async (result) => {
        if (result.isConfirmed)
          new Promise(async (resolve, reject) => {
            const response = await exam({
              path: `exam/result/${examId}/publish`,
              method: "POST",
              body: JSON.stringify({
                type: "PUBLISHED",
              }),
            });
            if (response?.data?.error) {
              notify.error(response?.data?.error);
              reject(response?.data?.error);
            }
            mutate && mutate();
            notify.success(response?.data?.message);
            resolve(response?.data?.message);
          });
      });
    } catch (err) {
      console.log(err);
    } finally {
    }
  };
  const handleDeleteExam = (id: string) => {
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
        if (result.isConfirmed)
          new Promise(async (resolve, reject) => {
            const response = await exam({
              path: `exam/delete/${id}`,
              method: "DELETE",
            });
            if (response?.data?.error) {
              notify.error(response?.data?.error);
              reject(response?.data?.error);
            }
            mutate && mutate();
            push(`/panel/admin/exam/schedule`);
            notify.success(response?.data?.message);
            resolve(response?.data?.message);
          });
      });
    } catch (err) {
      console.log(err);
    } finally {
    }
  };
  return (
    <>
      <div className="w-full flex flex-col gap-4 mb-8 bg-white shadow-lg rounded-lg p-4  ">
        <div className="flex flex-col md:flex-row items-start md:items-center gap-4 justify-between">
          <h3 className="font-semibold tracking-wide text-theme  text-3xl w-fit  py-2 ">
            {isValidating ? (
              <Skeleton
                width={150}
                height={30}
                animation="wave"
                variant="rounded"
              />
            ) : (
              "Exam Details"
            )}
          </h3>

          {create ? (
            <div className="w-fit flex items-center gap-2">
              {isValidating ? (
                <Skeleton
                  width={100}
                  height={40}
                  animation="wave"
                  variant="rounded"
                />
              ) : (
                <Button
                  disabled={
                    data?.data?.resultPublished || !data?.data?.subjects?.length
                  }
                  startIcon={
                    loading ? (
                      <ICONS.Loading className="animate-spin min-h-[1.5rem] " />
                    ) : (
                      <Publish />
                    )
                  }
                  className="hover:!ring-theme"
                  onClick={() => handlePublish()}
                >
                  {loading ? "loading..." : "Publish Result"}
                </Button>
              )}
            </div>
          ) : (
            <div className="w-fit flex items-center gap-2">
              {isValidating ? (
                <Skeleton
                  width={100}
                  height={40}
                  animation="wave"
                  variant="rounded"
                />
              ) : (
                <Button
                  className="hover:!ring-theme"
                  startIcon={<DesignServices />}
                  onClick={() =>
                    push(`/panel/admin/exam/create?edit=true&examId=${examId}`)
                  }
                >
                  Edit
                </Button>
              )}
              {isValidating ? (
                <Skeleton
                  width={100}
                  height={40}
                  animation="wave"
                  variant="rounded"
                />
              ) : (
                <Button
                  className="hover:!ring-themeSecondary !bg-themeSecondary"
                  onClick={() => {
                    handleDeleteExam(`${examId}`);
                  }}
                  startIcon={
                    loading ? (
                      <ICONS.Loading className="animate-spin min-h-[1.5rem] " />
                    ) : (
                      <Delete />
                    )
                  }
                  // onClick={() => handleDeleteSubject()}
                >
                  {loading ? "loading..." : "Delete"}
                </Button>
              )}
            </div>
          )}
        </div>
        <h3>
          {" "}
          {isValidating ? (
            <Skeleton
              width={450}
              height={10}
              animation="wave"
              variant="rounded"
            />
          ) : (
            data?.data?.description
          )}
        </h3>
        <div className="grid grid-cols-12  gap-3">
          <div className="w-full col-span-12 md:col-span-6 flex items-center gap-4">
            <span className="flex items-center justify-center">
              {isValidating ? (
                <Skeleton
                  animation="wave"
                  width={50}
                  height={50}
                  variant="rounded"
                />
              ) : (
                <ViewStreamOutlined className="text-gray-500" />
              )}
            </span>
            <span className="flex flex-col gap-2">
              <h3 className="text-gray-500 tracking-wide text-sm font-medium">
                {isValidating ? (
                  <Skeleton animation="wave" width={50} variant="text" />
                ) : (
                  "Exam Title"
                )}
              </h3>
              <h3 className="text-gray-600 tracking-wide text-lg   font-medium">
                {isValidating ? (
                  <Skeleton animation="wave" width={150} variant="text" />
                ) : data?.data?.title ? (
                  `${data?.data?.title}`
                ) : (
                  "Not Provided"
                )}
              </h3>
            </span>
          </div>
          <div className="w-full col-span-12 md:col-span-6 flex items-center gap-4">
            <span className="flex items-center justify-center">
              {isValidating ? (
                <Skeleton
                  animation="wave"
                  height={50}
                  width={50}
                  variant="rounded"
                />
              ) : (
                <CalendarToday className="text-gray-500" />
              )}
            </span>
            <span className="flex flex-col gap-2">
              <h3 className="text-gray-500 tracking-wide text-sm font-medium">
                {isValidating ? (
                  <Skeleton animation="wave" width={50} variant="text" />
                ) : (
                  "Exam Dates"
                )}
              </h3>
              <h3 className="text-gray-600 tracking-wide text-lg   font-medium">
                {isValidating ? (
                  <Skeleton animation="wave" width={150} variant="text" />
                ) : (
                  `${dayjs(data?.data?.startDate).format("LL")} -
        ${dayjs(data?.data?.endDate).format("LL")}`
                )}
              </h3>
            </span>
          </div>

          <div className="w-full col-span-12 lg:col-span-6  xl:col-span-12 2xl:col-span-6 flex items-center gap-4">
            <span className="flex items-center justify-center">
              {isValidating ? (
                <Skeleton
                  animation="wave"
                  height={50}
                  width={50}
                  variant="rounded"
                />
              ) : (
                <People className="text-gray-500 " />
              )}
            </span>
            <span className="flex flex-col gap-2">
              <h3 className="text-gray-500 tracking-wide text-sm font-medium">
                {isValidating ? (
                  <Skeleton animation="wave" width={50} variant="text" />
                ) : (
                  "Total Attendee"
                )}
              </h3>
              <h3 className="text-gray-600 tracking-wide text-lg   font-medium">
                {isValidating ? (
                  <Skeleton animation="wave" width={150} variant="text" />
                ) : (
                  `${Number(data?.data?.totalStudent || 0)}`
                )}
              </h3>
            </span>
          </div>
          <div className="w-full col-span-12 lg:col-span-6  xl:col-span-12 2xl:col-span-6 flex items-center gap-4">
            <span className="flex items-center justify-center">
              {isValidating ? (
                <Skeleton
                  animation="wave"
                  height={50}
                  width={50}
                  variant="rounded"
                />
              ) : (
                <Numbers className="text-gray-500 " />
              )}
            </span>
            <span className="flex flex-col gap-2">
              <h3 className="text-gray-500 tracking-wide text-sm font-medium">
                {isValidating ? (
                  <Skeleton animation="wave" width={50} variant="text" />
                ) : (
                  "Total Mark"
                )}
              </h3>
              <h3 className="text-gray-600 tracking-wide text-lg   font-medium">
                {isValidating ? (
                  <Skeleton animation="wave" width={150} variant="text" />
                ) : (
                  `${data?.data?.totalMark ?? "Unavailable"}`
                )}
              </h3>
            </span>
          </div>
          <div className="w-full col-span-12 md:col-span-6 flex items-center gap-4">
            <span className="flex items-center justify-center">
              {isValidating ? (
                <Skeleton
                  animation="wave"
                  height={50}
                  width={50}
                  variant="rounded"
                />
              ) : (
                <MenuBookRounded className="text-gray-500" />
              )}
            </span>
            <span className="flex flex-col gap-2">
              <h3 className="text-gray-500 tracking-wide text-sm font-medium">
                {isValidating ? (
                  <Skeleton animation="wave" width={50} variant="text" />
                ) : (
                  "Batch"
                )}
              </h3>
              <h3 className="text-gray-600 tracking-wide text-lg   font-medium">
                {isValidating ? (
                  <Skeleton animation="wave" width={150} variant="text" />
                ) : (
                  `${
                    data?.data?.batch
                      ? `${data?.data?.batch?.course?.title} ${data?.data?.batch?.branch?.title} (${data?.data?.batch?.session?.title})`
                      : "Not Provided"
                  }`
                )}
              </h3>
            </span>
          </div>
          <div className="w-full col-span-12 md:col-span-6 flex items-center gap-4">
            <span className="flex items-center justify-center">
              {isValidating ? (
                <Skeleton
                  animation="wave"
                  height={50}
                  width={50}
                  variant="rounded"
                />
              ) : (
                <MenuBookRounded className="text-gray-500" />
              )}
            </span>
            <span className="flex flex-col gap-2">
              <h3 className="text-gray-500 tracking-wide text-sm font-medium">
                {isValidating ? (
                  <Skeleton animation="wave" width={50} variant="text" />
                ) : (
                  "Exam Type"
                )}
              </h3>
              <h3 className="text-gray-600 tracking-wide text-lg   font-medium">
                {isValidating ? (
                  <Skeleton animation="wave" width={150} variant="text" />
                ) : (
                  `${
                    data?.data?.type ? `${data?.data?.type} ` : "Not Provided"
                  }`
                )}
              </h3>
            </span>
          </div>
          {data?.data?.type === "ONLINE" && (
            <>
              <div className="col-span-12 w-full flex mt-4">
                <div className="w-full  border-b-[1px] border-gray-900 border-dashed"></div>
                <p className="px-6 text-xl font-semibold text-theme  whitespace-nowrap">
                  Question Settings
                </p>
                <div className="w-full  border-b-[1px] border-gray-900 border-dashed"></div>
              </div>
              {/* <div className="w-full col-span-12 md:col-span-12 flex items-center gap-4">
                <div className="w-full col-span-12 md:col-span-6  items-center gap-4 ">
                  <h3 className="text-black-600 tracking-wide text-xl   font-medium w-full">
                    {isValidating ? (
                      <Skeleton animation="wave" width={150} variant="text" />
                    ) : (
                      "Pagination"
                    )}
                  </h3>
                  <h3 className="text-gray-500 tracking-wide text-sm font-medium mt-3">
                    {isValidating ? (
                      <Skeleton animation="wave" width={250} variant="text" />
                    ) : (
                      "Show all the test question on one page."
                    )}
                  </h3>
                  <h3 className="text-gray-600 tracking-wide text-lg   font-medium">
                    {isValidating ? (
                      <Skeleton animation="wave" width={150} variant="text" />
                    ) : (
                      `${data?.data?.showOneItemPerPage ? `No ` : "Yes"}`
                    )}
                  </h3>
                </div>
                <div className="w-full col-span-12 md:col-span-6  items-center gap-4 mt-3">
                  <h3 className="text-gray-500 tracking-wide text-sm font-medium">
                    {isValidating ? (
                      <Skeleton animation="wave" width={250} variant="text" />
                    ) : (
                      "Show one item per page."
                    )}
                  </h3>
                  <h3 className="text-gray-600 tracking-wide text-lg   font-medium">
                    {isValidating ? (
                      <Skeleton animation="wave" width={150} variant="text" />
                    ) : (
                      `${data?.data?.showOneItemPerPage ? `Yes` : "No"}`
                    )}
                  </h3>
                </div>
              </div> */}
              <div className="w-full col-span-12 md:col-span-12 flex items-center gap-4">
                <div className="w-full col-span-12 md:col-span-6  items-center gap-4 ">
                  <h3 className="text-black-600 tracking-wide text-xl   font-medium w-full">
                    {isValidating ? (
                      <Skeleton animation="wave" width={150} variant="text" />
                    ) : (
                      "Navigation Settings"
                    )}
                  </h3>
                  <h3 className="text-gray-500 tracking-wide text-sm font-medium mt-3">
                    {isValidating ? (
                      <Skeleton animation="wave" width={250} variant="text" />
                    ) : (
                      "Allow the student to jump around to different questions in the test."
                    )}
                  </h3>
                  <h3 className="text-gray-600 tracking-wide text-lg   font-medium">
                    {isValidating ? (
                      <Skeleton animation="wave" width={150} variant="text" />
                    ) : (
                      `${data?.data?.allowStudentToMoveFreely ? `Yes` : "No"}`
                    )}
                  </h3>
                </div>
                <div className="w-full col-span-12 md:col-span-6  items-center gap-4 mt-3">
                  <h3 className="text-gray-500 tracking-wide text-sm font-medium">
                    {isValidating ? (
                      <Skeleton animation="wave" width={250} variant="text" />
                    ) : (
                      "Only allow the student to move forward after answering a question."
                    )}
                  </h3>
                  <h3 className="text-gray-600 tracking-wide text-lg   font-medium">
                    {isValidating ? (
                      <Skeleton animation="wave" width={150} variant="text" />
                    ) : (
                      `${data?.data?.allowStudentToMoveFreely ? `No` : "Yes"}`
                    )}
                  </h3>
                </div>
              </div>
              <div className="w-full col-span-12 md:col-span-12 flex items-center gap-4">
                <div className="w-full col-span-12 md:col-span-4  items-center gap-4 ">
                  <h3 className="text-black-600 tracking-wide text-xl   font-medium w-full">
                    {isValidating ? (
                      <Skeleton animation="wave" width={150} variant="text" />
                    ) : (
                      "Other Settings"
                    )}
                  </h3>
                  <h3 className="text-gray-500 tracking-wide text-sm font-medium mt-3">
                    {isValidating ? (
                      <Skeleton animation="wave" width={250} variant="text" />
                    ) : (
                      "Randomize the order of the questions during the test."
                    )}
                  </h3>
                  <h3 className="text-gray-600 tracking-wide text-lg   font-medium">
                    {isValidating ? (
                      <Skeleton animation="wave" width={150} variant="text" />
                    ) : (
                      `${data?.data?.randomizeQuestionOrder ? `Yes` : "No"}`
                    )}
                  </h3>
                </div>
                <div className="w-full col-span-12 md:col-span-4  items-center gap-4 mt-3">
                  <h3 className="text-gray-500 tracking-wide text-sm font-medium">
                    {isValidating ? (
                      <Skeleton animation="wave" width={250} variant="text" />
                    ) : (
                      "Allow students to submit blank/empty answers."
                    )}
                  </h3>
                  <h3 className="text-gray-600 tracking-wide text-lg   font-medium">
                    {isValidating ? (
                      <Skeleton animation="wave" width={150} variant="text" />
                    ) : (
                      `${data?.data?.allowBlankSubmit ? `Yes` : "No"}`
                    )}
                  </h3>
                </div>
                {/* <div className="w-full col-span-12 md:col-span-4  items-center gap-4 mt-3">
                  <h3 className="text-gray-500 tracking-wide text-sm font-medium">
                    {isValidating ? (
                      <Skeleton animation="wave" width={250} variant="text" />
                    ) : (
                      "Penalize incorrect answers (negative marking)."
                    )}
                  </h3>
                  <h3 className="text-gray-600 tracking-wide text-lg   font-medium">
                    {isValidating ? (
                      <Skeleton animation="wave" width={150} variant="text" />
                    ) : (
                      `${data?.data?.negativeMarking ? `Yes` : "No"}`
                    )}
                  </h3>
                </div> */}
              </div>
              {/* <div className="w-full col-span-12 md:col-span-12 flex items-center gap-4">
                <div className="w-full col-span-12 md:col-span-6  items-center gap-4 ">
                  <h3 className="text-black-600 tracking-wide text-xl   font-medium w-full">
                    {isValidating ? (
                      <Skeleton animation="wave" width={150} variant="text" />
                    ) : (
                      "Negative Marking"
                    )}
                  </h3>
                  <h3 className="text-gray-500 tracking-wide text-sm font-medium mt-3">
                    {isValidating ? (
                      <Skeleton animation="wave" width={250} variant="text" />
                    ) : (
                      "Negative marking for each wrong answer"
                    )}
                  </h3>
                  <h3 className="text-gray-600 tracking-wide text-lg   font-medium">
                    {isValidating ? (
                      <Skeleton animation="wave" width={150} variant="text" />
                    ) : data?.data?.negativeMark ? (
                      data?.data?.negativeMark
                    ) : (
                      0
                    )}
                  </h3>
                </div>
              </div> */}
              <div className="col-span-12 w-full flex ">
                <div className="w-full  border-b-[1px] border-gray-900 border-dashed"></div>
                <p className="px-6 text-xl font-semibold text-theme  whitespace-nowrap">
                  Browser Functionality
                </p>
                <div className="w-full  border-b-[1px] border-gray-900 border-dashed"></div>
              </div>
              <div className="w-full col-span-12 md:col-span-12 flex items-center gap-4">
                <div className="w-full col-span-12 md:col-span-4  items-center gap-4 ">
                  <h3 className="text-black-600 tracking-wide text-xl   font-medium w-full">
                    {isValidating ? (
                      <Skeleton animation="wave" width={150} variant="text" />
                    ) : (
                      "Browser Functionality"
                    )}
                  </h3>
                  <h3 className="text-gray-500 tracking-wide text-sm font-medium mt-3">
                    {isValidating ? (
                      <Skeleton animation="wave" width={250} variant="text" />
                    ) : (
                      "Disable right-click context menu"
                    )}
                  </h3>
                  <h3 className="text-gray-600 tracking-wide text-lg   font-medium">
                    {isValidating ? (
                      <Skeleton animation="wave" width={150} variant="text" />
                    ) : (
                      `${data?.data?.disableRightClick ? `Yes` : "No"}`
                    )}
                  </h3>
                </div>
                <div className="w-full col-span-12 md:col-span-4  items-center gap-4 mt-3">
                  <h3 className="text-gray-500 tracking-wide text-sm font-medium">
                    {isValidating ? (
                      <Skeleton animation="wave" width={250} variant="text" />
                    ) : (
                      "Disable copy/paste"
                    )}
                  </h3>
                  <h3 className="text-gray-600 tracking-wide text-lg   font-medium">
                    {isValidating ? (
                      <Skeleton animation="wave" width={150} variant="text" />
                    ) : (
                      `${data?.data?.disableCopyPaste ? `Yes` : "No"}`
                    )}
                  </h3>
                </div>
                <div className="w-full col-span-12 md:col-span-4  items-center gap-4 mt-3">
                  <h3 className="text-gray-500 tracking-wide text-sm font-medium">
                    {isValidating ? (
                      <Skeleton animation="wave" width={250} variant="text" />
                    ) : (
                      "Disable display translate"
                    )}
                  </h3>
                  <h3 className="text-gray-600 tracking-wide text-lg   font-medium">
                    {isValidating ? (
                      <Skeleton animation="wave" width={150} variant="text" />
                    ) : (
                      `${data?.data?.disableDisplayTranslate ? `Yes` : "No"}`
                    )}
                  </h3>
                </div>
              </div>
              <div className="w-full col-span-12 md:col-span-12 flex items-center gap-4">
                <div className="w-full col-span-12 md:col-span-4  items-center gap-4 ">
                  <h3 className="text-gray-500 tracking-wide text-sm font-medium mt-3">
                    {isValidating ? (
                      <Skeleton animation="wave" width={250} variant="text" />
                    ) : (
                      "Disable Autocomplete"
                    )}
                  </h3>
                  <h3 className="text-gray-600 tracking-wide text-lg   font-medium">
                    {isValidating ? (
                      <Skeleton animation="wave" width={150} variant="text" />
                    ) : (
                      `${data?.data?.disableAutocomplete ? `Yes` : "No"}`
                    )}
                  </h3>
                </div>
                <div className="w-full col-span-12 md:col-span-4  items-center gap-4 mt-3">
                  <h3 className="text-gray-500 tracking-wide text-sm font-medium">
                    {isValidating ? (
                      <Skeleton animation="wave" width={250} variant="text" />
                    ) : (
                      "Disable Spellcheck"
                    )}
                  </h3>
                  <h3 className="text-gray-600 tracking-wide text-lg   font-medium">
                    {isValidating ? (
                      <Skeleton animation="wave" width={150} variant="text" />
                    ) : (
                      `${data?.data?.disableSpellCheck ? `Yes` : "No"}`
                    )}
                  </h3>
                </div>
                <div className="w-full col-span-12 md:col-span-4  items-center gap-4 mt-3">
                  <h3 className="text-gray-500 tracking-wide text-sm font-medium">
                    {isValidating ? (
                      <Skeleton animation="wave" width={250} variant="text" />
                    ) : (
                      "Disable Printing"
                    )}
                  </h3>
                  <h3 className="text-gray-600 tracking-wide text-lg   font-medium">
                    {isValidating ? (
                      <Skeleton animation="wave" width={150} variant="text" />
                    ) : (
                      `${data?.data?.disablePrinting ? `Yes` : "No"}`
                    )}
                  </h3>
                </div>
              </div>
              <div className="col-span-12 w-full flex ">
                <div className="w-full  border-b-[1px] border-gray-900 border-dashed"></div>
                <p className="px-6 text-xl font-semibold text-theme  whitespace-nowrap">
                  Review Settings
                </p>
                <div className="w-full  border-b-[1px] border-gray-900 border-dashed"></div>
              </div>
              <div className=" w-full col-span-12 md:col-span-12">
                <h3 className="text-gray-500 tracking-wide text-lg   font-medium w-full">
                  {isValidating ? (
                    <Skeleton animation="wave" width={150} variant="text" />
                  ) : (
                    "Conclusion Text"
                  )}
                </h3>
                <h3 className="text-gray-600 tracking-wide text-lg   font-medium">
                  {isValidating ? (
                    <Skeleton animation="wave" width={150} variant="text" />
                  ) : (
                    `${
                      data?.data?.conclusionText
                        ? `${data?.data?.conclusionText} `
                        : "Not Provided"
                    }`
                  )}
                </h3>
              </div>
              {/* <div className=" w-full col-span-12 md:col-span-12">
                <h3 className="text-gray-500 tracking-wide text-lg   font-medium w-full">
                  {isValidating ? (
                    <Skeleton animation="wave" width={250} variant="text" />
                  ) : (
                    "At the End of the test, display user's"
                  )}
                </h3>
              </div>
              <div className="w-full col-span-12 md:col-span-12 flex items-center gap-4">
                <div className="w-full col-span-12 md:col-span-2  items-center gap-4 ">
                  <h3 className="text-gray-500 tracking-wide text-sm font-medium mt-3">
                    {isValidating ? (
                      <Skeleton animation="wave" width={250} variant="text" />
                    ) : (
                      "Score"
                    )}
                  </h3>
                  <h3 className="text-gray-600 tracking-wide text-lg   font-medium">
                    {isValidating ? (
                      <Skeleton animation="wave" width={150} variant="text" />
                    ) : (
                      `${data?.data?.showExamScoreAfterEnd ? `Yes` : "No"}`
                    )}
                  </h3>
                </div>
                <div className="w-full col-span-12 md:col-span-3  items-center gap-4 mt-3">
                  <h3 className="text-gray-500 tracking-wide text-sm font-medium">
                    {isValidating ? (
                      <Skeleton animation="wave" width={250} variant="text" />
                    ) : (
                      "Indicate if their response was correct or incorrect"
                    )}
                  </h3>
                  <h3 className="text-gray-600 tracking-wide text-lg   font-medium">
                    {isValidating ? (
                      <Skeleton animation="wave" width={150} variant="text" />
                    ) : (
                      `${data?.data?.showExamResponseAfterEnd ? `Yes` : "No"}`
                    )}
                  </h3>
                </div>
                <div className="w-full col-span-12 md:col-span-3  items-center gap-4 mt-3">
                  <h3 className="text-gray-500 tracking-wide text-sm font-medium">
                    {isValidating ? (
                      <Skeleton animation="wave" width={250} variant="text" />
                    ) : (
                      "Display the correct answer"
                    )}
                  </h3>
                  <h3 className="text-gray-600 tracking-wide text-lg   font-medium">
                    {isValidating ? (
                      <Skeleton animation="wave" width={150} variant="text" />
                    ) : (
                      `${
                        data?.data?.showExamCorrectAnswerAfterEnd ? `Yes` : "No"
                      }`
                    )}
                  </h3>
                </div>
                <div className="w-full col-span-12 md:col-span-3  items-center gap-4 mt-3">
                  <h3 className="text-gray-500 tracking-wide text-sm font-medium">
                    {isValidating ? (
                      <Skeleton animation="wave" width={250} variant="text" />
                    ) : (
                      "Display the explanation"
                    )}
                  </h3>
                  <h3 className="text-gray-600 tracking-wide text-lg   font-medium">
                    {isValidating ? (
                      <Skeleton animation="wave" width={150} variant="text" />
                    ) : (
                      `${
                        data?.data?.showExamExplanationAfterEnd ? `Yes` : "No"
                      }`
                    )}
                  </h3>
                </div>
              </div> */}
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default ExamDetails;
