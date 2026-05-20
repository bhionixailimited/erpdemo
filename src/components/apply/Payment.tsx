import { InputField } from "components/core";
import { useApplyAuth, useAtomPay, useFetch } from "hooks";
import { useEffect, useState } from "react";
import { notify } from "utils";

const Payment = ({ setActiveStep }: { setActiveStep?: (arg: any) => void }) => {
  const { user } = useApplyAuth();
  const [amountCalculate, setAmountCalculate] = useState({
    tokenData: undefined as any,
    totalAmount: 0,
    coupon: undefined as any,
    paymentHandlingCharge: 20,
    taxes: 3.6,
    totalPayableAmount: 0,
    couponDiscount: 0,
    orderId: "",
  });
  const [couponCode, setCouponCode] = useState("");
  const [inputText, setInputText] = useState("");
  const { mutate } = useFetch();
  const { OpenAtom } = useAtomPay();

  useEffect(() => {
    (async () => {
      try {
        const response = await mutate({
          method: "POST",
          body: JSON.stringify({
            programmeIds: user?.programme?._id,
            couponCode: couponCode,
          }),
          path: "registration/pay/generate-token",
        });
        if (response?.data?.error) throw new Error(response?.data?.error);
        setAmountCalculate(response?.data?.data?.data);
      } catch (error) {
        notify.error(
          error instanceof Error ? error?.message : "Something went wrong"
        );
        setInputText("");
        setCouponCode("");
      }
    })();
  }, [couponCode, user?.programme?._id]);

  const handlePayment = () => {
    try {
      if (user?.isPaymentDone) {
        notify.success("payment verified successfully");
        return setActiveStep?.((prev: number) => prev + 1);
      }

      if (!amountCalculate?.tokenData)
        throw new Error("Payment is not initialize yet!");
      OpenAtom(
        amountCalculate?.tokenData?.token,
        amountCalculate?.tokenData?.merchId,
        amountCalculate?.orderId,
        amountCalculate?.tokenData?.txnId
      );
      // notify.success("payment completed successfully");
      // setActiveStep?.(3);
    } catch (error) {
      notify.error(
        error instanceof Error ? error?.message : "Something went wrong"
      );
    }
  };

  return (
    <section className="w-full bg-white">
      <div className="w-full main-container ">
        <div className="md:bg-gray-100 mt-10 lg:mt-20 py-4 md:py-8">
          <div className="md:container md:mx-auto md:px-4">
            <h1 className="text-2xl font-semibold border-b mb-4">PAYMENT</h1>
            <div className="flex flex-col md:flex-row gap-4">
              <div className="md:w-3/4 bg-white rounded-lg shadow-md p-2 md:p-6 mb-4 flex-col flex">
                <h3 className="font-medium tracking-wide text-theme uppercase">
                  REVIEW YOUR PAYMENT DETAILS
                </h3>
                <div className="flex flex-col gap-4 p-2 md:p-4">
                  <h3 className="font-medium tracking-wide uppercase">
                    Personal Details
                  </h3>
                  <small className="tracking-wide text-xs md:text-sm">
                    <b>Name:</b> {user?.studentFirstName}{" "}
                    {user?.studentMiddleName} {user?.studentLastName}
                  </small>
                  <small className="tracking-wide text-xs md:text-sm">
                    <b>Email Id:</b> {user?.email}
                  </small>
                  <small className="tracking-wide text-xs md:text-sm">
                    <b>Phone Number:</b> {user?.studentPhoneNumber}
                  </small>
                </div>
                <div className="bg-white rounded-lg shadow-md p-2 md:p-6 md:mb-4">
                  <table className="w-full">
                    <thead>
                      <tr>
                        <th className="text-left text-sm md:text-base  font-semibold">
                          Order Details
                        </th>
                        <th className="text-left text-sm md:text-base font-semibold">
                          Price
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td className="py-4">
                          <div className="flex items-center">
                            <span className="text-sm md:text-base font-semibold">
                              Application Fee (1)
                            </span>
                          </div>
                        </td>

                        <td className="py-4text-sm md:text-base ">
                          INR {user?.programme?.programmeFee}
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
              <div className="md:w-1/4">
                <div className="bg-white rounded-lg shadow-md p-2 md:p-6">
                  <h2 className="text-lg font-semibold mb-4">Summary</h2>
                  <div className="flex justify-between mb-2">
                    <span className=" text-xs md:text-sm">Subtotal</span>
                    <span className="text-sm md:text-base">
                      {" "}
                      INR {user?.programme?.programmeFee}
                    </span>
                  </div>
                  <div className="flex justify-between mb-2">
                    <span className=" text-xs md:text-sm">
                      Payment Handling Charges
                    </span>
                    <span className="text-sm md:text-base">
                      INR {amountCalculate?.paymentHandlingCharge}
                    </span>
                  </div>
                  <div className="flex justify-between mb-2">
                    <span className=" text-xs md:text-sm">Taxes</span>
                    <span className="text-sm md:text-base">
                      INR {amountCalculate?.taxes}
                    </span>
                  </div>
                  {amountCalculate?.couponDiscount ? (
                    <div className="flex justify-between mb-2">
                      <span className=" text-xs md:text-sm">
                        Coupon Discount
                      </span>
                      <span className="text-sm md:text-base">
                        - INR {amountCalculate?.couponDiscount}
                      </span>
                    </div>
                  ) : null}

                  <hr className="my-2" />
                  <div className="flex justify-between mb-2">
                    <span className="font-semibold">Total</span>
                    <span className="font-semibold">
                      INR {amountCalculate?.totalPayableAmount}
                    </span>
                  </div>
                  <div className="flex justify-between gap-4 items-center mb-2">
                    <InputField
                      type="text"
                      size="small"
                      fullWidth
                      className="bg-white"
                      placeholder="Promo Code"
                      value={inputText}
                      onChange={(e) => setInputText(e.target?.value)}
                    />
                    <button
                      className="bg-theme text-white py-2 px-4 rounded-lg"
                      onClick={() => setCouponCode(inputText)}
                    >
                      Apply
                    </button>
                  </div>
                  <button
                    className="bg-theme text-white py-2 px-4 rounded-lg mt-4 w-full"
                    onClick={handlePayment}
                  >
                    Make Payment
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Payment;
