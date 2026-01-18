"use client";
import MeetingDateTime from "../_components/MeetingDateTime";
import { app } from "@/app/config/firebaseConsole";
import {
  collection,
  doc,
  DocumentData,
  getDoc,
  getDocs,
  getFirestore,
  query,
  where,
} from "firebase/firestore";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

const SheardEventMeeting = () => {
  const db = getFirestore(app);
  const params = useParams<{
    meeting: string;
    eventId: string;
  }>();
  const [meetingInfo, setMeetingInfo] = useState<DocumentData | null>(null);
  const [eventInfo, setEventEnfo] = useState<DocumentData | null>(null);
  const getMeetingEventDetails = async () => {
    const q = query(
      collection(db, "Meeting"),
      where("meetingName", "==", params.meeting)
    );
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      // doc.data() is never undefined for query doc snapshots
      setMeetingInfo(doc.data());
    });
    const docRef = doc(db, "Event", params.eventId);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      setEventEnfo(docSnap.data());
    } else {
      // docSnap.data() will be undefined in this case
      console.log("No such document!");
    }
  };
  useEffect(() => {
    if (params) {
      getMeetingEventDetails();
    }
  }, [params]);
  return (
    <div>
      <MeetingDateTime eventInfo={eventInfo} meetingInfo={meetingInfo} />
    </div>
  );
};

export default SheardEventMeeting;
