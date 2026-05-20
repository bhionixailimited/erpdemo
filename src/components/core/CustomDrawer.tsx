import { Drawer, DrawerProps } from "@mui/material";

interface Props extends DrawerProps {
  maxWidth?: "lg" | "md" | "full" | "sm";
  width?: string;
  height?: string;
  className?: string;
}

const CustomDrawer = ({
  anchor,
  onClose,
  children,
  maxWidth = "md",
  open,
  width,
  height,
  className,
}: Props) => {
  const maxWidthChart = {
    lg: "80vw",
    md: "50vw",
    full: "100vw",
    sm: "30vw",
    xs: "20vw",
    auto: "auto",
  };

  return (
    <Drawer anchor={anchor} open={open} onClose={onClose} keepMounted={false}>
      <div
        // style={{
        //   height: height || "auto",
        //   width: width ? width : maxWidthChart[maxWidth] || "auto",
        // }}
        className={`w-80 md:w-[700px]`}
      >
        {children}
      </div>
    </Drawer>
  );
};

export default CustomDrawer;
