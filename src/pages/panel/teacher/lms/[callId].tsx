import { CallView } from "components/common";
import withProtectedTeacher from "hooks/withTeacherProtected";
import Head from "next/head";

const CallPage = () => {
  return (
    <>
      <Head>
        <title>LMS | Teacher </title>
        <link rel="icon" href="/newfavicon.png" type="image/png" />
      </Head>
      <main className="w-full">
        <CallView />
      </main>
    </>
  );
};

export default withProtectedTeacher(CallPage);
