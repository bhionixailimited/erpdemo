import dayjs from "dayjs";
import { useSWRFetch } from "hooks";
import React, { useRef } from "react";
import { useReactToPrint } from "react-to-print";

type dataType = {
  data: {
    logoUrl: string;
  };
};
const InvoiceComponent = ({ orderInfo }: any) => {
  const { data, isValidating } = useSWRFetch<dataType>(`logo`);
  const componentRef = useRef(null);
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });
  console.log(orderInfo);
  return (
    <div className="container-html" id="print" ref={componentRef}>
      <table className="table_one table-html">
        <tr className="tr_one">
          <td id="td_1" style={{ backgroundColor: "white" }}>
            <img src={data?.data?.logoUrl} alt="" className="img_one" />
          </td>
          <td id="td_2">
            <div className="invoiceIdWarper flex flex-row justify-between gap-5">
              <div className="flex flex-col ">
                <b>INVOICE NO : {orderInfo?._id}</b>
                <b>
                  PURSCHASED DATE :{" "}
                  {dayjs(orderInfo?.createdAt).format("DD/MM/YYYY")}
                </b>
                <b>CONSUMER NAME : {orderInfo?.consumer?.displayName}</b>
                <b>ORDER STATUS : {orderInfo?.orderStatus}</b>
              </div>
              <div className="py-2">
                <div
                  className="h-16 w-20 cursor-pointer "
                  onClick={handlePrint}
                >
                  <img
                    src="https://t4.ftcdn.net/jpg/00/87/29/55/240_F_87295520_jbRODCsNofi1EILt9ZbjHhe8jKEoSIm2.jpg"
                    alt=""
                  />
                </div>
              </div>
            </div>
          </td>
        </tr>
        <tr>
          <td colSpan={2} id="td_3">
            <p>.</p>
          </td>
        </tr>
        {/* Add more rows as needed */}
      </table>
      <table className="table_two">
        <tr className="heading">
          <th id="td-1">
            <b>Product name</b>
          </th>
          <th className="description" id="td-2">
            {/* <b>Description</b> */}
          </th>
          <th id="td-3">Price</th>
          <th id="td-4">Quantity</th>
          <th id="td-5">Total</th>
        </tr>
        {/* Render product items */}

        <tr className="bg-gray-400 ">
          <th id="">
            <p className="pl-8">{orderInfo?.product?.title}</p>
          </th>
          <th id="">{/* <p>{orderInfo?.product?.description}</p> */}</th>

          <th id="">
            <p className="text-center">
              {orderInfo?.product?.price ? `₹${orderInfo?.product?.price}` : 0}
              .00
            </p>
          </th>
          <th id="">
            <p className="text-center">
              {orderInfo?.issuedQuantity ? orderInfo?.issuedQuantity : 0}
            </p>
          </th>
          <th id="">
            <p className="text-end pr-2">
              ₹
              {Number(
                orderInfo?.product?.price ? orderInfo?.product?.price : 0
              ) *
                Number(
                  orderInfo?.issuedQuantity ? orderInfo?.issuedQuantity : 0
                )}
              .00
            </p>
          </th>
        </tr>

        {/* --------------hidden -content to make gap-------------------------- */}

        <tr className="  w-full h-4">
          <th id="">
            <p className="hidden"></p>
          </th>
          <th id="">
            <p></p>
          </th>

          <th id="">
            <p className="text-center hidden"></p>
          </th>
          <th id="">
            <p className="text-center hidden"></p>
          </th>
          <th id="">
            <p className="text-end pr-2 hidden"></p>
          </th>
        </tr>
        <tr className="  w-full h-4">
          <th id="">
            <p className="hidden"></p>
          </th>
          <th id="">
            <p></p>
          </th>

          <th id="">
            <p className="text-center hidden"></p>
          </th>
          <th id="">
            <p className="text-center hidden"></p>
          </th>
          <th id="">
            <p className="text-end pr-2 hidden"></p>
          </th>
        </tr>
        <tr className="  w-full h-4">
          <th id="">
            <p className="hidden"></p>
          </th>
          <th id="">
            <p></p>
          </th>

          <th id="">
            <p className="text-center hidden"></p>
          </th>
          <th id="">
            <p className="text-center hidden"></p>
          </th>
          <th id="">
            <p className="text-end pr-2 hidden"></p>
          </th>
        </tr>
        <tr className="  w-full h-4">
          <th id="">
            <p className="hidden"></p>
          </th>
          <th id="">
            <p></p>
          </th>

          <th id="">
            <p className="text-center hidden"></p>
          </th>
          <th id="">
            <p className="text-center hidden"></p>
          </th>
          <th id="">
            <p className="text-end pr-2 hidden"></p>
          </th>
        </tr>
        <tr className="  w-full h-4">
          <th id="">
            <p className="hidden"></p>
          </th>
          <th id="">
            <p></p>
          </th>

          <th id="">
            <p className="text-center hidden"></p>
          </th>
          <th id="">
            <p className="text-center hidden"></p>
          </th>
          <th id="">
            <p className="text-end pr-2 hidden"></p>
          </th>
        </tr>
        <tr className="  w-full h-4">
          <th id="">
            <p className="hidden"></p>
          </th>
          <th id="">
            <p></p>
          </th>

          <th id="">
            <p className="text-center hidden"></p>
          </th>
          <th id="">
            <p className="text-center hidden"></p>
          </th>
          <th id="">
            <p className="text-end pr-2 hidden"></p>
          </th>
        </tr>
        <tr className="  w-full h-4">
          <th id="">
            <p className="hidden"></p>
          </th>
          <th id="">
            <p></p>
          </th>

          <th id="">
            <p className="text-center hidden"></p>
          </th>
          <th id="">
            <p className="text-center hidden"></p>
          </th>
          <th id="">
            <p className="text-end pr-2 hidden"></p>
          </th>
        </tr>
        <tr className="  w-full h-4">
          <th id="">
            <p className="hidden"></p>
          </th>
          <th id="">
            <p></p>
          </th>

          <th id="">
            <p className="text-center hidden"></p>
          </th>
          <th id="">
            <p className="text-center hidden"></p>
          </th>
          <th id="">
            <p className="text-end pr-2 hidden"></p>
          </th>
        </tr>
        <tr className="  w-full h-4">
          <th id="">
            <p className="hidden"></p>
          </th>
          <th id="">
            <p></p>
          </th>

          <th id="">
            <p className="text-center hidden"></p>
          </th>
          <th id="">
            <p className="text-center hidden"></p>
          </th>
          <th id="">
            <p className="text-end pr-2 hidden"></p>
          </th>
        </tr>
        <tr className="  w-full h-4">
          <th id="">
            <p className="hidden"></p>
          </th>
          <th id="">
            <p></p>
          </th>

          <th id="">
            <p className="text-center hidden"></p>
          </th>
          <th id="">
            <p className="text-center hidden"></p>
          </th>
          <th id="">
            <p className="text-end pr-2 hidden"></p>
          </th>
        </tr>

        {/* Add more rows for accessory, service, etc. */}
      </table>
      <table className="table_three finalCalc bg-gray-400">
        {/* Display coupon discount if available */}

        {/* Display total */}
        <tr className="border-y border-black">
          <th className="table_head headId"></th>
          <th className="table_head">
            <h4 className="">Total </h4>
          </th>
          <th className="">
            <h4 className="text-center pr-2">
              ₹
              {Number(
                orderInfo?.product?.price ? orderInfo?.product?.price : 0
              ) *
                Number(
                  orderInfo?.issuedQuantity ? orderInfo?.issuedQuantity : 0
                )}
              .00
            </h4>
          </th>
        </tr>
      </table>

      <table style={{ width: "100%", textAlign: "center" }} className="mt-10">
        <tr>
          <td style={{ width: "30%" }}>
            <hr style={{ backgroundColor: "black" }} />
          </td>
          <td style={{ border: "1px solid black", padding: "5px" }}>
            Thank You
          </td>
          <td style={{ width: "30%" }}>
            <hr style={{ backgroundColor: "black" }} />
          </td>
        </tr>
      </table>

      <table className="mt-10">
        <tr>
          <p className="text-xs">*This is computer generated Invoice.</p>
        </tr>
      </table>
    </div>
  );
};

export default InvoiceComponent;
