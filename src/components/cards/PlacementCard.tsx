import dayjs from "dayjs";
import { useRouter } from "next/router";

const PlacementCard = ({
  date,
  title,
  description,
  companyName,
  // companyRepresentative,
  companyServe,
  onClick,
}: any) => {
  const { push, query } = useRouter();

  return (
    <div
      className="w-full bg-white shadow-xl hover:shadow-2xl duration-300 ease-in-out transition-all rounded-lg p-4 border-l-4 cursor-pointer border-l-theme "
      onClick={onClick}
    >
      {/* <h3 className=" tracking-wide text-base text-theme font-medium">
        Schedule Date - {date}
      </h3> */}

      <h3 className=" tracking-wide text-base text-theme font-medium">
        Last Day To Apply - {dayjs(date).format("LL")}
      </h3>
      <div className="flex flex-col  my-2 gap-2">
        <h3 className="font-semibold tracking-wide text-lg text-gray-800">
          {title}
        </h3>
        {description ? (
          <p
            dangerouslySetInnerHTML={{
              __html:
                description?.slice(0, 200) +
                `${
                  description?.length && description?.length > 200 ? "..." : ""
                }`,
            }}
            className="tracking-wide text-base "
          ></p>
        ) : null}

        {/* <span className="flex flex-row gap-2 text-base">
          <p>Company Respresntative :</p>
          <p>
            {companyRepresentative ? companyRepresentative : "Not Provided"}
          </p>
        </span> */}
      </div>
      <div className="flex items-center  ">
        <small className="tracking-wide bg-theme px-2 py-1 rounded-md text-white">
          Company - {companyName} {companyServe && companyServe}{" "}
        </small>
      </div>
    </div>
  );
};

export default PlacementCard;
