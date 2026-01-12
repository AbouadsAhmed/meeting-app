import { LucideIcon } from "lucide-react";

export interface Imenu {
  id: number;
  name: string;
  path: string;
  icon: LucideIcon;
}
export interface Iprogram {
  name: string;
  icon: string;
}
export interface FormValue {
  program: string;
  meeting: string;
  duration: number;
  programUrl: string;
}
