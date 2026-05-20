export function dayOfWeekToValue(dayOfWeek: string) {
  switch (dayOfWeek.toLowerCase()) {
    case "sunday":
      return "2023-09-24T06:15:14.598Z";
    case "monday":
      return "2023-09-25T06:15:14.598Z";
    case "tuesday":
      return "2023-09-26T06:15:14.598Z";
    case "wednesday":
      return "2023-09-27T06:15:14.598Z";
    case "thursday":
      return "2023-09-28T06:15:14.598Z";
    case "friday":
      return "2023-09-29T06:15:14.598Z";
    case "saturday":
      return "2023-09-30T06:15:14.598Z";
    default:
      return -1; // Invalid input
  }
}
