import { StockSupplied } from "components/admin";
import { withProtectedAdmin } from "hooks";
import withProtectedTeacher from "hooks/withTeacherProtected";
import { PrivateLayout } from "layouts";

const SupplyStock = () => {
  return (
    <PrivateLayout title="Inventory | Supply ">
      <section className="w-full p-4">
        <StockSupplied type={"STAFF"} exportType="REQUEST" isSelf={true} />
      </section>
    </PrivateLayout>
  );
};

export default withProtectedTeacher(SupplyStock);
