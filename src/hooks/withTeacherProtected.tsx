import { Loader } from "components/core";
import { AppContextProvider } from "contexts/AppContextProvider";
import { useRouter } from "next/router";
import { useEffect, useRef } from "react";
import useAuth from "./useAuth";
const withProtectedTeacher = (PassedComponent: any) =>
  function NewComponent(props: any) {
    const { user, isUserLoading } = useAuth();
    const { push } = useRouter();

    let mounted = useRef<boolean>(false);

    useEffect(() => {
      (() => {
        mounted.current = true;
        if (isUserLoading || !mounted.current) return;
        if (
          !user?._id ||
          !user?.role ||
          user?.role === "STAFF" ||
          user?.role === "STUDENT"
        ) {
          push("/login");
        }
      })();
      return () => {
        mounted.current = false;
      };
    }, [isUserLoading, user, push]);

    return (
      <AppContextProvider>
        {user?._id && (user?.role === "TEACHER" || user?.role === "ADMIN") ? (
          <PassedComponent {...props} />
        ) : (
          <Loader visible={true} />
        )}
      </AppContextProvider>
    );
  };

export default withProtectedTeacher;
