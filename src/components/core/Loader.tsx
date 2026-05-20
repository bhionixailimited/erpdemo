import { useSWRFetch } from "hooks";

type Props = {
  visible?: boolean;
};
type dataType = {
  data: {
    logoUrl: string;
  };
};
const Loader = ({ visible }: Props) => {
  const { data, isValidating } = useSWRFetch<dataType>(`logo`);
  return (
    <div
      className={`absolute z-[9999] flex h-full w-full items-center justify-center bg-white ${
        visible ? "block" : "hidden"
      }`}
    >
      <div className="relative h-52 w-52">
        <div className="rotate-animation h-52 w-52 rounded-full border-x-2 border-t-2 border-x-theme border-t-themeLight" />
        <img
          src={
            (!isValidating &&
              (data?.data?.logoUrl ? `${data?.data?.logoUrl}` : `/logo.png`)) ||
            undefined
          }
          className="absolute w-48 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 animate-pulse"
        />
      </div>
    </div>
  );
};

export default Loader;
