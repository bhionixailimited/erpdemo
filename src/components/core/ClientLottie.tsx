import dynamic from "next/dynamic";

const ClientLottie = dynamic(() => import("react-lottie"), { ssr: false });

export default ClientLottie;
