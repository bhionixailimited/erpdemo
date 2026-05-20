import { useSWRFetch } from "hooks";
import Head from "next/head";
import Link from "next/link";

type dataType = {
  data: {
    logoUrl: string;
  };
};

const ThankYou = () => {
  const { data, isValidating } = useSWRFetch<dataType>(`logo`);

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
        <title>
          {process.env.NEXT_PUBLIC_TITLE ||
            "Apply for Admission at PODDAR Institutes"}
        </title>
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

      <div className="w-full flex items-center justify-center">
        <div className="flex items-center justify-center h-screen">
          <div className="p-4 rounded shadow-lg ring ring-indigo-600/50">
            <div className="flex flex-col items-center space-y-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="text-green-600 w-28 h-28"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                stroke-width="1"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              <h1 className="text-4xl font-bold">Thank You !</h1>
              <p>
                Thank you for your registration! Check your email for a link to
                the guide.
              </p>
              <a className="inline-flex items-center px-4 py-2 text-white bg-indigo-600 border border-indigo-600  rounded-full hover:bg-indigo-700 focus:outline-none focus:ring">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-3 h-3 mr-2"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  stroke-width="2"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M7 16l-4-4m0 0l4-4m-4 4h18"
                  />
                </svg>
                <span className="text-sm font-medium">
                  <Link href={"/apply"}>Home</Link>
                </span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default ThankYou;
