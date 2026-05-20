import { useCallback, useEffect } from "react";
import { getLocalStorageItem } from "utils";
import { BASE_URL } from "configs";
import useApplyAuth from "./useApplyAuth";

const useAtomPay = () => {
  const { user } = useApplyAuth();
  const openPay = ({
    token,
    merchId,
    paymentOrderId,
    txnId,
  }: {
    token: any;
    merchId: any;
    paymentOrderId: any;
    txnId: any;
  }) => {
    const userToken = getLocalStorageItem("ACCESS_TOKEN");

    let url = new URL(`${BASE_URL}registration/pay/verify`);

    let searchParams = url.searchParams;

    searchParams.set("transactionId", paymentOrderId);
    userToken && searchParams.set("userToken", userToken);
    searchParams.set("redirectUrl", window.location.href);

    const options = {
      atomTokenId: token,
      merchId: merchId,
      custEmail: user?.email,
      custMobile: user?.studentPhoneNumber,
      returnUrl: url?.toString(), // replace with your return URL
    };
    new (window as any).AtomPaynetz(options, "uat");
  };

  const loadScript = useCallback((src: string) => {
    return new Promise((resolve) => {
      const script = document.createElement("script");
      script.src = src;
      script.onload = () => {
        resolve(true);
      };
      script.onerror = () => {
        resolve(false);
      };
      document.body.appendChild(script);
    });
  }, []);

  useEffect(() => {
    let isMounted = true;
    if (isMounted) {
      loadScript(
        `https://pgtest.atomtech.in/staticdata/ots/js/atomcheckout.js?v=${Date.now()}`
      );
    }
    return () => {
      isMounted = false;
    };
  }, [loadScript]);

  return {
    OpenAtom: (token: any, merchId: any, paymentOrderId: any, txnId: any) =>
      openPay({ token, merchId, paymentOrderId, txnId }),
  };
};

export default useAtomPay;
