import { Tab, Tabs } from "@mui/material";
import { ExamAllStudent } from "components/common";
import { TestQuestions, ViewExamDetails } from "components/teachers";
import { useAuth, useSWRFetch } from "hooks";
import withProtectedTeacher from "hooks/withTeacherProtected";
import { PrivateLayout } from "layouts";
import { useRouter } from "next/router";
import { ReactNode, SyntheticEvent, useState } from "react";
import ExamType from "types/exam";
import SubjectType from "types/subject";
import UserType from "types/user";

interface TabPanelProps {
  children?: ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="assignment-panel"
      hidden={value !== index}
      id={`assignment-panel-${index}`}
      aria-labelledby={`assignment-panel-${index}`}
      {...other}
    >
      {value === index && children}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `assignment-panel-${index}`,
    "aria-controls": `assignment-panel-${index}`,
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

const ViewSubjectExam = () => {
  const [tabValue, setTabValue] = useState(0);
  const handleChange = (event: SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };

  const { subjectExam } = useRouter()?.query;

  const { data, isValidating } = useSWRFetch<SubjectExamType>(
    subjectExam && `exam/subject/details/${subjectExam}`
  );

  const { user } = useAuth();

  return (
    <PrivateLayout title="View Test">
      <section className="w-full p-4 bg-gray-100">
        <div className="w-full container mx-auto">
          <ViewExamDetails />
        </div>
        <div className="w-full mx-auto student-profile-tab pt-4 container">
          <Tabs
            value={tabValue}
            onChange={handleChange}
            aria-label="Student Profile Tab"
            className="!font-medium !bg-white !shadow-xl !rounded-lg !p-4 "
          >
            <Tab label="Student" {...a11yProps(0)} />
            <Tab label="Question" {...a11yProps(1)} />
          </Tabs>
          <div className="w-full py-8  ">
            <TabPanel value={tabValue} index={0}>
              <ExamAllStudent
                pageType="exam"
                canUpdate={
                  user?.role === "TEACHER"
                    ? data?.data?.createdBy?._id === user?._id
                    : true
                }
              />
            </TabPanel>
            <TabPanel value={tabValue} index={1}>
              <TestQuestions />
            </TabPanel>
          </div>
        </div>
      </section>
    </PrivateLayout>
  );
};

export default withProtectedTeacher(ViewSubjectExam);
