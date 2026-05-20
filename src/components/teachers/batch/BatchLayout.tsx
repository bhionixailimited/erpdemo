import { Avatar } from "@mui/material";
import {
  AnnouncementIcon,
  ClassIcon,
  ClockIcon,
  OverviewIcon,
  StudentsIcon,
  StudyMaterialIcon,
} from "assets/static-icon";
import { useSWRFetch } from "hooks";
import useAuth from "hooks/useAuth";
import { PrivateLayout } from "layouts";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useMemo, useRef, useState } from "react";
import BranchType from "types/branch";
import CourseType from "types/course";
import SessionType from "types/session";
import UserType from "types/user";

type singleBatchType = {
  data: {
    _id: string;
    branch: BranchType;
    course: CourseType;
    description: string;
    headOfDepartment: UserType;
    isBatchCompleted: boolean;
    maximumStudent: number;
    session: SessionType;
    totalClasses: number;
    totalStudents: number;
    createdAt: string;
  };
};

const BatchLayout = ({ children }: any) => {
  const [tabPath, setTabPath] = useState("");

  const navRef = useRef<any>();

  const { batchId } = useRouter().query;

  const { asPath } = useRouter();

  const { user } = useAuth();

  const { data } = useSWRFetch<singleBatchType>(`batch/${batchId}`);

  const nav = useMemo(() => {
    if (
      user?.role === "TEACHER" &&
      data?.data?.headOfDepartment?._id !== user?._id
    ) {
      return [
        {
          key: 0,
          title: "Overview",
          icon: OverviewIcon.src,
          path: `/panel/${user?.role?.toLowerCase()}/batch/${batchId}`,
          ref: undefined,
        },
        {
          key: 1,
          title: "Materials",
          icon: StudyMaterialIcon.src,
          path: `/panel/${user?.role?.toLowerCase()}/batch/${batchId}/materials`,
          ref: "materials",
        },
        {
          key: 10,
          title: "Classes",
          icon: ClassIcon.src,
          path: `/panel/${user?.role?.toLowerCase()}/batch/${batchId}/class`,
          ref: "class",
        },
        {
          key: 2,
          title: "Students",
          icon: StudentsIcon.src,
          path: `/panel/${user?.role?.toLowerCase()}/batch/${batchId}/students`,
          ref: "students",
        },

        {
          key: 4,
          title: "Announcements",
          icon: AnnouncementIcon.src,
          path: `/panel/${user?.role?.toLowerCase()}/batch/${batchId}/announcement`,
          ref: "announcement",
        },
      ];
    } else {
      return [
        {
          key: 0,
          title: "Overview",
          icon: OverviewIcon.src,
          path: `/panel/${user?.role?.toLowerCase()}/batch/${batchId}`,
          ref: undefined,
        },
        {
          key: 1,
          title: "Materials",
          icon: StudyMaterialIcon.src,
          path: `/panel/${user?.role?.toLowerCase()}/batch/${batchId}/materials`,
          ref: "materials",
        },
        {
          key: 10,
          title: "Classes",
          icon: ClassIcon.src,
          path: `/panel/${user?.role?.toLowerCase()}/batch/${batchId}/class`,
          ref: "class",
        },
        {
          key: 2,
          title: "Students",
          icon: StudentsIcon.src,
          path: `/panel/${user?.role?.toLowerCase()}/batch/${batchId}/students`,
          ref: "students",
        },

        {
          key: 4,
          title: "Announcements",
          icon: AnnouncementIcon.src,
          path: `/panel/${user?.role?.toLowerCase()}/batch/${batchId}/announcement`,
          ref: "announcement",
        },
        {
          key: 7,
          title: "Assign Teacher",
          icon: ClassIcon.src,
          path: `/panel/${user?.role?.toLowerCase()}/batch/${batchId}/assign-teacher`,
          ref: "assign-teacher",
        },
        {
          key: 8,
          title: "Timetable",
          icon: ClockIcon.src,
          path: `/panel/${user?.role?.toLowerCase()}/batch/${batchId}/time-table`,
          ref: "time-table",
        },
      ];
    }
  }, [user?.role, data?.data]);

  useEffect(() => {
    (() => {
      if (!asPath) return;

      let batchPage = asPath.split("/");

      setTabPath(batchPage[5]);
    })();
  }, [asPath, batchId]);

  return (
    <PrivateLayout title="Batch | Overview">
      <div className="w-full flex flex-col relative">
        <div
          ref={navRef}
          className="flex flex-row border-b border-b-theme  shadow-[0px_4px_5px_0px_#7f438b3b] batch-navigation w-full px-4 sticky top-0 bg-white border-t items-center overflow-hidden overflow-x-auto"
        >
          {nav?.map((item) => (
            <Link href={item.path} key={item.key}>
              <div
                className={` border-r !border-r-gray-300  flex items-center h-fit justify-between group cursor-pointer select-none gap-4 py-1 px-4 hover:bg-theme transition-all ease-in-out duration-300   ${
                  tabPath === item.ref ? " !bg-theme " : "bg-white"
                } `}
              >
                <h3
                  className={`font-medium tracking-wider text-sm xl:text-base group-hover:text-white  transition-all ease-in-out duration-300 min-w-[8rem] ${
                    tabPath === item.ref ? "text-white  " : "text-gray-700"
                  } `}
                >
                  {item.title}
                </h3>
                <Avatar
                  src={item?.icon}
                  className={`!contain !h-12 !w-12 !p-1`}
                ></Avatar>
              </div>
            </Link>
          ))}
        </div>
        <div className="w-full overflow-auto p-4 ">{children}</div>
      </div>
    </PrivateLayout>
  );
};

export default BatchLayout;
