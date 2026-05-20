import {
  AccountBox,
  DashboardOutlined,
  FormatListBulleted,
  Payments,
  Quiz,
} from "@mui/icons-material";
import LockOpen from "@mui/icons-material/LockOpen";

export default () => {
  const StudentData = [
    {
      key: "1",
      title: "Dashboard",
      icon: <DashboardOutlined />,
      route: "/apply/profile",
      // submenus: [],
    },
    // {
    //   key: "2",
    //   title: "Application Form",
    //   icon: <FormatListBulleted />,
    //   route: "/apply/profile/application-form",
    // },
    {
      key: "3",
      title: "My Profile",
      icon: <AccountBox />,
      route: "/apply/profile/my-profile",
    },
    {
      key: "4",
      title: "My Queries",
      icon: <Quiz />,
      route: "/apply/profile/queries",
    },
    {
      key: "5",
      title: "My Payments",
      icon: <Payments />,
      route: "/apply/profile/my-payments",
    },
    {
      key: "6",
      title: "Change Password",
      icon: <LockOpen />,
      route: "/apply/profile/change-password",
    },
  ];
  return StudentData;
};
