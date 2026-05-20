import { ListItemIcon, Menu, MenuItem } from "@mui/material";
import { useState } from "react";

type Props = {
  title: string;
  content: string | number;
  className?: string;
  iconClassName?: string;
  titleClassName?: string;
  contentClassName?: string;
  icon: React.ReactElement;
  //   onClick: any;
};

export default function Visitors({
  title,
  icon,
  content,
  className = "",
  iconClassName = "",
  titleClassName = "",
  contentClassName = "",
}: //   onClick,
Props) {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: any) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  return (
    <div
      //   onClick={onClick}
      className={`w-full flex flex-col !items-center     rounded-[16px] pb-2 pt-2 !shadow-none border border-grey-300 ${className} `}
    >
      <div className="flex flex-col !justify-end !items-end w-full !mr-5">
        {/* <Info
          className="!text-theme  !text-base cursor-pointer"
          onClick={handleClick}
        /> */}
      </div>
      <div
        className={`text-center !items-center  bg-gray-100 !justify-center ${iconClassName} !rounded-xl p-1 mt-2  `}
      >
        <div className="h-full !text-center !items-center   !justify-center !text-md px-1  py-0">
          {icon}
        </div>
      </div>
      <div className="flex  flex-col items-center p-4">
        <h1
          className={`font-semibold text-2xl ${contentClassName} !text-slate-700`}
        >
          {content}
        </h1>
        <h1
          className={`${titleClassName} !text-slate-700 text-md font-semibold`}
        >
          {title}
        </h1>
      </div>
      {/* <Menu
                    anchorEl={anchorEl}
                    open={open}
                    onClose={handleClose}
                    onClick={handleClose}
                    // PaperProps={{
                    //   elevation: 0,
                    //   sx: {
                    //     overflow: "visible",
                    //     filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
                    //     mt: 1.5,
                    //     "& .MuiAvatar-root": {
                    //       width: 32,
                    //       height: 32,
                    //       ml: -0.5,
                    //       mr: 1,
                    //     },
                    //     "&:before": {
                    //       content: '""',
                    //       display: "block",
                    //       position: "absolute",
                    //       top: 0,
                    //       right: 14,
                    //       width: 10,
                    //       height: 10,
                    //       bgcolor: "background.paper",
                    //       transform: "translateY(-50%) rotate(45deg)",
                    //       zIndex: 0,
                    //     },
                    //   },
                    // }}
                    transformOrigin={{ horizontal: "left", vertical: "bottom" }}
                    anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
                  >
                   
                    <MenuItem
                     className=""
                    >
                    <ListItemIcon><People className="!text-theme"/></ListItemIcon><span className="!font-medium">Students:</span><span className="ml-2">{5000}</span>            
                    </MenuItem>
                    <MenuItem
                     className=""
                    >
                    <ListItemIcon><EscalatorWarning className="!text-theme"/></ListItemIcon><span className="!font-medium">Parents: </span> <span className="ml-2">{5000}</span>              
                    </MenuItem>
                    <MenuItem
                      // onClick={() =>
                      //   router?.push("/panel/admin/change-password")
                      // }
                    >
                    
                    <ListItemIcon><Badge className="!text-theme"/></ListItemIcon><span className="!font-medium">Staffs:</span><span className="ml-2">{5000}</span>            
                    </MenuItem>
                  </Menu> */}
    </div>
  );
}
