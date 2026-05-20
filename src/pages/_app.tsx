import dayjs from "dayjs";
import "dayjs/locale/en-in"; // import locale
import duration from "dayjs/plugin/duration";
import isLeapYear from "dayjs/plugin/isLeapYear"; // import plugin
import isToday from "dayjs/plugin/isToday";
import LocalizedFormat from "dayjs/plugin/localizedFormat";
import type { AppProps } from "next/app";
import { Router } from "next/router";
import nProgress from "nprogress";
import "react-quill/dist/quill.snow.css";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "slick-carousel/slick/slick-theme.css";
import "slick-carousel/slick/slick.css";
import MaterialTheme from "utils/MaterialTheme";
import "../styles/globals.css";
import "../styles/nprogress.css";

function MyApp({ Component, pageProps }: AppProps) {
  Router.events.on("routeChangeStart", nProgress.start);
  Router.events.on("routeChangeError", nProgress.done);
  Router.events.on("routeChangeComplete", nProgress.done);
  dayjs.extend(isLeapYear); // use plugin
  dayjs.locale("en-in"); // use locale
  dayjs.extend(LocalizedFormat);
  dayjs.extend(duration);
  dayjs.extend(isToday);
  dayjs().format("L LT");

  return (
    <MaterialTheme>
      <Component {...pageProps} />
      <ToastContainer />
    </MaterialTheme>
  );
}

export default MyApp;
