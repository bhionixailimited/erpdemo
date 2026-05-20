enum Event {
  CULTURAL,
  SOCIAL,
  SPORT,
  ACADEMIC,
}

type GuestType = {
  _id: ObjectId;
  name: string;
  position: string;
  phoneNumber: string;
};

type EventDocType = {
  _id: ObjectId;
  title: string;
  url: string;
  path: string;
};

export interface EventType {
    _id:string;
  title: string;
  description: string;
  eventType: Event;
  guests: GuestType[];
  venue: string;
  eventDate: date;
  docs: EventDocType[];
  instituteId: ObjectId;
}
