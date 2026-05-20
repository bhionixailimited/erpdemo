import { ICONS } from "assets";

type Props = {
  children?: any;
  startIcon?: any;
  endIcon?: any;
  className?: string;
  onClick?: () => void;
  type?: "button" | "submit" | "reset";
  loading?: boolean;
  disabled?: boolean;
};

const Button = ({
  children,
  startIcon,
  endIcon,
  className,
  onClick,
  type,
  loading = false,
  disabled = false,
}: Props) => {
  return (
    <button
      className={`${
        disabled
          ? " hover:!ring-white gap-4 px-4 py-2  font-medium tracking-wide text-base btn-class btn-class shadow-xl text-white rounded-md  bg-gray-400 mt-2"
          : `hover:ring-2 hover:ring-theme hover:ring-offset-2 flex items-center justify-center text-white gap-4 px-4 py-2 font-medium tracking-wide text-base btn-class rounded-md shadow-xl bg-theme  ${className}`
      }`}
      onClick={() => onClick?.()}
      type={type}
      disabled={disabled}
    >
      {loading ? (
        <span className="flex gap-2">
          {<ICONS.Loading className="animate-spin text-white h-6 w-6" />}
          Loading...
        </span>
      ) : (
        <>
          {startIcon}
          {children}
          {endIcon}
        </>
      )}
    </button>
  );
};

export default Button;
