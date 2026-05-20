import { CallView } from "components/common";
import withProtectedStudent from "hooks/withStudentProtected";
import Head from "next/head";

const CallPage = () => {
  return (
    <div>
      <Head>
        <title>LMS | Student </title>
        <link rel="icon" href="/favicon.png" type="image/png" />
      </Head>
      <main className="w-full">
        <CallView />
      </main>
    </div>
  );
};

export default withProtectedStudent(CallPage);
