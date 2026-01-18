"use client";
import { app } from "@/app/config/firebaseConsole";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { days } from "@/data";
import { useKindeBrowserClient } from "@kinde-oss/kinde-auth-nextjs";
import {
  doc,
  getDoc,
  getFirestore,
  setDoc,
  updateDoc,
} from "firebase/firestore";
import { useEffect, useState } from "react";
import { toast } from "sonner";
export type Day =
  | "sunday"
  | "monday"
  | "tuesday"
  | "wednesday"
  | "thursday"
  | "friday"
  | "saturday";
const Availabillity = () => {
  const db = getFirestore(app);
  const { user } = useKindeBrowserClient();
  const [availableDay, setAvailavleDay] = useState({
    sunday: false,
    monday: false,
    tuesday: false,
    wednesday: false,
    thursday: false,
    friday: false,
    saturday: false,
  });
  const [startTime, setStartTime] = useState<string>("");
  const [endTime, setEndTime] = useState<string>("");
  const onHandle = (day: Day, value: boolean | string) => {
    setAvailavleDay({
      ...availableDay,
      [day]: value,
    });
    console.log(availableDay);
  };
  const onHandleClick = async () => {
    if (!user?.email) return;

    const docsRef = doc(db, "Meeting", user?.email);

    try {
      // setDoc مع { merge: true } تعمل كـ Update أو Create
      await setDoc(
        docsRef,
        {
          availableDay,
          startTime,
          endTime,
        },
        { merge: true }
      );

      toast("Time and Date Has Been Selected");
    } catch (error) {
      console.error("Error saving data: ", error);
      toast("Error saving data");
    }
  };

  const getMeetingData = async () => {
    if (!user?.email) return;
    const docRef = doc(db, "Meeting", user?.email);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      const results = docSnap.data();
      // نضع البيانات فقط إذا كانت موجودة، وإلا نحافظ على الحالة الافتراضية
      if (results.availableDay) setAvailavleDay(results.availableDay);
      if (results.startTime) setStartTime(results.startTime);
      if (results.endTime) setEndTime(results.endTime);
    } else {
      console.log("No such document!");
      // اختياري: يمكنك إعادة تعيين الـ state للحالة الافتراضية هنا إذا أردت
    }
  };
  useEffect(() => {
    if (user) {
      getMeetingData();
    }
  }, [user]);
  return (
    <div className="p-7">
      <h2 className="font bold text-4xl text-[#039b95] mt-6">
        Available Date And Time
      </h2>
      <hr className="text-slate-400 mt-3" />
      <div className="grid md:grid-cols-2 lg:grid-cols-4 mt-6">
        {days.map((item, idx) => (
          <div key={idx}>
            <h2>
              <Checkbox
                checked={
                  availableDay[item.day] ? availableDay[item.day] : false
                }
                onCheckedChange={(e) => onHandle(item.day as Day, e)}
              />{" "}
              {item.day}{" "}
            </h2>
          </div>
        ))}
      </div>
      <div className="flex gap-10 mt-10">
        <div>
          <h3 className="font-bold">Start Time</h3>
          <Input
            type="time"
            onChange={(e) => setStartTime(e.target.value)}
            value={startTime}
          />
        </div>
        <div>
          <h3 className="font-bold">End Time</h3>
          <Input
            type="time"
            onChange={(e) => setEndTime(e.target.value)}
            value={endTime}
          />
        </div>
      </div>
      <Button className="mt-8" onClick={onHandleClick}>
        Save
      </Button>
    </div>
  );
};

export default Availabillity;
