import {
  DocumentScanner,
  FamilyRestroom,
  LocationOn,
  Payments,
  Person,
  School,
} from "@mui/icons-material";
import React from "react";

const stepData = [
  {
    title: "Application And Programme Details",
    icon: <Person className="!text-4xl text-theme" />,
    key: 1,
  },
  {
    title: "Payment",
    icon: <Payments className="!text-4xl text-theme" />,
    key: 2,
  },
  {
    title: "Parent's Details",
    icon: <FamilyRestroom className="!text-4xl text-theme" />,
    key: 3,
  },
  {
    title: "Address Details",
    icon: <LocationOn className="!text-4xl text-theme" />,
    key: 4,
  },
  {
    title: "Educational Qualification Details",
    icon: <School className="!text-4xl text-theme" />,
    key: 5,
  },
  {
    title: "Documents Upload",
    icon: <DocumentScanner className="!text-4xl text-theme" />,
    key: 6,
  },
];

const StepComponent = ({
  activeKey = 0,
  setActiveStep,
}: {
  activeKey?: number;
  setActiveStep?: any;
}) => {
  return (
    <div>
      <h2 className="sr-only">Steps</h2>

      <div>
        <ol className=" flex flex-row divide-x overflow-hidden overflow-x-auto divide-gray-100  rounded-lg border border-gray-100 text-sm text-gray-500 ">
          {stepData?.map((item, index) => (
            <li
              className={`flex items-center min-w-[350px] w-full cursor-pointer select-none  justify-center relative gap-2 p-4 ${
                activeKey >= item?.key ? "bg-theme text-white z-10" : ""
              } ${activeKey > item?.key ? " z-20" : ""} `}
              key={index}
              // onClick={() => setActiveStep(item?.key)}
            >
              {activeKey === item?.key ? (
                <>
                  {" "}
                  <span className="absolute bg-white -left-2 top-1/2 hidden h-4 w-4 -translate-y-1/2 rotate-45 border border-gray-100 ltr:border-b-0 ltr:border-s-0 ltr:bg-white rtl:border-e-0 rtl:border-t-0 rtl:bg-gray-50 sm:block"></span>
                  <span className="absolute -z-10 bg-theme -right-2 top-1/2 hidden h-40 w-40 -translate-y-1/2 rotate-45  ltr:border-b-0 ltr:border-s-0   sm:block"></span>
                </>
              ) : null}
              <span className="bg-white border rounded-full p-2 flex items-center justify-center shadow-xl">
                {item?.icon}
              </span>

              <h3 className="mt-1 font-medium text-center"> {item?.title} </h3>
            </li>
          ))}
        </ol>
      </div>
    </div>
  );
};

export default StepComponent;
