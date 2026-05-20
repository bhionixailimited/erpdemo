import {
  ChevronLeft,
  ExitToApp,
  ExpandLessRounded,
  ExpandMoreRounded,
} from "@mui/icons-material";
import {
  Box,
  Button,
  Collapse,
  IconButton,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Tooltip,
  Typography,
} from "@mui/material";
import { ICONS, LOGO } from "assets";
import { useMenuItems, useSWRFetch } from "hooks";
import useAuth from "hooks/useAuth";
import { useRouter } from "next/router";
import { Fragment, useState } from "react";
import { CustomDrawer, CustomDrawerHeader } from "./custom";
import { isProductionEnvironment } from "utils";
import useAppContext from "contexts/AppContextProvider";
const prodEnv = isProductionEnvironment();

type DrawerType = {
  onToggle?: () => void;
  open?: boolean;
  role: "SUPERADMIN" | "MANAGER" | "ADMIN" | "STAFF" | "TEACHER" | "STUDENT";
};

const Drawer = ({ open, onToggle, role }: DrawerType) => {
  const router = useRouter();
  const { logOut } = useAuth();
  const [selectedSubMenu, setSelectedSubMenu] = useState("");
  const MenuItems = useMenuItems(role);
  const { appLogo } = useAppContext();

  return (
    <section className="dashboard-main dashboard-drawer md:flex hidden !bg-white ">
      <CustomDrawer variant="permanent" open={open}>
        <CustomDrawerHeader>
          <div className="flex h-16 w-full items-center justify-between">
            {appLogo ? (
              <img
                src={appLogo}
                alt="ERP"
                className={`${open ? "h-8 w-full  object-contain" : "hidden"}`}
              />
            ) : (
              <img
                src="/newlogo.png"
                alt=""
                className={`${open ? "h-8 w-full  object-contain" : "hidden"}`}
              />
            )}
            <IconButton onClick={onToggle}>
              {open ? <ChevronLeft /> : <ICONS.Menu className="" />}
            </IconButton>
          </div>
        </CustomDrawerHeader>
        {/* Render Menu Items */}

        <List
          sx={{ mt: "1px" }}
          className="super-bold-drawer-font flex flex-col gap-1"
        >
          {MenuItems?.map((item) => (
            <Fragment key={item.key}>
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
                  {open && (
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

                        {open && (
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
            </Fragment>
          ))}
          <Box hidden={open}>
            <Tooltip
              title={"Click Here To Logout"}
              followCursor
              arrow
              placement="top-end"
            >
              <ListItemButton>
                <ListItemIcon>
                  <ExitToApp />
                </ListItemIcon>
                <ListItemText primary={"Logout"} />
              </ListItemButton>
            </Tooltip>
          </Box>
          <Box
            sx={{ textAlign: "center" }}
            className={`${
              open ? "flex" : "hidden"
            } flex-col items-center gap-2 pt-3`}
          >
            <div className="py-5">
              <Button
                onClick={logOut}
                variant="contained"
                startIcon={<ExitToApp />}
                color="error"
                className="!bg-theme"
              >
                Logout
              </Button>
            </div>
          </Box>
          {prodEnv ? (
            <a
              href={"https://www.yarderp.com/"}
              target="_blank"
              rel="noreferrer"
            >
              <h2 className="text-center font-semibold text-indigo-500 cursor-pointer text-sm">
                A{" "}
                <span className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-600 bg-clip-text text-transparent font-semibold">
                  {" "}
                  YARDERP{" "}
                </span>{" "}
                Product
              </h2>
            </a>
          ) : (
            <></>
          )}
        </List>
      </CustomDrawer>
    </section>
  );
};

export default Drawer;
