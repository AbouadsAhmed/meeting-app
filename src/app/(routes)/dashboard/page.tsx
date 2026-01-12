"use client";
import { useKindeBrowserClient } from "@kinde-oss/kinde-auth-nextjs";
import { doc, getDoc, getFirestore } from "firebase/firestore";
import { app } from "@/app/config/firebaseConsole";
import { useEffect } from "react";

const Dashboard = () => {
  const { user } = useKindeBrowserClient();
  const db = getFirestore(app);

  const meetingRegisterd = async () => {
    if (!user?.email) {
      console.log("No user email available");
      return;
    }

    const docRef = doc(db, "Meeting", user?.email);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      console.log("Document data:", docSnap.data());
    } else {
      // docSnap.data() will be undefined in this case
      console.log("No such document!");
    }
  };
  useEffect(() => {
    meetingRegisterd();
  }, [user]);

  return <div>Dashboard</div>;
};

export default Dashboard;
