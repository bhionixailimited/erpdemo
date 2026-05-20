import { Pages } from "@mui/icons-material";
import {
  Avatar,
  Card,
  CardContent,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
} from "@mui/material";
import Link from "next/link";

export default function ViewedPage() {
  const route = "/panel/admin/users/customers";
  return (
    <>
      <Card className=" !shadow-none !rounded-xl !pb-0">
        <h2 className="!font-bold !text-md  text-black !pt-3 !px-5 !pb-0">
          Top Viewed Pages (Visitors Count)
        </h2>
        <CardContent className="!mt-0 !pb-2">
          {/* <div className="flex flex-col md:flex-row">
              <div className="flex flex-row gap-10 ">
                <div className={`rounded-xl relative`}>
                  <div className="absolute top-11 left-[22vw] text-white">
                    {<ICONS.Buy className="text-5xl text-[#ffffff7c]" />}
                  </div>
                </div>
              </div>
              <div className=" text-center font-semibold text-blue-600 text-3xl py-4">
                5445
              </div>
              <div className=" text-center font-semibold text-blue-600 text-xl !px-5">
                Completed Beneficiaries Today
              </div>
            </div> */}
          <List className="!pt-0 !mt-0 !pl-0 !ml-0">
            <ListItem
              className="!pt-0 !mt-0 !pb-0 !pl-1 !ml-0"
              secondaryAction={
                <>
                  <span className="font-semibold !text-gray-500  !text-lg">
                    95
                  </span>
                </>
              }
            >
              <ListItemAvatar>
                <Avatar
                  className="!bg-pink-600"
                  variant="rounded"
                  alt="Cindy Baker"
                  //   src="https://cdn-icons-png.flaticon.com/128/2202/2202112.png"
                >
                  <Pages className="text-white" />
                </Avatar>
              </ListItemAvatar>
              <ListItemText
                primaryTypographyProps={{
                  color: "gray",
                  fontWeight: "600",
                  fontSize: "2.5vh",
                }}
                secondaryTypographyProps={{
                  color: "blue",
                  fontWeight: "500",
                }}
                primary="Customers"
                secondary={
                  <Link href={`${route}`}>
                    {route?.length > 27 ? route?.slice(0, 27) + "..." : route}
                  </Link>
                }
              ></ListItemText>
            </ListItem>
            <ListItem
              className="!pt-0 !mt-0 !pb-0 !pl-1 !ml-0"
              secondaryAction={
                <>
                  <span className="font-semibold !text-gray-500  !text-lg">
                    35
                  </span>
                </>
              }
            >
              <ListItemAvatar>
                <Avatar
                  className="!bg-pink-600"
                  variant="rounded"
                  alt="Cindy Baker"
                  //   src="https://cdn-icons-png.flaticon.com/128/2202/2202112.png"
                >
                  <Pages className="text-white" />
                </Avatar>
              </ListItemAvatar>
              <ListItemText
                primaryTypographyProps={{
                  color: "gray",
                  fontWeight: "600",
                  fontSize: "2.5vh",
                }}
                secondaryTypographyProps={{
                  color: "blue",
                  fontWeight: "500",
                }}
                primary="Repairs"
                secondary={
                  <Link href={`${route}`}>
                    {route?.length > 27 ? route?.slice(0, 27) + "..." : route}
                  </Link>
                }
              ></ListItemText>
            </ListItem>
            <ListItem
              className="!pt-0 !mt-0 !pb-1 !pl-1 !ml-0"
              secondaryAction={
                <>
                  <span className="font-semibold !text-gray-500  !text-lg">
                    25
                  </span>
                </>
              }
            >
              <ListItemAvatar>
                <Avatar
                  className="!bg-pink-600"
                  variant="rounded"
                  alt="Cindy Baker"
                  //   src="https://cdn-icons-png.flaticon.com/128/2202/2202112.png"
                >
                  <Pages className="text-white" />
                </Avatar>
              </ListItemAvatar>
              <ListItemText
                primaryTypographyProps={{
                  color: "gray",
                  fontWeight: "600",
                  fontSize: "2.5vh",
                }}
                secondaryTypographyProps={{
                  color: "blue",
                  fontWeight: "500",
                }}
                primary="Accessories"
                secondary={
                  <Link href={`${route}`}>
                    {route?.length > 27 ? route?.slice(0, 27) + "..." : route}
                  </Link>
                }
              ></ListItemText>
            </ListItem>
          </List>
        </CardContent>
      </Card>
    </>
  );
}
