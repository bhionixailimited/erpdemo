export default interface AppUpdateType {
  deviceType: "ANDROID" | "IOS";
  message: string;
  version: string;
  title: string;
  isDismissible: boolean;
}
