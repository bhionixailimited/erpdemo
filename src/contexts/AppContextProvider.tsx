import { SOCKET_BASEURL } from "configs";
import { useFetch, useSWRFetch } from "hooks";
import useAuth from "hooks/useAuth";
import useFCMToken from "hooks/useFCMToken";
import useIsMounted from "hooks/useMounted";
import { createContext, useContext, useEffect, useRef, useState } from "react";
import * as rdd from "react-device-detect";
import io, { Socket } from "socket.io-client";
import { NotificationType } from "types/notification";
const AppContext = createContext({});

type dataType = {
  data: {
    logoUrl: string;
  };
};

type NotificationData = {
  data: NotificationType[];
  totalCount: number;
  perPage: number;
};

export const AppContextProvider = ({ children }: any) => {
  const [isLogin, setIsLogin] = useState(false);
  const [isMobileDevice, setIsMobileDevice] = useState(false);
  const { getUser, isUserLoading, user } = useAuth();
  const socketRef = useRef<Socket<any, any>>();
  const isMounted = useIsMounted();
  const { mutate } = useFetch();
  const { data, isValidating } = useSWRFetch<dataType>(`logo`);
  const { data: notification, mutate: reloadNotification } =
    useSWRFetch<NotificationData>(`notification`);

  useEffect(() => {
    (async () => {
      if (!user?._id) return;
      await mutate({
        path: `create-page-visit`,
        method: "POST",
        body: JSON.stringify({
          deviceType: rdd?.isDesktop
            ? "desktop"
            : rdd?.isMobile
            ? "mobile"
            : "Unknown",
          deviceOs: rdd?.osName?.toLowerCase(),
          deviceOsVersion: rdd?.osVersion,
          deviceModel: rdd?.mobileModel
            ? rdd?.mobileModel?.toLowerCase()
            : "Unknown",
        }),
      });
    })();
  }, [user?._id]);
  useFCMToken(user?._id);
  useEffect(() => {
    getUser();
  }, [getUser]);

  useEffect(() => {
    (() => {
      if (!isMounted) return;

      const token = localStorage.getItem("ACCESS_TOKEN");

      socketRef.current = io(`${SOCKET_BASEURL}`, {
        auth: {
          token: token,
        },
      });
    })();
  }, [user?._id, isMounted]);

  const handleChangeSize = (e: any) => {
    if (e?.target?.innerWidth < 768) {
      setIsMobileDevice(true);
    }
  };

  useEffect(() => {
    if (window.innerWidth < 768) {
      setIsMobileDevice(true);
    }
    window.addEventListener("resize", handleChangeSize);

    return () => {
      window.removeEventListener("resize", handleChangeSize);
    };
  }, []);

  return (
    <AppContext.Provider
      value={{
        isLogin,
        setIsLogin,
        isUserLoading,
        socketRef: socketRef.current,
        isMobileDevice,
        appLogo: data?.data?.logoUrl,
        notificationCount:
          (data?.data &&
            notification?.data?.filter((data) => !data?.readStatus)?.length) ||
          0,
        reloadNotificationCount: reloadNotification,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

const useAppContext = () => {
  const {
    isLogin,
    setIsLogin,
    isUserLoading,
    socketRef,
    isMobileDevice,
    appLogo,
    notificationCount,
    reloadNotificationCount,
  } = useContext<any>(AppContext);

  return {
    isLogin,
    setIsLogin,
    isUserLoading,
    socketRef,
    isMobileDevice,
    appLogo,
    notificationCount,
    reloadNotificationCount,
  };
};

export default useAppContext;
