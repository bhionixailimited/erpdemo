import { useRouter } from "next/router";
import { useCallback, useEffect, useState } from "react";
import useFetch from "./useFetch";
import { notify } from "utils";

declare var Razorpay: any;

const usePayment = () => {
  const [paymentData, setPaymentData] = useState({});

  const { mutate } = useFetch();
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
      loadScript("https://checkout.razorpay.com/v1/checkout.js");
    }
    return () => {
      isMounted = false;
    };
  }, [loadScript]);

  const handleVerifyPayment = async (
    payment_id: string,
    payment_order_id: string,
    payment_signature: string,
    studentId: string,
    studentFeesId: string,
    amount: number
  ) => {
    try {
      const checkoutData = {
        paymentId: payment_id,
        orderId: payment_order_id,
        paymentSignature: payment_signature,
        paymentMode: "ONLINE",
        studentFeesId: studentFeesId,
        amount,
      };
      const res = await mutate({
        path: `student/pay/${studentId}`,
        method: "POST",
        body: JSON.stringify(checkoutData),
      });

      if (res?.data?.error) throw new Error(res?.data?.error);
      notify.success("Payment Successful");

      return res;
    } catch (error) {
      if (error instanceof Error) {
        notify.error(error.message);
      } else {
        notify.error("Something went wrong");
      }
    }
  };

  const handleOnlinePayment = useCallback(
    ({
      totalPayableAmount,
      paymentTitle,
      name,
      email,
      contact,
      notes,
      receipt,
      studentId,
      payId,
    }: {
      totalPayableAmount: number;
      paymentTitle: string;
      name?: string;
      email?: string;
      contact?: string;
      notes?: any;
      receipt?: string;
      studentId: string;
      payId: string;
    }) => {
      return new Promise(async (resolve, reject) => {
        try {
          const res = await mutate({
            path: "create-transaction",
            method: "POST",
            body: JSON.stringify({
              amount: totalPayableAmount,
              receipt,
              notes,
            }),
          });
          const data = res?.data?.data?.data;

          setPaymentData(data);

          const options: any = {
            key: process.env.NEXT_PUBLIC_RAZOR_PAY_TOKEN,
            currency: "INR",
            name: paymentTitle,
            description: paymentTitle,
            image:
              "https://www.yarderp.com/_next/static/media/logo.f0924f01.png",
            prefill: {
              name: name,
              email: email,
              contact: contact,
            },
            handler: async (response: any) => {
              const {
                razorpay_payment_id,
                razorpay_order_id,
                razorpay_signature,
              } = response;
              await handleVerifyPayment(
                razorpay_payment_id,
                razorpay_order_id,
                razorpay_signature,
                studentId,
                payId,
                totalPayableAmount
              );
              resolve(true);
            },
            amount: data?.amount,
            order_id: data?.id,
          };
          const rzp = new Razorpay(options);
          rzp.open();
          rzp.on("payment.failed", function (response: any) {
            reject(response?.error?.description);
          });
        } catch (error) {
          reject(error);
        }
      });
    },
    []
  );
  return { handleOnlinePayment, paymentData };
};

export default usePayment;
