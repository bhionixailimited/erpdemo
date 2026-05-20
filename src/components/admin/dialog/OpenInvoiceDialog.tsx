import {
  Add,
  Close,
  DesignServices,
  Done,
  RotateLeft,
  Visibility,
} from "@mui/icons-material";
import {
  FormControl,
  FormControlLabel,
  FormLabel,
  IconButton,
  Radio,
  RadioGroup,
  Tooltip,
  Avatar,
} from "@mui/material";
import {
  Button,
  CustomAutocomplete,
  CustomDialog,
  InputField,
  TextInput,
  UploadFile,
} from "components/core";
import dayjs from "dayjs";
import { useFormik } from "formik";
import { useFetch, useSWRFetch } from "hooks";
import { useState } from "react";
import { KeyedMutator } from "swr";
import DepartmentType from "types/department";
import DesignationType from "types/designation";
import { autoAddFormdata, notify } from "utils";
import * as Yup from "yup";
import { Invoice } from "..";

type Props = {
  feeName?: string;
  designation?: DesignationType;
  Dmutate?: KeyedMutator<any>;
  _id: string;
};
type dataType = {
  data: DepartmentType[];
};
const OpenInvoiceDialog = ({ feeName, designation, Dmutate, _id }: Props) => {
  const { data } = useSWRFetch<any>(`inventory/supply/${_id}`);

  const [openDialog, setOpenDialog] = useState(false);

  return (
    <>
      <div className="w-fit">
        <CustomDialog
          open={openDialog}
          onClose={() => setOpenDialog(false)}
          maxWidth="md"
        >
          <Invoice orderInfo={data} />
        </CustomDialog>

        <Tooltip title="View Invoice">
          <Avatar
            variant="rounded"
            onClick={() => setOpenDialog(true)}
            className="!mr-1 !cursor-pointer !bg-theme !p-0"
          >
            <Visibility className="!p-0" />
          </Avatar>
        </Tooltip>
      </div>
    </>
  );
};

export default OpenInvoiceDialog;
