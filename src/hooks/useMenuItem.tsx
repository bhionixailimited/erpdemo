import {
  AccessAlarm,
  AccountBalance,
  AccountCircle,
  Add,
  AdminPanelSettings,
  AppRegistration,
  Assignment,
  AssignmentInd,
  AutoStories,
  Book,
  Business,
  BusinessCenter,
  CalendarMonth,
  CalendarViewDayRounded,
  CastForEducation,
  Class,
  CloudUpload,
  ConnectWithoutContact,
  CurrencyRupee,
  Dashboard,
  DepartureBoard,
  Description,
  DesignServices,
  DirectionsBus,
  DriveFileRenameOutline,
  Edit,
  Engineering,
  ErrorOutline,
  EventNote,
  FactCheck,
  Folder,
  Grade,
  GridView,
  Groups3,
  HandymanRounded,
  HolidayVillage,
  Inventory,
  Key,
  Leaderboard,
  LibraryBooks,
  LocalLibrary,
  ManageAccounts,
  MenuBook,
  Money,
  Note,
  Notifications,
  NotificationsActive,
  Payments,
  Pending,
  People,
  PeopleAlt,
  Person,
  Person3,
  PictureAsPdf,
  Quiz,
  Report,
  RequestPage,
  SaveAs,
  School,
  Settings,
  SettingsCell,
  SettingsSuggest,
  Source,
  Subject,
  SupervisedUserCircle,
  SupervisorAccount,
  SupportAgent,
  Timelapse,
  Topic,
  TouchApp,
  Unarchive,
  Upload,
  ViewStream,
  VpnKey,
} from "@mui/icons-material";
import AccountBalanceWalletIcon from "@mui/icons-material/AccountBalanceWallet";
import CardGiftcardIcon from "@mui/icons-material/CardGiftcard";
import HowToRegIcon from "@mui/icons-material/HowToReg";
import LibraryBooksIcon from "@mui/icons-material/LibraryBooks";
import { useSWRFetch } from "hooks";
import PermissionsType from "types/permissions";
import useAuth from "./useAuth";

type PermissionDataType = {
  data: PermissionsType;
};

const useMenuItem = (role?: string) => {
  const { user, instituteData, switchInstitute } = useAuth();
  //find users all permissions

  const { data: userPermission } = useSWRFetch<PermissionDataType>(
    user?._id && user?.role === "STAFF"
      ? `staff/permissions`
      : `manager/permissions/${user?._id}`
  );
  // console.log("userPermission-->", userPermission);
  if (user?.role?.toUpperCase() === "SUPER_ADMIN" && !switchInstitute)
    return [
      {
        key: "1",
        title: "Dashboard",
        icon: <Dashboard />,
        route: "/panel/superadmin/dashboard",
      },
      {
        key: "sd1",
        title: "Institutes",
        icon: <School />,
        submenus: [
          {
            key: "11-0d",
            title: "Add Institute",
            icon: <Add />,
            route: "/panel/superadmin/institutes/add",
          },
          {
            key: "11-0",
            title: "Manage Institute",
            icon: <ManageAccounts />,
            route: "/panel/superadmin/institutes",
          },
        ],
      },
      {
        key: "23er",
        title: "Registrations",
        icon: <HowToRegIcon />,
        submenus: [
          {
            key: "23er12",
            title: "Manage Programmes",
            icon: <LibraryBooksIcon />,
            route: "/panel/superadmin/registations/manage-programs",
          },
          {
            key: "23er23",
            title: "Manage Registrations",
            icon: <ManageAccounts />,
            route: "/panel/superadmin/registations/manage-registrations",
          },
          {
            key: "23er24",
            title: "Manage Coupons",
            icon: <CardGiftcardIcon />,
            route: "/panel/superadmin/registations/manage-coupons",
          },
          {
            key: "23er34",
            title: "Transactions",
            icon: <AccountBalanceWalletIcon />,
            route: "/panel/superadmin/registations/transactions",
          },
          {
            key: "23er74",
            title: "Registration Enquiry",
            icon: <ErrorOutline />,
            route: "/panel/superadmin/registations/registration-enquiry",
          },
        ],
      },
      {
        key: "sd1xz",
        title: "Managers",
        icon: <ManageAccounts />,

        submenus: [
          {
            key: "11-0d",
            title: "Add Manager",
            icon: <Add />,
            route: "/panel/superadmin/managers/add",
          },
          {
            key: "11-0",
            title: "Manage Managers",
            icon: <ManageAccounts />,
            route: "/panel/superadmin/managers",
          },
        ],
      },
      {
        key: "sdas1xz",
        title: "Admins",
        icon: <AdminPanelSettings />,
        submenus: [
          {
            key: "11-0d",
            title: "Add Admins",
            icon: <Add />,
            route: "/panel/superadmin/admins/add",
          },
          {
            key: "11-0",
            title: "Manage Admins",
            icon: <ManageAccounts />,
            route: "/panel/superadmin/admins",
          },
        ],
      },
      {
        key: "147854",
        title: "Users",
        icon: <Person3 />,
        submenus: [
          {
            key: "11-0d",
            title: "Manage Users",
            icon: <AdminPanelSettings />,
            route: "/panel/superadmin/users/view",
          },
        ],
      },
      {
        key: "62",
        title: "Enquiry",
        icon: <ErrorOutline />,
        route: "/panel/superadmin/enquiry",
      },
      {
        key: "62sss",
        title: "Documents",
        icon: <Topic />,
        route: "/panel/superadmin/docs",
      },
      {
        key: "17",
        title: "Notifications",
        icon: <Notifications />,
        route: "/panel/superadmin/notification",
      },

      {
        key: "18",
        title: "Settings",
        icon: <Settings />,
        submenus: [
          {
            key: "11-0",
            title: "Edit Profile",
            icon: <ManageAccounts />,
            route: "/panel/admin/profile",
          },
          {
            key: "13-0",
            route: "/panel/superadmin/change-password",
            title: "Change Password",
            icon: <Key />,
          },
        ],
      },
    ];
  if (user?.role?.toUpperCase() === "MANAGER" && !switchInstitute)
    return [
      {
        key: "1",
        title: "Dashboard",
        icon: <Dashboard />,
        route: "/panel/superadmin/dashboard",
      },
      ...(userPermission?.data?.manageInstitute
        ? [
            {
              key: "sd1",
              title: "Institutes",
              icon: <School />,
              submenus: [
                {
                  key: "11-0d",
                  title: "Add Institute",
                  icon: <Add />,
                  route: "/panel/superadmin/institutes/add",
                },
                {
                  key: "11-0",
                  title: "Manage Institute",
                  icon: <ManageAccounts />,
                  route: "/panel/superadmin/institutes",
                },
              ],
            },
          ]
        : []),
      ...(userPermission?.data?.manageInstitute
        ? [
            {
              key: "sdas1xz",
              title: "Admins",
              icon: <AdminPanelSettings />,
              submenus: [
                {
                  key: "11-0d",
                  title: "Add Admins",
                  icon: <Add />,
                  route: "/panel/superadmin/admins/add",
                },
                {
                  key: "11-0",
                  title: "Manage Admins",
                  icon: <ManageAccounts />,
                  route: "/panel/superadmin/admins",
                },
              ],
            },
          ]
        : []),
      ...(userPermission?.data?.manageGrievance
        ? [
            {
              key: "62",
              title: "Enquiry",
              icon: <ErrorOutline />,
              route: "/panel/superadmin/enquiry",
            },
          ]
        : []),
      ...(userPermission?.data?.manageDocument
        ? [
            {
              key: "62sss",
              title: "Documents",
              icon: <Topic />,
              route: "/panel/superadmin/docs",
            },
          ]
        : []),

      {
        key: "17",
        title: "Notifications",
        icon: <Notifications />,
        route: "/panel/superadmin/notification",
      },
      {
        key: "18",
        title: "Settings",
        icon: <Settings />,
        submenus: [
          {
            key: "11-0",
            title: "Edit Profile",
            icon: <ManageAccounts />,
            route: "/panel/admin/profile",
          },
          {
            key: "13-0",
            route: "/panel/superadmin/change-password",
            title: "Change Password",
            icon: <Key />,
          },
        ],
      },
    ];
  if (
    user?.role?.toUpperCase() === "ADMIN" ||
    (user?.role?.toUpperCase() === "SUPER_ADMIN" && switchInstitute)
  )
    return [
      {
        key: "1",
        title: "Dashboard",
        icon: <Dashboard />,
        route: "/panel/admin/dashboard",
      },

      {
        key: "1a",
        title: "Admission",
        icon: <SupervisedUserCircle />,
        submenus: [
          {
            key: "7.15",
            title: "Dashboard",
            icon: <Leaderboard />,
            route: "/panel/admin/admission/dashboard",
          },
          {
            key: "2-1",
            title: "Admission Form",
            icon: <AppRegistration />,
            route: "/panel/admin/admission/request",
          },
          {
            key: "2-1dsdf",
            title: "Bulk Upload",
            icon: <CloudUpload />,
            route: "/panel/admin/admission/bulk-upload",
          },
          // {
          //   key: "2-2",
          //   title: "Manage Admission",
          //   icon: <ManageAccounts />,
          //   route: "/panel/admin/admission",
          // },
        ],
      },
      {
        key: "2",
        title: "Students",
        icon: <SupervisorAccount />,
        // route: "/panel/admin/users",
        submenus: [
          {
            key: "7.15",
            title: "Dashboard",
            icon: <Leaderboard />,
            route: "/panel/admin/student/dashboard",
          },
          {
            key: "2-1",
            title: "Manage Student",
            icon: <ManageAccounts />,
            route: "/panel/admin/student",
          },
        ],
      },
      {
        key: "10",
        title: "Department",
        icon: <HandymanRounded />,
        submenus: [
          {
            key: "7.15",
            title: "Dashboard",
            icon: <Leaderboard />,
            route: "/panel/admin/department/dashboard",
          },
          // {
          //   key: "7-1",
          //   title: "Create Department",
          //   icon: <DesignServices />,
          //   route: "/panel/admin/department/create",
          // },
          {
            key: "7-2",
            title: "Manage Department",
            icon: <ManageAccounts />,
            route: "/panel/admin/department",
          },
        ],
      },
      {
        key: "1144587585145",
        title: "Chairman",
        icon: <SupervisorAccount />,
        submenus: [
          {
            key: "4-2",
            title: "MOUs",
            icon: <DriveFileRenameOutline />,
            route: "/panel/admin/mou",
          },

          {
            key: "4-6",
            title: "Documents",
            icon: <Source />,
            route: "/panel/admin/docs",
          },
          {
            key: "6-4",
            title: "Appointments",
            icon: <People />,
            route: "/panel/admin/appointment",
          },
          {
            key: "6-4x",
            title: "Projects",
            icon: <Folder />,
            route: "/panel/admin/project",
          },
          {
            key: "6-4ds",
            title: "Resource Persons",
            icon: <Person />,
            route: "/panel/admin/resource-person",
          },
          {
            key: "1.7868",
            title: "Accredit & Affiliate",
            route: "/panel/admin/accreditation-affiliation",
            icon: <AccountBalance />,
          },
        ],
      },

      {
        key: "6-4ds",
        title: "Marketing Resource",
        icon: <Person />,
        route: "/panel/admin/marketing-resource",
      },

      {
        key: "9",
        title: "Staffs",
        icon: <Engineering />,
        submenus: [
          {
            key: "6",
            title: "Dashboard",
            icon: <Leaderboard />,
            route: "/panel/admin/staff/dashboard",
          },
          {
            key: "6-1",
            title: "Create Staff",
            icon: <Add />,
            route: "/panel/admin/staff/register",
          },
          {
            key: "2-1dsdf",
            title: "Bulk Upload",
            icon: <CloudUpload />,
            route: "/panel/admin/staff/bulk-upload",
          },
          {
            key: "6-11",
            title: "Teaching Staffs",
            icon: <CastForEducation />,
            route: "/panel/admin/staff/teaching-staff",
          },
          {
            key: "6-15",
            title: "Non Teaching Staffs",
            icon: <Groups3 />,
            route: "/panel/admin/staff/non-teaching-staff",
          },
          {
            key: "6-2",
            title: "Staff Attendance",
            icon: <Description />,
            route: "/panel/admin/staff/attendance",
          },
          {
            key: "6-3",
            title: "Leave Management",
            icon: <People />,
            route: "/panel/admin/staff/leave-management",
          },

          {
            key: "6-3irffuii",
            title: "Staff Payment",
            icon: <Money />,
            route: "/panel/admin/staff/payment",
          },
        ],
      },
      {
        key: "10.yy",
        title: "Assignments",
        icon: <Assignment />,
        submenus: [
          // {
          //   key: "7-1",
          //   title: "Create Assignments",
          //   icon: <Add />,
          //   route: "/panel/admin/create",
          // },
          {
            key: "7-2",
            title: "Manage Assignments",
            icon: <ManageAccounts />,
            route: "/panel/admin/assignment",
          },
        ],
      },
      {
        key: "4",
        title: "Batch",
        icon: <ConnectWithoutContact />,
        submenus: [
          // {
          //   key: "4-11",
          //   title: "Dashboard",
          //   icon: <Leaderboard />,
          //   route: "/panel/admin/batch/dashboard",
          // },
          {
            key: "4-0",
            title: "Create Batch",
            icon: <DesignServices />,
            route: "/panel/admin/batch/create",
          },
          {
            key: "4-1",
            title: "Manage Batch",
            icon: <ManageAccounts />,
            route: "/panel/admin/batch",
          },
        ],
      },
      {
        key: "6pl.19",
        title: "Exam",
        icon: <MenuBook />,
        submenus: [
          {
            key: "61pl-2",
            title: "Create Exam",
            icon: <Add />,
            route: "/panel/admin/exam/create",
          },
          {
            key: "6.1-3",
            title: "View Schedule Exam",
            icon: <ViewStream />,
            route: "/panel/admin/exam/schedule",
          },
          {
            key: "6.1-2",
            title: "Manage Exam",
            icon: <DesignServices />,
            route: "/panel/admin/exam",
          },
        ],
      },
      {
        key: "4iid",
        title: "Fees",
        icon: <Money />,

        submenus: [
          {
            key: "8-1",
            title: "Manage Fees",
            icon: <CurrencyRupee />,
            route: "/panel/admin/fees",
          },
          {
            key: "8ii",
            title: "Fee Payment",
            icon: <Payments />,
            route: "/panel/admin/fees/payment",
          },
        ],
      },
      {
        key: "4ii",
        title: "Finance",
        icon: <AccountBalance />,
        submenus: [
          {
            key: "4-11",
            title: "Dashboard",
            icon: <Leaderboard />,
            route: "/panel/admin/payment/dashboard",
          },
          {
            key: "2-1dsdf",
            title: "Bulk Upload",
            icon: <CloudUpload />,
            route: "/panel/admin/payment/bulk-upload",
          },
          {
            key: "4-0",
            title: "Manage Finance",
            icon: <ManageAccounts />,
            route: "/panel/admin/payment",
          },
        ],
      },
      {
        key: "13rfefgregf",
        title: "My Documents",
        icon: <Source />,
        submenus: [
          {
            key: "4-2",
            title: "Manage",
            icon: <Source />,
            route: "/panel/admin/documents",
          },
        ],
      },
      {
        key: "65",
        title: "Library",
        icon: <LocalLibrary />,
        submenus: [
          // {
          //   key: "8ii",
          //   title: "Dashboard",
          //   icon: <Leaderboard />,
          //   route: "/panel/admin/library/dashboard",
          // },
          {
            key: "8-1",
            title: "Manage Book",
            icon: <LibraryBooks />,
            route: "/panel/admin/library/manage-book",
          },
          {
            key: "8-3",
            title: "Issue Book",
            icon: <DesignServices />,
            route: "/panel/admin/library/book-issue",
          },
          // {
          //   key: "2-1dsdf",
          //   title: "Bulk Upload",
          //   icon: <CloudUpload />,
          //   route: "/panel/admin/library/bulk-upload",
          // },
        ],
      },
      {
        key: "66",
        title: "Inventory",
        icon: <Inventory />,
        submenus: [
          {
            key: "8ii",
            title: "Dashboard",
            icon: <Leaderboard />,
            route: "/panel/admin/inventory/dashboard",
          },
          {
            key: "8-1",
            title: "Create Stock",
            icon: <DesignServices />,
            route: "/panel/admin/inventory/create",
          },
          {
            key: "2-1dsdf",
            title: "Bulk Upload",
            icon: <CloudUpload />,
            route: "/panel/admin/inventory/bulk-upload",
          },

          {
            key: "8-2",
            title: "Manage Stock",
            icon: <ManageAccounts />,
            route: "/panel/admin/inventory/manage-stock",
          },
          {
            key: "8-2x",
            title: "Supply Requests",
            icon: <Pending />,
            route: "/panel/admin/inventory/supply-requests",
          },
          {
            key: "8-3",
            title: "Stock Supplied",
            icon: <Unarchive />,
            route: "/panel/admin/inventory/supplied-stock",
          },
        ],
      },
      {
        key: "6-3irffucdii",
        title: "Request Supply",
        icon: <RequestPage />,
        route: "/panel/admin/staff/create-supply-request",
      },
      {
        key: "64",
        title: "Transport",
        icon: <DirectionsBus />,
        submenus: [
          {
            key: "8ii",
            title: "Dashboard",
            icon: <Leaderboard />,
            route: "/panel/admin/transport/dashboard",
          },
          {
            key: "8-1",
            title: "Manage Vehicle",
            icon: <DepartureBoard />,
            route: "/panel/admin/transport/manage-vehicle",
          },
          {
            key: "8-1",
            title: "Manage Drivers",
            icon: <Person />,
            route: "/panel/admin/transport/manage-drivers",
          },
          {
            key: "2-1dsdf",
            title: "Bulk Upload",
            icon: <CloudUpload />,
            route: "/panel/admin/transport/bulk-upload",
          },
          {
            key: "8-2",
            title: "Manage Transport",
            icon: <ManageAccounts />,
            route: "/panel/admin/transport/manage-transport",
          },
        ],
      },
      {
        key: "4saA-4",
        title: "Events",
        icon: <CalendarMonth />,
        route: "/panel/admin/events",
      },
      {
        key: "3-nacc-dsadfdf",
        title: "NAAC",
        route: "/panel/admin/naac",
        icon: <AccountBalance />,
      },
      {
        key: "6.1",
        title: "Notice",
        icon: <NotificationsActive />,
        submenus: [
          {
            key: "6.1-2",
            title: "Create Notice",
            icon: <DesignServices />,
            route: "/panel/admin/notice/create",
          },
          {
            key: "6.1-3",
            title: "Manage Notice",
            icon: <ManageAccounts />,
            route: "/panel/admin/notice",
          },
        ],
      },
      {
        key: "6pl.1sd",
        title: "Alumni ",
        icon: <People />,

        submenus: [
          {
            key: "4-0",
            title: "Manage Alumni",
            icon: <ManageAccounts />,
            route: "/panel/admin/alumni",
          },
        ],
      },
      {
        key: "6pl.1",
        title: "Placement Cell ",
        icon: <BusinessCenter />,
        submenus: [
          {
            key: "8ii",
            title: "Dashboard",
            icon: <Leaderboard />,
            route: "/panel/admin/placement/dashboard",
          },
          {
            key: "6.1-3",
            title: "Manage Placement Notice",
            icon: <ManageAccounts />,
            route: "/panel/admin/placement",
          },
          {
            key: "6.1-568",
            title: "Placement Report",
            icon: <People />,
            route: "/panel/admin/placement/archive",
          },
          {
            key: "6.1-568dewded",
            title: "Company",
            icon: <Business />,
            route: "/panel/admin/company",
          },
        ],
      },
      {
        key: "62",
        title: "Enquiry",
        icon: <ErrorOutline />,
        route: "/panel/admin/enquiry",
      },
      {
        key: "16",
        title: "Support",
        icon: <SupportAgent />,
        route: "/panel/admin/support",
      },
      {
        key: "17",
        title: "Notifications",
        icon: <Notifications />,
        route: "/panel/admin/notification",
      },

      {
        key: "17ki",
        title: "Config",
        icon: <SettingsCell />,
        submenus: [
          {
            key: "13-fdf0",
            route: "/panel/admin/config/admin-app-config",
            title: "App Config",
            icon: <AdminPanelSettings />,
          },
          // {
          //   key: "13-fsdf0",
          //   route: "/panel/admin/config/student-app-config",
          //   title: "Student App Config",
          //   icon: <CastForEducation />,
          // },
          // {
          //   key: "13-fs0",
          //   route: "/panel/admin/config/teacher-app-config",
          //   title: "Teacher App Config",
          //   icon: <Person2 />,
          // },
          {
            key: "13-ff0",
            route: "/panel/admin/config/set-course",
            title: "Set Course",
            icon: <MenuBook />,
          },
          {
            key: "13-ffdgv0",
            route: "/panel/admin/config/set-fee-name",
            title: "Set Fee Name",
            icon: <Money />,
          },
          {
            key: "13-fdgd0",
            route: "/panel/admin/config/set-grade",
            title: "Set Grade",
            icon: <Grade />,
          },
          {
            key: "13-0ffg",
            route: "/panel/admin/config/set-session",
            title: "Set Session",
            icon: <Timelapse />,
          },
          {
            key: "13-0sfd",
            route: "/panel/admin/config/set-designation",
            title: "Set Designation",
            icon: <AssignmentInd />,
          },
          {
            key: "13-0skhkhfd",
            route: "/panel/admin/config/set-subject",
            title: "Set Subject",
            icon: <Subject />,
          },
          {
            key: "13-0skhksashfd",
            route: "/panel/admin/config/book-category",
            title: "Book Category",
            icon: <Book />,
          },
          {
            key: "13-0skhksashfd",
            route: "/panel/admin/config/publication",
            title: "Book Publication",
            icon: <MenuBook />,
          },
          {
            key: "13-0skhksassshfd",
            route: "/panel/admin/config/author",
            title: "Book Author",
            icon: <DriveFileRenameOutline />,
          },
          {
            key: "13-0skhksdsashfd",
            route: "/panel/admin/config/set-inventory-category",
            title: "Inventory Category",
            icon: <Inventory />,
          },
          {
            key: "13-0ksdsashfd",
            route: "/panel/admin/config/set-holidays",
            title: "Holidays",
            icon: <HolidayVillage />,
          },
          {
            key: "13-0fsdf",
            route: "/panel/admin/config/uploadLogo",
            title: "Upload Logo",
            icon: <Upload />,
          },
        ],
      },
      {
        key: "18",
        title: "Settings",
        icon: <Settings />,
        submenus: [
          {
            key: "11-0",
            title: "Edit Profile",
            icon: <ManageAccounts />,
            route: "/panel/admin/profile",
          },
          {
            key: "13-0",
            route: "/panel/admin/change-password",
            title: "Change Password",
            icon: <Key />,
          },
        ],
      },

      ...(process.env.NEXT_PUBLIC_APP_TYPE !== "PROD"
        ? [
            {
              key: "0-nacc-sddsasd",
              title: "Naac PDF",
              icon: <PictureAsPdf />,
              route: "/naac-pdf.pdf",
            },
          ]
        : []),
    ];
  if (
    user?.role === "STAFF" ||
    (user?.role?.toUpperCase() === "MANAGER" && switchInstitute)
  )
    return [
      {
        key: "1",
        title: "Dashboard",
        icon: <Dashboard />,
        route: "/panel/admin/dashboard",
      },
      ...(userPermission?.data?.manageAdmission
        ? [
            {
              key: "1a",
              title: "Admission",
              icon: <SupervisedUserCircle />,
              submenus: [
                {
                  key: "7.15",
                  title: "Dashboard",
                  icon: <Leaderboard />,
                  route: "/panel/admin/admission/dashboard",
                },
                {
                  key: "2-1",
                  title: "Admission Form",
                  icon: <AppRegistration />,
                  route: "/panel/admin/admission/request",
                },
                {
                  key: "2-1dsdf",
                  title: "Bulk Upload",
                  icon: <CloudUpload />,
                  route: "/panel/admin/admission/bulk-upload",
                },
                // {
                //   key: "2-2",
                //   title: "Manage Admission",
                //   icon: <ManageAccounts />,
                //   route: "/panel/admin/admission",
                // },
              ],
            },
          ]
        : []),
      ...(userPermission?.data?.manageStudents
        ? [
            {
              key: "2",
              title: "Students",
              icon: <SupervisorAccount />,
              // route: "/panel/admin/users",
              submenus: [
                {
                  key: "7.15",
                  title: "Dashboard",
                  icon: <Leaderboard />,
                  route: "/panel/admin/student/dashboard",
                },
                {
                  key: "2-1",
                  title: "Manage Student",
                  icon: <ManageAccounts />,
                  route: "/panel/admin/student",
                },
              ],
            },
          ]
        : []),
      ...(userPermission?.data?.manageAssignment
        ? [
            {
              key: "10.yy",
              title: "Assignments",
              icon: <Assignment />,
              submenus: [
                // {
                //   key: "7-1",
                //   title: "Create Assignments",
                //   icon: <Add />,
                //   route: "/panel/admin/create",
                // },
                {
                  key: "7-2",
                  title: "Manage Assignments",
                  icon: <ManageAccounts />,
                  route: "/panel/admin/assignment",
                },
              ],
            },
          ]
        : []),
      ...(userPermission?.data?.manageDocument
        ? [
            {
              key: "1144587585145",
              title: "Chairman",
              icon: <SupervisorAccount />,
              submenus: [
                {
                  key: "4-2",
                  title: "MOUs",
                  icon: <DriveFileRenameOutline />,
                  route: "/panel/admin/mou",
                },
                {
                  key: "4-6",
                  title: "Documents",
                  icon: <Source />,
                  route: "/panel/admin/docs",
                },
                {
                  key: "6-4",
                  title: "Appointments",
                  icon: <People />,
                  route: "/panel/admin/appointment",
                },
                {
                  key: "6-4x",
                  title: "Projects",
                  icon: <Folder />,
                  route: "/panel/admin/project",
                },
                {
                  key: "6-4ds",
                  title: "Resource Persons",
                  icon: <Person />,
                  route: "/panel/admin/resource-person",
                },
                {
                  key: "1.7868",
                  title: "Accredit & Affiliate",
                  route: "/panel/admin/accreditation-affiliation",
                  icon: <AccountBalance />,
                },
              ],
            },
          ]
        : []),
      ...(userPermission?.data?.manageMarketingResource
        ? [
            {
              key: "6-4ds",
              title: "Marketing Resource",
              icon: <Person />,
              route: "/panel/admin/marketing-resource",
            },
          ]
        : []),
      ...(userPermission?.data?.manageStaff
        ? [
            {
              key: "9",
              title: "Staffs",
              icon: <Engineering />,
              submenus: [
                {
                  key: "6",
                  title: "Dashboard",
                  icon: <Leaderboard />,
                  route: "/panel/admin/staff/dashboard",
                },
                {
                  key: "6-1",
                  title: "Create Staff",
                  icon: <Add />,
                  route: "/panel/admin/staff/register",
                },
                {
                  key: "2-1dsdf",
                  title: "Bulk Upload",
                  icon: <CloudUpload />,
                  route: "/panel/admin/staff/bulk-upload",
                },
                {
                  key: "6-11",
                  title: "Teaching Staffs",
                  icon: <CastForEducation />,
                  route: "/panel/admin/staff/teaching-staff",
                },
                {
                  key: "6-15",
                  title: "Non Teaching Staffs",
                  icon: <Groups3 />,
                  route: "/panel/admin/staff/non-teaching-staff",
                },
                {
                  key: "6-2",
                  title: "Staff Attendance",
                  icon: <Description />,
                  route: "/panel/admin/staff/attendance",
                },
                {
                  key: "6-3",
                  title: "Leave Management",
                  icon: <People />,
                  route: "/panel/admin/staff/leave-management",
                },

                {
                  key: "6-3irffuii",
                  title: "Staff Payment",
                  icon: <Money />,
                  route: "/panel/admin/staff/payment",
                },
              ],
            },
          ]
        : []),
      ...(userPermission?.data?.manageBatch
        ? [
            {
              key: "4",
              title: "Batch",
              icon: <ConnectWithoutContact />,
              submenus: [
                // {
                //   key: "4-11",
                //   title: "Dashboard",
                //   icon: <Leaderboard />,
                //   route: "/panel/admin/batch/dashboard",
                // },
                {
                  key: "4-0",
                  title: "Create Batch",
                  icon: <DesignServices />,
                  route: "/panel/admin/batch/create",
                },
                {
                  key: "4-1",
                  title: "Manage Batch",
                  icon: <ManageAccounts />,
                  route: "/panel/admin/batch",
                },
              ],
            },
          ]
        : []),
      ...(userPermission?.data?.manageDepartment
        ? [
            {
              key: "10",
              title: "Department",
              icon: <HandymanRounded />,
              submenus: [
                {
                  key: "7.15",
                  title: "Dashboard",
                  icon: <Leaderboard />,
                  route: "/panel/admin/department/dashboard",
                },
                // {
                //   key: "7-1",
                //   title: "Create Department",
                //   icon: <DesignServices />,
                //   route: "/panel/admin/department/create",
                // },
                {
                  key: "7-2",
                  title: "Manage Department",
                  icon: <ManageAccounts />,
                  route: "/panel/admin/department",
                },
              ],
            },
          ]
        : []),
      ...(userPermission?.data?.manageExam
        ? [
            {
              key: "6pl.19",
              title: "Exam",
              icon: <MenuBook />,
              submenus: [
                {
                  key: "61pl-2",
                  title: "Create Exam",
                  icon: <Add />,
                  route: "/panel/admin/exam/create",
                },
                {
                  key: "6.1-3",
                  title: "View Schedule Exam",
                  icon: <ViewStream />,
                  route: "/panel/admin/exam/schedule",
                },
                {
                  key: "6.1-2",
                  title: "Manage Exam",
                  icon: <DesignServices />,
                  route: "/panel/admin/exam",
                },
              ],
            },
          ]
        : []),
      ...(userPermission?.data?.manageFees
        ? [
            {
              key: "4iid",
              title: "Fees",
              icon: <Money />,

              submenus: [
                // {
                //   key: "8ii",
                //   title: "Dashboard",
                //   icon: <Leaderboard />,
                //   route: "/panel/admin/library/dashboard",
                // },
                {
                  key: "8-1",
                  title: "Manage Fees",
                  icon: <CurrencyRupee />,
                  route: "/panel/admin/fees",
                },
              ],
            },
          ]
        : []),
      ...(userPermission?.data?.manageFinance
        ? [
            {
              key: "4ii",
              title: "Finance",
              icon: <AccountBalance />,
              submenus: [
                {
                  key: "4-11",
                  title: "Dashboard",
                  icon: <Leaderboard />,
                  route: "/panel/admin/payment/dashboard",
                },
                {
                  key: "2-1dsdf",
                  title: "Bulk Upload",
                  icon: <CloudUpload />,
                  route: "/panel/admin/payment/bulk-upload",
                },
                {
                  key: "4-0",
                  title: "Manage Finance",
                  icon: <ManageAccounts />,
                  route: "/panel/admin/payment",
                },
              ],
            },
          ]
        : []),
      {
        key: "13rfefgregf",
        title: "My Documents",
        icon: <Source />,
        submenus: [
          {
            key: "4-2",
            title: "Manage",
            icon: <Source />,
            route: "/panel/admin/documents",
          },
        ],
      },
      {
        key: "6-3irffucdii",
        title: "Request Supply ",
        icon: <RequestPage />,
        route: "/panel/admin/staff/create-supply-request",
      },

      ...(userPermission?.data?.manageLibrary
        ? [
            {
              key: "65",
              title: "Library",
              icon: <LocalLibrary />,
              submenus: [
                // {
                //   key: "8ii",
                //   title: "Dashboard",
                //   icon: <Leaderboard />,
                //   route: "/panel/admin/library/dashboard",
                // },
                {
                  key: "8-1",
                  title: "Manage Book",
                  icon: <LibraryBooks />,
                  route: "/panel/admin/library/manage-book",
                },
                {
                  key: "8-3",
                  title: "Issue Book",
                  icon: <DesignServices />,
                  route: "/panel/admin/library/book-issue",
                },
              ],
            },
          ]
        : []),
      ...(userPermission?.data?.manageInventory
        ? [
            {
              key: "66",
              title: "Inventory",
              icon: <Inventory />,
              submenus: [
                {
                  key: "8ii",
                  title: "Dashboard",
                  icon: <Leaderboard />,
                  route: "/panel/admin/inventory/dashboard",
                },
                {
                  key: "8-1",
                  title: "Create Stock",
                  icon: <DesignServices />,
                  route: "/panel/admin/inventory/create",
                },
                {
                  key: "2-1dsdf",
                  title: "Bulk Upload",
                  icon: <CloudUpload />,
                  route: "/panel/admin/inventory/bulk-upload",
                },

                {
                  key: "8-2",
                  title: "Manage Stock",
                  icon: <ManageAccounts />,
                  route: "/panel/admin/inventory/manage-stock",
                },
                {
                  key: "8-2x",
                  title: "Supply Requests",
                  icon: <Pending />,
                  route: "/panel/admin/inventory/supply-requests",
                },
                {
                  key: "8-3",
                  title: "Stock Supplied",
                  icon: <Unarchive />,
                  route: "/panel/admin/inventory/supplied-stock",
                },
              ],
            },
          ]
        : []),
      ...(userPermission?.data?.manageNaac
        ? [
            {
              key: "3-nacc-dsadfdf",
              title: "NAAC",
              route: "/panel/admin/naac",
              icon: <AccountBalance />,
            },
          ]
        : []),
      ...(userPermission?.data?.manageEvent
        ? [
            {
              key: "4saA-4",
              title: "Events",
              icon: <CalendarMonth />,
              route: "/panel/admin/events",
            },
          ]
        : []),
      ...(userPermission?.data?.manageTransport
        ? [
            {
              key: "64",
              title: "Transport",
              icon: <DirectionsBus />,
              submenus: [
                {
                  key: "8ii",
                  title: "Dashboard",
                  icon: <Leaderboard />,
                  route: "/panel/admin/transport/dashboard",
                },
                {
                  key: "8-1",
                  title: "Manage Vehicle",
                  icon: <DepartureBoard />,
                  route: "/panel/admin/transport/manage-vehicle",
                },
                {
                  key: "8-1",
                  title: "Manage Drivers",
                  icon: <Person />,
                  route: "/panel/admin/transport/manage-drivers",
                },
                {
                  key: "2-1dsdf",
                  title: "Bulk Upload",
                  icon: <CloudUpload />,
                  route: "/panel/admin/transport/bulk-upload",
                },
                {
                  key: "8-2",
                  title: "Manage Transport",
                  icon: <ManageAccounts />,
                  route: "/panel/admin/transport/manage-transport",
                },
              ],
            },
          ]
        : []),
      ...(userPermission?.data?.manageGrievance
        ? [
            {
              key: "6.1",
              title: "Notice",
              icon: <NotificationsActive />,
              submenus: [
                {
                  key: "6.1-2",
                  title: "Create Notice",
                  icon: <DesignServices />,
                  route: "/panel/admin/notice/create",
                },
                {
                  key: "6.1-3",
                  title: "Manage Notice",
                  icon: <ManageAccounts />,
                  route: "/panel/admin/notice",
                },
              ],
            },
          ]
        : []),
      ...(userPermission?.data?.manageAlumni
        ? [
            {
              key: "6pl.1sd",
              title: "Alumni ",
              icon: <People />,

              submenus: [
                {
                  key: "4-0",
                  title: "Manage Alumni",
                  icon: <ManageAccounts />,
                  route: "/panel/admin/alumni",
                },
              ],
            },
          ]
        : []),
      ...(userPermission?.data?.managePlacement
        ? [
            {
              key: "6pl.1",
              title: "Placement Cell ",
              icon: <BusinessCenter />,
              submenus: [
                {
                  key: "8ii",
                  title: "Dashboard",
                  icon: <Leaderboard />,
                  route: "/panel/admin/placement/dashboard",
                },
                {
                  key: "6.1-3",
                  title: "Manage Placement Notice",
                  icon: <ManageAccounts />,
                  route: "/panel/admin/placement",
                },
                {
                  key: "6.1-568",
                  title: "Placement Report",
                  icon: <People />,
                  route: "/panel/admin/placement/archive",
                },
                {
                  key: "6.1-568wswsw",
                  title: "Company",
                  icon: <Business />,
                  route: "/panel/admin/company",
                },
              ],
            },
          ]
        : []),
      ...(userPermission?.data?.manageFeedback
        ? [
            {
              key: "62",
              title: "Enquiry",
              icon: <ErrorOutline />,
              route: "/panel/admin/enquiry",
            },
          ]
        : []),
      // <-------------------------------edit-nonteachingstaff----------------------->
      {
        key: "66556",
        title: "Leave",
        icon: <PeopleAlt />,
        route: "/panel/staff/leave",
      },
      {
        key: "660",
        title: "Update Profile",
        icon: <Edit />,
        route: "/panel/admin/edit-nonteachingstaff",
      },
      {
        key: "17",
        title: "Notifications",
        icon: <Notifications />,
        route: "/panel/admin/notification",
      },
      {
        key: "16",
        title: "Support",
        icon: <SupportAgent />,
        route: "/panel/admin/support",
      },
      ...(userPermission?.data?.manageConfig
        ? [
            {
              key: "17ki",
              title: "Config",
              icon: <SettingsCell />,
              submenus: [
                {
                  key: "13-fdf0",
                  route: "/panel/admin/config/admin-app-config",
                  title: "App Config",
                  icon: <AdminPanelSettings />,
                },
                // {
                //   key: "13-fsdf0",
                //   route: "/panel/admin/config/student-app-config",
                //   title: "Student App Config",
                //   icon: <CastForEducation />,
                // },
                // {
                //   key: "13-fs0",
                //   route: "/panel/admin/config/teacher-app-config",
                //   title: "Teacher App Config",
                //   icon: <Person2 />,
                // },
                {
                  key: "13-ff0",
                  route: "/panel/admin/config/set-course",
                  title: "Set Course",
                  icon: <MenuBook />,
                },
                {
                  key: "13-ffdgv0",
                  route: "/panel/admin/config/set-fee-name",
                  title: "Set Fee Name",
                  icon: <Money />,
                },
                {
                  key: "13-fdgd0",
                  route: "/panel/admin/config/set-grade",
                  title: "Set Grade",
                  icon: <Grade />,
                },
                {
                  key: "13-0ffg",
                  route: "/panel/admin/config/set-session",
                  title: "Set Session",
                  icon: <Timelapse />,
                },
                {
                  key: "13-0sfd",
                  route: "/panel/admin/config/set-designation",
                  title: "Set Designation",
                  icon: <AssignmentInd />,
                },
                {
                  key: "13-0skhkhfd",
                  route: "/panel/admin/config/set-subject",
                  title: "Set Subject",
                  icon: <Subject />,
                },
                {
                  key: "13-0skhksashfd",
                  route: "/panel/admin/config/book-category",
                  title: "Book Category",
                  icon: <Book />,
                },
                {
                  key: "13-0skhksashfd",
                  route: "/panel/admin/config/publication",
                  title: "Book Publication",
                  icon: <MenuBook />,
                },
                {
                  key: "13-0skhksassshfd",
                  route: "/panel/admin/config/author",
                  title: "Book Author",
                  icon: <DriveFileRenameOutline />,
                },
                {
                  key: "13-0skhksdsashfd",
                  route: "/panel/admin/config/set-inventory-category",
                  title: "Inventory Category",
                  icon: <Inventory />,
                },
                {
                  key: "13-0fsdf",
                  route: "/panel/admin/config/uploadLogo",
                  title: "Upload Logo",
                  icon: <Upload />,
                },
              ],
            },
          ]
        : []),
      {
        key: "18",
        title: "Settings",
        icon: <Settings />,
        submenus: [
          {
            key: "13-0",
            route: "/panel/admin/change-password",
            title: "Change Password",
            icon: <Key />,
          },
        ],
      },
    ];
  if (user?.role?.toUpperCase() === "STUDENT")
    return [
      {
        key: "1",
        title: "Dashboard",
        icon: <Dashboard />,
        route: "/panel/student/dashboard",
      },
      {
        key: "2",
        title: "Time Table",
        icon: <AccessAlarm />,
        submenus: [
          {
            key: "2-1",
            title: "Dashboard",
            icon: <Leaderboard />,
            route: "/panel/student/timetable/dashboard",
          },
          {
            key: "2-2",
            title: "View Timetable",
            icon: <CalendarViewDayRounded />,
            route: "/panel/student/timetable",
          },
        ],
      },
      {
        key: "3",
        title: "Attendance",
        icon: <TouchApp />,
        submenus: [
          {
            key: "3-0",
            title: "Dashboard",
            icon: <Leaderboard />,
            route: "/panel/student/attendance/dashboard",
          },
          {
            key: "3-1",
            title: "View Attendance",
            icon: <GridView />,
            route: "/panel/student/attendance",
          },
        ],
      },
      {
        key: "4",
        title: "Assignment",
        icon: <Assignment />,
        submenus: [
          {
            key: "4-0",
            title: "Dashboard",
            icon: <Leaderboard />,
            route: "/panel/student/assignment/dashboard",
          },
          {
            key: "4-1",
            title: "View Assignment",
            icon: <GridView />,
            route: "/panel/student/assignment",
          },
          {
            key: "4-2",
            title: "View Results",
            icon: <FactCheck />,
            route: "/panel/student/assignment/result",
          },
        ],
      },
      {
        key: "5",
        title: "Exams",
        icon: <Quiz />,
        submenus: [
          {
            key: "5-0",
            title: "Dashboard",
            icon: <Leaderboard />,
            route: "/panel/student/exam/dashboard",
          },
          {
            key: "5-1",
            title: "View Exam",
            icon: <GridView />,
            route: "/panel/student/exam",
          },
          {
            key: "5-2",
            title: "Exam Results",
            icon: <FactCheck />,
            route: "/panel/student/results",
          },
        ],
      },
      {
        key: "11k",
        title: "Online Classes",
        icon: <CastForEducation />,
        route: "/panel/student/lms",
      },
      {
        key: "6rgtegte",
        title: "Certificates",
        icon: <Report />,
        route: "/panel/student/certificates",
      },
      {
        key: "6rgtegterttrtrhtrht",
        title: "Materials",
        icon: <Note />,
        route: "/panel/student/materials",
      },
      {
        key: "8rgfgre",
        title: "Fees",
        icon: <Payments />,
        route: "/panel/student/fees",
      },
      // {
      //   key: "9",
      //   title: "Transport",
      //   icon: <DirectionsBus />,
      //   route: "/panel/student/transport",
      // },
      {
        key: "10rfefrf",
        title: "Issued Books",
        icon: <AutoStories />,
        route: "/panel/student/library",
      },
      {
        key: "12",
        title: "Placements",
        icon: <School />,
        route: "/panel/student/placement",
      },
      {
        key: "9ijk",
        title: "Notice",
        icon: <EventNote />,
        route: "/panel/student/notice",
      },
      {
        key: "9",
        title: "Notification",
        icon: <NotificationsActive />,
        route: "/panel/student/notification",
      },
      // {
      //   key: "14",
      //   title: "Feedback",
      //   icon: <Feedback />,

      // },
      {
        key: "10rwerwrerf",
        title: "Grievance",
        icon: <ErrorOutline />,
        route: "/panel/student/grievance",
      },
      {
        key: "11fwegfwrgvgv",
        title: "Settings",
        icon: <Settings />,
        // route: "/panel/student/setting",
        submenus: [
          {
            key: "11-0",
            title: "Edit Profile",
            icon: <ManageAccounts />,
            route: "/panel/student/profile",
          },
          {
            key: "11-1",
            title: "Change Password",
            icon: <SettingsSuggest />,
            route: "/panel/student/change-password",
          },
          // {
          //   key: "11-2",
          //   title: "Delete Account",
          //   icon: <DeleteForever />,
          //   // route: "/panel/student/student-feedback",
          // },
        ],
      },
    ];
  if (user?.role?.toUpperCase() === "PARENT")
    return [
      {
        key: "1",
        title: "Dashboard",
        icon: <Dashboard />,
        route: "/panel/student/dashboard",
      },
      {
        key: "2",
        title: "Time Table",
        icon: <AccessAlarm />,
        submenus: [
          {
            key: "2-1",
            title: "Dashboard",
            icon: <Leaderboard />,
            route: "/panel/student/timetable/dashboard",
          },
          {
            key: "2-2",
            title: "View Timetable",
            icon: <CalendarViewDayRounded />,
            route: "/panel/student/timetable",
          },
        ],
      },
      {
        key: "3",
        title: "Attendance",
        icon: <TouchApp />,
        submenus: [
          {
            key: "3-0",
            title: "Dashboard",
            icon: <Leaderboard />,
            route: "/panel/student/attendance/dashboard",
          },
          {
            key: "3-1",
            title: "View Attendance",
            icon: <GridView />,
            route: "/panel/student/attendance",
          },
        ],
      },
      {
        key: "4",
        title: "Assignment",
        icon: <Assignment />,
        submenus: [
          {
            key: "4-0",
            title: "Dashboard",
            icon: <Leaderboard />,
            route: "/panel/student/assignment/dashboard",
          },
          {
            key: "4-2",
            title: "View Results",
            icon: <FactCheck />,
            route: "/panel/student/assignment/result",
          },
        ],
      },
      {
        key: "5",
        title: "Exams",
        icon: <Quiz />,
        submenus: [
          {
            key: "5-0",
            title: "Dashboard",
            icon: <Leaderboard />,
            route: "/panel/student/exam/dashboard",
          },
          {
            key: "5-2",
            title: "Exam Results",
            icon: <FactCheck />,
            route: "/panel/student/results",
          },
        ],
      },
      {
        key: "6rgtegte",
        title: "Certificates",
        icon: <Report />,
        route: "/panel/student/certificates",
      },
      {
        key: "8rgfgre",
        title: "Fees",
        icon: <Payments />,
        route: "/panel/student/fees",
      },
      {
        key: "12",
        title: "Placements",
        icon: <School />,
        route: "/panel/student/placement",
      },
      {
        key: "9ijk",
        title: "Notice",
        icon: <EventNote />,
        route: "/panel/student/notice",
      },
      {
        key: "11fwegfwrgvgv",
        title: "Settings",
        icon: <Settings />,
        // route: "/panel/student/setting",
        submenus: [
          {
            key: "11-0",
            title: "Edit Profile",
            icon: <ManageAccounts />,
            route: "/panel/student/profile",
          },
          {
            key: "11-1",
            title: "Change Password",
            icon: <SettingsSuggest />,
            route: "/panel/student/change-password",
          },
        ],
      },
    ];
  if (user?.role?.toUpperCase() === "TEACHER")
    return [
      {
        key: "1",
        title: "Dashboard",
        icon: <Dashboard />,
        route: "/panel/teacher/dashboard",
      },
      {
        key: "2",
        title: "Timetable",
        icon: <CalendarMonth />,
        submenus: [
          {
            key: "2-1",
            title: "Dashboard",
            icon: <Leaderboard />,
            route: "/panel/teacher/timetable/dashboard",
          },
          {
            key: "2-2",
            title: "View Timetable",
            icon: <CalendarViewDayRounded />,
            route: "/panel/teacher/timetable",
          },
          {
            key: "2-3",
            title: "Classes",
            icon: <School />,
            route: "/panel/teacher/class",
          },
        ],
      },
      {
        key: "3",
        title: "Assignment",
        icon: <Assignment />,
        submenus: [
          {
            key: "3-1",
            title: "Dashboard",
            icon: <Leaderboard />,
            route: "/panel/teacher/assignment/dashboard",
          },
          {
            key: "3-3",
            title: "Create Assignment",
            icon: <DesignServices />,
            route: "/panel/teacher/assignment/create",
          },
          {
            key: "3-2",
            title: "Manage Assignment",
            icon: <ManageAccounts />,
            route: "/panel/teacher/assignment",
          },
        ],
      },
      {
        key: "4",
        title: "Exam",
        icon: <SaveAs />,
        submenus: [
          {
            key: "4-0",
            title: "Dashboard",
            icon: <Leaderboard />,
            route: "/panel/teacher/exam/dashboard",
          },
          {
            key: "4-1",
            title: "Schedule Exam",
            icon: <DesignServices />,
            route: "/panel/teacher/exam/view",
          },
          {
            key: "4-2",
            title: "Manage Exam",
            icon: <ManageAccounts />,
            route: "/panel/teacher/exam",
          },
        ],
      },
      {
        key: "11",
        title: "LMS",
        icon: <CastForEducation />,
        submenus: [
          {
            key: "1-0",
            title: "Dashboard",
            icon: <Leaderboard />,
            route: "/panel/teacher/lms/dashboard",
          },
          {
            key: "11-1",
            title: "Manage LMS",
            icon: <ManageAccounts />,
            route: "/panel/teacher/lms",
          },
        ],
      },

      ...(userPermission?.data?.manageBatch
        ? [
            {
              key: "4kkkfefke",
              title: "Batch",
              icon: <ConnectWithoutContact />,
              submenus: [
                {
                  key: "4-1tt",
                  title: "Dashboard",
                  icon: <Leaderboard />,
                  route: "/panel/teacher/batch/dashboard",
                },
                {
                  key: "4-0",
                  title: "Create Batch",
                  icon: <DesignServices />,
                  route: "/panel/teacher/batch/create",
                },
                {
                  key: "4-1",
                  title: "Manage Batch",
                  icon: <ManageAccounts />,
                  route: "/panel/teacher/batch",
                },
              ],
            },
          ]
        : [
            {
              key: "7",
              title: "Batch",
              icon: <FactCheck />,
              submenus: [
                {
                  key: "4-1",
                  title: "Dashboard",
                  icon: <Leaderboard />,
                  route: "/panel/teacher/batch/dashboard",
                },
                {
                  key: "4-2",
                  title: "View Batches",
                  icon: <ManageAccounts />,
                  route: "/panel/teacher/batch",
                },
              ],
            },
          ]),
      {
        key: "13rfefgregf",
        title: "My Documents",
        icon: <Source />,
        submenus: [
          {
            key: "4-2",
            title: "Manage",
            icon: <Source />,
            route: "/panel/teacher/documents",
          },
        ],
      },
      {
        key: "6-3irffucdii",
        title: "Supply Request",
        icon: <RequestPage />,
        route: "/panel/teacher/create-supply-request",
      },
      {
        key: "66556",
        title: "Leave",
        icon: <PeopleAlt />,
        route: "/panel/staff/leave",
      },
      {
        key: "13",
        title: "Notices",
        icon: <NotificationsActive />,
        submenus: [
          // {
          //   key: "4-1",
          //   title: "Create Notice",
          //   icon: <DesignServices />,
          //   route: "/panel/teacher/notice/create",
          // },
          {
            key: "4-2",
            title: "View Notice",
            icon: <ManageAccounts />,
            route: "/panel/teacher/notice",
          },
        ],
      },
      {
        key: "14",
        title: "My Attendance",
        icon: <Class />,
        route: "/panel/teacher/attendance",
      },
      {
        key: "15",
        title: "Notification",
        icon: <Notifications />,
        route: "/panel/teacher/notification",
      },
      {
        key: "16",
        title: "Support",
        icon: <SupportAgent />,
        route: "/panel/teacher/support",
      },
      ...(userPermission?.data?.manageAdmission
        ? [
            {
              key: "1a",
              title: "Admission",
              icon: <SupervisedUserCircle />,
              submenus: [
                {
                  key: "7.15",
                  title: "Dashboard",
                  icon: <Leaderboard />,
                  route: "/panel/admin/admission/dashboard",
                },
                {
                  key: "2-1",
                  title: "Admission Form",
                  icon: <AppRegistration />,
                  route: "/panel/admin/admission/request",
                },
                // {
                //   key: "2-2",
                //   title: "Manage Admission",
                //   icon: <ManageAccounts />,
                //   route: "/panel/admin/admission",
                // },
              ],
            },
          ]
        : []),
      ...(userPermission?.data?.manageStudents
        ? [
            {
              key: "2",
              title: "Students",
              icon: <SupervisorAccount />,
              // route: "/panel/admin/users",
              submenus: [
                {
                  key: "7.15",
                  title: "Dashboard",
                  icon: <Leaderboard />,
                  route: "/panel/admin/student/dashboard",
                },
                {
                  key: "2-1",
                  title: "Manage Student",
                  icon: <ManageAccounts />,
                  route: "/panel/admin/student",
                },
              ],
            },
          ]
        : []),
      ...(userPermission?.data?.manageAssignment
        ? [
            {
              key: "10.yy",
              title: "Assignments",
              icon: <Assignment />,
              submenus: [
                // {
                //   key: "7-1",
                //   title: "Create Assignments",
                //   icon: <Add />,
                //   route: "/panel/admin/create",
                // },
                {
                  key: "7-2",
                  title: "Manage Assignments",
                  icon: <ManageAccounts />,
                  route: "/panel/admin/assignment",
                },
              ],
            },
          ]
        : []),
      ...(userPermission?.data?.manageDocument
        ? [
            {
              key: "1144587585145",
              title: "Chairman",
              icon: <SupervisorAccount />,
              submenus: [
                {
                  key: "4-2",
                  title: "MOUs",
                  icon: <DriveFileRenameOutline />,
                  route: "/panel/admin/mou",
                },
                {
                  key: "4-6",
                  title: "Documents",
                  icon: <Source />,
                  route: "/panel/admin/docs",
                },
                {
                  key: "6-4",
                  title: "Appointments",
                  icon: <People />,
                  route: "/panel/admin/appointment",
                },
                {
                  key: "6-4x",
                  title: "Projects",
                  icon: <Folder />,
                  route: "/panel/admin/project",
                },
                {
                  key: "6-4ds",
                  title: "Resource Persons",
                  icon: <Person />,
                  route: "/panel/admin/resource-person",
                },
                {
                  key: "1.7868",
                  title: "Accredit & Affiliate",
                  route: "/panel/admin/accreditation-affiliation",
                  icon: <AccountBalance />,
                },
              ],
            },
          ]
        : []),
      ...(userPermission?.data?.manageMarketingResource
        ? [
            {
              key: "6-4ds",
              title: "Marketing Resource",
              icon: <Person />,
              route: "/panel/admin/marketing-resource",
            },
          ]
        : []),
      ...(userPermission?.data?.manageStaff
        ? [
            {
              key: "9",
              title: "Staffs",
              icon: <Engineering />,
              submenus: [
                {
                  key: "6",
                  title: "Dashboard",
                  icon: <Leaderboard />,
                  route: "/panel/admin/staff/dashboard",
                },
                {
                  key: "6-1",
                  title: "Create Staff",
                  icon: <Add />,
                  route: "/panel/admin/staff/register",
                },
                {
                  key: "6-11",
                  title: "Teaching Staffs",
                  icon: <CastForEducation />,
                  route: "/panel/admin/staff/teaching-staff",
                },
                {
                  key: "6-15",
                  title: "Non Teaching Staffs",
                  icon: <Groups3 />,
                  route: "/panel/admin/staff/non-teaching-staff",
                },
                {
                  key: "6-2",
                  title: "Staff Attendance",
                  icon: <Description />,
                  route: "/panel/admin/staff/attendance",
                },
                {
                  key: "6-3",
                  title: "Leave Management",
                  icon: <People />,
                  route: "/panel/admin/staff/leave-management",
                },
                {
                  key: "6-3irffuii",
                  title: "Staff Payment",
                  icon: <Money />,
                  route: "/panel/admin/staff/payment",
                },
              ],
            },
          ]
        : []),

      ...(userPermission?.data?.manageDepartment
        ? [
            {
              key: "10",
              title: "Department",
              icon: <HandymanRounded />,
              submenus: [
                {
                  key: "7.15",
                  title: "Dashboard",
                  icon: <Leaderboard />,
                  route: "/panel/admin/department/dashboard",
                },
                // {
                //   key: "7-1",
                //   title: "Create Department",
                //   icon: <DesignServices />,
                //   route: "/panel/admin/department/create",
                // },
                {
                  key: "7-2",
                  title: "Manage Department",
                  icon: <ManageAccounts />,
                  route: "/panel/admin/department",
                },
              ],
            },
          ]
        : []),
      ...(userPermission?.data?.manageExam
        ? [
            {
              key: "6pl.19",
              title: "Exam",
              icon: <MenuBook />,
              submenus: [
                {
                  key: "61pl-2",
                  title: "Create Exam",
                  icon: <Add />,
                  route: "/panel/admin/exam/create",
                },
                {
                  key: "6.1-3",
                  title: "View Schedule Exam",
                  icon: <ViewStream />,
                  route: "/panel/admin/exam/schedule",
                },
                {
                  key: "6.1-2",
                  title: "Manage Exam",
                  icon: <DesignServices />,
                  route: "/panel/admin/exam",
                },
              ],
            },
          ]
        : []),
      ...(userPermission?.data?.manageFees
        ? [
            {
              key: "4iid",
              title: "Fees",
              icon: <Money />,

              submenus: [
                // {
                //   key: "8ii",
                //   title: "Dashboard",
                //   icon: <Leaderboard />,
                //   route: "/panel/admin/library/dashboard",
                // },
                {
                  key: "8-1",
                  title: "Manage Fees",
                  icon: <CurrencyRupee />,
                  route: "/panel/admin/fees",
                },
              ],
            },
          ]
        : []),
      ...(userPermission?.data?.manageFinance
        ? [
            {
              key: "4ii",
              title: "Finance",
              icon: <AccountBalance />,
              submenus: [
                {
                  key: "4-11",
                  title: "Dashboard",
                  icon: <Leaderboard />,
                  route: "/panel/admin/payment/dashboard",
                },
                {
                  key: "2-1dsdf",
                  title: "Bulk Upload",
                  icon: <CloudUpload />,
                  route: "/panel/admin/payment/bulk-upload",
                },
                {
                  key: "4-0",
                  title: "Manage Finance",
                  icon: <ManageAccounts />,
                  route: "/panel/admin/payment",
                },
              ],
            },
          ]
        : []),
      ...(userPermission?.data?.manageLibrary
        ? [
            {
              key: "65",
              title: "Library",
              icon: <LocalLibrary />,
              submenus: [
                // {
                //   key: "8ii",
                //   title: "Dashboard",
                //   icon: <Leaderboard />,
                //   route: "/panel/admin/library/dashboard",
                // },
                {
                  key: "8-1",
                  title: "Manage Book",
                  icon: <LibraryBooks />,
                  route: "/panel/admin/library/manage-book",
                },
                {
                  key: "8-3",
                  title: "Issue Book",
                  icon: <DesignServices />,
                  route: "/panel/admin/library/book-issue",
                },
              ],
            },
          ]
        : []),
      ...(userPermission?.data?.manageInventory
        ? [
            {
              key: "66",
              title: "Inventory",
              icon: <Inventory />,
              submenus: [
                {
                  key: "8ii",
                  title: "Dashboard",
                  icon: <Leaderboard />,
                  route: "/panel/admin/inventory/dashboard",
                },
                {
                  key: "8-1",
                  title: "Create Stock",
                  icon: <DesignServices />,
                  route: "/panel/admin/inventory/create",
                },
                {
                  key: "2-1dsdf",
                  title: "Bulk Upload",
                  icon: <CloudUpload />,
                  route: "/panel/admin/inventory/bulk-upload",
                },

                {
                  key: "8-2",
                  title: "Manage Stock",
                  icon: <ManageAccounts />,
                  route: "/panel/admin/inventory/manage-stock",
                },
                {
                  key: "8-2x",
                  title: "Supply Requests",
                  icon: <Pending />,
                  route: "/panel/admin/inventory/supply-requests",
                },
                {
                  key: "8-3",
                  title: "Stock Supplied",
                  icon: <Unarchive />,
                  route: "/panel/admin/inventory/supplied-stock",
                },
              ],
            },
          ]
        : []),

      ...(userPermission?.data?.manageNaac
        ? [
            {
              key: "3-nacc-dsadfdf",
              title: "NAAC",
              route: "/panel/admin/naac",
              icon: <AccountBalance />,
            },
          ]
        : []),
      ...(userPermission?.data?.manageEvent
        ? [
            {
              key: "4saA-4",
              title: "Events",
              icon: <CalendarMonth />,
              route: "/panel/admin/events",
            },
          ]
        : []),
      ...(userPermission?.data?.manageTransport
        ? [
            {
              key: "64",
              title: "Transport",
              icon: <DirectionsBus />,
              submenus: [
                {
                  key: "8ii",
                  title: "Dashboard",
                  icon: <Leaderboard />,
                  route: "/panel/admin/transport/dashboard",
                },
                {
                  key: "8-1",
                  title: "Manage Vehicle",
                  icon: <DepartureBoard />,
                  route: "/panel/admin/transport/manage-vehicle",
                },
                {
                  key: "8-1",
                  title: "Manage Drivers",
                  icon: <Person />,
                  route: "/panel/admin/transport/manage-drivers",
                },
                {
                  key: "2-1dsdf",
                  title: "Bulk Upload",
                  icon: <CloudUpload />,
                  route: "/panel/admin/transport/bulk-upload",
                },
                {
                  key: "8-2",
                  title: "Manage Transport",
                  icon: <ManageAccounts />,
                  route: "/panel/admin/transport/manage-transport",
                },
              ],
            },
          ]
        : []),
      ...(userPermission?.data?.manageGrievance
        ? [
            {
              key: "6.1",
              title: "Manage Notice",
              icon: <NotificationsActive />,
              submenus: [
                {
                  key: "6.1-2",
                  title: "Create Notice",
                  icon: <DesignServices />,
                  route: "/panel/admin/notice/create",
                },
                {
                  key: "6.1-3",
                  title: "Manage Notice",
                  icon: <ManageAccounts />,
                  route: "/panel/admin/notice",
                },
              ],
            },
          ]
        : []),
      ...(userPermission?.data?.manageAlumni
        ? [
            {
              key: "6pl.1sd",
              title: "Alumni ",
              icon: <People />,

              submenus: [
                {
                  key: "4-0",
                  title: "Manage Alumni",
                  icon: <ManageAccounts />,
                  route: "/panel/admin/alumni",
                },
              ],
            },
          ]
        : []),
      ...(userPermission?.data?.managePlacement
        ? [
            {
              key: "6pl.1",
              title: "Placement Cell ",
              icon: <BusinessCenter />,
              submenus: [
                {
                  key: "8ii",
                  title: "Dashboard",
                  icon: <Leaderboard />,
                  route: "/panel/admin/placement/dashboard",
                },
                {
                  key: "6.1-3",
                  title: "Manage Placement Notice",
                  icon: <ManageAccounts />,
                  route: "/panel/admin/placement",
                },
                {
                  key: "6.1-568eee",
                  title: "Placement Report",
                  icon: <People />,
                  route: "/panel/admin/placement/archive",
                },
                {
                  key: "6.1-568",
                  title: "Company",
                  icon: <Business />,
                  route: "/panel/admin/company",
                },
              ],
            },
          ]
        : []),
      ...(userPermission?.data?.manageFeedback
        ? [
            {
              key: "62",
              title: "Manage Enquiry",
              icon: <ErrorOutline />,
              route: "/panel/admin/enquiry",
            },
          ]
        : []),
      ...(userPermission?.data?.manageConfig
        ? [
            {
              key: "17ki",
              title: "Config",
              icon: <SettingsCell />,
              submenus: [
                {
                  key: "13-fdf0",
                  route: "/panel/admin/config/admin-app-config",
                  title: "App Config",
                  icon: <AdminPanelSettings />,
                },
                // {
                //   key: "13-fsdf0",
                //   route: "/panel/admin/config/student-app-config",
                //   title: "Student App Config",
                //   icon: <CastForEducation />,
                // },
                // {
                //   key: "13-fs0",
                //   route: "/panel/admin/config/teacher-app-config",
                //   title: "Teacher App Config",
                //   icon: <Person2 />,
                // },
                {
                  key: "13-ff0",
                  route: "/panel/admin/config/set-course",
                  title: "Set Course",
                  icon: <MenuBook />,
                },
                {
                  key: "13-ffdgv0",
                  route: "/panel/admin/config/set-fee-name",
                  title: "Set Fee Name",
                  icon: <Money />,
                },
                {
                  key: "13-fdgd0",
                  route: "/panel/admin/config/set-grade",
                  title: "Set Grade",
                  icon: <Grade />,
                },
                {
                  key: "13-0ffg",
                  route: "/panel/admin/config/set-session",
                  title: "Set Session",
                  icon: <Timelapse />,
                },
                {
                  key: "13-0sfd",
                  route: "/panel/admin/config/set-designation",
                  title: "Set Designation",
                  icon: <AssignmentInd />,
                },
                {
                  key: "13-0skhkhfd",
                  route: "/panel/admin/config/set-subject",
                  title: "Set Subject",
                  icon: <Subject />,
                },
                {
                  key: "13-0skhksashfd",
                  route: "/panel/admin/config/book-category",
                  title: "Book Category",
                  icon: <Book />,
                },
                {
                  key: "13-0skhksashfd",
                  route: "/panel/admin/config/publication",
                  title: "Book Publication",
                  icon: <MenuBook />,
                },
                {
                  key: "13-0skhksassshfd",
                  route: "/panel/admin/config/author",
                  title: "Book Author",
                  icon: <DriveFileRenameOutline />,
                },
                {
                  key: "13-0skhksdsashfd",
                  route: "/panel/admin/config/set-inventory-category",
                  title: "Inventory Category",
                  icon: <Inventory />,
                },
                {
                  key: "13-0fsdf",
                  route: "/panel/admin/config/uploadLogo",
                  title: "Upload Logo",
                  icon: <Upload />,
                },
              ],
            },
          ]
        : []),
      {
        key: "18",
        title: "Update Details",
        icon: <Edit />,
        route: "/panel/teacher/update-details",
      },
      {
        key: "17",
        title: "Setting",
        icon: <Settings />,
        submenus: [
          {
            key: "17-1",
            title: "Profile",
            icon: <AccountCircle />,
            route: "/panel/teacher/profile",
          },
          {
            key: "17-2",
            title: "Change Password",
            icon: <VpnKey />,
            route: "/panel/teacher/change-password",
          },
        ],
      },
    ];

  return [];
};
export default useMenuItem;
