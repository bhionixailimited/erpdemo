import {
  ChevronLeft,
  ChevronRight,
  ExpandLessRounded,
  ExpandMoreRounded,
  Menu,
} from "@mui/icons-material";
import {
  Avatar,
  Box,
  Collapse,
  Divider,
  IconButton,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Tooltip,
  Typography,
} from "@mui/material";
import useStudentMenuItem from "hooks/useStudentMenuItem";
import Link from "next/link";
import { useRouter } from "next/router";
import { Fragment, useEffect, useState } from "react";
import { CustomDrawer, CustomDrawerHeader } from "./custom";
import MenuIcon from "@mui/icons-material/Menu";
import { useSWRFetch } from "hooks";

type DrawerType = {
  onToggle?: () => void;
  open?: boolean;
  role?: string;
};
type dataType = {
  data: {
    logoUrl: string;
  };
};

const Drawer = ({ open, onToggle, role }: DrawerType) => {
  const router = useRouter();
  const [selectedSubMenu, setSelectedSubMenu] = useState("");
  const StudentData = useStudentMenuItem();
  const { data, isValidating } = useSWRFetch<dataType>(`logo`);

  useEffect(() => {
    const isExists =
      StudentData &&
      StudentData?.length > 0 &&
      StudentData?.find(
        (item : any) =>
          item?.submenus &&
          item?.submenus?.length > 0 &&
          item?.submenus?.find((data: any) => data?.route === router.asPath)
      );

    isExists && setSelectedSubMenu(isExists?.key);
  }, [router.asPath]);

  return (
    <section className="dashboard-main">
      <CustomDrawer variant="permanent" open={open}>
        <CustomDrawerHeader>
          <div className="flex w-full items-center justify-between my-1">
            <Link href="/apply/profile" className="flex  ">
              <img
                src={
                  data?.data?.logoUrl ||
                  process.env.NEXT_PUBLIC_FIREBASE_FAVICON_URL ||
                  "https://www.poddarinstitute.org/assets/images/logo/poddar-logo.webp"
                }
                alt=""
                className={`${
                  open ? "md:h-16 h-10 w-40  object-contain" : "hidden"
                }`}
              />
            </Link>

            <IconButton onClick={onToggle}>
              {open ? <ChevronLeft /> : <Menu className="" />}
            </IconButton>
          </div>
        </CustomDrawerHeader>
        <Divider />
        {/* Render Menu Items */}
        {!StudentData?.length && (
          <div className="flex flex-col gap-8 mt-4">
            {skeletons?.map((item) => (
              <div
                key={item?.id}
                className=" w-full mx-4 py-1 flex gap-2 items-center"
              >
                loading....
              </div>
            ))}
          </div>
        )}

        <List sx={{ mt: "1px" }} className="font-light">
          {StudentData?.map((item: any) => (
            <Fragment key={item?.key}>
              <Tooltip
                title={item?.title}
                followCursor
                arrow
                placement="top-end"
              >
                <ListItemButton
                  onClick={() => {
                    if (item.route) return router.push(item.route);
                    item.submenus &&
                      setSelectedSubMenu((prev) =>
                        prev === item.key ? "" : item.key
                      );
                  }}
                  className={
                    router.asPath === item?.route
                      ? "!rounded-r-[25px] !bg-blue-500 !text-white !font-bold "
                      : "!text-black !font-light"
                  }
                  selected={
                    item?.submenus
                      ? selectedSubMenu === item?.key
                      : router?.asPath === item?.route
                  }
                >
                  <ListItemIcon
                    className={
                      router.asPath === item?.route ? " !text-white" : ""
                    }
                    sx={{
                      minWidth: "32px",
                      background: "transparent",
                    }}
                  >
                    {item?.icon}
                  </ListItemIcon>
                  {open && (
                    <ListItemText>
                      <Typography
                        variant="body1"
                        fontFamily={'Montserrat", sans-serif'}
                        fontWeight={600}
                        className="!tracking-wide"
                      >
                        {item?.title}
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
                >
                  <List component="div" disablePadding>
                    {item?.submenus?.map((submenu: any) => (
                      <ListItemButton
                        onClick={() => router.push(submenu?.route)}
                        sx={{ pl: 4 }}
                        selected={router?.pathname === submenu?.route}
                        key={submenu?.key}
                        className={
                          router.asPath === submenu?.route
                            ? "!bg-blue-500 !text-white"
                            : ""
                        }
                      >
                        {/* <ListItemIcon
                          sx={{
                            minWidth: "42px",
                            background: "transparent",
                          }}
                          className={
                            router?.asPath === submenu?.route
                              ? "  !text-white"
                              : ""
                          }
                        >
                          {submenu?.icon}
                        </ListItemIcon> */}

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
                              className=""
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
        </List>
        <Box
          sx={{ textAlign: "center" }}
          className={`${
            open ? "flex" : "hidden"
          } flex-col items-center gap-2 pt-5`}
        ></Box>
      </CustomDrawer>
    </section>
  );
};

export default Drawer;

const skeletons = [{ id: 1 }, { id: 2 }, { id: 3 }, { id: 4 }, { id: 5 }];
