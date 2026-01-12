"use client";
import { FormValue } from "@/interfaces";
import { Clock, MapPin } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Calendar } from "@/components/ui/calendar";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
interface Iprop {
  formValue: FormValue | null;
}
const PreviewMeeting = ({ formValue }: Iprop) => {
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [timeSlotes, setTimeSlots] = useState<string[]>([]);

  const createTimeSlot = (interval: number) => {
    const startTime = 8 * 60; // 8 AM in minutes
    const endTime = 22 * 60; // 10 PM in minutes
    const totalSlots = (endTime - startTime) / interval;
    const slots = Array.from({ length: totalSlots }, (_, i) => {
      const totalMinutes = startTime + i * interval;
      const hours = Math.floor(totalMinutes / 60);
      const minutes = totalMinutes % 60;
      const formattedHours = hours > 12 ? hours - 12 : hours; // Convert to 12-hour format
      const period = hours >= 12 ? "PM" : "AM";
      return `${String(formattedHours).padStart(2, "0")}:${String(
        minutes
      ).padStart(2, "0")} ${period}`;
    });

    setTimeSlots(slots);
    console.log(slots);
  };
  useEffect(() => {
    if (formValue?.duration) {
      setTimeout(() => {
        createTimeSlot(formValue.duration);
      }, 0);
    }
  }, [formValue]);

  return (
    <div className="p-7 shadow-md mt-5">
      <Image src={"/logo.png"} alt="logo" width={150} height={150} />
      <div className="grid grid-cols-1 md:grid-cols-3">
        <div className="mt-7 border-r border-slate-400">
          <h2 className="font-bold text-[28px] text-[#039b95]">Meeting Name</h2>
          <h2 className="mt-2">
            {formValue?.meeting ? formValue?.meeting : "Enter Meeting Name"}
          </h2>
          <div className="flex items-center mt-5 gap-2">
            <Clock className="text-[#039b95]" />{" "}
            <h2>{formValue?.duration ? formValue?.duration : "30"} min</h2>
          </div>
          <div className="flex items-center mt-7 gap-2">
            <MapPin className="text-[#039b95]" />{" "}
            <h2>
              {formValue?.program ? formValue?.program : "Enter Prorgram !"}{" "}
            </h2>
          </div>
          <Link href={""} className="block text-[#039b95] mt-5">
            {formValue?.programUrl ? formValue?.programUrl : "Enter url !"}
          </Link>
        </div>
        <div className="md:col-span-2 flex p-3 mt-3">
          <div className="flex flex-col">
            <Calendar
              mode="single"
              selected={date}
              onSelect={setDate}
              className="rounded-md border shadow-sm border-[#bcbcbc]"
              captionLayout="dropdown"
            />
          </div>
          <div className="flex flex-col w-full gap-4 p-2 h-64 overflow-auto ">
            {timeSlotes?.map((item, idx) => (
              <Button
                variant={"outline"}
                className="border-[#039b95]"
                key={idx}
              >
                {item}
              </Button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PreviewMeeting;
