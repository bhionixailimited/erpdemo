import Head from "next/head";
import Script from "next/script";
import Footer from "./Footer";
import Navbar from "./Navbar";
import { isProductionEnvironment } from "utils";
import { useSWRFetch } from "hooks";

type Props = {
  children: JSX.Element[] | JSX.Element;
  title?: string;
  description?: string;
  ogImage?: string;
};

type dataType = {
  data: {
    logoUrl: string;
  };
};

const prodEnv = isProductionEnvironment();

export default function CommonLayout({ children }: Props) {
  const { data, isValidating } = useSWRFetch<dataType>(`logo`);
  return (
    <>
      <main>
        <Head>
          <meta property="og:url" content="" />
          <meta property="og:type" content="website" />
          <link
            rel="icon"
            href={`${
              process.env.NEXT_PUBLIC_FIREBASE_FAVICON_URL || `/favicon.png`
            }`}
            type="image/png"
          />
          <title>
            {process.env.NEXT_PUBLIC_TITLE ||
              "Customized ERP Solution For Colleges, Universities & Schools."}
          </title>
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
              data?.data?.logoUrl ||
              process.env.NEXT_PUBLIC_FIREBASE_FAVICON_URL ||
              "https://www.yarderp.com/og-image.jpg"
            }
          />
        </Head>
        {!prodEnv && <Navbar />}

        {children}

        {!prodEnv && <Footer />}
      </main>
      {/* Talkie App */}
      {/* {!prodEnv && (
        <Script
          id="my-script"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
          (() => {
            var Tawk_API = Tawk_API || {},
              Tawk_LoadStart = new Date();
            (() => {
              var s1 = document.createElement("script"),
                s0 = document.getElementsByTagName("script")[0];
              s1.async = true;
              s1.src = "https://embed.tawk.to/5e311f9adaaca76c6fd05b3f/default";
              s1.charset = "UTF-8";
              s1.setAttribute("crossorigin", "*");
              s0.parentNode.insertBefore(s1, s0);
              
            })();

            navigation.addEventListener("navigate",()=>{
              if(window.location.href.includes("panel")){
                s1.src=""
              }
          })

          })();`,
          }}
        />
      )} */}
    </>
  );
}
