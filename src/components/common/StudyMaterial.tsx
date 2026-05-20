import {
  ContentCopyRounded,
  Delete,
  FileDownload,
  PlayCircle,
} from "@mui/icons-material";
import { Avatar, IconButton } from "@mui/material";
import { OtherIcon, PdfIcon, VideoIcon, WordIcon } from "assets/static-icon";
import { useAuth, useFetch } from "hooks";
import Swal from "sweetalert2";
import { KeyedMutator } from "swr";
import { notify } from "utils";

type Props = {
  title?: string;
  publishedAt?: string;
  type?: string;
  _id?: string;
  mutate?: KeyedMutator<any>;
  url?: string;
  link?: string;
};

const StudyMaterial = ({
  title,
  publishedAt,
  type,
  _id,
  mutate,
  link,
  url,
}: Props) => {
  const { mutate: material } = useFetch();
  const { user } = useAuth();
  const handleDelete = async (id: string) => {
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
            const response = await material({
              path: `batch/material-delete/${id}`,
              method: "DELETE",
            });
            if (response?.data?.error) {
              notify.error(response?.data?.error);
              reject(response?.data?.error);
            }
            mutate && mutate();
            notify.success(response?.data?.message);
            resolve(response?.data?.message);
          });
      });
    } catch (err) {
      console.log(err);
    }
  };

  const handleCopyText = async () => {
    try {
      link && (await window.navigator.clipboard.writeText(link));
      notify.success("Link copied to clipboard");
    } catch (error) {
      if (error instanceof Error) {
        notify.error(error.message);
        return;
      }
      notify.error("Oops! Something went wrong ");
    }
  };

  return (
    <div className="w-full flex flex-col gap-4  relative items-center group bg-white shadow-xl rounded-xl p-4 scale-100 hover:scale-105 duration-300 ease-in-out border-b-8 border-b-theme ">
      {type === "PDF" ? (
        <Avatar src={PdfIcon.src} className="!h-16 !p-2 !w-16" />
      ) : type === "WORD" ? (
        <Avatar src={WordIcon.src} className="!h-16 !p-2 !w-16" />
      ) : type === "LINK" ? (
        <Avatar src={VideoIcon.src} className="!h-16 !p-2 !w-16" />
      ) : (
        <Avatar src={OtherIcon.src} className="!h-16 !p-2 !w-16" />
      )}

      <h3 className="font-medium tracking-wide text-base">{title}</h3>

      <small className="text-gray-500 tracking-wide">
        Published - {publishedAt}
      </small>

      <div className="absolute top-0 left-0 opacity-0 group-hover:opacity-100 duration-300 ease-in-out cursor-pointer  h-full w-full backdrop-blur-[2px] ">
        <div className="flex items-center justify-center w-full h-full gap-5 ">
          {type === "PDF" || type === "WORD" ? (
            <>
              {" "}
              <a
                href={url}
                target="_blank"
                rel="noreferrer"
                referrerPolicy="no-referrer"
                download={title}
              >
                <IconButton className="!bg-theme !text-white">
                  <FileDownload />
                </IconButton>{" "}
              </a>
              {user?.role === "STUDENT" ? (
                <a
                  href={url}
                  target="_blank"
                  rel="noreferrer"
                  referrerPolicy="no-referrer"
                >
                  <IconButton className="!bg-blue-500 !text-white">
                    <PlayCircle />
                  </IconButton>
                </a>
              ) : (
                <IconButton
                  className="!bg-red-500 !text-white"
                  onClick={() => handleDelete(_id as any)}
                >
                  <Delete />
                </IconButton>
              )}
            </>
          ) : (
            <>
              <IconButton
                className="!bg-theme !text-white"
                onClick={handleCopyText}
              >
                <ContentCopyRounded />
              </IconButton>{" "}
              {user?.role === "STUDENT" ? (
                <a
                  href={url}
                  target="_blank"
                  rel="noreferrer"
                  referrerPolicy="no-referrer"
                >
                  <IconButton className="!bg-blue-500 !text-white">
                    <PlayCircle />
                  </IconButton>
                </a>
              ) : (
                <IconButton
                  className="!bg-red-500 !text-white"
                  onClick={() => handleDelete(_id as any)}
                >
                  <Delete />
                </IconButton>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default StudyMaterial;
