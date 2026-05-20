import { Send } from "@mui/icons-material";
import { Avatar, Skeleton } from "@mui/material";
import { Button, InputField } from "components/core";
import dayjs from "dayjs";
import { useAuth, useFetch, useSWRFetch } from "hooks";
import withProtectedRoute from "hooks/withProtectedRoute";
import { PrivateLayout } from "layouts";
import { useRouter } from "next/router";
import { Fragment, useState } from "react";
import { SupportMessageType } from "types/supportMessage";
import { notify } from "utils";

type SupportMessageDataType = {
  data: SupportMessageType[];
};

const SupportMessage = () => {
  const [message, setMessage] = useState("");

  const { user } = useAuth();

  const { query, push } = useRouter();

  const { supportId, subject } = query;

  const {
    data,
    isValidating,
    mutate: reloadEnquiry,
  } = useSWRFetch<SupportMessageDataType>(supportId && `enquiry/${supportId}`);

  const { mutate } = useFetch();

  const handleReplySupport = async () => {
    try {
      if (!message?.trim()) return;

      const response = await mutate({
        path: "enquiry/reply-to-support",
        method: "POST",
        body: JSON.stringify({
          message,
          enquiryId: supportId,
        }),
      });

      if (response?.data?.error) throw new Error(response?.data?.error);

      notify.success(response?.data?.message);

      setMessage("");

      reloadEnquiry?.();
    } catch (error) {
      if (error instanceof Error) {
        notify.error(error?.message);
      } else {
        notify.error("Oops! Something went wrong.");
      }
    }
  };

  const handleMarkAsResolved = async () => {
    try {
      const response = await mutate({
        path: "enquiry/mark-resolved",
        method: "POST",
        body: JSON.stringify({
          enquiryId: supportId,
          resolved: true,
        }),
      });

      if (response?.data?.error) throw new Error(response?.data?.error);

      notify.success(response?.data?.message);

      push(`/panel/${user?.role?.toLowerCase()}/support`);
    } catch (error) {
      if (error instanceof Error) {
        notify.error(error?.message);
      } else {
        notify.error("Oops! Something went wrong.");
      }
    }
  };

  return (
    <PrivateLayout title="Support | Chat">
      <section className="w-full p-4 relative h-[90vh] ">
        <div className={`w-full flex flex-col h-[90vh] relative `}>
          <div className="w-full h- z-30 flex items-center left-0 justify-between sticky top-0 dark:shadow-gray-100/10  dark:bg-gray-900 bg-white shadow-lg p-4 rounded-2xl ">
            <div className="flex gap-4 items-center w-fit">
              <span className="flex flex-col gap-1">
                <h3 className="font-medium tracking-wide text-lg text-black dark:text-white ">
                  {subject || "Unknown"}
                </h3>
                <small className="text-gray-500 tracking-wide"></small>
              </span>
            </div>
            <div className="flex items-center gap-2">
              <Button
                className="hover:ring-theme"
                onClick={handleMarkAsResolved}
              >
                Mark As Resolved
              </Button>
            </div>
          </div>

          <div className="flex  flex-col-reverse h-max overflow-y-auto left-menu-scroll pb-[10rem] ">
            {isValidating ? (
              Array(3)
                .fill(0)
                .map((i, index) => (
                  <Fragment key={index}>
                    {index % 2 === 0 ? (
                      <div
                        key={index}
                        className="relative w-full py-4 left-0  gap-4 flex items-start justify-start"
                      >
                        <Skeleton
                          variant="circular"
                          height={80}
                          width={80}
                          animation="wave"
                        />
                        <div className="w-full flex flex-col gap-1">
                          <div className="flex items-center gap-2">
                            <span
                              className="max-w-[90%] md:max-w-[70%] w-full py-2   text-sm text-white 
                          font-medium tracking-wide rounded-b-2xl rounded-r-2xl"
                            >
                              <Skeleton
                                variant="rounded"
                                height={45}
                                animation="wave"
                              />
                            </span>
                          </div>
                          <small className="text-gray-500 tracking-wide">
                            <Skeleton
                              variant="text"
                              animation="wave"
                              width={55}
                            />
                          </small>
                        </div>
                      </div>
                    ) : (
                      <div
                        key={index}
                        className="relative w-full py-4 left-0  gap-4 flex items-start justify-end"
                      >
                        <div className="w-full flex flex-col items-end gap-1">
                          <div className="flex items-end justify-end w-full gap-2">
                            <span
                              className="max-w-[90%] md:max-w-[70%] w-full py-2   text-sm text-white 
                        font-medium tracking-wide rounded-b-2xl rounded-r-2xl"
                            >
                              <Skeleton
                                variant="rounded"
                                height={45}
                                animation="wave"
                              />
                            </span>
                          </div>
                          <small className="text-gray-500 tracking-wide">
                            <Skeleton
                              variant="text"
                              animation="wave"
                              width={55}
                            />
                          </small>
                        </div>
                        <Skeleton
                          variant="circular"
                          height={80}
                          width={80}
                          animation="wave"
                        />
                      </div>
                    )}
                  </Fragment>
                ))
            ) : data?.data?.length ? (
              data?.data?.map((item) => (
                <Fragment key={item?._id}>
                  {item?.sender?._id === user?._id ? (
                    <div className="relative w-full left-0 text-sm  py-4 flex items-center justify-end  ">
                      <div className="w-full flex flex-col items-end mr-4  gap-2">
                        <span className="max-w-[90%] md:max-w-[70%] w-fit   text-sm bg-gray-100 rounded-b-2xl rounded-l-2xl shadow-lg font-medium tracking-wide py-2 px-4">
                          {item?.message}
                        </span>
                        <span className="flex items-center gap-2">
                          <small className="text-gray-500 tracking-wide">
                            {dayjs(item?.createdAt).format("LLL")}
                          </small>
                        </span>
                      </div>
                    </div>
                  ) : (
                    <div className="relative w-full py-4 left-0  gap-4 flex items-start justify-start">
                      <Avatar
                        src={
                          item?.sender?.photoUrl ||
                          `https://avatars.dicebear.com/api/male/${item?.sender?.displayName}.svg`
                        }
                      />
                      <div className="w-full flex flex-col gap-1">
                        <div className="flex items-center gap-2">
                          <span
                            className="max-w-[90%] md:max-w-[70%] w-fit py-2 px-4   text-sm text-white 
                     bg-theme font-medium tracking-wide rounded-b-2xl rounded-r-2xl"
                          >
                            {item?.message}
                          </span>
                        </div>
                        <small className="text-gray-500 tracking-wide">
                          {dayjs(item?.createdAt).format("LLL")}
                        </small>
                      </div>
                    </div>
                  )}
                </Fragment>
              ))
            ) : (
              <div className=" w-full flex items-center justify-center">
                <h3 className="font-medium tracking-wide text-sm text-theme">
                  No Messages
                </h3>
              </div>
            )}
          </div>

          <div className="w-full h-fit flex absolute bottom-0 left-0 items-center justify-between gap-4 bg-white  dark:bg-gray-900 pb-4 md:p-4    z-10  ">
            <InputField
              type="text"
              multiline
              rows={5}
              value={message}
              onChange={(e: any) => setMessage(e?.target?.value)}
              placeholder="Type message..."
            />
            <span
              className="bg-gray-200/20 rounded-full h-10 w-10 flex items-center justify-center cursor-pointer  "
              onClick={handleReplySupport}
            >
              <Send className="text-theme text-2xl" />
            </span>
          </div>
        </div>
      </section>
    </PrivateLayout>
  );
};

export default withProtectedRoute(SupportMessage);
