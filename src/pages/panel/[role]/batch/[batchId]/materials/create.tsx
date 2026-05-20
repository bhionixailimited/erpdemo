import { CLOUDUPLOAD } from "assets/animations";
import { CreateMaterialForm } from "components/form/teacher";
import { BatchLayout } from "components/teachers";
import withTeacherAdminProtected from "hooks/withTeacherAdminProtected";
import Lottie from "components/core/ClientLottie";

const defaultOptions = {
  loop: true,
  autoplay: true,
  animationData: CLOUDUPLOAD,
  rendererSettings: {
    preserveAspectRatio: "xMidYMid slice",
  },
};

const Materials = () => {
  return (
    <BatchLayout>
      <div className="w-full flex items-start gap-4 ">
        <CreateMaterialForm />
        <div className="w-full max-w-md mt-16 lg:flex hidden ">
          <Lottie options={defaultOptions} height={400} width={400} />
        </div>
      </div>
    </BatchLayout>
  );
};

export default withTeacherAdminProtected(Materials);
