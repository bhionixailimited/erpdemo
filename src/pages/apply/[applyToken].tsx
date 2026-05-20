import { Loader } from "components/core";
import { useFetch } from "hooks";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { notify } from "utils";

const Validation = () => {
  const { query, push } = useRouter();

  const { mutate } = useFetch();

  useEffect(() => {
    if (!query?.applyToken) return;

    (async () => {
      try {
        const response = await mutate({
          path: query?.["reset-password"]
            ? "registration/forgot-password/verify"
            : "registration/verify",
          method: "POST",
          body: JSON.stringify({
            token: query?.applyToken,
          }),
        });

        if (response?.data?.error) throw new Error(response?.data?.error);
        notify.success(response?.data?.message);
        if (query?.["reset-password"]) push("/apply");
        push("/apply/registration");
      } catch (error) {
        notify.error(
          error instanceof Error ? error?.message : "Something went wrong"
        );
      }
    })();
  }, [query?.applyToken, query?.["reset-password"]]);

  return (
    <div className="w-full">
      <Loader visible={true} />
    </div>
  );
};

export default Validation;
