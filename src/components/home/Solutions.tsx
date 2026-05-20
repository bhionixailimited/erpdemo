import { Check } from "@mui/icons-material";
import { SolutionBg } from "assets/backgrounds";
import { useState } from "react";
import ResponsiveSolution from "./ResponsiveSolution";

export const Solution_Arr = [
  {
    id: "1",
    title: "Student Management",
    description: [
      {
        id: "11",
        solution: "Student classes and subject tracking and reporting",
      },
      {
        id: "12",
        solution: "Get attendance information and live credit score",
      },
      {
        id: "13",
        solution: "Take online assignment and submit assignment",
      },
      {
        id: "14",
        solution: "Online Exam facilities",
      },
      {
        id: "15",
        solution: "Online classes and LMS and live class progress",
      },
      {
        id: "16",
        solution: "Fees structure and fees tracker, pending fees",
      },
      {
        id: "18",
        solution: "View result, manage result and report cards.",
      },
      {
        id: "19",
        solution: "Get important dates and notices",
      },
      {
        id: "20",
        solution: "Transport details and submit queries",
      },
    ],
  },
  {
    id: "2",
    title: "Teacher Management",
    description: [
      {
        id: "11",
        solution: "Subject time table and get classes timing",
      },
      {
        id: "12",
        solution: "Manage classes online",
      },
      {
        id: "13",
        solution:
          "Create assignment, schedule assignment, dynamic score of assignment",
      },
      {
        id: "14",
        solution: "Create new exams, publish result, manage exams",
      },
      {
        id: "15",
        solution: "Take online classes with LMS facilities",
      },
      {
        id: "16",
        solution: "Batch wise structured time table",
      },
      {
        id: "17666",
        solution: "Get attendance, manage own attendance and attendance credit",
      },
      {
        id: "17",
        solution: "Get important notice and notification",
      },
    ],
  },
  {
    id: "3",
    title: "Admin & HR Management",
    description: [
      {
        id: "11",
        solution:
          "Online admission of students and manage all students Customized student information",
      },
      {
        id: "12",
        solution:
          "Create new departments, assign department, manage all departments",
      },
      {
        id: "13",
        solution:
          "Add staffs, manage staffs online. Payment management of staffs",
      },
      {
        id: "14",
        solution: "View all assignment and manage it",
      },
      {
        id: "15",
        solution: "Create batch, manage batch, timetable of each batch",
      },
      {
        id: "16",
        solution: "Staff availability and scheduling options",
      },
      {
        id: "17",
        solution: "Create exams manage exams schedules and exam",
      },
      {
        id: "18",
        solution:
          "Add fees structure of student, manage fees, update fees structure",
      },
      {
        id: "19",
        solution: "View all payment history and manage it",
      },
    ],
  },
  {
    id: "4",
    title: "Parent Portal Management",
    description: [
      {
        id: "11",
        solution: "Online attendance check",
      },
      {
        id: "12",
        solution: "Get result of each subject, and report cards",
      },
      {
        id: "13",
        solution: "Important updates and related dates",
      },
      {
        id: "14",
        solution: "View transportation facilities according to address",
      },
      {
        id: "15",
        solution:
          "View attendance credit score and eligible criteria for exams",
      },
      {
        id: "16",
        solution: "Upcoming exams, Classes and LMS ",
      },
      {
        id: "17",
        solution: "Submit any queries related student",
      },
    ],
  },
  {
    id: "5",
    title: "Transport and Inventory Management",
    description: [
      {
        id: "11",
        solution: "Create transport options and manage it",
      },
      {
        id: "18",
        solution: "vehicles management add vehicles with schedules",
      },
      {
        id: "12",
        solution: "Manage transportation area and vehicles",
      },
      {
        id: "13",
        solution: "Get notify live update of vehicles and transport routes",
      },
      {
        id: "14",
        solution: "Important queries and notification",
      },
      {
        id: "15",
        solution: "Manage inventory and get live records",
      },
      {
        id: "16",
        solution: "Track each item record individually and add items",
      },
      {
        id: "17",
        solution: "Update inventory and quantity management",
      },
    ],
  },
  {
    id: "6",
    title: "Alumni Management",
    description: [
      {
        id: "11",
        solution: "Get alumni management and alumni data",
      },
      {
        id: "12",
        solution: "Create important notice for alumni",
      },
      {
        id: "13",
        solution: "Manage alumni for campus drive",
      },
      {
        id: "14",
        solution: "Updated alumni list online",
      },
      {
        id: "15",
        solution: "Get batch wise alumni records",
      },
      {
        id: "16",
        solution: "Unlimited records of alumni",
      },
      {
        id: "17",
        solution: "Manage report cards of alumni",
      },

      {
        id: "19",
        solution: "Reply any queries with message",
      },
    ],
  },
];
const Solutions = () => {
  const [activeData, setActiveData] = useState<any>({
    id: "1",
    title: "Student Mangement",
    description: [
      {
        id: "11",
        solution: "Student group tracking and reporting",
      },
      {
        id: "12",
        solution: "Pop-up, email and SMS messaging notifications",
      },
      {
        id: "13",
        solution:
          "Multiple sign-in options, including barcode, magnetic stripe and RFID",
      },
      {
        id: "14",
        solution: "Customized student demographic information",
      },
      {
        id: "15",
        solution: "Unlimited records for reporting purposes",
      },
      {
        id: "16",
        solution: "Staff availability and scheduling options",
      },
      {
        id: "17",
        solution: "Import/export integration with SIS and LMS",
      },
      {
        id: "18",
        solution: "Feedback collection via customizable surveys",
      },
      {
        id: "19",
        solution: "Multi-Center scalability",
      },
      {
        id: "20",
        solution: "Create and update digital session notes and logs",
      },
    ],
  });
  return (
    <section className="bg-white" id="solutions">
      <div className="main-container flex py-8 md:py-16 flex-col gap-6 md:gap-10">
        <div className="text-center w-full flex flex-col justify-center items-center gap-2">
          <h1 className="title-styling text-center ">Solutions</h1>
          <p className="text-center md:text-sm text-xs md:leading-6 md:px-16 tracking-tight">
            Today all the leading schools, colleges, and universities are using
            College Management Software to handle all the administrative, and
            academic processes digitally. Keeping these insights in mind,
            YardErp offers education ERP solutions that assure management of all
            academic and non-academic performances while optimizing resource
          </p>
        </div>
        <div className="md:flex hidden justify-between w-full h-fit">
          <div className="md:w-[30%] w-full flex justify-between h-full flex-col gap-5">
            {Solution_Arr?.map((item) => (
              <div
                onClick={() => setActiveData(item)}
                key={item?.id}
                className={` ${
                  activeData?.id === item?.id
                    ? " bg-theme shadow-[rgba(0,_0,_0,_0.24)_0px_3px_8px] text-white"
                    : "bg-white"
                }  flex  w-full h-20 rounded-lg cursor-pointer items-center justify-center text-clip font-semibold hover:shadow-[rgba(0,_0,_0,_0.24)_0px_3px_8px] common-transition shadow-[rgba(50,_50,_105,_0.15)_0px_2px_5px_0px,_rgba(0,_0,_0,_0.05)_0px_1px_1px_0px]`}
              >
                {item?.title}
              </div>
            ))}
          </div>
          <div className="md:w-[63%] w-full rounded-xl shadow-[rgba(0,_0,_0,_0.24)_0px_3px_8px]">
            <div
              style={{
                backgroundImage: `url('${SolutionBg.src}')`,
              }}
              className="bg-center bg-cover bg-no-repeat rounded-[12px] h-full w-full"
            >
              <div className="flex w-full gap-5 p-7 flex-col h-full">
                {activeData &&
                  activeData?.description?.slice(0, 10).map((item: any) => (
                    <div key={item?.id} className="flex gap-2 items-center ">
                      <span className="border-dotted border border-white h-7 w-7 flex items-center justify-center rounded-full">
                        <p className="w-5 h-5 rounded-full flex items-center justify-center bg-white">
                          <Check className="!text-theme !text-base" />
                        </p>
                      </span>
                      <p className="font-semibold text-white text-sm">
                        {item?.solution}
                      </p>
                    </div>
                  ))}
              </div>
            </div>
          </div>
        </div>
        <div className="w-full flex md:hidden">
          <ResponsiveSolution />
        </div>
      </div>
    </section>
  );
};

export default Solutions;
