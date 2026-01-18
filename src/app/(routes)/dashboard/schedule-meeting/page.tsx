"use client";
import { app } from "@/app/config/firebaseConsole";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useKindeBrowserClient } from "@kinde-oss/kinde-auth-nextjs";
import {
  collection,
  DocumentData,
  getDocs,
  getFirestore,
  query,
  where,
} from "firebase/firestore";
import { format } from "date-fns";
import { useEffect, useState } from "react";
import Upmeeting from "./_components/Upmeeting";

const ScheduleMeeting = () => {
  const { user } = useKindeBrowserClient();
  const db = getFirestore(app);
  const [meetingList, setMeetingList] = useState<DocumentData[]>([]);
  const upComing = async () => {
    try {
      const q = query(
        collection(db, "scheduleMeeting"),
        where("meetingEmail", "==", user?.email),
      );

      const querySnapshot = await getDocs(q);
      const meeting: DocumentData[] = [];
      querySnapshot.forEach((doc) => {
        // doc.data() is never undefined for query doc snapshots
        meeting.push(doc.data());
      });
      console.log(meeting);
      setMeetingList(meeting);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    if (user?.email) {
      upComing();
    }
  }, [user?.email]);
  const filterMeeting = (type: string) => {
    if (type == "upcoming") {
      return meetingList.filter(
        (item) => item?.formatTime >= format(new Date(), "t"),
      );
    } else {
      return meetingList.filter(
        (item) => item?.formatTime <= format(new Date(), "t"),
      );
    }
  };
  return (
    <div className="p-10 ">
      <h1 className="text-[24px] font-bold text-[#039b95]">Schedule Meeting</h1>
      <hr className="text-slate-400 p-2" />
      <Tabs defaultValue="" className="w-100">
        <TabsList>
          <TabsTrigger value="upcoming">Up Coming</TabsTrigger>
          <TabsTrigger value="past">Past</TabsTrigger>
        </TabsList>
        <TabsContent value="upcoming">
          <Upmeeting meetingList={filterMeeting("Upcoming")} />
        </TabsContent>
        <TabsContent value="password">Change your password here.</TabsContent>
      </Tabs>
    </div>
  );
};

export default ScheduleMeeting;
