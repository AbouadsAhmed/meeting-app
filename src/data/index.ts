import { IDays, Imenu, Iprogram } from "@/interfaces";
import { CalendarRange, Presentation, TimerIcon } from "lucide-react";

export const menu: Imenu[] = [
  {
    id: 1,
    name: "Meeting Type",
    path: "/dashboard/meeting-type",
    icon: Presentation,
  },
  {
    id: 2,
    name: "Schedule Meeting",
    icon: CalendarRange,
    path: "/dashboard/schedule-meeting",
  },
  {
    id: 3,
    name: "Time And Date",
    path: "/dashboard/availabillity",
    icon: TimerIcon,
  },
];
export const programs: Iprogram[] = [
  {
    name: "meet",
    icon: "/meet.png",
  },
  {
    name: "phone",
    icon: "/app.png",
  },
  {
    name: "zoom",
    icon: "/business.png",
  },
];
export const days: IDays[] = [
  {
    day: "sunday",
  },

  {
    day: "monday",
  },

  {
    day: "tuesday",
  },

  {
    day: "wednesday",
  },

  {
    day: "thursday",
  },

  {
    day: "friday",
  },
];
