import { InventoryCards, ProductCard } from "components/admin";
import {
  ColumnChartUserDashboard,
  StudentDistribution,
  StudentDonutChart,
} from "components/admin/analytics";
import { useSWRFetch, withProtectedAdmin } from "hooks";
import { PrivateLayout } from "layouts";

const Dashboard = () => {
  const {
    data: inventory,
    mutate,
    isValidating,
  } = useSWRFetch<any>("dashboard/admin/inventory-overview");
  return (
    <div className="w-full">
      <PrivateLayout title="Inventory | Dashboard">
        <>
          <InventoryCards />
          <div className="grid grid-cols-12 content-between gap-4  p-6 ">
            <div className=" col-span-12 gap-2 md:col-span-12 lg:col-span-6">
              <StudentDonutChart
                pieLabel={["Out Of Stock", "Remaining"]}
                pieSeries={
                  [
                    inventory?.data?.outOfStock || 0,
                    inventory?.data?.inStock || 0,
                  ] || []
                }
                title={"Inventory Overview"}
                className={
                  "col-span-12 p-6  gap-4 rounded-xl border items-center bg-white shadow-lg flex flex-col md:col-span-12 lg:col-span-5"
                }
              />
            </div>
            {/* <div className="col-span-12 bg-white border  p-4 w-full flex flex-col  gap-5 md:col-span-12 lg:col-span-7 !border-grey-500 rounded-xl !shadow-xl"> */}
            {/* <ColumnChartUserDashboard type={"bar"} title={"Pass Out Students Report"}   className={"col-span-12   gap-10  flex flex-col "}/> */}
            {/* </div> */}
            <div className=" col-span-12 gap-2 md:col-span-12  lg:col-span-6">
              <ProductCard />
            </div>
            {/* <div className="col-span-12 bg-white border  p-4 w-full flex flex-col  gap-1 md:col-span-12 lg:col-span-4 !border-grey-500 rounded-xl !shadow-xl">
   
          </div> */}
          </div>
        </>
      </PrivateLayout>
    </div>
  );
};

export default withProtectedAdmin(Dashboard);
