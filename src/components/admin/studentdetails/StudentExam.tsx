import { ArrowBack } from "@mui/icons-material";
import { Button } from "components/core";
import dayjs from "dayjs";
import React, { useState } from "react";

const StudentExam = () => {
  const [viewResult, setViewResult] = useState(false);
  const recent_exam_results = [
    {
      id: 1,
      examTitle: "JAVA",
      secureMarks: "66",
      fullMark: "100",
      grade: "B",
    },
    {
      id: 2,
      examTitle: "DSA",
      secureMarks: "86",
      fullMark: "100",
      grade: "A",
    },
    {
      id: 3,
      examTitle: "C",
      secureMarks: "72",
      fullMark: "100",
      grade: "B",
    },
    {
      id: 4,
      examTitle: "JavaScript",
      secureMarks: "96",
      fullMark: "100",
      grade: "B",
    },
    {
      id: 5,
      examTitle: "C",
      secureMarks: "72",
      fullMark: "100",
      grade: "B",
    },
    {
      id: 6,
      examTitle: "JavaScript",
      secureMarks: "96",
      fullMark: "100",
      grade: "B",
    },
  ];
  const recent_semester_results = [
    {
      id: 1,
      examTitle: "Semester 1",
      secureMarks: "366",
      fullMark: "600",
      grade: "B",
    },
    {
      id: 2,
      examTitle: "Semester 2",
      secureMarks: "486",
      fullMark: "600",
      grade: "A",
    },
    {
      id: 3,
      examTitle: "Semester 3",
      secureMarks: "572",
      fullMark: "600",
      grade: "B",
    },
    {
      id: 4,
      examTitle: "Semester 4",
      secureMarks: "396",
      fullMark: "600",
      grade: "B",
    },
    {
      id: 5,
      examTitle: "Semester 5",
      secureMarks: "272",
      fullMark: "600",
      grade: "B",
    },
    {
      id: 6,
      examTitle: "Semester 6",
      secureMarks: "396",
      fullMark: "600",
      grade: "B",
    },
  ];
  return (
    <div>
      <div className="w-full p-4 grid grid-cols-12  border-[1px] border-gray-300 bg-gray-100 rounded-md">
        <div className="col-span-12 rounded-lg w-full  p-5 flex flex-col gap-5 ">
          <div className="flex justify-between">
            <p className="text-themeSecondary/70 font-semibold text-xl">
              Recent Exams Results
            </p>
            {viewResult && (
              <Button
                startIcon={<ArrowBack />}
                onClick={() => setViewResult(false)}
              >
                View Semesters
              </Button>
            )}
          </div>

          {viewResult ? (
            <>
              <div className="grid grid-cols-12 w-full gap-5">
                {recent_exam_results.map((item) => (
                  <div
                    className="  relative overflow-hidden shadow-sm xs:col-span-6 sm:col-span-6 md:col-span-6 lg:col-span-4 gap-3 rounded-lg border justify-center h-56 flex items-center flex-col"
                    key={item.id}
                  >
                    <div className="absolute top-0 text-white flex items-center justify-center font-semibold right-0 w-12 h-12 bg-themeSecondary rounded-bl-full rounded-tr-lg">
                      {item.id}
                    </div>
                    <div className="flex flex-col text-center">
                      <p className="text-lg font-semibold">{item.examTitle}</p>
                      <p className=" font-normal">{"Publication Date:"}</p>
                      <p className=" text-theme font-semibold">
                        {dayjs().format("MMM D, YYYY h:mm A")}
                      </p>
                      <p>
                        Secured Mark:{" "}
                        <span className="text-theme font-semibold">
                          {item.secureMarks}/{item.fullMark}
                        </span>
                      </p>
                      <p className="">
                        Grade:{" "}
                        <span className="text-theme font-semibold">
                          {item.grade}
                        </span>
                      </p>
                    </div>
                    {/* <Button className="!bg-theme !text-white !text-sm !w-fit">
                      Details
                    </Button> */}
                  </div>
                ))}
              </div>
            </>
          ) : (
            <>
              <div className="grid grid-cols-12 w-full gap-5">
                {recent_semester_results.map((item) => (
                  <div
                    className=" relative bg-indigo-100 overflow-hidden shadow-sm xs:col-span-6 sm:col-span-6 md:col-span-6 lg:col-span-4 gap-3 rounded-lg border justify-center h-48 flex items-center flex-col"
                    key={item.id}
                  >
                    <div className="absolute top-0 text-white flex items-center justify-center font-semibold right-0 w-12 h-12 bg-theme rounded-bl-full rounded-tr-lg">
                      {item.id}
                    </div>
                    <div className="flex flex-col text-center">
                      <p className="text-xl font-semibold">{item?.examTitle}</p>
                      <p className=" font-normal text-lg">
                        {"Publication Date:"}
                      </p>
                      <p className=" text-theme text-lg font-semibold">
                        {dayjs().format("MMM D, YYYY h:mm A")}
                      </p>
                      <p className="text-lg">
                        Secured Mark:{" "}
                        <span className="text-theme  font-semibold">
                          {item.secureMarks}/{item.fullMark}
                        </span>
                      </p>
                      {/* <p className="">
                    Grade:{" "}
                    <span className="text-theme font-semibold">
                      {item.grade}
                    </span>
                  </p> */}
                    </div>
                    <Button
                      onClick={() => setViewResult(true)}
                      className="!bg-theme !text-white !text-sm !w-fit"
                    >
                      Details
                    </Button>
                  </div>
                ))}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default StudentExam;
