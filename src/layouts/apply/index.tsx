import { Loader } from "components/core";
import { useApplyAuth, useSWRFetch } from "hooks";
import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect } from "react";

type dataType = {
  data: {
    logoUrl: string;
  };
};

const ApplyLayout = ({
  title,
  children,
}: {
  title?: string;
  children: JSX.Element | JSX.Element[];
}) => {
  const { data, isValidating } = useSWRFetch<dataType>(`logo`);

  const { getUser, user, isUserLoading } = useApplyAuth();
  const router = useRouter();

  useEffect(() => {
    getUser();
  }, []);

  useEffect(() => {
    let mounted = true;

    if (mounted) {
      if (!isUserLoading && !user?._id) {
        router?.push("/apply");
      }
    }
    return () => {
      mounted = false;
    };
  }, [user, isUserLoading, router]);

  return (
    <main>
      <Head>
        <meta property="og:url" content="" />
        <meta property="og:type" content="website" />
        <link
          rel="icon"
          href={`${
            process.env.NEXT_PUBLIC_FIREBASE_FAVICON_URL || `/newfavicon.png`
          }`}
          type="image/png"
        />
        <title>{title || "Apply for Admission at PODDAR Institutes"}</title>
        <meta
          name="description"
          content={
            process.env.NEXT_PUBLIC_DESCRIPTION ||
            ` Group is imparting value education since 1998. Colleges are approved by UGC, AICTE, PCI, NCTE and are affiliated to RU, RTU and RISU.`
          }
        ></meta>

        <meta
          property="og:image"
          content={
            data?.data?.logoUrl ||
            process.env.NEXT_PUBLIC_FIREBASE_FAVICON_URL ||
            "https://www.poddarinstitute.org/assets/images/logo/poddar-logo.webp"
          }
        />
      </Head>

      <div className="w-full">{!user?._id ? <Loader visible /> : children}</div>
    </main>
  );
};

export default ApplyLayout;
