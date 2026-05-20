// import DepartmentType from "./department";

// interface Document {
//   title: string;
//   url: string;
//   _id: string;
// }


interface AppointmentType{
 _id: string;
 name: string;
  phoneNumber: string;
  whomToMeet: string;
  reason: string;
  timeOfAppointment: date;
  passType: "InventoryGatePass" | "AdmissionGatePass" | "Normal";
  instituteId: ObjectId;
  }
  export default AppointmentType