import {
  DeleteRounded,
  Edit,
  InfoRounded,
  RemoveRedEye,
} from "@mui/icons-material";
import { IconButton, Pagination, Tooltip } from "@mui/material";
import { FileIcon } from "assets/static-icon";
import {
  AddNaacFolderAttachmentsDialog,
  UpdateNaacFolderAttachmentsDialog,
} from "components/admin/dialog";
import { useFetch, useSWRFetch, withProtectedAdmin } from "hooks";
import { PrivateLayout } from "layouts";
import { useRouter } from "next/router";
import React, { useState } from "react";
import Swal from "sweetalert2";
import { notify } from "utils";

const NaacId = () => {
  const { mutate: vehicleDelete } = useFetch();
  const [pageNo, setPageNo] = useState(1);
  const router = useRouter();
  const [isUpdate, setIsUpdate] = useState(false);
  const [isItem, setIsItem] = useState<any>();
  const { data, isValidating, mutate } = useSWRFetch<any>(
    `naac-file?perPage=12&pageNo=${pageNo}&folderId=${router.query.naacId}`
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
            const response = await vehicleDelete({
              path: `naac-file/${id}`,
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
    <PrivateLayout>
      <UpdateNaacFolderAttachmentsDialog
        mutate={mutate}
        open={isUpdate}
        handleClose={() => {
          setIsUpdate(false);
        }}
        data={isItem}
      />
      <div className="mb-4 mt-3 flex bg-indigo-50 p-4 rounded-md shadow-md justify-between flex-col gap-2 md:flex-row">
        <h2 className="text-theme text-3xl font-bold ">Folder Attachments</h2>
        <div>
          <AddNaacFolderAttachmentsDialog mutate={mutate} />
        </div>
      </div>
      <section className="container mx-auto px-5 py-3">
        {data?.data?.length ? (
          <>
            {data?.data?.map((item: any, index: number) => (
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
        <div className="w-full flex items-center justify-center py-4 mt-2">
          <Pagination
            count={Math.ceil(
              Number(data?.totalCount || 1) / Number(data?.perPage || 1)
            )}
            onChange={(e, v: number) => setPageNo(v)}
            variant="outlined"
            color="primary"
          />
        </div>
      </section>
    </PrivateLayout>
  );
};

export default withProtectedAdmin(NaacId);

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
