import {
  Add,
  DeleteRounded,
  Download,
  Edit,
  MoreHorizRounded,
  RemoveRedEye,
  RemoveRedEyeOutlined,
} from "@mui/icons-material";
import {
  IconButton,
  ListItemIcon,
  Menu,
  MenuItem,
  Pagination,
  Tooltip,
} from "@mui/material";
import { FileIcon, folderType } from "assets/static-icon";
import {
  AddNaacFolderAttachmentsDialog,
  AddNaacFolderNextedFolderDialog,
  UpdateNaacFolderAttachmentsDialog,
  UpdateNaacFolderDialog,
} from "components/admin/dialog";
import { Button, Empty } from "components/core";
import { useFetch, useSWRFetch, withProtectedAdmin } from "hooks";
import { PrivateLayout } from "layouts";
import { useRouter } from "next/router";
import { MouseEvent, useState } from "react";
import Swal from "sweetalert2";
import { downloadZipFileNestedArray, notify } from "utils";

const NaacFolder = () => {
  const { mutate: fetchData } = useFetch();
  const [pageNo, setPageNo] = useState(1);
  const [attachmentPageNo, setAttachmentPageNo] = useState(1);
  const router = useRouter();
  const [isUpdate, setIsUpdate] = useState(false);
  const [isItem, setIsItem] = useState<any>();
  //perPage=12&     ----------- if needed
  const { data, isValidating, mutate } = useSWRFetch<any>(
    `naac-folder/?naacFolderId=${router?.query?.naacFolder}&pageNo=${pageNo}`
  );

  //perPage=12&     ----------- if needed
  const { data: attachment, mutate: attachmentMutate } = useSWRFetch<any>(
    `naac-file?pageNo=${attachmentPageNo}&folderId=${router?.query?.naacFolder}`
  );
  const handleDeleteNaac = (id: string) => {
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
            const response = await fetchData({
              path: `naac-file/${id}`,
              method: "DELETE",
            });
            if (response?.data?.error) {
              notify.error(response?.data?.error);
              reject(response?.data?.error);
            }
            attachmentMutate && attachmentMutate();
            notify.success(response?.data?.message);
            resolve(response?.data?.message);
          });
      });
    } catch (err) {
      console.log(err);
    }
  };

  const handleDownloadNaac = async (naacId: string) => {
    try {
      const response = await fetchData({
        method: "GET",
        path: `naac/export` + (naacId ? `?naacFolderId=${naacId}` : ""),
      });
      if (response?.status !== 200) throw new Error("Zip download failed");

      downloadZipFileNestedArray(response?.data?.data?.data);
    } catch (error) {}
  };

  return (
    <PrivateLayout>
      <UpdateNaacFolderAttachmentsDialog
        mutate={attachmentMutate}
        open={isUpdate}
        handleClose={() => {
          setIsUpdate(false);
        }}
        data={isItem}
      />
      <section className="py-4">
        <div className="mb-4 mx-4 flex bg-indigo-50 p-4 rounded-md shadow-md justify-between flex-col gap-2 md:flex-row">
          <h2 className="text-theme text-3xl font-bold ">NAAC FOLDER</h2>
          <div className="flex flex-col lg:flex-row gap-2 items-start">
            <Button
              startIcon={<Download />}
              onClick={() => {
                router?.query?.naacFolder &&
                  handleDownloadNaac(router?.query?.naacFolder?.toString());
              }}
            >
              Export
            </Button>
            <AddNaacFolderNextedFolderDialog mutate={mutate} />
            <AddNaacFolderAttachmentsDialog mutate={attachmentMutate} />
          </div>
        </div>
        <section className="px-4 py-2">
          <div className="grid md:grid-cols-6 gap-6">
            {data?.data?.length ? (
              data?.data?.map((item: any, i: number) => (
                <div
                  key={i}
                  className="bg-gray-200 relative px-4 py-4 rounded-lg shadow-lg"
                >
                  <CardContent mutate={mutate} item={item} userDetails={item} />
                </div>
              ))
            ) : (
              <div className="w-full col-span-12 flex items-center justify-center py-4 mt-2">
                <Empty title="No Naac Folder" />
              </div>
            )}
          </div>
          {/* --------------Pagination---------------- */}
          {/* <div className="w-full flex items-center justify-center py-4 mt-2">
            <Pagination
              count={Math.ceil(
                Number(data?.totalCount || 1) / Number(data?.perPage || 1)
              )}
              onChange={(e, v: number) => setPageNo(v)}
              variant="outlined"
              color="primary"
            />
          </div> */}
        </section>
        <div className="mb-4 mx-4 mt-3 flex bg-indigo-50 p-4 rounded-md shadow-md justify-between flex-col gap-2 md:flex-row">
          <h2 className="text-theme text-3xl font-bold ">Attachments</h2>
          {/* <div>
            <AddNaacFolderAttachmentsDialog mutate={mutate} />
          </div> */}
        </div>
        <section className="container mx-auto px-5 py-3">
          {attachment?.data?.length ? (
            <>
              {attachment?.data?.map((item: any, index: number) => (
                <>
                  <div
                    key={item?._id}
                    className={`md:flex py-2 bg-gray-100  transition duration-500 ease-in-out my-4 shadow-md gap-6 rounded-lg overflow-hidden border-l-8 
                      ${borderColors[index % borderColors.length]}`}
                  >
                    <div>
                      {item?.documentUrl ? (
                        <img className="w-14 h-14" src={FileIcon.src} alt="" />
                      ) : (
                        "No Doc"
                      )}
                    </div>
                    <div className={`flex flex-1 flex-col p-4 `}>
                      <span className="md:text-2xl text-lg">{item?.title}</span>
                    </div>
                    <div className="grid gap-5 grid-cols-3 px-4 items-center text-xs uppercase tracking-wide font-semibold">
                      {item?.documentUrl ? (
                        <Tooltip title="View AttachMent">
                          <IconButton
                            onClick={() => window.open(item?.documentUrl)}
                          >
                            <RemoveRedEye />
                          </IconButton>
                        </Tooltip>
                      ) : null}
                      <Tooltip title="Update">
                        <IconButton
                          onClick={() => {
                            setIsUpdate(true), setIsItem(item);
                          }}
                        >
                          <Edit />
                        </IconButton>
                      </Tooltip>
                      <Tooltip title="Delete">
                        <IconButton onClick={() => handleDeleteNaac(item?._id)}>
                          <DeleteRounded />
                        </IconButton>
                      </Tooltip>
                    </div>
                  </div>
                </>
              ))}
            </>
          ) : (
            <span className="flex justify-center text-center py-4 px-3">
              No Attachment Found
            </span>
          )}
          {/* ------------------Pagination--------------------- */}
          {/* <div className="w-full flex items-center justify-center py-4 mt-2">
            <Pagination
              count={Math.ceil(
                Number(attachment?.totalCount || 1) /
                  Number(attachment?.perPage || 1)
              )}
              onChange={(e, v: number) => setAttachmentPageNo(v)}
              variant="outlined"
              color="primary"
            />
          </div> */}
        </section>
      </section>
    </PrivateLayout>
  );
};

export default withProtectedAdmin(NaacFolder);

const CardContent = ({ item, mutate, userDetails }: any) => {
  const router = useRouter();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const [isItem, setIsItem] = useState<any>();

  const { mutate: vehicleDelete } = useFetch();
  const [isUpdate, setIsUpdate] = useState(false);
  const handleClick = (event: MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleDeleteNaac = (id: string) => {
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
            const response = await vehicleDelete({
              path: `naac-folder/${id}`,
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

  const { mutate: fetchData } = useFetch();

  const handleDownloadNaac = async (naacId: string) => {
    try {
      const response = await fetchData({
        method: "GET",
        path: `naac/export` + (naacId ? `?naacFolderId=${naacId}` : ""),
      });
      if (response?.status !== 200) throw new Error("Zip download failed");

      downloadZipFileNestedArray(response?.data?.data?.data);
    } catch (error) {}
  };

  return (
    <>
      <UpdateNaacFolderDialog
        mutate={mutate}
        open={isUpdate}
        handleClose={() => {
          setIsUpdate(false);
        }}
        data={isItem}
      />
      <div className="absolute right-[5px] top-[5px]">
        <Tooltip title="More">
          <IconButton onClick={handleClick}>
            <MoreHorizRounded />
          </IconButton>
        </Tooltip>
        <Menu
          anchorEl={anchorEl}
          id="account-menu"
          open={open}
          onClose={handleClose}
          onClick={handleClose}
          PaperProps={{
            elevation: 0,
            sx: {
              overflow: "visible",
              filter: "drop-shadow(0px 2px 2px rgba(0,0,0,0.1))",
              mt: 1.5,
              "& .MuiAvatar-root": {
                width: 32,
                height: 32,
                ml: -0.5,
                mr: 1,
              },
              "&:before": {
                content: '""',
                display: "block",
                position: "absolute",
                top: 0,
                right: 14,
                width: 10,
                height: 10,
                bgcolor: "background.paper",
                transform: "translateY(-50%) rotate(45deg)",
                zIndex: 0,
              },
            },
          }}
          transformOrigin={{ horizontal: "right", vertical: "top" }}
          anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
        >
          <Tooltip placement="right" title="View Attachments">
            <MenuItem
              onClick={() => {
                router.push(`/panel/admin/naac/${item?._id}`), handleClose();
              }}
            >
              <ListItemIcon>
                <RemoveRedEyeOutlined fontSize="small" />
              </ListItemIcon>
              View
            </MenuItem>
          </Tooltip>

          <MenuItem
            onClick={() => {
              setIsUpdate(true), setIsItem(item);
            }}
          >
            <ListItemIcon>
              <Edit fontSize="small" />
            </ListItemIcon>
            Update
          </MenuItem>

          <MenuItem
            onClick={() => {
              handleDeleteNaac(item?._id);
            }}
          >
            <ListItemIcon>
              <DeleteRounded fontSize="small" />
            </ListItemIcon>
            Delete
          </MenuItem>

          <MenuItem
            onClick={() => {
              handleDownloadNaac(item?._id);
            }}
          >
            <ListItemIcon>
              <Download fontSize="small" />
            </ListItemIcon>
            Export
          </MenuItem>
        </Menu>
      </div>
      <div
        className="grid pt-4 cursor-pointer justify-items-center items-center gap-2"
        onClick={() => {
          router.push(`/panel/admin/naac/${item?._id}`), handleClose();
        }}
      >
        <img className="w-24 h-24" src={folderType.src} />
        <span className="font-semibold text-center py-2">{item?.title}</span>
      </div>
    </>
  );
};
const borderColors = [
  "border-violet-400",
  "border-green-400",
  "border-blue-400",
  "border-yellow-400",
  "border-red-400",
  "border-gray-400",
  "border-pink-400",
  "border-cyan-400",
];
