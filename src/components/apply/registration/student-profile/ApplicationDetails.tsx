import MaterialTable from "@material-table/core";
import PaymentsIcon from "@mui/icons-material/Payments";
import {
  Avatar,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Paper,
  Tooltip,
  Typography,
} from "@mui/material";
import { useApplyAuth, useFetch } from "hooks";
import { MuiTblOptions } from "utils";
import { Payments, Visibility } from "@mui/icons-material";
import { Button } from "components/core";
import Link from "next/link";
import { useRef } from "react";

const ApplicationDetails = () => {
  const { loading } = useFetch();
  const tableRef = useRef<any>(null);
  const { user } = useApplyAuth();

  return (
    <div className="w-full">
      <MaterialTable
        tableRef={tableRef}
        components={{
          Container: (props) => <Paper {...props} className="!bg-indigo-50" />,
        }}
        title={"Application Status"}
        isLoading={loading}
        data={[
          {
            slNo: 1,
            gender: user?.studentGender,
            name: user?.programme?.title,
            id: user?._id,
            applicationId: user?._id,
            submitDate: user?.dateOfApplication
              ? new Date(user?.dateOfApplication).getDate()
              : "Not Submitted",
            applicationFee: user?.transactionId?.amount,
            status: !user?.isPaymentDone
              ? "Payment Pending"
              : user?.isApplicationSubmitted
              ? "Submitted"
              : user?.isRejected
              ? "Rejected"
              : "Not Submitted",
            isPaid: user?.isPaymentDone || false,
            isApplicationSubmitted: user?.isApplicationSubmitted,
            isRejected: user?.isRejected,
          },
        ]}
        options={{
          ...MuiTblOptions(),
          debounceInterval: 500,
          search: false,
          exportMenu: [],
        }}
        columns={[
          {
            title: "#",
            field: "slNo",
            editable: "never",
            width: "2%",
          },

          {
            title: "Application No.",
            field: "applicationId",
            searchable: true,
            // render: ({ gender }) => (
            //   <h3 className="font-medium lowercase first-letter:uppercase">
            //     {gender}
            //   </h3>
            // ),
          },
          {
            title: "Programme Name",
            field: "name",
            searchable: true,
            // render: ({ gender }) => (
            //   <h3 className="font-medium lowercase first-letter:uppercase">
            //     {gender}
            //   </h3>
            // ),
          },
          {
            title: "Application Submitted On",
            field: "submitDate",
            searchable: true,
            // render: ({ gender }) => (
            //   <h3 className="font-medium lowercase first-letter:uppercase">
            //     {gender}
            //   </h3>
            // ),
          },
          {
            title: "Application Fee Total",
            field: "applicationFee",
            searchable: true,
            // render: ({ gender }) => (
            //   <h3 className="font-medium lowercase first-letter:uppercase">
            //     {gender}
            //   </h3>
            // ),
          },
          {
            title: "Status",
            field: "status",
            searchable: true,
            // render: ({ gender }) => (
            //   <h3 className="font-medium lowercase first-letter:uppercase">
            //     {gender}
            //   </h3>
            // ),
          },

          {
            title: "Action",
            field: "gender",
            searchable: true,
            render: ({ isPaid, isApplicationSubmitted, isRejected }) => (
              <div className="flex items-center justify-center">
                {!isPaid ? (
                  <Button className="!bg-green-500 hover:!ring-green-500">
                    <Link href={`/apply/registration`}>
                      <div className="flex gap-2">
                        <Payments className="text-white" />
                        <p>Pay</p>
                      </div>
                    </Link>
                  </Button>
                ) : !isApplicationSubmitted ? (
                  <Button>
                    <Link href={`/apply/registration`}>
                      <div className="flex gap-2">
                        <Visibility className="text-white" />
                        <p>Continue</p>
                      </div>
                    </Link>
                  </Button>
                ) : isRejected ? (
                  <Button className="!bg-red-500 hover:!ring-red-500">
                    <div className="flex gap-2">
                      <Visibility className="text-white" />
                      <p>Rejected</p>
                    </div>
                  </Button>
                ) : (
                  <Button>
                    <div className="flex gap-2">
                      <Visibility className="text-white" />
                      <p>Completed</p>
                    </div>
                  </Button>
                )}
              </div>
            ),
          },
        ]}
      />
    </div>
  );
};

export default ApplicationDetails;
