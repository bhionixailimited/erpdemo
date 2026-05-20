import { Edit } from "@mui/icons-material";
import { CustomDrawer } from "components/core";
import { EditNonTeachingStaffForm } from "components/form/admin";
import { KeyedMutator } from "swr";

type Props = {
  open?: boolean;
  onClose?: () => void;
  data?: any;
  mutate?: KeyedMutator<any>;
};

const NonTeachingStaffDrawer = ({ open, onClose, data, mutate }: Props) => {
  return (
    <CustomDrawer
      open={open}
      onClose={onClose}
      className="!w-[90vw] max-w-xl"
      width="100%"
      anchor="right"
    >
      <div className="flex items-center justify-between p-4 border-b ">
        <div className="flex items-center text-slate-700 font-semibold text-xl gap-1 uppercase mt-14 md:mt-0">
          <Edit className="h-8 w-8" />
          <h3 className="tracking-wide text-center">
            Edit Non Teaching Staff Details
          </h3>
        </div>
      </div>
      <div className="w-full">
        <EditNonTeachingStaffForm
          staffId={data}
          onClose={onClose}
          mutate={mutate}
        />
      </div>
    </CustomDrawer>
  );
};

export default NonTeachingStaffDrawer;
