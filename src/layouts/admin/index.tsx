import {
  AccountCircle,
  ArrowBack,
  Cake,
  ExitToApp,
  Inventory,
  Key,
} from "@mui/icons-material";
import {
  Avatar,
  Badge,
  Divider,
  IconButton,
  ListItemIcon,
  ListItemText,
  Menu,
  MenuItem,
  Tooltip,
  Select,
  FormControl,
  FormHelperText,
} from "@mui/material";

import { ICONS } from "assets";
import { useAuth, useFetch, useMenuItems, useSWRFetch } from "hooks";

import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { NotificationType } from "types/notification";
import Drawer from "./drawer";
import ResponsiveDrawer from "./drawer/ResponsiveDrawer";
import {
  getLocalStorageItem,
  notify,
  removeFromLocalStorage,
  saveToLocalStorage,
} from "utils";
import { InstituteType } from "types/institute";
import PermissionsType from "types/permissions";
import { IS_MULTI_INSTITUTE } from "configs";
import useAppContext from "contexts/AppContextProvider";
import dayjs from "dayjs";
import { HappyBirthDay } from "assets/static-icon";

type Props = {
  children: JSX.Element | JSX.Element[];
  title?: string;
};

type InventoryData = {
  data: {
    _id: string;
    totalCount: number;
  }[];
  totalCount: number;
  perPage: number;
};

type LogoType = {
  data: {
    logoUrl: string;
  };
};
type instituteData = {
  data: InstituteType[];
};

type PermissionDataType = {
  data: PermissionsType;
};

const PrivateLayout = ({ children, title = "PoddarErp" }: Props) => {
  const { mutate: instituteMutate } = useFetch();
  const [selectedValue, setSelectedValue] = useState("");
  const {
    data: logoData,
    isValidating,
    mutate,
  } = useSWRFetch<LogoType>(`logo`);
  const { notificationCount } = useAppContext();

  const {
    user,
    isUserLoading,
    logOut,
    getUser,
    setSwitchInstitute,
    instituteData: currentInstitute,
    getUserInstitute,
  } = useAuth();
  const router = useRouter();
  const { data: inventoryRequest } = useSWRFetch<InventoryData>(
    `inventory/supply?orderStatus=ORDER_REQUEST&getCount=true`
  );
  const { studentID } = router?.query;
  const MenuItems = useMenuItems(
    router?.query?.role?.toString()?.toUpperCase() as "ADMIN" | "STAFF"
  );
  const [isOpen, setIsOpen] = useState(true);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const { data: instituteData } = useSWRFetch<instituteData>(
    ["SUPER_ADMIN", "MANAGER"]?.includes(String(user?.role))
      ? "institute"
      : `institute/assigned/${user?._id}`
  );

  const { data: userPermission } = useSWRFetch<PermissionDataType>(
    user?._id && user?.role === "STAFF"
      ? `staff/permissions`
      : `manager/permissions/${user?._id}`
  );

  const open = Boolean(anchorEl);
  const handleClick = (event: any) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  useEffect(() => {
    let mounted = true;

    if (mounted) {
      if (!isUserLoading && !user?._id) {
        router?.push("/login");
      }
    }
    return () => {
      mounted = false;
    };
  }, [user, isUserLoading, router]);

  const handleChangeSize = (e: any) => {
    if (e?.target?.innerWidth < 768) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    if (router?.asPath?.includes("/superadmin/")) return;
    let instituteId = getLocalStorageItem("instituteId");
    setSelectedValue(instituteId || "");
    getUserInstitute(instituteId || "");
    instituteId && setSwitchInstitute(true);
  }, [
    router?.asPath,
    user?.instituteId?._id,
    user?.instituteId,
    instituteData?.data?.length,
  ]);

  useEffect(() => {
    (() => {
      if (!router?.query?.reloadTab) return;

      window.location.reload();
      window.location.href = router.pathname;
    })();
  }, [router?.query?.reloadTab]);

  useEffect(() => {
    if (window.innerWidth < 768) {
      setIsOpen(false);
    }
    window.addEventListener("resize", handleChangeSize, false);

    return () => {
      window.removeEventListener("resize", handleChangeSize, false);
    };
  }, []);

  const handleSelectInstitute = async (e: any) => {
    try {
      setSelectedValue(e.target.value);
      saveToLocalStorage("instituteId", e.target.value);
      !e.target.value && setSwitchInstitute(false);
      const response =
        e.target.value &&
        (await instituteMutate({
          path: `auth/generate-token`,
          method: "POST",
          body: JSON.stringify({
            instituteId: e.target.value,
          }),
        }));
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
      <Head>
        <title>{title}</title>
        <link
          rel="icon"
          href={`${
            process.env.NEXT_PUBLIC_FIREBASE_FAVICON_URL || `/favicon.png`
          }`}
          type="image/png"
        />
        <meta
          name="description"
          content={
            process.env.NEXT_PUBLIC_DESCRIPTION ||
            `YARDERP is an end-to-end customizable solution for colleges, universities, and schools that automates the student-faculty lifecycle and campus administration to increase operational efficiency & institutional outcomes.`
          }
        ></meta>
        <meta
          property="og:image"
          content={
            isValidating
              ? process.env.NEXT_PUBLIC_FIREBASE_FAVICON_URL
              : logoData?.data?.logoUrl ||
                "https://www.yarderp.com/og-image.jpg"
          }
        />
      </Head>
      <>
        <Drawer
          open={isOpen}
          onToggle={() => setIsOpen(!isOpen)}
          role={
            router?.query?.role?.toString()?.toUpperCase() as "ADMIN" | "STAFF"
          }
        />
        <main
          className={`min-h-screen bg-gray-50 overflow-hidden overflow-y-auto ${
            isOpen
              ? "md:ml-[calc(100vw-calc(100vw-240px))] "
              : "ml-0  md:ml-[calc(100vw-calc(100vw-72px))] "
          } dashboard-main   `}
        >
          <header className={`h-16 bg-white`}>
            <div className="flex h-16 items-center justify-between px-4">
              {IS_MULTI_INSTITUTE ? (
                <ResponsiveDrawer
                  selectedInstitute={selectedValue}
                  setSelectedInstitute={setSelectedValue}
                />
              ) : null}

              <h1 className="lg:text-xl text-sm uppercase lg:block md:opacity-100 opacity-0 font-semibold text-black">
                {
                  MenuItems?.find(
                    (item) =>
                      item?.route ===
                      router?.pathname?.replace(
                        "[role]",
                        router?.query?.role as string
                      )
                  )?.title
                }
                {
                  MenuItems?.find((item) =>
                    item?.submenus?.find(
                      (submenus) =>
                        submenus.route ===
                        router?.pathname?.replace(
                          "[role]",
                          router?.query?.role as string
                        )
                    )
                  )?.title
                }
                {MenuItems?.find((item) =>
                  item?.submenus?.find(
                    (submenus) =>
                      submenus.route ===
                      router?.pathname?.replace(
                        "[role]",
                        router?.query?.role as string
                      )
                  )
                )?.title ? (
                  <span> / </span>
                ) : (
                  <span> </span>
                )}
                {
                  MenuItems?.find((item) =>
                    item?.submenus?.find(
                      (submenus) =>
                        submenus.route ===
                        router?.pathname?.replace(
                          "[role]",
                          router?.query?.role as string
                        )
                    )
                  )?.submenus?.find(
                    (submenus) =>
                      submenus.route ===
                      router?.pathname?.replace(
                        "[role]",
                        router?.query?.role as string
                      )
                  )?.title
                }

                {studentID && (
                  <>
                    <Tooltip title="Back to previous">
                      <IconButton onClick={() => router.back()}>
                        <ArrowBack className="text-3xl text-theme" />
                      </IconButton>
                    </Tooltip>
                  </>
                )}
              </h1>

              {dayjs(user?.dateOfBirth).format("DD-MM-YYYY") ===
              dayjs().format("DD-MM-YYYY") ? (
                <div className=" items-center gap-2 hidden lg:flex">
                  <img
                    src={HappyBirthDay.src}
                    alt="Happy Birth"
                    className="h-11"
                  />

                  <small className="font-medium">
                    Happy birthday {user?.displayName} 🎉
                  </small>
                </div>
              ) : null}

              <div className="hidden md:flex items-center gap-6">
                {/* -----------Multi Institute------------------------------- */}
                {IS_MULTI_INSTITUTE ? (
                  <div
                    className={`${
                      selectedValue && "!pt-4"
                    }px-6 text-right  min-w-[12rem]`}
                  >
                    <FormControl
                      className={`w-full  ${
                        selectedValue ? "!pt-8" : "!pt-4"
                      } `}
                    >
                      <Select
                        className="!w-full !text-theme !font-semibold "
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={selectedValue}
                        onChange={handleSelectInstitute}
                        displayEmpty
                        inputProps={{ "aria-label": "Without label" }}
                      >
                        {["SUPER_ADMIN", "MANAGER"]?.includes(
                          String(user?.role)
                        ) ? (
                          <MenuItem
                            className="!font-semibold !w-full "
                            value=""
                            onClick={() => {
                              removeFromLocalStorage("instituteId");
                              router.push("/panel/superadmin/dashboard");
                            }}
                          >
                            SuperAdmin Panel
                          </MenuItem>
                        ) : null}

                        {instituteData?.data?.map((item) => (
                          <MenuItem
                            key={item?._id}
                            value={item?._id}
                            className="!font-semibold !w-full"
                          >
                            {item?.instituteName}
                          </MenuItem>
                        ))}
                      </Select>
                      <FormHelperText>
                        {selectedValue ? " " : ""}
                      </FormHelperText>
                    </FormControl>
                  </div>
                ) : null}
                {/* -----------Notification------------------------------- */}
                {user?.role !== "TEACHER" && (
                  <Badge badgeContent={notificationCount} color="warning">
                    <Link
                      href={`/panel/${user?.role?.toLowerCase()}/notification`}
                    >
                      <a className="cursor-pointer rounded-lg bg-theme p-2 shadow-md">
                        <ICONS.Notification className="h-6 w-6 text-white" />
                      </a>
                    </Link>
                  </Badge>
                )}
                {(["ADMIN", "SUPER_ADMIN"]?.includes(String(user?.role)) ||
                  userPermission?.data?.manageInventory) && (
                  <Badge
                    badgeContent={inventoryRequest?.data[0]?.totalCount || 0}
                    color="warning"
                  >
                    <Link href={`/panel/admin/inventory/supply-requests`}>
                      <a className="cursor-pointer rounded-lg bg-theme p-2 shadow-md">
                        <Inventory className="h-6 w-6 text-white" />
                      </a>
                    </Link>
                  </Badge>
                )}

                <div className="flex w-fit min-w-[8rem]  items-center justify-start gap-2 overflow-hidden rounded-full bg-white">
                  <Avatar
                    src={`${user?.photoUrl}`}
                    className="cursor-pointer !bg-theme"
                    onClick={handleClick}
                    sx={{
                      objectFit: "contain",
                    }}
                  />

                  <h2 className="cursor-pointer hidden md:flex text-lg font-medium tracking-wide text-black">
                    Profile
                  </h2>

                  <Menu
                    anchorEl={anchorEl}
                    open={open}
                    onClose={handleClose}
                    onClick={handleClose}
                    PaperProps={{
                      elevation: 0,
                      sx: {
                        overflow: "visible",
                        filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
                        mt: 1.5,
                        "& .MuiAvatar-root": {
                          width: 32,
                          height: 32,
                          ml: -0.5,
                          mr: 1,
                        },
                        "&:before": {
                          content: '""',
                          display: "block",
                          position: "absolute",
                          top: 0,
                          right: 14,
                          width: 10,
                          height: 10,
                          bgcolor: "background.paper",
                          transform: "translateY(-50%) rotate(45deg)",
                          zIndex: 0,
                        },
                      },
                    }}
                    transformOrigin={{ horizontal: "right", vertical: "top" }}
                    anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
                  >
                    <MenuItem>
                      <Avatar
                        src={user?.photoUrl}
                        alt={user?.displayName}
                        sx={{
                          objectFit: "contain",
                        }}
                      />
                      <ListItemText
                        primary={user?.displayName}
                        secondary={user?.email}
                      />
                    </MenuItem>
                    <Divider />
                    <MenuItem
                      onClick={() =>
                        router?.push(
                          `/panel/${
                            user?.role === "STAFF"
                              ? "admin"
                              : user?.role?.toLowerCase()
                          }/profile`
                        )
                      }
                    >
                      <ListItemIcon>
                        <AccountCircle fontSize="small" />
                      </ListItemIcon>
                      Profile
                    </MenuItem>
                    <MenuItem
                      onClick={() =>
                        router?.push(
                          `/panel/${
                            user?.role === "STAFF"
                              ? "admin"
                              : user?.role?.toLowerCase()
                          }/change-password`
                        )
                      }
                    >
                      <ListItemIcon>
                        <Key fontSize="small" />
                      </ListItemIcon>
                      Change Password
                    </MenuItem>
                    <MenuItem onClick={() => logOut()}>
                      <ListItemIcon>
                        <ExitToApp fontSize="small" />
                      </ListItemIcon>
                      Logout
                    </MenuItem>
                  </Menu>
                </div>
              </div>
            </div>
          </header>

          <div className=" w-full">{children}</div>
        </main>
      </>
    </>
  );
};

export default PrivateLayout;
