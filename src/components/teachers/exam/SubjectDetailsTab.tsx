import { Tab, Tabs } from "@mui/material";
import { ExamAllStudent } from "components/common";
import { useAuth, useSWRFetch } from "hooks";
import { useRouter } from "next/router";
import { ReactNode, useState } from "react";
import ExamType from "types/exam";
import SubjectType from "types/subject";
import UserType from "types/user";
import TestQuestions from "./TestQuestions";
import AdminTestQuestions from "components/admin/exam/AdminTestQuestions";

interface TabPanelProps {
  children?: ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`student-profile-${index}`}
      aria-labelledby={`student-${index}`}
      {...other}
    >
      {value === index && children}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `exam-${index}`,
    "aria-controls": `exam-profile-${index}`,
  };
}

type SubjectExamType = {
  data: {
    _id: string;
    absentStudent: number;
    batch: any;
    createdBy: UserType;
    endTime: string;
    exam: ExamType;
    failStudent: number;
    fullMark: number;
    notPublished: number;
    passMark: number;
    passStudent: number;
    startTime: number;
    subject: SubjectType;
    totalQuestion: number;
    totalStudents: number;
    type: string;
  };
};

const ExamTabs = () => {
  const [tabValue, setTabValue] = useState(0);
  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };
  const { user } = useAuth();

  const { subjectExam, subjectExamId } = useRouter()?.query;

  const { data, isValidating } = useSWRFetch<SubjectExamType>(
    ["ADMIN", "SUPER_ADMIN", "MANAGER", "STAFF", "TEACHER"]?.includes(
      String(user?.role?.toUpperCase())
    )
      ? subjectExamId && `exam/subject/details/${subjectExamId}`
      : subjectExam && `exam/subject/details/${subjectExam}`
  );

  return (
    <div className="w-full container mx-auto student-profile-tab mt-4 ">
      <Tabs
        value={tabValue}
        onChange={handleChange}
        aria-label="Student Profile Tab"
        className="!font-medium !bg-white !shadow-xl !rounded-lg !p-4 "
      >
        <Tab label="Students" {...a11yProps(0)} />
        <Tab label="View Question" {...a11yProps(2)} />
      </Tabs>
      <div className="w-full py-8  ">
        <TabPanel value={tabValue} index={0}>
          <ExamAllStudent
            pageType="result"
            canUpdate={
              user?.role === "TEACHER"
                ? data?.data?.createdBy?._id === user?._id
                : true
            }
          />
        </TabPanel>
        <TabPanel value={tabValue} index={1}>
          {user?.role === "ADMIN" ? (
            <AdminTestQuestions create={false} />
          ) : (
            <TestQuestions create={false} />
          )}
        </TabPanel>
      </div>
    </div>
  );
};

export default ExamTabs;
