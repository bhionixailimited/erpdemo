import { Tab, Tabs } from "@mui/material";
import { ExamCards } from "components/cards";
import { ExamAllStudent, SearchBar } from "components/common";
import { Empty } from "components/core";
import { AddResultForm } from "components/form/admin";
import { CreateExamCard, ExamCardSkeleton } from "components/teachers";
import dayjs from "dayjs";
import { useSWRFetch } from "hooks";
import { useRouter } from "next/router";
import { ReactNode, useState } from "react";
import { ExamSubjectType } from "types/examSubject";

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

const ExamTabs = () => {
  const [tabValue, setTabValue] = useState(0);
  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };

  return (
    <div className="w-full container mx-auto student-profile-tab ">
      <Tabs
        value={tabValue}
        onChange={handleChange}
        aria-label="Student Profile Tab"
        className="!font-medium !bg-white !shadow-xl !rounded-lg !p-4 "
      >
        <Tab label="Exam Subjects" {...a11yProps(0)} />
        <Tab label="Students Attended" {...a11yProps(1)} />
        <Tab label="Add Results" {...a11yProps(2)} />
      </Tabs>
      <div className="w-full py-8  ">
        <TabPanel value={tabValue} index={0}>
          <SubjectWiseExam />
        </TabPanel>
        <TabPanel value={tabValue} index={1}>
          <ExamAllStudent />
        </TabPanel>
        <TabPanel value={tabValue} index={2}>
          <AddResultForm />
        </TabPanel>
      </div>
    </div>
  );
};

export default ExamTabs;
type AllExamSubjectData = {
  data: ExamSubjectType[];
};
const SubjectWiseExam = () => {
  const { push, query } = useRouter();

  const { examId } = query;

  const { data: subjectExam, isValidating: subjectExamLoading } =
    useSWRFetch<AllExamSubjectData>(examId && `exam/subject/${examId}`);
  return (
    <div className="flex flex-col">
      <SearchBar />
      <div className="grid grid-cols-1 md:grid-cols-2 py-4 gap-4 lg:grid-cols-3 xl:grid-cols-4">
        {!subjectExam || subjectExamLoading ? (
          Array(3)
            .fill(0)
            .map((item, index) => <ExamCardSkeleton key={index} />)
        ) : subjectExam?.data?.length ? (
          subjectExam?.data?.map((item) => (
            <CreateExamCard
              key={item?._id}
              button={true}
              createdBy={item?.createdBy?.displayName}
              duration={dayjs(item?.endTime).diff(dayjs(item?.startTime), "h")}
              startTime={item?.startTime}
              title={item?.subject?.title}
              credit={item?.credit}
              type={item?.type}
              onClick={() => push(`/panel/admin/exam/${examId}/${item?._id}`)}
            />
          ))
        ) : (
          <div className="w-full col-span-4 flex items-center justify-center">
            <Empty title="No Exam created" />
          </div>
        )}
      </div>
    </div>
  );
};
