import { useState } from "react";
import { Tab, Tabs } from "@mui/material";
import { PrivateLayout } from "layouts";
import { withProtectedAdmin } from "hooks";
import MouType from "types/mou";
import {
  AcademicEvent,
  CulturalEvent,
  SocialEvent,
  SportEvent,
} from "components/admin/events";

type dataType = {
  data: MouType[];
  pageNo: number;
  perPage: number;
  totalCount: number;
};
interface TabPanelProps {
  children?: React.ReactNode;
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
    id: `student-${index}`,
    "aria-controls": `student-profile-${index}`,
  };
}
const Events = () => {
  const [tabValue, setTabValue] = useState(0);
  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };

  return (
    <div className="w-full">
      <PrivateLayout title="Events | Manage">
        <div className="  w-full">
          <Tabs
            value={tabValue}
            onChange={handleChange}
            className="font-medium w-full bg-white rounded-lg shadow-md  "
            variant="fullWidth"
            scrollButtons="auto"
          >
            <Tab
              label={"CULTURAL"}
              className={`rounded-t-lg ${
                tabValue === 0
                  ? "!bg-theme !text-white !font-bold "
                  : "!text-theme !font-bold"
              }`}
            />
            <Tab
              label={<div className="w-full text-center">SOCIAL</div>}
              className={`rounded-t-lg ${
                tabValue === 1
                  ? "!bg-theme !text-white !font-bold "
                  : "!text-theme !font-bold"
              }`}
            />
            <Tab
              label={<div className="w-full text-center">SPORT</div>}
              className={`rounded-t-lg ${
                tabValue === 2
                  ? "!bg-theme !text-white !font-bold "
                  : "!text-theme !font-bold"
              }`}
            />
            <Tab
              label={<div className="w-full text-center">ACADEMIC</div>}
              className={`rounded-t-lg ${
                tabValue === 3
                  ? "!bg-theme !text-white !font-bold "
                  : "!text-theme !font-bold"
              }`}
            />
          </Tabs>

          <div className="w-full py-3">
            <TabPanel value={tabValue} index={0}>
              <CulturalEvent eventType="CULTURAL" />
            </TabPanel>
            <TabPanel value={tabValue} index={1}>
              <SocialEvent eventType="SOCIAL" />
            </TabPanel>
            <TabPanel value={tabValue} index={2}>
              <SportEvent eventType="SPORT" />
            </TabPanel>
            <TabPanel value={tabValue} index={3}>
              <AcademicEvent eventType="ACADEMIC" />
            </TabPanel>
          </div>
        </div>
      </PrivateLayout>
    </div>
  );
};

export default withProtectedAdmin(Events);
