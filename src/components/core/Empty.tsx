import { EMPTY } from "assets/animations";
import Lottie from "./ClientLottie";

type Props = {
  title: string;
  className?: string;
  height?: number | string;
  width?: number | string;
};
const defaultOptions = {
  loop: true,
  autoplay: true,
  animationData: EMPTY,
  rendererSettings: {
    preserveAspectRatio: "xMidYMid slice",
  },
};
const Empty = ({ title, height, width, className = "h-96 w-96" }: Props) => {
  return (
    <>
      <section className="w-full grid place-content-center mt-8">
        <Lottie
          options={defaultOptions}
          height={height || 300}
          width={width || 300}
        />
        <h1 className="text-center text-theme font-semibold tracking-widest text-xl mt-8">
          {title}
        </h1>
      </section>
    </>
  );
};

export default Empty;
