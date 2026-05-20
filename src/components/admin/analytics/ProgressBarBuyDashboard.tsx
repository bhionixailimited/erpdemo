import { Card, CardContent, LinearProgress } from "@mui/material";

export default function ProgressBarBuyDashboard() {
  return (
    <>
      <Card className="p-3">
        <h2 className="!text-md px-3 !font-bold pb-3">Progress Status</h2>
        <CardContent>
          <div className="flex flex-col gap-6">
            <div className="flex items-center gap-5">
              <span className="w-16 bg-pink-50 rounded-full p-1">
                {/* <Image src={buy_initiated_icon} alt="initiated" /> */}
              </span>

              <span className="w-full">
                <div className=" flex flex-row justify-between">
                  <h6 className="!text-sm font-medium text-theme pb-2">
                    Initiated
                  </h6>
                  <p className="!text-sm !font-semibold">
                    {/* <CurrencyRupee className="h-4 w-4" /> */}
                    {`${1245} (75.7%)`}
                  </p>
                </div>
                <LinearProgress
                  color="warning"
                  variant="determinate"
                  value={70}
                  className="!rounded-xl"
                />
              </span>
            </div>
            <div className="flex items-center gap-4">
              <span className="w-16 bg-pink-50 rounded-full p-2">
                {/* <Image src={buy_received_icon} alt="received" /> */}
              </span>
              <span className="w-full">
                <div className="flex flex-row justify-between">
                  <h6 className="!text-sm font-medium text-theme pb-2">
                    Received
                  </h6>
                  <p className="!text-sm !font-semibold">
                    {/* <CurrencyRupee className="h-4 w-4" /> */}
                    {`${245} (40.7%)`}
                  </p>
                </div>
                <LinearProgress
                  color="info"
                  variant="determinate"
                  value={40}
                  className="!rounded-xl"
                />
              </span>
            </div>
            <div className="flex items-center gap-4">
              <span className="w-16 bg-pink-50 rounded-full p-2">
                {/* <Image src={buy_completed_icon} alt="completed" /> */}
              </span>
              <span className="w-full">
                <div className="flex flex-row justify-between">
                  <h6 className="!text-sm font-medium text-theme pb-2">
                    Completed
                  </h6>
                  <p className="!text-sm !font-semibold">
                    {/* <CurrencyRupee className="h-4 w-4" /> */}
                    {`${345}  (23.7%)`}
                  </p>
                </div>
                <LinearProgress
                  color="success"
                  variant="determinate"
                  value={20}
                  className="!rounded-xl"
                />
              </span>
            </div>
            <div className="flex items-center gap-4">
              <span className="w-16 bg-pink-50 rounded-full p-1">
                {/* <Image src={buy_cancel_icon} alt="cancel" /> */}
              </span>
              <span className="w-full">
                <div className="flex flex-row justify-between">
                  <h6 className="!text-sm font-medium text-theme pb-2">
                    Cancelled
                  </h6>
                  <p className="!text-sm !font-semibold">
                    {/* <CurrencyRupee className="h-4 w-4" /> */}
                    {`${124} (35.7%)`}
                  </p>
                </div>
                <LinearProgress
                  color="error"
                  variant="determinate"
                  value={30}
                  className=" !rounded-xl"
                />
              </span>
            </div>
          </div>
        </CardContent>
      </Card>
    </>
  );
}
