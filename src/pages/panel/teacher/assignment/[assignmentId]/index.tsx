import { Tab, Tabs } from "@mui/material";
import { AssignmentQuestion, AssignmentStudentData } from "components/common";
import { AssignmentDetails } from "components/teachers";
import withProtectedTeacher from "hooks/withTeacherProtected";
import { PrivateLayout } from "layouts";
import { ReactNode, SyntheticEvent, useState } from "react";

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

const AssignmentView = () => {
  const [tabValue, setTabValue] = useState(0);
  const handleChange = (event: SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };
  return (
    <PrivateLayout title="Teacher | Assignment">
      <section className="w-full overflow-hidden p-4 container mx-auto px-4">
        <AssignmentDetails />
        <div className="w-full mx-auto student-profile-tab pt-4 ">
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
              <AssignmentStudentData />
            </TabPanel>
            <TabPanel value={tabValue} index={1}>
              <AssignmentQuestion />
            </TabPanel>
          </div>
        </div>
      </section>
    </PrivateLayout>
  );
};

export default withProtectedTeacher(AssignmentView);
