import * as React from "react";
import Drawer from "@mui/material/Drawer";
import { Avatar, IconButton, Tooltip } from "@mui/material";
import { Button } from "components/core";
import { Add, Close, Delete, Edit } from "@mui/icons-material";
import { useAuth, useFetch, useSWRFetch } from "hooks";
import { FileIcon } from "assets/static-icon";
import { async } from "@firebase/util";
import { notify } from "utils";

export default function DocumentSideDrawer({
  assetId,
  setAssetId,
  setDocumentId,
  setAccrecationId,
}: {
  assetId: string;
  setAssetId: React.Dispatch<React.SetStateAction<string>>;
  setDocumentId: React.Dispatch<React.SetStateAction<string>>;
  setAccrecationId: React.Dispatch<React.SetStateAction<string>>;
}) {
  const { data: certificate, mutate: certificateMutate } = useSWRFetch<any>(
    `certificate-document?accreditationId=${assetId}`
  );
  const { mutate } = useFetch();
  const deleteData = async (id: string) => {
    try {
      const response = await mutate({
        path: `certificate-document/${id}`,
        method: "DELETE",
        // isFormData: true,
        // body: formData,
      });
      if (response?.status !== 200) throw new Error(response?.data?.message);
      certificateMutate();
      notify.success(response?.data?.message);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <Drawer
      anchor={"right"}
      open={Boolean(assetId)}
      onClose={() => setAssetId("")}
    >
      <div className="w-[400px] px-2 py-4">
        <IconButton onClick={() => setAssetId("")} className=" !text-gray-700">
          <Close />
        </IconButton>
      </div>
      <div className="w-full">
        <div className="w-full px-2 flex flex-row-reverse">
          <Button
            startIcon={<Add />}
            onClick={() => {
              setAccrecationId(assetId);
              setAssetId("");
            }}
          >
            Add Document
          </Button>
        </div>
        {certificate?.data?.map((certificateItem: any, index: number) => (
          <React.Fragment key={index}>
            <div className="flex border-b-[0.5px] border-gray-300 px-1 py-1 mb-1 items-center">
              <div
                className="w-24 mr-2 cursor-pointer"
                role="button"
                onClick={() => window.open(certificateItem?.documentUrl)}
              >
                <img src={FileIcon.src} alt="" />
              </div>
              <div
                role="button"
                onClick={() => window.open(certificateItem?.documentUrl)}
                className="justify-items-center items-center flex cursor-pointer"
              >
                <p className="w-[100px]">
                  {certificateItem?.title
                    ? certificateItem?.title
                    : `Document-${index + 1}`}
                </p>
              </div>
              <div className="flex justify-items-center items-center flex-row-reverse w-full">
                <Tooltip title="Details">
                  <Avatar
                    variant="rounded"
                    className="!mr-0.5 !ml-0.5 !cursor-pointer !bg-yellow-500 !p-0"
                    sx={{
                      mr: ".1vw",
                      padding: "0px !important",
                      backgroundColor: "Highlight",
                      cursor: "pointer",
                      color: "",
                      width: 30,
                      height: 30,
                    }}
                    onClick={() => {
                      setAccrecationId(assetId);
                      setAssetId("");
                      setDocumentId(certificateItem?._id);
                    }}
                  >
                    <Edit sx={{ padding: "0px !important" }} fontSize="small" />
                  </Avatar>
                </Tooltip>
                <Tooltip title="Delete">
                  <Avatar
                    variant="rounded"
                    className="!mr-0.5 !ml-0.5 !cursor-pointer !bg-red-500 !p-0"
                    sx={{
                      mr: "0.1vw",
                      padding: "0px !important",
                      backgroundColor: "Highlight",
                      cursor: "pointer",
                      color: "",
                      width: 30,
                      height: 30,
                    }}
                    onClick={() => deleteData(certificateItem?._id)}
                  >
                    <Delete
                      sx={{ padding: "0px !important" }}
                      fontSize="small"
                    />
                  </Avatar>
                </Tooltip>
              </div>
            </div>
          </React.Fragment>
        ))}
      </div>
    </Drawer>
  );
}
