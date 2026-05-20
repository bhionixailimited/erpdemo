import { Avatar, Card, CardActionArea, CardContent } from "@mui/material";
import { StudentIcon } from "assets/static-icon";
import { useSWRFetch } from "hooks";
import { useRouter } from "next/router";

export default function SessionAdmission({ onClick }: any) {
  const { data, mutate, isValidating } = useSWRFetch<any>(
    "dashboard/admin/new-admission"
  );

  const router = useRouter();
  return (
    <>
      <Card className="border-b-4 border-theme !rounded-[1.5rem] !dashboard-card-shadow border-grey-300 !bg-white !group hover:!bg-theme ">
        <CardActionArea onClick={() => router.push(`${onClick}`)}>
          <CardContent>
            <div className="flex flex-col md:flex-row">
              <div className=" text-center bg-[#f3f8f2] px-3  rounded-xl font-semibold text-theme  group-hover:!bg-theme !py-2">
                {/* <School className="!text-5xl mt-1" /> */}
                <Avatar
                  variant="rounded"
                  className="h-14 w-14"
                  src={StudentIcon.src}
                />
              </div>
              <div className=" text-center font-semibold !text-slate-600 text-lg !px-4 group-hover:!text-white">
                <h2 className="!font-bold text-theme !text-2xl pb-1 group-hover:!text-white">
                  {data?.data?.totalNewAdmission || 0}
                </h2>
                New Admissions ({new Date().getFullYear() - 1}-
                {String(new Date().getFullYear()).substr(-2)})
              </div>
            </div>
          </CardContent>
        </CardActionArea>
      </Card>
    </>
  );
}
