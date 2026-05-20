import {
  ContentCopyRounded,
  Delete,
  FileDownload,
  PlayCircle,
  RemoveRedEye,
} from "@mui/icons-material";
import { Avatar, Checkbox, Chip, IconButton, Tooltip } from "@mui/material";
import { FileIcon } from "assets/static-icon";
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
  keywords?: string[];
  checked?: any;
  onChange?: any;
  docsCard?: string;
};

const DocCard = ({
  title,
  publishedAt,
  type,
  _id,
  mutate,
  link,
  url,
  keywords,
  checked,
  onChange,
  docsCard,
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
              path: `document/${id}`,
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

  return (
    <div className="w-full flex flex-col bg-white shadow-xl rounded-xl scale-100 hover:scale-105 duration-300 ease-in-out border-b-8 border-b-theme ">
      <div className="h-ful w-full p-3 flex flex-row items-center justify-around  shadow-md shadow-slate-500 bg-theme text-white">
        <span>
          <a
            href={url}
            target="_blank"
            rel="noreferrer"
            referrerPolicy="no-referrer"
          >
            <Tooltip title="View Docs">
              <RemoveRedEye />
            </Tooltip>
          </a>
        </span>

        <span onClick={() => handleDelete(_id as any)}>
          <Tooltip title="Delete">
            <Delete />
          </Tooltip>
        </span>
        {docsCard === "chairman" && (
          <span className="">
            <Tooltip title="Choose to export">
              <Checkbox
                sx={{ "& .MuiSvgIcon-root": { fontSize: 30 } }}
                className="!text-white"
                // color="warning" // Change the checkbox color to white
                checked={checked}
                onChange={onChange}
              />
            </Tooltip>
          </span>
        )}
      </div>
      <div className="p-4 flex flex-col gap-4   items-center">
        <Avatar src={FileIcon.src} className="!h-16 !p-2 !w-16" />

        <h3 className="font-medium tracking-wide text-base">{title}</h3>
        {/* <h3 className="font-medium tracking-wide text-sm uppercase">{type}</h3> */}

        <small className="text-gray-500 tracking-wide">
          Published - {publishedAt}
        </small>
        {type ? (
          <span className="flex flex-row gap-2 text-gray-500">
            <small>Type - </small>
            <small className="tracking-wide">{type}</small>
          </span>
        ) : null}

        {keywords && keywords?.length > 0 ? (
          <span className="flex flex-row gap-2 text-gray-500">
            <small className="mt-3">Keywords- </small>
            <small className="tracking-wide">
              {keywords?.map((item: any, i: number) => (
                <Chip
                  key={i}
                  className="m-0.5 px-1 py-0.5 !bg-blue-300"
                  label={item}
                />
              ))}
            </small>
          </span>
        ) : null}
      </div>
    </div>
  );
};

export default DocCard;
