import { Delete, DesignServices } from "@mui/icons-material";
import { Skeleton } from "@mui/material";
import { PLACEMENTBG } from "assets";
import { Button } from "components/core";
import dayjs from "dayjs";
import { useAuth, useFetch } from "hooks";
import { useRouter } from "next/router";
import { useEffect, useRef, useState } from "react";
import { useReactToPrint } from "react-to-print";
import Swal from "sweetalert2";
import { notify } from "utils";

const PlacementDetails = ({
  data,
  loading,
}: {
  // data?: any;
  data?: {
    _id: string;
    title: string;
    qualification: string;
    session: string;
    companyName: string;
    companyDetails: string;
    jobDescription: string;
    companyRepresentative: string;
    jobBenefits: string;
    howToApply: string;
    lastDateToApply: Date;
    createdBy: string;
    position: string;
    companyId: {
      address: string;
      branch: string;
      description: string;
      industry: string;
      name: string;
      phoneNumber: string;
    };
  };
  loading?: boolean;
}) => {
  const [invisible, setInvisible] = useState<any>(false);
  const componentRef = useRef(null);
  const { user } = useAuth();

  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
    onAfterPrint: () => setInvisible(false),
  });
  const handleInvisible = () => {
    setInvisible(true);
  };
  useEffect(() => {
    invisible &&
      setTimeout(() => {
        handlePrint();
      }, 500);
  }, [invisible]);

  const { push } = useRouter();
  const { mutate: del } = useFetch();
  const handleDelete = (id: string) => {
    try {
      Swal.fire({
        title: "Are you sure?",
        text: "You will not be able to recover it again!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!",
      }).then(async (result) => {
        if (result.isConfirmed)
          new Promise(async (resolve, reject) => {
            const response = await del({
              path: `placement/notice/delete/${id}`,
              method: "DELETE",
            });
            if (response?.data?.error) {
              notify.error(response?.data?.error);
              reject(response?.data?.error);
            }

            push(`/panel/admin/placement`);
            notify.success(response?.data?.message);
            resolve(response?.data?.message);
          });
      });
    } catch (err) {
      console.log(err);
    } finally {
    }
  };

  return (
    <>
      <div
        className="w-full container mx-auto mb-4 flex flex-col bg-white shadow-xl rounded-lg p-4 "
        ref={componentRef}
      >
        <div
          className="flex items-center justify-center  bg-cover bg-center mb-8 "
          style={{
            backgroundImage: `url(${PLACEMENTBG.src})`,
          }}
        >
          <div className="w-full text-center text-white backdrop-brightness-[0.3] h-full min-h-[10rem] lg:min-h-[20rem] flex items-center justify-center text-xl md:text-4xl tracking-wide font-bold">
            Training And Placement Cell
          </div>
        </div>
        <div className="flex justify-between">
          {loading ? (
            <Skeleton animation="wave" height={40} width={350} />
          ) : (
            <h3 className="w-fulltext-left text-2xl mb-4 tracking-wide font-bold">
              {data?.title}
            </h3>
          )}
          {user?.role !== "STUDENT" && !invisible && (
            <div
              className={`w-fit flex flex-col md:flex-row items-center gap-2 ${
                invisible ? `hidden` : `block`
              }`}
            >
              {loading ? (
                <Skeleton
                  width={100}
                  height={40}
                  animation="wave"
                  variant="rounded"
                />
              ) : (
                <Button
                  className="hover:!ring-theme"
                  startIcon={<DesignServices />}
                  onClick={() =>
                    push(
                      `/panel/admin/placement/create?edit=true&noticeId=${data?._id}`
                    )
                  }
                >
                  Edit
                </Button>
              )}
              {loading ? (
                <Skeleton
                  width={100}
                  height={40}
                  animation="wave"
                  variant="rounded"
                />
              ) : (
                <Button
                  onClick={() => handleDelete(`${data?._id}`)}
                  className="hover:!ring-themeSecondary !bg-themeSecondary"
                  startIcon={<Delete />}
                >
                  Delete
                </Button>
              )}
            </div>
          )}
        </div>

        {/* ---------------Just for loading or skeleton loading DangerousHTML-----------------------*/}
        <div className="">
          {loading ? (
            <Skeleton animation="wave" height={100} />
          ) : (
            <p
              dangerouslySetInnerHTML={{
                __html: data?.jobDescription ?? "",
              }}
              className="text-base tracking-wide font-medium"
            ></p>
          )}

          {loading ? (
            <Skeleton animation="wave" height={50} />
          ) : (
            <p
              dangerouslySetInnerHTML={{
                __html: data?.jobBenefits ?? "",
              }}
              className="text-base tracking-wide font-medium"
            ></p>
          )}
        </div>
        {/* ---------------Details of Placement -----------------------*/}
        <div className="grid grid-cols-1 lg:grid lg:grid-cols-2 lg:gap-2 pt-4 gap-2">
          <div>
            {loading ? (
              <Skeleton animation="wave" height={40} width={200} />
            ) : (
              <span className="md:md:flex gap-4">
                <h3 className="font-semibold tracking-wide text-theme">
                  Organization Name :
                </h3>
                <p className="text-themeSecondary font-medium ">
                  {data?.companyId?.name || data?.companyName}
                </p>
              </span>
            )}
          </div>

          <div>
            {loading ? (
              <Skeleton animation="wave" height={40} width={200} />
            ) : (
              <span className="md:flex gap-4">
                <h3 className="font-semibold tracking-wide text-theme">
                  Company Details :
                </h3>
                <p
                  dangerouslySetInnerHTML={{
                    __html:
                      data?.companyId?.description ||
                      data?.companyDetails ||
                      "",
                  }}
                  className="text-themeSecondary font-medium "
                ></p>
              </span>
            )}
          </div>

          <div>
            {loading ? (
              <Skeleton animation="wave" height={40} width={200} />
            ) : (
              <span className="md:flex gap-4">
                <h3 className="font-semibold tracking-wide text-theme">
                  Designation :
                </h3>
                <p className="text-themeSecondary font-medium ">
                  {data?.position ? data?.position : "Unavailable"}
                </p>
              </span>
            )}
          </div>
          <div>
            {loading ? (
              <Skeleton animation="wave" height={40} width={200} />
            ) : (
              <span className="md:flex gap-4">
                <h3 className="font-semibold tracking-wide text-theme">
                  How to Apply :
                </h3>
                <p
                  dangerouslySetInnerHTML={{
                    __html: data?.howToApply ?? "",
                  }}
                  className="text-themeSecondary font-medium "
                ></p>
              </span>
            )}
          </div>
          {/* 
          <div>
            {loading ? (
              <Skeleton animation="wave" height={40} width={200} />
            ) : (
              <span className="md:flex gap-4">
                <h3 className="font-semibold tracking-wide text-theme">
                  Company Representative :
                </h3>
                <p className="text-themeSecondary font-medium ">
                  {data?.companyRepresentative
                    ? data?.companyRepresentative
                    : "Unavailable"}
                </p>
              </span>
            )}
          </div> */}
          <div>
            {loading ? (
              <Skeleton animation="wave" height={40} width={200} />
            ) : (
              <span className="md:flex gap-4">
                <h3 className="font-semibold tracking-wide text-theme">
                  Qualification :
                </h3>
                <p className="text-themeSecondary font-medium ">
                  {data?.qualification ? data?.qualification : "Unavailable"}
                </p>
              </span>
            )}
          </div>
          <div>
            {loading ? (
              <Skeleton animation="wave" height={40} width={200} />
            ) : (
              <span className="md:flex gap-4">
                <h3 className="font-semibold tracking-wide text-theme">
                  Company Name :
                </h3>
                <p className="text-themeSecondary font-medium ">
                  {data?.companyName ? data?.companyName : "Unavailable"}
                </p>
              </span>
            )}
          </div>
          <div>
            {loading ? (
              <Skeleton animation="wave" height={40} width={200} />
            ) : (
              <span className="md:flex gap-4">
                <h3 className="font-semibold tracking-wide text-theme">
                  Last Date To Apply :
                </h3>
                <p className="text-themeSecondary font-medium ">
                  {data?.lastDateToApply
                    ? dayjs(data?.lastDateToApply).format("LL")
                    : "Unavailable"}
                </p>
              </span>
            )}
          </div>

          {/* <div>
            {loading ? (
              <Skeleton animation="wave" height={40} width={200} />
            ) : (
              <span className="flex items-center gap-4">
                <h3 className="font-semibold tracking-wide text-theme">
                  Job Description :
                </h3>
                <p
                  dangerouslySetInnerHTML={{
                    __html: data?.jobDescription ?? "",
                  }}
                  className="text-base tracking-wide font-medium flex items-center"
                ></p>
              </span>
            )}
          </div> */}
          {/* <div>
            {loading ? (
              <Skeleton animation="wave" height={40} width={200} />
            ) : (
              <span className="flex items-center gap-4">
                <h3 className="font-semibold tracking-wide text-theme">
                  Job Benefits :
                </h3>
                <p className="text-themeSecondary font-medium ">
                  {data?.jobBenefits ? data?.jobBenefits : "Unavailable"}
                </p>
              </span>
            )}
          </div> */}
        </div>
      </div>

      {/* ---------------Download Notice-----------------------*/}
      <div className="w-full flex justify-center py-4">
        <Button
          onClick={() => {
            handleInvisible();
          }}
        >
          Download Notice
        </Button>
      </div>
    </>
  );
};

export default PlacementDetails;
