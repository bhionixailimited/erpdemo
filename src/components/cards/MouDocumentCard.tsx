import { Delete, Visibility } from "@mui/icons-material";
import { FolderIcon } from "assets/static-icon";
import { Button } from "components/core";
import dayjs from "dayjs";
import { useFetch } from "hooks";
import Swal from "sweetalert2";
import { notify } from "utils";

const MouDocumentCard = ({
  type,
  _id,
  testName,
  mainId,
  cgpa,
  examDate,
  resultType,
  percentage,
  img,
  Dmutate,
  cardMutate,
  forWhom,
}: any) => {
  const { mutate, loading } = useFetch();
  const handleDeleteSubject = async () => {
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
            const response = await mutate({
              path:
                forWhom === "EVENT"
                  ? `event/docs/${mainId}/${_id}`
                  : `mou/docs/${mainId}/${_id}`,
              method: "DELETE",
            });
            if (response?.data?.error) {
              notify.error(response?.data?.error);
              reject(response?.data?.error);
            }
            cardMutate();
            Dmutate?.();
            notify.success(response?.data?.message);
            resolve(response?.data?.message);
          });
      });
    } catch (error) {
      if (error instanceof Error) {
        notify.error(error?.message);
      } else {
        notify.error("Oops! something went wrong.");
      }
    }
  };
  return (
    <div className="w-full bg-white shadow-xl rounded-lg  hover:cursor-pointer scale-100 hover:scale-105 duration-300 ease-in-out transition-all ">
      <div
        className="flex items-center gap-4 border-b p-4 "
        onClick={() => window?.open(img)}
      >
        <div className="flex items-center h-20 !w-20 overflow-hidden rounded-full shadow-xl justify-center">
          <img
            src={type === "IMAGE" ? img || FolderIcon.src : FolderIcon.src}
            alt="Certificate icon"
            className=" h-12 !w-12 object-contain   "
          />
        </div>
        <div className="flex flex-col gap-1 items-start">
          <h3 className="font-semibold text-base tracking-wide">{testName}</h3>
          <small className="text-gray-600 font-medium "> {type}</small>
          {/* <small className="text-gray-600 font-medium ">
            {" "}
            {dayjs(examDate).format("LL")}
          </small> */}
          {/* <h3 className="font-semibold text-base tracking-wide">
            CGPA - {cgpa}
          </h3> */}
        </div>
      </div>

      <div className="w-full flex flex-col md:flex-row gap-4 px-4 pt-2 pb-4 items-center justify-center">
        {/* <div>
          <h3 className="text-theme font-semibold mb-2 tracking-wide">
            Issued By -
          </h3>
          <h3 className="font-medium text-sm tracking-wide">{resultType}</h3>
          <h3 className="font-medium text-sm tracking-wide">{percentage}</h3>
        </div> */}
        {Dmutate && (
          <>
            {" "}
            <div className="w-full ">
              <Button
                loading={loading}
                onClick={() => window?.open(img)}
                startIcon={<Visibility />}
                className="w-full "
              >
                View
              </Button>
            </div>{" "}
            <div className="w-full">
              <Button
                startIcon={<Delete />}
                loading={loading}
                className="hover:!ring-themeSecondary !bg-themeSecondary w-full"
                onClick={() => handleDeleteSubject()}
              >
                {loading ? "loading..." : "Delete"}
              </Button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default MouDocumentCard;
