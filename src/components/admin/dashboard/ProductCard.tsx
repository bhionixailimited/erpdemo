import { ChevronRight } from "@mui/icons-material";
import {
  Avatar,
  Button,
  Card,
  CardContent,
  Divider,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
} from "@mui/material";
import { Empty } from "components/core";
import { useSWRFetch } from "hooks";
import { useRouter } from "next/router";

export default function ProductCard() {
  const { push } = useRouter();
  const {
    data: inventory,
    mutate,
    isValidating,
  } = useSWRFetch<any>("dashboard/admin/inventory-top-product");
  const data = [
    {
      title: "College Notebook",
      image: "https://cdn-icons-png.flaticon.com/128/732/732393.png",
      count: 50,
    },
    {
      title: "College Bags",
      image: "https://cdn-icons-png.flaticon.com/128/5263/5263841.png",
      count: 35,
    },
    {
      title: "Practical Papers",
      image: "https://cdn-icons-png.flaticon.com/128/3253/3253267.png",
      count: 25,
    },
    {
      title: "Uniforms",
      image: "https://cdn-icons-png.flaticon.com/128/3074/3074425.png",
      count: 15,
    },
  ];
  return (
    <>
      <Card className=" !shadow-lg  !pb-0 !rounded-xl bg-white p-6  border">
        <h3 className="!font-semibold !text-lg  text-black  !px-3 !pb-0">
          Top Sold Product
        </h3>
        {!inventory?.data?.length ? (
          <Empty title="No Product Found" />
        ) : (
          <>
            {" "}
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
              <List>
                {inventory?.data
                  ?.slice(0, 4)
                  ?.map((item: any, index: number) => (
                    <ListItem
                      key={item?.product?.title}
                      className={"!pt-4"}
                      secondaryAction={
                        <span className="font-semibold !text-gray-500">
                          {item?.totalSold}
                        </span>
                      }
                    >
                      <ListItemAvatar>
                        <Avatar
                          variant="rounded"
                          alt="Cindy Baker"
                          src={`https://cdn-icons-png.flaticon.com/128/2897/2897785.png`}
                        />
                      </ListItemAvatar>
                      <ListItemText
                        primaryTypographyProps={{
                          color: "gray",
                          fontWeight: "500",
                        }}
                        secondaryTypographyProps={{
                          color: "gray",
                          fontWeight: "300",
                        }}
                        primary={item?.product?.title}
                        //   secondary="alexa@pmay.com"
                      ></ListItemText>
                    </ListItem>
                  ))}
              </List>
            </CardContent>
          </>
        )}
        <Divider />
        <div className="!text-end p-5">
          <Button
            onClick={() => push("/panel/admin/inventory/manage-stock")}
            size="small"
            className="!font-bold !text-slate-600 !ml-0!text-xs normal-case"
            endIcon={<ChevronRight className=" !text-2xl " />}
          >
            View All
          </Button>
        </div>{" "}
      </Card>
    </>
  );
}
