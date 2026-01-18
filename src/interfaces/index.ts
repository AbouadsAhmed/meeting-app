import { DocumentData } from "firebase/firestore";
import { LucideIcon } from "lucide-react";

export interface Imenu {
  id: number;
  name: string;
  path: string;
  icon: LucideIcon;
}
export interface Iprogram {
  name: string;
  icon: string;
}
export interface FormValue {
  program: string;
  meeting: string;
  duration: number;
  programUrl: string;
}
export interface IMeetingEvent {
  program: string;
  meeting: string;
  duration: number;
  programUrl: string;
  createdBy: string;
  id: string;
  meetingId: DocumentData;
}
export interface IDays {
  day: "sunday" | "monday" | "tuesday" | "wednesday" | "thursday" | "friday";
}
export interface Meeting {
  id: string;
  meetingEmail: string;
  meetingName: string;
  formatDate: number; // timestamp
  formatTime: string;
  note?: string;
}
