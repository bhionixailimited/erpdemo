import {
  AccountBalance,
  AdminPanelSettings,
  ChevronLeft,
  ExitToApp,
  ExpandLessRounded,
  ExpandMoreRounded,
} from "@mui/icons-material";
import {
  Collapse,
  FormControl,
  IconButton,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  MenuItem,
  Select,
  Tooltip,
  Typography,
} from "@mui/material";
import { ICONS, LOGO } from "assets";
import { HappyBirthDay } from "assets/static-icon";
import { Button } from "components/core";
import dayjs from "dayjs";
import { useAuth, useFetch, useMenuItems, useSWRFetch } from "hooks";
import { useRouter } from "next/router";
import { useState } from "react";
import { InstituteType } from "types/institute";
import { notify, removeFromLocalStorage, saveToLocalStorage } from "utils";

type dataType = {
  data: {
    logoUrl: string;
  };
};
type instituteData = {
  data: InstituteType[];
};

const ResponsiveDrawer = ({
  selectedInstitute,
  setSelectedInstitute,
}: {
  selectedInstitute?: string;
  setSelectedInstitute?: (arg: any) => void;
}) => {
  const {
    user,
    logOut,
    getUser,
    setSwitchInstitute,
    instituteData: selectedInstituteData,
  } = useAuth();
  const [clickOnInstitute, setClickOnInstitute] = useState(false);
  const { data: instituteData } = useSWRFetch<instituteData>(
    ["SUPER_ADMIN", "MANAGER"]?.includes(String(user?.role))
      ? "institute"
      : `institute/assigned/${user?._id}`
  );
  const [largeNav, setLargeNav] = useState(false);
  const router = useRouter();
  const [selectedSubMenu, setSelectedSubMenu] = useState("");
  const { data, mutate, isValidating } = useSWRFetch<dataType>(`logo`);
  const MenuItems = useMenuItems();

  const { mutate: instituteMutate } = useFetch();

  const handleSelectInstitute = async (value: string) => {
    try {
      setSelectedInstitute?.(value);
      saveToLocalStorage("instituteId", value);
      !value && setSwitchInstitute(false);
      const response =
        (value &&
          (await instituteMutate({
            path: `auth/generate-token`,
            method: "POST",
            body: JSON.stringify({
              instituteId: value,
            }),
          }))) ||
        undefined;
      if (response?.data?.ACCESS_TOKEN) {
        saveToLocalStorage("ACCESS_TOKEN", response?.data?.ACCESS_TOKEN);
        getUser();
        setSwitchInstitute(true);
        if (
          ["SUPER_ADMIN", "ADMIN", "STAFF", "MANAGER"]?.includes(
            String(user?.role)
          )
        ) {
          router.push(`/panel/admin/dashboard?reloadTab=true`);
        } else if (user?.role === "PARENT") {
          router.push(`/panel/student/dashboard?reloadTab=true`);
        } else {
          router.push(
            `/panel/${user?.role?.toLocaleLowerCase()}/dashboard?reloadTab=true`
          );
        }
      }

      if (response?.data?.error) {
        notify.error(response?.data?.error);
        return;
      }
    } catch (error) {
    } finally {
    }
  };

  return (
    <>
      <div className="flex fixed top-0 left-0  md:!hidden bg-white p-4 z-[999] h-16 w-full items-center justify-between">
        {!isValidating && data?.data?.logoUrl ? (
          <img
            src={data?.data?.logoUrl}
            alt="logo"
            className="h-10 object-contain "
          />
        ) : (
          <img src="/newlogo.png" alt="logo" className="h-10 object-contain " />
        )}
        <IconButton onClick={() => setLargeNav((prev) => !prev)}>
          {largeNav ? <ChevronLeft /> : <ICONS.Menu className="" />}
        </IconButton>
      </div>

      <div
        className={`flex md:hidden bg-gray-100/20 transition-all mt-16 ease-in-out duration-300 dashboard-main dashboard-drawer w-full fixed top-0 left-0 min-h-screen z-[9998] overflow-x-hidden overflow-y-auto  h-full  ${
          largeNav ? "w-full" : "w-0"
        } `}
      >
        <div className=" flex flex-col gap-4 bg-white pb-20  w-80 relative z-[9999]  h-full overflow-hidden overflow-y-auto  min-h-[90vh] ">
          {dayjs(user?.dateOfBirth).format("DD-MM-YYYY") ===
          dayjs().format("DD-MM-YYYY") ? (
            <div className="  gap-2 justify-center items-center flex">
              <img src={HappyBirthDay.src} alt="Happy Birth" className="h-11" />

              <small className="font-medium">
                Happy birthday {user?.displayName} 🎉
              </small>
            </div>
          ) : null}
          <div>
            <Tooltip
              title={
                !selectedInstitute
                  ? user?.instituteId?.instituteName
                  : selectedInstituteData?.instituteName
              }
              followCursor
              arrow
              placement="top-end"
            >
              <ListItemButton
                onClick={() => {
                  setClickOnInstitute((prev) => !prev);
                }}
                className={
                  clickOnInstitute
                    ? "!rounded-r-[25px] bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 !text-white !font-bold  "
                    : "!text-black !font-bold !rounded-r-[25px]  "
                }
                selected={clickOnInstitute}
              >
                <ListItemIcon
                  className={clickOnInstitute ? " !text-white" : ""}
                  sx={{
                    minWidth: "32px",
                    background: "transparent",
                  }}
                >
                  <AdminPanelSettings />
                </ListItemIcon>
                {largeNav && (
                  <ListItemText>
                    <Typography
                      variant="body1"
                      fontFamily={'Montserrat", sans-serif'}
                      fontWeight={600}
                      className="!font-semibold"
                    >
                      {!selectedInstitute
                        ? "Super Admin Panel"
                        : selectedInstituteData?.instituteName}
                    </Typography>
                  </ListItemText>
                )}
                {instituteData?.data?.length &&
                  (clickOnInstitute ? (
                    <ExpandLessRounded />
                  ) : (
                    <ExpandMoreRounded />
                  ))}
              </ListItemButton>
            </Tooltip>

            {instituteData?.data?.length && (
              <Collapse
                in={clickOnInstitute}
                timeout="auto"
                unmountOnExit
                className="flex flex-col gap-1"
              >
                <List component="div" className="!px-0.5" disablePadding>
                  {["SUPER_ADMIN", "MANAGER"]?.includes(String(user?.role)) ? (
                    <ListItemButton
                      onClick={() => {
                        handleSelectInstitute("");
                        router.push("/panel/superadmin/dashboard");
                        removeFromLocalStorage("instituteId");
                      }}
                      sx={{ pl: 4 }}
                      selected={!selectedInstitute}
                      className={
                        !selectedInstitute
                          ? "!bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 !text-white !rounded-r-[5px] !rounded-l-[5px] "
                          : "!rounded-r-[5px] !rounded-l-[5px]"
                      }
                    >
                      <ListItemIcon
                        sx={{
                          minWidth: "42px",
                          background: "transparent",
                        }}
                        className={!selectedInstitute ? "  !text-white" : ""}
                      >
                        <AccountBalance />
                      </ListItemIcon>

                      {largeNav && (
                        <ListItemText
                          // primary={submenu?.title}
                          sx={{
                            whiteSpace: "break-spaces",
                          }}
                        >
                          <Typography
                            variant="body2"
                            fontFamily={'Montserrat", sans-serif'}
                            className="!font-semibold"
                          >
                            Super Admin Panel
                          </Typography>
                        </ListItemText>
                      )}
                    </ListItemButton>
                  ) : null}

                  {instituteData?.data?.map((submenu) => (
                    <ListItemButton
                      onClick={() => handleSelectInstitute(submenu?._id)}
                      sx={{ pl: 4 }}
                      selected={selectedInstitute === submenu?._id}
                      key={submenu?._id}
                      className={
                        selectedInstitute === submenu?._id
                          ? "!bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 !text-white !rounded-r-[5px] !rounded-l-[5px] "
                          : "!rounded-r-[5px] !rounded-l-[5px]"
                      }
                    >
                      <ListItemIcon
                        sx={{
                          minWidth: "42px",
                          background: "transparent",
                        }}
                        className={
                          selectedInstitute === submenu?._id
                            ? "  !text-white"
                            : ""
                        }
                      >
                        <AccountBalance />
                      </ListItemIcon>

                      {largeNav && (
                        <ListItemText
                          // primary={submenu?.title}
                          sx={{
                            whiteSpace: "break-spaces",
                          }}
                        >
                          <Typography
                            variant="body2"
                            fontFamily={'Montserrat", sans-serif'}
                            className="!font-semibold"
                          >
                            {submenu?.instituteName}
                          </Typography>
                        </ListItemText>
                      )}
                    </ListItemButton>
                  ))}
                </List>
              </Collapse>
            )}
          </div>

          {MenuItems?.map((item) => (
            <div key={item.key}>
              <Tooltip
                title={item.title}
                followCursor
                arrow
                placement="top-end"
              >
                <ListItemButton
                  onClick={() => {
                    if (item?.route) return router?.push(item?.route);
                    item?.submenus &&
                      setSelectedSubMenu((prev) =>
                        prev === item.key ? "" : item.key
                      );
                  }}
                  className={
                    router.asPath === item.route
                      ? "!rounded-r-[25px] bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 !text-white !font-bold  "
                      : "!text-black !font-bold !rounded-r-[25px]  "
                  }
                  selected={
                    item?.submenus
                      ? selectedSubMenu === item?.key
                      : router?.asPath === item.route
                  }
                >
                  <ListItemIcon
                    className={
                      router.asPath === item.route ? " !text-white" : ""
                    }
                    sx={{
                      minWidth: "32px",
                      background: "transparent",
                    }}
                  >
                    {item.icon}
                  </ListItemIcon>
                  {largeNav && (
                    <ListItemText>
                      <Typography
                        variant="body1"
                        fontFamily={'Montserrat", sans-serif'}
                        fontWeight={600}
                        className="!font-semibold"
                      >
                        {item.title}
                      </Typography>
                    </ListItemText>
                  )}
                  {item?.submenus &&
                    (selectedSubMenu === item?.key ? (
                      <ExpandLessRounded />
                    ) : (
                      <ExpandMoreRounded />
                    ))}
                </ListItemButton>
              </Tooltip>
              {item?.submenus && (
                <Collapse
                  in={selectedSubMenu === item?.key}
                  timeout="auto"
                  unmountOnExit
                  className="flex flex-col gap-1"
                >
                  <List component="div" className="!px-0.5" disablePadding>
                    {item?.submenus?.map((submenu: any) => (
                      <ListItemButton
                        onClick={() => router.push(submenu.route)}
                        sx={{ pl: 4 }}
                        selected={router.pathname === submenu.route}
                        key={submenu?.key}
                        className={
                          router.asPath === submenu.route
                            ? "!bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 !text-white !rounded-r-[5px] !rounded-l-[5px] "
                            : "!rounded-r-[5px] !rounded-l-[5px]"
                        }
                      >
                        <ListItemIcon
                          sx={{
                            minWidth: "42px",
                            background: "transparent",
                          }}
                          className={
                            router.asPath === submenu.route
                              ? "  !text-white"
                              : ""
                          }
                        >
                          {submenu?.icon}
                        </ListItemIcon>

                        {largeNav && (
                          <ListItemText
                            // primary={submenu?.title}
                            sx={{
                              whiteSpace: "break-spaces",
                            }}
                          >
                            <Typography
                              variant="body2"
                              fontFamily={'Montserrat", sans-serif'}
                              className="!font-semibold"
                            >
                              {submenu?.title}
                            </Typography>
                          </ListItemText>
                        )}
                      </ListItemButton>
                    ))}
                  </List>
                </Collapse>
              )}
            </div>
          ))}
          <div className="py-5 flex w-full items-center justify-center ">
            <Button
              onClick={logOut}
              startIcon={<ExitToApp />}
              className="!bg-themeSecondary"
            >
              Logout
            </Button>
          </div>
        </div>
        <div
          className="h-full w-[calc(100%-20rem)] "
          onClick={() => setLargeNav(false)}
        ></div>
      </div>
    </>
  );
};

export default ResponsiveDrawer;
