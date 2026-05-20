import { Avatar } from "@mui/material";
import { useSWRFetch } from "hooks";
import { useRouter } from "next/router";
import React from "react";

type dataType = {
  data: any;
};
const AttachedDocumentCard = () => {
  const router = useRouter();
  const { data, isValidating } = useSWRFetch<dataType>(
    `registration/admin?registrationId=${router?.query?.registerID}`
  );

  const data1 = [
    {
      id: 1,
      imgDoc: data?.data[0]?.graduationMarkSheetUrl,
      imgName: "Graduation MarkSheet",
    },
    {
      id: 2,
      imgDoc: data?.data[0]?.aadharCardUrl,
      imgName: "Aadhar Card",
    },
    {
      id: 3,
      imgDoc: data?.data[0]?.parentsImageUrl,
      imgName: "Parents Image",
    },
    {
      id: 4,
      imgDoc: data?.data[0]?.pgResultUrl,
      imgName: "PG Result",
    },
    {
      id: 5,
      imgDoc: data?.data[0]?.parentsSignatureUrl,
      imgName: "Parents Signature",
    },
    {
      id: 6,
      imgDoc: data?.data[0]?.passportSizePhotoUrl,
      imgName: "Passport Size Photo",
    },
    {
      id: 7,
      imgDoc: data?.data[0]?.signatureUrl,
      imgName: "Signature",
    },
    {
      id: 8,
      imgDoc: data?.data[0]?.xiithMarkSheetUrl,
      imgName: "xiith MarkSheet",
    },
    {
      id: 9,
      imgDoc: data?.data[0]?.xthMarkSheetUrl,
      imgName: "xth MarkSheet",
    },
    // {
    //   id: 10,
    //   imgDoc: data?.data[0]?.graduationMarkSheetUrl,
    //   imgName: "Graduation MarkSheet",
    // },
  ];
  const data2 = [
    {
      id: 1,
      imgDoc: data?.data[0]?.graduationMarkSheetUrl,
      imgName: "Entrance Exam Result 1",
    },
    {
      id: 2,
      imgDoc: data?.data[0]?.aadharCardUrl,
      imgName: "Entrance Exam Result 2",
    },
    {
      id: 3,
      imgDoc: data?.data[0]?.parentsImageUrl,
      imgName: "Entrance Exam Result 3",
    },
  ];
  return (
    <section className="grid 2xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-3">
      {data1?.map((item, index: number) => (
        <div
          key={item?.id}
          className=" w-full scale-100 hover:scale-105 duration-300 ease-in-out relative group  overflow-hidden  shadow-md  bg-white rounded-xl"
        >
          <div className="flex justify-center items-center  h-full">
            <div className={`flex flex-col gap-1 md:gap-2 py-2 w-full `}>
              <div className=" flex justify-center items-center  px-2 rounded-sm mt-2">
                <img src={item?.imgDoc} className="h-40 w-40 object-contain" />
              </div>
              <div className="text-Black flex flex-col text-center gap-1">
                <h2 className=" text-lg font-bold mt-2 ">{item?.imgName}</h2>
              </div>
            </div>
          </div>
        </div>
      ))}
      {data2?.map((item, index: number) => (
        <div
          key={item?.id}
          className=" w-full scale-100 hover:scale-105 duration-300 ease-in-out relative group  overflow-hidden  shadow-md  bg-white rounded-xl"
        >
          <div className="flex justify-center items-center  h-full">
            <div className={`flex flex-col gap-1 md:gap-2 py-2 w-full `}>
              <div className=" flex justify-center items-center  px-2 rounded-sm mt-2">
                <img src={item?.imgDoc} className="h-40 w-40 object-contain" />
              </div>
              <div className="text-Black flex flex-col text-center gap-1">
                <h2 className=" text-lg font-bold mt-2 ">{item?.imgName}</h2>
              </div>
            </div>
          </div>
        </div>
      ))}
    </section>
  );
};

export default AttachedDocumentCard;
