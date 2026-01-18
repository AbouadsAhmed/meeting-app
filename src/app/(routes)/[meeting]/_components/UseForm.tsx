import { Input } from "@/components/ui/input";
import { ChangeEvent } from "react";
interface IProp {
  setName: (value: string) => void;
  setEmail: (value: string) => void;
  setNote: (value: string) => void;
}
const UseForm = ({ setEmail, setName, setNote }: IProp) => {
  const inputs = [
    {
      name: "Name",
      onChange: (e: ChangeEvent<HTMLInputElement>) => {
        setName(e.target.value);
      },
    },
    {
      name: "Email",
      onChange: (e: ChangeEvent<HTMLInputElement>) => {
        setEmail(e.target.value);
      },
    },
    {
      name: "Note",
      onChange: (e: ChangeEvent<HTMLInputElement>) => {
        setNote(e.target.value);
      },
    },
  ];
  return (
    <div className="flex flex-col p-8 gap-3 w-[50%]">
      {inputs.map((item, idx) => (
        <div key={idx} className="mb-3">
          <h2>{item.name}</h2>
          <Input className="border-slate-400 border" onChange={item.onChange} />
        </div>
      ))}
    </div>
  );
};

export default UseForm;
