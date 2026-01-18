"use client";
import { Calendar, Clock, MapPin, TimerIcon } from "lucide-react";
import Image from "next/image";

import { useEffect, useState } from "react";

import { DocumentData, getFirestore, doc, setDoc } from "firebase/firestore";
import { format } from "date-fns";
import DateTimeComponents from "./DateTimeComponents";
import { Button } from "@/components/ui/button";
import UseForm from "./UseForm";
import { app } from "@/app/config/firebaseConsole";
import { toast } from "sonner";
type Props = {
  eventInfo: DocumentData | null;
  meetingInfo: DocumentData | null;
};
const MeetingDateTime = ({ eventInfo, meetingInfo }: Props) => {
  const db = getFirestore(app);
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [timeSlotes, setTimeSlots] = useState<string[]>([]);
  const [enabletimeSlotes, setEnabletimeSlotes] = useState(false);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [step, setStep] = useState(1);
  const [note, setNote] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
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
        minutes,
      ).padStart(2, "0")} ${period}`;
    });

    setTimeSlots(slots);
    console.log(slots);
  };
  useEffect(() => {
    if (eventInfo?.duration) {
      setTimeout(() => {
        createTimeSlot(eventInfo.duration);
      }, 0);
    }
  }, [eventInfo]);
  const handleDate = (date?: Date) => {
    if (!date) return;
    setDate(date);
    const dateFormat = format(date, "EEEE").toLowerCase();
    console.log(dateFormat);
    if (meetingInfo?.availableDay?.[dateFormat]) {
      setEnabletimeSlotes(true);
    } else {
      setEnabletimeSlotes(false);
    }
  };
  const handleSchedule = async () => {
    await setDoc(doc(db, "scheduleMeeting", Date.now().toString()), {
      meetingName: meetingInfo?.meetingName,
      meetingEmail: meetingInfo?.email,
      selectedTime,
      selectedDate: date,
      duration: eventInfo?.duration,
      formatDate: date && format(date, "ppp"),
      formatTime: date && format(date, "t"),
      name,
      email,
      note,
    }).then((res) => {
      toast("meeting Schedule success");
    });
  };
  return (
    <div className="p-7 shadow-md mt-5 border-t-cyan-800 mx-10 md:mx-26 lg:mx-55 lg:mt-20">
      <Image src={"/logo.png"} alt="logo" width={150} height={150} />
      <div className="grid grid-cols-1 md:grid-cols-3">
        <div className="mt-7 border-r border-slate-400">
          <h2 className="font-bold text-[28px] text-[#039b95]">
            {meetingInfo?.meetingName}
          </h2>
          <h2 className="mt-2">
            {eventInfo?.meeting ? eventInfo?.meeting : "Enter Meeting Name"}
          </h2>
          <div className="flex items-center mt-5 gap-2">
            <Clock className="text-[#039b95]" />{" "}
            <div>
              <h2 className="font-bold text-[20px]">Duration</h2>
              <p className="text-slate-400">
                {eventInfo?.duration ? eventInfo?.duration : "30"} min
              </p>
            </div>
          </div>
          <div className="flex items-center mt-7 gap-2">
            <MapPin className="text-[#039b95]" />{" "}
            <div>
              <h2>Program</h2>
              <p className="text-slate-400">
                {eventInfo?.program
                  ? eventInfo?.program
                  : "Enter Prorgram !"}{" "}
              </p>
            </div>
          </div>
          <div className="flex items-center mt-7 gap-2">
            <Calendar className="text-[#039b95]" />{" "}
            <div>
              <h2>Date</h2>
              <p className="text-slate-400">
                {date ? format(date, "dd/MM/yyyy") : "Select a date"}{" "}
              </p>
            </div>
          </div>
          <div className="flex items-center mt-7 gap-2">
            <TimerIcon className="text-[#039b95]" />{" "}
            <div>
              <h2>Time</h2>
              {selectedTime && (
                <p className="text-slate-400">{selectedTime} </p>
              )}
            </div>
          </div>
        </div>
        <div className="md:col-span-2  w-full">
          {step === 1 ? (
            <DateTimeComponents
              date={date}
              enabletimeSlotes={enabletimeSlotes}
              handleDate={handleDate}
              timeSlotes={timeSlotes}
              setSelectedTime={setSelectedTime}
              selectdTime={selectedTime}
            />
          ) : (
            <UseForm setEmail={setEmail} setName={setName} setNote={setNote} />
          )}
        </div>
      </div>
      <div className="mb-20 flex">
        {step === 2 && (
          <Button
            onClick={() => setStep(1)}
            className="block ml-auto px-10 justify-end   transition-all cursor-pointer"
          >
            Back
          </Button>
        )}
        {step === 1 ? (
          <Button
            onClick={() => setStep(step + 1)}
            disabled={!enabletimeSlotes}
            className="block ml-auto px-10    transition-all cursor-pointer"
          >
            Next
          </Button>
        ) : (
          <Button
            disabled={!((name && email) || note)}
            onClick={handleSchedule}
            className="block justify-end px-10 ml-3   transition-all cursor-pointer"
          >
            Schedule
          </Button>
        )}
      </div>
    </div>
  );
};

export default MeetingDateTime;
