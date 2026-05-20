import MaterialTable from "@material-table/core";
import {
  Avatar,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Paper,
} from "@mui/material";
import { HeadStyle } from "components/core";
import dayjs from "dayjs";
import { useState } from "react";
import { MuiTblOptions } from "utils";

const UsersTable = () => {
  const [selectedUsers, setSelectedUsers] = useState<any[]>([]);

  const [tabelData] = useState([
    {
      sl: "1",
      displayName: "swaindsangeet",
      email: "vs@tsmart.uk",
      photoURL:
        "https://www.gravatar.com/avatar/48f5fa1e8abea6f4fb8430d536095b64?d=identicon",
      timestamp: new Date(),
      phoneNumber: "9238573462",
      blockStatus: "blocked",
      lastLoginTime: "12days ago",
    },
    {
      sl: "2",
      displayName: "swaindsangeeta",
      email: "vs@tsmart.uk",

      photoURL:
        "https://www.gravatar.com/avatar/48f5fa1e8abea6f4fb8430d536095b64?d=identicon",
      timestamp: new Date(),
      phoneNumber: "9238573462",
      blockStatus: "blocked",
      lastLoginTime: "12days ago",
    },
  ]);
  return (
    <div className="m-4">
      <MaterialTable
        data={tabelData}
        components={{
          Container: (props) => <Paper {...props} elevation={5} />,
        }}
        title={<HeadStyle name="Customers" />}
        options={{ ...MuiTblOptions(), selection: false }}
        columns={[
          {
            title: "#",
            field: "sl",
            editable: "never",
            width: "2%",
          },
          {
            title: "Profile",
            tooltip: "Profile",
            searchable: true,
            field: "displayName",
            render: ({ photoURL, displayName, email }) => (
              <>
                <ListItem sx={{ paddingLeft: "0px" }}>
                  <ListItemAvatar>
                    <Avatar src={photoURL} alt={"img"} />
                  </ListItemAvatar>
                  <ListItemText
                    secondaryTypographyProps={{
                      fontWeight: "600",
                    }}
                    primaryTypographyProps={{
                      fontWeight: "600",
                    }}
                    primary={
                      // <Typography component="h3" variant="body2">
                      displayName
                      // </Typography>
                    }
                    secondary={email}
                    //   secondary={phoneNumber}
                  ></ListItemText>
                </ListItem>
              </>
            ),
          },

          {
            title: "Phone",
            field: "phoneNumber",
            searchable: true,
            export: true,
            emptyValue: "Not Provided",
            //   hidden:true,
          },

          {
            title: "Created At",
            field: "timestamp",
            render: ({ timestamp }) => (
              <>{dayjs(timestamp).format("MMM D, YYYY h:mm A")}</>
            ),
          },
          {
            title: "Last Login",
            field: "lastLoginTime",
            emptyValue: "Not Login Yet",
          },
        ]}
      />
    </div>
  );
};

export default UsersTable;
