import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { DocumentData } from "firebase/firestore";
import { CalendarCheck, Clock, MapIcon } from "lucide-react";
interface IProp {
  meetingList: DocumentData[];
}
const Upmeeting = ({ meetingList }: IProp) => {
  console.log(meetingList, "sssssssssss");
  return (
    <div>
      {meetingList &&
        meetingList.map((item, idx) => (
          <Accordion type="single" collapsible key={idx}>
            <AccordionItem value="item-1">
              <AccordionTrigger>{item?.formatDate}</AccordionTrigger>
              <AccordionContent>
                <div className="mt-7 border-r border-[#bcbcbc] pr-4">
                  <div className="mt-5">
                    <div className="flex items-center gap-2">
                      <Clock className="text-[#039b95]" />
                      <div>
                        <h2 className="font-bold text-[20px]">Meeting Name</h2>
                        <p className="text-gray-600">
                          {item?.meetingName || "duration"}{" "}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Duration */}
                  <div className="mt-5">
                    <div className="flex items-center gap-2">
                      <Clock className="text-[#039b95]" />
                      <div>
                        <h2 className="font-bold text-[20px]">Duration</h2>
                        <p className="text-gray-600">
                          {item?.duration || "duration"} Min
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Program */}
                  <div className="mt-5">
                    <div className="flex items-center gap-2">
                      <MapIcon className="text-[#039b95]" />
                      <div>
                        <h2 className="font-bold text-[20px]">Program</h2>
                        <p className="text-gray-600">
                          {item?.program || "program"}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Date */}
                  <div className="mt-5">
                    <div className="flex items-center gap-2">
                      <CalendarCheck className="text-[#039b95]" />
                      <div>
                        <h2 className="font-bold text-[20px]">Date</h2>
                        <p className="text-gray-600">{item?.formatDate}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        ))}
    </div>
  );
};

export default Upmeeting;
