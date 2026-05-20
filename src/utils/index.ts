import { Options } from "@material-table/core";
import { ExportCsv, ExportPdf } from "@material-table/exporters";
import { BASE_URL } from "configs";
import { toast } from "react-toastify";
import JSZip from "jszip";

export const handleMyObject = (
  arg: any,
  key: string,
  label: string,
  value: string
) => {
  const data = arg;
  return {
    label: data?.name ? `${data?.name}` : `${data?.title}`,
    value: `${data?._id}`,
    key: `${data?._id}`,
  };
};

export const handleMyBatch = (
  arg: any,
  key: string,
  label: string,
  value: string
) => {
  const data = arg;

  return {
    label: `${data?.course?.title} ${data?.branch?.title} (${data?.session?.title})`,
    value: `${data?._id}`,
    key: `${data?._id}`,
  };
};
export const autoAddFormdata = (data: any) => {
  let formData = new FormData();
  for (const key in data) {
    if (typeof data[key] === "undefined") continue;
    if (typeof data[key] === "string" && data[key]?.trim()?.length <= 0)
      continue;
    formData.append(key, data[key]);
  }
  return handleValidFormData(formData);
};

export const padTo2Digits = (num: any) => {
  return String(num).padStart(2, "0");
};
export const getHoursAndMinutes = (date = new Date()) => {
  return padTo2Digits(date.getHours()) + ":" + padTo2Digits(date.getMinutes());
};
export const Permission = [
  {
    sl: 1,
    label: "Admission",
    value: "manageAdmission",
  },
  {
    sl: 2,
    label: "Students",
    value: "manageStudents",
  },
  {
    sl: 3,
    label: "Department",
    value: "manageDepartment",
  },
  {
    sl: 3,
    label: "Chairman",
    value: "manageDocument",
  },
  {
    sl: 4,
    label: "Staffs",
    value: "manageStaff",
  },
  {
    sl: 5,
    label: "Assignment",
    value: "manageAssignment",
  },
  {
    sl: 6,
    label: "Batch",
    value: "manageBatch",
  },
  {
    sl: 7,
    label: "Fees",
    value: "manageFees",
  },
  {
    sl: 8,
    label: "Finance",
    value: "manageFinance",
  },
  {
    sl: 9,
    label: "Library",
    value: "manageLibrary",
  },
  {
    sl: 10,
    label: "Inventory",
    value: "manageInventory",
  },
  {
    sl: "10AAII",
    label: "Marketing RP",
    value: "manageMarketingResource",
  },
  {
    sl: 11,
    label: "Transport",
    value: "manageTransport",
  },
  // {
  //   sl: 1,
  //   label: "Notice",
  //   value: "managePlacement",
  // },
  {
    sl: 12,
    label: "Placement Cell",
    value: "managePlacement",
  },
  {
    sl: 13,
    label: "Alumni",
    value: "manageAlumni",
  },
  {
    sl: 14,
    label: "Exam",
    value: "manageExam",
  },
  {
    sl: 15,
    label: "Feedback",
    value: "manageFeedback",
  },
  {
    sl: 25,
    label: "Naac",
    value: "manageNaac",
  },
  {
    sl: 35,
    label: "Event",
    value: "manageEvent",
  },
  {
    sl: 16,
    label: "Grievance",
    value: "manageGrievance",
  },
  {
    sl: 17,
    label: "Config",
    value: "manageConfig",
  },
];
export const Years = [
  ...Array.from(
    new Array(10),
    (val, index) => new Date().getFullYear() + index
  ),
  ...Array.from(
    new Array(10),
    (val, index) => new Date().getFullYear() - index
  ),
]
  ?.sort((a, b) => a - b)
  ?.map((item, index) => ({
    label: item,
    value: item,
    key: index,
  }));

export const Day = Array(31)
  ?.fill(0)
  ?.map((item, index) => ({
    label: index + 1,
    value: index + 1,
    key: index,
  }));
export const Month = Array.from({ length: 12 }, (item, i) => {
  return new Date(0, i).toLocaleString("en-US", { month: "short" });
}).map((item, index) => ({
  label: item,
  value: `${index}`,
  key: `${index}`,
}));

export const MoneyFormat = (money: number) =>
  new Intl.NumberFormat("en-IN", {
    currency: "INR",
    style: "currency",
  }).format(money);

export const FinancialYear = [
  {
    label: "2023",
    value: "2022 - 23",
    key: "4.1",
  },
  {
    label: "2024",
    value: "2024",
    key: "4.2",
  },
  {
    label: "2025",
    value: "2025",
    key: "4.21",
  },
  {
    label: "2026",
    value: "2026",
    key: "4.23",
  },
  {
    label: "2027",
    value: "2027",
    key: "4.255",
  },
  {
    label: "2028",
    value: "2028",
    key: "4.255x",
  },
  {
    label: "2029",
    value: "2029",
    key: "4.255fgd",
  },
];
export const MuiTblOptions = () => {
  const options: Options<any> = {
    headerStyle: {
      whiteSpace: "nowrap",
      backgroundColor: "rgb(238 242 255 / var(--tw-bg-opacity))",
      color: "#5B50A1",
      fontWeight: "bold",
      fontSize: "1rem",
      fontFamily: "inherit",
      border: "none",
    },

    rowStyle: {
      // backgroundColor: "#fff",
      color: "#5B50A1",
      fontWeight: "500",
      fontSize: "0.9rem",
      border: "none",
    },
    editCellStyle: {
      borderBottom: "none",
    },
    actionsColumnIndex: -1,
    addRowPosition: "first",
    pageSize: 5,
    detailPanelColumnAlignment: "right",
    exportAllData: true,
    headerSelectionProps: { color: "secondary" },
    selectionProps: () => ({
      color: "secondary",
    }),
    exportMenu: [
      // {
      //   label: "Export All Data In CSV",
      //   exportFunc: (cols: any, data: any) => ExportCsv(cols, data, "AllData"),
      // },
      {
        label: "Export All Data In PDF",
        exportFunc: (cols: any, data: any) => ExportPdf(cols, data, "AllData"),
      },
    ],
  };
  return options;
};
export const getLocalStorageItem = (key: any) => {
  return typeof window !== "undefined"
    ? localStorage.getItem(key) ?? null
    : null;
};

export const saveToLocalStorage = (key: any, value: any) => {
  if (typeof window !== "undefined") {
    localStorage.setItem(key, value);
  }
};

export const removeFromLocalStorage = (key: any) => {
  if (typeof window !== "undefined") {
    localStorage.removeItem(key);
  }
};

export const downloadFile = async ({
  url,
  method = "GET",
  body,
  type,
}: {
  url: string;
  method: "GET" | "POST";
  body?: BodyInit;
  type: "pdf" | "csv" | "excel";
}) => {
  try {
    let ACCESS_TOKEN = localStorage.getItem("ACCESS_TOKEN");

    const response = await fetch(BASE_URL + url, {
      method,
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${ACCESS_TOKEN}`,
      },
      body: body && JSON.stringify(body),
    });

    if (response?.status !== 200) throw new Error("Download failed.");

    //convert to blob
    const blob = await response.blob();

    const fileUrl = window.URL.createObjectURL(blob);

    if (type === "pdf") {
      window.open(fileUrl, "", "height=800")?.print();
    } else {
      window.location.assign(fileUrl);
    }

    window.URL.revokeObjectURL(fileUrl);

    notify.success("File downloaded successfully.");
  } catch (error) {
    if (error instanceof Error) {
      notify.error(error?.message);
      return;
    }
    notify.error("Download failed. Try again!");
  }
};
export const downloadZipFile = async (
  data: {
    url: string;
    name: string;
  }[]
) => {
  try {
    const zip = new JSZip();

    await Promise.all(
      data?.map(
        (item) =>
          new Promise(async (resolve, reject) => {
            try {
              // Fetch the image as a blob
              const response = await fetch(item?.url);
              const imageBlob = await response.blob();

              const fileExtension = item?.url?.split(".").at(-1);

              // Extract the filename from the URL (assuming it's the last part after '/')
              const filename =
                item?.name + "." + fileExtension ||
                item?.url?.substring(item?.url?.lastIndexOf("/") + 1);

              // Add the blob to the ZIP archive with the extracted filename
              zip.file(filename, imageBlob);
              resolve(true);
            } catch (error) {
              resolve(true);
            }
          })
      )
    );

    // Generate the ZIP file
    const zipBlob = await zip.generateAsync({ type: "blob" });

    // Create a download link and trigger the download
    const downloadLink = document.createElement("a");
    downloadLink.href = URL.createObjectURL(zipBlob);
    downloadLink.download = "data.zip";
    downloadLink.click();
  } catch (error) {
    if (error instanceof Error) {
      notify.error(error?.message);
      return;
    }
    notify.error("Download failed. Try again!");
  }
};

interface DATATYPE {
  naacFiles: { title: string; documentUrl: string }[];
  internalFolder: DATATYPE[];
  title: string;
}
export const downloadZipFileNestedArray = async (data: DATATYPE[]) => {
  try {
    const allUrlsData: { url: string; path: string }[] = [];

    const handleRecursion = (data: DATATYPE[], folder: string) => {
      data.forEach((item) => {
        if (item?.naacFiles?.length) {
          item?.naacFiles?.forEach((inner) => {
            allUrlsData?.push({
              path: `${folder}/${item?.title}/${inner?.title}`,
              url: inner?.documentUrl,
            });
          });
        }
        if (item?.internalFolder?.length) {
          handleRecursion(item?.internalFolder, `${folder}/${item?.title}`);
        }
      });
    };

    data?.forEach((item) => {
      if (item?.naacFiles?.length) {
        item?.naacFiles?.forEach((inner) => {
          allUrlsData?.push({
            path: `${item?.title}/${inner?.title}`,
            url: inner?.documentUrl,
          });
        });
      }

      if (item?.internalFolder?.length) {
        handleRecursion(item?.internalFolder, item?.title);
      }
    });

    const zip = new JSZip();

    await Promise.all(
      allUrlsData?.map(
        (item) =>
          new Promise(async (resolve, reject) => {
            try {
              // Fetch the image as a blob
              const response = await fetch(item?.url);
              const imageBlob = await response.blob();

              const fileExtension = item?.url?.split(".").at(-1);

              // Extract the filename from the URL (assuming it's the last part after '/')
              const filename =
                item?.path + "." + fileExtension ||
                item?.url?.substring(item?.url?.lastIndexOf("/") + 1);

              // Add the blob to the ZIP archive with the extracted filename
              zip.file(filename, imageBlob);
              resolve(true);
            } catch (error) {
              resolve(true);
            }
          })
      )
    );

    // Generate the ZIP file
    const zipBlob = await zip.generateAsync({ type: "blob" });

    // Create a download link and trigger the download
    const downloadLink = document.createElement("a");
    downloadLink.href = URL.createObjectURL(zipBlob);
    downloadLink.download = "data.zip";
    downloadLink.click();
  } catch (error) {
    if (error instanceof Error) {
      notify.error(error.message);
      return;
    }
    notify.error("Download failed. Try again!");
  }
};

export const notify = {
  success: (message: string) =>
    toast.success(message, {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "colored",
    }),
  error: (message: string) =>
    toast.error(message, {
      position: "top-right",
      autoClose: 6000,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "colored",
    }),
  info: (message: string) =>
    toast.info(message, {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "colored",
    }),
  warning: (message: string) =>
    toast.warning(message, {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "colored",
    }),
};

export const isProductionEnvironment = () => {
  return process.env.NEXT_PUBLIC_APP_TYPE === "PROD";
};

export type LoginApiResponse = {
  status?: string;
  message?: string;
  error?: string;
  data?: {
    ACCESS_TOKEN?: string;
    data?: {
      _id?: string;
      displayName?: string;
      email?: string;
      role?: string;
    };
  };
};

/** Parse `{ data, status }` returned from useFetch mutate after auth/login */
export const parseLoginApiResponse = (response?: {
  data?: LoginApiResponse;
  status?: number;
}) => {
  const api = response?.data;
  const accessToken = api?.data?.ACCESS_TOKEN;
  const user = api?.data?.data;
  const role = user?.role ? String(user.role).toUpperCase() : undefined;

  return {
    ok:
      response?.status === 200 &&
      api?.status === "SUCCESS" &&
      Boolean(accessToken) &&
      Boolean(user?._id) &&
      Boolean(role),
    accessToken,
    user,
    role,
    error: api?.error || (!accessToken ? "Login failed. Please try again." : ""),
  };
};

export const getDashboardPathByRole = (role?: string) => {
  switch (String(role || "").toUpperCase()) {
    case "SUPER_ADMIN":
    case "MANAGER":
      return "/panel/superadmin/dashboard";
    case "ADMIN":
    case "STAFF":
      return "/panel/admin/dashboard";
    case "TEACHER":
      return "/panel/teacher/dashboard";
    case "STUDENT":
    case "PARENT":
      return "/panel/student/dashboard";
    default:
      return null;
  }
};

export const handleValidFormData = (formData: FormData) => {
  const newFormData = new FormData();
  for (const [key, value] of formData.entries()) {
    // Check if the value is truthy before appending it to the new FormData object
    value && newFormData.append(key, value);
  }
  return newFormData;
};

export const COUNTRIES = [
  { code: "AD", label: "Andorra", phone: "376" },
  { code: "AE", label: "United Arab Emirates", phone: "971" },
  { code: "AF", label: "Afghanistan", phone: "93" },
  { code: "AG", label: "Antigua and Barbuda", phone: "1-268" },
  { code: "AI", label: "Anguilla", phone: "1-264" },
  { code: "AL", label: "Albania", phone: "355" },
  { code: "AM", label: "Armenia", phone: "374" },
  { code: "AO", label: "Angola", phone: "244" },
  { code: "AQ", label: "Antarctica", phone: "672" },
  { code: "AR", label: "Argentina", phone: "54" },
  { code: "AS", label: "American Samoa", phone: "1-684" },
  { code: "AT", label: "Austria", phone: "43" },
  { code: "AU", label: "Australia", phone: "61", suggested: true },
  { code: "AW", label: "Aruba", phone: "297" },
  { code: "AX", label: "Alland Islands", phone: "358" },
  { code: "AZ", label: "Azerbaijan", phone: "994" },
  { code: "BA", label: "Bosnia and Herzegovina", phone: "387" },
  { code: "BB", label: "Barbados", phone: "1-246" },
  { code: "BD", label: "Bangladesh", phone: "880" },
  { code: "BE", label: "Belgium", phone: "32" },
  { code: "BF", label: "Burkina Faso", phone: "226" },
  { code: "BG", label: "Bulgaria", phone: "359" },
  { code: "BH", label: "Bahrain", phone: "973" },
  { code: "BI", label: "Burundi", phone: "257" },
  { code: "BJ", label: "Benin", phone: "229" },
  { code: "BL", label: "Saint Barthelemy", phone: "590" },
  { code: "BM", label: "Bermuda", phone: "1-441" },
  { code: "BN", label: "Brunei Darussalam", phone: "673" },
  { code: "BO", label: "Bolivia", phone: "591" },
  { code: "BR", label: "Brazil", phone: "55" },
  { code: "BS", label: "Bahamas", phone: "1-242" },
  { code: "BT", label: "Bhutan", phone: "975" },
  { code: "BV", label: "Bouvet Island", phone: "47" },
  { code: "BW", label: "Botswana", phone: "267" },
  { code: "BY", label: "Belarus", phone: "375" },
  { code: "BZ", label: "Belize", phone: "501" },
  { code: "CA", label: "Canada", phone: "1", suggested: true },
  { code: "CC", label: "Cocos (Keeling) Islands", phone: "61" },
  { code: "CD", label: "Congo, Democratic Republic of the", phone: "243" },
  { code: "CF", label: "Central African Republic", phone: "236" },
  { code: "CG", label: "Congo, Republic of the", phone: "242" },
  { code: "CH", label: "Switzerland", phone: "41" },
  { code: "CI", label: "Cote d'Ivoire", phone: "225" },
  { code: "CK", label: "Cook Islands", phone: "682" },
  { code: "CL", label: "Chile", phone: "56" },
  { code: "CM", label: "Cameroon", phone: "237" },
  { code: "CN", label: "China", phone: "86" },
  { code: "CO", label: "Colombia", phone: "57" },
  { code: "CR", label: "Costa Rica", phone: "506" },
  { code: "CU", label: "Cuba", phone: "53" },
  { code: "CV", label: "Cape Verde", phone: "238" },
  { code: "CW", label: "Curacao", phone: "599" },
  { code: "CX", label: "Christmas Island", phone: "61" },
  { code: "CY", label: "Cyprus", phone: "357" },
  { code: "CZ", label: "Czech Republic", phone: "420" },
  { code: "DE", label: "Germany", phone: "49", suggested: true },
  { code: "DJ", label: "Djibouti", phone: "253" },
  { code: "DK", label: "Denmark", phone: "45" },
  { code: "DM", label: "Dominica", phone: "1-767" },
  { code: "DO", label: "Dominican Republic", phone: "1-809" },
  { code: "DZ", label: "Algeria", phone: "213" },
  { code: "EC", label: "Ecuador", phone: "593" },
  { code: "EE", label: "Estonia", phone: "372" },
  { code: "EG", label: "Egypt", phone: "20" },
  { code: "EH", label: "Western Sahara", phone: "212" },
  { code: "ER", label: "Eritrea", phone: "291" },
  { code: "ES", label: "Spain", phone: "34" },
  { code: "ET", label: "Ethiopia", phone: "251" },
  { code: "FI", label: "Finland", phone: "358" },
  { code: "FJ", label: "Fiji", phone: "679" },
  { code: "FK", label: "Falkland Islands (Malvinas)", phone: "500" },
  { code: "FM", label: "Micronesia, Federated States of", phone: "691" },
  { code: "FO", label: "Faroe Islands", phone: "298" },
  { code: "FR", label: "France", phone: "33", suggested: true },
  { code: "GA", label: "Gabon", phone: "241" },
  { code: "GB", label: "United Kingdom", phone: "44" },
  { code: "GD", label: "Grenada", phone: "1-473" },
  { code: "GE", label: "Georgia", phone: "995" },
  { code: "GF", label: "French Guiana", phone: "594" },
  { code: "GG", label: "Guernsey", phone: "44" },
  { code: "GH", label: "Ghana", phone: "233" },
  { code: "GI", label: "Gibraltar", phone: "350" },
  { code: "GL", label: "Greenland", phone: "299" },
  { code: "GM", label: "Gambia", phone: "220" },
  { code: "GN", label: "Guinea", phone: "224" },
  { code: "GP", label: "Guadeloupe", phone: "590" },
  { code: "GQ", label: "Equatorial Guinea", phone: "240" },
  { code: "GR", label: "Greece", phone: "30" },
  {
    code: "GS",
    label: "South Georgia and the South Sandwich Islands",
    phone: "500",
  },
  { code: "GT", label: "Guatemala", phone: "502" },
  { code: "GU", label: "Guam", phone: "1-671" },
  { code: "GW", label: "Guinea-Bissau", phone: "245" },
  { code: "GY", label: "Guyana", phone: "592" },
  { code: "HK", label: "Hong Kong", phone: "852" },
  { code: "HM", label: "Heard Island and McDonald Islands", phone: "672" },
  { code: "HN", label: "Honduras", phone: "504" },
  { code: "HR", label: "Croatia", phone: "385" },
  { code: "HT", label: "Haiti", phone: "509" },
  { code: "HU", label: "Hungary", phone: "36" },
  { code: "ID", label: "Indonesia", phone: "62" },
  { code: "IE", label: "Ireland", phone: "353" },
  { code: "IL", label: "Israel", phone: "972" },
  { code: "IM", label: "Isle of Man", phone: "44" },
  { code: "IN", label: "India", phone: "91" },
  { code: "IO", label: "British Indian Ocean Territory", phone: "246" },
  { code: "IQ", label: "Iraq", phone: "964" },
  { code: "IR", label: "Iran, Islamic Republic of", phone: "98" },
  { code: "IS", label: "Iceland", phone: "354" },
  { code: "IT", label: "Italy", phone: "39" },
  { code: "JE", label: "Jersey", phone: "44" },
  { code: "JM", label: "Jamaica", phone: "1-876" },
  { code: "JO", label: "Jordan", phone: "962" },
  { code: "JP", label: "Japan", phone: "81", suggested: true },
  { code: "KE", label: "Kenya", phone: "254" },
  { code: "KG", label: "Kyrgyzstan", phone: "996" },
  { code: "KH", label: "Cambodia", phone: "855" },
  { code: "KI", label: "Kiribati", phone: "686" },
  { code: "KM", label: "Comoros", phone: "269" },
  { code: "KN", label: "Saint Kitts and Nevis", phone: "1-869" },
  { code: "KP", label: "Korea, Democratic People's Republic of", phone: "850" },
  { code: "KR", label: "Korea, Republic of", phone: "82" },
  { code: "KW", label: "Kuwait", phone: "965" },
  { code: "KY", label: "Cayman Islands", phone: "1-345" },
  { code: "KZ", label: "Kazakhstan", phone: "7" },
  { code: "LA", label: "Lao People's Democratic Republic", phone: "856" },
  { code: "LB", label: "Lebanon", phone: "961" },
  { code: "LC", label: "Saint Lucia", phone: "1-758" },
  { code: "LI", label: "Liechtenstein", phone: "423" },
  { code: "LK", label: "Sri Lanka", phone: "94" },
  { code: "LR", label: "Liberia", phone: "231" },
  { code: "LS", label: "Lesotho", phone: "266" },
  { code: "LT", label: "Lithuania", phone: "370" },
  { code: "LU", label: "Luxembourg", phone: "352" },
  { code: "LV", label: "Latvia", phone: "371" },
  { code: "LY", label: "Libya", phone: "218" },
  { code: "MA", label: "Morocco", phone: "212" },
  { code: "MC", label: "Monaco", phone: "377" },
  { code: "MD", label: "Moldova, Republic of", phone: "373" },
  { code: "ME", label: "Montenegro", phone: "382" },
  { code: "MF", label: "Saint Martin (French part)", phone: "590" },
  { code: "MG", label: "Madagascar", phone: "261" },
  { code: "MH", label: "Marshall Islands", phone: "692" },
  {
    code: "MK",
    label: "Macedonia, the Former Yugoslav Republic of",
    phone: "389",
  },
  { code: "ML", label: "Mali", phone: "223" },
  { code: "MM", label: "Myanmar", phone: "95" },
  { code: "MN", label: "Mongolia", phone: "976" },
  { code: "MO", label: "Macao", phone: "853" },
  { code: "MP", label: "Northern Mariana Islands", phone: "1-670" },
  { code: "MQ", label: "Martinique", phone: "596" },
  { code: "MR", label: "Mauritania", phone: "222" },
  { code: "MS", label: "Montserrat", phone: "1-664" },
  { code: "MT", label: "Malta", phone: "356" },
  { code: "MU", label: "Mauritius", phone: "230" },
  { code: "MV", label: "Maldives", phone: "960" },
  { code: "MW", label: "Malawi", phone: "265" },
  { code: "MX", label: "Mexico", phone: "52" },
  { code: "MY", label: "Malaysia", phone: "60" },
  { code: "MZ", label: "Mozambique", phone: "258" },
  { code: "NA", label: "Namibia", phone: "264" },
  { code: "NC", label: "New Caledonia", phone: "687" },
  { code: "NE", label: "Niger", phone: "227" },
  { code: "NF", label: "Norfolk Island", phone: "672" },
  { code: "NG", label: "Nigeria", phone: "234" },
  { code: "NI", label: "Nicaragua", phone: "505" },
  { code: "NL", label: "Netherlands", phone: "31" },
  { code: "NO", label: "Norway", phone: "47" },
  { code: "NP", label: "Nepal", phone: "977" },
  { code: "NR", label: "Nauru", phone: "674" },
  { code: "NU", label: "Niue", phone: "683" },
  { code: "NZ", label: "New Zealand", phone: "64" },
  { code: "OM", label: "Oman", phone: "968" },
  { code: "PA", label: "Panama", phone: "507" },
  { code: "PE", label: "Peru", phone: "51" },
  { code: "PF", label: "French Polynesia", phone: "689" },
  { code: "PG", label: "Papua New Guinea", phone: "675" },
  { code: "PH", label: "Philippines", phone: "63" },
  { code: "PK", label: "Pakistan", phone: "92" },
  { code: "PL", label: "Poland", phone: "48" },
  { code: "PM", label: "Saint Pierre and Miquelon", phone: "508" },
  { code: "PN", label: "Pitcairn", phone: "870" },
  { code: "PR", label: "Puerto Rico", phone: "1" },
  { code: "PS", label: "Palestine, State of", phone: "970" },
  { code: "PT", label: "Portugal", phone: "351" },
  { code: "PW", label: "Palau", phone: "680" },
  { code: "PY", label: "Paraguay", phone: "595" },
  { code: "QA", label: "Qatar", phone: "974" },
  { code: "RE", label: "Reunion", phone: "262" },
  { code: "RO", label: "Romania", phone: "40" },
  { code: "RS", label: "Serbia", phone: "381" },
  { code: "RU", label: "Russia", phone: "7" },
  { code: "RW", label: "Rwanda", phone: "250" },
  { code: "SA", label: "Saudi Arabia", phone: "966" },
  { code: "SB", label: "Solomon Islands", phone: "677" },
  { code: "SC", label: "Seychelles", phone: "248" },
  { code: "SD", label: "Sudan", phone: "249" },
  { code: "SE", label: "Sweden", phone: "46" },
  { code: "SG", label: "Singapore", phone: "65" },
  { code: "SH", label: "Saint Helena", phone: "290" },
  { code: "SI", label: "Slovenia", phone: "386" },
  { code: "SJ", label: "Svalbard and Jan Mayen", phone: "47" },
  { code: "SK", label: "Slovakia", phone: "421" },
  { code: "SL", label: "Sierra Leone", phone: "232" },
  { code: "SM", label: "San Marino", phone: "378" },
  { code: "SN", label: "Senegal", phone: "221" },
  { code: "SO", label: "Somalia", phone: "252" },
  { code: "SR", label: "Suriname", phone: "597" },
  { code: "SS", label: "South Sudan", phone: "211" },
  { code: "ST", label: "Sao Tome and Principe", phone: "239" },
  { code: "SV", label: "El Salvador", phone: "503" },
  { code: "SX", label: "Sint Maarten (Dutch part)", phone: "1-721" },
  { code: "SY", label: "Syrian Arab Republic", phone: "963" },
  { code: "SZ", label: "Swaziland", phone: "268" },
  { code: "TC", label: "Turks and Caicos Islands", phone: "1-649" },
  { code: "TD", label: "Chad", phone: "235" },
  { code: "TF", label: "French Southern Territories", phone: "262" },
  { code: "TG", label: "Togo", phone: "228" },
  { code: "TH", label: "Thailand", phone: "66" },
  { code: "TJ", label: "Tajikistan", phone: "992" },
  { code: "TK", label: "Tokelau", phone: "690" },
  { code: "TL", label: "Timor-Leste", phone: "670" },
  { code: "TM", label: "Turkmenistan", phone: "993" },
  { code: "TN", label: "Tunisia", phone: "216" },
  { code: "TO", label: "Tonga", phone: "676" },
  { code: "TR", label: "Turkey", phone: "90" },
  { code: "TT", label: "Trinidad and Tobago", phone: "1-868" },
  { code: "TV", label: "Tuvalu", phone: "688" },
  { code: "TW", label: "Taiwan, Province of China", phone: "886" },
  { code: "TZ", label: "United Republic of Tanzania", phone: "255" },
  { code: "UA", label: "Ukraine", phone: "380" },
  { code: "UG", label: "Uganda", phone: "256" },
  { code: "US", label: "United States", phone: "1", suggested: true },
  { code: "UY", label: "Uruguay", phone: "598" },
  { code: "UZ", label: "Uzbekistan", phone: "998" },
  { code: "VA", label: "Holy See (Vatican City State)", phone: "379" },
  { code: "VC", label: "Saint Vincent and the Grenadines", phone: "1-784" },
  { code: "VE", label: "Venezuela", phone: "58" },
  { code: "VG", label: "British Virgin Islands", phone: "1-284" },
  { code: "VI", label: "US Virgin Islands", phone: "1-340" },
  { code: "VN", label: "Vietnam", phone: "84" },
  { code: "VU", label: "Vanuatu", phone: "678" },
  { code: "WF", label: "Wallis and Futuna", phone: "681" },
  { code: "WS", label: "Samoa", phone: "685" },
  { code: "XK", label: "Kosovo", phone: "383" },
  { code: "YE", label: "Yemen", phone: "967" },
  { code: "YT", label: "Mayotte", phone: "262" },
  { code: "ZA", label: "South Africa", phone: "27" },
  { code: "ZM", label: "Zambia", phone: "260" },
  { code: "ZW", label: "Zimbabwe", phone: "263" },
];

export const INDIAN_BOARDS = [
  {
    key: "1",
    label: "Central Board of Secondary Education (CBSE)",
    value: "Central Board of Secondary Education (CBSE)",
  },
  {
    key: "2",
    label: "Indian Certificate of Secondary Education (ICSE)",
    value: "Indian Certificate of Secondary Education (ICSE)",
  },
  {
    key: "32",
    label: "International Baccalaureate (IB)",
    value: "International Baccalaureate (IB)",
  },
  {
    key: "33",
    label: "National Institute of Open Schooling (NIOS)",
    value: "National Institute of Open Schooling (NIOS)",
  },
  {
    key: "34",
    label: "Cambridge Assessment International Education (CAIE)",
    value: "Cambridge Assessment International Education (CAIE)",
  },
  {
    key: "3",
    label: "Andhra Pradesh Board of Secondary Education",
    value: "Andhra Pradesh Board of Secondary Education",
  },
  {
    key: "4",
    label: "Arunachal Pradesh Directorate of School Education",
    value: "Arunachal Pradesh Directorate of School Education",
  },
  {
    key: "5",
    label: "Assam Higher Secondary Education Council",
    value: "Assam Higher Secondary Education Council",
  },
  {
    key: "6",
    label: "Bihar School Examination Board",
    value: "Bihar School Examination Board",
  },
  {
    key: "7",
    label: "Chhattisgarh Board of Secondary Education",
    value: "Chhattisgarh Board of Secondary Education",
  },
  {
    key: "8",
    label: "Goa Board of Secondary and Higher Secondary Education",
    value: "Goa Board of Secondary and Higher Secondary Education",
  },
  {
    key: "9",
    label: "Gujarat Secondary and Higher Secondary Education Board",
    value: "Gujarat Secondary and Higher Secondary Education Board",
  },
  {
    key: "10",
    label: "Haryana Board of School Education",
    value: "Haryana Board of School Education",
  },
  {
    key: "11",
    label: "Himachal Pradesh Board of School Education",
    value: "Himachal Pradesh Board of School Education",
  },
  {
    key: "12",
    label: "Jammu and Kashmir State Board of School Education",
    value: "Jammu and Kashmir State Board of School Education",
  },
  {
    key: "13",
    label: "Jharkhand Academic Council",
    value: "Jharkhand Academic Council",
  },
  {
    key: "14",
    label: "Karnataka Secondary Education Examination Board",
    value: "Karnataka Secondary Education Examination Board",
  },
  {
    key: "15",
    label: "Kerala Board of Public Examinations",
    value: "Kerala Board of Public Examinations",
  },
  {
    key: "16",
    label: "Madhya Pradesh Board of Secondary Education",
    value: "Madhya Pradesh Board of Secondary Education",
  },
  {
    key: "17",
    label:
      "Maharashtra State Board of Secondary and Higher Secondary Education",
    value:
      "Maharashtra State Board of Secondary and Higher Secondary Education",
  },
  {
    key: "18",
    label: "Manipur Council of Higher Secondary Education",
    value: "Manipur Council of Higher Secondary Education",
  },
  {
    key: "19",
    label: "Meghalaya Board of School Education",
    value: "Meghalaya Board of School Education",
  },
  {
    key: "20",
    label: "Mizoram Board of School Education",
    value: "Mizoram Board of School Education",
  },
  {
    key: "21",
    label: "Nagaland Board of School Education",
    value: "Nagaland Board of School Education",
  },
  {
    key: "22",
    label: "Odisha Board of Secondary Education",
    value: "Odisha Board of Secondary Education",
  },
  {
    key: "23",
    label: "Punjab School Education Board",
    value: "Punjab School Education Board",
  },
  {
    key: "24",
    label: "Rajasthan Board of Secondary Education",
    value: "Rajasthan Board of Secondary Education",
  },
  {
    key: "25",
    label: "Sikkim Board of Secondary Education",
    value: "Sikkim Board of Secondary Education",
  },
  {
    key: "26",
    label: "Tamil Nadu State Board of School Examination",
    value: "Tamil Nadu State Board of School Examination",
  },
  {
    key: "27",
    label: "Telangana State Board of Intermediate Education",
    value: "Telangana State Board of Intermediate Education",
  },
  {
    key: "28",
    label: "Tripura Board of Secondary Education",
    value: "Tripura Board of Secondary Education",
  },
  {
    key: "29",
    label: "Uttar Pradesh Madhyamik Shiksha Parishad",
    value: "Uttar Pradesh Madhyamik Shiksha Parishad",
  },
  {
    key: "30",
    label: "Uttarakhand Board of School Education",
    value: "Uttarakhand Board of School Education",
  },
  {
    key: "35",
    label: "West Bengal Board of Secondary Education",
    value: "West Bengal Board of Secondary Education",
  },
];
