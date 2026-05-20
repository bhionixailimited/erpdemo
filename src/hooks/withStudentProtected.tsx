import { Loader } from "components/core";
import { AppContextProvider } from "contexts/AppContextProvider";
import { useRouter } from "next/router";
import { useEffect, useRef } from "react";
import { getDashboardPathByRole } from "utils";
import useAuth from "./useAuth";

const STUDENT_PANEL_ROLES = ["STUDENT", "PARENT"];

const withProtectedStudent = (PassedComponent: any) =>
  function NewComponent(props: any) {
    const { user, isUserLoading } = useAuth();
    const { push } = useRouter();

    let mounted = useRef<boolean>(false);

    useEffect(() => {
      (() => {
        mounted.current = true;
        if (isUserLoading || !mounted.current) return;
        if (!user?._id || !user?.role) {
          push("/login");
          return;
        }

        const role = String(user.role).toUpperCase();
        const dashboardPath = getDashboardPathByRole(role);

        if (dashboardPath && !dashboardPath.includes("/panel/student/")) {
          push(dashboardPath);
          return;
        }

        if (!STUDENT_PANEL_ROLES.includes(role)) {
          push("/login");
        }
      })();
      return () => {
        mounted.current = false;
      };
    }, [isUserLoading, user, push]);

    return (
      <AppContextProvider>
        {user?._id && STUDENT_PANEL_ROLES.includes(String(user.role).toUpperCase()) ? (
          <PassedComponent {...props} />
        ) : (
          <Loader visible={true} />
        )}
      </AppContextProvider>
    );
  };

export default withProtectedStudent;
