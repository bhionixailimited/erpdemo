import { useRouter } from "next/router";
import { useEffect } from "react";

const RedirectPage = () => {
  const router = useRouter();

  useEffect(() => {
    if (router?.query?.role) {
      router.replace(`/panel/admin/dashboard`);
    }
  }, [router]);

  return null;
};

export default RedirectPage;
