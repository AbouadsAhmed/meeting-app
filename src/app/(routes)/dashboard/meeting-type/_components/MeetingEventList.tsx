import { app } from "@/app/config/firebaseConsole";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { IMeetingEvent } from "@/interfaces";
import { useKindeBrowserClient } from "@kinde-oss/kinde-auth-nextjs";
import { DocumentData, getDoc, getFirestore } from "firebase/firestore";
import { collection, query, where, getDocs } from "firebase/firestore";
import { Clock, Copy, MapPin, Settings } from "lucide-react";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { toast } from "sonner";
import { doc, deleteDoc } from "firebase/firestore";
interface IProp {
  searhTerm: string;
  setSearchTearm: Dispatch<SetStateAction<string>>;
}
const MeetingEventList = ({ searhTerm, setSearchTearm }: IProp) => {
  const [eventList, setEventList] = useState<IMeetingEvent[]>([]);
  const [meetingList, setMeetingList] = useState<DocumentData | null>(null);
  const db = getFirestore(app);
  const { user } = useKindeBrowserClient();
  const getEventList = async () => {
    if (!user?.email) return;
    const q = query(
      collection(db, "Event"),
      where("createdBy", "==", user?.email),
    );

    const querySnapshot = await getDocs(q);
    const event: IMeetingEvent[] = [];
    querySnapshot.forEach((doc) => {
      // doc.data() is never undefined for query doc snapshots
      console.log(doc.id, " => ", doc.data());
      event.push(doc.data() as IMeetingEvent);
    });
    setEventList(event);
  };
  useEffect(() => {
    if (user) {
      getEventList();
      getMeetingData();
    }
  }, [user]);
  const onDeleteData = async (eve: IMeetingEvent) => {
    await deleteDoc(doc(db, "Event", eve?.id)).then((res) => {
      console.log(res);
      toast("item has been deleted");
      getEventList();
    });
  };
  const getMeetingData = async () => {
    if (!user?.email) return;
    const docRef = doc(db, "Meeting", user?.email);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      setMeetingList(docSnap.data());
    } else {
      // docSnap.data() will be undefined in this case
      console.log("No such document!");
    }
  };
  const onCopyHandle = (event: IMeetingEvent) => {
    const meetingUrl = `${process.env.NEXT_PUBLIC_BASE_URL}/${meetingList?.meetingName}/${event.id}`;
    navigator.clipboard.writeText(meetingUrl);
    toast("link copied!");
  };
  const filterdEventList = eventList.filter((event) =>
    event?.meeting?.toLowerCase().includes(searhTerm.toLowerCase()),
  );
  return (
    <div className="mt-10 grid grid-col-1 md:grid-cols-2 lg:grid-cols-3">
      {filterdEventList.length > 0 ? (
        filterdEventList?.map((item: IMeetingEvent) => (
          <div
            key={item.id}
            className="border shadow-md border-t-8 border-[#febf30] p-5"
          >
            <div className="flex justify-end cursor-pointer items-center">
              <DropdownMenu>
                <DropdownMenuTrigger>
                  <Settings />
                </DropdownMenuTrigger>
                <DropdownMenuContent className="bg-white shadow-2xl p-3">
                  <DropdownMenuItem className="cursor-pointer">
                    Edit
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    className="cursor-pointer"
                    onClick={() => onDeleteData(item)}
                  >
                    Delete
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
            <h2 className=" rounded-lg  text-2xl font-bold">{item.meeting}</h2>
            <div className="mt-3 flex justify-between items-center">
              <h2 className="flex gap-2 text-[#039b95]">
                <Clock /> {item?.duration}
              </h2>
              <h2 className="flex gap-2 text-[#039b95]">
                <MapPin /> {item?.program}
              </h2>
            </div>
            <hr className="text-slate-400" />
            <div>
              <h2
                className="flex gap-2 text-blue-500 text-sm mt-3 items-center cursor-pointer"
                onClick={() => {
                  onCopyHandle(item);
                }}
              >
                <Copy /> Copu Link
              </h2>
            </div>
          </div>
        ))
      ) : (
        <h2>No Interview For Yet</h2>
      )}
    </div>
  );
};

export default MeetingEventList;
