import { Calendar } from "@/components/ui/calendar";
import { Button } from "@/components/ui/button";
interface IProp {
  timeSlotes: string[];
  date?: Date;
  enabletimeSlotes: boolean;
  handleDate: (date?: Date) => void;
  setSelectedTime: (time: string) => void;
  selectdTime: string | null;
}
const DateTimeComponents = ({
  date,
  timeSlotes,
  enabletimeSlotes,
  handleDate,
  setSelectedTime,
  selectdTime,
}: IProp) => {
  return (
    <div className="md:col-span-2 flex p-3 mt-3">
      <div className="flex flex-col">
        <Calendar
          mode="single"
          selected={date}
          onSelect={(d) => handleDate(d)}
          className="rounded-md border shadow-sm border-[#bcbcbc]"
          captionLayout="dropdown"
        />
      </div>
      <div className="flex flex-col w-full gap-4 p-2 h-64 overflow-auto ">
        {timeSlotes?.map((item, idx) => (
          <Button
            variant={"outline"}
            className={`border-[#039b95] ${
              item === selectdTime && `bg-[#039b95]`
            }`}
            key={idx}
            disabled={!enabletimeSlotes}
            onClick={() => setSelectedTime(item)}
          >
            {item}
          </Button>
        ))}
      </div>
    </div>
  );
};

export default DateTimeComponents;
