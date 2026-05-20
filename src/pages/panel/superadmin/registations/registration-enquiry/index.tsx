import { RegistrationEnquiry } from "components/apply/registration";
import { withProtectedSuperAdmin } from "hooks";
import { PrivateLayout } from "layouts";

const Registrationenquiry = () => {
  return (
    <PrivateLayout title="Registration Enquiry">
      <div className="w-full md:p-4">
        <RegistrationEnquiry />
      </div>
    </PrivateLayout>
  );
};

export default withProtectedSuperAdmin(Registrationenquiry);
