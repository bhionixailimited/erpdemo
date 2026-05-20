import { useRouter } from "next/router";
import { useState } from "react";

type Props = {
  title: string;
  content?: string;
  className?: string;
  iconClassName?: string;
  titleClassName?: string;
  contain?: string;
  contentClassName?: string;
  clickableRoute?: string;
  onClick?: () => void;
  icon: React.ReactElement;
  selected?: boolean;
  headingClassName?: string;
  subClassName?: string;
};

export default function PaymentDashboardCard({
  title,
  icon,
  content,
  className = "",
  iconClassName = "",
  titleClassName = "",
  contentClassName = "",
  onClick,
  clickableRoute = "",
  selected = false,
  subClassName = "",
  headingClassName = "",
}: Props) {
  const [noteOpen, setNoteOpen] = useState<boolean>(false);
  const router = useRouter();

  return (
    <>
      <div
        onClick={onClick}
        className={`${className} ${subClassName} ${
          selected ? "!bg-theme" : ""
        }  `}
      >
        <div
          className={`rounded-full  ${iconClassName} ${
            selected ? "!bg-white" : ""
          }`}
        >
          <div
            className={`text-sm p-3 ${
              selected ? "!text-pink-600" : "!text-white"
            }`}
          >
            {icon}
          </div>
        </div>
        <div className={` ${headingClassName}`}>
          <h4
            className={`${contentClassName} ${selected ? "!text-white" : ""}`}
          >
            {content}
          </h4>

          {/* <h4 className={`text-sm ${contentClassName}`}>{content}</h4> */}
          <h1
            className={` ${titleClassName} ${
              selected ? "!text-white !pt-2" : ""
            } `}
          >
            {title}
          </h1>
        </div>
      </div>
    </>
  );
}
